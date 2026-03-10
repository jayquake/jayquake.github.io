import { Router } from 'express';

import { TestRunController } from '../controllers/TestRunController';

const router = Router();

// Create a function to get broadcast function
// This will be set by the server
let broadcastToClients: ((data: any) => void) | null = null;

export function setBroadcastFunction(fn: (data: any) => void): void {
  broadcastToClients = fn;
}

const testRunController = new TestRunController((data: any) => {
  if (broadcastToClients) {
    broadcastToClients(data);
  }
});

router.post('/', (req, res) => testRunController.createRun(req, res));
router.get('/', (req, res) => testRunController.getAllRuns(req, res));
router.get('/:runId', (req, res) => testRunController.getRun(req, res));
router.get('/:runId/results-with-qase', (req, res) => testRunController.getResultsWithQaseDetails(req, res));
router.get('/:runId/qase-test-cases', (req, res) => testRunController.getQaseTestCases(req, res));
router.get('/:runId/post-processing-status', (req, res) => testRunController.getPostProcessingStatus(req, res));
router.get('/:runId/sdk-audit/raw/:filename', (req, res) => testRunController.getSdkAuditRawFile(req, res));
router.get('/:runId/sdk-audit', (req, res) => testRunController.getSdkAudit(req, res));
// Note: /:runId/report route is handled in server.ts to return JSON metadata
// The actual report files are served via /api/reports/:runId/* middleware
router.post('/:runId/cancel', (req, res) => testRunController.cancelRun(req, res));
router.post('/:runId/post-process', (req, res) => testRunController.postProcess(req, res));

export default router;
