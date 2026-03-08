import * as crypto from 'crypto';

import type {
  QaseApplyRequest,
  QaseDiffOperation,
  QaseDryRunResult,
} from '../../../shared/types';

/**
 * ApplyGateContract
 * 
 * Enforces contract validation for apply operations.
 * Ensures only approved, valid operations are executed.
 */
export class ApplyGateContract {
  private hasher: OperationHasher;

  constructor(hasher?: OperationHasher) {
    this.hasher = hasher || new OperationHasher();
  }

  /**
   * Check if apply request is stale (dry-run result is too old)
   * 
   * @param dryRunResult - Dry-run result
   * @param maxAgeMinutes - Maximum age in minutes (default 60)
   * @returns True if stale
   */
  isApplyRequestStale(dryRunResult: QaseDryRunResult, maxAgeMinutes = 60): boolean {
    const dryRunTimestamp = new Date(dryRunResult.timestamp);
    const ageMinutes = (Date.now() - dryRunTimestamp.getTime()) / (1000 * 60);
    return ageMinutes > maxAgeMinutes;
  }

  /**
   * Reject stale or invalid hashes
   * 
   * @param applyRequest - Apply request
   * @param dryRunResult - Dry-run result
   * @param maxAgeMinutes - Maximum age in minutes
   * @returns Rejection result with reason
   */
  rejectIfInvalid(
    applyRequest: QaseApplyRequest,
    dryRunResult: QaseDryRunResult,
    maxAgeMinutes = 60,
  ): { reason?: string; rejected: boolean; } {
    // Check staleness
    if (this.isApplyRequestStale(dryRunResult, maxAgeMinutes)) {
      return {
        reason: `Dry-run result is stale (older than ${maxAgeMinutes} minutes)`,
        rejected: true,
      };
    }

    // Validate hashes
    const validation = this.hasher.validateApplyRequest(applyRequest, dryRunResult);
    if (!validation.valid) {
      return {
        reason: validation.errors.join('; '),
        rejected: true,
      };
    }

    return { rejected: false };
  }

  /**
   * Validate and prepare operations for apply
   * 
   * @param applyRequest - Apply request with approved hashes
   * @param dryRunResult - Original dry-run result
   * @returns Object with validated operations and validation result
   */
  validateAndPrepareApply(
    applyRequest: QaseApplyRequest,
    dryRunResult: QaseDryRunResult,
  ): {
    errors: string[];
    operations: QaseDiffOperation[];
    valid: boolean;
  } {
    // Validate apply request
    const validation = this.hasher.validateApplyRequest(applyRequest, dryRunResult);

    if (!validation.valid) {
      return {
        errors: validation.errors,
        operations: [],
        valid: false,
      };
    }

    // Filter approved operations
    const approvedOperations = this.hasher.filterApprovedOperations(
      dryRunResult.operations,
      applyRequest.approvedOperationHashes,
    );

    return {
      errors: [],
      operations: approvedOperations,
      valid: true,
    };
  }
}

/**
 * OperationHasher
 * 
 * Generates deterministic SHA-256 hashes for Qase diff operations and dry-run results.
 * 
 * Key responsibilities:
 * - Hash individual diff operations for idempotent apply
 * - Hash entire dry-run results for validation
 * - Validate apply requests against dry-run hashes
 * - Ensure hash stability across runs (deterministic ordering)
 */
export class OperationHasher {
  /**
   * Add run hash to a dry-run result
   * 
   * @param dryRunResult - Dry-run result without runHash
   * @returns Complete dry-run result with runHash
   */
  addDryRunHash(dryRunResult: Omit<QaseDryRunResult, 'runHash'>): QaseDryRunResult {
    const hash = this.hashDryRun(dryRunResult);
    return {
      ...dryRunResult,
      runHash: hash,
    };
  }

  /**
   * Add operation hash to a diff operation
   * 
   * @param operation - Diff operation without hash
   * @returns Complete diff operation with hash
   */
  addOperationHash(operation: Omit<QaseDiffOperation, 'operationHash'>): QaseDiffOperation {
    const hash = this.hashOperation(operation);
    return {
      ...operation,
      operationHash: hash,
    };
  }

  /**
   * Batch add hashes to multiple operations
   * 
   * @param operations - Array of diff operations without hashes
   * @returns Array of complete diff operations with hashes
   */
  batchAddOperationHashes(
    operations: Omit<QaseDiffOperation, 'operationHash'>[],
  ): QaseDiffOperation[] {
    return operations.map((op) => this.addOperationHash(op));
  }

  /**
   * Filter operations by approved hashes
   * 
   * @param operations - All operations from dry-run
   * @param approvedHashes - Array of approved operation hashes
   * @returns Filtered array of approved operations
   */
  filterApprovedOperations(
    operations: QaseDiffOperation[],
    approvedHashes: string[],
  ): QaseDiffOperation[] {
    const approvedSet = new Set(approvedHashes);
    return operations.filter((op) => approvedSet.has(op.operationHash));
  }

  /**
   * Generate hash for an entire dry-run result
   * 
   * Hash includes:
   * - Run ID
   * - Timestamp
   * - All operation hashes (sorted)
   * 
   * @param dryRunResult - Dry-run result without runHash
   * @returns SHA-256 hash string
   */
  hashDryRun(dryRunResult: Omit<QaseDryRunResult, 'runHash'>): string {
    // Extract sorted operation hashes
    const operationHashes = dryRunResult.operations
      .map((op) => op.operationHash)
      .sort();

    // Build deterministic payload
    const payload = {
      operationHashes,
      runId: dryRunResult.runId,
      timestamp: dryRunResult.timestamp,
    };

    // Stringify with sorted keys for determinism
    const json = this.deterministicStringify(payload);

    // Generate SHA-256 hash
    return crypto.createHash('sha256').update(json).digest('hex');
  }

  /**
   * Generate SHA-256 hash for a diff operation
   * 
   * Hash includes:
   * - Operation type
   * - Qase ID
   * - All field changes (field, before, after)
   * - Metadata (source file, MCP context)
   * 
   * Note: Confidence score and requiresApproval are NOT included in the hash
   * to allow for confidence threshold adjustments without invalidating hashes.
   * 
   * @param operation - Diff operation without hash
   * @returns SHA-256 hash string
   */
  hashOperation(operation: Omit<QaseDiffOperation, 'operationHash'>): string {
    // Build deterministic payload
    const payload = {
      changes: this.sortChanges(operation.changes),
      metadata: this.normalizeMetadata(operation.metadata),
      operationType: operation.operationType,
      qaseId: operation.qaseId,
    };

    // Stringify with sorted keys for determinism
    const json = this.deterministicStringify(payload);

    // Generate SHA-256 hash
    return crypto.createHash('sha256').update(json).digest('hex');
  }

  /**
   * Validate an apply request against a dry-run result
   * 
   * Checks:
   * 1. Run hash matches
   * 2. All approved operation hashes exist in the dry-run
   * 3. No unknown operation hashes are included
   * 
   * @param applyRequest - Apply request with hashes
   * @param dryRunResult - Original dry-run result
   * @returns Validation result with error messages
   */
  validateApplyRequest(
    applyRequest: QaseApplyRequest,
    dryRunResult: QaseDryRunResult,
  ): { errors: string[]; valid: boolean; } {
    const errors: string[] = [];

    // Check 1: Run hash matches
    if (applyRequest.runHash !== dryRunResult.runHash) {
      errors.push(
        `Run hash mismatch: expected ${dryRunResult.runHash}, got ${applyRequest.runHash}`,
      );
    }

    // Check 2 & 3: Validate approved operation hashes
    const dryRunHashes = new Set(dryRunResult.operations.map((op) => op.operationHash));

    for (const approvedHash of applyRequest.approvedOperationHashes) {
      if (!dryRunHashes.has(approvedHash)) {
        errors.push(`Unknown operation hash: ${approvedHash}`);
      }
    }

    return {
      errors,
      valid: errors.length === 0,
    };
  }

  /**
   * Verify hash stability by re-hashing
   * 
   * Useful for testing and debugging hash consistency.
   * 
   * @param operation - Complete diff operation with hash
   * @returns True if hash is stable (re-hash matches original)
   */
  verifyHashStability(operation: QaseDiffOperation): boolean {
    const { operationHash, ...operationWithoutHash } = operation;
    const recomputedHash = this.hashOperation(operationWithoutHash);
    return recomputedHash === operationHash;
  }

  /**
   * Deterministic JSON stringify with sorted keys
   * 
   * @param obj - Object to stringify
   * @returns JSON string with sorted keys
   */
  private deterministicStringify(obj: any): string {
    // Sort keys recursively
    const sortKeys = (value: any): any => {
      if (value === null || value === undefined) {
        return value;
      }

      if (Array.isArray(value)) {
        return value.map(sortKeys);
      }

      if (typeof value === 'object') {
        const sorted: Record<string, any> = {};
        for (const key of Object.keys(value).sort()) {
          sorted[key] = sortKeys(value[key]);
        }
        return sorted;
      }

      return value;
    };

    const sorted = sortKeys(obj);
    return JSON.stringify(sorted);
  }

  /**
   * Normalize metadata for deterministic hashing
   * 
   * @param metadata - Operation metadata
   * @returns Normalized metadata (omits undefined fields)
   */
  private normalizeMetadata(
    metadata?: QaseDiffOperation['metadata'],
  ): Record<string, any> {
    if (!metadata) {
      return {};
    }

    const normalized: Record<string, any> = {};

    if (metadata.sourceFile) {
      normalized.sourceFile = metadata.sourceFile;
    }

    if (metadata.mcpContext) {
      normalized.mcpContext = {};
      if (metadata.mcpContext.sourceUrl) {
        normalized.mcpContext.sourceUrl = metadata.mcpContext.sourceUrl;
      }
      if (metadata.mcpContext.screenshotHash) {
        normalized.mcpContext.screenshotHash = metadata.mcpContext.screenshotHash;
      }
    }

    return normalized;
  }

  /**
   * Sort changes array deterministically
   * 
   * @param changes - Array of field changes
   * @returns Sorted array of field changes
   */
  private sortChanges(
    changes: QaseDiffOperation['changes'],
  ): QaseDiffOperation['changes'] {
    return [...changes].sort((a, b) => {
      // Sort by field name first
      if (a.field !== b.field) {
        return a.field.localeCompare(b.field);
      }
      // Then by reason
      return a.reason.localeCompare(b.reason);
    });
  }
}

// Export singleton instances
export const operationHasher = new OperationHasher();
export const applyGateContract = new ApplyGateContract(operationHasher);
