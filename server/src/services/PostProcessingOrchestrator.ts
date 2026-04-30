/**
 * PostProcessingOrchestrator
 *
 * Main coordinator for post-test-execution processing.
 * Orchestrates the processing of:
 * - Playwright test reports (JSON + HTML)
 * - Qase test metadata
 * - Test artifacts (videos, screenshots, traces)
 * - Database population with all processed data
 *
 * Design Pattern: Orchestrator Pattern
 * Responsibilities:
 * - Coordinate multiple processors in correct order
 * - Handle errors gracefully
 * - Ensure atomic operations (all-or-nothing)
 * - Provide detailed logging
 */

import { DatabaseService } from '../infrastructure/database/DatabaseService';
import { TestRunRepository } from '../repositories/TestRunRepository';
import { AccessFlowAuditProcessor } from './processors/AccessFlowAuditProcessor';
import { DatabasePopulator } from './processors/DatabasePopulator';
import { JestOutputProcessor } from './processors/JestOutputProcessor';
import { JUnitReportProcessor } from './processors/JUnitReportProcessor';
import { MetadataProcessor } from './processors/MetadataProcessor';
import type { PlaywrightProcessorResult } from './processors/PlaywrightReportProcessor';
import { PlaywrightReportProcessor } from './processors/PlaywrightReportProcessor';
import { QaseDataProcessor } from './processors/QaseDataProcessor';

export type ProcessingResult = {
  duration: number;
  errors: string[];
  processedData: {
    artifactsProcessed: number;
    qaseTestsLinked: number;
    reportPath?: string;
    testsProcessed: number;
  };
  runId: string;
  success: boolean;
}

export class PostProcessingOrchestrator {
  private accessFlowAuditProcessor: AccessFlowAuditProcessor;
  private databasePopulator: DatabasePopulator;
  private jestProcessor: JestOutputProcessor;
  private junitProcessor: JUnitReportProcessor;
  private metadataProcessor: MetadataProcessor;
  private playwrightProcessor: PlaywrightReportProcessor;
  private qaseProcessor: QaseDataProcessor;
  private testRunRepository: TestRunRepository;

  constructor() {
    const prisma = DatabaseService.getInstance().getClient();
    this.playwrightProcessor = new PlaywrightReportProcessor();
    this.junitProcessor = new JUnitReportProcessor();
    this.jestProcessor = new JestOutputProcessor();
    this.accessFlowAuditProcessor = new AccessFlowAuditProcessor();
    this.qaseProcessor = new QaseDataProcessor();
    this.metadataProcessor = new MetadataProcessor();
    this.databasePopulator = new DatabasePopulator(prisma);
    this.testRunRepository = new TestRunRepository(prisma);
  }

  /**
   * Check if a test run needs processing
   * (for when opening from history)
   */
  async needsProcessing(runId: string): Promise<boolean> {
    const testRun = await this.testRunRepository.findByRunId(runId);
    if (!testRun) {
      return false;
    }

    // Check if results array is empty or summary stats are all 0
    const hasResults = testRun.results && testRun.results.length > 0;
    const hasSummary = testRun.summary && (testRun.summary as any).total > 0;

    return !hasResults || !hasSummary;
  }

  /**
   * Process if needed (idempotent)
   * Safe to call multiple times
   */
  async processIfNeeded(runId: string): Promise<null | ProcessingResult> {
    const needs = await this.needsProcessing(runId);
    if (!needs) {
      console.log(`[PostProcessingOrchestrator] Run ${runId} already processed, skipping`);
      return null;
    }

    return await this.processTestRun(runId);
  }

  /**
   * Main orchestration method
   * Executes all processing steps in sequence
   *
   * Steps:
   * 1. Validate test run exists
   * 2. Process Playwright JSON report
   * 3. Process Qase metadata (if available)
   * 4. Process artifacts and metadata
   * 5. Populate database
   * 6. Update test run summary
   */
  async processTestRun(runId: string): Promise<ProcessingResult> {
    const startTime = Date.now();
    console.log(`[PostProcessingOrchestrator] Starting post-processing for run: ${runId}`);

    const result: ProcessingResult = {
      duration: 0,
      errors: [],
      processedData: {
        artifactsProcessed: 0,
        qaseTestsLinked: 0,
        testsProcessed: 0,
      },
      runId,
      success: false,
    };

    try {
      // Step 1: Validate test run exists
      console.log('[PostProcessingOrchestrator] Step 1: Validating test run...');
      const testRun = await this.testRunRepository.findByRunId(runId);
      if (!testRun) {
        throw new Error(`Test run not found: ${runId}`);
      }

      const framework = (testRun as any).testFramework || 'playwright';
      console.log(`[PostProcessingOrchestrator] Test framework: ${framework}`);

      // Step 2: Process test report (framework-specific)
      let reportData: PlaywrightProcessorResult;

      if (framework === 'selenium') {
        console.log('[PostProcessingOrchestrator] Step 2: Processing Jest output...');
        reportData = await this.jestProcessor.process(runId);
      } else if (framework === 'pytest' || framework === 'maven') {
        console.log(`[PostProcessingOrchestrator] Step 2: Processing ${framework} JUnit report...`);
        const config = JSON.parse(testRun.config || '{}');
        const projectId = (testRun as any).projectId;
        const outputDir = config.outputDirectory ||
          (framework === 'pytest'
            ? (projectId === 'accessflow-python-selenium' ? 'sdk/tests/selenium/python/test-results' : 'sdk/tests/playwright/python/test-results')
            : (projectId === 'accessflow-java-selenium' ? 'sdk/tests/selenium/java/test-results' : 'sdk/tests/playwright/java/target/surefire-reports'));
        reportData = await this.junitProcessor.process(runId, outputDir, framework);
      } else {
        console.log('[PostProcessingOrchestrator] Step 2: Processing Playwright report...');
        reportData = await this.playwrightProcessor.process(runId);
      }

      if (!reportData.success) {
        result.errors.push(...reportData.errors);
        throw new Error(`Failed to process ${framework} report`);
      }
      result.processedData.testsProcessed = reportData.tests.length;
      result.processedData.reportPath = reportData.htmlReportPath;

      // Step 3: Process Qase metadata (if tests have Qase IDs)
      console.log('[PostProcessingOrchestrator] Step 3: Processing Qase metadata...');
      const qaseData = await this.qaseProcessor.process(reportData.tests, runId);
      if (qaseData.success) {
        result.processedData.qaseTestsLinked = qaseData.linkedTests;
      } else {
        console.warn('[PostProcessingOrchestrator] Qase processing failed (non-critical):', qaseData.errors);
        result.errors.push(...qaseData.errors.map((e) => `[Qase] ${e}`));
      }

      // Step 4: Process artifacts and metadata (Playwright only — pytest/maven don't produce Playwright artifacts)
      let metadataResult = { artifactCount: 0, artifacts: [] as any[], errors: [] as string[], success: true };
      if (framework === 'playwright') {
        console.log('[PostProcessingOrchestrator] Step 4: Processing artifacts and metadata...');
        metadataResult = await this.metadataProcessor.process(runId, reportData.tests);
        if (!metadataResult.success) {
          console.warn('[PostProcessingOrchestrator] Metadata processing failed (non-critical):', metadataResult.errors);
          result.errors.push(...metadataResult.errors.map((e) => `[Metadata] ${e}`));
        }
      } else {
        console.log(`[PostProcessingOrchestrator] Step 4: Skipping artifact processing for ${framework}`);
      }
      result.processedData.artifactsProcessed = metadataResult.artifactCount;

      // Step 5: Populate database
      console.log('[PostProcessingOrchestrator] Step 5: Populating database...');
      const dbResult = await this.databasePopulator.populate(runId, reportData, qaseData, metadataResult);
      if (!dbResult.success) {
        result.errors.push(...dbResult.errors);
        throw new Error('Failed to populate database');
      }

      // Step 6: Process AccessFlow SDK audit data (non-critical)
      const sdkType = (testRun as any).sdkType;
      if (sdkType) {
        try {
          const config = JSON.parse(testRun.config || '{}');
          const projectId = (testRun as any).projectId;
          const outputDir = config.outputDirectory ||
            (sdkType === 'python'
              ? (projectId === 'accessflow-python-selenium' ? 'sdk/tests/selenium/python/test-results' : 'sdk/tests/playwright/python/test-results')
              : sdkType === 'java'
                ? (projectId === 'accessflow-java-selenium' ? 'sdk/tests/selenium/java/test-results' : 'sdk/tests/playwright/java/target/surefire-reports')
              : framework === 'selenium' ? 'sdk/tests/selenium/node/test-results'
              : 'sdk/tests/playwright/node/test-results');

          const workingDir = config.workingDirectory ||
            (sdkType === 'python'
              ? (projectId === 'accessflow-python-selenium' ? 'sdk/tests/selenium/python' : 'sdk/tests/playwright/python')
              : sdkType === 'java'
                ? (projectId === 'accessflow-java-selenium' ? 'sdk/tests/selenium/java' : 'sdk/tests/playwright/java')
              : framework === 'selenium' ? 'sdk/tests/selenium/node'
              : 'sdk/tests/playwright/node');

          console.log(`[PostProcessingOrchestrator] Step 6: Processing AccessFlow audit data (${sdkType})...`);
          const auditResult = await this.accessFlowAuditProcessor.process(
            runId, sdkType, outputDir, testRun.stdout || undefined, testRun.startTime, workingDir,
          );

          if (auditResult.success) {
            await this.databasePopulator.persistSdkAuditReport(testRun.id, auditResult);
            console.log(`[PostProcessingOrchestrator] SDK audit saved: ${auditResult.totalIssues} issues across ${auditResult.totalPages} pages`);
          } else {
            console.warn('[PostProcessingOrchestrator] SDK audit processing skipped:', auditResult.errors);
          }
        } catch (auditError: any) {
          console.warn('[PostProcessingOrchestrator] SDK audit processing failed (non-critical):', auditError.message);
        }
      }

      // Step 7: Update test run summary
      console.log('[PostProcessingOrchestrator] Step 7: Updating test run summary...');
      await this.updateTestRunSummary(runId, reportData);

      if (reportData.htmlReportPath) {
        console.log(`[PostProcessingOrchestrator] HTML report available: ${reportData.htmlReportPath}`);
      }

      result.success = true;
      result.duration = Date.now() - startTime;

      console.log(`[PostProcessingOrchestrator] Post-processing completed in ${result.duration}ms`);
      console.log(`[PostProcessingOrchestrator] Summary:`, {
        artifactsProcessed: result.processedData.artifactsProcessed,
        errors: result.errors.length,
        framework,
        qaseTestsLinked: result.processedData.qaseTestsLinked,
        testsProcessed: result.processedData.testsProcessed,
      });
    } catch (error: any) {
      result.success = false;
      result.errors.push(error.message);
      result.duration = Date.now() - startTime;
      console.error('[PostProcessingOrchestrator] Post-processing failed:', error);
    }

    return result;
  }

  /**
   * Update test run summary with final stats
   */
  private async updateTestRunSummary(runId: string, playwrightData: any): Promise<void> {
    const summary = {
      duration: playwrightData.duration,
      failed: playwrightData.tests.filter((t: any) => t.status === 'failed').length,
      passed: playwrightData.tests.filter((t: any) => t.status === 'passed').length,
      skipped: playwrightData.tests.filter((t: any) => t.status === 'skipped').length,
      total: playwrightData.tests.length,
    };

    // Update reportPath with the HTML report path from Playwright
    await this.testRunRepository.updateByRunId(runId, {
      reportPath: playwrightData.htmlReportPath,
      summary: JSON.stringify(summary),
    });

    console.log('[PostProcessingOrchestrator] Test run summary updated:', summary);
  }
}
