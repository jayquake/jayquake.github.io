import { existsSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import type { TestRun } from '../../shared/types';

import { DatabaseService } from './infrastructure/database/DatabaseService';
import { TestRunRepository } from './repositories/TestRunRepository';

const STORAGE_DIR = join(__dirname, '../../data/runs');

/**
 * ResultsStorage - Backward-compatible storage with database integration
 *
 * This class maintains backward compatibility with file-based storage while
 * using the new TestRunRepository for database operations.
 *
 * During migration period, it:
 * 1. Writes to database via TestRunRepository (primary)
 * 2. Optionally writes to JSON files (for backward compatibility)
 * 3. Can read from both database and JSON files
 */
export class ResultsStorage {
  private testRunRepository: TestRunRepository;
  private useFileStorage: boolean;

  constructor(useFileStorage = false) {
    this.useFileStorage = useFileStorage;
    const prisma = DatabaseService.getInstance().getClient();
    this.testRunRepository = new TestRunRepository(prisma);

    // Ensure legacy storage directory exists if using file storage
    if (this.useFileStorage && !existsSync(STORAGE_DIR)) {
      const { mkdirSync } = require('fs');
      mkdirSync(STORAGE_DIR, { recursive: true });
    }
  }

  /**
   * Get all test runs - combines database and file storage results
   */
  async getAllRuns(): Promise<TestRun[]> {
    try {
      // Primary: Get from database
      const dbRuns = await this.testRunRepository.findAll({
        orderBy: { startTime: 'desc' },
      });

      const runs = dbRuns.map((run) => this.convertFromPrisma(run));
      console.log('[ResultsStorage] getAllRuns() returning', runs.length, 'runs');
      if (runs.length > 0) {
        console.log('[ResultsStorage] First run id:', runs[0].id);
      }

      // If using file storage, merge with file-based runs (deduplicate)
      if (this.useFileStorage) {
        const fileRuns = this.getAllRunsFromFiles();
        const runIds = new Set(runs.map((r) => r.id));

        // Add runs that are only in files (not in database)
        for (const fileRun of fileRuns) {
          if (!runIds.has(fileRun.id)) {
            runs.push(fileRun);
          }
        }

        // Sort by start time (newest first)
        return runs.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
      }

      return runs;
    } catch (error) {
      console.error('[ResultsStorage] Error listing runs from database:', error);
      // Fallback to file storage
      return this.getAllRunsFromFiles();
    }
  }

  /**
   * Get a test run by ID - tries database first, falls back to JSON file
   */
  async getRun(runId: string): Promise<null | TestRun> {
    try {
      // Primary: Try database first
      const dbRun = await this.testRunRepository.findByRunId(runId);
      if (dbRun) {
        const converted = this.convertFromPrisma(dbRun);
        console.log(`[ResultsStorage] Retrieved run ${runId} from database with reportPath: ${converted.reportPath}`);
        return converted;
      }

      // Fallback: Try JSON file
      return this.getRunFromFile(runId);
    } catch (error) {
      console.error(`[ResultsStorage] Error reading run ${runId} from database:`, error);
      // Fallback to file storage
      return this.getRunFromFile(runId);
    }
  }

  /**
   * Get runs by flow - uses database
   */
  async getRunsByFlow(flowId: string): Promise<TestRun[]> {
    try {
      const runs = await this.testRunRepository.getRunsByFlow(flowId);
      return runs.map((run) => this.convertFromPrisma(run));
    } catch (error) {
      console.error(`[ResultsStorage] Error getting runs for flow ${flowId}:`, error);
      // Fallback to file storage
      return this.getAllRunsFromFiles().filter((run) => run.flowId === flowId);
    }
  }

  /**
   * Get runs by project - uses database
   */
  async getRunsByProject(projectId: string): Promise<TestRun[]> {
    try {
      const runs = await this.testRunRepository.getRunsByProject(projectId);
      return runs.map((run) => this.convertFromPrisma(run));
    } catch (error) {
      console.error(`[ResultsStorage] Error getting runs for project ${projectId}:`, error);
      // Fallback to file storage
      return this.getAllRunsFromFiles().filter(
        (run) => run.projectId === projectId || run.projects?.includes(projectId),
      );
    }
  }

  /**
   * Save a test run - writes to database and optionally to JSON file
   */
  async saveRun(run: TestRun): Promise<void> {
    console.log(`[ResultsStorage] Saving run ${run.id} with reportPath: ${run.reportPath}`);
    try {
      // Check if run already exists in database
      const existingRun = await this.testRunRepository.findByRunId(run.id);

      if (existingRun) {
        // Update existing run
        console.log(`[ResultsStorage] Run ${run.id} already exists, updating...`);
        await this.testRunRepository.update(existingRun.id, {
          duration: run.duration,
          endTime: run.endTime ? new Date(run.endTime) : undefined,
          reportPath: run.reportPath,
          status: run.status,
          summary: JSON.stringify(run.summary),
        });
        console.log(
          `[ResultsStorage] Successfully updated run ${run.id} in database with reportPath: ${run.reportPath}`,
        );
      } else {
        // Create new run
        console.log(`[ResultsStorage] Creating new run ${run.id} in database...`);
        await this.testRunRepository.create({
          config: JSON.stringify(run.config),
          duration: run.duration,
          endTime: run.endTime ? new Date(run.endTime) : undefined,
          flowId: run.flowId,
          projectId: run.projectId,
          reportPath: run.reportPath,
          runId: run.id,
          startTime: new Date(run.startTime),
          status: run.status,
          summary: JSON.stringify(run.summary),
        });
        console.log(
          `[ResultsStorage] Successfully created run ${run.id} in database with reportPath: ${run.reportPath}`,
        );
      }

      // Optional: Also save to JSON file for backward compatibility
      if (this.useFileStorage) {
        const filePath = join(STORAGE_DIR, `${run.id}.json`);
        writeFileSync(filePath, JSON.stringify(run, null, 2), 'utf-8');
      }
    } catch (error) {
      console.error(`[ResultsStorage] Error saving run ${run.id}:`, error);
      // Fallback to file storage on database error
      if (!this.useFileStorage) {
        console.warn(`[ResultsStorage] Falling back to file storage for run ${run.id}`);
        const filePath = join(STORAGE_DIR, `${run.id}.json`);
        writeFileSync(filePath, JSON.stringify(run, null, 2), 'utf-8');
      }
    }
  }

  // ========== Private methods for backward compatibility ==========

  /**
   * Convert Prisma TestRun to shared TestRun type
   * Note: Prisma has both 'id' (UUID) and 'runId' (run-XXX format)
   * The shared TestRun type uses 'id' which should map to 'runId' from Prisma
   */
  private convertFromPrisma(prismaRun: any): TestRun {
    return {
      config: JSON.parse(prismaRun.config),
      duration: prismaRun.duration || undefined,
      endTime: prismaRun.endTime ? prismaRun.endTime.toISOString() : undefined,
      flowId: prismaRun.flowId || undefined,
      id: prismaRun.runId, // Use runId (run-XXX format) as the id
      projectId: prismaRun.projectId || undefined,
      reportPath: prismaRun.reportPath || undefined,
      results: prismaRun.results || [], // Include results from relations
      startTime: prismaRun.startTime.toISOString(),
      status: prismaRun.status,
      summary: JSON.parse(prismaRun.summary),
    };
  }

  /**
   * Get all runs from JSON files (legacy)
   */
  private getAllRunsFromFiles(): TestRun[] {
    try {
      if (!existsSync(STORAGE_DIR)) {
        return [];
      }

      const files = readdirSync(STORAGE_DIR).filter((f) => f.endsWith('.json'));
      const runs: TestRun[] = [];

      for (const file of files) {
        const run = this.getRunFromFile(file.replace('.json', ''));
        if (run) {
          runs.push(run);
        }
      }

      // Sort by start time (newest first)
      return runs.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
    } catch (error) {
      console.error('[ResultsStorage] Error listing runs from files:', error);
      return [];
    }
  }

  /**
   * Get run from JSON file (legacy)
   */
  private getRunFromFile(runId: string): null | TestRun {
    const filePath = join(STORAGE_DIR, `${runId}.json`);
    if (!existsSync(filePath)) {
      return null;
    }

    try {
      const content = readFileSync(filePath, 'utf-8');
      return JSON.parse(content) as TestRun;
    } catch (error) {
      console.error(`[ResultsStorage] Error reading run ${runId} from file:`, error);
      return null;
    }
  }
}
