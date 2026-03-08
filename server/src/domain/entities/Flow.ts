import type { FlowConfig } from '../../../../shared/types';

/**
 * Flow Entity - Multi-project flow with validation
 */
export class Flow {
  get config(): FlowConfig {
    return this._config;
  }
  // Getters
  get id(): string {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get projects(): string[] {
    return [...this._projects]; // Return copy
  }

  private _config: FlowConfig;

  private _id: string;

  private _name: string;

  private _projects: string[]; // Project IDs in execution order

  constructor(flow: FlowConfig) {
    this.validate(flow);
    this._id = flow.id;
    this._name = flow.name;
    this._projects = flow.order || [];
    this._config = flow;
  }

  // Create from plain object
  static fromJSON(flow: FlowConfig): Flow {
    return new Flow(flow);
  }

  getNextProject(currentProjectId?: string): null | string {
    if (!currentProjectId) {
      return this._projects[0] || null;
    }
    const currentIndex = this._projects.indexOf(currentProjectId);
    if (currentIndex === -1 || currentIndex === this._projects.length - 1) {
      return null;
    }
    return this._projects[currentIndex + 1];
  }

  // Business logic methods
  getProjectCount(): number {
    return this._projects.length;
  }

  isLastProject(projectId: string): boolean {
    const index = this._projects.indexOf(projectId);
    return index === this._projects.length - 1;
  }

  // Convert to plain object
  toJSON(): FlowConfig {
    return {
      id: this._id,
      name: this._name,
      order: this._projects,
      projects: this._config.projects,
    };
  }

  // Validation
  private validate(flow: FlowConfig): void {
    if (!flow.id) {
      throw new Error('Flow ID is required');
    }
    if (!flow.name) {
      throw new Error('Flow name is required');
    }
    if (!flow.projects || flow.projects.length === 0) {
      throw new Error('Flow must have at least one project');
    }
    if (!flow.order || flow.order.length === 0) {
      throw new Error('Flow must have execution order');
    }
  }
}
