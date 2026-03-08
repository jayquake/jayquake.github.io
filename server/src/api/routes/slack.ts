import { Router } from 'express';

import { SlackController } from '../controllers/SlackController';

const router = Router();
const slackController = new SlackController();

// POST /api/slack/send-results - Send test results to Slack
router.post('/send-results', (req, res) => slackController.sendTestResults(req, res));

// POST /api/slack/test - Test Slack integration with a simple message
router.post('/test', (req, res) => slackController.testConnection(req, res));

// GET /api/slack/config - Get Slack configuration status
router.get('/config', (req, res) => slackController.getConfig(req, res));

export default router;
