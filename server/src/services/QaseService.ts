// Qase API integration service
import type { QaseConfig, QueryResult, QuerySpec } from '../../../shared/types';

import { QaseIdExtractor } from '../../../shared/utils/QaseIdExtractor';
import { QaseConfig as QaseConfigVO } from '../domain/valueObjects/QaseConfig';
import qaseApiClient from './qase/QaseApiClient';
import { QaseLinkManager } from './qase/QaseLinkBuilder';

export type QaseTestCase = {
  automation?: number;
  description?: string;
  id: number;
  preconditions?: string;
  // Added via OOP QaseLinkBuilder
  qaseUrl?: string;
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

/**
 * QaseService - Qase API integration service
 *
 * Handles all Qase.io API operations including:
 * - Fetching test case details
 * - Enriching test cases with Qase URLs
 * - Extracting Qase IDs from test names
 * - Validating Qase configuration
 */
export class QaseService {
  constructor() {
    console.log('[QaseService] Initialized with REST API client');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createEnvironment(projectCode: string, environmentName: string, _baseUrl: string): Promise<null | string> {
    // This would call the existing checkOrCreateEnvironment function
    // from ../utils/qase.ts
    // For now, return a placeholder
    console.log(`[QaseService] Creating environment: ${environmentName} for ${projectCode}`);
    return environmentName;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async exportResults(config: QaseConfig, _results: any): Promise<{ runId?: string; success: boolean }> {
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
   * Uses centralized QaseIdExtractor for consistency
   */
  extractQaseId(testTitle: string, errorMessage?: string): null | number {
    // Try extracting from multiple sources
    return QaseIdExtractor.extractFromMultiple(testTitle, errorMessage || '');
  }

  /**
   * Fetch test case details from Qase API with retry logic
   * Enriches result with Qase platform URL
   * Implements exponential backoff for transient errors
   */
  async getTestCase(config: QaseConfig, testCaseId: number, retryCount = 0): Promise<null | QaseTestCase> {
    if (!config.enabled || !config.apiToken || !config.projectCode) {
      return null;
    }

    const MAX_RETRIES = 3;
    const RETRY_DELAY_MS = 1000; // Base delay: 1 second

    try {
      // Initialize API client with token
      qaseApiClient.initializeFromConfig(config);

      if (retryCount === 0) {
        console.log(`[QaseService] Fetching test case via REST API`);
        console.log(`[QaseService] Project Code: ${config.projectCode}, Test Case ID: ${testCaseId}`);
      } else {
        console.log(`[QaseService] Retry ${retryCount}/${MAX_RETRIES} for test case ${testCaseId}`);
      }

      // Use qase API client: qase.getCase({code: 'ACCESSFLOW', id: '2133'})
      const response = await qaseApiClient.getCase({
        code: config.projectCode,
        id: testCaseId.toString(),
      });

      if (response.data?.result) {
        const testCase = response.data.result as QaseTestCase;
        console.log(`[QaseService] ✅ Successfully fetched test case ${config.projectCode}-${testCaseId}`);

        // Enrich with Qase URL using OOP QaseLinkBuilder
        return this.enrichWithQaseUrl(testCase, config);
      } else {
        console.warn(`[QaseService] ⚠️ API response missing result data for ${config.projectCode}-${testCaseId}`);
        return null;
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Unknown error';
      const isRetriable = this.isRetriableError(error);

      // Retry for transient errors (rate limiting, network issues, etc.)
      if (isRetriable && retryCount < MAX_RETRIES) {
        // Exponential backoff: 1s, 2s, 4s
        const delayMs = RETRY_DELAY_MS * Math.pow(2, retryCount);
        console.warn(
          `[QaseService] Transient error fetching test case ${testCaseId}, retrying in ${delayMs}ms: ${errorMessage}`,
        );

        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, delayMs));

        // Retry
        return this.getTestCase(config, testCaseId, retryCount + 1);
      }

      // Non-retriable error or max retries exceeded
      console.error(
        `[QaseService] ❌ Error fetching test case ${config.projectCode}-${testCaseId} (${retryCount} retries): ${errorMessage}`,
      );
      return null;
    }
  }

  /**
   * Fetch multiple test cases from Qase API
   * Enriches all results with Qase platform URLs
   * Fetches in parallel for better performance
   */
  async getTestCases(config: QaseConfig, testCaseIds: number[]): Promise<Map<number, QaseTestCase>> {
    const testCases = new Map<number, QaseTestCase>();

    if (!config.enabled || !config.apiToken || !config.projectCode || testCaseIds.length === 0) {
      return testCases;
    }

    console.log(`[QaseService] Fetching ${testCaseIds.length} test cases via REST API`);

    // Fetch test cases in parallel (getTestCase already enriches with URLs)
    const promises = testCaseIds.map(async (id) => {
      const testCase = await this.getTestCase(config, id);
      if (testCase) {
        testCases.set(id, testCase);
      }
    });

    await Promise.all(promises);
    console.log(`[QaseService] ✅ Fetched ${testCases.size} of ${testCaseIds.length} test cases via REST API`);
    return testCases;
  }

  /**
   * Fetch all test cases in a suite from Qase API
   * Enriches all results with Qase platform URLs
   * Implements retry logic for reliability
   * 
   * @param config - Qase configuration
   * @param suiteId - Suite ID to fetch cases from
   * @param retryCount - Current retry attempt (for internal use)
   * @returns Map of test case ID to test case data
   */
  async getTestCasesBySuite(
    config: QaseConfig,
    suiteId: number,
    retryCount = 0,
  ): Promise<Map<number, QaseTestCase>> {
    const testCases = new Map<number, QaseTestCase>();

    if (!config.enabled || !config.apiToken || !config.projectCode) {
      return testCases;
    }

    const MAX_RETRIES = 3;
    const RETRY_DELAY_MS = 1000;

    try {
      // Initialize API client with token
      qaseApiClient.initializeFromConfig(config);

      if (retryCount === 0) {
        console.log(`[QaseService] Fetching test cases from suite ${suiteId} via REST API`);
      } else {
        console.log(`[QaseService] Retry ${retryCount}/${MAX_RETRIES} for fetching suite ${suiteId}`);
      }

      // Fetch all cases in the suite
      const response = await qaseApiClient.getCasesBySuite({
        code: config.projectCode,
        suite_id: suiteId,
      });

      if (response.data?.result?.entities) {
        const cases = response.data.result.entities as QaseTestCase[];
        
        // Enrich each case with Qase URL
        for (const testCase of cases) {
          const enrichedCase = this.enrichWithQaseUrl(testCase, config);
          testCases.set(testCase.id, enrichedCase);
        }

        console.log(`[QaseService] ✅ Fetched ${testCases.size} test cases from suite ${suiteId}`);
      } else {
        console.warn(`[QaseService] ⚠️ API response missing entities for suite ${suiteId}`);
      }

      return testCases;
    } catch (error: any) {
      const errorMessage = error.message || 'Unknown error';
      const isRetriable = this.isRetriableError(error);

      // Retry for transient errors
      if (isRetriable && retryCount < MAX_RETRIES) {
        const delayMs = RETRY_DELAY_MS * Math.pow(2, retryCount);
        console.warn(
          `[QaseService] Transient error fetching suite ${suiteId}, retrying in ${delayMs}ms: ${errorMessage}`,
        );

        await new Promise((resolve) => setTimeout(resolve, delayMs));
        return this.getTestCasesBySuite(config, suiteId, retryCount + 1);
      }

      console.error(
        `[QaseService] ❌ Error fetching suite ${suiteId} (${retryCount} retries): ${errorMessage}`,
      );
      return testCases;
    }
  }

  /**
   * Query test cases with pagination and local filtering
   * 
   * Implements strict query schema with deterministic fallback strategy:
   * - Remote: only search, limit, offset (validated working params)
   * - Local: suiteIds, ids, automation, status, tagsAny, titleContains
   * 
   * @param spec - QuerySpec defining query parameters
   * @returns QueryResult with cases and diagnostics
   */
  async queryTestCases(spec: QuerySpec): Promise<QueryResult> {
    const startTime = Date.now();
    const maxRecords = spec.maxRecords || 5000;
    const batchSize = spec.limit || 100;
    let offset = spec.offset || 0;
    let pagesFetched = 0;
    let fetchedCount = 0;
    const allCases: QaseTestCasePayload[] = [];
    let suiteFilterFallback = false;

    // Log warning about suite filter fallback (always local)
    if (spec.suiteIds && spec.suiteIds.length > 0) {
      console.warn('[QaseService] ⚠️ Server-side suite filter unavailable; using local suite_id filtering.');
      suiteFilterFallback = true;
    }

    try {
      // Pagination loop: fetch batches using only supported remote params
      while (fetchedCount < maxRecords) {
        const response = await qaseApiClient.searchCases({
          code: spec.projectCode,
          limit: batchSize,
          offset,
          search: spec.titleContains, // Remote search if provided
        });

        const entities = response.data?.result?.entities || [];
        const count = entities.length;

        if (count === 0) {
          // No more results
          break;
        }

        // Add to collection
        allCases.push(...entities);
        fetchedCount += count;
        pagesFetched++;

        // Move offset for next batch
        offset += count;

        // Safety check
        if (fetchedCount >= maxRecords) {
          console.warn(`[QaseService] ⚠️ Reached maxRecords limit (${maxRecords}). Some cases may be excluded.`);
          break;
        }
      }

      // Apply local filters in order
      let filtered = allCases;

      // Filter by IDs
      if (spec.ids && spec.ids.length > 0) {
        const idsSet = new Set(spec.ids);
        filtered = filtered.filter((c) => idsSet.has(c.id));
      }

      // Filter by Suite IDs (local fallback)
      if (spec.suiteIds && spec.suiteIds.length > 0) {
        const suiteIdsSet = new Set(spec.suiteIds);
        filtered = filtered.filter((c) => c.suite_id && suiteIdsSet.has(c.suite_id));
      }

      // Filter by Automation
      if (spec.automation && spec.automation.length > 0) {
        const automationSet = new Set(spec.automation);
        filtered = filtered.filter((c) => c.automation !== undefined && automationSet.has(c.automation));
      }

      // Filter by Status
      if (spec.status && spec.status.length > 0) {
        const statusSet = new Set(spec.status);
        filtered = filtered.filter((c) => c.status !== undefined && statusSet.has(c.status));
      }

      // Filter by Tags (any match)
      if (spec.tagsAny && spec.tagsAny.length > 0) {
        const tagsSet = new Set(spec.tagsAny);
        filtered = filtered.filter((c) => {
          if (!c.tags || c.tags.length === 0) return false;
          return c.tags.some((tag) => tagsSet.has(tag.title));
        });
      }

      // Final title contains check (case-insensitive, exact match)
      if (spec.titleContains) {
        const searchLower = spec.titleContains.toLowerCase();
        filtered = filtered.filter((c) => c.title && c.title.toLowerCase().includes(searchLower));
      }

      const queryDuration = Date.now() - startTime;

      return {
        cases: filtered,
        diagnostics: {
          fetchedCount,
          filteredCount: filtered.length,
          pagesFetched,
          queryDuration,
          suiteFilterFallback,
        },
        querySpec: spec,
        timestamp: new Date().toISOString(),
      };
    } catch (error: any) {
      console.error(`[QaseService] ❌ Error querying test cases: ${error.message}`);
      throw error;
    }
  }

  /**
   * Update test case in Qase with retry logic
   * 
   * @param config - Qase configuration
   * @param testCaseId - Test case ID to update
   * @param payload - Update payload
   * @param retryCount - Current retry attempt (for internal use)
   * @returns Updated test case or null on failure
   */
  async updateTestCase(
    config: QaseConfig,
    testCaseId: number,
    payload: {
      automation?: number;
      description?: string;
      preconditions?: string;
      priority?: number;
      severity?: number;
      status?: number;
      steps?: {
        action: string;
        expected_result: string;
      }[];
      suite_id?: number;
      tags?: string[];
      title?: string;
    },
    retryCount = 0,
  ): Promise<null | QaseTestCase> {
    if (!config.enabled || !config.apiToken || !config.projectCode) {
      return null;
    }

    const MAX_RETRIES = 3;
    const RETRY_DELAY_MS = 1000; // Base delay: 1 second

    try {
      // Initialize API client with token
      qaseApiClient.initializeFromConfig(config);

      if (retryCount === 0) {
        console.log(`[QaseService] Updating test case ${config.projectCode}-${testCaseId}`);
      } else {
        console.log(`[QaseService] Retry ${retryCount}/${MAX_RETRIES} for updating test case ${testCaseId}`);
      }

      // Use qase API client: qase.updateCase({code: 'ACCESSFLOW', id: '2133'}, {...})
      const response = await qaseApiClient.updateCase(
        {
          code: config.projectCode,
          id: testCaseId.toString(),
        },
        payload,
      );

      if (response.data?.result) {
        const testCase = response.data.result as QaseTestCase;
        console.log(`[QaseService] ✅ Successfully updated test case ${config.projectCode}-${testCaseId}`);

        // Enrich with Qase URL using OOP QaseLinkBuilder
        return this.enrichWithQaseUrl(testCase, config);
      } else {
        console.warn(`[QaseService] ⚠️ API response missing result data for ${config.projectCode}-${testCaseId}`);
        return null;
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Unknown error';
      const isRetriable = this.isRetriableError(error);

      // Retry for transient errors (rate limiting, network issues, etc.)
      if (isRetriable && retryCount < MAX_RETRIES) {
        // Exponential backoff: 1s, 2s, 4s
        const delayMs = RETRY_DELAY_MS * Math.pow(2, retryCount);
        console.warn(
          `[QaseService] Transient error updating test case ${testCaseId}, retrying in ${delayMs}ms: ${errorMessage}`,
        );

        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, delayMs));

        // Retry
        return this.updateTestCase(config, testCaseId, payload, retryCount + 1);
      }

      // Non-retriable error or max retries exceeded
      console.error(
        `[QaseService] ❌ Error updating test case ${config.projectCode}-${testCaseId} (${retryCount} retries): ${errorMessage}`,
      );
      return null;
    }
  }

  validateConfig(config: QaseConfig): { errors: string[]; valid: boolean; } {
    try {
      const qaseConfig = new QaseConfigVO(config);
      return {
        errors: qaseConfig.isValid() ? [] : ['Invalid Qase configuration'],
        valid: qaseConfig.isValid(),
      };
    } catch (error: any) {
      return {
        errors: [error.message],
        valid: false,
      };
    }
  }

  /**
   * Enrich test case with Qase platform URL using OOP QaseLinkBuilder
   */
  private enrichWithQaseUrl(testCase: QaseTestCase, config: QaseConfig): QaseTestCase {
    const linkManager = new QaseLinkManager(config.projectCode || 'UNKNOWN', config.host || 'https://app.qase.io');

    const qaseLink = linkManager.generateValidatedLink(testCase.id);
    if (qaseLink) {
      testCase.qaseUrl = qaseLink.url;
    }

    return testCase;
  }

  /**
   * Determine if an error is retriable
   * Rate limiting (429), network errors, and server errors (5xx) are retriable
   */
  private isRetriableError(error: any): boolean {
    const errorMessage = error.message || '';

    // Check for rate limiting
    if (errorMessage.includes('429') || errorMessage.toLowerCase().includes('rate limit')) {
      return true;
    }

    // Check for server errors (5xx)
    if (
      errorMessage.includes('500') ||
      errorMessage.includes('502') ||
      errorMessage.includes('503') ||
      errorMessage.includes('504')
    ) {
      return true;
    }

    // Check for network errors
    if (
      errorMessage.includes('ECONNRESET') ||
      errorMessage.includes('ETIMEDOUT') ||
      errorMessage.includes('ENOTFOUND') ||
      errorMessage.includes('Network Error')
    ) {
      return true;
    }

    // 404 and 401/403 are not retriable
    return false;
  }
}
