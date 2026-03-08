import { type Request, type Response } from 'express';

import { DatabaseService } from '../../infrastructure/database/DatabaseService';

/**
 * DatabaseController - Handles database operations
 *
 * Routes:
 * - GET /api/database/stats - Get database statistics
 * - DELETE /api/database/clear - Clear all database data (with safety checks)
 */
export class DatabaseController {
  private dbService: DatabaseService;

  constructor() {
    this.dbService = DatabaseService.getInstance();
  }

  /**
   * Clear all database data
   * Requires confirmation token in request body for safety
   */
  async clearAll(req: Request, res: Response): Promise<void> {
    try {
      const { confirm, token } = req.body;

      // Safety check: Require explicit confirmation
      if (confirm !== 'YES_DELETE_ALL_DATA') {
        res.status(400).json({
          error: 'Confirmation required',
          message: 'Please provide { confirm: "YES_DELETE_ALL_DATA" } in request body',
        });
        return;
      }

      // Optional: Add token-based authentication for extra safety
      if (process.env.DB_CLEAR_TOKEN && token !== process.env.DB_CLEAR_TOKEN) {
        res.status(403).json({
          error: 'Invalid token',
          message: 'DB_CLEAR_TOKEN does not match',
        });
        return;
      }

      // Get stats before clearing
      const statsBefore = await this.dbService.getStats();
      const totalRecords =
        statsBefore.testRuns +
        statsBefore.testResults +
        statsBefore.testSteps +
        statsBefore.testLogs +
        statsBefore.environments +
        statsBefore.testFiles +
        statsBefore.mcpAnalyses +
        statsBefore.mcpArtifacts;

      // Clear database
      await this.dbService.clearAll();

      // Get stats after clearing
      const statsAfter = await this.dbService.getStats();

      res.json({
        after: statsAfter,
        before: statsBefore,
        deletedRecords: totalRecords,
        message: 'Database cleared successfully',
        success: true,
      });
    } catch (error: any) {
      console.error('[DatabaseController] Error clearing database:', error);
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get database statistics
   */
  async getStats(req: Request, res: Response): Promise<void> {
    try {
      const stats = await this.dbService.getStats();
      const dbPath = this.dbService.getDbPath();
      const exists = await this.dbService.databaseExists();

      res.json({
        database: {
          exists,
          path: dbPath,
        },
        statistics: stats,
        totalRecords:
          stats.testRuns +
          stats.testResults +
          stats.testSteps +
          stats.testLogs +
          stats.environments +
          stats.testFiles +
          stats.mcpAnalyses +
          stats.mcpArtifacts,
      });
    } catch (error: any) {
      console.error('[DatabaseController] Error getting stats:', error);
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Reset database (clear + reinitialize)
   * Useful for testing
   */
  async reset(req: Request, res: Response): Promise<void> {
    try {
      const { confirm } = req.body;

      if (confirm !== 'YES_RESET_DATABASE') {
        res.status(400).json({
          error: 'Confirmation required',
          message: 'Please provide { confirm: "YES_RESET_DATABASE" } in request body',
        });
        return;
      }

      // Clear all data
      await this.dbService.clearAll();

      // Optionally run migrations or seed data here
      // await runMigrations();
      // await seedData();

      const stats = await this.dbService.getStats();

      res.json({
        message: 'Database reset successfully',
        statistics: stats,
        success: true,
      });
    } catch (error: any) {
      console.error('[DatabaseController] Error resetting database:', error);
      res.status(500).json({ error: error.message });
    }
  }
}
