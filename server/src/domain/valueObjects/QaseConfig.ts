import type { QaseConfig as QaseConfigType } from '../../../../shared/types';

/**
 * QaseConfig Value Object - Qase configuration validation
 */
export class QaseConfig {
  get apiToken(): string | undefined {
    return this._apiToken;
  }
  // Getters
  get enabled(): boolean {
    return this._enabled;
  }
  get environment(): string | undefined {
    return this._environment;
  }
  get host(): string {
    return this._host || 'https://api.qase.io';
  }
  get projectCode(): string | undefined {
    return this._projectCode;
  }
  get runTitle(): string | undefined {
    return this._runTitle;
  }
  get uploadAttachments(): boolean {
    return this._uploadAttachments !== false; // Default to true
  }

  private _apiToken?: string;

  private _enabled: boolean;

  private _environment?: string;

  private _host?: string;

  private _projectCode?: string;

  private _runTitle?: string;

  private _uploadAttachments?: boolean;

  constructor(config: QaseConfigType) {
    this.validate(config);
    this._enabled = config.enabled;
    this._apiToken = config.apiToken;
    this._projectCode = config.projectCode;
    this._environment = config.environment;
    this._uploadAttachments = config.uploadAttachments;
    this._runTitle = config.runTitle;
    this._host = config.host;
  }

  // Create from plain object
  static fromJSON(config: QaseConfigType): QaseConfig {
    return new QaseConfig(config);
  }

  getApiBaseUrl(): string {
    const host = this.host.replace(/\/+$/, ''); // Remove trailing slashes
    return `${host}/v1`;
  }

  // Business logic methods
  isValid(): boolean {
    if (!this._enabled) {
      return true; // Disabled config is valid
    }
    return Boolean(this._apiToken) && Boolean(this._projectCode);
  }

  // Convert to plain object
  toJSON(): QaseConfigType {
    return {
      apiToken: this._apiToken,
      enabled: this._enabled,
      environment: this._environment,
      host: this._host,
      projectCode: this._projectCode,
      runTitle: this._runTitle,
      uploadAttachments: this._uploadAttachments,
    };
  }

  // Validation
  private validate(config: QaseConfigType): void {
    if (config.enabled) {
      if (!config.apiToken) {
        throw new Error('Qase API token is required when Qase is enabled');
      }
      if (!config.projectCode) {
        throw new Error('Qase project code is required when Qase is enabled');
      }
    }
  }
}
