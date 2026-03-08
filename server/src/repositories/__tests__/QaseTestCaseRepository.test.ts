import type { QaseTestCase as PrismaQaseTestCase } from '@prisma/client';
import type { PrismaClient } from '@prisma/client';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createMockPrisma } from '../../__tests__/utils/testHelpers';
import { QaseTestCaseRepository } from '../QaseTestCaseRepository';

describe('QaseTestCaseRepository', () => {
  let repository: QaseTestCaseRepository;
  let prisma: Partial<PrismaClient>;

  beforeEach(() => {
    prisma = createMockPrisma();
    repository = new QaseTestCaseRepository(prisma as any);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new Qase test case', async () => {
      const testCaseData = {
        description: 'Verify login functionality',
        fullData: JSON.stringify({ id: 123, title: 'Test Login Flow' }),
        projectCode: 'ACCESSFLOW',
        qaseId: 123,
        title: 'Test Login Flow',
      };

      const mockCreated: PrismaQaseTestCase = {
        automation: null,
        createdAt: new Date(),
        customFields: null,
        description: 'Verify login functionality',
        fetchCount: 1,
        fullData: JSON.stringify({ id: 123, title: 'Test Login Flow' }),
        id: 'uuid-123',
        isFlaky: null,
        lastFetched: new Date(),
        layer: null,
        priority: null,
        projectCode: 'ACCESSFLOW',
        qaseId: 123,
        severity: null,
        status: null,
        suiteId: null,
        title: 'Test Login Flow',
        updatedAt: new Date(),
      };

      prisma.qaseTestCase.create.mockResolvedValue(mockCreated);

      const result = await repository.create(testCaseData);

      expect(result).toEqual(mockCreated);
      expect(prisma.qaseTestCase.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          projectCode: 'ACCESSFLOW',
          qaseId: 123,
          title: 'Test Login Flow',
        }),
      });
    });
  });

  describe('findByQaseId', () => {
    it('should find a test case by project code and qaseId', async () => {
      const mockTestCase: PrismaQaseTestCase = {
        automation: null,
        createdAt: new Date(),
        customFields: null,
        description: 'Verify login functionality',
        fetchCount: 1,
        fullData: JSON.stringify({ id: 123, title: 'Test Login Flow' }),
        id: 'uuid-123',
        isFlaky: null,
        lastFetched: new Date(),
        layer: null,
        priority: null,
        projectCode: 'ACCESSFLOW',
        qaseId: 123,
        severity: null,
        status: null,
        suiteId: null,
        title: 'Test Login Flow',
        updatedAt: new Date(),
      };

      prisma.qaseTestCase.findUnique.mockResolvedValue(mockTestCase);

      const result = await repository.findByQaseId('ACCESSFLOW', 123);

      expect(result).toEqual(mockTestCase);
      expect(prisma.qaseTestCase.findUnique).toHaveBeenCalledWith({
        where: {
          projectCode_qaseId: {
            projectCode: 'ACCESSFLOW',
            qaseId: 123,
          },
        },
      });
    });

    it('should return null if test case not found', async () => {
      prisma.qaseTestCase.findUnique.mockResolvedValue(null);

      const result = await repository.findByQaseId('ACCESSFLOW', 999);

      expect(result).toBeNull();
    });
  });

  describe('upsert', () => {
    it('should update existing test case and increment fetch count', async () => {
      const existingTestCase: PrismaQaseTestCase = {
        automation: null,
        createdAt: new Date('2024-01-01'),
        customFields: null,
        description: 'Old description',
        fetchCount: 5,
        fullData: JSON.stringify({ id: 123, title: 'Old Title' }),
        id: 'uuid-123',
        isFlaky: null,
        lastFetched: new Date('2024-01-01'),
        layer: null,
        priority: null,
        projectCode: 'ACCESSFLOW',
        qaseId: 123,
        severity: null,
        status: null,
        suiteId: null,
        title: 'Old Title',
        updatedAt: new Date('2024-01-01'),
      };

      const updatedTestCase: PrismaQaseTestCase = {
        ...existingTestCase,
        description: 'Updated description',
        fetchCount: 6,
        fullData: JSON.stringify({ id: 123, title: 'Updated Title' }),
        lastFetched: new Date(),
        title: 'Updated Title',
        updatedAt: new Date(),
      };

      prisma.qaseTestCase.upsert.mockResolvedValue(updatedTestCase);

      const result = await repository.upsert({
        description: 'Updated description',
        fullData: JSON.stringify({ id: 123, title: 'Updated Title' }),
        projectCode: 'ACCESSFLOW',
        qaseId: 123,
        title: 'Updated Title',
      });

      expect(result).toEqual(updatedTestCase);
      expect(prisma.qaseTestCase.upsert).toHaveBeenCalledWith({
        create: expect.objectContaining({
          fetchCount: 1,
          projectCode: 'ACCESSFLOW',
          qaseId: 123,
          title: 'Updated Title',
        }),
        update: expect.objectContaining({
          description: 'Updated description',
          fetchCount: { increment: 1 },
          lastFetched: expect.any(Date),
          title: 'Updated Title',
        }),
        where: {
          projectCode_qaseId: {
            projectCode: 'ACCESSFLOW',
            qaseId: 123,
          },
        },
      });
    });
  });

  describe('findByProjectCode', () => {
    it('should find all test cases for a project', async () => {
      const mockTestCases: PrismaQaseTestCase[] = [
        {
          automation: null,
          createdAt: new Date(),
          customFields: null,
          description: null,
          fetchCount: 1,
          fullData: '{}',
          id: 'uuid-1',
          isFlaky: null,
          lastFetched: new Date(),
          layer: null,
          priority: null,
          projectCode: 'ACCESSFLOW',
          qaseId: 123,
          severity: null,
          status: null,
          suiteId: null,
          title: 'Test 1',
          updatedAt: new Date(),
        },
        {
          automation: null,
          createdAt: new Date(),
          customFields: null,
          description: null,
          fetchCount: 1,
          fullData: '{}',
          id: 'uuid-2',
          isFlaky: null,
          lastFetched: new Date(),
          layer: null,
          priority: null,
          projectCode: 'ACCESSFLOW',
          qaseId: 456,
          severity: null,
          status: null,
          suiteId: null,
          title: 'Test 2',
          updatedAt: new Date(),
        },
      ];

      prisma.qaseTestCase.findMany.mockResolvedValue(mockTestCases);

      const result = await repository.findByProjectCode('ACCESSFLOW');

      expect(result).toHaveLength(2);
      expect(result).toEqual(mockTestCases);
      expect(prisma.qaseTestCase.findMany).toHaveBeenCalledWith({
        where: { projectCode: 'ACCESSFLOW' },
      });
    });
  });

  describe('deleteStale', () => {
    it('should delete test cases older than specified days', async () => {
      const mockDeleteResult = { count: 5 };
      prisma.qaseTestCase.deleteMany.mockResolvedValue(mockDeleteResult);

      const result = await repository.deleteStale('ACCESSFLOW', 30);

      expect(result).toBe(5);
      expect(prisma.qaseTestCase.deleteMany).toHaveBeenCalledWith({
        where: {
          lastFetched: {
            lt: expect.any(Date),
          },
          projectCode: 'ACCESSFLOW',
        },
      });
    });
  });
});
