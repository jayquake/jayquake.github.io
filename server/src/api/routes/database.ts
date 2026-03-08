import { Router } from 'express';

import { DatabaseController } from '../controllers/DatabaseController';

const router = Router();
const databaseController = new DatabaseController();

/**
 * GET /api/database/stats
 * Get database statistics
 */
router.get('/stats', (req, res) => databaseController.getStats(req, res));

/**
 * DELETE /api/database/clear
 * Clear all database data (requires confirmation)
 *
 * Body: { confirm: "YES_DELETE_ALL_DATA" }
 */
router.delete('/clear', (req, res) => databaseController.clearAll(req, res));

/**
 * POST /api/database/reset
 * Reset database (clear + reinitialize)
 *
 * Body: { confirm: "YES_RESET_DATABASE" }
 */
router.post('/reset', (req, res) => databaseController.reset(req, res));

export default router;
