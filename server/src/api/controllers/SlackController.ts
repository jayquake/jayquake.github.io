import { type Request, type Response } from 'express';

import type { TestRunNotificationData } from '../../services/SlackService';

import { DatabaseService } from '../../infrastructure/database/DatabaseService';
import { TestRunRepository } from '../../repositories/TestRunRepository';
import { SlackService } from '../../services/SlackService';

export class SlackController {
  private slackService: SlackService;
  private testRunRepository: TestRunRepository;

  constructor() {
    // Initialize Slack service with environment variables
    this.slackService = new SlackService({
      botToken: process.env.SLACK_BOT_TOKEN || '',
      channelId: process.env.SLACK_CHANNEL_ID || '',
      enabled: process.env.SLACK_ENABLED === 'true',
    });

    const prisma = DatabaseService.getInstance().getClient();
    this.testRunRepository = new TestRunRepository(prisma);
  }

  /**
   * GET /api/slack/config - Get Slack configuration status
   */
  async getConfig(req: Request, res: Response): Promise<void> {
    try {
      const isConfigured = this.slackService.isConfigured();
      res.json({
        channelId: process.env.SLACK_CHANNEL_ID || null,
        configured: isConfigured,
        enabled: process.env.SLACK_ENABLED === 'true',
      });
    } catch (error: any) {
      console.error('[SlackController] Error getting config:', error);
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * POST /api/slack/send-results - Send test results to Slack
   * Body: { runId: string, resultsUrl?: string }
   */
  async sendTestResults(req: Request, res: Response): Promise<void> {
    try {
      const { resultsUrl, runId } = req.body;

      if (!runId) {
        res.status(400).json({ error: 'runId is required' });
        return;
      }

      // Check if Slack is configured
      if (!this.slackService.isConfigured()) {
        res.status(400).json({
          error: 'Slack integration is not configured. Please set SLACK_BOT_TOKEN, SLACK_CHANNEL_ID, and SLACK_ENABLED=true in .env',
        });
        return;
      }

      // Fetch test run from database
      const testRun = await this.testRunRepository.findByRunId(runId);
      if (!testRun) {
        res.status(404).json({ error: 'Test run not found' });
        return;
      }

      // Parse config and summary
      const config = testRun.config ? JSON.parse(testRun.config) : {};
      const summary = testRun.summary ? JSON.parse(testRun.summary) : { failed: 0, passed: 0, skipped: 0, total: 0 };

      // Build notification data
      const notificationData: TestRunNotificationData = {
        baseUrl: config.baseUrl,
        duration: testRun.endTime && testRun.startTime ?
          testRun.endTime.getTime() - testRun.startTime.getTime()
        : undefined,
        endTime: testRun.endTime?.toISOString(),
        projectId: testRun.projectId,
        runId: testRun.runId,
        startTime: testRun.startTime.toISOString(),
        status: testRun.status as 'cancelled' | 'completed' | 'failed' | 'running',
        summary: {
          failed: summary.failed || 0,
          getSuccessRate: () => {
            const total = summary.total || 0;
            return total > 0 ? ((summary.passed || 0) / total) * 100 : 0;
          },
          passed: summary.passed || 0,
          skipped: summary.skipped || 0,
          toJSON: () => summary,
          total: summary.total || 0,
        },
      };

      // Send to Slack
      await this.slackService.sendTestResults(notificationData, resultsUrl);

      res.json({
        message: 'Test results sent to Slack successfully',
        runId,
      });
    } catch (error: any) {
      console.error('[SlackController] Error sending test results:', error);
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * POST /api/slack/test - Test Slack connection with a simple message
   * Body: { message?: string }
   */
  async testConnection(req: Request, res: Response): Promise<void> {
    try {
      // Check if Slack is configured
      if (!this.slackService.isConfigured()) {
        res.status(400).json({
          error: 'Slack integration is not configured. Please set SLACK_BOT_TOKEN, SLACK_CHANNEL_ID, and SLACK_ENABLED=true in .env',
        });
        return;
      }

      const message = req.body.message || '🧪 Test message from Standalone Test Runner';

      await this.slackService.sendSimpleMessage(message);

      res.json({
        message: 'Test message sent to Slack successfully',
      });
    } catch (error: any) {
      console.error('[SlackController] Error testing connection:', error);
      res.status(500).json({ error: error.message });
    }
  }
}
