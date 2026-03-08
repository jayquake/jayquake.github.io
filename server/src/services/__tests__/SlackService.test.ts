import { describe, expect, it } from 'vitest';

import type { TestRunNotificationData } from '../SlackService';

import { SlackService } from '../SlackService';

describe('SlackService', () => {
  describe('isConfigured', () => {
    it('should return false when disabled', () => {
      const service = new SlackService({
        botToken: 'xoxb-test-token',
        channelId: 'C12345',
        enabled: false,
      });

      expect(service.isConfigured()).toBe(false);
    });

    it('should return false when bot token is missing', () => {
      const service = new SlackService({
        botToken: '',
        channelId: 'C12345',
        enabled: true,
      });

      expect(service.isConfigured()).toBe(false);
    });

    it('should return false when channel ID is missing', () => {
      const service = new SlackService({
        botToken: 'xoxb-test-token',
        channelId: '',
        enabled: true,
      });

      expect(service.isConfigured()).toBe(false);
    });

    it('should return true when properly configured', () => {
      const service = new SlackService({
        botToken: 'xoxb-test-token',
        channelId: 'C12345',
        enabled: true,
      });

      expect(service.isConfigured()).toBe(true);
    });
  });

  describe('sendTestResults', () => {
    it('should throw error when not configured', async () => {
      const service = new SlackService({
        botToken: '',
        channelId: '',
        enabled: false,
      });

      const testData: TestRunNotificationData = {
        baseUrl: 'https://example.com',
        duration: 45000,
        endTime: new Date().toISOString(),
        projectId: 'test-project',
        runId: 'run-123',
        startTime: new Date().toISOString(),
        status: 'completed',
        summary: {
          failed: 2,
          getSuccessRate: () => 80,
          passed: 8,
          skipped: 0,
          toJSON: () => ({ failed: 2, passed: 8, skipped: 0, total: 10 }),
          total: 10,
        },
      };

      await expect(service.sendTestResults(testData)).rejects.toThrow(
        'Slack integration is not configured'
      );
    });
  });

  describe('sendSimpleMessage', () => {
    it('should throw error when not configured', async () => {
      const service = new SlackService({
        botToken: '',
        channelId: '',
        enabled: false,
      });

      await expect(service.sendSimpleMessage('Test message')).rejects.toThrow(
        'Slack integration is not configured'
      );
    });
  });
});
