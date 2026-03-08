import type {
  FlowStep,
  IntentObject,
  QaseDiffOperation,
  QaseSyncCandidate,
  QaseTestCasePayload,
} from '../../../shared/types';
import type { QaseConfig } from '../../../shared/types';

import { intentMapper } from './IntentNormalizationMapper';
import { QaseService, type QaseTestCase } from './QaseService';

/**
 * Field comparison result
 */
type FieldChange = {
  after: any;
  before: any;
  field: 'automation' | 'description' | 'preconditions' | 'status' | 'steps' | 'title';
  reason: string;
}

/**
 * QaseSyncService
 * 
 * Orchestrates Qase test case synchronization with dry-run and apply capabilities.
 * 
 * Phase 1A: Implements dry-run diff engine for updates only.
 * - Compare and diff: status, automation, steps, preconditions, description
 * - No create operations in Phase 1A
 * 
 * Key responsibilities:
 * - Generate sync candidates from intent objects and Qase test cases
 * - Compute diffs between current and desired state
 * - Assign confidence scores and determine if approval is required
 * - Prepare operation hashes for idempotent apply (Step 5)
 */
export class QaseSyncService {
  /**
   * Confidence threshold for auto-approval
   * Operations with confidence below this require manual approval
   */
  private readonly CONFIDENCE_THRESHOLD = 0.7;

  private qaseService: QaseService;

  constructor(qaseService?: QaseService) {
    this.qaseService = qaseService || new QaseService();
  }

  /**
   * Apply approved operations to Qase
   * 
   * Executes updates for operations that have been approved via their operation hashes.
   * Tracks success/failure per operation and generates detailed result summary.
   * 
   * Phase 1B: Implements actual Qase API update execution
   * 
   * @param operations - Operations to apply (with hashes)
   * @param qaseConfig - Qase configuration
   * @returns Apply result with success/failure tracking
   */
  async applyOperations(
    operations: QaseDiffOperation[],
    qaseConfig: QaseConfig,
  ): Promise<{
    appliedOperations: {
      error?: string;
      operationHash: string;
      qaseId: number;
      status: 'failed' | 'skipped' | 'success';
    }[];
    success: boolean;
    summary: {
      failed: number;
      skipped: number;
      succeeded: number;
      total: number;
    };
  }> {
    const appliedOperations: {
      error?: string;
      operationHash: string;
      qaseId: number;
      status: 'failed' | 'skipped' | 'success';
    }[] = [];

    console.log(`[QaseSyncService] Applying ${operations.length} operations`);

    // Apply operations sequentially to respect rate limits
    for (const operation of operations) {
      try {
        // Build update payload from changes
        const payload: {
          automation?: number;
          description?: string;
          preconditions?: string;
          status?: number;
          steps?: {
            action: string;
            expected_result: string;
          }[];
          title?: string;
        } = {};

        // Map changes to payload fields
        for (const change of operation.changes) {
          if (change.field === 'title') {
            payload.title = change.after;
          } else if (change.field === 'description') {
            payload.description = change.after;
          } else if (change.field === 'preconditions') {
            payload.preconditions = change.after;
          } else if (change.field === 'status') {
            payload.status = change.after;
          } else if (change.field === 'automation') {
            payload.automation = change.after;
          } else if (change.field === 'steps') {
            payload.steps = change.after;
          }
        }

        // Execute update via QaseService (includes retry logic and rate limiting)
        const result = await this.qaseService.updateTestCase(
          qaseConfig,
          operation.qaseId,
          payload,
        );

        if (result) {
          appliedOperations.push({
            operationHash: operation.operationHash,
            qaseId: operation.qaseId,
            status: 'success',
          });
          console.log(`[QaseSyncService] ✅ Successfully applied operation ${operation.operationHash} to case ${operation.qaseId}`);
        } else {
          appliedOperations.push({
            error: 'Update returned null (configuration or API error)',
            operationHash: operation.operationHash,
            qaseId: operation.qaseId,
            status: 'failed',
          });
          console.error(`[QaseSyncService] ❌ Failed to apply operation ${operation.operationHash} to case ${operation.qaseId}`);
        }
      } catch (error: any) {
        appliedOperations.push({
          error: error.message || 'Unknown error',
          operationHash: operation.operationHash,
          qaseId: operation.qaseId,
          status: 'failed',
        });
        console.error(
          `[QaseSyncService] ❌ Error applying operation ${operation.operationHash} to case ${operation.qaseId}: ${error.message}`,
        );
      }
    }

    // Calculate summary
    const summary = {
      failed: appliedOperations.filter((op) => op.status === 'failed').length,
      skipped: appliedOperations.filter((op) => op.status === 'skipped').length,
      succeeded: appliedOperations.filter((op) => op.status === 'success').length,
      total: appliedOperations.length,
    };

    const success = summary.failed === 0;

    console.log(
      `[QaseSyncService] Apply completed: ${summary.succeeded} succeeded, ${summary.failed} failed, ${summary.skipped} skipped`,
    );

    return {
      appliedOperations,
      success,
      summary,
    };
  }

  /**
   * Compute diff operations from sync candidates
   * 
   * @param candidates - Array of sync candidates
   * @returns Array of diff operations with field-level changes
   */
  async computeDiffOperations(
    candidates: QaseSyncCandidate[],
  ): Promise<Omit<QaseDiffOperation, 'operationHash'>[]> {
    const operations: Omit<QaseDiffOperation, 'operationHash'>[] = [];

    for (const candidate of candidates) {
      // Skip non-update operations
      if (candidate.operation !== 'update') {
        continue;
      }

      const { intentObject, qaseTestCase } = candidate;
      if (!qaseTestCase || !intentObject.qaseId) {
        continue;
      }

      // Compute field-level changes
      const changes = this.computeFieldChanges(intentObject, qaseTestCase);

      // Skip if no changes detected
      if (changes.length === 0) {
        continue;
      }

      // Build operation (without hash, added in Step 5)
      const operation: Omit<QaseDiffOperation, 'operationHash'> = {
        changes,
        confidence: candidate.confidence,
        metadata: {
          mcpContext: candidate.metadata?.mcpContext,
          sourceFile: intentObject.filePath,
        },
        operationType: 'update',
        qaseId: intentObject.qaseId,
        requiresApproval: candidate.confidence < this.CONFIDENCE_THRESHOLD,
      };

      operations.push(operation);
    }

    return operations;
  }

  /**
   * Filter operations by confidence threshold
   * 
   * @param operations - Array of diff operations
   * @returns Object with auto-approved and requires-approval operations
   */
  filterOperationsByConfidence(
    operations: Omit<QaseDiffOperation, 'operationHash'>[],
  ): {
    autoApproved: Omit<QaseDiffOperation, 'operationHash'>[];
    requiresApproval: Omit<QaseDiffOperation, 'operationHash'>[];
  } {
    const autoApproved: Omit<QaseDiffOperation, 'operationHash'>[] = [];
    const requiresApproval: Omit<QaseDiffOperation, 'operationHash'>[] = [];

    for (const operation of operations) {
      if (operation.confidence >= this.CONFIDENCE_THRESHOLD) {
        autoApproved.push(operation);
      } else {
        requiresApproval.push(operation);
      }
    }

    return { autoApproved, requiresApproval };
  }

  /**
   * Generate sync candidates from intent objects
   * 
   * @param intentObjects - Array of normalized intent objects (Page/Modal/Tour)
   * @param qaseConfig - Qase configuration
   * @returns Array of sync candidates with confidence scores
   */
  async generateSyncCandidates(
    intentObjects: IntentObject[],
    qaseConfig: QaseConfig,
  ): Promise<QaseSyncCandidate[]> {
    const candidates: QaseSyncCandidate[] = [];

    for (const intentObj of intentObjects) {
      // Skip if no Qase ID link exists (Phase 1A: updates only)
      if (!intentObj.qaseId) {
        candidates.push({
          confidence: 1.0,
          intentObject: intentObj,
          operation: 'skip',
          reason: 'No Qase ID link found. Create operation not supported in Phase 1A.',
        });
        continue;
      }

      // Fetch existing Qase test case
      const qaseTestCase = await this.qaseService.getTestCase(qaseConfig, intentObj.qaseId);

      if (!qaseTestCase) {
        candidates.push({
          confidence: 1.0,
          intentObject: intentObj,
          operation: 'skip',
          reason: `Qase test case ${intentObj.qaseId} not found.`,
        });
        continue;
      }

      // Normalize Qase test case
      const normalizedQase = intentMapper.normalizeQaseTestCase(qaseTestCase);

      // Compute confidence score
      const confidence = this.computeConfidenceScore(intentObj, qaseTestCase);

      // Determine operation
      const operation = confidence > 0 ? 'update' : 'skip';
      const reason = operation === 'update' 
        ? 'Intent object differs from Qase test case'
        : 'No meaningful differences detected';

      candidates.push({
        confidence,
        intentObject: intentObj,
        operation,
        qaseTestCase: normalizedQase,
        reason,
      });
    }

    return candidates;
  }

  /**
   * Compare flow steps with Qase test case steps
   * 
   * @param flowSteps - Flow steps from intent object
   * @param qaseSteps - Steps from Qase test case
   * @returns Object with changed flag and reason
   */
  private compareSteps(
    flowSteps: FlowStep[],
    qaseSteps?: { action: string; expected_result: string }[],
  ): { changed: boolean; reason: string } {
    // If Qase has no steps but intent has steps
    if ((!qaseSteps || qaseSteps.length === 0) && flowSteps.length > 0) {
      return {
        changed: true,
        reason: `Intent object has ${flowSteps.length} steps, Qase has none`,
      };
    }

    // If intent has no steps but Qase has steps
    if (flowSteps.length === 0 && qaseSteps && qaseSteps.length > 0) {
      return {
        changed: true,
        reason: `Qase has ${qaseSteps.length} steps, intent object has none`,
      };
    }

    // Compare step counts
    if (flowSteps.length !== (qaseSteps?.length || 0)) {
      return {
        changed: true,
        reason: `Step count mismatch: intent has ${flowSteps.length}, Qase has ${qaseSteps?.length || 0}`,
      };
    }

    // Compare step content
    for (let i = 0; i < flowSteps.length; i++) {
      const flowStep = flowSteps[i];
      const qaseStep = qaseSteps![i];

      // Compare action
      if (flowStep.action.trim() !== qaseStep.action.trim()) {
        return {
          changed: true,
          reason: `Step ${i + 1} action differs`,
        };
      }

      // Compare expected result
      if (flowStep.expectedResult.trim() !== qaseStep.expected_result.trim()) {
        return {
          changed: true,
          reason: `Step ${i + 1} expected result differs`,
        };
      }
    }

    // No changes detected
    return { changed: false, reason: '' };
  }

  /**
   * Compute confidence score for a sync candidate
   * 
   * Factors:
   * - Presence of structured steps with selectors
   * - Presence of MCP context
   * - Recency of file modification
   * - Completeness of intent object metadata
   * 
   * @param intentObj - Intent object
   * @param _qaseTestCase - Qase test case (unused in Phase 1A)
   * @returns Confidence score between 0 and 1
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private computeConfidenceScore(intentObj: IntentObject, _qaseTestCase: QaseTestCase): number {
    let confidence = 0.5; // Base confidence

    // Factor 1: Structured steps with selectors (+0.2)
    if (intentObj.steps.length > 0) {
      const allStepsHaveSelectors = intentObj.steps.every(
        (s) => s.primarySelector && s.primarySelector.value,
      );
      if (allStepsHaveSelectors) {
        confidence += 0.2;
      } else {
        confidence += 0.1; // Partial credit for some steps
      }
    }

    // Factor 2: MCP context metadata (+0.1)
    if (intentObj.metadata && intentObj.steps.some((s) => s.metadata?.sourceUrl)) {
      confidence += 0.1;
    }

    // Factor 3: File recency (+0.1)
    if (intentObj.metadata?.lastModified) {
      const lastModified = new Date(intentObj.metadata.lastModified);
      const daysSinceModification = (Date.now() - lastModified.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSinceModification < 7) {
        confidence += 0.1; // Recently modified
      } else if (daysSinceModification < 30) {
        confidence += 0.05; // Modified within a month
      }
    }

    // Factor 4: Completeness of intent object (+0.1)
    if (intentObj.description && intentObj.description.trim().length > 20) {
      confidence += 0.1;
    }

    return Math.min(confidence, 1.0);
  }

  /**
   * Compute field-level changes between intent object and Qase test case
   * 
   * @param intentObj - Intent object (source of truth)
   * @param qaseTestCase - Existing Qase test case payload
   * @returns Array of field changes
   */
  private computeFieldChanges(
    intentObj: IntentObject,
    qaseTestCase: QaseTestCasePayload,
  ): FieldChange[] {
    const changes: FieldChange[] = [];

    // Compare title
    if (this.shouldUpdateField(intentObj.name, qaseTestCase.title)) {
      changes.push({
        after: intentObj.name,
        before: qaseTestCase.title,
        field: 'title',
        reason: 'Intent object name differs from Qase title',
      });
    }

    // Compare description
    if (this.shouldUpdateField(intentObj.description, qaseTestCase.description)) {
      changes.push({
        after: intentObj.description,
        before: qaseTestCase.description,
        field: 'description',
        reason: 'Intent object description differs from Qase description',
      });
    }

    // Compare steps
    const stepsChanged = this.compareSteps(intentObj.steps, qaseTestCase.steps);
    if (stepsChanged.changed) {
      changes.push({
        after: this.convertFlowStepsToQaseSteps(intentObj.steps),
        before: qaseTestCase.steps,
        field: 'steps',
        reason: stepsChanged.reason,
      });
    }

    // Compare automation status (Phase 1A: basic detection)
    // Assume if intent object has structured steps with selectors, it should be marked as automated
    const isAutomated = intentObj.steps.length > 0 && intentObj.steps.every(s => s.primarySelector);
    const desiredAutomation = isAutomated ? 1 : 2; // 1 = automated, 2 = to be automated
    if (qaseTestCase.automation !== desiredAutomation) {
      changes.push({
        after: desiredAutomation,
        before: qaseTestCase.automation,
        field: 'automation',
        reason: isAutomated 
          ? 'Intent object has automated steps with selectors'
          : 'Intent object is not fully automated',
      });
    }

    // Note: status and preconditions comparison can be added here
    // Omitted for Phase 1A brevity

    return changes;
  }

  /**
   * Convert FlowStep array to Qase step format
   * 
   * @param flowSteps - Flow steps from intent object
   * @returns Qase step format array
   */
  private convertFlowStepsToQaseSteps(
    flowSteps: FlowStep[],
  ): { action: string; expected_result: string }[] {
    return flowSteps.map((step) => ({
      action: step.action,
      expected_result: step.expectedResult,
    }));
  }

  /**
   * Check if a field should be updated
   * 
   * @param intentValue - Value from intent object
   * @param qaseValue - Value from Qase test case
   * @returns True if field should be updated
   */
  private shouldUpdateField(intentValue: any, qaseValue: any): boolean {
    // Both undefined or null - no update needed
    if ((intentValue === undefined || intentValue === null) && 
        (qaseValue === undefined || qaseValue === null)) {
      return false;
    }

    // One is undefined/null, other is not - update needed
    if ((intentValue === undefined || intentValue === null) !== 
        (qaseValue === undefined || qaseValue === null)) {
      return true;
    }

    // String comparison (trim and normalize)
    if (typeof intentValue === 'string' && typeof qaseValue === 'string') {
      return intentValue.trim() !== qaseValue.trim();
    }

    // Generic equality check
    return intentValue !== qaseValue;
  }
}

// Export singleton instance
export const qaseSyncService = new QaseSyncService();
