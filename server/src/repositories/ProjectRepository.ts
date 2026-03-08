import type { Project } from '../../../shared/types';

import { BaseRepository } from './BaseRepository';

/**
 * ProjectRepository - Data access for Project entities
 * Note: Projects are currently stored in JSON files, but this repository
 * provides an interface for future database storage
 */
export class ProjectRepository extends BaseRepository<Project, Project, Partial<Project>> {
  // For now, projects are managed by ProjectManager
  // This repository is a placeholder for future database storage

  async count(filters?: any): Promise<number> {
    // TODO: Implement when projects are stored in database
    return 0;
  }

  async create(data: Project): Promise<Project> {
    // TODO: Implement when projects are stored in database
    throw new Error('Project creation not yet implemented in database');
  }

  async delete(id: string): Promise<void> {
    // TODO: Implement when projects are stored in database
    throw new Error('Project delete not yet implemented in database');
  }

  async findAll(filters?: any): Promise<Project[]> {
    // TODO: Implement when projects are stored in database
    throw new Error('Project findAll not yet implemented in database');
  }

  async findById(id: string): Promise<null | Project> {
    // TODO: Implement when projects are stored in database
    throw new Error('Project findById not yet implemented in database');
  }

  async update(id: string, data: Partial<Project>): Promise<Project> {
    // TODO: Implement when projects are stored in database
    throw new Error('Project update not yet implemented in database');
  }
}
