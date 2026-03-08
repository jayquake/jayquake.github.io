import { type TestRun as PrismaTestRun } from '@prisma/client';

import type { FlowConfig, TestRunConfig } from '../../../../shared/types';

import { TestRunSummary } from '../../domain/valueObjects/TestRunSummary';

/**
 * TestRun Entity - Encapsulates test run logic with OOP principles
 */
export class TestRun {
  get config(): FlowConfig | TestRunConfig {
    return this._config;
  }
  get duration(): number | undefined {
    return this._duration;
  }
  get endTime(): Date | undefined {
    return this._endTime;
  }
  get flowId(): string | undefined {
    return this._flowId;
  }
  // Getters
  get id(): string {
    return this._id;
  }
  get projectId(): string | undefined {
    return this._projectId;
  }
  get reportPath(): string | undefined {
    return this._reportPath;
  }
  get runId(): string {
    return this._runId;
  }
  get startTime(): Date {
    return this._startTime;
  }
  get status(): 'cancelled' | 'completed' | 'failed' | 'running' {
    return this._status;
  }
  get summary(): TestRunSummary {
    return this._summary;
  }

  private _config: FlowConfig | TestRunConfig;

  private _duration?: number;

  private _endTime?: Date;

  private _flowId?: string;

  private _id: string;

  private _projectId?: string;

  private _reportPath?: string;

  private _runId: string;

  private _startTime: Date;

  private _status: 'cancelled' | 'completed' | 'failed' | 'running';

  private _summary: TestRunSummary;

  constructor(
    id: string,
    runId: string,
    status: 'cancelled' | 'completed' | 'failed' | 'running',
    startTime: Date,
    config: FlowConfig | TestRunConfig,
    summary: TestRunSummary,
    projectId?: string,
    flowId?: string,
    endTime?: Date,
    duration?: number,
    reportPath?: string,
  ) {
    this._id = id;
    this._runId = runId;
    this._projectId = projectId;
    this._flowId = flowId;
    this._status = status;
    this._startTime = startTime;
    this._endTime = endTime;
    this._duration = duration;
    this._reportPath = reportPath;
    this._config = config;
    this._summary = summary;
  }

  // Create from Prisma format
  static fromPrisma(prisma: PrismaTestRun & { summary?: any }): TestRun {
    const config = JSON.parse(prisma.config) as FlowConfig | TestRunConfig;
    const summaryData =
      prisma.summary ?
        JSON.parse(prisma.summary)
      : {
          failed: 0,
          passed: 0,
          skipped: 0,
          total: 0,
        };
    const summary = TestRunSummary.fromJSON(summaryData);

    return new TestRun(
      prisma.id,
      prisma.runId,
      prisma.status as 'cancelled' | 'completed' | 'failed' | 'running',
      prisma.startTime,
      config,
      summary,
      prisma.projectId || undefined,
      prisma.flowId || undefined,
      prisma.endTime || undefined,
      prisma.duration || undefined,
      prisma.reportPath || undefined,
    );
  }

  cancel(): void {
    this._status = 'cancelled';
    this._endTime = new Date();
    if (this._endTime) {
      this._duration = this._endTime.getTime() - this._startTime.getTime();
    }
  }

  isCancelled(): boolean {
    return this._status === 'cancelled';
  }

  isCompleted(): boolean {
    return this._status === 'completed';
  }

  isFailed(): boolean {
    return this._status === 'failed';
  }

  isRunning(): boolean {
    return this._status === 'running';
  }

  // Business logic methods
  markCompleted(endTime: Date, summary: TestRunSummary): void {
    this._endTime = endTime;
    this._duration = endTime.getTime() - this._startTime.getTime();
    this._summary = summary;
    this._status = summary.isSuccessful() ? 'completed' : 'failed';
  }

  markFailed(endTime: Date, error?: string): void {
    this._endTime = endTime;
    this._duration = endTime.getTime() - this._startTime.getTime();
    this._status = 'failed';
    if (error && this._summary) {
      // Update summary with error if needed
    }
  }

  setReportPath(path: string): void {
    this._reportPath = path;
  }

  // Convert to Prisma format for database operations
  toPrisma(): Omit<PrismaTestRun, 'createdAt' | 'updatedAt'> {
    return {
      config: JSON.stringify(this._config),
      duration: this._duration || null,
      endTime: this._endTime || null,
      flowId: this._flowId || null,
      id: this._id,
      projectId: this._projectId || null,
      reportPath: this._reportPath || null,
      runId: this._runId,
      startTime: this._startTime,
      status: this._status,
      summary: JSON.stringify(this._summary.toJSON()),
    };
  }
}
