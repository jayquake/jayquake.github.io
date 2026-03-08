import { describe, expect, it } from 'vitest';

import type { QaseDiffOperation, QaseDryRunResult } from '../../../../shared/types';

import { ApplyGateContract, OperationHasher } from '../OperationHasher';

describe('OperationHasher', () => {
  const hasher = new OperationHasher();

  describe('hashOperation', () => {
    it('should generate deterministic hash for same operation', () => {
      const operation: Omit<QaseDiffOperation, 'operationHash'> = {
        changes: [
          {
            after: 'New Title',
            before: 'Old Title',
            field: 'title',
            reason: 'Title updated',
          },
        ],
        confidence: 0.8,
        operationType: 'update',
        qaseId: 123,
        requiresApproval: false,
      };

      const hash1 = hasher.hashOperation(operation);
      const hash2 = hasher.hashOperation(operation);

      expect(hash1).toBe(hash2);
      expect(hash1).toMatch(/^[a-f0-9]{64}$/); // SHA-256 hex
    });

    it('should generate different hashes for different operations', () => {
      const operation1: Omit<QaseDiffOperation, 'operationHash'> = {
        changes: [
          {
            after: 'New Title',
            before: 'Old Title',
            field: 'title',
            reason: 'Title updated',
          },
        ],
        confidence: 0.8,
        operationType: 'update',
        qaseId: 123,
        requiresApproval: false,
      };

      const operation2: Omit<QaseDiffOperation, 'operationHash'> = {
        changes: [
          {
            after: 'New Title',
            before: 'Old Title',
            field: 'title',
            reason: 'Title updated',
          },
        ],
        confidence: 0.8,
        operationType: 'update',
        qaseId: 456, // Different Qase ID
        requiresApproval: false,
      };

      const hash1 = hasher.hashOperation(operation1);
      const hash2 = hasher.hashOperation(operation2);

      expect(hash1).not.toBe(hash2);
    });

    it('should exclude confidence from hash (not affecting idempotency)', () => {
      const operation1: Omit<QaseDiffOperation, 'operationHash'> = {
        changes: [
          {
            after: 'New',
            before: 'Old',
            field: 'title',
            reason: 'Update',
          },
        ],
        confidence: 0.7,
        operationType: 'update',
        qaseId: 123,
        requiresApproval: true,
      };

      const operation2: Omit<QaseDiffOperation, 'operationHash'> = {
        ...operation1,
        confidence: 0.9, // Different confidence
        requiresApproval: false, // Different approval flag
      };

      const hash1 = hasher.hashOperation(operation1);
      const hash2 = hasher.hashOperation(operation2);

      // Hashes should be the same (confidence/approval don't affect hash)
      expect(hash1).toBe(hash2);
    });

    it('should sort changes deterministically', () => {
      const operation1: Omit<QaseDiffOperation, 'operationHash'> = {
        changes: [
          {
            after: 'B',
            before: 'A',
            field: 'title',
            reason: 'R1',
          },
          {
            after: 'D',
            before: 'C',
            field: 'description',
            reason: 'R2',
          },
        ],
        confidence: 0.8,
        operationType: 'update',
        qaseId: 123,
        requiresApproval: false,
      };

      const operation2: Omit<QaseDiffOperation, 'operationHash'> = {
        ...operation1,
        changes: [
          {
            after: 'D',
            before: 'C',
            field: 'description', // Different order
            reason: 'R2',
          },
          {
            after: 'B',
            before: 'A',
            field: 'title',
            reason: 'R1',
          },
        ],
      };

      const hash1 = hasher.hashOperation(operation1);
      const hash2 = hasher.hashOperation(operation2);

      // Should be the same despite different order
      expect(hash1).toBe(hash2);
    });
  });

  describe('addOperationHash', () => {
    it('should add hash to operation', () => {
      const operation: Omit<QaseDiffOperation, 'operationHash'> = {
        changes: [],
        confidence: 0.8,
        operationType: 'update',
        qaseId: 123,
        requiresApproval: false,
      };

      const withHash = hasher.addOperationHash(operation);

      expect(withHash).toHaveProperty('operationHash');
      expect(withHash.operationHash).toMatch(/^[a-f0-9]{64}$/);
      expect(withHash.qaseId).toBe(123);
    });
  });

  describe('hashDryRun', () => {
    it('should generate deterministic hash for dry-run result', () => {
      const dryRun: Omit<QaseDryRunResult, 'runHash'> = {
        operations: [
          {
            changes: [],
            confidence: 0.8,
            operationHash: 'abc123',
            operationType: 'update',
            qaseId: 123,
            requiresApproval: false,
          },
        ],
        runId: 'test-run-123',
        summary: {
          requiresApproval: 0,
          skipped: 0,
          totalCandidates: 1,
          updates: 1,
        },
        timestamp: '2024-01-01T00:00:00.000Z',
      };

      const hash1 = hasher.hashDryRun(dryRun);
      const hash2 = hasher.hashDryRun(dryRun);

      expect(hash1).toBe(hash2);
      expect(hash1).toMatch(/^[a-f0-9]{64}$/);
    });
  });

  describe('verifyHashStability', () => {
    it('should verify stable hash', () => {
      const operation: Omit<QaseDiffOperation, 'operationHash'> = {
        changes: [],
        confidence: 0.8,
        operationType: 'update',
        qaseId: 123,
        requiresApproval: false,
      };

      const withHash = hasher.addOperationHash(operation);
      const isStable = hasher.verifyHashStability(withHash);

      expect(isStable).toBe(true);
    });

    it('should detect tampered hash', () => {
      const operation: Omit<QaseDiffOperation, 'operationHash'> = {
        changes: [],
        confidence: 0.8,
        operationType: 'update',
        qaseId: 123,
        requiresApproval: false,
      };

      const withHash = hasher.addOperationHash(operation);
      const tamperedHash = { ...withHash, operationHash: 'tampered-hash' };
      const isStable = hasher.verifyHashStability(tamperedHash);

      expect(isStable).toBe(false);
    });
  });
});

describe('ApplyGateContract', () => {
  const hasher = new OperationHasher();
  const gateContract = new ApplyGateContract(hasher);

  describe('validateAndPrepareApply', () => {
    it('should validate matching hashes', () => {
      const operation: Omit<QaseDiffOperation, 'operationHash'> = {
        changes: [],
        confidence: 0.8,
        operationType: 'update',
        qaseId: 123,
        requiresApproval: false,
      };

      const withHash = hasher.addOperationHash(operation);
      const dryRunResult = hasher.addDryRunHash({
        operations: [withHash],
        runId: 'test-123',
        summary: {
          requiresApproval: 0,
          skipped: 0,
          totalCandidates: 1,
          updates: 1,
        },
        timestamp: '2024-01-01T00:00:00.000Z',
      });

      const applyRequest = {
        approvedOperationHashes: [withHash.operationHash],
        runHash: dryRunResult.runHash,
      };

      const result = gateContract.validateAndPrepareApply(applyRequest, dryRunResult);

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.operations).toHaveLength(1);
    });

    it('should reject mismatched run hash', () => {
      const operation = hasher.addOperationHash({
        changes: [],
        confidence: 0.8,
        operationType: 'update',
        qaseId: 123,
        requiresApproval: false,
      });

      const dryRunResult = hasher.addDryRunHash({
        operations: [operation],
        runId: 'test-123',
        summary: {
          requiresApproval: 0,
          skipped: 0,
          totalCandidates: 1,
          updates: 1,
        },
        timestamp: '2024-01-01T00:00:00.000Z',
      });

      const applyRequest = {
        approvedOperationHashes: [operation.operationHash],
        runHash: 'wrong-hash',
      };

      const result = gateContract.validateAndPrepareApply(applyRequest, dryRunResult);

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0]).toContain('Run hash mismatch');
    });

    it('should reject unknown operation hash', () => {
      const operation = hasher.addOperationHash({
        changes: [],
        confidence: 0.8,
        operationType: 'update',
        qaseId: 123,
        requiresApproval: false,
      });

      const dryRunResult = hasher.addDryRunHash({
        operations: [operation],
        runId: 'test-123',
        summary: {
          requiresApproval: 0,
          skipped: 0,
          totalCandidates: 1,
          updates: 1,
        },
        timestamp: '2024-01-01T00:00:00.000Z',
      });

      const applyRequest = {
        approvedOperationHashes: ['unknown-hash-123'],
        runHash: dryRunResult.runHash,
      };

      const result = gateContract.validateAndPrepareApply(applyRequest, dryRunResult);

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0]).toContain('Unknown operation hash');
    });
  });

  describe('isApplyRequestStale', () => {
    it('should detect stale dry-run', () => {
      const oldTimestamp = new Date(Date.now() - 2 * 60 * 60 * 1000); // 2 hours ago
      const dryRunResult: QaseDryRunResult = {
        operations: [],
        runHash: 'hash-123',
        runId: 'test-123',
        summary: {
          requiresApproval: 0,
          skipped: 0,
          totalCandidates: 0,
          updates: 0,
        },
        timestamp: oldTimestamp.toISOString(),
      };

      const isStale = gateContract.isApplyRequestStale(dryRunResult, 60); // 60 min max age

      expect(isStale).toBe(true);
    });

    it('should accept recent dry-run', () => {
      const recentTimestamp = new Date(Date.now() - 5 * 60 * 1000); // 5 minutes ago
      const dryRunResult: QaseDryRunResult = {
        operations: [],
        runHash: 'hash-123',
        runId: 'test-123',
        summary: {
          requiresApproval: 0,
          skipped: 0,
          totalCandidates: 0,
          updates: 0,
        },
        timestamp: recentTimestamp.toISOString(),
      };

      const isStale = gateContract.isApplyRequestStale(dryRunResult, 60);

      expect(isStale).toBe(false);
    });
  });
});
