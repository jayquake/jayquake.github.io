import { type ChildProcess, spawn } from 'child_process';
import { join } from 'path';

import type { ProgressUpdate, Project, TestRunConfig } from '../../../shared/types';

import { TestRunSummary } from '../../../shared/domain/valueObjects/TestRunSummary';
import { ConsoleOutputParser } from '../../../shared/utils/ConsoleOutputParser';
import { ConfigManager } from '../infrastructure/config/ConfigManager';
import { DatabaseService } from '../infrastructure/database/DatabaseService';
import { EnvFileManager } from '../infrastructure/utils/EnvFileManager';
import { PathUtils } from '../infrastructure/utils/PathUtils';
import { TestLogRepository } from '../repositories/TestLogRepository';
import { TestResultRepository } from '../repositories/TestResultRepository';
import { TestRunRepository } from '../repositories/TestRunRepository';
import { PostProcessingOrchestrator } from './PostProcessingOrchestrator';
import { TestResultsProcessor } from './TestResultsProcessor';

/**
 * TestExecutionService - Manages Playwright test execution with tsx
 * Refactored from TestRunner to use repositories and follow OOP patterns
 */
export class TestExecutionService {
  private activeProcesses: Map<string, ChildProcess> = new Map();
  private configManager: ConfigManager;
  private outputParsers: Map<string, ConsoleOutputParser> = new Map();
  private testLogRepository: TestLogRepository;
  private testResultRepository: TestResultRepository;
  private testRunRepository: TestRunRepository;

  constructor() {
    const prisma = DatabaseService.getInstance().getClient();
    this.configManager = new ConfigManager();
    this.testRunRepository = new TestRunRepository(prisma);
    this.testResultRepository = new TestResultRepository(prisma);
    this.testLogRepository = new TestLogRepository(prisma);
  }

  cancelRun(runId: string): boolean {
    const proc = this.activeProcesses.get(runId);
    if (proc) {
      proc.kill();
      this.activeProcesses.delete(runId);
      this.outputParsers.delete(runId);
      return true;
    }
    return false;
  }

  isRunning(runId: string): boolean {
    return this.activeProcesses.has(runId);
  }

  async runTests(
    runId: string,
    project: Project,
    config: TestRunConfig,
    onProgress: (update: ProgressUpdate) => void,
  ): Promise<{ reportPath?: string; results: any; success: boolean; }> {
    return new Promise(async (resolve, reject) => {
      let currentTestRun: any = null;
      try {
        // Get test-e2e directory using shared utility (consistent across all services)
        const testE2eDir = PathUtils.getTestE2eDir();
        console.log(`[TestExecutionService] testE2eDir: ${testE2eDir}`);
        console.log(`[TestExecutionService] project.testDirectory: ${project.testDirectory}`);

        // Get existing TestRun (created by controller)
        currentTestRun = await this.testRunRepository.findByRunId(runId);
        if (!currentTestRun) {
          throw new Error(`TestRun ${runId} not found. It should be created by the controller first.`);
        }

        // Save baseUrl to Environment table for future autocomplete
        if (config.baseUrl) {
          try {
            const { EnvironmentService } = await import('./EnvironmentService');
            const envService = new EnvironmentService();
            await envService.saveEnvironment(config.baseUrl, 'manual', project.id, { lastUsedInRun: runId });
          } catch (envError) {
            console.warn('[TestExecutionService] Failed to save environment:', envError);
            // Don't fail the test run if environment save fails
          }
        }

        // Generate config with runId for unique report folder
        const configContent = this.configManager.buildConfigContent(project, config, runId);
        const configPath = this.configManager.saveTempConfig(runId, configContent, testE2eDir);

        // Set environment variables
        const env = {
          ...process.env,
          ACCESSFLOW_URL: config.baseUrl,
          BASE_URL: config.baseUrl,
          CI: 'false',
          STANDALONE_APP: 'true',
        };

        if (config.qaseConfig?.enabled) {
          env.QASE_API_TOKEN = config.qaseConfig.apiToken || '';
          env.QASE_PROJECT_CODE = config.qaseConfig.projectCode || '';
          env.QASE_ENVIRONMENT = config.qaseConfig.environment || 'default';
          env.QASE_RUN_TITLE = config.qaseConfig.runTitle || `Standalone App - ${project.name}`;
          if (config.qaseConfig.host) {
            env.QASE_TESTOPS_HOST = config.qaseConfig.host;
          }
        }

        if (process.env.DB_URI) {
          env.DB_URI = process.env.DB_URI;
        }
        if (process.env.DB_NAME) {
          env.DB_NAME = process.env.DB_NAME;
        }

        // Build test command using tsx for TypeScript execution
        // Config path should be relative to testE2eDir (where we're running from)
        let configRelativePath: string;
        if (configPath.startsWith(testE2eDir)) {
          // Remove testE2eDir prefix and ensure it starts with ./
          const relative = configPath.replace(testE2eDir, '').replace(/^\/+/, '');
          configRelativePath = relative.startsWith('./') ? relative : `./${relative}`;
        } else {
          configRelativePath = configPath;
        }

        console.log(`[TestExecutionService] Config path: ${configPath}`);
        console.log(`[TestExecutionService] Config relative path: ${configRelativePath}`);
        console.log(`[TestExecutionService] Test E2E dir: ${testE2eDir}`);

        const args = ['test', '--config', configRelativePath];

        if (config.uiMode) {
          args.push('--ui');
        }

        // Add grep pattern if individual test cases are selected
        if (config.grepPattern) {
          args.push('--grep', config.grepPattern);
        }

        // Use npx playwright but ensure @playwright/test resolves from project's node_modules
        // The issue: npx downloads playwright CLI to temp cache, but config imports @playwright/test
        // Solution: Set NODE_PATH to include project's node_modules so Node can resolve @playwright/test
        const nodeModulesPath = join(testE2eDir, 'node_modules');
        const existingNodePath = env.NODE_PATH || '';
        const nodePath = existingNodePath ? `${nodeModulesPath}:${existingNodePath}` : nodeModulesPath;

        console.log(`[TestExecutionService] Spawning: npx playwright ${args.join(' ')}`);
        console.log(`[TestExecutionService] Working directory: ${testE2eDir}`);
        console.log(`[TestExecutionService] Config file exists: ${require('fs').existsSync(configPath)}`);
        console.log(`[TestExecutionService] NODE_PATH: ${nodePath}`);

        const proc = spawn('npx', ['playwright', ...args], {
          cwd: testE2eDir,
          env: {
            ...env,
            NODE_PATH: nodePath, // Ensure @playwright/test resolves from project's node_modules
          },
          stdio: ['pipe', 'pipe', 'pipe'],
        });

        console.log(`[TestExecutionService] Process spawned with PID: ${proc.pid}`);
        this.activeProcesses.set(runId, proc);

        // Log process errors immediately
        proc.on('error', (spawnError) => {
          console.error(`[TestExecutionService] Spawn error for runId ${runId}:`, spawnError);
        });

        let stdout = '';
        let stderr = '';
        let uiUrlSent = false;
        let parser = this.outputParsers.get(runId);
        if (!parser) {
          parser = new ConsoleOutputParser();
          this.outputParsers.set(runId, parser);
        }

        proc.stdout?.on('data', async (data: Buffer) => {
          const output = data.toString();
          stdout += output;

          if (config.uiMode && !uiUrlSent) {
            const uiUrlMatch =
              output.match(/UI Mode:\s*(https?:\/\/[^\s\n]+)/i) ||
              output.match(/(https?:\/\/localhost:\d+)/i) ||
              output.match(/(https?:\/\/127\.0\.0\.1:\d+)/i) ||
              output.match(/listening on (https?:\/\/[^\s\n]+)/i);

            if (uiUrlMatch) {
              let uiUrl = uiUrlMatch[1] || uiUrlMatch[0];
              if (!uiUrl.startsWith('http')) {
                uiUrl = `http://${uiUrl}`;
              }

              uiUrlSent = true;
              const http = require('http');
              const registerUrl = new URL('http://localhost:3000/api/playwright-ui/register');
              const postData = JSON.stringify({ runId, url: uiUrl });

              const req = http.request(
                {
                  headers: {
                    'Content-Length': Buffer.byteLength(postData),
                    'Content-Type': 'application/json',
                  },
                  hostname: registerUrl.hostname,
                  method: 'POST',
                  path: registerUrl.pathname,
                  port: registerUrl.port,
                },
                () => {},
              );

              req.on('error', (error: Error) => {
                console.error('[TestExecutionService] Error registering Playwright UI URL:', error);
              });

              req.write(postData);
              req.end();

              onProgress({
                output: `PLAYWRIGHT_UI_URL:${uiUrl}`,
                projectId: project.id,
                runId,
                timestamp: new Date().toISOString(),
                type: 'test-output',
              });
            }
          }

          // Parse test execution output
          const parsed = parser.parseTestExecution(output);

          if (parsed.testCount !== undefined) {
            onProgress({
              projectId: project.id,
              runId,
              testData: {
                number: parsed.testCount,
              },
              timestamp: new Date().toISOString(),
              type: 'test-output',
            });
          }

          // Emit individual test results
          for (const test of parsed.tests) {
            const qaseIdMatch = test.name.match(/qase\.id\((\d+)\)/i);
            const qaseId = qaseIdMatch ? parseInt(qaseIdMatch[1], 10) : undefined;

            onProgress({
              projectId: project.id,
              runId,
              status: test.status,
              testData: {
                duration: test.duration * 1000, // Convert to milliseconds
                number: test.number,
                qaseId,
              },
              testFile: test.file,
              testName: test.name,
              timestamp: new Date().toISOString(),
              type: 'test-end',
            });
          }

          // Emit the raw stdout chunk directly — no filtering so users see
          // the full live Playwright output (global-setup, test results, summary, etc.)
          if (output.trim()) {
            onProgress({
              output,
              projectId: project.id,
              runId,
              timestamp: new Date().toISOString(),
              type: 'test-output',
            });
          }
        });

        proc.stderr?.on('data', async (data: Buffer) => {
          const output = data.toString();
          stderr += output;
          console.error(`[TestExecutionService] stderr (${runId}):`, output.substring(0, 200)); // Log first 200 chars

          // Store error logs in database
          const testRun = await this.testRunRepository.findByRunId(runId);
          if (testRun) {
            await this.testLogRepository.create({
              level: 'error',
              message: output,
              testRunId: testRun.id,
              timestamp: new Date(),
            });
          }

          onProgress({
            output,
            projectId: project.id,
            runId,
            timestamp: new Date().toISOString(),
            type: 'test-output',
          });
        });

        proc.on('close', async (code) => {
          console.log(`[TestExecutionService] Process closed with code: ${code} for runId: ${runId}`);
          this.activeProcesses.delete(runId);
          this.outputParsers.delete(runId);

          // Don't cleanup config immediately - keep it for debugging
          // Only cleanup after a delay to allow for report generation
          setTimeout(() => {
            this.configManager.cleanupConfig(runId, testE2eDir);
          }, 60000); // Cleanup after 60 seconds

          const success = code === 0;

          // Update .env file with BASE_URL for IDE runs to use
          if (config.baseUrl) {
            try {
              EnvFileManager.updateBaseUrl(config.baseUrl);
            } catch (envError) {
              console.warn('[TestExecutionService] Failed to update .env file:', envError);
              // Don't fail the test run if .env update fails
            }
          }

          // Get report path - use organized folder structure
          // Note: runId already includes "run-" prefix
          // IMPORTANT: HTML reports are always generated by default (configured in ConfigManager)
          // The reportPath is always set and stored in the database for every test run
          const reportPathRelative = `reports/html/${runId}`;
          console.log(`[TestExecutionService] Setting reportPath for ${runId}: ${reportPathRelative}`);

          const finalStdout = stdout || '';
          const finalStderr = stderr || '';

          // Parse final summary from output
          const finalParsed = parser.parseTestExecution(finalStdout);
          const finalSummary = new TestRunSummary({
            exitCode: code || 0,
            failed: finalParsed.summary?.failed || 0,
            passed: finalParsed.summary?.passed || 0,
            skipped: finalParsed.summary?.skipped || 0,
            stderr: finalStderr,
            stdout: finalStdout,
            total: finalParsed.testCount || 0,
          });

          // Update TestRun with final status and summary
          if (currentTestRun) {
            console.log(
              `[TestExecutionService] Updating TestRun ${currentTestRun.id} with reportPath: ${reportPathRelative}`,
            );
            console.log(
              `[TestExecutionService] Saving output - stdout: ${finalStdout.length} chars, stderr: ${finalStderr.length} chars`,
            );
            await this.testRunRepository.update(currentTestRun.id, {
              endTime: new Date(),
              reportPath: reportPathRelative,
              status: success ? 'completed' : 'failed',
              stderr: finalStderr || null,
              stdout: finalStdout || null, // Store output directly for easy OOP access
              summary: JSON.stringify(finalSummary.toJSON()),
            });
            console.log(`[TestExecutionService] TestRun updated successfully with output`);

            // Process test results with new OOP-based PostProcessingOrchestrator
            // Wait a bit for report to be fully written
            setTimeout(async () => {
              try {
                console.log(`[TestExecutionService] Starting post-processing for ${runId}`);
                const orchestrator = new PostProcessingOrchestrator();
                const result = await orchestrator.processTestRun(runId);

                if (result.success) {
                  console.log(`[TestExecutionService] ✅ Post-processing completed for ${runId}:`, {
                    artifactsProcessed: result.processedData.artifactsProcessed,
                    duration: result.duration,
                    qaseTestsLinked: result.processedData.qaseTestsLinked,
                    testsProcessed: result.processedData.testsProcessed,
                  });
                } else {
                  console.error(`[TestExecutionService] ❌ Post-processing failed for ${runId}:`, result.errors);
                }
              } catch (error: any) {
                console.error(`[TestExecutionService] Error in post-processing for ${runId}:`, error.message);
              } finally {
                // Always notify frontend that DB results are ready, even if post-processing had errors
                onProgress({
                  runId,
                  timestamp: new Date().toISOString(),
                  type: 'results-ready',
                });
              }
            }, 3000); // Wait 3 seconds for report to be fully written
          }

          const completionUpdate: ProgressUpdate = {
            error: success ? undefined : finalStderr || 'Test run failed',
            output: finalStderr || finalStdout,
            runId,
            timestamp: new Date().toISOString(),
            type: success ? 'run-complete' : 'run-error',
          };
          onProgress(completionUpdate);

          resolve({
            reportPath: reportPathRelative,
            results: {
              exitCode: code,
              failed: finalSummary.failed,
              passed: finalSummary.passed,
              reportPath: reportPathRelative,
              skipped: finalSummary.skipped,
              stderr: finalStderr,
              stdout: finalStdout,
              total: finalSummary.total,
            },
            success,
          });
        });

        proc.on('error', async (error) => {
          console.error(`[TestExecutionService] Process error for runId ${runId}:`, error);
          this.activeProcesses.delete(runId);
          this.outputParsers.delete(runId);
          // Don't cleanup config on error - keep it for debugging
          // setTimeout(() => {
          //   this.configManager.cleanupConfig(runId, testE2eDir);
          // }, 300000); // Cleanup after 5 minutes on error
          if (currentTestRun) {
            await this.testRunRepository.update(currentTestRun.id, {
              endTime: new Date(),
              status: 'failed',
              summary: JSON.stringify(
                new TestRunSummary({ failed: 0, passed: 0, skipped: 0, stderr: error.message, total: 0 }).toJSON(),
              ),
            });
          }
          onProgress({
            error: error.message,
            runId,
            timestamp: new Date().toISOString(),
            type: 'run-error',
          });
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
