import { type ChildProcess, spawn } from 'child_process';
import { join, resolve } from 'path';

import type { ProgressUpdate, Project, TestRunConfig } from '../../shared/types';

import { TestRunSummary } from '../../shared/domain/valueObjects/TestRunSummary';
import { ConsoleOutputParser } from '../../shared/utils/ConsoleOutputParser';
import { ConfigManager } from './infrastructure/config/ConfigManager';

export class TestRunner {
  private activeProcesses: Map<string, ChildProcess> = new Map();
  private configManager: ConfigManager;
  private outputParsers: Map<string, ConsoleOutputParser> = new Map();

  constructor() {
    this.configManager = new ConfigManager();
  }

  cancel(runId: string): boolean {
    const proc = this.activeProcesses.get(runId);
    if (proc) {
      proc.kill('SIGTERM');
      this.activeProcesses.delete(runId);
      const testE2eDir = join(__dirname, '../../../');
      this.configManager.cleanupConfig(runId, testE2eDir);
      return true;
    }
    return false;
  }

  async runTests(
    runId: string,
    project: Project,
    config: TestRunConfig,
    onProgress: (update: ProgressUpdate) => void,
  ): Promise<{ results: any; success: boolean; }> {
    return new Promise((resolve, reject) => {
      try {
        // Generate config with runId for unique report folder
        const configContent = this.configManager.generatePlaywrightConfig(project, config, runId);
        // Save config in test-e2e directory so relative paths resolve correctly
        // __dirname is backend/src (or backend/dist in production)
        // Need to go up 4 levels: .. -> src, .. -> backend, .. -> standalone-app, .. -> test-e2e
        // Use resolve() to ensure we get an absolute path
        const testE2eDir = resolve(__dirname, '../../../../');
        const configPath = this.configManager.saveTempConfig(runId, configContent, testE2eDir);

        // Set environment variables
        // baseURL comes from user input in the UI - this is the target website to test
        const env = {
          ...process.env,
          ACCESSFLOW_URL: config.baseUrl, // Also set for compatibility with existing code
          BASE_URL: config.baseUrl, // User-provided URL from standalone app UI
          CI: 'false',
          STANDALONE_APP: 'true', // Flag to indicate running from standalone app
        };

        if (config.qaseConfig?.enabled) {
          env.QASE_API_TOKEN = config.qaseConfig.apiToken || '';
          env.QASE_PROJECT_CODE = config.qaseConfig.projectCode || '';
          env.QASE_ENVIRONMENT = config.qaseConfig.environment || 'default';
          env.QASE_RUN_TITLE = config.qaseConfig.runTitle || `Standalone App - ${project.name}`;
          // Qase host if provided
          if (config.qaseConfig.host) {
            env.QASE_TESTOPS_HOST = config.qaseConfig.host;
          }
        }

        // Preserve DB_URI if set (for DB seeding in global-setup)
        // Standalone app can optionally provide DB_URI for tests that need it
        if (process.env.DB_URI) {
          env.DB_URI = process.env.DB_URI;
        }
        if (process.env.DB_NAME) {
          env.DB_NAME = process.env.DB_NAME;
        }

        // Build test command - if testFiles are specified, they're handled via testMatch in config
        // Otherwise run all tests
        // Get relative path from test-e2e directory to config file
        const configRelativePath = configPath.replace(testE2eDir, './');

        const args = [
          'test',
          '--config',
          configRelativePath, // Use relative path so it resolves from test-e2e directory
        ];

        // Add UI mode flag if enabled
        if (config.uiMode) {
          args.push('--ui');
        }

        const proc = spawn('npx', ['playwright', ...args], {
          cwd: testE2eDir, // Run from test-e2e directory
          env,
          stdio: ['pipe', 'pipe', 'pipe'],
        });

        this.activeProcesses.set(runId, proc);

        let stdout = '';
        let stderr = '';

        // Track if we've already sent the UI URL
        let uiUrlSent = false;

        proc.stdout?.on('data', (data: Buffer) => {
          const output = data.toString();
          stdout += output;

          // Detect Playwright UI URL when UI mode is enabled
          if (config.uiMode && !uiUrlSent) {
            // Playwright UI typically outputs URLs like:
            // "UI Mode: http://localhost:9323"
            // or "http://127.0.0.1:9323"
            // or just the port number
            const uiUrlMatch =
              output.match(/UI Mode:\s*(https?:\/\/[^\s\n]+)/i) ||
              output.match(/(https?:\/\/localhost:\d+)/i) ||
              output.match(/(https?:\/\/127\.0\.0\.1:\d+)/i) ||
              output.match(/listening on (https?:\/\/[^\s\n]+)/i);

            if (uiUrlMatch) {
              let uiUrl = uiUrlMatch[1] || uiUrlMatch[0];
              // Ensure it's a full URL
              if (!uiUrl.startsWith('http')) {
                uiUrl = `http://${uiUrl}`;
              }

              uiUrlSent = true;
              // Register the UI URL with the server via HTTP request
              // This allows the frontend to access it through our proxy
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
                (res: any) => {
                  // Response handled
                },
              );

              req.on('error', (error: Error) => {
                console.error('[TestRunner] Error registering Playwright UI URL:', error);
              });

              req.write(postData);
              req.end();

              // Also send update to frontend
              onProgress({
                output: `PLAYWRIGHT_UI_URL:${uiUrl}`,
                projectId: project.id,
                runId,
                timestamp: new Date().toISOString(),
                type: 'test-output',
              });
            }
          }

          // Parse test output and emit progress updates
          this.parseTestOutput(output, runId, project.id, onProgress);
        });

        proc.stderr?.on('data', (data: Buffer) => {
          const output = data.toString();
          stderr += output;

          onProgress({
            output,
            projectId: project.id,
            runId,
            timestamp: new Date().toISOString(),
            type: 'test-output',
          });
        });

        proc.on('close', (code) => {
          this.activeProcesses.delete(runId);
          this.outputParsers.delete(runId); // Clean up parser
          const testE2eDir = join(__dirname, '../../../');
          this.configManager.cleanupConfig(runId, testE2eDir);

          const success = code === 0;

          // Parse results from test-results directory
          const results = this.parseResults(runId, project);

          // Get report path - check if runId-specific report exists, otherwise use default
          const { existsSync } = require('fs');
          const reportFolder = `playwright-html-report-${runId}`;
          const reportPath = join(testE2eDir, reportFolder);
          const reportPathRelative = existsSync(reportPath) ? reportFolder : 'playwright-html-report';

          // Ensure stdout and stderr are strings
          const finalStdout = stdout || '';
          const finalStderr = stderr || '';

          console.log(
            `[TestRunner] Run ${runId} completed. stdout length: ${finalStdout.length}, stderr length: ${finalStderr.length}`,
          );
          console.log(`[TestRunner] Report path: ${reportPathRelative}`);

          resolve({
            results: {
              exitCode: code,
              reportPath: reportPathRelative,
              stderr: finalStderr,
              stdout: finalStdout,
              ...results,
            },
            success,
          });
        });

        proc.on('error', (error) => {
          this.activeProcesses.delete(runId);
          this.outputParsers.delete(runId); // Clean up parser
          const testE2eDir = join(__dirname, '../../../');
          this.configManager.cleanupConfig(runId, testE2eDir);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  private parseResults(runId: string, project: Project): any {
    // Parse JUnit XML results if available
    const resultsPath = join(__dirname, '../../../test-results/results.xml');

    try {
      const { existsSync, readFileSync } = require('fs');
      if (existsSync(resultsPath)) {
        const xml = readFileSync(resultsPath, 'utf-8');
        // Simple XML parsing (could use a proper XML parser)
        const totalMatch = xml.match(/tests="(\d+)"/);
        const failuresMatch = xml.match(/failures="(\d+)"/);
        const skippedMatch = xml.match(/skipped="(\d+)"/);

        return {
          failures: failuresMatch ? parseInt(failuresMatch[1], 10) : 0,
          skipped: skippedMatch ? parseInt(skippedMatch[1], 10) : 0,
          total: totalMatch ? parseInt(totalMatch[1], 10) : 0,
        };
      }
    } catch (error) {
      console.error('[TestRunner] Error parsing results:', error);
    }

    return {
      failures: 0,
      skipped: 0,
      total: 0,
    };
  }

  private parseTestOutput(
    output: string,
    runId: string,
    projectId: string,
    onProgress: (update: ProgressUpdate) => void,
  ): void {
    // Get or create parser for this run
    let parser = this.outputParsers.get(runId);
    if (!parser) {
      parser = new ConsoleOutputParser();
      this.outputParsers.set(runId, parser);
    }

    // Parse test execution from output
    const parsed = parser.parseTestExecution(output);

    // Emit structured test updates
    if (parsed.testCount !== undefined) {
      // Test count detected - tests are starting
      onProgress({
        projectId,
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
      // Extract Qase ID from test name if present
      const qaseIdMatch = test.name.match(/qase\.id\((\d+)\)/i);
      const qaseId = qaseIdMatch ? parseInt(qaseIdMatch[1], 10) : undefined;

      onProgress({
        projectId,
        runId,
        status: test.status,
        testData: {
          duration: test.duration,
          number: test.number,
          qaseId,
        },
        testFile: test.file,
        testName: test.name,
        timestamp: new Date().toISOString(),
        type: 'test-end',
      });
    }

    // Emit raw output for the live console panel — no filtering so users
    // see the full Playwright output (global-setup, test results, summary, etc.)
    if (output.trim()) {
      onProgress({
        output,
        projectId,
        runId,
        timestamp: new Date().toISOString(),
        type: 'test-output',
      });
    }
  }
}
