import { type TestStep as PrismaTestStep } from '@prisma/client';

import { BaseRepository } from './BaseRepository';

export type TestStepCreateInput = {
  duration?: number;
  error?: string;
  location?: string;
  order: number;
  status: 'failed' | 'passed';
  testResultId: string;
  title: string;
}

export type TestStepUpdateInput = {
  duration?: number;
  error?: string;
  location?: string;
  order?: number;
  status?: 'failed' | 'passed';
  title?: string;
}

/**
 * TestStepRepository - Data access for TestStep entities
 */
export class TestStepRepository extends BaseRepository<PrismaTestStep, TestStepCreateInput, TestStepUpdateInput> {
  async create(data: TestStepCreateInput): Promise<PrismaTestStep> {
    return this.prisma.testStep.create({
      data: {
        duration: data.duration,
        error: data.error,
        location: data.location,
        order: data.order,
        status: data.status,
        testResultId: data.testResultId,
        title: data.title,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.testStep.delete({
      where: { id },
    });
  }

  async deleteByTestResultId(testResultId: string): Promise<void> {
    await this.prisma.testStep.deleteMany({
      where: { testResultId },
    });
  }

  async findAll(): Promise<PrismaTestStep[]> {
    return this.prisma.testStep.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async findById(id: string): Promise<null | PrismaTestStep> {
    return this.prisma.testStep.findUnique({
      where: { id },
    });
  }

  async findByTestResultId(testResultId: string): Promise<PrismaTestStep[]> {
    return this.prisma.testStep.findMany({
      orderBy: { order: 'asc' },
      where: { testResultId },
    });
  }

  async update(id: string, data: TestStepUpdateInput): Promise<PrismaTestStep> {
    return this.prisma.testStep.update({
      data,
      where: { id },
    });
  }
}
