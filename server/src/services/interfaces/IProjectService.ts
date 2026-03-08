import type { Project as ProjectType } from '../../../../shared/types';
import type { Project } from '../../domain/entities/Project';

/**
 * Interface for project management service
 */
export type IProjectService = {
  /**
   * Get all available projects
   * @returns Promise with array of project entities
   */
  getAllProjects: () => Promise<Project[]>;

  /**
   * Get a specific project by ID
   * @param id - Project identifier
   * @returns Promise with project entity or null if not found
   */
  getProjectById: (id: string) => Promise<null | Project>;

  /**
   * Get test files for a project
   * @param projectId - Project identifier
   * @returns Promise with array of test file paths
   */
  getTestFiles: (projectId: string) => Promise<string[]>;

  /**
   * Validate project configuration
   * @param project - Project configuration to validate
   * @returns Validation result with errors if any
   */
  validateProject: (project: ProjectType) => ProjectValidationResult;
}

/**
 * Validation result for project configuration
 */
export type ProjectValidationResult = {
  errors: string[];
  valid: boolean;
}
