import { type Prisma, type PrismaClient, type TestArtifact } from '@prisma/client';

import { BaseRepository } from './BaseRepository';

export type ArtifactStats = {
  byType: {
    [key: string]: {
      count: number;
      size: number;
    };
  };
  totalCount: number;
  totalSize: number;
}

export type TestArtifactCreateInput = {
  contentType?: string;
  filename: string;
  metadata?: string; // JSON string
  path: string;
  retentionPolicy?: string;
  size?: number;
  testResultId?: string;
  testRunId: string;
  type: 'log' | 'screenshot' | 'trace' | 'video';
}

export type TestArtifactUpdateInput = {
  lastAccessed?: Date;
  markedForDeletion?: boolean;
  retentionPolicy?: string;
}

/**
 * Repository for managing TestArtifact entities (videos, screenshots, traces)
 * Part of the Hybrid Storage Architecture
 */
export class TestArtifactRepository extends BaseRepository<
  TestArtifact,
  TestArtifactCreateInput,
  TestArtifactUpdateInput
> {
  constructor(prisma?: PrismaClient) {
    super(prisma);
  }

  async create(data: TestArtifactCreateInput): Promise<TestArtifact> {
    console.log(`[TestArtifactRepository] Creating artifact: ${data.type} - ${data.filename}`);
    return this.prisma.testArtifact.create({
      data: {
        contentType: data.contentType,
        filename: data.filename,
        metadata: data.metadata,
        path: data.path,
        retentionPolicy: data.retentionPolicy,
        size: data.size,
        testResultId: data.testResultId,
        testRunId: data.testRunId,
        type: data.type,
      },
    });
  }

  /**
   * Bulk create artifacts
   */
  async createMany(artifacts: TestArtifactCreateInput[]): Promise<number> {
    const result = await this.prisma.testArtifact.createMany({
      data: artifacts.map((artifact) => ({
        contentType: artifact.contentType,
        filename: artifact.filename,
        metadata: artifact.metadata,
        path: artifact.path,
        retentionPolicy: artifact.retentionPolicy,
        size: artifact.size,
        testResultId: artifact.testResultId,
        testRunId: artifact.testRunId,
        type: artifact.type,
      })),
    });
    console.log(`[TestArtifactRepository] Bulk created ${result.count} artifacts`);
    return result.count;
  }

  async delete(id: string): Promise<TestArtifact> {
    console.log(`[TestArtifactRepository] Deleting artifact: ${id}`);
    return this.prisma.testArtifact.delete({
      where: { id },
    });
  }

  /**
   * Delete marked artifacts
   */
  async deleteMarked(): Promise<number> {
    const result = await this.prisma.testArtifact.deleteMany({
      where: {
        markedForDeletion: true,
      },
    });
    return result.count;
  }

  async findAll(filter?: Prisma.TestArtifactWhereInput): Promise<TestArtifact[]> {
    return this.prisma.testArtifact.findMany({
      orderBy: { createdAt: 'desc' },
      where: filter,
    });
  }

  async findById(id: string): Promise<null | TestArtifact> {
    return this.prisma.testArtifact.findUnique({
      where: { id },
    });
  }

  /**
   * Get artifacts by test result
   */
  async findByTestResult(testResultId: string): Promise<TestArtifact[]> {
    return this.prisma.testArtifact.findMany({
      orderBy: { createdAt: 'asc' },
      where: { testResultId },
    });
  }

  /**
   * Get artifacts by test run
   */
  async findByTestRun(testRunId: string): Promise<TestArtifact[]> {
    return this.prisma.testArtifact.findMany({
      orderBy: { createdAt: 'asc' },
      where: { testRunId },
    });
  }

  /**
   * Get artifacts by type
   */
  async findByType(type: string): Promise<TestArtifact[]> {
    return this.prisma.testArtifact.findMany({
      orderBy: { createdAt: 'desc' },
      where: { type },
    });
  }

  /**
   * Find old artifacts that can be cleaned up
   */
  async findOldArtifacts(type: string, cutoffDate: Date): Promise<TestArtifact[]> {
    return this.prisma.testArtifact.findMany({
      include: {
        testResult: {
          select: {
            status: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
      where: {
        createdAt: {
          lt: cutoffDate,
        },
        markedForDeletion: false,
        type,
      },
    });
  }

  /**
   * Get artifact statistics
   */
  async getStats(): Promise<ArtifactStats> {
    const artifacts = await this.prisma.testArtifact.findMany({
      select: {
        size: true,
        type: true,
      },
    });

    const stats: ArtifactStats = {
      byType: {},
      totalCount: artifacts.length,
      totalSize: 0,
    };

    for (const artifact of artifacts) {
      const size = artifact.size || 0;
      stats.totalSize += size;

      if (!stats.byType[artifact.type]) {
        stats.byType[artifact.type] = {
          count: 0,
          size: 0,
        };
      }

      stats.byType[artifact.type].count++;
      stats.byType[artifact.type].size += size;
    }

    return stats;
  }

  /**
   * Get artifact statistics for a specific test run
   */
  async getStatsForRun(testRunId: string): Promise<ArtifactStats> {
    const artifacts = await this.prisma.testArtifact.findMany({
      select: {
        size: true,
        type: true,
      },
      where: { testRunId },
    });

    const stats: ArtifactStats = {
      byType: {},
      totalCount: artifacts.length,
      totalSize: 0,
    };

    for (const artifact of artifacts) {
      const size = artifact.size || 0;
      stats.totalSize += size;

      if (!stats.byType[artifact.type]) {
        stats.byType[artifact.type] = {
          count: 0,
          size: 0,
        };
      }

      stats.byType[artifact.type].count++;
      stats.byType[artifact.type].size += size;
    }

    return stats;
  }

  /**
   * Mark artifacts for deletion
   */
  async markForDeletion(ids: string[]): Promise<number> {
    const result = await this.prisma.testArtifact.updateMany({
      data: {
        markedForDeletion: true,
      },
      where: {
        id: { in: ids },
      },
    });
    return result.count;
  }

  async update(id: string, data: TestArtifactUpdateInput): Promise<TestArtifact> {
    return this.prisma.testArtifact.update({
      data,
      where: { id },
    });
  }

  /**
   * Update last accessed timestamp
   */
  async updateLastAccessed(id: string): Promise<void> {
    await this.prisma.testArtifact.update({
      data: {
        lastAccessed: new Date(),
      },
      where: { id },
    });
  }
}
