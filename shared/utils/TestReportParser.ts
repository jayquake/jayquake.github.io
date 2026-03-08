/**
 * TestReportParser class parses Playwright HTML report JSON data
 * to extract test results, steps, and detailed information.
 */
import { QaseIdExtractor } from './QaseIdExtractor';

export type ParsedTestResult = {
  annotations?: {
    description: string;
    type: string;
  }[];
  duration: number;
  error?: string;
  file: string;
  id: string;
  qaseId?: number;
  status: 'failed' | 'passed' | 'skipped' | 'timedOut';
  steps: TestStep[];
  title: string;
}

export type TestStep = {
  attachments?: {
    contentType: string;
    name: string;
    path: string;
  }[];
  duration: number;
  error?: string;
  location?: {
    column: number;
    file: string;
    line: number;
  };
  status: 'failed' | 'passed' | 'skipped';
  title: string;
}

export class TestReportParser {
  /**
   * Get summary statistics from parsed results
   */
  getSummary(results: ParsedTestResult[]): {
    failed: number;
    passed: number;
    skipped: number;
    total: number;
    totalDuration: number;
  } {
    return results.reduce(
      (acc, result) => {
        acc.total++;
        acc.totalDuration += result.duration;

        if (result.status === 'passed') {
          acc.passed++;
        } else if (result.status === 'failed' || result.status === 'timedOut') {
          acc.failed++;
        } else if (result.status === 'skipped') {
          acc.skipped++;
        }

        return acc;
      },
      {
        failed: 0,
        passed: 0,
        skipped: 0,
        total: 0,
        totalDuration: 0,
      },
    );
  }

  /**
   * Parse HTML report JSON data
   */
  parseReportData(reportData: any): ParsedTestResult[] {
    const results: ParsedTestResult[] = [];

    if (!reportData.files || !Array.isArray(reportData.files)) {
      return results;
    }

    for (const file of reportData.files) {
      if (!file.tests || !Array.isArray(file.tests)) {
        continue;
      }

      for (const test of file.tests) {
        if (!test.results || test.results.length === 0) {
          continue;
        }

        // Get the last result (most recent run)
        const lastResult = test.results[test.results.length - 1];

        // Extract Qase ID using centralized extractor
        let qaseId: number | undefined;
        const extractedId = QaseIdExtractor.extract(test.title);
        if (extractedId !== null) {
          qaseId = extractedId;
        } else if (test.annotations) {
          // Check annotations as fallback
          for (const annotation of test.annotations) {
            if (annotation.type === 'qase' && annotation.description) {
              const annotationId = QaseIdExtractor.extract(annotation.description);
              if (annotationId !== null) {
                qaseId = annotationId;
                break;
              }
            }
          }
        }

        // Parse test steps
        const steps: TestStep[] = this.parseTestSteps(lastResult);

        // Extract error message if failed
        let error: string | undefined;
        if (lastResult.status === 'failed' || lastResult.status === 'timedOut') {
          error = this.extractErrorMessage(lastResult);
        }

        results.push({
          annotations: test.annotations,
          duration: lastResult.duration || 0,
          error,
          file: file.fileName || '',
          id: test.testId || `${file.fileName}-${test.title}`,
          qaseId,
          status: lastResult.status,
          steps,
          title: test.title,
        });
      }
    }

    return results;
  }

  /**
   * Extract error message from result
   */
  private extractErrorMessage(result: any): string | undefined {
    if (result.error) {
      return this.formatError(result.error);
    }

    // Look for error in steps
    if (result.steps) {
      for (const step of result.steps) {
        if (step.error) {
          return this.formatError(step.error);
        }
      }
    }

    return undefined;
  }

  /**
   * Format error object to string
   */
  private formatError(error: any): string {
    if (typeof error === 'string') {
      return error;
    }

    if (error?.message) {
      let errorMsg = error.message;
      if (error.stack) {
        errorMsg += `\n${  error.stack}`;
      }
      return errorMsg;
    }

    if (error?.value) {
      return String(error.value);
    }

    return JSON.stringify(error, null, 2);
  }

  /**
   * Parse test steps from result
   */
  private parseTestSteps(result: any): TestStep[] {
    const steps: TestStep[] = [];

    if (!result.steps || !Array.isArray(result.steps)) {
      return steps;
    }

    for (const step of result.steps) {
      const stepData: TestStep = {
        duration: step.duration || 0,
        status: step.error ? 'failed' : 'passed',
        title: step.title || 'Unknown step',
      };

      // Extract location if available
      if (step.location) {
        stepData.location = {
          column: step.location.column || 0,
          file: step.location.file || '',
          line: step.location.line || 0,
        };
      }

      // Extract error if step failed
      if (step.error) {
        stepData.error = this.formatError(step.error);
        stepData.status = 'failed';
      }

      // Extract attachments
      if (step.attachments && Array.isArray(step.attachments)) {
        stepData.attachments = step.attachments.map((att: any) => ({
          contentType: att.contentType || 'unknown',
          name: att.name || 'attachment',
          path: att.path || '',
        }));
      }

      steps.push(stepData);
    }

    return steps;
  }
}
