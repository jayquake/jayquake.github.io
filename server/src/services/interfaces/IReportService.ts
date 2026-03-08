import type { FailureContext, MergedStep, NavigationContext, UnifiedTestResult } from '../ReportService';

/**
 * Interface for unified report service
 * Combines Qase and Playwright HTML reports seamlessly
 */
export type IReportService = {
  /**
   * Get failure context for a specific test result
   * @param testResultId - Test result identifier
   * @returns Promise with failure context
   */
  getFailureContext: (testResultId: string) => Promise<FailureContext>;

  /**
   * Get navigation context for a failed test
   * @param failedTest - Unified test result for failed test
   * @returns Navigation context for MCP
   */
  getNavigationContext: (failedTest: UnifiedTestResult) => NavigationContext;

  /**
   * Get unified analytics for a test run
   * @param runId - Test run identifier
   * @returns Combined metrics from Playwright and Qase
   */
  getUnifiedAnalytics: (runId: string) => Promise<{
    duration: number;
    failed: number;
    passed: number;
    qaseLinked: number;
    skipped: number;
    total: number;
  }>;

  /**
   * Get unified report for a test run (Playwright + Qase combined)
   * @param runId - Test run identifier
   * @returns Promise with array of unified test results
   */
  getUnifiedReport: (runId: string) => Promise<UnifiedTestResult[]>;

  /**
   * Merge Playwright and Qase test steps
   * @param playwrightSteps - Steps from Playwright
   * @param qaseSteps - Steps from Qase
   * @returns Merged steps array
   */
  mergeSteps: (playwrightSteps: TestStep[], qaseSteps: { action: string; expected_result: string }[]) => MergedStep[];
}

/**
 * Test step interface
 */
export type TestStep = {
  duration?: number;
  error?: string;
  location?: { file: string; line: number };
  status: 'failed' | 'passed';
  title: string;
}
