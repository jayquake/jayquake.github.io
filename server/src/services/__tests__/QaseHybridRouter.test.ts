import { describe, expect, it } from 'vitest';

import type { QuerySpec } from '../../../../shared/types';

import { QaseHybridRouter } from '../QaseHybridRouter';

describe('QaseHybridRouter', () => {
  describe('Query Routing', () => {
    it('should route to REST when MCP unavailable', () => {
      const router = new QaseHybridRouter({ mcpAvailable: false });
      const spec: QuerySpec = {
        projectCode: 'ACCESSFLOW',
        titleContains: 'Test',
      };

      const decision = router.routeQuery(spec);

      expect(decision.path).toBe('rest');
      expect(decision.reason).toContain('MCP not available');
    });

    it('should route high-volume queries to REST', () => {
      const router = new QaseHybridRouter({
        mcpAvailable: true,
        preferMcpThreshold: 50,
      });

      const spec: QuerySpec = {
        maxRecords: 200,
        projectCode: 'ACCESSFLOW',
        titleContains: 'Test',
      };

      const decision = router.routeQuery(spec);

      expect(decision.path).toBe('rest');
      expect(decision.reason).toContain('High volume');
    });

    it('should route low-volume queries to MCP', () => {
      const router = new QaseHybridRouter({
        mcpAvailable: true,
        preferMcpThreshold: 100,
      });

      const spec: QuerySpec = {
        ids: [1, 2, 3],
        maxRecords: 10,
        projectCode: 'ACCESSFLOW',
      };

      const decision = router.routeQuery(spec);

      expect(decision.path).toBe('mcp');
      expect(decision.reason).toContain('Low-volume');
    });

    it('should prefer MCP for QQL-style queries', () => {
      const router = new QaseHybridRouter({
        mcpAvailable: true,
        preferMcpThreshold: 50,
      });

      const spec: QuerySpec = {
        automation: [1],
        maxRecords: 30,
        projectCode: 'ACCESSFLOW',
        status: [0],
        suiteIds: [856],
        tagsAny: ['regression'],
      };

      const decision = router.routeQuery(spec);

      expect(decision.path).toBe('mcp');
      expect(decision.reason).toContain('QQL');
    });

    it('should estimate query requests correctly', () => {
      const router = new QaseHybridRouter();
      
      const spec: QuerySpec = {
        limit: 100,
        maxRecords: 500,
        projectCode: 'ACCESSFLOW',
        titleContains: 'Test',
      };

      const decision = router.routeQuery(spec);

      expect(decision.metrics.estimatedRequests).toBe(5); // 500/100
    });
  });

  describe('Update Routing', () => {
    it('should route bulk updates to REST', () => {
      const router = new QaseHybridRouter({ mcpAvailable: true });
      
      const decision = router.routeUpdate(75, 'bulk');

      expect(decision.path).toBe('rest');
      expect(decision.reason).toContain('Bulk update');
    });

    it('should route high-count updates to REST', () => {
      const router = new QaseHybridRouter({
        mcpAvailable: true,
        preferMcpThreshold: 50,
      });

      const decision = router.routeUpdate(100, 'single');

      expect(decision.path).toBe('rest');
      expect(decision.reason).toContain('Bulk update');
    });

    it('should route low-count updates to MCP', () => {
      const router = new QaseHybridRouter({
        mcpAvailable: true,
        preferMcpThreshold: 50,
      });

      const decision = router.routeUpdate(5, 'single');

      expect(decision.path).toBe('mcp');
      expect(decision.reason).toContain('Low-volume');
    });

    it('should fallback to REST when MCP unavailable', () => {
      const router = new QaseHybridRouter({ mcpAvailable: false });

      const decision = router.routeUpdate(1, 'single');

      expect(decision.path).toBe('rest');
      expect(decision.reason).toContain('MCP not available');
    });
  });

  describe('Configuration', () => {
    it('should allow runtime config updates', () => {
      const router = new QaseHybridRouter({ mcpAvailable: false });

      expect(router.getConfig().mcpAvailable).toBe(false);

      router.updateConfig({ mcpAvailable: true });

      expect(router.getConfig().mcpAvailable).toBe(true);
    });

    it('should use default threshold', () => {
      const router = new QaseHybridRouter();

      expect(router.getConfig().preferMcpThreshold).toBe(50);
    });

    it('should allow custom threshold', () => {
      const router = new QaseHybridRouter({ preferMcpThreshold: 100 });

      expect(router.getConfig().preferMcpThreshold).toBe(100);
    });
  });
});
