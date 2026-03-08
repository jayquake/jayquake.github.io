/**
 * QaseTestCaseCache - Thread-safe in-memory cache for Qase test cases
 *
 * Responsibilities:
 * - Store pre-fetched Qase test cases in memory during test runs
 * - Provide thread-safe operations to prevent race conditions
 * - Support per-runId caching to isolate test runs
 * - Automatic cleanup of old cached data
 */

import type { QaseTestCase } from './QaseService';

/**
 * QaseTestCaseCache - Singleton cache with thread-safe operations
 */
export class QaseTestCaseCache {
  private static instance: QaseTestCaseCache;
  private cache = new Map<string, Map<number, QaseTestCase>>();
  // Cache TTL: 1 hour
  private readonly CACHE_TTL = 60 * 60 * 1000;
  private locks = new Map<string, Promise<void>>();

  private timestamps = new Map<string, number>();

  private constructor() {
    // Private constructor for singleton pattern
    console.log('[QaseTestCaseCache] Initialized');

    // Start cleanup timer (every 10 minutes)
    this.startCleanupTimer();
  }

  /**
   * Get singleton instance
   */
  static getInstance(): QaseTestCaseCache {
    if (!QaseTestCaseCache.instance) {
      QaseTestCaseCache.instance = new QaseTestCaseCache();
    }
    return QaseTestCaseCache.instance;
  }

  /**
   * Clear all test cases for a run
   *
   * @param runId - Test run ID
   */
  clear(runId: string): void {
    this.cache.delete(runId);
    this.timestamps.delete(runId);
    this.locks.delete(runId);
    console.log(`[QaseTestCaseCache] Cleared cache for run ${runId}`);
  }

  /**
   * Clear all cached data
   */
  clearAll(): void {
    this.cache.clear();
    this.timestamps.clear();
    this.locks.clear();
    console.log('[QaseTestCaseCache] Cleared all cache');
  }

  /**
   * Get a test case from the cache
   *
   * @param runId - Test run ID
   * @param qaseId - Qase test case ID
   * @returns Qase test case or null if not found
   */
  get(runId: string, qaseId: number): null | QaseTestCase {
    const runCache = this.cache.get(runId);
    if (!runCache) {
      return null;
    }

    return runCache.get(qaseId) || null;
  }

  /**
   * Get all test cases for a run
   *
   * @param runId - Test run ID
   * @returns Map of Qase ID to test case
   */
  getAll(runId: string): Map<number, QaseTestCase> {
    const runCache = this.cache.get(runId);
    if (!runCache) {
      return new Map();
    }

    // Return a copy to prevent external modifications
    return new Map(runCache);
  }

  /**
   * Get multiple test cases by IDs
   *
   * @param runId - Test run ID
   * @param qaseIds - Array of Qase IDs
   * @returns Map of found test cases
   */
  getMany(runId: string, qaseIds: number[]): Map<number, QaseTestCase> {
    const runCache = this.cache.get(runId);
    if (!runCache) {
      return new Map();
    }

    const result = new Map<number, QaseTestCase>();
    for (const qaseId of qaseIds) {
      const testCase = runCache.get(qaseId);
      if (testCase) {
        result.set(qaseId, testCase);
      }
    }

    return result;
  }

  /**
   * Get cache statistics
   */
  getStats(): {
    runStats: { age: number; runId: string; testCaseCount: number; }[];
    totalRuns: number;
    totalTestCases: number;
  } {
    const runStats: { age: number; runId: string; testCaseCount: number; }[] = [];
    let totalTestCases = 0;
    const now = Date.now();

    // Convert to array to avoid Map iteration issues
    const cacheEntries = Array.from(this.cache.entries());
    for (const [runId, runCache] of cacheEntries) {
      const timestamp = this.timestamps.get(runId) || now;
      const age = now - timestamp;
      const testCaseCount = runCache.size;

      runStats.push({
        age,
        runId,
        testCaseCount,
      });

      totalTestCases += testCaseCount;
    }

    return {
      runStats,
      totalRuns: this.cache.size,
      totalTestCases,
    };
  }

  /**
   * Check if a test case exists in cache
   *
   * @param runId - Test run ID
   * @param qaseId - Qase test case ID
   * @returns true if exists, false otherwise
   */
  has(runId: string, qaseId: number): boolean {
    const runCache = this.cache.get(runId);
    if (!runCache) {
      return false;
    }

    return runCache.has(qaseId);
  }

  /**
   * Set a test case in the cache with thread-safe operations
   * Uses Promise-based locks to prevent concurrent writes
   *
   * @param runId - Test run ID
   * @param qaseId - Qase test case ID
   * @param testCase - Qase test case data
   */
  async set(runId: string, qaseId: number, testCase: QaseTestCase): Promise<void> {
    // Wait for any in-progress operation for this runId
    const lock = this.locks.get(runId);
    if (lock) {
      await lock;
    }

    // Create new lock
    const newLock = Promise.resolve().then(() => {
      // Initialize cache for runId if not exists
      if (!this.cache.has(runId)) {
        this.cache.set(runId, new Map());
        this.timestamps.set(runId, Date.now());
      }

      // Store test case
      const runCache = this.cache.get(runId)!;
      runCache.set(qaseId, testCase);

      // Update timestamp
      this.timestamps.set(runId, Date.now());

      // Clean up lock
      this.locks.delete(runId);
    });

    this.locks.set(runId, newLock);
    await newLock;
  }

  /**
   * Set multiple test cases at once (batch operation)
   * More efficient than calling set() multiple times
   *
   * @param runId - Test run ID
   * @param testCases - Map of Qase ID to test case
   */
  async setMany(runId: string, testCases: Map<number, QaseTestCase>): Promise<void> {
    // Wait for any in-progress operation for this runId
    const lock = this.locks.get(runId);
    if (lock) {
      await lock;
    }

    // Create new lock
    const newLock = Promise.resolve().then(() => {
      // Initialize cache for runId if not exists
      if (!this.cache.has(runId)) {
        this.cache.set(runId, new Map());
      }

      // Store all test cases
      const runCache = this.cache.get(runId)!;
      // Convert to array to avoid Map iteration issues
      const testCasesArray = Array.from(testCases.entries());
      for (const [qaseId, testCase] of testCasesArray) {
        runCache.set(qaseId, testCase);
      }

      // Update timestamp
      this.timestamps.set(runId, Date.now());

      // Clean up lock
      this.locks.delete(runId);
    });

    this.locks.set(runId, newLock);
    await newLock;
  }

  /**
   * Clean up old cache entries
   */
  private cleanup(): void {
    const now = Date.now();
    const expiredRuns: string[] = [];

    // Convert to array to avoid Map iteration issues
    const timestampEntries = Array.from(this.timestamps.entries());
    for (const [runId, timestamp] of timestampEntries) {
      if (now - timestamp > this.CACHE_TTL) {
        expiredRuns.push(runId);
      }
    }

    if (expiredRuns.length > 0) {
      console.log(`[QaseTestCaseCache] Cleaning up ${expiredRuns.length} expired cache entries`);

      for (const runId of expiredRuns) {
        this.clear(runId);
      }
    }
  }

  /**
   * Start automatic cleanup timer
   * Removes cache entries older than TTL
   */
  private startCleanupTimer(): void {
    setInterval(
      () => {
        this.cleanup();
      },
      10 * 60 * 1000,
    ); // Run every 10 minutes
  }
}
