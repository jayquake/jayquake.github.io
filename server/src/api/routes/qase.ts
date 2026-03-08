import { Router } from 'express';

import { QaseController } from '../controllers/QaseController';

const router = Router();
const qaseController = new QaseController();

// Status and configuration
router.get('/status', (req, res) => qaseController.getStatus(req, res));
router.post('/validate', (req, res) => qaseController.validateConfig(req, res));

// Test case fetching
router.get('/test-case/:projectCode/:testCaseId', (req, res) => qaseController.getTestCase(req, res));
router.post('/test-cases', (req, res) => qaseController.getTestCases(req, res));

// Sync operations (legacy/existing workflow)
router.post('/sync/dry-run', (req, res) => qaseController.dryRunSync(req, res));
router.post('/sync/apply', (req, res) => qaseController.applySync(req, res));

// Hybrid MCP workflow routes
router.post('/hybrid/query', (req, res) => qaseController.hybridQuery(req, res));
router.post('/hybrid/transform', (req, res) => qaseController.transformSignals(req, res));
router.get('/hybrid/config', (req, res) => qaseController.getHybridConfig(req, res));
router.patch('/hybrid/config', (req, res) => qaseController.updateHybridConfig(req, res));

// Approval workflow routes
router.get('/approvals/pending', (req, res) => qaseController.listPendingApprovals(req, res));
router.get('/approvals/:hash', (req, res) => qaseController.getApprovalRecords(req, res));
router.post('/approvals/:hash/decide', (req, res) => qaseController.recordApprovalDecision(req, res));

// Metrics and reporting routes
router.get('/metrics', (req, res) => qaseController.getMetrics(req, res));
router.get('/metrics/rate-limits', (req, res) => qaseController.getRateLimitIncidents(req, res));
router.get('/metrics/distribution', (req, res) => qaseController.getPathDistribution(req, res));
router.post('/metrics/export', (req, res) => qaseController.exportMetrics(req, res));
router.post('/metrics/clear', (req, res) => qaseController.clearOldMetrics(req, res));

// Pilot validation route
router.post('/validation/pilot', (req, res) => qaseController.runValidationPilot(req, res));

export default router;
