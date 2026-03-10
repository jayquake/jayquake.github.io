import { type Request, type Response } from 'express';
import { readFile } from 'fs/promises';
import { basename } from 'path';

import type { ProgressUpdate, TestRunConfig } from '../../../../shared/types';

import { TestRunSummary } from '../../domain/valueObjects/TestRunSummary';
import { DatabaseService } from '../../infrastructure/database/DatabaseService';
import { QaseTestCaseRepository } from '../../repositories/QaseTestCaseRepository';
import { TestRunRepository } from '../../repositories/TestRunRepository';
import { PostProcessingOrchestrator } from '../../services/PostProcessingOrchestrator';
import { ProjectService } from '../../services/ProjectService';
import { QasePreFetchService } from '../../services/QasePreFetchService';
import { TestExecutionService } from '../../services/TestExecutionService';
import { TestResultsProcessor } from '../../services/TestResultsProcessor';

export class TestRunController {
  private broadcastToClients: (data: any) => void;
  private projectService: ProjectService;
  private qasePreFetchService: QasePreFetchService;
  private qaseTestCaseRepository: QaseTestCaseRepository;
  private testExecutionService: TestExecutionService;
  private testRunRepository: TestRunRepository;

  constructor(broadcastToClients: (data: any) => void) {
    const prisma = DatabaseService.getInstance().getClient();
    this.testExecutionService = new TestExecutionService();
    this.testRunRepository = new TestRunRepository(prisma);
    this.qaseTestCaseRepository = new QaseTestCaseRepository(prisma);
    this.projectService = new ProjectService();
    this.qasePreFetchService = new QasePreFetchService();
    this.broadcastToClients = broadcastToClients;
  }

  async cancelRun(req: Request, res: Response): Promise<void> {
    try {
      const { runId } = req.params;
      const cancelled = this.testExecutionService.cancelRun(runId);
      if (cancelled) {
        await this.testRunRepository.updateByRunId(runId, {
          endTime: new Date(),
          status: 'cancelled',
        });
      }
      res.json({ cancelled });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async createRun(req: Request, res: Response): Promise<void> {
    try {
      const { config, projectId } = req.body as {
        config: TestRunConfig;
        projectId: string;
      };

      const project = await this.projectService.getProjectById(projectId);
      if (!project) {
        res.status(404).json({ error: 'Project not found' });
        return;
      }

      const runId = `run-${Date.now()}-${Math.random().toString(36).substring(7)}`;

      // Create test run in database
      const summary = new TestRunSummary({
        failed: 0,
        passed: 0,
        skipped: 0,
        total: 0,
      });

      const projectData = project.toJSON();
      await this.testRunRepository.create({
        config: JSON.stringify(config),
        projectId,
        runId,
        sdkType: projectData.sdkType,
        startTime: new Date(),
        status: 'running',
        summary: JSON.stringify(summary.toJSON()),
        testFramework: projectData.testFramework,
      });

      // Pre-fetch Qase test cases BEFORE test execution (blocking operation)
      if (config.qaseConfig?.enabled) {
        try {
          console.log(`[TestRunController] Pre-fetching Qase test cases for run ${runId}`);

          const projectData = project.toJSON();
          const projectTestDirectory = projectData.testDirectory || '';

          const preFetchResult = await this.qasePreFetchService.preFetchTestCases(
            runId,
            config.testFiles,
            projectTestDirectory,
            config.qaseConfig,
          );

          console.log(
            `[TestRunController] Pre-fetch complete: ${preFetchResult.fetched} fetched, ${preFetchResult.cached} cached, ${preFetchResult.errors.length} errors`,
          );

          // Broadcast pre-fetch status to clients
          this.broadcastToClients({
            data: {
              cached: preFetchResult.cached,
              errors: preFetchResult.errors,
              fetched: preFetchResult.fetched,
              testCaseCount: preFetchResult.testCases.size,
            },
            runId,
            timestamp: new Date().toISOString(),
            type: 'qase-prefetch-complete',
          });
        } catch (error: any) {
          console.error(`[TestRunController] Error pre-fetching Qase test cases:`, error);
          // Don't fail the test run if Qase pre-fetch fails
          this.broadcastToClients({
            error: error.message || 'Failed to pre-fetch Qase test cases',
            runId,
            timestamp: new Date().toISOString(),
            type: 'qase-prefetch-error',
          });
        }
      }

      // Collect all output updates
      const outputUpdates: string[] = [];

      // Start test execution asynchronously
      this.testExecutionService
        .runTests(runId, project.toJSON(), config, (update: ProgressUpdate) => {
          this.broadcastToClients(update);
          if (update.type === 'test-output') {
            outputUpdates.push(update.output || '');
          }
        })
        .then(async (result) => {
          const stdout = result.results.stdout || '';
          const stderr = result.results.stderr || '';
          const aggregatedOutput = outputUpdates.join('');
          const finalStdout = stdout || aggregatedOutput;
          const finalStderr = stderr || '';

          const finalSummary = new TestRunSummary({
            exitCode: result.results.exitCode,
            failed: result.results.failed || 0,
            passed: result.results.passed || 0,
            skipped: result.results.skipped || 0,
            stderr: finalStderr,
            stdout: finalStdout,
            total: result.results.total || 0,
          });

          // Update test run in database with output
          await this.testRunRepository.updateByRunId(runId, {
            duration: finalSummary.total > 0 ? undefined : undefined, // Calculate from start/end
            endTime: new Date(),
            reportPath: result.reportPath,
            status: result.success ? 'completed' : 'failed',
            stderr: finalStderr || null,
            stdout: finalStdout || null, // Store output directly for easy OOP access
            summary: JSON.stringify(finalSummary.toJSON()),
          });

          const completionUpdate: ProgressUpdate = {
            error: result.success ? undefined : finalStderr || 'Test run failed',
            output: finalStderr || finalStdout,
            runId,
            timestamp: new Date().toISOString(),
            type: result.success ? 'run-complete' : 'run-error',
          };
          this.broadcastToClients(completionUpdate);
        })
        .catch(async (error) => {
          console.error('[TestRunController] Test execution error:', error);
          await this.testRunRepository.updateByRunId(runId, {
            endTime: new Date(),
            status: 'failed',
          });
          this.broadcastToClients({
            error: error.message,
            runId,
            timestamp: new Date().toISOString(),
            type: 'run-error',
          });
        });

      res.json({ runId, status: 'started' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllRuns(req: Request, res: Response): Promise<void> {
    try {
      const { flowId, projectId } = req.query;
      let runs;

      if (projectId) {
        runs = await this.testRunRepository.getRunsByProject(projectId as string);
      } else if (flowId) {
        runs = await this.testRunRepository.getRunsByFlow(flowId as string);
      } else {
        runs = await this.testRunRepository.findAll({
          orderBy: { startTime: 'desc' },
        });
      }

      // Convert Prisma objects to shared TestRun format
      // Use runId as id (not the database UUID)
      const convertedRuns = runs.map((run) => ({
        config: JSON.parse(run.config),
        duration: run.duration || undefined,
        endTime: run.endTime ? run.endTime.toISOString() : undefined,
        flowId: run.flowId || undefined,
        id: run.runId, // Use runId (run-XXX format) as the id
        projectId: run.projectId || undefined,
        reportPath: run.reportPath || undefined,
        results: [], // Results are loaded separately if needed
        startTime: run.startTime.toISOString(),
        status: run.status,
        summary: JSON.parse(run.summary),
      }));

      res.json(convertedRuns);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get post-processing status for a test run
   * Returns whether post-processing has completed and if results are available
   */
  async getPostProcessingStatus(req: Request, res: Response): Promise<void> {
    try {
      const { runId } = req.params;

      // Get test run from database
      const run = await this.testRunRepository.findByRunId(runId);

      if (!run) {
        res.status(404).json({ error: 'Test run not found' });
        return;
      }

      // Check if post-processing is complete by looking at results
      const hasResults = run.results && run.results.length > 0;
      const hasSummary = run.summary && typeof run.summary === 'object';

      // If test run is still in progress, post-processing hasn't started
      const isRunning = run.status === 'running' || run.status === 'pending';

      // Post-processing is complete if we have results and a summary, and run is not still running
      const completed = hasResults && hasSummary && !isRunning;

      // Post-processing is in progress if run completed but no results yet
      const inProgress = !isRunning && run.status === 'completed' && !hasResults;

      const progress = {
        testsProcessed: hasResults ? run.results.length : 0,
        totalTests:
          hasSummary && typeof run.summary === 'object' && 'total' in run.summary ? (run.summary as any).total : 0,
      };

      res.json({
        completed,
        error: run.status === 'failed' ? 'Test run failed' : null,
        inProgress,
        progress,
        runStatus: run.status,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get pre-fetched Qase test cases for a run
   * Returns all Qase test cases that were pre-fetched before test execution
   */
  /**
   * Get Qase test cases for a test run
   * First tries memory cache, then falls back to DB
   */
  async getQaseTestCases(req: Request, res: Response): Promise<void> {
    try {
      const { runId } = req.params;

      // Step 1: Try to get from memory cache (fastest)
      const testCasesMap = this.qasePreFetchService.getPreFetchedTestCases(runId);

      if (testCasesMap.size > 0) {
        // Convert Map to object for JSON response
        const testCasesObj: Record<number, any> = {};
        testCasesMap.forEach((testCase, qaseId) => {
          testCasesObj[qaseId] = testCase;
        });

        console.log(`[TestRunController] Returning ${testCasesMap.size} cached test cases for run ${runId}`);

        res.json({
          count: testCasesMap.size,
          source: 'cache',
          testCases: testCasesObj,
        });
        return;
      }

      // Step 2: Cache miss, fallback to DB (e.g., historical test runs or server restart)
      console.log(`[TestRunController] Cache miss for run ${runId}, checking DB...`);

      // Get the test run to extract projectCode and qaseIds from results
      const testRun = await this.testRunRepository.findByRunId(runId);
      if (!testRun || !testRun.results || testRun.results.length === 0) {
        console.log(`[TestRunController] No test results found for run ${runId}`);
        res.json({
          count: 0,
          source: 'empty',
          testCases: {},
        });
        return;
      }

      // Extract unique Qase IDs from test results
      const qaseIds = Array.from(
        new Set(
          testRun.results
            .filter((result) => result.qaseId !== null && result.qaseId !== undefined)
            .map((result) => result.qaseId!),
        ),
      );

      if (qaseIds.length === 0) {
        console.log(`[TestRunController] No Qase IDs found in test results for run ${runId}`);
        res.json({
          count: 0,
          source: 'empty',
          testCases: {},
        });
        return;
      }

      // Get project to extract projectCode
      const project = await this.projectService.getProjectById(testRun.projectId || '');
      if (!project) {
        console.warn(`[TestRunController] Project not found for run ${runId}`);
        res.json({
          count: 0,
          source: 'error',
          testCases: {},
        });
        return;
      }

      const projectData = project.toJSON();
      const projectCode = projectData.qaseConfig?.projectCode;

      if (!projectCode) {
        console.warn(`[TestRunController] Qase project code not found in project config`);
        res.json({
          count: 0,
          source: 'error',
          testCases: {},
        });
        return;
      }

      // Fetch from DB
      const dbTestCases = await this.qaseTestCaseRepository.findManyByQaseIds(projectCode, qaseIds);

      // Convert to response format
      const testCasesObj: Record<number, any> = {};
      const foundQaseIds = new Set<number>();

      dbTestCases.forEach((dbTestCase) => {
        const testCase = JSON.parse(dbTestCase.fullData);
        testCasesObj[dbTestCase.qaseId] = testCase;
        foundQaseIds.add(dbTestCase.qaseId);
      });

      // If some test cases are missing from DB, fetch them from API
      const missingQaseIds = qaseIds.filter((id) => !foundQaseIds.has(id));

      if (missingQaseIds.length > 0) {
        console.log(`[TestRunController] ${missingQaseIds.length} test cases not in DB, fetching from API...`);

        // Get Qase config from project
        const {qaseConfig} = projectData;
        if (qaseConfig && qaseConfig.enabled && qaseConfig.apiToken) {
          const { QaseService } = await import('../../services/QaseService');
          const qaseService = new QaseService();

          // Fetch missing test cases from API
          for (const missingId of missingQaseIds) {
            try {
              const testCase = await qaseService.getTestCase(qaseConfig, missingId);
              if (testCase) {
                // Store in database for future use
                await this.qaseTestCaseRepository.upsert({
                  automation: testCase.automation || null,
                  customFields: null,
                  description: testCase.description || null,
                  fullData: JSON.stringify(testCase),
                  isFlaky: null,
                  layer: null,
                  priority: null,
                  projectCode,
                  qaseId: testCase.id,
                  severity: null,
                  status: null,
                  suiteId: testCase.suite?.id || null,
                  title: testCase.title,
                });

                testCasesObj[testCase.id] = testCase;
                console.log(`[TestRunController] ✅ Fetched and cached test case ${missingId} from API`);
              }
            } catch (error: any) {
              console.error(`[TestRunController] Error fetching test case ${missingId} from API:`, error.message);
            }
          }
        }
      }

      const totalCount = Object.keys(testCasesObj).length;
      console.log(
        `[TestRunController] Returning ${totalCount} test cases (${dbTestCases.length} from DB, ${totalCount - dbTestCases.length} from API) for run ${runId}`,
      );
      console.log(`[TestRunController] Test case IDs: ${Object.keys(testCasesObj).join(', ')}`);

      res.json({
        count: totalCount,
        source:
          missingQaseIds.length > 0 ? 'mixed'
          : dbTestCases.length > 0 ? 'database'
          : 'empty',
        testCases: testCasesObj,
      });
    } catch (error: any) {
      console.error(`[TestRunController] Error getting Qase test cases:`, error);
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get test results with Qase test case details for a run
   */
  async getResultsWithQaseDetails(req: Request, res: Response): Promise<void> {
    try {
      const { runId } = req.params;
      const resultsProcessor = new TestResultsProcessor();
      const results = await resultsProcessor.getResultsWithQaseDetails(runId);
      res.json({ results });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getRun(req: Request, res: Response): Promise<void> {
    try {
      const run = await this.testRunRepository.findByRunId(req.params.runId);
      if (!run) {
        res.status(404).json({ error: 'Run not found' });
        return;
      }

      // Convert Prisma object to shared TestRun format
      // Include output fields for easy OOP access
      const convertedRun = {
        config: JSON.parse(run.config),
        duration: run.duration || undefined,
        endTime: run.endTime ? run.endTime.toISOString() : undefined,
        flowId: run.flowId || undefined,
        id: run.runId, // Use runId (run-XXX format) as the id
        projectId: run.projectId || undefined,
        reportPath: run.reportPath || undefined,
        results: [], // Results are loaded separately if needed
        startTime: run.startTime.toISOString(),
        status: run.status,
        stderr: run.stderr || undefined, // Direct access to error output
        stdout: run.stdout || undefined, // Direct access to output
        summary: JSON.parse(run.summary),
      };

      res.json(convertedRun);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async postProcess(req: Request, res: Response): Promise<void> {
    try {
      const { runId } = req.params;
      console.log(`[TestRunController] Manual post-processing triggered for ${runId}`);

      const orchestrator = new PostProcessingOrchestrator();
      const result = await orchestrator.processTestRun(runId);

      if (result.success) {
        res.json({
          data: result.processedData,
          message: 'Post-processing completed successfully',
          success: true,
        });
      } else {
        res.status(500).json({
          errors: result.errors,
          message: 'Post-processing failed',
          success: false,
        });
      }
    } catch (error: any) {
      console.error('[TestRunController] Error in post-processing:', error);
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Serve the Playwright HTML report for a test run
   * Reports are stored in the project root at reports/html/{runId}/
   */
  async serveReport(req: Request, res: Response): Promise<void> {
    try {
      const { runId } = req.params;

      // Get the test run from database (optional - report might exist on filesystem)
      const run = await this.testRunRepository.findByRunId(runId);
      const dbReportPath = run?.reportPath || null;

      // Use PathUtils and ReportPathResolver to find report in project root
      // Using the same import pattern as server.ts which works correctly
      // From: standalone-app/backend/src/api/controllers/
      // To: standalone-app/shared/utils/ReportPathResolver.ts
      // Path: ../../../../shared/utils/ReportPathResolver (4 levels up from controllers)
      const { PathUtils } = await import('../../infrastructure/utils/PathUtils');
      const { ReportPathResolver } = await import('../../../../shared/utils/ReportPathResolver');
      const { join } = await import('path');
      const { existsSync } = await import('fs');

      const projectRoot = PathUtils.getProjectRoot();
      const resolver = new ReportPathResolver(projectRoot);
      const reportPath = resolver.resolveReportPath(runId, dbReportPath || undefined);
      const reportDir = join(projectRoot, reportPath);
      const reportFile = join(reportDir, 'index.html');

      console.log(`[TestRunController] Project root: ${projectRoot}`);
      console.log(`[TestRunController] Resolved report path: ${reportPath}`);
      console.log(`[TestRunController] Serving report from: ${reportFile}`);

      if (!existsSync(reportFile)) {
        console.error(`[TestRunController] Report file not found: ${reportFile}`);
        console.log(`[TestRunController] All possible paths:`, resolver.getAllPossiblePaths(runId));
        res.status(404).json({
          checkedPath: reportFile,
          error: 'HTML report file not found on disk',
          possiblePaths: resolver.getAllPossiblePaths(runId),
        });
        return;
      }

      // Serve the HTML report
      res.sendFile(reportFile);
    } catch (error: any) {
      console.error('[TestRunController] Error serving report:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async getSdkAudit(req: Request, res: Response): Promise<void> {
    try {
      const { runId } = req.params;
      const prisma = DatabaseService.getInstance().getClient();

      const testRun = await this.testRunRepository.findByRunId(runId);
      if (!testRun) {
        res.status(404).json({ error: 'Test run not found' });
        return;
      }

      const auditReport = await prisma.sdkAuditReport.findUnique({
        where: { testRunId: testRun.id },
      });

      if (!auditReport) {
        res.json({ exists: false, report: null });
        return;
      }

      res.json({
        exists: true,
        report: {
          ...auditReport,
          rawAuditPaths: auditReport.rawAuditPaths ? JSON.parse(auditReport.rawAuditPaths) : [],
          summaryData: JSON.parse(auditReport.summaryData),
        },
      });
    } catch (error: any) {
      console.error('[TestRunController] Error getting SDK audit:', error);
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Serve raw audit JSONL file content for a run.
   * Only allows filenames that are in the run's stored rawAuditPaths (by basename).
   */
  async getSdkAuditRawFile(req: Request, res: Response): Promise<void> {
    try {
      const { runId, filename } = req.params;
      const prisma = DatabaseService.getInstance().getClient();

      const testRun = await this.testRunRepository.findByRunId(runId);
      if (!testRun) {
        res.status(404).json({ error: 'Test run not found' });
        return;
      }

      const auditReport = await prisma.sdkAuditReport.findUnique({
        where: { testRunId: testRun.id },
      });

      if (!auditReport?.rawAuditPaths) {
        res.status(404).json({ error: 'No raw audit files for this run' });
        return;
      }

      const paths: string[] = JSON.parse(auditReport.rawAuditPaths);
      const requestedBasename = basename(filename);
      const filePath = paths.find((p) => basename(p) === requestedBasename);
      if (!filePath) {
        res.status(404).json({ error: 'Raw audit file not found' });
        return;
      }

      const content = await readFile(filePath, 'utf-8');
      const lines = content
        .trim()
        ? content
            .trim()
            .split('\n')
            .filter(Boolean)
            .map((line) => {
              try {
                return JSON.parse(line);
              } catch {
                return { _raw: line };
              }
            })
        : [];
      res.json({ content, filename: requestedBasename, lines });
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        res.status(404).json({ error: 'File not found' });
        return;
      }
      console.error('[TestRunController] Error getting SDK audit raw file:', error);
      res.status(500).json({ error: error.message });
    }
  }
}
