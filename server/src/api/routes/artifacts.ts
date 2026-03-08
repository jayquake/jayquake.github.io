import { Router } from 'express';

import { ArtifactsController } from '../controllers/ArtifactsController';

const router = Router();

/**
 * Artifacts API Routes
 * Fetch and serve test artifacts (videos, screenshots, traces)
 */

// Get all artifacts for a test run
router.get('/run/:runId', ArtifactsController.getRunArtifacts);

// Get artifacts for a specific test result
router.get('/result/:resultId', ArtifactsController.getTestResultArtifacts);

// Get artifact statistics for a run
router.get('/stats/:runId', ArtifactsController.getRunArtifactStats);

// Serve artifact file (must be last to avoid route conflicts)
router.get('/file/:artifactId', ArtifactsController.serveArtifactFile);

export default router;
