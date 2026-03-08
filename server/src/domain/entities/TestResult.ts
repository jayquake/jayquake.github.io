import { type TestResult as PrismaTestResult } from '@prisma/client';

import { TestStep } from './TestStep';

/**
 * TestResult Entity - Individual test result with steps
 */
export class TestResult {
  get duration(): number | undefined {
    return this._duration;
  }
  get endTime(): Date | undefined {
    return this._endTime;
  }
  get error(): string | undefined {
    return this._error;
  }
  get file(): string {
    return this._file;
  }
  // Getters
  get id(): string {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get qaseId(): number | undefined {
    return this._qaseId;
  }
  get startTime(): Date {
    return this._startTime;
  }
  get status(): 'failed' | 'passed' | 'skipped' {
    return this._status;
  }
  get steps(): TestStep[] {
    return [...this._steps]; // Return copy to prevent external modification
  }
  get testRunId(): string {
    return this._testRunId;
  }

  private _duration?: number;

  private _endTime?: Date;

  private _error?: string;

  private _file: string;

  private _id: string;

  private _name: string;

  private _qaseId?: number;

  private _startTime: Date;

  private _status: 'failed' | 'passed' | 'skipped';

  private _steps: TestStep[] = [];

  private _testRunId: string;

  constructor(
    id: string,
    testRunId: string,
    name: string,
    file: string,
    status: 'failed' | 'passed' | 'skipped',
    startTime: Date,
    endTime?: Date,
    duration?: number,
    error?: string,
    qaseId?: number,
  ) {
    this._id = id;
    this._testRunId = testRunId;
    this._name = name;
    this._file = file;
    this._status = status;
    this._startTime = startTime;
    this._endTime = endTime;
    this._duration = duration;
    this._error = error;
    this._qaseId = qaseId;
  }

  // Create from Prisma format
  static fromPrisma(prisma: PrismaTestResult & { steps?: any[] }): TestResult {
    const result = new TestResult(
      prisma.id,
      prisma.testRunId,
      prisma.name,
      prisma.file,
      prisma.status as 'failed' | 'passed' | 'skipped',
      prisma.startTime,
      prisma.endTime || undefined,
      prisma.duration || undefined,
      prisma.error || undefined,
      prisma.qaseId || undefined,
    );

    if (prisma.steps) {
      const steps = prisma.steps.map((step) => TestStep.fromPrisma(step));
      result.addSteps(steps);
    }

    return result;
  }

  // Business logic methods
  addStep(step: TestStep): void {
    this._steps.push(step);
    // Sort steps by order
    this._steps.sort((a, b) => a.order - b.order);
  }

  addSteps(steps: TestStep[]): void {
    this._steps.push(...steps);
    this._steps.sort((a, b) => a.order - b.order);
  }

  getFailedStepsCount(): number {
    return this._steps.filter((step) => step.isFailed()).length;
  }

  getPassedStepsCount(): number {
    return this._steps.filter((step) => step.isPassed()).length;
  }

  getTotalStepsCount(): number {
    return this._steps.length;
  }

  isFailed(): boolean {
    return this._status === 'failed';
  }

  isPassed(): boolean {
    return this._status === 'passed';
  }

  isSkipped(): boolean {
    return this._status === 'skipped';
  }

  markCompleted(status: 'failed' | 'passed' | 'skipped', endTime: Date, error?: string): void {
    this._status = status;
    this._endTime = endTime;
    if (error) {
      this._error = error;
    }
    if (!this._duration) {
      this._duration = endTime.getTime() - this._startTime.getTime();
    }
  }

  // Convert to Prisma format
  toPrisma(): Omit<PrismaTestResult, 'createdAt' | 'updatedAt'> {
    return {
      duration: this._duration || null,
      endTime: this._endTime || null,
      error: this._error || null,
      file: this._file,
      id: this._id,
      name: this._name,
      qaseId: this._qaseId || null,
      startTime: this._startTime,
      status: this._status,
      testRunId: this._testRunId,
    };
  }
}
