import { type TestRunSummary } from '../../../../shared/domain/valueObjects/TestRunSummary';

export type TestResult = {
  duration?: number;
  error?: string;
  file: string;
  id: string;
  name: string;
  qaseId?: number;
  status: 'failed' | 'passed' | 'skipped';
  steps?: {
    duration?: number;
    error?: string;
    status: 'failed' | 'passed';
    title: string;
  }[];
}

/**
 * TestRunData - Value object for test run data
 * Encapsulates test run information and provides methods for data access
 */
export class TestRunData {
  constructor(
    public readonly id: string,
    public readonly runId: string,
    public readonly projectId: null | string,
    public readonly status: string,
    public readonly startTime: string,
    public readonly endTime: null | string,
    public readonly duration: null | number,
    public readonly summary: TestRunSummary,
    public readonly results: TestResult[],
    public readonly reportPath: null | string,
    public readonly config: any
  ) {}

  /**
   * Get all failed test results
   */
  getFailedResults(): TestResult[] {
    return this.results.filter(r => r.status === 'failed');
  }

  /**
   * Get formatted duration string
   */
  getFormattedDuration(): string {
    if (!this.duration) return 'N/A';
    return `${(this.duration / 1000).toFixed(2)}s`;
  }

  /**
   * Get formatted start time
   */
  getFormattedStartTime(): string {
    return new Date(this.startTime).toLocaleString();
  }

  /**
   * Get all passed test results
   */
  getPassedResults(): TestResult[] {
    return this.results.filter(r => r.status === 'passed');
  }

  /**
   * Get pass rate percentage
   */
  getPassRate(): number {
    if (this.summary.total === 0) return 0;
    return Math.round((this.summary.passed / this.summary.total) * 100);
  }

  /**
   * Get all skipped test results
   */
  getSkippedResults(): TestResult[] {
    return this.results.filter(r => r.status === 'skipped');
  }

  /**
   * Check if test run has results
   */
  hasResults(): boolean {
    return this.results.length > 0;
  }

  /**
   * Check if test run is completed
   */
  isCompleted(): boolean {
    return this.status === 'completed' || this.status === 'failed';
  }
}
