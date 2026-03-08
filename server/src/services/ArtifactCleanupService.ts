import { subDays } from 'date-fns';
import { existsSync, rmSync, statSync, unlinkSync } from 'fs';
import { join } from 'path';

import { DatabaseService } from '../infrastructure/database/DatabaseService';
import { TestArtifactRepository } from '../repositories/TestArtifactRepository';
import { TestRunRepository } from '../repositories/TestRunRepository';

export type CleanupConfig = {
  htmlReports: {
    regenerateOnDemand: boolean;
    retentionDays: number;
  };
  screenshots: {
    keepOnFailureOnly: boolean;
    retentionDays: number;
  };
  traces: {
    keepOnFailureOnly: boolean;
    retentionDays: number;
  };
  videos: {
    deletePassedAfterDays?: number;
    keepOnFailureOnly: boolean;
    retentionDays: number;
  };
}

export type CleanupReport = {
  byType: {
    [key: string]: {
      count: number;
      size: number;
    };
  };
  deletedCount: number;
  errors: string[];
  freedSpace: number; // bytes
}

/**
 * ArtifactCleanupService - Manages cleanup of test artifacts based on retention policies
 * Part of the Hybrid Storage Architecture
 *
 * Responsibilities:
 * - Clean up old artifacts (videos, screenshots, traces)
 * - Clean up HTML reports
 * - Enforce retention policies
 * - Track freed storage space
 */
export class ArtifactCleanupService {
  private artifactRepository: TestArtifactRepository;
  private config: CleanupConfig;
  private testE2eDir: string;
  private testRunRepository: TestRunRepository;

  constructor(config: CleanupConfig, testE2eDir?: string) {
    const prisma = DatabaseService.getInstance().getClient();
    this.artifactRepository = new TestArtifactRepository(prisma);
    this.testRunRepository = new TestRunRepository(prisma);
    this.config = config;
    this.testE2eDir = testE2eDir || join(__dirname, '../../../..');
  }

  /**
   * Run cleanup for all artifact types
   */
  async cleanupAll(dryRun = false): Promise<CleanupReport> {
    console.log(`[ArtifactCleanupService] Starting cleanup (dry run: ${dryRun})...`);

    const report: CleanupReport = {
      byType: {},
      deletedCount: 0,
      errors: [],
      freedSpace: 0,
    };

    try {
      // Clean up videos
      const videoReport = await this.cleanupArtifactsByType('video', this.config.videos, dryRun);
      this.mergeReport(report, videoReport);

      // Clean up screenshots
      const screenshotReport = await this.cleanupArtifactsByType('screenshot', this.config.screenshots, dryRun);
      this.mergeReport(report, screenshotReport);

      // Clean up traces
      const traceReport = await this.cleanupArtifactsByType('trace', this.config.traces, dryRun);
      this.mergeReport(report, traceReport);

      // Clean up HTML reports
      const htmlReport = await this.cleanupHtmlReports(dryRun);
      this.mergeReport(report, htmlReport);

      console.log(
        `[ArtifactCleanupService] Cleanup complete: deleted ${report.deletedCount} files, freed ${(report.freedSpace / 1024 / 1024).toFixed(2)} MB`,
      );
    } catch (error: any) {
      console.error(`[ArtifactCleanupService] Error during cleanup:`, error);
      report.errors.push(error.message);
    }

    return report;
  }

  /**
   * Clean up artifacts for a specific test run
   */
  async cleanupTestRun(runId: string, dryRun = false): Promise<CleanupReport> {
    console.log(`[ArtifactCleanupService] Cleaning up artifacts for run ${runId} (dry run: ${dryRun})...`);

    const report: CleanupReport = {
      byType: {},
      deletedCount: 0,
      errors: [],
      freedSpace: 0,
    };

    try {
      const run = await this.testRunRepository.findByRunId(runId);
      if (!run) {
        throw new Error(`Test run ${runId} not found`);
      }

      // Get all artifacts for this run
      const artifacts = await this.artifactRepository.findByTestRun(run.id);

      for (const artifact of artifacts) {
        await this.deleteArtifact(artifact, report, dryRun);
      }

      // Delete HTML report
      if (run.htmlGenerated && run.reportPath) {
        const fullPath = join(this.testE2eDir, run.reportPath);
        if (existsSync(fullPath)) {
          const size = this.getFolderSize(fullPath);

          if (!dryRun) {
            rmSync(fullPath, { force: true, recursive: true });
            await this.testRunRepository.update(run.id, {
              htmlGenerated: false,
              reportPath: undefined,
            });
          }

          report.deletedCount++;
          report.freedSpace += size;
          if (!report.byType['html-report']) {
            report.byType['html-report'] = { count: 0, size: 0 };
          }
          report.byType['html-report'].count++;
          report.byType['html-report'].size += size;
        }
      }

      console.log(
        `[ArtifactCleanupService] Cleanup complete for run ${runId}: deleted ${report.deletedCount} files, freed ${(report.freedSpace / 1024 / 1024).toFixed(2)} MB`,
      );
    } catch (error: any) {
      console.error(`[ArtifactCleanupService] Error during cleanup:`, error);
      report.errors.push(error.message);
    }

    return report;
  }

  /**
   * Get cleanup statistics (what would be cleaned up)
   */
  async getCleanupStats(): Promise<CleanupReport> {
    return this.cleanupAll(true); // Dry run
  }

  /**
   * Clean up artifacts by type (video, screenshot, trace)
   */
  private async cleanupArtifactsByType(
    type: string,
    policy: { deletePassedAfterDays?: number; keepOnFailureOnly: boolean; retentionDays: number; },
    dryRun: boolean,
  ): Promise<CleanupReport> {
    const report: CleanupReport = {
      byType: {},
      deletedCount: 0,
      errors: [],
      freedSpace: 0,
    };

    const cutoffDate = subDays(new Date(), policy.retentionDays);
    const oldArtifacts = await this.artifactRepository.findOldArtifacts(type, cutoffDate);

    console.log(
      `[ArtifactCleanupService] Found ${oldArtifacts.length} old ${type} artifacts (older than ${policy.retentionDays} days)`,
    );

    for (const artifact of oldArtifacts) {
      try {
        // Check if test passed/failed
        const testResult = artifact.testResult as any;
        const testFailed = testResult?.status === 'failed';

        // Apply policy: keep only failures?
        if (policy.keepOnFailureOnly && !testFailed) {
          // Check if we should delete passed test artifacts sooner
          if (policy.deletePassedAfterDays) {
            const passedCutoff = subDays(new Date(), policy.deletePassedAfterDays);
            if (artifact.createdAt < passedCutoff) {
              await this.deleteArtifact(artifact, report, dryRun);
            }
          } else {
            await this.deleteArtifact(artifact, report, dryRun);
          }
        } else if (!policy.keepOnFailureOnly) {
          // Delete all old artifacts regardless of status
          await this.deleteArtifact(artifact, report, dryRun);
        }
        // If policy.keepOnFailureOnly && testFailed, skip deletion
      } catch (error: any) {
        console.error(`[ArtifactCleanupService] Error deleting artifact ${artifact.id}:`, error.message);
        report.errors.push(`${artifact.filename}: ${error.message}`);
      }
    }

    return report;
  }

  /**
   * Clean up HTML reports
   */
  private async cleanupHtmlReports(dryRun: boolean): Promise<CleanupReport> {
    const report: CleanupReport = {
      byType: {},
      deletedCount: 0,
      errors: [],
      freedSpace: 0,
    };

    const cutoffDate = subDays(new Date(), this.config.htmlReports.retentionDays);
    const oldRuns = await this.testRunRepository.findAll({
      where: {
        htmlGenerated: true,
        htmlGeneratedAt: {
          lt: cutoffDate,
        },
      },
    });

    console.log(
      `[ArtifactCleanupService] Found ${oldRuns.length} old HTML reports (older than ${this.config.htmlReports.retentionDays} days)`,
    );

    for (const run of oldRuns) {
      try {
        if (run.reportPath) {
          const fullPath = join(this.testE2eDir, run.reportPath);

          if (existsSync(fullPath)) {
            // Get folder size before deletion
            const size = this.getFolderSize(fullPath);

            if (!dryRun) {
              // Delete HTML report folder
              rmSync(fullPath, { force: true, recursive: true });

              // Update database
              await this.testRunRepository.update(run.id, {
                htmlGenerated: false,
                reportPath: undefined,
              });

              console.log(
                `[ArtifactCleanupService] Deleted HTML report: ${run.reportPath} (${(size / 1024 / 1024).toFixed(2)} MB)`,
              );
            } else {
              console.log(
                `[ArtifactCleanupService] [DRY RUN] Would delete HTML report: ${run.reportPath} (${(size / 1024 / 1024).toFixed(2)} MB)`,
              );
            }

            report.deletedCount++;
            report.freedSpace += size;

            if (!report.byType['html-report']) {
              report.byType['html-report'] = { count: 0, size: 0 };
            }
            report.byType['html-report'].count++;
            report.byType['html-report'].size += size;
          }
        }
      } catch (error: any) {
        console.error(`[ArtifactCleanupService] Error deleting HTML report for run ${run.runId}:`, error.message);
        report.errors.push(`${run.runId}: ${error.message}`);
      }
    }

    return report;
  }

  /**
   * Delete a single artifact
   */
  private async deleteArtifact(artifact: any, report: CleanupReport, dryRun: boolean): Promise<void> {
    const fullPath = join(this.testE2eDir, artifact.path);

    if (existsSync(fullPath)) {
      const size = artifact.size || 0;

      if (!dryRun) {
        // Delete file
        unlinkSync(fullPath);

        // Delete DB record
        await this.artifactRepository.delete(artifact.id);

        console.log(
          `[ArtifactCleanupService] Deleted ${artifact.type}: ${artifact.filename} (${(size / 1024 / 1024).toFixed(2)} MB)`,
        );
      } else {
        console.log(
          `[ArtifactCleanupService] [DRY RUN] Would delete ${artifact.type}: ${artifact.filename} (${(size / 1024 / 1024).toFixed(2)} MB)`,
        );
      }

      report.deletedCount++;
      report.freedSpace += size;

      if (!report.byType[artifact.type]) {
        report.byType[artifact.type] = { count: 0, size: 0 };
      }
      report.byType[artifact.type].count++;
      report.byType[artifact.type].size += size;
    } else {
      // File doesn't exist, just delete DB record
      if (!dryRun) {
        await this.artifactRepository.delete(artifact.id);
        console.log(`[ArtifactCleanupService] Removed DB record for missing file: ${artifact.filename}`);
      }
    }
  }

  /**
   * Get folder size recursively
   */
  private getFolderSize(folderPath: string): number {
    let totalSize = 0;

    try {
      const { readdirSync } = require('fs');
      const files = readdirSync(folderPath);

      for (const file of files) {
        const filePath = join(folderPath, file);
        const stats = statSync(filePath);

        if (stats.isDirectory()) {
          totalSize += this.getFolderSize(filePath);
        } else {
          totalSize += stats.size;
        }
      }
    } catch (error) {
      // Ignore errors (e.g., permission denied)
    }

    return totalSize;
  }

  /**
   * Merge cleanup reports
   */
  private mergeReport(target: CleanupReport, source: CleanupReport): void {
    target.deletedCount += source.deletedCount;
    target.freedSpace += source.freedSpace;
    target.errors.push(...source.errors);

    for (const [type, stats] of Object.entries(source.byType)) {
      if (!target.byType[type]) {
        target.byType[type] = { count: 0, size: 0 };
      }
      target.byType[type].count += stats.count;
      target.byType[type].size += stats.size;
    }
  }
}
