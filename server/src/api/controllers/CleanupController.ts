import { type Request, type Response } from 'express';
import { join } from 'path';

import { getStorageConfig } from '../../config/storage.config';
import { DatabaseService } from '../../infrastructure/database/DatabaseService';
import { TestArtifactRepository } from '../../repositories/TestArtifactRepository';
import { ArtifactCleanupService } from '../../services/ArtifactCleanupService';

/**
 * CleanupController - API endpoints for artifact cleanup
 */
export class CleanupController {
  /**
   * DELETE /api/cleanup/run/:runId
   * Clean up artifacts for a specific test run
   */
  static async cleanupTestRun(req: Request, res: Response) {
    try {
      const { runId } = req.params;
      const { dryRun = false } = req.body;
      const storageConfig = getStorageConfig();
      const testE2eDir = join(__dirname, '../../../../../');

      const cleanupService = new ArtifactCleanupService(
        {
          htmlReports: storageConfig.htmlReports,
          screenshots: storageConfig.artifacts.screenshots,
          traces: storageConfig.artifacts.traces,
          videos: storageConfig.artifacts.videos,
        },
        testE2eDir,
      );

      const report = await cleanupService.cleanupTestRun(runId, dryRun);

      res.json({
        dryRun,
        report,
        success: true,
      });
    } catch (error: any) {
      console.error('[CleanupController] Error cleaning up test run:', error);
      res.status(500).json({
        error: error.message,
        success: false,
      });
    }
  }

  /**
   * GET /api/cleanup/artifacts/stats
   * Get artifact statistics
   */
  static async getArtifactStats(req: Request, res: Response) {
    try {
      const prisma = DatabaseService.getInstance().getClient();
      const artifactRepository = new TestArtifactRepository(prisma);

      const stats = await artifactRepository.getStats();

      res.json({
        stats,
        success: true,
      });
    } catch (error: any) {
      console.error('[CleanupController] Error getting artifact stats:', error);
      res.status(500).json({
        error: error.message,
        success: false,
      });
    }
  }

  /**
   * GET /api/cleanup/stats
   * Get cleanup statistics (what would be cleaned up in dry run)
   */
  static async getCleanupStats(req: Request, res: Response) {
    try {
      const storageConfig = getStorageConfig();
      const testE2eDir = join(__dirname, '../../../../../');

      const cleanupService = new ArtifactCleanupService(
        {
          htmlReports: storageConfig.htmlReports,
          screenshots: storageConfig.artifacts.screenshots,
          traces: storageConfig.artifacts.traces,
          videos: storageConfig.artifacts.videos,
        },
        testE2eDir,
      );

      const stats = await cleanupService.getCleanupStats();

      res.json({
        config: storageConfig,
        stats,
        success: true,
      });
    } catch (error: any) {
      console.error('[CleanupController] Error getting cleanup stats:', error);
      res.status(500).json({
        error: error.message,
        success: false,
      });
    }
  }

  /**
   * GET /api/cleanup/config
   * Get current storage configuration
   */
  static async getConfig(req: Request, res: Response) {
    try {
      const config = getStorageConfig();

      res.json({
        config,
        success: true,
      });
    } catch (error: any) {
      console.error('[CleanupController] Error getting config:', error);
      res.status(500).json({
        error: error.message,
        success: false,
      });
    }
  }

  /**
   * POST /api/cleanup/run
   * Run cleanup (with optional dry run)
   */
  static async runCleanup(req: Request, res: Response) {
    try {
      const { dryRun = false } = req.body;
      const storageConfig = getStorageConfig();
      const testE2eDir = join(__dirname, '../../../../../');

      const cleanupService = new ArtifactCleanupService(
        {
          htmlReports: storageConfig.htmlReports,
          screenshots: storageConfig.artifacts.screenshots,
          traces: storageConfig.artifacts.traces,
          videos: storageConfig.artifacts.videos,
        },
        testE2eDir,
      );

      const report = await cleanupService.cleanupAll(dryRun);

      res.json({
        dryRun,
        report,
        success: true,
      });
    } catch (error: any) {
      console.error('[CleanupController] Error running cleanup:', error);
      res.status(500).json({
        error: error.message,
        success: false,
      });
    }
  }
}
