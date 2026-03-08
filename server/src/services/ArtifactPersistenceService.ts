import * as fs from 'fs';
import * as path from 'path';

import type {
  QaseApplyResult,
  QaseDiffOperation,
  QaseDryRunResult,
} from '../../../shared/types';

/**
 * Apply journal entry
 */
export type ApplyJournalEntry = {
  appliedBy?: string;
  error?: string;
  operationHash: string;
  qaseId: number;
  status: 'failed' | 'skipped' | 'success';
  timestamp: string;
}

/**
 * Artifact types for Qase sync operations
 */
export type ArtifactType = 'apply-journal' | 'dry-run-diff' | 'rollback-patches';

/**
 * Rollback patch entry
 */
export type RollbackPatch = {
  afterValue: any;
  beforeValue: any;
  field: string;
  operationHash: string;
  qaseId: number;
  timestamp: string;
}

/**
 * ArtifactPersistenceService
 * 
 * Manages persistence of Qase sync artifacts for audit trail and rollback support.
 * 
 * Artifact types:
 * - dry-run-diff.json: Full dry-run result with operations and hashes
 * - apply-journal.json: Log of applied operations with status
 * - rollback-patches.json: Before/after values for rollback support
 * 
 * File naming convention:
 * - {runId}-{artifactType}.json
 * - Example: dry-run-1234567890-abc123-dry-run-diff.json
 */
export class ArtifactPersistenceService {
  private artifactsDir: string;

  constructor(artifactsDir?: string) {
    // Default to standalone-app/backend/qase-sync-artifacts
    this.artifactsDir = artifactsDir || path.join(__dirname, '..', '..', 'qase-sync-artifacts');
    this.ensureArtifactsDir();
  }

  /**
   * Clean up old artifacts (older than specified days)
   * 
   * @param retentionDays - Number of days to retain artifacts
   * @returns Number of deleted artifacts
   */
  async cleanupOldArtifacts(retentionDays = 30): Promise<number> {
    try {
      const files = await fs.promises.readdir(this.artifactsDir);
      const now = Date.now();
      const retentionMs = retentionDays * 24 * 60 * 60 * 1000;
      let deletedCount = 0;

      for (const file of files) {
        const filePath = this.getArtifactPath(file);
        const stats = await fs.promises.stat(filePath);
        const ageMs = now - stats.mtimeMs;

        if (ageMs > retentionMs) {
          await fs.promises.unlink(filePath);
          deletedCount++;
          console.log(`[ArtifactPersistence] Deleted old artifact: ${file}`);
        }
      }

      return deletedCount;
    } catch (error) {
      console.error('[ArtifactPersistence] Error cleaning up artifacts:', error);
      return 0;
    }
  }

  /**
   * Get artifacts directory path
   * 
   * @returns Absolute path to artifacts directory
   */
  getArtifactsDirectory(): string {
    return this.artifactsDir;
  }

  /**
   * List all artifacts for a given run ID
   * 
   * @param runId - Run identifier
   * @returns Array of artifact file paths
   */
  async listArtifacts(runId: string): Promise<string[]> {
    try {
      const files = await fs.promises.readdir(this.artifactsDir);
      const runArtifacts = files.filter((f) => f.startsWith(runId));
      return runArtifacts.map((f) => this.getArtifactPath(f));
    } catch (error) {
      console.error(`[ArtifactPersistence] Error listing artifacts for ${runId}:`, error);
      return [];
    }
  }

  /**
   * Load apply journal from artifact
   * 
   * @param runId - Run identifier
   * @returns Apply journal entries or null if not found
   */
  async loadApplyJournal(runId: string): Promise<ApplyJournalEntry[] | null> {
    try {
      const files = await fs.promises.readdir(this.artifactsDir);
      const journalFiles = files.filter(
        (f) => f.startsWith(runId) && f.includes('apply-journal'),
      );

      if (journalFiles.length === 0) {
        return null;
      }

      // Sort by filename and get most recent
      journalFiles.sort().reverse();
      const [latestFile] = journalFiles;

      const filePath = this.getArtifactPath(latestFile);
      const content = await fs.promises.readFile(filePath, 'utf8');
      const artifact = JSON.parse(content);

      return artifact.journal as ApplyJournalEntry[];
    } catch (error) {
      console.error(`[ArtifactPersistence] Error loading apply journal for ${runId}:`, error);
      return null;
    }
  }

  /**
   * Load dry-run result from artifact
   * 
   * @param runId - Run identifier
   * @returns Dry-run result or null if not found
   */
  async loadDryRun(runId: string): Promise<null | QaseDryRunResult> {
    try {
      // Find the most recent dry-run artifact for this runId
      const files = await fs.promises.readdir(this.artifactsDir);
      const dryRunFiles = files.filter(
        (f) => f.startsWith(runId) && f.includes('dry-run-diff'),
      );

      if (dryRunFiles.length === 0) {
        return null;
      }

      // Sort by filename (which includes timestamp) and get most recent
      dryRunFiles.sort().reverse();
      const [latestFile] = dryRunFiles;

      const filePath = this.getArtifactPath(latestFile);
      const content = await fs.promises.readFile(filePath, 'utf8');
      const artifact = JSON.parse(content);

      // Return only the dry-run result (strip metadata)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { artifactType, persistedAt, ...dryRunResult } = artifact;
      return dryRunResult as QaseDryRunResult;
    } catch (error) {
      console.error(`[ArtifactPersistence] Error loading dry-run artifact for ${runId}:`, error);
      return null;
    }
  }

  /**
   * Load rollback patches from artifact
   * 
   * @param runId - Run identifier
   * @returns Rollback patches or null if not found
   */
  async loadRollbackPatches(runId: string): Promise<null | RollbackPatch[]> {
    try {
      const files = await fs.promises.readdir(this.artifactsDir);
      const patchFiles = files.filter(
        (f) => f.startsWith(runId) && f.includes('rollback-patches'),
      );

      if (patchFiles.length === 0) {
        return null;
      }

      // Sort by filename and get most recent
      patchFiles.sort().reverse();
      const [latestFile] = patchFiles;

      const filePath = this.getArtifactPath(latestFile);
      const content = await fs.promises.readFile(filePath, 'utf8');
      const artifact = JSON.parse(content);

      return artifact.patches as RollbackPatch[];
    } catch (error) {
      console.error(`[ArtifactPersistence] Error loading rollback patches for ${runId}:`, error);
      return null;
    }
  }

  /**
   * Persist apply journal
   * 
   * @param runId - Run identifier
   * @param applyResult - Apply result with operation statuses
   * @param approvedBy - Optional user/system identifier
   * @returns Path to persisted artifact
   */
  async persistApplyJournal(
    runId: string,
    applyResult: QaseApplyResult,
    approvedBy?: string,
  ): Promise<string> {
    const filename = this.generateFilename(runId, 'apply-journal');
    const filePath = this.getArtifactPath(filename);

    const journal: ApplyJournalEntry[] = applyResult.appliedOperations.map((op) => ({
      appliedBy: approvedBy,
      error: op.error,
      operationHash: op.operationHash,
      qaseId: op.qaseId,
      status: op.status,
      timestamp: new Date().toISOString(),
    }));

    const artifact = {
      artifactType: 'apply-journal' as const,
      journal,
      persistedAt: new Date().toISOString(),
      runId,
      summary: applyResult.summary,
    };

    await fs.promises.writeFile(filePath, JSON.stringify(artifact, null, 2), 'utf8');
    console.log(`[ArtifactPersistence] Persisted apply journal: ${filePath}`);

    return filePath;
  }

  /**
   * Persist dry-run result
   * 
   * @param dryRunResult - Dry-run result to persist
   * @returns Path to persisted artifact
   */
  async persistDryRun(dryRunResult: QaseDryRunResult): Promise<string> {
    const filename = this.generateFilename(dryRunResult.runId, 'dry-run-diff');
    const filePath = this.getArtifactPath(filename);

    const artifact = {
      ...dryRunResult,
      artifactType: 'dry-run-diff' as const,
      persistedAt: new Date().toISOString(),
    };

    await fs.promises.writeFile(filePath, JSON.stringify(artifact, null, 2), 'utf8');
    console.log(`[ArtifactPersistence] Persisted dry-run artifact: ${filePath}`);

    return filePath;
  }

  /**
   * Persist rollback patches
   * 
   * @param runId - Run identifier
   * @param operations - Operations that were applied
   * @returns Path to persisted artifact
   */
  async persistRollbackPatches(
    runId: string,
    operations: QaseDiffOperation[],
  ): Promise<string> {
    const filename = this.generateFilename(runId, 'rollback-patches');
    const filePath = this.getArtifactPath(filename);

    const patches: RollbackPatch[] = [];

    for (const operation of operations) {
      for (const change of operation.changes) {
        patches.push({
          afterValue: change.after,
          beforeValue: change.before,
          field: change.field,
          operationHash: operation.operationHash,
          qaseId: operation.qaseId,
          timestamp: new Date().toISOString(),
        });
      }
    }

    const artifact = {
      artifactType: 'rollback-patches' as const,
      patchCount: patches.length,
      patches,
      persistedAt: new Date().toISOString(),
      runId,
    };

    await fs.promises.writeFile(filePath, JSON.stringify(artifact, null, 2), 'utf8');
    console.log(`[ArtifactPersistence] Persisted rollback patches: ${filePath}`);

    return filePath;
  }

  /**
   * Ensure artifacts directory exists
   */
  private ensureArtifactsDir(): void {
    if (!fs.existsSync(this.artifactsDir)) {
      fs.mkdirSync(this.artifactsDir, { recursive: true });
      console.log(`[ArtifactPersistence] Created artifacts directory: ${this.artifactsDir}`);
    }
  }

  /**
   * Generate artifact filename with timestamp
   * 
   * @param runId - Run identifier
   * @param artifactType - Type of artifact
   * @returns Filename string
   */
  private generateFilename(runId: string, artifactType: ArtifactType): string {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    return `${runId}-${artifactType}-${timestamp}.json`;
  }

  /**
   * Get artifact file path
   * 
   * @param filename - Artifact filename
   * @returns Full file path
   */
  private getArtifactPath(filename: string): string {
    return path.join(this.artifactsDir, filename);
  }
}

// Export singleton instance
export const artifactPersistence = new ArtifactPersistenceService();
