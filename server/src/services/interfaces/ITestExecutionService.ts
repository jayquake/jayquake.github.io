import type { ProgressUpdate, Project, TestRunConfig } from '../../../../shared/types';

/**
 * Interface for test execution service
 * Manages Playwright test execution with tsx
 */
export type ITestExecutionService = {
  /**
   * Cancel a running test
   * @param runId - Run identifier to cancel
   */
  cancelRun: (runId: string) => Promise<void>;

  /**
   * Check if a test run is active
   * @param runId - Run identifier to check
   */
  isRunActive: (runId: string) => boolean;

  /**
   * Run tests for a project
   * @param runId - Unique run identifier
   * @param project - Project configuration
   * @param config - Test run configuration (baseUrl, headless, etc.)
   * @param onProgress - Callback for progress updates
   * @returns Promise with test results
   */
  runTests: (
    runId: string,
    project: Project,
    config: TestRunConfig,
    onProgress: (update: ProgressUpdate) => void,
  ) => Promise<TestRunResult>;
}

/**
 * Test execution result
 */
export type TestRunResult = {
  reportPath?: string;
  results: {
    duration?: number;
    exitCode?: number;
    failed: number;
    passed: number;
    reportPath?: string;
    skipped: number;
    stderr?: string;
    stdout?: string;
    total: number;
  };
  success: boolean;
}
