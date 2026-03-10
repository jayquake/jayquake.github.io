import { type Prisma, type TestRun as PrismaTestRun } from '@prisma/client';

import { BaseRepository } from './BaseRepository';

export type TestRunCreateInput = {
  config: string; // JSON string
  duration?: number;
  endTime?: Date;
  flowId?: string;
  projectId?: string;
  reportPath?: string;
  runId: string;
  sdkType?: string;
  startTime: Date;
  status: string;
  summary: string; // JSON string
  testFramework?: string;
}

export type TestRunUpdateInput = {
  artifactRetentionUntil?: Date;
  duration?: number;
  endTime?: Date;
  failedCount?: number;
  // Hybrid Storage fields
  htmlGenerated?: boolean;
  htmlGeneratedAt?: Date;
  passedCount?: number;
  qaseId?: number; // Qase Run ID
  reportPath?: null | string;
  skippedCount?: number;
  status?: string;
  stderr?: null | string;
  stdout?: null | string;
  summary?: string; // JSON string
  testCount?: number;
  totalArtifacts?: number;
  totalArtifactSize?: number;
}

export type TestRunWithRelations = PrismaTestRun & {
  logs?: any[];
  mcpAnalyses?: any[];
  results?: any[];
};

/**
 * TestRunRepository - Data access for TestRun entities
 */
export class TestRunRepository extends BaseRepository<TestRunWithRelations, TestRunCreateInput, TestRunUpdateInput> {
  async count(filters?: { flowId?: string; projectId?: string; status?: string }): Promise<number> {
    const where: Prisma.TestRunWhereInput = {};

    if (filters?.projectId) {
      where.projectId = filters.projectId;
    }
    if (filters?.flowId) {
      where.flowId = filters.flowId;
    }
    if (filters?.status) {
      where.status = filters.status;
    }

    return this.prisma.testRun.count({ where });
  }

  async create(data: TestRunCreateInput): Promise<TestRunWithRelations> {
    return this.prisma.testRun.create({
      data: {
        config: data.config,
        duration: data.duration,
        endTime: data.endTime,
        flowId: data.flowId,
        projectId: data.projectId,
        reportPath: data.reportPath,
        runId: data.runId,
        sdkType: data.sdkType,
        startTime: data.startTime,
        status: data.status,
        summary: data.summary,
        testFramework: data.testFramework,
      },
      include: {
        logs: true,
        mcpAnalyses: true,
        results: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.testRun.delete({
      where: { id },
    });
  }

  async findAll(filters?: {
    flowId?: string;
    orderBy?: Prisma.TestRunOrderByWithRelationInput;
    projectId?: string;
    skip?: number;
    status?: string;
    take?: number;
  }): Promise<TestRunWithRelations[]> {
    const where: Prisma.TestRunWhereInput = {};

    if (filters?.projectId) {
      where.projectId = filters.projectId;
    }
    if (filters?.flowId) {
      where.flowId = filters.flowId;
    }
    if (filters?.status) {
      where.status = filters.status;
    }

    return this.prisma.testRun.findMany({
      include: {
        logs: true,
        mcpAnalyses: true,
        results: true,
      },
      orderBy: filters?.orderBy || { startTime: 'desc' },
      skip: filters?.skip,
      take: filters?.take,
      where,
    });
  }

  async findById(id: string): Promise<null | TestRunWithRelations> {
    return this.prisma.testRun.findUnique({
      include: {
        logs: true,
        mcpAnalyses: {
          include: {
            artifacts: true,
          },
        },
        results: {
          include: {
            steps: true,
          },
        },
      },
      where: { id },
    });
  }

  async findByRunId(runId: string): Promise<null | TestRunWithRelations> {
    return this.prisma.testRun.findUnique({
      include: {
        logs: true,
        mcpAnalyses: {
          include: {
            artifacts: true,
          },
        },
        results: {
          include: {
            steps: true,
          },
        },
      },
      where: { runId },
    });
  }

  async getRunsByFlow(flowId: string): Promise<TestRunWithRelations[]> {
    return this.findAll({ flowId });
  }

  async getRunsByProject(projectId: string): Promise<TestRunWithRelations[]> {
    return this.findAll({ projectId });
  }

  async update(id: string, data: TestRunUpdateInput): Promise<TestRunWithRelations> {
    return this.prisma.testRun.update({
      data: {
        artifactRetentionUntil: data.artifactRetentionUntil,
        duration: data.duration,
        endTime: data.endTime,
        failedCount: data.failedCount,
        // Hybrid Storage fields
        htmlGenerated: data.htmlGenerated,
        htmlGeneratedAt: data.htmlGeneratedAt,
        passedCount: data.passedCount,
        qaseId: data.qaseId,
        reportPath: data.reportPath,
        skippedCount: data.skippedCount,
        status: data.status,
        stderr: data.stderr,
        stdout: data.stdout,
        summary: data.summary,
        testCount: data.testCount,
        totalArtifacts: data.totalArtifacts,
        totalArtifactSize: data.totalArtifactSize,
      },
      include: {
        logs: true,
        mcpAnalyses: true,
        results: true,
      },
      where: { id },
    });
  }

  async updateByRunId(runId: string, data: TestRunUpdateInput): Promise<TestRunWithRelations> {
    const testRun = await this.findByRunId(runId);
    if (!testRun) {
      throw new Error(`TestRun with runId ${runId} not found`);
    }
    return this.update(testRun.id, data);
  }
}
