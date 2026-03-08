import { type Prisma, type TestLog } from '@prisma/client';

import { BaseRepository } from './BaseRepository';

export type TestLogCreateInput = {
  level: 'debug' | 'error' | 'info' | 'warn';
  location?: string;
  message: string;
  metadata?: string; // JSON string
  testRunId: string;
  timestamp: Date;
}

export type TestLogUpdateInput = {
  level?: 'debug' | 'error' | 'info' | 'warn';
  location?: string;
  message?: string;
  metadata?: string; // JSON string
}

/**
 * TestLogRepository - Data access for TestLog entities
 */
export class TestLogRepository extends BaseRepository<TestLog, TestLogCreateInput, TestLogUpdateInput> {
  async count(filters?: {
    level?: 'debug' | 'error' | 'info' | 'warn';
    location?: string;
    testRunId?: string;
  }): Promise<number> {
    const where: Prisma.TestLogWhereInput = {};

    if (filters?.testRunId) {
      where.testRunId = filters.testRunId;
    }
    if (filters?.level) {
      where.level = filters.level;
    }
    if (filters?.location) {
      where.location = { contains: filters.location };
    }

    return this.prisma.testLog.count({ where });
  }

  async create(data: TestLogCreateInput): Promise<TestLog> {
    return this.prisma.testLog.create({
      data: {
        level: data.level,
        location: data.location,
        message: data.message,
        metadata: data.metadata,
        testRunId: data.testRunId,
        timestamp: data.timestamp,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.testLog.delete({
      where: { id },
    });
  }

  async findAll(filters?: {
    level?: 'debug' | 'error' | 'info' | 'warn';
    location?: string;
    orderBy?: Prisma.TestLogOrderByWithRelationInput;
    skip?: number;
    take?: number;
    testRunId?: string;
  }): Promise<TestLog[]> {
    const where: Prisma.TestLogWhereInput = {};

    if (filters?.testRunId) {
      where.testRunId = filters.testRunId;
    }
    if (filters?.level) {
      where.level = filters.level;
    }
    if (filters?.location) {
      where.location = { contains: filters.location };
    }

    return this.prisma.testLog.findMany({
      orderBy: filters?.orderBy || { timestamp: 'asc' },
      skip: filters?.skip,
      take: filters?.take,
      where,
    });
  }

  async findById(id: string): Promise<null | TestLog> {
    return this.prisma.testLog.findUnique({
      where: { id },
    });
  }

  async getLogsByLevel(level: 'debug' | 'error' | 'info' | 'warn'): Promise<TestLog[]> {
    return this.findAll({ level });
  }

  async getLogsByLocation(location: string): Promise<TestLog[]> {
    return this.findAll({ location });
  }

  async getLogsByTestRun(testRunId: string): Promise<TestLog[]> {
    return this.findAll({ testRunId });
  }

  async searchLogs(query: string, testRunId?: string): Promise<TestLog[]> {
    const where: Prisma.TestLogWhereInput = {
      message: { contains: query },
    };

    if (testRunId) {
      where.testRunId = testRunId;
    }

    return this.prisma.testLog.findMany({
      orderBy: { timestamp: 'asc' },
      where,
    });
  }

  async update(id: string, data: TestLogUpdateInput): Promise<TestLog> {
    return this.prisma.testLog.update({
      data: {
        level: data.level,
        location: data.location,
        message: data.message,
        metadata: data.metadata,
      },
      where: { id },
    });
  }
}
