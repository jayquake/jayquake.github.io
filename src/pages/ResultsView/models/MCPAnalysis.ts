import { type TestResult } from './TestRunData';

/**
 * MCPAnalysis - Value object for MCP analysis
 * Encapsulates MCP analysis data with filtering logic
 */
export class MCPAnalysis {
  constructor(
    public readonly id: string,
    public readonly testResultId: null | string,
    public readonly testName: null | string,
    public readonly testFile: null | string,
    public readonly selector: string,
    public readonly suggestedSelectors: string[],
    public readonly confidence: number,
    public readonly error: null | string,
    public readonly qaseId: null | number,
    public readonly navigationContext: any | null,
    public readonly elementInfo: any | null,
    public readonly screenshotPath: null | string = null,
    public readonly tracePath: null | string = null
  ) {}

  /**
   * Get confidence percentage
   */
  getConfidencePercentage(): number {
    return Math.round(this.confidence * 100);
  }

  /**
   * Get formatted selector (truncated if too long)
   */
  getFormattedSelector(maxLength = 100): string {
    if (this.selector.length <= maxLength) return this.selector;
    return `${this.selector.substring(0, maxLength)}...`;
  }

  /**
   * Get navigation URL
   */
  getNavigationUrl(): null | string {
    return this.navigationContext?.url || null;
  }

  /**
   * Check if confidence is high (>= 70%)
   */
  hasHighConfidence(): boolean {
    return this.confidence >= 0.7;
  }

  /**
   * Check if navigation context is available
   */
  hasNavigationContext(): boolean {
    return Boolean(this.navigationContext?.url);
  }

  /**
   * Check if this analysis is for a failed test
   */
  isForFailedTest(testResults: TestResult[]): boolean {
    // Method 1: Match by testResultId
    if (this.testResultId) {
      const result = testResults.find(r => r.id === this.testResultId);
      return result?.status === 'failed';
    }

    // Method 2: Match by test name/file
    if (this.testName || this.testFile) {
      const result = testResults.find(
        r =>
          (this.testName && r.name === this.testName) || (this.testFile && r.file === this.testFile)
      );
      return result?.status === 'failed';
    }

    // Strict: hide if we can't determine
    return false;
  }
}
