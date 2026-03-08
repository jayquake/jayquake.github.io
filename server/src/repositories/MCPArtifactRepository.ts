import { type MCPArtifact, type Prisma, type PrismaClient } from '@prisma/client';

import { BaseRepository } from './BaseRepository';

export type MCPArtifactCreateInput = {
  analysisId: string;
  contentType?: string;
  metadata?: string; // JSON string
  path: string;
  size?: number;
  type: 'data' | 'log' | 'screenshot' | 'trace' | 'video';
}

export type MCPArtifactUpdateInput = {
  contentType?: string;
  metadata?: string; // JSON string
  path?: string;
  size?: number;
  type?: 'data' | 'log' | 'screenshot' | 'trace' | 'video';
}

/**
 * MCPArtifactRepository - Data access for MCPArtifact entities
 */
export class MCPArtifactRepository extends BaseRepository<MCPArtifact, MCPArtifactCreateInput, MCPArtifactUpdateInput> {
  constructor(prisma?: PrismaClient) {
    super(prisma);
  }
  async count(filters?: {
    analysisId?: string;
    type?: 'data' | 'log' | 'screenshot' | 'trace' | 'video';
  }): Promise<number> {
    const where: Prisma.MCPArtifactWhereInput = {};

    if (filters?.analysisId) {
      where.analysisId = filters.analysisId;
    }
    if (filters?.type) {
      where.type = filters.type;
    }

    return this.prisma.mCPArtifact.count({ where });
  }

  async create(data: MCPArtifactCreateInput): Promise<MCPArtifact> {
    return this.prisma.mCPArtifact.create({
      data: {
        analysisId: data.analysisId,
        contentType: data.contentType,
        metadata: data.metadata,
        path: data.path,
        size: data.size,
        type: data.type,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.mCPArtifact.delete({
      where: { id },
    });
  }

  async findAll(filters?: {
    analysisId?: string;
    orderBy?: Prisma.MCPArtifactOrderByWithRelationInput;
    skip?: number;
    take?: number;
    type?: 'data' | 'log' | 'screenshot' | 'trace' | 'video';
  }): Promise<MCPArtifact[]> {
    const where: Prisma.MCPArtifactWhereInput = {};

    if (filters?.analysisId) {
      where.analysisId = filters.analysisId;
    }
    if (filters?.type) {
      where.type = filters.type;
    }

    return this.prisma.mCPArtifact.findMany({
      orderBy: filters?.orderBy || { createdAt: 'desc' },
      skip: filters?.skip,
      take: filters?.take,
      where,
    });
  }

  async findById(id: string): Promise<MCPArtifact | null> {
    return this.prisma.mCPArtifact.findUnique({
      where: { id },
    });
  }

  async getByAnalysis(analysisId: string): Promise<MCPArtifact[]> {
    return this.findAll({ analysisId });
  }

  async getByType(type: 'data' | 'log' | 'screenshot' | 'trace' | 'video'): Promise<MCPArtifact[]> {
    return this.findAll({ type });
  }

  async getScreenshots(analysisId: string): Promise<MCPArtifact[]> {
    return this.findAll({ analysisId, type: 'screenshot' });
  }

  async getTraces(analysisId: string): Promise<MCPArtifact[]> {
    return this.findAll({ analysisId, type: 'trace' });
  }

  async update(id: string, data: MCPArtifactUpdateInput): Promise<MCPArtifact> {
    return this.prisma.mCPArtifact.update({
      data: {
        contentType: data.contentType,
        metadata: data.metadata,
        path: data.path,
        size: data.size,
        type: data.type,
      },
      where: { id },
    });
  }
}
