/**
 * Qase Hybrid Router
 * 
 * Routes operations between Qase MCP and REST paths based on:
 * - Operation type (query vs update)
 * - Request volume
 * - MCP availability
 * - Performance requirements
 * 
 * Policy:
 * - MCP preferred for: discovery, query, QQL search, low-volume targeted ops
 * - REST preferred for: bulk updates, high-throughput apply, resume/retry flows
 */

import type { QaseConfig, QueryResult, QuerySpec } from '../../../shared/types';

import { getMetricsCollector } from './QaseMetricsCollector';
import { QaseService } from './QaseService';

export type RoutingDecision = {
  metrics: {
    estimatedDuration: number;
    estimatedRequests: number;
  };
  path: 'mcp' | 'rest';
  reason: string;
};

export type HybridRouterConfig = {
  mcpAvailable: boolean;
  metricsEnabled: boolean; // Track metrics (default: true)
  preferMcpThreshold: number; // Max cases for MCP path (default: 50)
  restFallbackEnabled: boolean;
};

/**
 * Hybrid routing service for Qase operations
 */
export class QaseHybridRouter {
  private config: HybridRouterConfig;
  private metricsCollector;
  private qaseService: QaseService;

  constructor(config: Partial<HybridRouterConfig> = {}) {
    this.config = {
      mcpAvailable: config.mcpAvailable ?? false,
      metricsEnabled: config.metricsEnabled ?? true,
      preferMcpThreshold: config.preferMcpThreshold ?? 50,
      restFallbackEnabled: config.restFallbackEnabled ?? true,
    };
    this.qaseService = new QaseService();
    this.metricsCollector = getMetricsCollector();
  }

  /**
   * Determine routing path for query operation
   */
  routeQuery(spec: QuerySpec): RoutingDecision {
    const estimatedRequests = this.estimateQueryRequests(spec);
    const estimatedDuration = estimatedRequests * 1000; // ~1s per request with throttling

    // MCP not available → REST
    if (!this.config.mcpAvailable) {
      return {
        metrics: { estimatedDuration, estimatedRequests },
        path: 'rest',
        reason: 'MCP not available',
      };
    }

    // QQL search query → MCP (if supported)
    if (this.isQqlQuery(spec)) {
      return {
        metrics: { estimatedDuration, estimatedRequests },
        path: 'mcp',
        reason: 'QQL search best handled by MCP',
      };
    }

    // High-volume query → REST for better control
    const maxRecords = spec.maxRecords || 5000;
    if (maxRecords > this.config.preferMcpThreshold) {
      return {
        metrics: { estimatedDuration, estimatedRequests },
        path: 'rest',
        reason: `High volume (${maxRecords} > ${this.config.preferMcpThreshold}), using REST for throttle control`,
      };
    }

    // Low-volume, scoped query → MCP
    return {
      metrics: { estimatedDuration, estimatedRequests },
      path: 'mcp',
      reason: 'Low-volume scoped query, MCP preferred',
    };
  }

  /**
   * Determine routing path for update operation
   */
  routeUpdate(caseCount: number, operation: 'single' | 'bulk'): RoutingDecision {
    const estimatedRequests = caseCount;
    const estimatedDuration = Math.ceil(caseCount / 5) * 3000; // batch of 5, 3s delay

    // MCP not available → REST
    if (!this.config.mcpAvailable) {
      return {
        metrics: { estimatedDuration, estimatedRequests },
        path: 'rest',
        reason: 'MCP not available',
      };
    }

    // Bulk operations always use REST for proven throttling
    if (operation === 'bulk' || caseCount > this.config.preferMcpThreshold) {
      return {
        metrics: { estimatedDuration, estimatedRequests },
        path: 'rest',
        reason: `Bulk update (${caseCount} cases), using REST for proven batch control`,
      };
    }

    // Single or low-volume update → MCP
    return {
      metrics: { estimatedDuration, estimatedRequests },
      path: 'mcp',
      reason: `Low-volume update (${caseCount} ≤ ${this.config.preferMcpThreshold}), MCP acceptable`,
    };
  }

  /**
   * Execute query with hybrid routing
   */
  async executeQuery(spec: QuerySpec, qaseConfig: QaseConfig): Promise<{
    decision: RoutingDecision;
    result: QueryResult;
  }> {
    const decision = this.routeQuery(spec);
    const startTime = Date.now();

    console.log(`[QaseHybridRouter] Query routed to: ${decision.path.toUpperCase()}`);
    console.log(`[QaseHybridRouter] Reason: ${decision.reason}`);
    console.log(`[QaseHybridRouter] Estimated: ${decision.metrics.estimatedRequests} requests, ~${Math.ceil(decision.metrics.estimatedDuration / 1000)}s`);

    let result: QueryResult;
    let status: 'failed' | 'rate_limited' | 'success' = 'success';
    let actualPath = decision.path;

    try {
      if (decision.path === 'mcp') {
        // TODO: Implement MCP query path when MCP server is configured
        console.warn('[QaseHybridRouter] ⚠️ MCP path not yet implemented, falling back to REST');
        actualPath = 'rest';
        result = await this.qaseService.queryTestCases(spec);
      } else {
        // REST path (current implementation)
        result = await this.qaseService.queryTestCases(spec);
      }
    } catch (error: any) {
      status = error.response?.status === 429 ? 'rate_limited' : 'failed';
      
      // Record metric
      if (this.config.metricsEnabled) {
        this.metricsCollector.recordEvent({
          duration: Date.now() - startTime,
          error: error.message,
          operation: 'query',
          path: actualPath,
          requestCount: decision.metrics.estimatedRequests,
          status,
        });
      }

      throw error;
    }

    // Record successful metric
    if (this.config.metricsEnabled) {
      this.metricsCollector.recordEvent({
        duration: Date.now() - startTime,
        operation: 'query',
        path: actualPath,
        requestCount: result.diagnostics.pagesFetched,
        status,
      });
    }

    return { decision: { ...decision, path: actualPath }, result };
  }

  /**
   * Execute update with hybrid routing
   */
  async executeUpdate(
    caseId: number,
    payload: any,
    qaseConfig: QaseConfig,
    operation: 'single' | 'bulk' = 'single',
  ): Promise<{
    decision: RoutingDecision;
    result: any;
  }> {
    const decision = this.routeUpdate(1, operation);
    const startTime = Date.now();

    console.log(`[QaseHybridRouter] Update routed to: ${decision.path.toUpperCase()}`);
    console.log(`[QaseHybridRouter] Reason: ${decision.reason}`);

    let result: any;
    let status: 'failed' | 'rate_limited' | 'success' = 'success';
    let actualPath = decision.path;

    try {
      if (decision.path === 'mcp') {
        // TODO: Implement MCP update path when MCP server is configured
        console.warn('[QaseHybridRouter] ⚠️ MCP path not yet implemented, falling back to REST');
        actualPath = 'rest';
        result = await this.qaseService.updateTestCase(qaseConfig, caseId, payload);
      } else {
        // REST path (current implementation)
        result = await this.qaseService.updateTestCase(qaseConfig, caseId, payload);
      }
    } catch (error: any) {
      status = error.response?.status === 429 ? 'rate_limited' : 'failed';
      
      // Record metric
      if (this.config.metricsEnabled) {
        this.metricsCollector.recordEvent({
          duration: Date.now() - startTime,
          error: error.message,
          operation: 'update',
          path: actualPath,
          requestCount: 1,
          status,
        });
      }

      throw error;
    }

    // Record successful metric
    if (this.config.metricsEnabled) {
      this.metricsCollector.recordEvent({
        duration: Date.now() - startTime,
        operation: 'update',
        path: actualPath,
        requestCount: 1,
        status,
      });
    }

    return { decision: { ...decision, path: actualPath }, result };
  }

  /**
   * Check if query spec suggests QQL usage
   */
  private isQqlQuery(spec: QuerySpec): boolean {
    // QQL is beneficial for complex multi-field queries
    const filterCount =
      (spec.suiteIds ? 1 : 0) +
      (spec.ids ? 1 : 0) +
      (spec.automation ? 1 : 0) +
      (spec.status ? 1 : 0) +
      (spec.tagsAny ? 1 : 0);

    // 3+ filters → QQL could be more efficient
    return filterCount >= 3;
  }

  /**
   * Estimate API requests for a query
   */
  private estimateQueryRequests(spec: QuerySpec): number {
    const maxRecords = spec.maxRecords || 5000;
    const limit = spec.limit || 100;
    return Math.ceil(maxRecords / limit);
  }

  /**
   * Update router configuration
   */
  updateConfig(config: Partial<HybridRouterConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Get current configuration
   */
  getConfig(): HybridRouterConfig {
    return { ...this.config };
  }
}
