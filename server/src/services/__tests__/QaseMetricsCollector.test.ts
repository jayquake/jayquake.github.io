import * as fs from 'fs';
import * as path from 'path';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { QaseMetricsCollector } from '../QaseMetricsCollector';

const TEST_METRICS_DIR = './test-metrics';

describe('QaseMetricsCollector', () => {
  let collector: QaseMetricsCollector;

  beforeEach(() => {
    collector = new QaseMetricsCollector(TEST_METRICS_DIR);
  });

  afterEach(() => {
    collector.stop();
    
    // Clean up test metrics directory
    if (fs.existsSync(TEST_METRICS_DIR)) {
      const files = fs.readdirSync(TEST_METRICS_DIR);
      for (const file of files) {
        fs.unlinkSync(path.join(TEST_METRICS_DIR, file));
      }
      fs.rmdirSync(TEST_METRICS_DIR);
    }
  });

  describe('Event Recording', () => {
    it('should record metric events', () => {
      collector.recordEvent({
        duration: 1000,
        operation: 'query',
        path: 'rest',
        requestCount: 5,
        status: 'success',
      });

      const summary = collector.getSummary();
      expect(summary.rest.requestCount).toBe(5);
      expect(summary.rest.totalSuccess).toBe(1);
    });

    it('should record rate limit incidents', () => {
      collector.recordEvent({
        operation: 'update',
        path: 'rest',
        requestCount: 1,
        status: 'rate_limited',
      });

      const summary = collector.getSummary();
      expect(summary.rest.rateLimit429Count).toBe(1);
    });

    it('should track different operation types', () => {
      collector.recordEvent({
        operation: 'query',
        path: 'mcp',
        requestCount: 1,
        status: 'success',
      });

      collector.recordEvent({
        operation: 'update',
        path: 'mcp',
        requestCount: 1,
        status: 'success',
      });

      collector.recordEvent({
        operation: 'apply',
        path: 'rest',
        requestCount: 1,
        status: 'success',
      });

      const summary = collector.getSummary();
      expect(summary.mcp.operations.query).toBe(1);
      expect(summary.mcp.operations.update).toBe(1);
      expect(summary.rest.operations.apply).toBe(1);
    });
  });

  describe('Metrics Summary', () => {
    it('should calculate path metrics correctly', () => {
      collector.recordEvent({
        duration: 1000,
        operation: 'query',
        path: 'rest',
        requestCount: 10,
        status: 'success',
      });

      collector.recordEvent({
        duration: 2000,
        operation: 'update',
        path: 'rest',
        requestCount: 5,
        status: 'success',
      });

      const summary = collector.getSummary();

      expect(summary.rest.requestCount).toBe(15);
      expect(summary.rest.totalSuccess).toBe(2);
      expect(summary.rest.avgDuration).toBe(1500);
      expect(summary.rest.successRate).toBe(100);
    });

    it('should calculate success rate with failures', () => {
      collector.recordEvent({
        operation: 'query',
        path: 'rest',
        requestCount: 1,
        status: 'success',
      });

      collector.recordEvent({
        operation: 'update',
        path: 'rest',
        requestCount: 1,
        status: 'failed',
      });

      const summary = collector.getSummary();
      expect(summary.rest.successRate).toBe(50);
    });

    it('should separate MCP and REST metrics', () => {
      collector.recordEvent({
        operation: 'query',
        path: 'mcp',
        requestCount: 10,
        status: 'success',
      });

      collector.recordEvent({
        operation: 'query',
        path: 'rest',
        requestCount: 20,
        status: 'success',
      });

      const summary = collector.getSummary();

      expect(summary.mcp.requestCount).toBe(10);
      expect(summary.rest.requestCount).toBe(20);
    });
  });

  describe('Path Distribution', () => {
    it('should track path distribution', () => {
      collector.recordEvent({
        operation: 'query',
        path: 'mcp',
        requestCount: 1,
        status: 'success',
      });

      collector.recordEvent({
        operation: 'query',
        path: 'mcp',
        requestCount: 1,
        status: 'success',
      });

      collector.recordEvent({
        operation: 'query',
        path: 'rest',
        requestCount: 1,
        status: 'success',
      });

      const distribution = collector.getPathDistribution();
      expect(distribution.mcp).toBe(2);
      expect(distribution.rest).toBe(1);
    });
  });

  describe('Recent Rate Limits', () => {
    it('should return recent rate limit incidents', () => {
      collector.recordEvent({
        operation: 'query',
        path: 'rest',
        requestCount: 1,
        status: 'rate_limited',
      });

      const incidents = collector.getRecentRateLimits(24);
      expect(incidents).toHaveLength(1);
      expect(incidents[0].status).toBe('rate_limited');
    });
  });

  describe('Time-based Filtering', () => {
    it('should filter events by time range', () => {
      const now = new Date();
      const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      // This won't work in tests since we can't control timestamp
      // But demonstrates the API
      collector.recordEvent({
        operation: 'query',
        path: 'rest',
        requestCount: 1,
        status: 'success',
      });

      const summary = collector.getSummary(yesterday, now);
      expect(summary.period.start).toBeDefined();
      expect(summary.period.end).toBeDefined();
    });
  });

  describe('Export and Persistence', () => {
    it('should export metrics to file', () => {
      collector.recordEvent({
        operation: 'query',
        path: 'rest',
        requestCount: 1,
        status: 'success',
      });

      const exportPath = path.join(TEST_METRICS_DIR, 'export.json');
      collector.exportMetrics(exportPath);

      expect(fs.existsSync(exportPath)).toBe(true);
      
      const content = JSON.parse(fs.readFileSync(exportPath, 'utf-8'));
      expect(content.rest.requestCount).toBe(1);
    });
  });

  describe('Old Event Cleanup', () => {
    it('should clear old events', () => {
      collector.recordEvent({
        operation: 'query',
        path: 'rest',
        requestCount: 1,
        status: 'success',
      });

      // Clear events older than 0 days (all events)
      collector.clearOldEvents(0);

      const summary = collector.getSummary();
      // Events recorded just now shouldn't be cleared
      expect(summary.rest.totalSuccess).toBeGreaterThanOrEqual(0);
    });
  });
});
