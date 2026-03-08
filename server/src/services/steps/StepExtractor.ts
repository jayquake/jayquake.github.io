/**
 * StepExtractor - Extracts test steps from Playwright test results
 * Follows OOP principles for maintainability and testability
 */

export type ExtractedStep = {
  duration: number;
  error?: string;
  location?: string;
  status: 'failed' | 'passed' | 'skipped';
  title: string;
}

export type TestResultData = {
  attachments?: any[];
  duration?: number;
  error?: any;
  errorLocation?: any;
  status: string;
  steps?: any[];
}

/**
 * Abstract base class for step extraction strategies
 */
abstract class StepExtractionStrategy {
  abstract extract(result: TestResultData, testTitle: string): ExtractedStep[];

  protected createStep(
    title: string,
    status: 'failed' | 'passed' | 'skipped',
    duration = 0,
    error?: string,
    location?: string,
  ): ExtractedStep {
    return { duration, error, location, status, title };
  }
}

/**
 * Extracts steps from test attachments (screenshots, videos, traces)
 */
class AttachmentStepExtractor extends StepExtractionStrategy {
  extract(result: TestResultData, testTitle: string): ExtractedStep[] {
    const steps: ExtractedStep[] = [];

    if (!result.attachments || !Array.isArray(result.attachments)) {
      return steps;
    }

    for (const attachment of result.attachments) {
      const attachmentType = this.getAttachmentType(attachment.contentType);
      const attachmentName = attachment.name || 'attachment';

      steps.push(
        this.createStep(`Captured: ${attachmentName} (${attachmentType})`, 'passed', 0, undefined, attachment.path),
      );
    }

    return steps;
  }

  private getAttachmentType(contentType?: string): string {
    if (!contentType) return 'unknown';

    const typeMap: Record<string, string> = {
      'application/zip': 'trace',
      'image/png': 'screenshot',
      'text/plain': 'log',
      'video/webm': 'video',
    };

    return typeMap[contentType] || contentType;
  }
}

/**
 * Extracts steps from test errors and failures
 */
class ErrorStepExtractor extends StepExtractionStrategy {
  extract(result: TestResultData, testTitle: string): ExtractedStep[] {
    const steps: ExtractedStep[] = [];

    if (result.error && result.status === 'failed') {
      const errorLocation = this.buildErrorLocation(result.errorLocation);
      const errorMessage = this.extractErrorMessage(result.error);

      steps.push(this.createStep('Test failed', 'failed', 0, errorMessage, errorLocation));
    }

    return steps;
  }

  private buildErrorLocation(errorLocation?: any): string | undefined {
    if (!errorLocation) return undefined;

    return `${errorLocation.file}:${errorLocation.line}:${errorLocation.column}`;
  }

  private extractErrorMessage(error: any): string {
    if (typeof error === 'string') return error;
    if (error?.message) return error.message;
    return 'Unknown error';
  }
}

/**
 * Extracts test completion step
 */
class TestCompletionExtractor extends StepExtractionStrategy {
  extract(result: TestResultData, testTitle: string): ExtractedStep[] {
    const status = this.mapStatus(result.status);
    const duration = result.duration || 0;

    return [this.createStep(`Test ${status}`, status, duration)];
  }

  private mapStatus(status: string): 'failed' | 'passed' | 'skipped' {
    if (status === 'passed') return 'passed';
    if (status === 'skipped') return 'skipped';
    return 'failed';
  }
}

/**
 * Extracts steps from test initialization
 */
class TestInitializationExtractor extends StepExtractionStrategy {
  extract(result: TestResultData, testTitle: string): ExtractedStep[] {
    return [this.createStep(`Test started: ${testTitle}`, 'passed', 0)];
  }
}

/**
 * Main StepExtractor class that coordinates all extraction strategies
 */
export class StepExtractor {
  private strategies: StepExtractionStrategy[];

  constructor() {
    this.strategies = [
      new TestInitializationExtractor(),
      new AttachmentStepExtractor(),
      new ErrorStepExtractor(),
      new TestCompletionExtractor(),
    ];
  }

  /**
   * Add a custom extraction strategy
   */
  addStrategy(strategy: StepExtractionStrategy): void {
    this.strategies.push(strategy);
  }

  /**
   * Extract all steps from a test result using multiple strategies
   */
  extractSteps(result: TestResultData, testTitle: string): ExtractedStep[] {
    const allSteps: ExtractedStep[] = [];

    for (const strategy of this.strategies) {
      const steps = strategy.extract(result, testTitle);
      allSteps.push(...steps);
    }

    return allSteps;
  }
}
