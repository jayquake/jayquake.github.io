/**
 * QaseTestCaseRepository
 *
 * Data access layer for Qase test cases with DB persistence
 * Implements Repository Pattern for clean architecture
 */

import type { PrismaClient, QaseTestCase } from '@prisma/client';

export type CreateQaseTestCaseInput = {
  automation?: null | number;
  customFields?: null | string;
  description?: null | string;
  fullData: string;
  isFlaky?: null | number;
  layer?: null | number;
  priority?: null | number;
  projectCode: string;
  qaseId: number;
  severity?: null | number;
  status?: null | number;
  suiteId?: null | number;
  title: string;
}

export class QaseTestCaseRepository {
  constructor(private prisma: PrismaClient) {}

  /**
   * Batch upsert multiple test cases efficiently
   */
  async batchUpsert(testCases: CreateQaseTestCaseInput[]): Promise<number> {
    let upserted = 0;

    // Process in batches of 50 to avoid overwhelming the DB
    const batchSize = 50;
    for (let i = 0; i < testCases.length; i += batchSize) {
      const batch = testCases.slice(i, i + batchSize);

      await Promise.all(
        batch.map(async (testCase) => {
          await this.upsert(testCase);
          upserted++;
        }),
      );
    }

    return upserted;
  }

  /**
   * Get count of test cases for a project
   */
  async count(projectCode: string): Promise<number> {
    return this.prisma.qaseTestCase.count({
      where: { projectCode },
    });
  }

  /**
   * Create a new Qase test case
   */
  async create(data: CreateQaseTestCaseInput): Promise<QaseTestCase> {
    return this.prisma.qaseTestCase.create({
      data: {
        automation: data.automation,
        customFields: data.customFields,
        description: data.description,
        fetchCount: 1,
        fullData: data.fullData,
        isFlaky: data.isFlaky,
        layer: data.layer,
        priority: data.priority,
        projectCode: data.projectCode,
        qaseId: data.qaseId,
        severity: data.severity,
        status: data.status,
        suiteId: data.suiteId,
        title: data.title,
      },
    });
  }

  /**
   * Delete stale test cases older than specified days
   * @returns Number of deleted records
   */
  async deleteStale(projectCode: string, daysOld: number): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    const result = await this.prisma.qaseTestCase.deleteMany({
      where: {
        lastFetched: {
          lt: cutoffDate,
        },
        projectCode,
      },
    });

    return result.count;
  }

  /**
   * Find all test cases for a project
   */
  async findByProjectCode(projectCode: string): Promise<QaseTestCase[]> {
    return this.prisma.qaseTestCase.findMany({
      where: { projectCode },
    });
  }

  /**
   * Find a test case by project code and Qase ID
   */
  async findByQaseId(projectCode: string, qaseId: number): Promise<null | QaseTestCase> {
    return this.prisma.qaseTestCase.findUnique({
      where: {
        projectCode_qaseId: {
          projectCode,
          qaseId,
        },
      },
    });
  }

  /**
   * Find multiple test cases by their Qase IDs
   */
  async findManyByQaseIds(projectCode: string, qaseIds: number[]): Promise<QaseTestCase[]> {
    return this.prisma.qaseTestCase.findMany({
      where: {
        projectCode,
        qaseId: {
          in: qaseIds,
        },
      },
    });
  }

  /**
   * Upsert (create or update) a test case
   * Automatically increments fetch count on update
   */
  async upsert(data: CreateQaseTestCaseInput): Promise<QaseTestCase> {
    return this.prisma.qaseTestCase.upsert({
      create: {
        automation: data.automation,
        customFields: data.customFields,
        description: data.description,
        fetchCount: 1,
        fullData: data.fullData,
        isFlaky: data.isFlaky,
        layer: data.layer,
        priority: data.priority,
        projectCode: data.projectCode,
        qaseId: data.qaseId,
        severity: data.severity,
        status: data.status,
        suiteId: data.suiteId,
        title: data.title,
      },
      update: {
        automation: data.automation,
        customFields: data.customFields,
        description: data.description,
        fetchCount: {
          increment: 1,
        },
        fullData: data.fullData,
        isFlaky: data.isFlaky,
        lastFetched: new Date(),
        layer: data.layer,
        priority: data.priority,
        severity: data.severity,
        status: data.status,
        suiteId: data.suiteId,
        title: data.title,
      },
      where: {
        projectCode_qaseId: {
          projectCode: data.projectCode,
          qaseId: data.qaseId,
        },
      },
    });
  }
}
