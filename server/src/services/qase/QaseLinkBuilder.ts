/**
 * QaseLinkBuilder - Builds Qase platform links for test cases
 * Follows OOP principles with builder pattern
 */

export type QaseLink = {
  isValid: boolean;
  projectCode: string;
  testId: number;
  url: string;
}

export type QaseTestCase = {
  description?: string;
  id: number;
  postconditions?: string;
  preconditions?: string;
  priority?: string;
  severity?: string;
  status?: string;
  steps?: any[];
  title: string;
}

/**
 * QaseLinkBuilder - Builds proper Qase platform URLs
 * Example: https://app.qase.io/case/ACCESSFLOW-2133
 */
export class QaseLinkBuilder {
  private static readonly BASE_URL = 'https://app.qase.io';
  private static readonly CASE_PATH = '/case';

  private host?: string;
  private projectCode?: string;
  private testId?: number;

  /**
   * Static helper to build link directly
   */
  static buildLink(projectCode: string, testId: number, host?: string): QaseLink {
    return new QaseLinkBuilder()
      .withProjectCode(projectCode)
      .withTestId(testId)
      .withHost(host || QaseLinkBuilder.BASE_URL)
      .build();
  }

  /**
   * Build link from test case object
   */
  static fromTestCase(testCase: QaseTestCase, projectCode: string, host?: string): QaseLink {
    return QaseLinkBuilder.buildLink(projectCode, testCase.id, host);
  }

  /**
   * Extract project code and test ID from Qase URL
   */
  static parseUrl(url: string): null | { projectCode: string; testId: number } {
    const match = url.match(/\/case\/([A-Z]+)-(\d+)$/);
    if (!match) return null;

    return {
      projectCode: match[1],
      testId: parseInt(match[2], 10),
    };
  }

  /**
   * Validate if a Qase link is properly formatted
   */
  static validateUrl(url: string): boolean {
    const pattern = /^https?:\/\/[^\/]+\/case\/[A-Z]+-\d+$/;
    return pattern.test(url);
  }

  /**
   * Build the Qase link
   */
  build(): QaseLink {
    const isValid = this.validate();

    if (!isValid || !this.projectCode || !this.testId) {
      return {
        isValid: false,
        projectCode: this.projectCode || '',
        testId: this.testId || 0,
        url: '',
      };
    }

    const baseUrl = this.host || QaseLinkBuilder.BASE_URL;
    const url = `${baseUrl}${QaseLinkBuilder.CASE_PATH}/${this.projectCode}-${this.testId}`;

    return {
      isValid: true,
      projectCode: this.projectCode,
      testId: this.testId,
      url,
    };
  }

  /**
   * Set custom Qase host (for self-hosted instances)
   */
  withHost(host: string): this {
    this.host = host?.trim().replace(/\/$/, ''); // Remove trailing slash
    return this;
  }

  /**
   * Set the project code (e.g., "ACCESSFLOW")
   */
  withProjectCode(projectCode: string): this {
    this.projectCode = projectCode?.trim().toUpperCase();
    return this;
  }

  /**
   * Set the test ID (e.g., 2133)
   */
  withTestId(testId: number): this {
    this.testId = testId;
    return this;
  }

  /**
   * Validate builder state
   */
  private validate(): boolean {
    if (!this.projectCode || this.projectCode.length === 0) {
      return false;
    }

    if (!this.testId || this.testId <= 0) {
      return false;
    }

    return true;
  }
}

/**
 * QaseLinkManager - Manages Qase links for test results
 */
export class QaseLinkManager {
  private host: string;
  private projectCode: string;

  constructor(projectCode: string, host = 'https://app.qase.io') {
    this.projectCode = projectCode.trim().toUpperCase();
    this.host = host.trim().replace(/\/$/, '');
  }

  /**
   * Generate link for a test case ID
   */
  generateLink(testId: number): QaseLink {
    return QaseLinkBuilder.buildLink(this.projectCode, testId, this.host);
  }

  /**
   * Generate links for multiple test IDs
   */
  generateLinks(testIds: number[]): Map<number, QaseLink> {
    const links = new Map<number, QaseLink>();

    for (const testId of testIds) {
      const link = this.generateLink(testId);
      if (link.isValid) {
        links.set(testId, link);
      }
    }

    return links;
  }

  /**
   * Generate link with validation
   */
  generateValidatedLink(testId: number): null | QaseLink {
    const link = this.generateLink(testId);
    return link.isValid ? link : null;
  }

  /**
   * Get current host
   */
  getHost(): string {
    return this.host;
  }

  /**
   * Get current project code
   */
  getProjectCode(): string {
    return this.projectCode;
  }

  /**
   * Check if project code is set
   */
  hasProjectCode(): boolean {
    return this.projectCode.length > 0;
  }
}
