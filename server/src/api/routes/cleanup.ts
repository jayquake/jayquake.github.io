import { Router } from 'express';

import { CleanupController } from '../controllers/CleanupController';

const router = Router();

/**
 * Cleanup API Routes
 * Manage artifact cleanup and storage
 */

// Get cleanup statistics (dry run preview)
router.get('/stats', CleanupController.getCleanupStats);

// Run cleanup
router.post('/run', CleanupController.runCleanup);

// Clean up specific test run
router.delete('/run/:runId', CleanupController.cleanupTestRun);

// Get artifact statistics
router.get('/artifacts/stats', CleanupController.getArtifactStats);

// Get storage configuration
router.get('/config', CleanupController.getConfig);

export default router;
