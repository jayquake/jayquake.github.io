import type { TestRunSummary } from '../../../shared/domain/valueObjects/TestRunSummary';

/**
 * Slack notification configuration
 */
export type SlackConfig = {
  botToken: string; // OAuth bot token (xoxb-...)
  channelId: string; // Channel ID (e.g., C05HBH9DPCJ)
  enabled: boolean;
}

/**
 * Test run data for Slack notification
 */
export type TestRunNotificationData = {
  baseUrl?: string;
  duration?: number;
  endTime?: string;
  projectId: string;
  runId: string;
  startTime: string;
  status: 'cancelled' | 'completed' | 'failed' | 'running';
  summary: TestRunSummary;
}

/**
 * SlackService - Send test results to Slack channels
 */
export class SlackService {
  private botToken: string;
  private channelId: string;
  private enabled: boolean;

  constructor(config: SlackConfig) {
    this.botToken = config.botToken;
    this.channelId = config.channelId;
    this.enabled = config.enabled;
  }

  /**
   * Check if Slack integration is properly configured
   */
  isConfigured(): boolean {
    return this.enabled && !!this.botToken && !!this.channelId;
  }

  /**
   * Send test run results to Slack channel
   */
  async sendTestResults(data: TestRunNotificationData, resultsUrl?: string): Promise<void> {
    if (!this.isConfigured()) {
      throw new Error('Slack integration is not configured');
    }

    const message = this.formatTestResultsMessage(data, resultsUrl);

    try {
      const response = await fetch('https://slack.com/api/chat.postMessage', {
        body: JSON.stringify(message),
        headers: {
          'Authorization': `Bearer ${this.botToken}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      const result = await response.json();

      if (!result.ok) {
        throw new Error(`Slack API error: ${result.error || 'Unknown error'}`);
      }

      console.log('[SlackService] Message sent successfully:', result.ts);
    } catch (error) {
      console.error('[SlackService] Failed to send message:', error);
      throw error;
    }
  }

  /**
   * Format test results into Slack Block Kit message
   */
  private formatTestResultsMessage(data: TestRunNotificationData, resultsUrl?: string) {
    const { projectId, status, summary, baseUrl, duration, startTime, runId } = data;
    const passRate = summary.getSuccessRate();
    const durationText = duration ? `${(duration / 1000).toFixed(1)}s` : 'N/A';

    // Determine status emoji and color
    const statusEmoji = status === 'completed' ? '✅' : status === 'failed' ? '❌' : '⚠️';
    const statusColor = status === 'completed' ? '#10b981' : status === 'failed' ? '#ef4444' : '#f59e0b';

    // Build blocks for rich formatting
    const blocks: any[] = [
      {
        text: {
          text: `${statusEmoji} *Test Run ${status === 'completed' ? 'Completed' : 'Failed'}*`,
          type: 'mrkdwn',
        },
        type: 'header',
      },
      {
        type: 'section',
        fields: [
          {
            text: `*Project:*\n${projectId}`,
            type: 'mrkdwn',
          },
          {
            text: `*Status:*\n${status.charAt(0).toUpperCase() + status.slice(1)}`,
            type: 'mrkdwn',
          },
          {
            text: `*Domain:*\n${baseUrl || 'N/A'}`,
            type: 'mrkdwn',
          },
          {
            text: `*Duration:*\n${durationText}`,
            type: 'mrkdwn',
          },
        ],
      },
      {
        type: 'divider',
      },
      {
        type: 'section',
        fields: [
          {
            text: `*✓ Passed:*\n${summary.passed}`,
            type: 'mrkdwn',
          },
          {
            text: `*✗ Failed:*\n${summary.failed}`,
            type: 'mrkdwn',
          },
          {
            text: `*Total Tests:*\n${summary.total}`,
            type: 'mrkdwn',
          },
          {
            text: `*Pass Rate:*\n${passRate.toFixed(1)}%`,
            type: 'mrkdwn',
          },
        ],
      },
    ];

    // Add context with timestamp
    blocks.push({
      elements: [
        {
          text: `Run ID: ${runId} | Started: ${new Date(startTime).toLocaleString()}`,
          type: 'mrkdwn',
        },
      ],
      type: 'context',
    });

    // Add view results button if URL provided
    if (resultsUrl) {
      blocks.push({
        elements: [
          {
            style: 'primary',
            text: {
              emoji: true,
              text: '📊 View Full Results',
              type: 'plain_text',
            },
            type: 'button',
            url: resultsUrl,
          },
        ],
        type: 'actions',
      });
    }

    return {
      attachments: [
        {
          color: statusColor,
          fallback: `Test run ${status}: ${summary.passed}/${summary.total} passed (${passRate.toFixed(1)}%)`,
        },
      ],
      blocks,
      channel: this.channelId,
      text: `Test run ${status}: ${projectId} - ${summary.passed}/${summary.total} passed`,
    };
  }

  /**
   * Send a simple text message to Slack (for testing)
   */
  async sendSimpleMessage(text: string): Promise<void> {
    if (!this.isConfigured()) {
      throw new Error('Slack integration is not configured');
    }

    try {
      const response = await fetch('https://slack.com/api/chat.postMessage', {
        body: JSON.stringify({
          channel: this.channelId,
          text,
        }),
        headers: {
          'Authorization': `Bearer ${this.botToken}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      const result = await response.json();

      if (!result.ok) {
        throw new Error(`Slack API error: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('[SlackService] Failed to send message:', error);
      throw error;
    }
  }
}
