/**
 * PlaywrightReportProcessor
 *
 * Processes Playwright JSON test reports
 * Extracts test results, steps, artifacts, and metadata
 *
 * Design Pattern: Strategy Pattern (implements processor interface)
 * Responsibilities:
 * - Read and parse Playwright JSON report
 * - Extract test results with all details
 * - Extract test steps from attachments and errors
 * - Map artifacts to test results
 * - Calculate test statistics
 */

import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join, resolve } from 'path';

import { QaseIdExtractor } from '../../../../shared/utils/QaseIdExtractor';

export type PlaywrightProcessorResult = {
  duration: number;
  errors: string[];
  htmlReportPath?: string;
  success: boolean;
  tests: ProcessedTest[];
}

export type ProcessedArtifact = {
  contentType?: string;
  name: string;
  path: string;
  type: 'data' | 'log' | 'screenshot' | 'trace' | 'video';
}

export type ProcessedStep = {
  category?: string;
  duration?: number;
  error?: string;
  startTime?: Date;
  title: string;
}

export type ProcessedAnnotation = {
  description?: string;
  type: string;
}

export type ProcessedTest = {
  annotations: ProcessedAnnotation[];
  artifacts: ProcessedArtifact[];
  duration: number;
  endTime?: Date;
  error?: string;
  fullTitle: string;
  qaseId?: string;
  startTime?: Date;
  status: 'failed' | 'passed' | 'skipped';
  steps: ProcessedStep[];
  testFile: string;
  title: string;
}

export class PlaywrightReportProcessor {
  private testE2eRoot: string;

  constructor() {
    // Navigate to test-e2e directory (5 levels up from backend/dist/services/processors)
    // __dirname = standalone-app/backend/dist/services/processors
    // Need to go: dist/services/processors -> dist/services -> dist -> backend -> standalone-app -> test-e2e
    this.testE2eRoot = resolve(join(__dirname, '../../../../..'));
  }

  /**
   * Process Playwright JSON report for a test run
   */
  async process(runId: string): Promise<PlaywrightProcessorResult> {
    console.log(`[PlaywrightReportProcessor] Processing report for run: ${runId}`);

    const result: PlaywrightProcessorResult = {
      duration: 0,
      errors: [],
      success: false,
      tests: [],
    };

    try {
      // Find JSON report
      const jsonReportPath = this.getJsonReportPath(runId);
      if (!jsonReportPath || !existsSync(jsonReportPath)) {
        const expectedPath = join(this.testE2eRoot, `reports/json/${runId}.json`);
        throw new Error(
          `JSON report not found for run: ${runId}\n\n` +
            `Expected location: ${expectedPath}\n` +
            `Current directory: ${process.cwd()}\n` +
            `Test E2E root: ${this.testE2eRoot}\n\n` +
            `To fix:\n` +
            `1. Ensure Playwright config includes JSON reporter:\n` +
            `   reporter: [['json', { outputFile: 'reports/json/\${runId}.json' }]]\n` +
            `2. Check that tests actually ran (look for process errors above)\n` +
            `3. Verify file permissions for ${join(this.testE2eRoot, 'reports/json')}\n` +
            `4. Check if the test execution completed successfully`,
        );
      }

      console.log(`[PlaywrightReportProcessor] Reading JSON report: ${jsonReportPath}`);
      const reportContent = await readFile(jsonReportPath, 'utf-8');
      const report = JSON.parse(reportContent);

      // Extract HTML report path
      const htmlReportPath = `reports/html/${runId}`;
      const fullHtmlPath = join(this.testE2eRoot, htmlReportPath);
      if (existsSync(join(fullHtmlPath, 'index.html'))) {
        result.htmlReportPath = htmlReportPath;
      }

      // Process all test suites
      result.tests = this.extractTests(report, runId);
      result.duration = report.stats?.duration || 0;
      result.success = true;

      console.log(`[PlaywrightReportProcessor] ✅ Processed ${result.tests.length} tests`);
    } catch (error: any) {
      result.errors.push(error.message);
      console.error('[PlaywrightReportProcessor] ❌ Processing failed:', error);
    }

    return result;
  }

  /**
   * Extract artifacts from test result
   */
  private extractArtifacts(result: any, runId: string): ProcessedArtifact[] {
    const artifacts: ProcessedArtifact[] = [];

    if (!result.attachments || !Array.isArray(result.attachments)) {
      return artifacts;
    }

    for (const attachment of result.attachments) {
      let type: ProcessedArtifact['type'] = 'data';

      if (attachment.name === 'screenshot' || attachment.contentType?.includes('image')) {
        type = 'screenshot';
      } else if (attachment.name === 'video' || attachment.contentType?.includes('video')) {
        type = 'video';
      } else if (attachment.name === 'trace' || attachment.path?.includes('trace')) {
        type = 'trace';
      } else if (attachment.contentType?.includes('text') || attachment.name?.includes('log')) {
        type = 'log';
      }

      if (attachment.path) {
        artifacts.push({
          contentType: attachment.contentType,
          name: attachment.name || 'attachment',
          path: attachment.path,
          type,
        });
      }
    }

    return artifacts;
  }

  /**
   * Extract Qase test case ID from title or tags
   * Uses centralized QaseIdExtractor for consistency
   */
  private extractQaseId(title: string, tags?: string[]): string | undefined {
    // Check tags first (Qase reporter adds qase:id tag)
    if (tags) {
      for (const tag of tags) {
        if (tag.startsWith('qase:id=') || tag.startsWith('@qase:id=')) {
          return tag.replace(/^@?qase:id=/, '');
        }
      }
    }

    // Use centralized extractor for qase.id(123) pattern
    const extractedId = QaseIdExtractor.extract(title);
    if (extractedId !== null) {
      return extractedId.toString();
    }

    // Check title for [Q-123] or (Q-123) format as fallback
    const qaseMatch = title.match(/\[Q-(\d+)\]|\(Q-(\d+)\)/);
    if (qaseMatch) {
      return qaseMatch[1] || qaseMatch[2];
    }

    return undefined;
  }

  /**
   * Flatten nested Playwright step trees into a linear list (depth-first).
   * Playwright `result.steps` can be nested — e.g. a `test.step()` containing
   * page-object calls that are themselves steps. We flatten to preserve order
   * while keeping the top-level `test.step()` titles as the primary entries.
   * Only the top-level steps are emitted; deeply nested sub-steps are skipped
   * to keep the list concise and readable.
   */
  private flattenPlaywrightSteps(rawSteps: any[]): ProcessedStep[] {
    const flattened: ProcessedStep[] = [];

    for (const step of rawSteps) {
      if (!step || !step.title) continue;

      // Determine error: either from the step itself or from a nested child
      let stepError: string | undefined;
      if (step.error) {
        stepError = this.formatError(step.error);
      }

      flattened.push({
        category: 'test-step',
        duration: step.duration ?? undefined,
        error: stepError,
        title: step.title,
      });
    }

    return flattened;
  }

  /**
   * Extract test steps from Playwright result data.
   *
   * Strategy (in priority order):
   *   1. Use `result.steps` from the Playwright JSON report when available.
   *      These contain actual `test.step()` titles like "1. Setup: make changes"
   *      which are far more informative than lifecycle stubs.
   *   2. Fall back to synthesizing steps from attachments/errors/status.
   *      This covers older report formats or tests without `test.step()` calls.
   *
   * Both paths prepend a "Test started" bookend and append a "Test {status}" bookend.
   */
  private extractSteps(result: any, testTitle: string): ProcessedStep[] {
    const steps: ProcessedStep[] = [];

    // Bookend: test start
    steps.push({
      category: 'test-start',
      startTime: result.startTime ? new Date(result.startTime) : undefined,
      title: `Test started: ${testTitle}`,
    });

    // --- Strategy 1: Use actual Playwright test.step() data ---
    if (result.steps && Array.isArray(result.steps) && result.steps.length > 0) {
      const realSteps = this.flattenPlaywrightSteps(result.steps);
      if (realSteps.length > 0) {
        steps.push(...realSteps);

        // Bookend: test end
        const status =
          result.status === 'passed' ? 'passed'
          : result.status === 'skipped' ? 'skipped'
          : 'failed';
        steps.push({
          category: 'test-end',
          duration: result.duration,
          title: `Test ${status}`,
        });

        return steps;
      }
    }

    // --- Strategy 2: Fallback — synthesize from attachments and errors ---
    if (result.attachments && Array.isArray(result.attachments)) {
      for (const attachment of result.attachments) {
        if (attachment.name && attachment.name !== 'screenshot' && attachment.name !== 'video') {
          steps.push({
            category: 'attachment',
            title: `Captured: ${attachment.name} (${attachment.contentType || 'unknown'})`,
          });
        }
      }
    }

    // Add error step if failed
    if (result.status === 'failed' && result.error) {
      steps.push({
        category: 'error',
        error: this.formatError(result.error),
        title: 'Test failed',
      });
    }

    // Bookend: test end
    const status =
      result.status === 'passed' ? 'passed'
      : result.status === 'skipped' ? 'skipped'
      : 'failed';
    steps.push({
      category: 'test-end',
      duration: result.duration,
      title: `Test ${status}`,
    });

    return steps;
  }

  /**
   * Extract all tests from Playwright report
   */
  private extractTests(report: any, runId: string): ProcessedTest[] {
    const tests: ProcessedTest[] = [];

    if (!report.suites || !Array.isArray(report.suites)) {
      return tests;
    }

    // Recursively process suites
    this.processTestSuites(report.suites, tests, runId);

    return tests;
  }

  /**
   * Format error message for database storage
   */
  private formatError(error: any): string {
    if (typeof error === 'string') {
      return error;
    }

    if (error.message) {
      return error.message;
    }

    return JSON.stringify(error);
  }

  /**
   * Get JSON report path for a run
   * Tries multiple locations
   */
  private getJsonReportPath(runId: string): null | string {
    const possiblePaths = [
      join(this.testE2eRoot, 'reports', 'json', 'test-results.json'),
      join(this.testE2eRoot, 'reports', 'json', runId, 'test-results.json'),
      join(this.testE2eRoot, 'test-results', '.last-run.json'),
    ];

    for (const path of possiblePaths) {
      if (existsSync(path)) {
        return path;
      }
    }

    return null;
  }

  /**
   * Process a single test spec
   */
  private processSpec(spec: any, suiteTitle: string, runId: string): null | ProcessedTest {
    if (!spec.tests || spec.tests.length === 0) {
      return null;
    }

    // Get the first test result (Playwright can retry tests)
    const test = spec.tests[0];
    if (!test.results || test.results.length === 0) {
      return null;
    }

    const result = test.results[test.results.length - 1]; // Last result (after retries)

    // Determine test file
    const testFile = spec.file || spec.location?.file || 'unknown';
    const fileName = testFile.split('/').pop() || testFile;

    // Extract Qase ID from title or tags
    const qaseId = this.extractQaseId(spec.title, spec.tags);

    // Extract error if failed
    const error = result.status === 'failed' && result.error ? this.formatError(result.error) : undefined;

    // Extract steps from attachments and errors
    const steps = this.extractSteps(result, spec.title);

    // Extract artifacts
    const artifacts = this.extractArtifacts(result, runId);

    // Extract annotations from the test object (Playwright stores them on test, not result)
    const annotations: ProcessedAnnotation[] = [];
    if (test.annotations && Array.isArray(test.annotations)) {
      for (const ann of test.annotations) {
        if (ann.type) {
          annotations.push({
            description: ann.description,
            type: ann.type,
          });
        }
      }
    }

    return {
      annotations,
      artifacts,
      duration: result.duration || 0,
      endTime:
        result.startTime && result.duration ?
          new Date(new Date(result.startTime).getTime() + result.duration)
        : undefined,
      error,
      fullTitle: `${suiteTitle} › ${spec.title}`,
      qaseId,
      startTime: result.startTime ? new Date(result.startTime) : undefined,
      status:
        result.status === 'passed' ? 'passed'
        : result.status === 'skipped' ? 'skipped'
        : 'failed',
      steps,
      testFile: fileName,
      title: spec.title,
    };
  }

  /**
   * Recursively process test suites
   */
  private processTestSuites(suites: any[], tests: ProcessedTest[], runId: string, parentTitle = ''): void {
    for (const suite of suites) {
      const suiteTitle = parentTitle ? `${parentTitle} › ${suite.title}` : suite.title;

      // Process specs in this suite
      if (suite.specs && Array.isArray(suite.specs)) {
        for (const spec of suite.specs) {
          const processedTest = this.processSpec(spec, suiteTitle, runId);
          if (processedTest) {
            tests.push(processedTest);
          }
        }
      }

      // Process nested suites
      if (suite.suites && Array.isArray(suite.suites)) {
        this.processTestSuites(suite.suites, tests, runId, suiteTitle);
      }
    }
  }
}
