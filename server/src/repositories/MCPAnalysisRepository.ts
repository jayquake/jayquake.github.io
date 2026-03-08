import { type MCPAnalysis, type Prisma } from '@prisma/client';

import { BaseRepository } from './BaseRepository';

export type MCPAnalysisCreateInput = {
  analysisData: string; // JSON string
  confidence: number;
  elementInfo: string; // JSON string
  error?: string;
  navigationContext?: string; // JSON string
  qaseId?: number;
  screenshotPath?: string;
  selector: string;
  suggestedSelectors: string; // JSON array
  testResultId?: string;
  testRunId?: string;
  ruleId?: string;
  ruleType?: string;
  tracePath?: string;
}

export type MCPAnalysisUpdateInput = {
  analysisData?: string; // JSON string
  confidence?: number;
  elementInfo?: string; // JSON string
  error?: string;
  navigationContext?: string; // JSON string
  screenshotPath?: string;
  selector?: string;
  ruleId?: string;
  ruleType?: string;
  suggestedSelectors?: string; // JSON array
  tracePath?: string;
}

export type MCPAnalysisWithArtifacts = MCPAnalysis & {
  artifacts?: any[];
};

/**
 * MCPAnalysisRepository - Data access for MCPAnalysis entities
 */
export class MCPAnalysisRepository extends BaseRepository<
  MCPAnalysisWithArtifacts,
  MCPAnalysisCreateInput,
  MCPAnalysisUpdateInput
> {
  constructor(prisma?: PrismaClient) {
    super(prisma);
  }
  async count(filters?: { qaseId?: number; testResultId?: string; testRunId?: string; }): Promise<number> {
    const where: Prisma.MCPAnalysisWhereInput = {};

    if (filters?.testRunId) {
      where.testRunId = filters.testRunId;
    }
    if (filters?.testResultId) {
      where.testResultId = filters.testResultId;
    }
    if (filters?.qaseId) {
      where.qaseId = filters.qaseId;
    }

    return this.prisma.mCPAnalysis.count({ where });
  }

  async create(data: MCPAnalysisCreateInput): Promise<MCPAnalysisWithArtifacts> {
    return this.prisma.mCPAnalysis.create({
      data: {
        analysisData: data.analysisData,
        confidence: data.confidence,
        elementInfo: data.elementInfo,
        error: data.error,
        navigationContext: data.navigationContext,
        qaseId: data.qaseId,
        ruleId: data.ruleId,
        ruleType: data.ruleType,
        screenshotPath: data.screenshotPath,
        selector: data.selector,
        suggestedSelectors: data.suggestedSelectors,
        testResultId: data.testResultId,
        testRunId: data.testRunId,
        tracePath: data.tracePath,
      },
      include: {
        artifacts: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.mCPAnalysis.delete({
      where: { id },
    });
  }

  async deleteByTestRun(testRunId: string): Promise<number> {
    const result = await this.prisma.mCPAnalysis.deleteMany({
      where: { testRunId },
    });
    return result.count;
  }

  async findAll(filters?: {
    orderBy?: Prisma.MCPAnalysisOrderByWithRelationInput;
    qaseId?: number;
    skip?: number;
    take?: number;
    testResultId?: string;
    testRunId?: string;
  }): Promise<MCPAnalysisWithArtifacts[]> {
    const where: Prisma.MCPAnalysisWhereInput = {};

    if (filters?.testRunId) {
      where.testRunId = filters.testRunId;
    }
    if (filters?.testResultId) {
      where.testResultId = filters.testResultId;
    }
    if (filters?.qaseId) {
      where.qaseId = filters.qaseId;
    }

    return this.prisma.mCPAnalysis.findMany({
      include: {
        artifacts: true,
      },
      orderBy: filters?.orderBy || { createdAt: 'desc' },
      skip: filters?.skip,
      take: filters?.take,
      where,
    });
  }

  async findById(id: string): Promise<MCPAnalysisWithArtifacts | null> {
    return this.prisma.mCPAnalysis.findUnique({
      include: {
        artifacts: true,
      },
      where: { id },
    });
  }

  async getByTestResult(testResultId: string): Promise<MCPAnalysisWithArtifacts[]> {
    return this.findAll({ testResultId });
  }

  async getByTestRun(testRunId: string): Promise<MCPAnalysisWithArtifacts[]> {
    return this.findAll({ testRunId });
  }

  async getWithArtifacts(id: string): Promise<MCPAnalysisWithArtifacts | null> {
    return this.findById(id);
  }

  async update(id: string, data: MCPAnalysisUpdateInput): Promise<MCPAnalysisWithArtifacts> {
    return this.prisma.mCPAnalysis.update({
      data: {
        analysisData: data.analysisData,
        confidence: data.confidence,
        elementInfo: data.elementInfo,
        error: data.error,
        navigationContext: data.navigationContext,
        ruleId: data.ruleId,
        ruleType: data.ruleType,
        screenshotPath: data.screenshotPath,
        selector: data.selector,
        suggestedSelectors: data.suggestedSelectors,
        tracePath: data.tracePath,
      },
      include: {
        artifacts: true,
      },
      where: { id },
    });
  }
}
