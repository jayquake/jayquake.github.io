import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

import type { QaseConfig } from '../../../shared/types';

import { MCPTestNavigator } from '../../../shared/utils/MCPTestNavigator';
import { ReportPathResolver } from '../../../shared/utils/ReportPathResolver';
import { type ParsedTestResult, TestReportParser, type TestStep } from '../../../shared/utils/TestReportParser';
import { DatabaseService } from '../infrastructure/database/DatabaseService';
import { PathUtils } from '../infrastructure/utils/PathUtils';
import { TestResultRepository } from '../repositories/TestResultRepository';
import { TestRunRepository } from '../repositories/TestRunRepository';
import { QaseService } from './QaseService';

export type FailureContext = {
  combinedContext: string;
  error: string;
  playwrightError?: string;
  qaseSteps?: { action: string; expected_result: string }[];
}

export type MergedStep = {
  duration?: number;
  playwrightLocation?: { file: string; line: number };
  qaseAction?: string;
  qaseExpected?: string;
  source: 'merged' | 'playwright' | 'qase';
  status: 'failed' | 'passed';
  title: string;
}

export type NavigationContext = {
  failureStep?: TestStep;
  selector?: string;
  stepBeforeFailure?: TestStep;
  url: string;
}

/**
 * Unified test result combining Playwright and Qase data
 */
export type UnifiedTestResult = {
  // Playwright data
  playwright: {
    duration: number;
    error?: string;
    file: string;
    id: string;
    name: string;
    reportPath: string;
    status: 'failed' | 'passed' | 'skipped' | 'timedOut';
    steps: TestStep[];
  };

  // Qase data
  qase: {
    description?: string;
    id?: number;
    steps?: { action: string; expected_result: string }[];
    suite?: string;
    title?: string;
  };

  // Unified/merged data
  unified: {
    allSteps: MergedStep[]; // Playwright + Qase steps combined
    failureContext: FailureContext; // Combined error context
    navigationContext: NavigationContext; // For MCP navigation
    qaseLinked: boolean; // Whether Qase data is available
  };
}

/**
 * ReportService - Unified service combining Qase and Playwright HTML reports
 * Provides MCP-ready format for failure analysis
 */
export class ReportService {
  private projectRoot: string;
  private qaseService: QaseService;
  private testReportParser: TestReportParser;
  private testResultRepository: TestResultRepository;
  private testRunRepository: TestRunRepository;

  constructor() {
    const prisma = DatabaseService.getInstance().getClient();
    this.testRunRepository = new TestRunRepository(prisma);
    this.testResultRepository = new TestResultRepository(prisma);
    this.qaseService = new QaseService();
    this.testReportParser = new TestReportParser();
    // Reports are stored in project root
    this.projectRoot = PathUtils.getProjectRoot();
  }

  /**
   * Get failure context for a specific test result
   */
  async getFailureContext(testResultId: string): Promise<FailureContext | null> {
    // This would fetch from database if test results are stored there
    // For now, use unified report
    const testResult = await this.testRunRepository.findById(testResultId);
    if (!testResult) {
      return null;
    }

    // Get unified report and find the specific test
    const unifiedReport = await this.getUnifiedReport(testResult.runId);
    const result = unifiedReport.find((r) => r.playwright.id === testResultId);

    return result?.unified.failureContext || null;
  }

  /**
   * Get navigation context for a failed test
   */
  getNavigationContext(testResult: ParsedTestResult, baseUrl: string): NavigationContext {
    const navigator = new MCPTestNavigator();
    const context = navigator.getNavigationContext(testResult, baseUrl);

    return {
      failureStep: context.failureStep || undefined,
      selector: context.selector || undefined,
      stepBeforeFailure: context.stepBeforeFailure || undefined,
      url: context.url,
    };
  }

  /**
   * Get unified analytics for a test run
   */
  async getUnifiedAnalytics(runId: string): Promise<{
    failed: number;
    passed: number;
    qaseLinked: number;
    qaseUnlinked: number;
    skipped: number;
    total: number;
  }> {
    const unifiedReport = await this.getUnifiedReport(runId);

    let total = 0;
    let passed = 0;
    let failed = 0;
    let skipped = 0;
    let qaseLinked = 0;
    let qaseUnlinked = 0;

    for (const result of unifiedReport) {
      total++;

      if (result.playwright.status === 'passed') passed++;
      else if (result.playwright.status === 'failed' || result.playwright.status === 'timedOut') failed++;
      else skipped++;

      if (result.unified.qaseLinked) qaseLinked++;
      else qaseUnlinked++;
    }

    return {
      failed,
      passed,
      qaseLinked,
      qaseUnlinked,
      skipped,
      total,
    };
  }

  /**
   * Get unified report for a test run
   * Combines Playwright HTML report with Qase test case data
   * Reads from database first, falls back to filesystem for backward compatibility
   */
  async getUnifiedReport(runId: string): Promise<UnifiedTestResult[]> {
    const run = await this.testRunRepository.findByRunId(runId);
    if (!run) {
      throw new Error(`Test run ${runId} not found`);
    }

    const config = JSON.parse(run.config) as any;
    const qaseConfig = config.qaseConfig as QaseConfig | undefined;

    // Try to read from database first (preferred method)
    let playwrightResults: ParsedTestResult[] = [];

    try {
      const dbResults = await this.testResultRepository.findByTestRunId(run.id);

      if (dbResults && dbResults.length > 0) {
        console.log(`[ReportService] Reading ${dbResults.length} test results from database for run ${runId}`);
        playwrightResults = this.convertDbResultsToParsedResults(dbResults);
        
        // Check if steps are missing from database and enrich from HTML report
        const hasSteps = playwrightResults.some(r => r.steps && r.steps.length > 0);
        if (!hasSteps) {
          console.log(`[ReportService] No steps in database, enriching from HTML report`);
          try {
            const htmlResults = await this.readFromFilesystem(runId, run.reportPath);
            if (htmlResults.length > 0) {
              // Merge steps from HTML report into database results
              playwrightResults = playwrightResults.map((dbResult, index) => {
                const htmlResult = htmlResults.find(hr => hr.title === dbResult.title && hr.file === dbResult.file) || htmlResults[index];
                if (htmlResult && htmlResult.steps) {
                  return { ...dbResult, steps: htmlResult.steps };
                }
                return dbResult;
              });
              console.log(`[ReportService] Enriched results with steps from HTML report`);
            }
          } catch (error: any) {
            console.warn(`[ReportService] Could not enrich with HTML report steps: ${error.message}`);
          }
        }
      } else {
        console.log(`[ReportService] No test results found in database for run ${runId}, falling back to filesystem`);
        // Fall back to filesystem for backward compatibility
        playwrightResults = await this.readFromFilesystem(runId, run.reportPath);
      }
    } catch (error: any) {
      console.warn(`[ReportService] Error reading from database: ${error.message}, falling back to filesystem`);
      // Fall back to filesystem if database read fails
      playwrightResults = await this.readFromFilesystem(runId, run.reportPath);
    }

    if (playwrightResults.length === 0) {
      console.warn(`[ReportService] No test results found for run ${runId}`);
      return [];
    }

    // Extract Qase IDs from Playwright results
    const qaseIds = playwrightResults.map((r) => r.qaseId).filter((id): id is number => id !== undefined);

    // Fetch Qase test cases if available
    const qaseTestCases = new Map<number, any>();
    if (qaseConfig && qaseIds.length > 0) {
      const fetched = await this.qaseService.getTestCases(qaseConfig, qaseIds);
      fetched.forEach((testCase, id) => {
        qaseTestCases.set(id, testCase);
      });
    }

    // Resolve report path for reference (may be null if not available)
    // Reports are stored in project root
    const reportPathResolver = new ReportPathResolver(this.projectRoot);
    const resolvedReportPath = reportPathResolver.resolveReportPath(runId, run.reportPath || undefined);
    const reportFolder = resolvedReportPath ? join(this.projectRoot, resolvedReportPath) : null;

    // Merge Playwright and Qase data
    const unifiedResults: UnifiedTestResult[] = playwrightResults.map((playwrightResult) => {
      const qaseTestCase = playwrightResult.qaseId ? qaseTestCases.get(playwrightResult.qaseId) : undefined;

      // Merge steps
      const mergedSteps = this.mergeSteps(playwrightResult.steps, qaseTestCase?.steps || []);

      // Create failure context
      const failureContext: FailureContext = {
        combinedContext: this.buildCombinedContext(playwrightResult, qaseTestCase),
        error: playwrightResult.error || '',
        playwrightError: playwrightResult.error,
        qaseSteps: qaseTestCase?.steps,
      };

      // Create navigation context
      const navigationContext = this.getNavigationContext(playwrightResult, config.baseUrl || config.baseURL);

      return {
        playwright: {
          duration: playwrightResult.duration,
          error: playwrightResult.error,
          file: playwrightResult.file,
          id: playwrightResult.id,
          name: playwrightResult.title,
          reportPath: reportFolder || run.reportPath || '',
          status: playwrightResult.status,
          steps: playwrightResult.steps,
          title: playwrightResult.title,
        },
        qase:
          qaseTestCase ?
            {
              description: qaseTestCase.description,
              id: qaseTestCase.id,
              steps: qaseTestCase.steps,
              suite: qaseTestCase.suite?.title,
              title: qaseTestCase.title,
            }
          : {},
        unified: {
          allSteps: mergedSteps,
          failureContext,
          navigationContext,
          qaseLinked: Boolean(qaseTestCase),
        },
      };
    });

    return unifiedResults;
  }

  /**
   * Merge Playwright test steps with Qase test case steps
   */
  mergeSteps(playwrightSteps: TestStep[], qaseSteps: { action: string; expected_result: string }[]): MergedStep[] {
    const merged: MergedStep[] = [];

    // Add Playwright steps
    for (const step of playwrightSteps) {
      merged.push({
        duration: step.duration,
        playwrightLocation: step.location,
        source: 'playwright',
        status: step.status,
        title: step.title,
      });
    }

    // Try to match Qase steps with Playwright steps by title/action
    // If no match, add Qase steps as separate entries
    for (const qaseStep of qaseSteps) {
      const matchingPlaywrightStep = merged.find(
        (m) =>
          m.title.toLowerCase().includes(qaseStep.action.toLowerCase()) ||
          qaseStep.action.toLowerCase().includes(m.title.toLowerCase()),
      );

      if (matchingPlaywrightStep) {
        // Merge Qase data into existing step
        matchingPlaywrightStep.source = 'merged';
        matchingPlaywrightStep.qaseAction = qaseStep.action;
        matchingPlaywrightStep.qaseExpected = qaseStep.expected_result;
      } else {
        // Add as new step
        merged.push({
          qaseAction: qaseStep.action,
          qaseExpected: qaseStep.expected_result,
          source: 'qase',
          status: 'passed', // Qase steps don't have status, assume passed
          title: qaseStep.action,
        });
      }
    }

    return merged;
  }

  /**
   * Build combined context string from Playwright and Qase data
   */
  private buildCombinedContext(playwrightResult: ParsedTestResult, qaseTestCase?: any): string {
    const parts: string[] = [];

    parts.push(`Test: ${playwrightResult.title}`);
    parts.push(`File: ${playwrightResult.file}`);

    if (playwrightResult.error) {
      parts.push(`Error: ${playwrightResult.error}`);
    }

    if (qaseTestCase) {
      parts.push(`Qase Test Case: ${qaseTestCase.title}`);
      if (qaseTestCase.description) {
        parts.push(`Description: ${qaseTestCase.description}`);
      }
      if (qaseTestCase.steps && qaseTestCase.steps.length > 0) {
        parts.push(`Qase Steps: ${qaseTestCase.steps.length} steps defined`);
      }
    }

    return parts.join('\n');
  }

  /**
   * Convert database test results to ParsedTestResult format
   */
  private convertDbResultsToParsedResults(dbResults: any[]): ParsedTestResult[] {
    return dbResults.map((dbResult) => {
      // Convert database steps to TestStep format
      const steps: TestStep[] = (dbResult.steps || []).map((step: any) => ({
        duration: step.duration || 0,
        error: step.error || undefined,
        location: step.location ? JSON.parse(step.location) : undefined,
        status: step.status as 'failed' | 'passed' | 'skipped',
        title: step.title,
      }));

      // Parse playwrightData if available for additional context
      let parsedPlaywrightData: any = null;
      if (dbResult.playwrightData) {
        try {
          parsedPlaywrightData = JSON.parse(dbResult.playwrightData);
        } catch (e) {
          console.warn(`[ReportService] Failed to parse playwrightData for test ${dbResult.id}:`, e);
        }
      }

      // Extract Qase ID from test name if not already set
      let {qaseId} = dbResult;
      if (!qaseId && dbResult.name) {
        const qaseIdMatch = dbResult.name.match(/qase\.id\((\d+)\)/i);
        if (qaseIdMatch) {
          qaseId = parseInt(qaseIdMatch[1], 10);
        }
      }

      return {
        annotations: parsedPlaywrightData?.annotations || undefined,
        duration: dbResult.duration || 0,
        error: dbResult.error || undefined,
        file: dbResult.file,
        id: dbResult.id,
        qaseId,
        status: dbResult.status as 'failed' | 'passed' | 'skipped' | 'timedOut',
        steps,
        title: dbResult.name,
      };
    });
  }

  /**
   * Read test results from filesystem (fallback for backward compatibility)
   */
  private async readFromFilesystem(runId: string, reportPath?: string): Promise<ParsedTestResult[]> {
    // Reports are stored in project root
    const reportPathResolver = new ReportPathResolver(this.projectRoot);
    const resolvedPath = reportPathResolver.resolveReportPath(runId, reportPath);
    const reportFolder = join(this.projectRoot, resolvedPath);

    if (!reportFolder) {
      console.warn(`[ReportService] Report folder not found for run ${runId}`);
      return [];
    }

    const dataPath = join(reportFolder, 'data', 'report.json');

    if (!existsSync(dataPath)) {
      console.warn(`[ReportService] Report data not found at ${dataPath}`);
      return [];
    }

    try {
      const reportData = JSON.parse(readFileSync(dataPath, 'utf-8'));
      return this.testReportParser.parseReportData(reportData);
    } catch (error: any) {
      console.error(`[ReportService] Error reading report data from filesystem:`, error);
      return [];
    }
  }
}
