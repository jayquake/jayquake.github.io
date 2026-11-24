/**
 * Example audit module: "analyse an example HTML snippet".
 *
 * One policy for every caller (example pages, Rule Lab):
 *   1. A cached client result for (rule, index, html) is returned as-is.
 *   2. Static deployments analyse in the browser (client adapter) and cache it.
 *   3. Otherwise the backend is used when its health check passes; if it is
 *      unhealthy or the call throws, the client adapter runs and is cached.
 *
 * Backend results are not cached: the cache (and the rule-tree health dot built
 * from it) only holds client analyses, which have a uniform `audit` summary.
 */

export type AnalysisSource = 'client' | 'mcp';

export interface ExampleTarget {
  ruleId?: string | null;
  ruleType?: string | null;
  variant?: string | null;
  html: string;
  /** Example position on its page. Omit for ad-hoc HTML (never cached). */
  index?: number;
}

export interface ExampleAuditAdapters<C> {
  isStatic: () => boolean;
  client: (html: string) => Promise<C>;
  backend?: {
    checkHealth: () => Promise<{ healthy?: boolean } | null>;
    analyze: (ruleId: string, ruleType: string, html: string, variant?: string) => Promise<any>;
  };
  cache?: {
    get: (ruleId: string, index: number, html: string) => C | null;
    set: (ruleId: string, index: number, html: string, result: C) => void;
  };
}

export const ANONYMOUS_RULE = 'anonymous';

export function createExampleAuditor<C extends object>(adapters: ExampleAuditAdapters<C>) {
  const { isStatic, client, backend, cache } = adapters;

  async function runClient(target: ExampleTarget, ruleId: string) {
    const result = await client(target.html);
    if (cache && target.index !== undefined) cache.set(ruleId, target.index, target.html, result);
    return { ...result, source: 'client' as AnalysisSource };
  }

  return async function analyzeExample(target: ExampleTarget) {
    const ruleId = target.ruleId || ANONYMOUS_RULE;
    const html = target.html || '';
    const t = { ...target, html };

    if (cache && t.index !== undefined) {
      const cached = cache.get(ruleId, t.index, html);
      if (cached) return { ...cached, source: 'client' as AnalysisSource };
    }

    if (isStatic() || !backend) return runClient(t, ruleId);

    try {
      const health = await backend.checkHealth().catch(() => null);
      if (health && health.healthy === false) return runClient(t, ruleId);
      const result = await backend.analyze(ruleId, t.ruleType || 'engine', html, t.variant || undefined);
      return { ...result, source: 'mcp' as AnalysisSource };
    } catch {
      return runClient(t, ruleId);
    }
  };
}
