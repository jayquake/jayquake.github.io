/**
 * Qase Metrics Collector
 * 
 * Tracks and reports metrics for Qase operations:
 * - Request counts (MCP vs REST)
 * - Rate limit incidents (429 responses)
 * - Operation durations
 * - Success/failure rates
 * - Path selection decisions
 */

import * as fs from 'fs';
import * as path from 'path';

export type MetricEvent = {
  duration?: number;
  error?: string;
  operation: 'apply' | 'query' | 'update';
  path: 'mcp' | 'rest';
  requestCount: number;
  status: 'failed' | 'rate_limited' | 'success';
  timestamp: string;
};

export type MetricsSummary = {
  mcp: PathMetrics;
  overall: OverallMetrics;
  period: {
    end: string;
    start: string;
  };
  rest: PathMetrics;
};

export type PathMetrics = {
  avgDuration: number;
  operations: {
    apply: number;
    query: number;
    update: number;
  };
  rateLimit429Count: number;
  requestCount: number;
  successRate: number;
  totalDuration: number;
  totalFailed: number;
  totalSuccess: number;
};

export type OverallMetrics = {
  mcpPreference: number; // Percentage of ops routed to MCP
  rateLimitReduction: number; // % reduction in 429s compared to baseline
  restPreference: number; // Percentage of ops routed to REST
  totalOperations: number;
  totalRequests: number;
};

export class QaseMetricsCollector {
  private events: MetricEvent[] = [];
  private metricsDir: string;
  private persistInterval: NodeJS.Timeout | null = null;

  constructor(metricsDir: string = './metrics') {
    this.metricsDir = metricsDir;
    this.ensureMetricsDir();
    this.loadPersistedEvents();
    this.startAutoPersist();
  }

  /**
   * Record a metric event
   */
  recordEvent(event: Omit<MetricEvent, 'timestamp'>): void {
    const fullEvent: MetricEvent = {
      ...event,
      timestamp: new Date().toISOString(),
    };

    this.events.push(fullEvent);

    // Persist immediately if rate limited
    if (event.status === 'rate_limited') {
      this.persist();
    }
  }

  /**
   * Get metrics summary for a time period
   */
  getSummary(startTime?: Date, endTime?: Date): MetricsSummary {
    const start = startTime || new Date(Date.now() - 24 * 60 * 60 * 1000); // Default: last 24h
    const end = endTime || new Date();

    const filteredEvents = this.events.filter((e) => {
      const eventTime = new Date(e.timestamp);
      return eventTime >= start && eventTime <= end;
    });

    const mcpEvents = filteredEvents.filter((e) => e.path === 'mcp');
    const restEvents = filteredEvents.filter((e) => e.path === 'rest');

    return {
      mcp: this.calculatePathMetrics(mcpEvents),
      overall: this.calculateOverallMetrics(filteredEvents, mcpEvents, restEvents),
      period: {
        end: end.toISOString(),
        start: start.toISOString(),
      },
      rest: this.calculatePathMetrics(restEvents),
    };
  }

  /**
   * Get recent rate limit incidents
   */
  getRecentRateLimits(hours: number = 1): MetricEvent[] {
    const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
    
    return this.events.filter((e) => {
      return e.status === 'rate_limited' && new Date(e.timestamp) >= cutoff;
    });
  }

  /**
   * Export metrics to JSON file
   */
  exportMetrics(outputPath: string, startTime?: Date, endTime?: Date): void {
    const summary = this.getSummary(startTime, endTime);
    fs.writeFileSync(outputPath, JSON.stringify(summary, null, 2), 'utf-8');
  }

  /**
   * Clear old events (older than specified days)
   */
  clearOldEvents(daysToKeep: number = 30): void {
    const cutoff = new Date(Date.now() - daysToKeep * 24 * 60 * 60 * 1000);
    
    this.events = this.events.filter((e) => {
      return new Date(e.timestamp) >= cutoff;
    });

    this.persist();
  }

  /**
   * Get event count by path
   */
  getPathDistribution(): { mcp: number; rest: number } {
    const mcpCount = this.events.filter((e) => e.path === 'mcp').length;
    const restCount = this.events.filter((e) => e.path === 'rest').length;

    return { mcp: mcpCount, rest: restCount };
  }

  /**
   * Stop auto-persist timer
   */
  stop(): void {
    if (this.persistInterval) {
      clearInterval(this.persistInterval);
      this.persistInterval = null;
    }
    this.persist();
  }

  /**
   * Calculate metrics for a specific path (MCP or REST)
   */
  private calculatePathMetrics(events: MetricEvent[]): PathMetrics {
    if (events.length === 0) {
      return {
        avgDuration: 0,
        operations: {
          apply: 0,
          query: 0,
          update: 0,
        },
        rateLimit429Count: 0,
        requestCount: 0,
        successRate: 0,
        totalDuration: 0,
        totalFailed: 0,
        totalSuccess: 0,
      };
    }

    const totalRequests = events.reduce((sum, e) => sum + e.requestCount, 0);
    const totalSuccess = events.filter((e) => e.status === 'success').length;
    const totalFailed = events.filter((e) => e.status === 'failed').length;
    const rateLimit429Count = events.filter((e) => e.status === 'rate_limited').length;

    const durations = events.filter((e) => e.duration !== undefined).map((e) => e.duration!);
    const totalDuration = durations.reduce((sum, d) => sum + d, 0);
    const avgDuration = durations.length > 0 ? totalDuration / durations.length : 0;

    const operations = {
      apply: events.filter((e) => e.operation === 'apply').length,
      query: events.filter((e) => e.operation === 'query').length,
      update: events.filter((e) => e.operation === 'update').length,
    };

    const successRate = events.length > 0 ? (totalSuccess / events.length) * 100 : 0;

    return {
      avgDuration,
      operations,
      rateLimit429Count,
      requestCount: totalRequests,
      successRate,
      totalDuration,
      totalFailed,
      totalSuccess,
    };
  }

  /**
   * Calculate overall metrics across both paths
   */
  private calculateOverallMetrics(
    allEvents: MetricEvent[],
    mcpEvents: MetricEvent[],
    restEvents: MetricEvent[],
  ): OverallMetrics {
    const totalOperations = allEvents.length;
    const totalRequests = allEvents.reduce((sum, e) => sum + e.requestCount, 0);

    const mcpPreference = totalOperations > 0 ? (mcpEvents.length / totalOperations) * 100 : 0;
    const restPreference = totalOperations > 0 ? (restEvents.length / totalOperations) * 100 : 0;

    // Calculate rate limit reduction (compared to REST-only baseline)
    // If REST has X rate limits and MCP has Y, reduction = ((X-Y)/X) * 100
    const restRateLimits = restEvents.filter((e) => e.status === 'rate_limited').length;
    const mcpRateLimits = mcpEvents.filter((e) => e.status === 'rate_limited').length;
    const totalRateLimits = restRateLimits + mcpRateLimits;
    
    // Assume baseline is if all ops used REST (theoretical)
    const theoreticalRestRateLimits = restEvents.length > 0 
      ? (totalOperations / restEvents.length) * restRateLimits 
      : 0;
    
    const rateLimitReduction = theoreticalRestRateLimits > 0
      ? ((theoreticalRestRateLimits - totalRateLimits) / theoreticalRestRateLimits) * 100
      : 0;

    return {
      mcpPreference,
      rateLimitReduction,
      restPreference,
      totalOperations,
      totalRequests,
    };
  }

  /**
   * Persist events to disk
   */
  private persist(): void {
    const filePath = path.join(this.metricsDir, 'events.json');
    fs.writeFileSync(filePath, JSON.stringify(this.events, null, 2), 'utf-8');
  }

  /**
   * Load persisted events from disk
   */
  private loadPersistedEvents(): void {
    const filePath = path.join(this.metricsDir, 'events.json');
    
    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        this.events = JSON.parse(content) as MetricEvent[];
      } catch (error) {
        console.warn('[QaseMetricsCollector] Failed to load persisted events:', error);
        this.events = [];
      }
    }
  }

  /**
   * Start auto-persist timer (every 5 minutes)
   */
  private startAutoPersist(): void {
    this.persistInterval = setInterval(() => {
      this.persist();
    }, 5 * 60 * 1000); // 5 minutes
  }

  /**
   * Ensure metrics directory exists
   */
  private ensureMetricsDir(): void {
    if (!fs.existsSync(this.metricsDir)) {
      fs.mkdirSync(this.metricsDir, { recursive: true });
    }
  }
}

// Singleton instance
let metricsCollectorInstance: QaseMetricsCollector | null = null;

export function getMetricsCollector(): QaseMetricsCollector {
  if (!metricsCollectorInstance) {
    metricsCollectorInstance = new QaseMetricsCollector();
  }
  return metricsCollectorInstance;
}
