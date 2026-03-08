// Reuse existing Qase utilities from parent project
import axios from 'axios';

import type { QaseConfig } from '../../shared/types';

type QaseTestCase = {
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

export class QaseService {
  async createEnvironment(projectCode: string, environmentName: string, baseUrl: string): Promise<null | string> {
    // This would call the existing checkOrCreateEnvironment function
    // from ../utils/qase.ts
    // For now, return a placeholder
    console.log(`[QaseService] Creating environment: ${environmentName} for ${projectCode}`);
    return environmentName;
  }

  async exportResults(config: QaseConfig, results: any): Promise<{ runId?: string; success: boolean }> {
    if (!config.enabled || !config.apiToken || !config.projectCode) {
      return { success: false };
    }

    // This would integrate with playwright-qase-reporter
    // The actual export happens during test execution via the reporter
    console.log(`[QaseService] Exporting results to Qase project: ${config.projectCode}`);
    return { success: true };
  }

  /**
   * Extract Qase test ID from test title or error message
   */
  extractQaseId(testTitle: string, errorMessage?: string): null | number {
    // Pattern: qase.id(XXXX)
    const qaseIdPattern = /qase\.id\((\d+)\)/;

    // Check in test title
    const titleMatch = testTitle.match(qaseIdPattern);
    if (titleMatch) {
      return parseInt(titleMatch[1], 10);
    }

    // Check in error message
    if (errorMessage) {
      const errorMatch = errorMessage.match(qaseIdPattern);
      if (errorMatch) {
        return parseInt(errorMatch[1], 10);
      }
    }

    return null;
  }

  /**
   * Fetch test case details from Qase API
   */
  async getTestCase(config: QaseConfig, testCaseId: number): Promise<null | QaseTestCase> {
    if (!config.enabled || !config.apiToken || !config.projectCode) {
      return null;
    }

    try {
      const client = this.getApiClient(config);
      const response = await client.get(`/case/${config.projectCode}/${testCaseId}`);

      if (response.data?.result) {
        return response.data.result as QaseTestCase;
      }

      return null;
    } catch (error: any) {
      console.error(`[QaseService] Error fetching test case ${testCaseId}:`, error.message);
      return null;
    }
  }

  /**
   * Fetch multiple test cases from Qase API
   */
  async getTestCases(config: QaseConfig, testCaseIds: number[]): Promise<Map<number, QaseTestCase>> {
    const testCases = new Map<number, QaseTestCase>();

    if (!config.enabled || !config.apiToken || !config.projectCode || testCaseIds.length === 0) {
      return testCases;
    }

    // Fetch test cases in parallel (with rate limiting consideration)
    const promises = testCaseIds.map(async (id) => {
      const testCase = await this.getTestCase(config, id);
      if (testCase) {
        testCases.set(id, testCase);
      }
    });

    await Promise.all(promises);
    return testCases;
  }

  validateConfig(config: QaseConfig): { errors: string[]; valid: boolean; } {
    const errors: string[] = [];

    if (config.enabled) {
      if (!config.apiToken) {
        errors.push('Qase API token is required');
      }
      if (!config.projectCode) {
        errors.push('Qase project code is required');
      }
    }

    return {
      errors,
      valid: errors.length === 0,
    };
  }

  private getApiClient(config: QaseConfig) {
    const host = config.host || 'https://api.qase.io';
    const apiBase = `${host.replace(/\/+$/, '')}/v1`;

    return axios.create({
      baseURL: apiBase,
      headers: {
        'Content-Type': 'application/json',
        Token: config.apiToken || '',
      },
    });
  }
}
