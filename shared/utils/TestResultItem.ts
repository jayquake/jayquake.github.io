/**
 * TestResultItem class represents a single test result
 * with status, duration, metadata, and real-time step tracking.
 */
import { QaseIdExtractor } from './QaseIdExtractor';
import type { TestStep } from '../types';

export class TestResultItem {
  get displayName(): string {
    return `${this._file}: ${this._name}`;
  }
  get duration(): number {
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
  get formattedDuration(): string {
    if (this._duration < 1) {
      return `${Math.round(this._duration * 1000)}ms`;
    }
    if (this._duration < 60) {
      return `${this._duration.toFixed(1)}s`;
    }
    const minutes = Math.floor(this._duration / 60);
    const seconds = this._duration % 60;
    return `${minutes}m ${seconds.toFixed(1)}s`;
  }
  get isFailed(): boolean {
    return this._status === 'failed';
  }
  // Computed properties
  get isPassed(): boolean {
    return this._status === 'passed';
  }
  get isRunning(): boolean {
    return this._status === 'running';
  }

  get isSkipped(): boolean {
    return this._status === 'skipped';
  }

  get name(): string {
    return this._name;
  }

  // Getters
  get number(): number {
    return this._number;
  }

  get qaseId(): number | undefined {
    return this._qaseId;
  }

  get startTime(): Date | undefined {
    return this._startTime;
  }

  get status(): 'failed' | 'passed' | 'running' | 'skipped' {
    return this._status;
  }

  get steps(): TestStep[] {
    return this._steps;
  }

  private _duration: number; // in seconds

  private _endTime?: Date;

  private _error?: string;

  private _file: string;

  private _name: string;

  private _number: number;

  private _qaseId?: number;

  private _startTime?: Date;

  private _status: 'failed' | 'passed' | 'running' | 'skipped';

  private _steps: TestStep[] = [];

  constructor(data: {
    duration?: number;
    endTime?: Date;
    error?: string;
    file: string;
    name: string;
    number: number;
    qaseId?: number;
    startTime?: Date;
    status: 'failed' | 'passed' | 'running' | 'skipped';
    steps?: TestStep[];
  }) {
    this._number = data.number;
    this._file = data.file;
    this._name = data.name;
    this._status = data.status;
    this._duration = data.duration || 0;
    this._error = data.error;
    this._startTime = data.startTime;
    this._endTime = data.endTime;
    this._qaseId = data.qaseId;
    this._steps = data.steps || [];
  }

  /**
   * Create from plain object
   */
  static fromJSON(data: {
    duration?: number;
    endTime?: string;
    error?: string;
    file: string;
    name: string;
    number: number;
    qaseId?: number;
    startTime?: string;
    status: 'failed' | 'passed' | 'running' | 'skipped';
    steps?: TestStep[];
  }): TestResultItem {
    return new TestResultItem({
      duration: data.duration,
      endTime: data.endTime ? new Date(data.endTime) : undefined,
      error: data.error,
      file: data.file,
      name: data.name,
      number: data.number,
      qaseId: data.qaseId,
      startTime: data.startTime ? new Date(data.startTime) : undefined,
      status: data.status,
      steps: data.steps || [],
    });
  }

  /**
   * Mark test as completed with result
   */
  complete(status: 'failed' | 'passed' | 'skipped', duration?: number, error?: string): void {
    this._status = status;
    this._endTime = new Date();
    if (duration !== undefined) {
      this._duration = duration;
    } else if (this._startTime && this._endTime) {
      this._duration = (this._endTime.getTime() - this._startTime.getTime()) / 1000;
    }
    if (error) {
      this._error = error;
    }
  }

  /**
   * Extract Qase ID from test name
   * Uses centralized QaseIdExtractor for consistency
   */
  extractQaseId(): number | undefined {
    const id = QaseIdExtractor.extract(this._name);
    return id !== null ? id : undefined;
  }

  // Methods
  /**
   * Mark test as started
   */
  start(): void {
    this._status = 'running';
    this._startTime = new Date();
  }

  /**
   * Add a step to this test (for real-time updates)
   */
  addStep(step: TestStep): void {
    this._steps.push(step);
  }

  /**
   * Update an existing step (for real-time updates)
   */
  updateStep(title: string, updates: Partial<TestStep>): void {
    const step = this._steps.find(s => s.title === title);
    if (step) {
      Object.assign(step, updates);
    }
  }

  /**
   * Set all steps at once (from final results)
   */
  setSteps(steps: TestStep[]): void {
    this._steps = steps;
  }

  /**
   * Convert to plain object for serialization
   */
  toJSON(): {
    duration: number;
    endTime?: string;
    error?: string;
    file: string;
    name: string;
    number: number;
    qaseId?: number;
    startTime?: string;
    status: 'failed' | 'passed' | 'running' | 'skipped';
    steps: TestStep[];
  } {
    return {
      duration: this._duration,
      endTime: this._endTime?.toISOString(),
      error: this._error,
      file: this._file,
      name: this._name,
      number: this._number,
      qaseId: this._qaseId || this.extractQaseId(),
      startTime: this._startTime?.toISOString(),
      status: this._status,
      steps: this._steps,
    };
  }
}
