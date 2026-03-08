import type { Project as ProjectType } from '../../../../shared/types';

/**
 * Project Entity - Project configuration with validation
 */
export class Project {
  get configPath(): string {
    return this._configPath;
  }
  get defaultBaseUrl(): string {
    return this._defaultBaseUrl;
  }
  get description(): string {
    return this._description;
  }
  get globalSetupPath(): null | string | undefined {
    return this._globalSetupPath;
  }
  // Getters
  get id(): string {
    return this._id;
  }
  get logo(): string {
    return this._logo;
  }
  get name(): string {
    return this._name;
  }
  get qaseProjectCode(): string | undefined {
    return this._qaseProjectCode;
  }
  get testDirectory(): string {
    return this._testDirectory;
  }

  private _configPath: string;

  private _defaultBaseUrl: string;

  private _description: string;

  private _globalSetupPath?: null | string;

  private _id: string;

  private _logo: string;

  private _name: string;

  private _qaseProjectCode?: string;

  private _testDirectory: string;

  constructor(project: ProjectType) {
    this.validate(project);
    this._id = project.id;
    this._name = project.name;
    this._description = project.description;
    this._logo = project.logo;
    this._testDirectory = project.testDirectory;
    this._defaultBaseUrl = project.defaultBaseUrl;
    this._qaseProjectCode = project.qaseProjectCode;
    this._configPath = project.configPath;
    this._globalSetupPath = project.globalSetupPath;
  }

  // Create from plain object
  static fromJSON(project: ProjectType): Project {
    return new Project(project);
  }

  hasGlobalSetup(): boolean {
    return Boolean(this._globalSetupPath);
  }

  // Business logic methods
  hasQaseIntegration(): boolean {
    return Boolean(this._qaseProjectCode);
  }

  // Convert to plain object
  toJSON(): ProjectType {
    return {
      configPath: this._configPath,
      defaultBaseUrl: this._defaultBaseUrl,
      description: this._description,
      globalSetupPath: this._globalSetupPath,
      id: this._id,
      logo: this._logo,
      name: this._name,
      qaseProjectCode: this._qaseProjectCode,
      testDirectory: this._testDirectory,
    };
  }

  // Validation
  private validate(project: ProjectType): void {
    if (!project.id) {
      throw new Error('Project ID is required');
    }
    if (!project.name) {
      throw new Error('Project name is required');
    }
    if (!project.testDirectory) {
      throw new Error('Test directory is required');
    }
    if (!project.configPath) {
      throw new Error('Config path is required');
    }
  }
}
