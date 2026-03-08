import { type Prisma, type TestResult as PrismaTestResult } from '@prisma/client';

import { TestResult } from '../domain/entities/TestResult';
import { TestStep } from '../domain/entities/TestStep';
import { BaseRepository } from './BaseRepository';

export type TestResultCreateInput = {
  browserName?: string;
  duration?: number;
  endTime?: Date;
  error?: string;
  file: string;
  name: string;
  // Hybrid Storage fields
  playwrightData?: string; // JSON string
  projectName?: string;
  qaseId?: number;
  retryCount?: number;
  startTime: Date;
  status: 'failed' | 'passed' | 'skipped';
  testRunId: string;
}

export type TestResultUpdateInput = {
  duration?: number;
  endTime?: Date;
  error?: string;
  status?: 'failed' | 'passed' | 'skipped';
}

export type TestResultWithSteps = PrismaTestResult & {
  steps?: any[];
};

/**
 * TestResultRepository - Data access for TestResult entities
 */
export class TestResultRepository extends BaseRepository<
  TestResultWithSteps,
  TestResultCreateInput,
  TestResultUpdateInput
> {
  async addStep(
    testResultId: string,
    step: {
      duration?: number;
      error?: string;
      location?: string; // JSON string
      order: number;
      status: 'failed' | 'passed';
      title: string;
    },
  ): Promise<void> {
    await this.prisma.testStep.create({
      data: {
        duration: step.duration,
        error: step.error,
        location: step.location,
        order: step.order,
        status: step.status,
        testResultId,
        title: step.title,
      },
    });
  }

  async count(filters?: {
    qaseId?: number;
    status?: 'failed' | 'passed' | 'skipped';
    testRunId?: string;
  }): Promise<number> {
    const where: Prisma.TestResultWhereInput = {};

    if (filters?.testRunId) {
      where.testRunId = filters.testRunId;
    }
    if (filters?.status) {
      where.status = filters.status;
    }
    if (filters?.qaseId) {
      where.qaseId = filters.qaseId;
    }

    return this.prisma.testResult.count({ where });
  }

  async create(data: TestResultCreateInput): Promise<TestResultWithSteps> {
    return this.prisma.testResult.create({
      data: {
        browserName: data.browserName,
        duration: data.duration,
        endTime: data.endTime,
        error: data.error,
        file: data.file,
        name: data.name,
        // Hybrid Storage fields
        playwrightData: data.playwrightData,
        projectName: data.projectName,
        qaseId: data.qaseId,
        retryCount: data.retryCount,
        startTime: data.startTime,
        status: data.status,
        testRunId: data.testRunId,
      },
      include: {
        steps: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.testResult.delete({
      where: { id },
    });
  }

  async findAll(filters?: {
    orderBy?: Prisma.TestResultOrderByWithRelationInput;
    qaseId?: number;
    skip?: number;
    status?: 'failed' | 'passed' | 'skipped';
    take?: number;
    testRunId?: string;
  }): Promise<TestResultWithSteps[]> {
    const where: Prisma.TestResultWhereInput = {};

    if (filters?.testRunId) {
      where.testRunId = filters.testRunId;
    }
    if (filters?.status) {
      where.status = filters.status;
    }
    if (filters?.qaseId) {
      where.qaseId = filters.qaseId;
    }

    return this.prisma.testResult.findMany({
      include: {
        steps: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: filters?.orderBy || { startTime: 'asc' },
      skip: filters?.skip,
      take: filters?.take,
      where,
    });
  }

  async findById(id: string): Promise<null | TestResultWithSteps> {
    return this.prisma.testResult.findUnique({
      include: {
        steps: {
          orderBy: { order: 'asc' },
        },
      },
      where: { id },
    });
  }

  async findByTestRunId(testRunId: string): Promise<TestResultWithSteps[]> {
    return this.prisma.testResult.findMany({
      include: {
        steps: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { startTime: 'asc' },
      where: { testRunId },
    });
  }

  async getByTestRun(testRunId: string): Promise<TestResultWithSteps[]> {
    return this.findAll({ testRunId });
  }

  async getFailedTests(testRunId: string): Promise<TestResultWithSteps[]> {
    return this.findAll({ status: 'failed', testRunId });
  }

  async update(id: string, data: TestResultUpdateInput): Promise<TestResultWithSteps> {
    return this.prisma.testResult.update({
      data: {
        duration: data.duration,
        endTime: data.endTime,
        error: data.error,
        status: data.status,
      },
      include: {
        steps: {
          orderBy: { order: 'asc' },
        },
      },
      where: { id },
    });
  }
}
