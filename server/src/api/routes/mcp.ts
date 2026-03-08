import { Router } from 'express';

import { MCPController } from '../controllers/MCPController';

const router = Router();
const mcpController = new MCPController();

router.get('/status', (req, res) => mcpController.getStatus(req, res));
router.post('/analyze-run/:runId', (req, res) => mcpController.analyzeRun(req, res));
router.get('/analyses/:runId', (req, res) => mcpController.getStoredAnalyses(req, res));
router.get('/explanation/:analysisId', (req, res) => mcpController.getAnalysisExplanation(req, res));
router.post('/analyze-element', (req, res) => mcpController.analyzeElement(req, res));
router.post('/interact', (req, res) => mcpController.interact(req, res));
router.post('/validate-selector', (req, res) => mcpController.validateSelector(req, res));
router.post('/navigate', (req, res) => mcpController.navigate(req, res));
router.post('/navigate-to-failure', (req, res) => mcpController.navigateToFailure(req, res));
router.post('/get-element-at-position', (req, res) => mcpController.getElementAtPosition(req, res));
router.post('/cleanup', (req, res) => mcpController.cleanup(req, res));

export default router;
