import type { QaseConfig } from '../../../../shared/types';

/**
 * Export result
 */
export type ExportResult = {
  error?: string;
  runId?: string;
  success: boolean;
}

/**
 * Interface for Qase integration service
 * Enhanced with MCP detection and test case management
 */
export type IQaseService = {
  /**
   * Create or get Qase environment
   * @param projectCode - Qase project code
   * @param environmentName - Environment name
   * @param baseUrl - Base URL for the environment
   * @returns Promise with environment slug or null
   */
  createEnvironment: (projectCode: string, environmentName: string, baseUrl: string) => Promise<null | string>;

  /**
   * Export test results to Qase
   * @param config - Qase configuration
   * @param results - Test results to export
   * @returns Promise with export result
   */
  exportResults: (config: QaseConfig, results: any) => Promise<ExportResult>;

  /**
   * Get a Qase test case by ID
   * @param projectCode - Qase project code
   * @param testCaseId - Test case ID
   * @param apiToken - Qase API token
   * @returns Promise with test case or null if not found
   */
  getTestCase: (projectCode: string, testCaseId: number, apiToken: string) => Promise<null | QaseTestCase>;

  /**
   * Get multiple test cases by IDs
   * @param projectCode - Qase project code
   * @param testCaseIds - Array of test case IDs
   * @param apiToken - Qase API token
   * @returns Promise with array of test cases
   */
  getTestCases: (projectCode: string, testCaseIds: number[], apiToken: string) => Promise<QaseTestCase[]>;

  /**
   * Validate Qase configuration
   * @param config - Qase configuration to validate
   * @returns Validation result with errors if any
   */
  validateConfig: (config: QaseConfig) => ValidationResult;
}

/**
 * Qase test case interface
 */
export type QaseTestCase = {
  automation?: number;
  description?: string;
  id: number;
  preconditions?: string;
  steps?: {
    action: string;
    expected_result: string;
  }[];
  suite?: {
    id: number;
    title: string;
  };
  title: string;
}

/**
 * Validation result
 */
export type ValidationResult = {
  errors: string[];
  valid: boolean;
}
