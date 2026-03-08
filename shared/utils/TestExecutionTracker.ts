import { ConsoleOutputParser } from './ConsoleOutputParser';
import { TestResultItem } from './TestResultItem';

/**
 * TestExecutionTracker class tracks test execution state
 * and parses console output in real-time.
 */
export class TestExecutionTracker {
  get consoleOutput(): string {
    return this._consoleOutput;
  }
  get failedTests(): TestResultItem[] {
    return this.tests.filter((t) => t.isFailed);
  }
  get filteredOutput(): string {
    return this._filteredOutput;
  }
  get passedTests(): TestResultItem[] {
    return this.tests.filter((t) => t.isPassed);
  }
  get progress(): {
    completed: number;
    percentage: number;
    total: number;
  } {
    const total = this._testCount || this._tests.size;
    const completed = this.tests.filter((t) => !t.isRunning).length;
    return {
      completed,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
      total,
    };
  }
  get qaseInfo():
    | undefined
    | {
        branch?: string;
        environmentHost?: string;
        environmentId?: number;
        environmentSlug?: string;
        environmentTitle?: string;
      } {
    return this._qaseInfo;
  }
  get runningTests(): TestResultItem[] {
    return this.tests.filter((t) => t.isRunning);
  }
  get skippedTests(): TestResultItem[] {
    return this.tests.filter((t) => t.isSkipped);
  }

  get summary():
    | undefined
    | {
        duration: string;
        failed: number;
        passed: number;
        skipped: number;
      } {
    return this._summary;
  }

  // Getters
  get testCount(): number | undefined {
    return this._testCount;
  }

  get tests(): TestResultItem[] {
    return Array.from(this._tests.values()).sort((a, b) => a.number - b.number);
  }

  get workers(): number | undefined {
    return this._workers;
  }

  private _consoleOutput = '';

  private _filteredOutput = '';

  private _parser: ConsoleOutputParser;

  private _qaseInfo?: {
    branch?: string;
    environmentHost?: string;
    environmentId?: number;
    environmentSlug?: string;
    environmentTitle?: string;
  };

  private _summary?: {
    duration: string;
    failed: number;
    passed: number;
    skipped: number;
  };

  private _testCount?: number;

  private _tests: Map<number, TestResultItem> = new Map();

  private _workers?: number;

  constructor() {
    this._parser = new ConsoleOutputParser();
  }

  /**
   * Mark a test as completed
   */
  completeTest(testNumber: number, status: 'failed' | 'passed' | 'skipped', duration?: number, error?: string): void {
    const test = this._tests.get(testNumber);
    if (test) {
      test.complete(status, duration, error);
    }
  }

  /**
   * Get test by number
   */
  getTest(testNumber: number): TestResultItem | undefined {
    return this._tests.get(testNumber);
  }

  /**
   * Process new console output
   */
  processOutput(output: string): void {
    // Append to console output
    this._consoleOutput += `${output  }\n`;

    // Parse test execution from RAW output before filtering.
    // The filter intentionally strips test-result lines (they're "used for structured data"),
    // so we must parse first, then filter for display purposes.
    const parsed = this._parser.parseTestExecution(this._consoleOutput);

    // Filter is for display only (removes noise / already-parsed lines)
    this._filteredOutput = this._parser.filterOutput(this._consoleOutput);

    // Update test count and workers
    if (parsed.testCount !== undefined) {
      this._testCount = parsed.testCount;
    }
    if (parsed.workers !== undefined) {
      this._workers = parsed.workers;
    }

    // Register currently-running tests (shows up before they complete)
    for (const runningData of parsed.runningTests) {
      if (!this._tests.has(runningData.number)) {
        const test = new TestResultItem({
          file: runningData.file,
          name: runningData.name,
          number: runningData.number,
          status: 'running',
        });
        test.start();
        this._tests.set(runningData.number, test);
      }
    }

    // Update completed test results
    for (const testData of parsed.tests) {
      const existing = this._tests.get(testData.number);
      if (existing) {
        existing.complete(testData.status, testData.duration);
      } else {
        const test = new TestResultItem({
          duration: testData.duration,
          file: testData.file,
          name: testData.name,
          number: testData.number,
          status: testData.status,
        });
        this._tests.set(testData.number, test);
      }
    }

    // Update summary
    if (parsed.summary) {
      this._summary = parsed.summary;
    }

    // Parse Qase info
    const qaseInfo = this._parser.parseQaseInfo(this._filteredOutput);
    if (qaseInfo) {
      this._qaseInfo = qaseInfo;
    }
  }

  /**
   * Reset tracker
   */
  reset(): void {
    this._testCount = undefined;
    this._workers = undefined;
    this._tests.clear();
    this._summary = undefined;
    this._qaseInfo = undefined;
    this._consoleOutput = '';
    this._filteredOutput = '';
  }

  /**
   * Mark a test as started
   */
  startTest(testNumber: number, file: string, name: string): void {
    const existing = this._tests.get(testNumber);
    if (existing) {
      existing.start();
    } else {
      const test = new TestResultItem({
        file,
        name,
        number: testNumber,
        status: 'running',
      });
      test.start();
      this._tests.set(testNumber, test);
    }
  }

  /**
   * Convert to JSON for serialization
   */
  toJSON(): {
    consoleOutput: string;
    filteredOutput: string;
    qaseInfo?: {
      branch?: string;
      environmentHost?: string;
      environmentId?: number;
      environmentSlug?: string;
      environmentTitle?: string;
    };
    summary?: {
      duration: string;
      failed: number;
      passed: number;
      skipped: number;
    };
    testCount?: number;
    tests: ReturnType<TestResultItem['toJSON']>[];
    workers?: number;
  } {
    return {
      consoleOutput: this._consoleOutput,
      filteredOutput: this._filteredOutput,
      qaseInfo: this._qaseInfo,
      summary: this._summary,
      testCount: this._testCount,
      tests: this.tests.map((t) => t.toJSON()),
      workers: this._workers,
    };
  }
}
