import type { ProgressUpdate } from '../types';

import { TestExecutionTracker } from './TestExecutionTracker';
import { type TestResultItem } from './TestResultItem';

/**
 * TestProgressMonitor class coordinates real-time updates
 * between console output and test execution display.
 */
export class TestProgressMonitor {
  get runId(): string {
    return this._runId;
  }
  get tracker(): TestExecutionTracker {
    return this._tracker;
  }
  private _accumulatedOutput = '';
  private _onUpdate?: (update: ProgressUpdate) => void;

  private _runId: string;

  private _tracker: TestExecutionTracker;

  constructor(runId: string, onUpdate?: (update: ProgressUpdate) => void) {
    this._runId = runId;
    this._tracker = new TestExecutionTracker();
    this._onUpdate = onUpdate;
  }

  /**
   * Get current state summary
   */
  getState(): {
    progress: {
      completed: number;
      percentage: number;
      total: number;
    };
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
    tests: TestResultItem[];
    workers?: number;
  } {
    return {
      progress: this._tracker.progress,
      qaseInfo: this._tracker.qaseInfo,
      summary: this._tracker.summary,
      testCount: this._tracker.testCount,
      tests: this._tracker.tests,
      workers: this._tracker.workers,
    };
  }

  /**
   * Process a progress update from WebSocket
   */
  processUpdate(update: ProgressUpdate): void {
    // Process console output
    // Each update.output is an independent raw chunk (not cumulative).
    // Accumulate locally and pass the chunk directly to the tracker,
    // which does its own internal accumulation.
    if (update.type === 'test-output' && update.output) {
      const chunk = update.output;
      this._accumulatedOutput += chunk;
      this._tracker.processOutput(chunk);
      this._emitTestUpdates();
    }

    // Process structured test updates if available
    if (update.type === 'test-start' || update.type === 'test-end') {
      this._processStructuredUpdate(update);
    }

    // Process step updates if available
    if (update.type === 'step-start' || update.type === 'step-end') {
      this._processStepUpdate(update);
    }
  }

  /**
   * Reset monitor
   */
  reset(): void {
    this._tracker.reset();
    this._accumulatedOutput = '';
  }

  /**
   * Emit structured test updates for newly detected tests
   */
  private _emitTestUpdates(): void {
    const {tests} = this._tracker;

    for (const test of tests) {
      // Emit test-start if test just started
      if (test.isRunning && test.startTime) {
        const startTime = test.startTime.getTime();
        const now = Date.now();

        // Only emit if test started recently (within last second)
        if (now - startTime < 1000) {
          this._onUpdate?.({
            runId: this._runId,
            testFile: test.file,
            testName: test.name,
            timestamp: test.startTime.toISOString(),
            type: 'test-start',
          });
        }
      }

      // Emit test-end if test just completed
      if (!test.isRunning && test.endTime) {
        const endTime = test.endTime.getTime();
        const now = Date.now();

        // Only emit if test completed recently (within last second)
        if (now - endTime < 1000) {
          this._onUpdate?.({
            error: test.error,
            runId: this._runId,
            status: test.status === 'running' ? 'failed' : test.status,
            testFile: test.file,
            testName: test.name,
            timestamp: test.endTime.toISOString(),
            type: 'test-end',
          });
        }
      }
    }
  }

  /**
   * Extract test number from test name or file
   */
  private _extractTestNumber(testName?: string, testFile?: string): null | number {
    // Try to extract from test name pattern: "1 tests/..."
    if (testName) {
      const match = testName.match(/^(\d+)\s+/);
      if (match) {
        return parseInt(match[1], 10);
      }
    }

    // Try to find in existing tests by name
    const existingTest = this._tracker.tests.find((t) => t.name === testName || t.file === testFile);
    if (existingTest) {
      return existingTest.number;
    }

    // Use next available number
    const maxNumber = Math.max(0, ...this._tracker.tests.map((t) => t.number));
    return maxNumber + 1;
  }

  /**
   * Process step update (from WebSocket)
   */
  private _processStepUpdate(update: ProgressUpdate): void {
    // Find the test by name or file
    const test = this._tracker.tests.find(
      (t) => t.name === update.testName || t.file === update.testFile
    );

    if (test && update.step) {
      if (update.type === 'step-start') {
        // Add new step to test
        test.addStep({
          duration: 0,
          status: 'passed', // Will be updated on step-end
          title: update.step.title,
        });
      } else if (update.type === 'step-end') {
        // Update existing step with final status and duration
        test.updateStep(update.step.title, {
          duration: update.step.duration,
          error: update.step.error,
          status: update.step.status,
        });
      }
      
      // Emit update for UI refresh
      this._onUpdate?.(update);
    }
  }

  /**
   * Process structured test update (from WebSocket)
   */
  private _processStructuredUpdate(update: ProgressUpdate): void {
    if (update.type === 'test-start' && update.testFile && update.testName) {
      // Try to extract test number from test name or file
      const testNumber = this._extractTestNumber(update.testName, update.testFile);
      if (testNumber) {
        this._tracker.startTest(testNumber, update.testFile, update.testName);
      }
    } else if (update.type === 'test-end' && update.testName && update.status) {
      const testNumber = this._extractTestNumber(update.testName, update.testFile);
      if (testNumber) {
        this._tracker.completeTest(testNumber, update.status, undefined, update.error);
      }
    }
  }
}
