import { type Environment, type Prisma } from '@prisma/client';

import { BaseRepository } from './BaseRepository';

export type EnvironmentCreateInput = {
  domain: string;
  metadata?: string; // JSON string
  projectId?: string;
  source: 'gcp' | 'github' | 'manual';
}

export type EnvironmentUpdateInput = {
  lastUsed?: Date;
  metadata?: string; // JSON string
  projectId?: string;
  source?: 'gcp' | 'github' | 'manual';
}

/**
 * EnvironmentRepository - Data access for Environment entities
 */
export class EnvironmentRepository extends BaseRepository<Environment, EnvironmentCreateInput, EnvironmentUpdateInput> {
  async count(filters?: { projectId?: string; source?: 'gcp' | 'github' | 'manual' }): Promise<number> {
    const where: Prisma.EnvironmentWhereInput = {};

    if (filters?.projectId) {
      where.projectId = filters.projectId;
    }
    if (filters?.source) {
      where.source = filters.source;
    }

    return this.prisma.environment.count({ where });
  }

  async create(data: EnvironmentCreateInput): Promise<Environment> {
    return this.prisma.environment.create({
      data: {
        domain: data.domain,
        metadata: data.metadata,
        projectId: data.projectId,
        source: data.source,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.environment.delete({
      where: { id },
    });
  }

  async findAll(filters?: {
    orderBy?: Prisma.EnvironmentOrderByWithRelationInput;
    projectId?: string;
    skip?: number;
    source?: 'gcp' | 'github' | 'manual';
    take?: number;
  }): Promise<Environment[]> {
    const where: Prisma.EnvironmentWhereInput = {};

    if (filters?.projectId) {
      where.projectId = filters.projectId;
    }
    if (filters?.source) {
      where.source = filters.source;
    }

    return this.prisma.environment.findMany({
      orderBy: filters?.orderBy || { lastUsed: 'desc' },
      skip: filters?.skip,
      take: filters?.take,
      where,
    });
  }

  async findByDomain(domain: string): Promise<Environment | null> {
    return this.prisma.environment.findUnique({
      where: { domain },
    });
  }

  async findById(id: string): Promise<Environment | null> {
    return this.prisma.environment.findUnique({
      where: { id },
    });
  }

  async getRecentEnvironments(limit = 10): Promise<Environment[]> {
    return this.prisma.environment.findMany({
      orderBy: { lastUsed: 'desc' },
      take: limit,
    });
  }

  async update(id: string, data: EnvironmentUpdateInput): Promise<Environment> {
    return this.prisma.environment.update({
      data: {
        lastUsed: data.lastUsed,
        metadata: data.metadata,
        projectId: data.projectId,
        source: data.source,
      },
      where: { id },
    });
  }

  async updateByDomain(domain: string, data: EnvironmentUpdateInput): Promise<Environment> {
    const env = await this.findByDomain(domain);
    if (!env) {
      throw new Error(`Environment with domain ${domain} not found`);
    }
    return this.update(env.id, data);
  }

  async updateLastUsed(domain: string): Promise<Environment> {
    return this.updateByDomain(domain, { lastUsed: new Date() });
  }
}
