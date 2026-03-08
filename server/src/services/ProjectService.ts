import type { Project as ProjectType } from '../../../shared/types';

import { Project } from '../domain/entities/Project';
import { ProjectManager } from '../infrastructure/config/ProjectManager';
import { DatabaseService } from '../infrastructure/database/DatabaseService';
import { ProjectRepository } from '../repositories/ProjectRepository';

/**
 * ProjectService - Project management with repository pattern
 */
export class ProjectService {
  private projectManager: ProjectManager;
  private projectRepository: ProjectRepository;

  constructor() {
    const prisma = DatabaseService.getInstance().getClient();
    this.projectManager = new ProjectManager();
    this.projectRepository = new ProjectRepository(prisma);
  }

  /**
   * Get all projects
   */
  async getAllProjects(): Promise<Project[]> {
    const projects = this.projectManager.getAllProjects();
    return projects.map((p) => new Project(p));
  }

  /**
   * Get project by ID
   */
  async getProjectById(id: string): Promise<null | Project> {
    const project = await this.projectManager.getProject(id);
    return project ? new Project(project) : null;
  }

  /**
   * Get test files for a project
   */
  async getTestFiles(projectId: string): Promise<string[]> {
    const project = await this.getProjectById(projectId);
    if (!project) {
      throw new Error(`Project ${projectId} not found`);
    }
    return await this.projectManager.getTestFiles(projectId);
  }

  /**
   * Validate project configuration
   */
  validateProject(project: ProjectType): { errors: string[]; valid: boolean; } {
    const errors: string[] = [];

    if (!project.id) {
      errors.push('Project ID is required');
    }
    if (!project.name) {
      errors.push('Project name is required');
    }
    if (!project.testDirectory) {
      errors.push('Test directory is required');
    }
    if (!project.configPath) {
      errors.push('Config path is required');
    }

    return {
      errors,
      valid: errors.length === 0,
    };
  }
}
