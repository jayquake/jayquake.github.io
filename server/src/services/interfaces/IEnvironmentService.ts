import type { Project } from '../../../../shared/types';

/**
 * Environment metadata
 */
export type EnvironmentMetadata = {
  [key: string]: any;
  appEngineVersion?: string;
  branch?: string;
  cloudRunService?: string;
  lastUsedInRun?: string;
}

/**
 * Environment source type
 */
export type EnvironmentSource = 'gcp' | 'github' | 'manual';

/**
 * Interface for environment discovery and management service
 * Provides GitHub/GCP integration and domain memory
 */
export type IEnvironmentService = {
  /**
   * Discover environments from Google Cloud Platform
   * @param project - Project configuration
   * @param gcpCredentials - Optional GCP credentials for authentication
   * @returns Promise with array of discovered environment URLs
   */
  discoverFromGCP: (project: Project, gcpCredentials?: string) => Promise<string[]>;

  /**
   * Discover environments from GitHub
   * @param project - Project configuration
   * @param githubToken - Optional GitHub API token for authentication
   * @returns Promise with array of discovered environment URLs
   */
  discoverFromGitHub: (project: Project, githubToken?: string) => Promise<string[]>;

  /**
   * Get recent environments from memory (database)
   * @param projectId - Optional project ID to filter by
   * @param limit - Maximum number of environments to return
   * @returns Promise with array of environment domains
   */
  getRecentEnvironments: (projectId?: string, limit?: number) => Promise<string[]>;

  /**
   * Save an environment to memory (database)
   * @param domain - Environment domain/URL
   * @param source - Source of the environment (github, gcp, manual)
   * @param projectId - Optional project ID to associate with
   * @param metadata - Optional metadata about the environment
   */
  saveEnvironment: (
    domain: string,
    source: EnvironmentSource,
    projectId?: string,
    metadata?: EnvironmentMetadata,
  ) => Promise<void>;

  /**
   * Search environments by domain pattern
   * @param pattern - Search pattern (e.g., "staging")
   * @param projectId - Optional project ID to filter by
   * @returns Promise with array of matching environment domains
   */
  searchEnvironments: (pattern: string, projectId?: string) => Promise<string[]>;
}
