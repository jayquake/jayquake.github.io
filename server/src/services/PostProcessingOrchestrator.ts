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
import { DatabasePopulator } from './processors/DatabasePopulator';
import { MetadataProcessor } from './processors/MetadataProcessor';
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
  private databasePopulator: DatabasePopulator;
  private metadataProcessor: MetadataProcessor;
  private playwrightProcessor: PlaywrightReportProcessor;
  private qaseProcessor: QaseDataProcessor;
  private testRunRepository: TestRunRepository;

  constructor() {
    const prisma = DatabaseService.getInstance().getClient();
    this.playwrightProcessor = new PlaywrightReportProcessor();
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

      // Step 2: Process Playwright JSON report
      console.log('[PostProcessingOrchestrator] Step 2: Processing Playwright report...');
      const playwrightData = await this.playwrightProcessor.process(runId);
      if (!playwrightData.success) {
        result.errors.push(...playwrightData.errors);
        throw new Error('Failed to process Playwright report');
      }
      result.processedData.testsProcessed = playwrightData.tests.length;
      result.processedData.reportPath = playwrightData.htmlReportPath;

      // Step 3: Process Qase metadata (if tests have Qase IDs)
      console.log('[PostProcessingOrchestrator] Step 3: Processing Qase metadata...');
      const qaseData = await this.qaseProcessor.process(playwrightData.tests, runId);
      if (qaseData.success) {
        result.processedData.qaseTestsLinked = qaseData.linkedTests;
      } else {
        console.warn('[PostProcessingOrchestrator] Qase processing failed (non-critical):', qaseData.errors);
        result.errors.push(...qaseData.errors.map((e) => `[Qase] ${e}`));
      }

      // Step 4: Process artifacts and metadata
      console.log('[PostProcessingOrchestrator] Step 4: Processing artifacts and metadata...');
      const metadataResult = await this.metadataProcessor.process(runId, playwrightData.tests);
      if (metadataResult.success) {
        result.processedData.artifactsProcessed = metadataResult.artifactCount;
      } else {
        console.warn('[PostProcessingOrchestrator] Metadata processing failed (non-critical):', metadataResult.errors);
        result.errors.push(...metadataResult.errors.map((e) => `[Metadata] ${e}`));
      }

      // Step 5: Populate database
      console.log('[PostProcessingOrchestrator] Step 5: Populating database...');
      const dbResult = await this.databasePopulator.populate(runId, playwrightData, qaseData, metadataResult);
      if (!dbResult.success) {
        result.errors.push(...dbResult.errors);
        throw new Error('Failed to populate database');
      }

      // Step 6: Update test run summary
      console.log('[PostProcessingOrchestrator] Step 6: Updating test run summary...');
      await this.updateTestRunSummary(runId, playwrightData);

      // HTML report is already generated by Playwright's HTML reporter
      // The path is captured in playwrightData.htmlReportPath (set in Step 2)
      if (playwrightData.htmlReportPath) {
        console.log(`[PostProcessingOrchestrator] ✅ HTML report available: ${playwrightData.htmlReportPath}`);
      }

      result.success = true;
      result.duration = Date.now() - startTime;

      console.log(`[PostProcessingOrchestrator] ✅ Post-processing completed successfully in ${result.duration}ms`);
      console.log(`[PostProcessingOrchestrator] Summary:`, {
        artifactsProcessed: result.processedData.artifactsProcessed,
        errors: result.errors.length,
        qaseTestsLinked: result.processedData.qaseTestsLinked,
        testsProcessed: result.processedData.testsProcessed,
      });
    } catch (error: any) {
      result.success = false;
      result.errors.push(error.message);
      result.duration = Date.now() - startTime;
      console.error('[PostProcessingOrchestrator] ❌ Post-processing failed:', error);
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
