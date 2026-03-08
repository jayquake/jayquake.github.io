/**
 * QasePreFetchService - Pre-fetches Qase test cases before test execution
 *
 * Responsibilities:
 * - Extract Qase IDs from test files before execution starts
 * - Fetch test cases from Qase API with rate limiting (300 req/min) to prevent 429 errors
 * - Cache test cases for use during and after test execution
 * - Deduplicate requests to avoid fetching the same test case multiple times
 *
 * Rate Limiting Strategy:
 * - Qase API Limit: 300 requests/minute
 * - Max Concurrent: 5 simultaneous requests
 * - Min Time Between: 200ms (ensures max 300 req/min)
 * - Reservoir: 300 requests per minute bucket
 */

import Bottleneck from 'bottleneck';
import { join } from 'path';

import type { QaseConfig } from '../../../shared/types';

import { DatabaseService } from '../infrastructure/database/DatabaseService';
import { PathUtils } from '../infrastructure/utils/PathUtils';
import { QaseTestCaseRepository } from '../repositories/QaseTestCaseRepository';
import { QaseService, type QaseTestCase } from './QaseService';
import { QaseTestCaseCache } from './QaseTestCaseCache';
import { type TestCaseInfo, TestFileParser } from './TestFileParser';

export type QasePreFetchMetrics = {
  avgResponseTime: number;
  duration: number;
  endTime: Date;
  queueDepth: number;
  rateLimitHits: number;
  retriedRequests: number;
  startTime: Date;
  totalRequests: number;
}

export type QasePreFetchResult = {
  cached: number;
  errors: { error: string; qaseId: number; }[];
  fetched: number;
  metrics?: QasePreFetchMetrics;
  qaseIds: number[];
  testCases: Map<number, QaseTestCase>;
}

/**
 * QasePreFetchService - Pre-fetches Qase test cases with proper rate limiting
 */
export class QasePreFetchService {
  private cache: QaseTestCaseCache;
  private inFlightRequests = new Map<string, Promise<null | QaseTestCase>>(); // Request deduplication
  // Bottleneck limiter for Qase API rate limiting (300 req/min)
  private limiter = new Bottleneck({
    maxConcurrent: 5, // Max 5 concurrent requests
    minTime: 200, // Minimum 200ms between requests = 300 req/min max
    reservoir: 300, // 300 requests per reservoir
    reservoirRefreshAmount: 300, // Refill to 300 requests
    reservoirRefreshInterval: 60 * 1000, // Every 60 seconds (1 minute)
  });
  // Metrics tracking
  private metrics = {
    rateLimitHits: 0,
    responseTimes: [] as number[],
    retriedRequests: 0,
    totalRequests: 0,
  };

  private qaseService: QaseService;

  private repository: QaseTestCaseRepository;

  constructor() {
    this.qaseService = new QaseService();
    this.cache = QaseTestCaseCache.getInstance();
    const prisma = DatabaseService.getInstance().getClient();
    this.repository = new QaseTestCaseRepository(prisma);

    // Enhanced rate limiter event monitoring
    this.limiter.on('failed', async (error, jobInfo) => {
      console.warn(`[QasePreFetchService] Rate limiter job failed: ${error.message}`);

      // Track rate limit hits
      this.metrics.rateLimitHits++;

      // Detect 429 errors and apply exponential backoff
      if (this.is429Error(error)) {
        const retryCount = jobInfo.retryCount || 0;
        const backoffTime = Math.min(1000 * Math.pow(2, retryCount), 8000); // Max 8 seconds

        console.log(`[QasePreFetchService] ⚠️ 429 Rate Limit Hit - Retry ${retryCount + 1} after ${backoffTime}ms`);
        this.metrics.retriedRequests++;

        return backoffTime; // Exponential backoff: 1s, 2s, 4s, 8s
      }

      // Other errors - retry after 1 second
      if (this.isRetriableError(error)) {
        console.log(`[QasePreFetchService] Retriable error, retrying after 1s...`);
        return 1000;
      }

      // Non-retriable error - don't retry
      return undefined;
    });

    this.limiter.on('depleted', () => {
      console.warn(`[QasePreFetchService] ⚠️ Rate limit reservoir depleted. Waiting for refresh...`);
      this.metrics.rateLimitHits++;
    });

    // Monitor queue for metrics
    this.limiter.on('queued', () => {
      const queueLength = this.limiter.counts().QUEUED || 0;
      if (queueLength > 10) {
        console.log(`[QasePreFetchService] 📊 Queue depth: ${queueLength} requests`);
      }
    });
  }

  /**
   * Clear pre-fetched test cases for a run
   */
  clearPreFetchedTestCases(runId: string): void {
    this.cache.clear(runId);
  }

  /**
   * Get pre-fetched test cases for a run from cache
   */
  getPreFetchedTestCases(runId: string): Map<number, QaseTestCase> {
    return this.cache.getAll(runId);
  }

  /**
   * Pre-fetch Qase test cases before test execution
   * Extracts Qase IDs from test files and fetches them with rate limiting
   *
   * @param runId - Test run ID for caching
   * @param testFiles - Array of test file paths to scan (relative to project test directory)
   * @param projectTestDirectory - Absolute path to project's test directory
   * @param qaseConfig - Qase configuration
   * @returns Pre-fetch result with test cases map and statistics
   */
  async preFetchTestCases(
    runId: string,
    testFiles: string[] | undefined,
    projectTestDirectory: string,
    qaseConfig: QaseConfig,
  ): Promise<QasePreFetchResult> {
    const startTime = new Date();
    this.resetMetrics();

    console.log(`[QasePreFetchService] Starting pre-fetch for run ${runId}`);
    console.log(`[QasePreFetchService] Test directory: ${projectTestDirectory}`);
    console.log(`[QasePreFetchService] Test files: ${testFiles?.length || 'all'}`);

    // Validate Qase configuration
    if (!qaseConfig.enabled || !qaseConfig.apiToken || !qaseConfig.projectCode) {
      console.log(`[QasePreFetchService] Qase not configured, skipping pre-fetch`);
      return {
        cached: 0,
        errors: [],
        fetched: 0,
        metrics: this.getMetricsSummary(startTime, new Date()),
        qaseIds: [],
        testCases: new Map(),
      };
    }

    // Extract Qase IDs from test files
    const qaseIds = await this.extractQaseIdsFromTestFiles(testFiles, projectTestDirectory);

    if (qaseIds.length === 0) {
      console.log(`[QasePreFetchService] No Qase IDs found in test files`);
      return {
        cached: 0,
        errors: [],
        fetched: 0,
        metrics: this.getMetricsSummary(startTime, new Date()),
        qaseIds: [],
        testCases: new Map(),
      };
    }

    console.log(
      `[QasePreFetchService] Found ${qaseIds.length} unique Qase IDs: ${qaseIds.slice(0, 10).join(', ')}${qaseIds.length > 10 ? '...' : ''}`,
    );

    // Fetch test cases with rate limiting and deduplication
    const testCases = new Map<number, QaseTestCase>();
    const errors: { error: string; qaseId: number; }[] = [];
    let cached = 0;
    let fetched = 0;

    // Deduplicate IDs (already done in extraction, but double-check)
    const uniqueIds = Array.from(new Set(qaseIds));

    // Fetch with Bottleneck rate limiter (max 5 concurrent, 300 req/min)
    const fetchPromises = uniqueIds.map((qaseId) =>
      this.limiter.schedule(async () => {
        const requestStart = Date.now();

        try {
          // Check memory cache first (fastest)
          const cachedTestCase = this.cache.get(runId, qaseId);
          if (cachedTestCase) {
            testCases.set(qaseId, cachedTestCase);
            cached++;
            console.log(`[QasePreFetchService] Using cached test case ${qaseId}`);
            return;
          }

          // Check DB second (persisted data)
          const dbTestCase = await this.repository.findByQaseId(qaseConfig.projectCode || '', qaseId);
          if (dbTestCase) {
            // Reconstruct the QaseTestCase from DB
            const testCase = JSON.parse(dbTestCase.fullData) as QaseTestCase;
            testCases.set(qaseId, testCase);
            // Cache for this run
            await this.cache.set(runId, qaseId, testCase);
            cached++;
            console.log(
              `[QasePreFetchService] Using DB-cached test case ${qaseId} (last fetched: ${dbTestCase.lastFetched.toISOString()})`,
            );
            return;
          }

          // Track API request
          this.metrics.totalRequests++;

          // Fetch from API with deduplication (no cache hit)
          const testCase = await this.fetchTestCaseWithDedup(qaseConfig, qaseId);

          // Track response time
          const responseTime = Date.now() - requestStart;
          this.metrics.responseTimes.push(responseTime);

          if (testCase) {
            testCases.set(qaseId, testCase);

            // Persist to DB (upsert to handle updates)
            // Store available fields from QaseTestCase type
            await this.repository.upsert({
              automation: testCase.automation || null,
              customFields: null,
              description: testCase.description || null,
              fullData: JSON.stringify(testCase),
              isFlaky: null,
              layer: null,
              priority: null,
              projectCode: qaseConfig.projectCode || '',
              qaseId,
              severity: null,
              // Optional fields not in current QaseTestCase interface:
              status: null,
              suiteId: testCase.suite?.id || null,
              title: testCase.title,
            });

            // Store in memory cache for this run
            await this.cache.set(runId, qaseId, testCase);
            fetched++;
            console.log(
              `[QasePreFetchService] Fetched and persisted test case ${qaseId}: ${testCase.title} (${responseTime}ms)`,
            );
          } else {
            errors.push({ error: 'Test case not found', qaseId });
            console.warn(`[QasePreFetchService] Test case ${qaseId} not found`);
          }
        } catch (error: any) {
          errors.push({ error: error.message || 'Unknown error', qaseId });
          console.error(`[QasePreFetchService] Error fetching test case ${qaseId}:`, error.message);
        }
      }),
    );

    // Wait for all fetches to complete with rate limiting
    await Promise.all(fetchPromises);

    const endTime = new Date();
    const metrics = this.getMetricsSummary(startTime, endTime);

    console.log(
      `[QasePreFetchService] Pre-fetch complete: ${testCases.size} test cases (${cached} cached, ${fetched} fetched, ${errors.length} errors)`,
    );
    console.log(
      `[QasePreFetchService] 📊 Metrics: ${metrics.totalRequests} API calls, ${metrics.rateLimitHits} rate limit hits, ${metrics.retriedRequests} retries, ${metrics.avgResponseTime}ms avg response time`,
    );

    return {
      cached,
      errors,
      fetched,
      metrics,
      qaseIds: uniqueIds,
      testCases,
    };
  }

  /**
   * Extract Qase IDs from test files
   * Parses test files to find qase.id() annotations
   *
   * @param testFiles - Array of test file paths (relative) or undefined for all files
   * @param projectTestDirectory - Absolute path to project's test directory
   * @returns Array of unique Qase IDs
   */
  private async extractQaseIdsFromTestFiles(
    testFiles: string[] | undefined,
    projectTestDirectory: string,
  ): Promise<number[]> {
    const qaseIds = new Set<number>();

    try {
      // If specific test files provided, parse only those
      if (testFiles && testFiles.length > 0) {
        console.log(`[QasePreFetchService] Parsing ${testFiles.length} specific test files`);

        for (const testFile of testFiles) {
          try {
            const testCases = TestFileParser.parseTestFileByRelativePath(testFile, projectTestDirectory);

            for (const testCase of testCases) {
              if (testCase.qaseId) {
                qaseIds.add(testCase.qaseId);
              }
            }
          } catch (error: any) {
            console.warn(`[QasePreFetchService] Error parsing test file ${testFile}:`, error.message);
          }
        }
      } else {
        // Parse all test files in the directory
        console.log(`[QasePreFetchService] Parsing all test files in ${projectTestDirectory}`);

        const { readdirSync, statSync } = await import('fs');
        const files = this.getAllTestFiles(projectTestDirectory);

        console.log(`[QasePreFetchService] Found ${files.length} test files`);

        for (const file of files) {
          try {
            const testCases = TestFileParser.parseTestFile(file);

            for (const testCase of testCases) {
              if (testCase.qaseId) {
                qaseIds.add(testCase.qaseId);
              }
            }
          } catch (error: any) {
            console.warn(`[QasePreFetchService] Error parsing test file ${file}:`, error.message);
          }
        }
      }
    } catch (error: any) {
      console.error(`[QasePreFetchService] Error extracting Qase IDs:`, error.message);
    }

    return Array.from(qaseIds);
  }

  /**
   * Fetch test case with request deduplication
   * Prevents multiple simultaneous requests for the same test case
   */
  private async fetchTestCaseWithDedup(qaseConfig: QaseConfig, qaseId: number): Promise<null | QaseTestCase> {
    const key = `${qaseConfig.projectCode}-${qaseId}`;

    // Check if request is already in flight
    const inFlightRequest = this.inFlightRequests.get(key);
    if (inFlightRequest) {
      console.log(`[QasePreFetchService] Waiting for in-flight request for test case ${qaseId}`);
      return inFlightRequest;
    }

    // Create new request
    const request = this.qaseService.getTestCase(qaseConfig, qaseId);
    this.inFlightRequests.set(key, request);

    try {
      const result = await request;
      return result;
    } finally {
      // Clean up in-flight request
      this.inFlightRequests.delete(key);
    }
  }

  /**
   * Get all test files recursively from a directory
   */
  private getAllTestFiles(dir: string): string[] {
    const { readdirSync, statSync } = require('fs');
    const { join } = require('path');
    const files: string[] = [];

    try {
      const entries = readdirSync(dir);

      for (const entry of entries) {
        const fullPath = join(dir, entry);
        const stat = statSync(fullPath);

        if (stat.isDirectory()) {
          // Skip node_modules and hidden directories
          if (entry === 'node_modules' || entry.startsWith('.')) {
            continue;
          }
          files.push(...this.getAllTestFiles(fullPath));
        } else if (stat.isFile()) {
          // Include .spec.ts, .test.ts, .spec.js, .test.js files
          if (
            entry.endsWith('.spec.ts') ||
            entry.endsWith('.test.ts') ||
            entry.endsWith('.spec.js') ||
            entry.endsWith('.test.js')
          ) {
            files.push(fullPath);
          }
        }
      }
    } catch (error: any) {
      console.warn(`[QasePreFetchService] Error reading directory ${dir}:`, error.message);
    }

    return files;
  }

  /**
   * Get metrics summary
   */
  private getMetricsSummary(startTime: Date, endTime: Date): QasePreFetchMetrics {
    const avgResponseTime =
      this.metrics.responseTimes.length > 0 ?
        this.metrics.responseTimes.reduce((a, b) => a + b, 0) / this.metrics.responseTimes.length
      : 0;

    return {
      avgResponseTime: Math.round(avgResponseTime),
      duration: endTime.getTime() - startTime.getTime(),
      endTime,
      queueDepth: this.limiter.counts().QUEUED || 0,
      rateLimitHits: this.metrics.rateLimitHits,
      retriedRequests: this.metrics.retriedRequests,
      startTime,
      totalRequests: this.metrics.totalRequests,
    };
  }

  /**
   * Check if error is a 429 rate limit error
   */
  private is429Error(error: any): boolean {
    const errorMessage = error?.message || '';
    return (
      errorMessage.includes('429') ||
      errorMessage.toLowerCase().includes('rate limit') ||
      errorMessage.toLowerCase().includes('too many requests')
    );
  }

  /**
   * Check if error is retriable (network issues, server errors)
   */
  private isRetriableError(error: any): boolean {
    const errorMessage = error?.message || '';

    // Network errors
    if (
      errorMessage.includes('ECONNRESET') ||
      errorMessage.includes('ETIMEDOUT') ||
      errorMessage.includes('ENOTFOUND') ||
      errorMessage.toLowerCase().includes('network error')
    ) {
      return true;
    }

    // Server errors (5xx)
    if (errorMessage.match(/50[0-9]/)) {
      return true;
    }

    return false;
  }

  /**
   * Reset metrics for a new pre-fetch operation
   */
  private resetMetrics(): void {
    this.metrics = {
      rateLimitHits: 0,
      responseTimes: [],
      retriedRequests: 0,
      totalRequests: 0,
    };
  }
}
