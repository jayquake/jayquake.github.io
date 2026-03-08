import { type Prisma, type TestFile } from '@prisma/client';

import { BaseRepository } from './BaseRepository';

export type TestFileCreateInput = {
  metadata?: string; // JSON string
  path: string;
  projectId: string;
  qaseId?: number;
  qaseSuiteId?: number;
}

export type TestFileUpdateInput = {
  lastRun?: Date;
  metadata?: string; // JSON string
  qaseId?: number;
  qaseSuiteId?: number;
}

/**
 * TestFileRepository - Data access for TestFile entities
 */
export class TestFileRepository extends BaseRepository<TestFile, TestFileCreateInput, TestFileUpdateInput> {
  async count(filters?: { projectId?: string; qaseId?: number }): Promise<number> {
    const where: Prisma.TestFileWhereInput = {};

    if (filters?.projectId) {
      where.projectId = filters.projectId;
    }
    if (filters?.qaseId) {
      where.qaseId = filters.qaseId;
    }

    return this.prisma.testFile.count({ where });
  }

  async create(data: TestFileCreateInput): Promise<TestFile> {
    return this.prisma.testFile.create({
      data: {
        metadata: data.metadata,
        path: data.path,
        projectId: data.projectId,
        qaseId: data.qaseId,
        qaseSuiteId: data.qaseSuiteId,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.testFile.delete({
      where: { id },
    });
  }

  async findAll(filters?: {
    orderBy?: Prisma.TestFileOrderByWithRelationInput;
    projectId?: string;
    qaseId?: number;
    skip?: number;
    take?: number;
  }): Promise<TestFile[]> {
    const where: Prisma.TestFileWhereInput = {};

    if (filters?.projectId) {
      where.projectId = filters.projectId;
    }
    if (filters?.qaseId) {
      where.qaseId = filters.qaseId;
    }

    return this.prisma.testFile.findMany({
      orderBy: filters?.orderBy || { path: 'asc' },
      skip: filters?.skip,
      take: filters?.take,
      where,
    });
  }

  async findById(id: string): Promise<null | TestFile> {
    return this.prisma.testFile.findUnique({
      where: { id },
    });
  }

  async findByPath(path: string): Promise<null | TestFile> {
    return this.prisma.testFile.findUnique({
      where: { path },
    });
  }

  async getFilesByProject(projectId: string): Promise<TestFile[]> {
    return this.findAll({ projectId });
  }

  async update(id: string, data: TestFileUpdateInput): Promise<TestFile> {
    return this.prisma.testFile.update({
      data: {
        lastRun: data.lastRun,
        metadata: data.metadata,
        qaseId: data.qaseId,
        qaseSuiteId: data.qaseSuiteId,
      },
      where: { id },
    });
  }

  async updateByPath(path: string, data: TestFileUpdateInput): Promise<TestFile> {
    const testFile = await this.findByPath(path);
    if (!testFile) {
      throw new Error(`TestFile with path ${path} not found`);
    }
    return this.update(testFile.id, data);
  }
}
