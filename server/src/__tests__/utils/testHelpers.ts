/**
 * Test Utilities and Helpers
 * Provides mocking utilities, test database setup, and common test patterns
 */

import type { QaseConfig } from '../../../../shared/types';

import { type PrismaClient } from '@prisma/client';
import Bottleneck from 'bottleneck';
import { afterAll, beforeAll, vi } from 'vitest';

/**
 * Create a mock Prisma client for testing
 * Returns a mock object with common repository methods
 */
export function createMockPrisma(): Partial<PrismaClient> {
  return {
    $transaction: vi.fn((callback: any) => {
      const mockPrisma = createMockPrisma();
      return callback(mockPrisma);
    }),
    qaseTestCase: {
      count: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
      deleteMany: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      upsert: vi.fn(),
    } as any,
    testResult: {
      count: vi.fn(),
      create: vi.fn(),
      createMany: vi.fn(),
      delete: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
    } as any,
    testRun: {
      count: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
    } as any,
  } as Partial<PrismaClient>;
}

/**
 * Create a mock rate limiter for testing
 * Bypasses actual rate limiting for faster tests
 */
export function createMockRateLimiter(): Bottleneck {
  const limiter = new Bottleneck({
    maxConcurrent: 1000, // No real limit in tests
    minTime: 0, // No delay
  });
  return limiter;
}

/**
 * Create a test database in memory
 * For tests that need actual DB operations
 */
export function createTestDatabase(): string {
  // Use in-memory SQLite for tests
  return 'file::memory:?cache=shared';
}

/**
 * Create a test Qase configuration
 */
export function createTestQaseConfig(overrides?: Partial<QaseConfig>): QaseConfig {
  return {
    apiToken: 'test-token-12345',
    enabled: true,
    host: 'https://api.qase.io',
    projectCode: 'TEST',
    ...overrides,
  };
}

/**
 * Assert that a function throws an error
 */
export async function expectToThrow(fn: () => Promise<any>, errorMessage?: string) {
  try {
    await fn();
    throw new Error('Expected function to throw, but it did not');
  } catch (error: any) {
    if (errorMessage && !error.message.includes(errorMessage)) {
      throw new Error(`Expected error message to include "${errorMessage}", but got "${error.message}"`);
    }
  }
}

/**
 * Mock console methods to suppress logs during tests
 */
export function mockConsole() {
  const originalLog = console.log;
  const originalWarn = console.warn;
  const originalError = console.error;

  beforeAll(() => {
    console.log = vi.fn();
    console.warn = vi.fn();
    console.error = vi.fn();
  });

  afterAll(() => {
    console.log = originalLog;
    console.warn = originalWarn;
    console.error = originalError;
  });
}

/**
 * Create a mock fetch for API testing
 */
export function mockFetch(responses: Record<string, any>) {
  global.fetch = vi.fn((url: string) => {
    const urlString = url.toString();
    for (const [pattern, response] of Object.entries(responses)) {
      if (urlString.includes(pattern)) {
        return Promise.resolve({
          json: () => Promise.resolve(response),
          ok: true,
          status: 200,
          statusText: 'OK',
        } as Response);
      }
    }
    return Promise.reject(new Error(`No mock response for ${url}`));
  }) as any;
}

/**
 * Mock Qase API responses
 */
export function mockQaseApiResponse(testCaseId: number, overrides?: any) {
  return {
    result: {
      automation: 1,
      description: `Description for test case ${testCaseId}`,
      id: testCaseId,
      preconditions: 'Setup test environment',
      steps: [
        {
          action: 'Navigate to page',
          expected_result: 'Page loads successfully',
        },
      ],
      suite: {
        id: 1,
        title: 'Test Suite',
      },
      title: `Test Case ${testCaseId}`,
      ...overrides,
    },
    status: true,
  };
}

/**
 * Sleep utility for async tests
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Wait for condition to be true
 */
export async function waitFor(
  condition: () => boolean | Promise<boolean>,
  timeout = 5000,
  interval = 100,
): Promise<void> {
  const start = Date.now();
  while (!(await condition())) {
    if (Date.now() - start > timeout) {
      throw new Error('Timeout waiting for condition');
    }
    await sleep(interval);
  }
}
