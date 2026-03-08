import { Router } from 'express';

import { FlowController } from '../controllers/FlowController';

const router = Router();

// Create a function to get broadcast function
// This will be set by the server
let broadcastToClients: ((data: any) => void) | null = null;

export function setBroadcastFunction(fn: (data: any) => void): void {
  broadcastToClients = fn;
}

const flowController = new FlowController((data: any) => {
  if (broadcastToClients) {
    broadcastToClients(data);
  }
});

router.post('/execute', (req, res) => flowController.executeFlow(req, res));
router.get('/', (req, res) => flowController.getAllFlows(req, res));
router.get('/:flowId', (req, res) => flowController.getFlow(req, res));
router.post('/', (req, res) => flowController.createFlow(req, res));
router.put('/:flowId', (req, res) => flowController.updateFlow(req, res));
router.delete('/:flowId', (req, res) => flowController.deleteFlow(req, res));

export default router;
