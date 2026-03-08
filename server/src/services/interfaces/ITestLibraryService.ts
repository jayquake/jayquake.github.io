import type { QaseConfig } from '../../../../shared/types';
import type { TestFileInfo, TestFileWithQase } from '../TestLibraryService';

/**
 * Interface for test library service
 * Manages test file organization with Qase metadata overlay
 */
export type ITestLibraryService = {
  /**
   * Get all test files for a project
   * Returns file tree structure with optional Qase metadata
   * @param projectId - Project identifier
   * @param includeQaseMetadata - Whether to include Qase metadata
   * @returns Promise with array of test file information
   */
  getTestFiles: (projectId: string, includeQaseMetadata?: boolean) => Promise<TestFileInfo[]>;

  /**
   * Get a specific test file with full Qase metadata
   * @param projectId - Project identifier
   * @param filePath - Relative path to the test file
   * @param qaseConfig - Optional Qase configuration for fetching test case details
   * @returns Promise with test file and Qase metadata or null if not found
   */
  getTestFileWithQaseMetadata: (
    projectId: string,
    filePath: string,
    qaseConfig?: QaseConfig,
  ) => Promise<null | TestFileWithQase>;

  /**
   * Link a test file to a Qase test case
   * @param projectId - Project identifier
   * @param filePath - Relative path to the test file
   * @param qaseId - Qase test case ID
   * @param qaseSuiteId - Optional Qase suite ID
   */
  linkToQase: (projectId: string, filePath: string, qaseId: number, qaseSuiteId?: number) => Promise<void>;

  /**
   * Refresh test files for a project (clear cache and rescan)
   * @param projectId - Project identifier
   */
  refreshTestFiles: (projectId: string) => Promise<void>;

  /**
   * Update test file metadata (last run time, etc.)
   * @param projectId - Project identifier
   * @param filePath - Relative path to the test file
   * @param metadata - Metadata to update
   */
  updateTestFileMetadata: (projectId: string, filePath: string, metadata: { lastRun?: Date }) => Promise<void>;
}
