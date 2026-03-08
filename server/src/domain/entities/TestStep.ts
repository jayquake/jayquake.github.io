import { type TestStep as PrismaTestStep } from '@prisma/client';

export type StepLocation = {
  file: string;
  line: number;
}

/**
 * TestStep Entity - Test step with validation
 */
export class TestStep {
  get duration(): number | undefined {
    return this._duration;
  }
  get error(): string | undefined {
    return this._error;
  }
  // Getters
  get id(): string {
    return this._id;
  }
  get location(): StepLocation | undefined {
    return this._location;
  }
  get order(): number {
    return this._order;
  }
  get status(): 'failed' | 'passed' {
    return this._status;
  }
  get testResultId(): string {
    return this._testResultId;
  }
  get title(): string {
    return this._title;
  }

  private _duration?: number;

  private _error?: string;

  private _id: string;

  private _location?: StepLocation;

  private _order: number;

  private _status: 'failed' | 'passed';

  private _testResultId: string;

  private _title: string;

  constructor(
    id: string,
    testResultId: string,
    title: string,
    status: 'failed' | 'passed',
    order: number,
    duration?: number,
    error?: string,
    location?: StepLocation,
  ) {
    this._id = id;
    this._testResultId = testResultId;
    this._title = title;
    this._status = status;
    this._order = order;
    this._duration = duration;
    this._error = error;
    this._location = location;
  }

  // Create from Prisma format
  static fromPrisma(prisma: PrismaTestStep): TestStep {
    let location: StepLocation | undefined;
    if (prisma.location) {
      try {
        location = JSON.parse(prisma.location) as StepLocation;
      } catch (e) {
        // Invalid JSON, ignore
      }
    }

    return new TestStep(
      prisma.id,
      prisma.testResultId,
      prisma.title,
      prisma.status as 'failed' | 'passed',
      prisma.order,
      prisma.duration || undefined,
      prisma.error || undefined,
      location,
    );
  }

  isFailed(): boolean {
    return this._status === 'failed';
  }

  // Business logic methods
  isPassed(): boolean {
    return this._status === 'passed';
  }

  markFailed(error: string): void {
    this._status = 'failed';
    this._error = error;
  }

  markPassed(): void {
    this._status = 'passed';
    this._error = undefined;
  }

  setDuration(duration: number): void {
    this._duration = duration;
  }

  setLocation(location: StepLocation): void {
    this._location = location;
  }

  // Convert to Prisma format
  toPrisma(): Omit<PrismaTestStep, 'createdAt' | 'updatedAt'> {
    return {
      duration: this._duration || null,
      error: this._error || null,
      id: this._id,
      location: this._location ? JSON.stringify(this._location) : null,
      order: this._order,
      status: this._status,
      testResultId: this._testResultId,
      title: this._title,
    };
  }
}
