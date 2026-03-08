import type { ClientAnalysisResult } from './clientAccessibilityTree';

const CACHE_PREFIX = 'audit-analysis-';
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

function contentHash(str: string): string {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return h.toString(36);
}

function cacheKey(ruleId: string, index: number, html: string): string {
  return `${CACHE_PREFIX}${ruleId}-${index}-${contentHash(html)}`;
}

export function getCachedAnalysis(
  ruleId: string,
  index: number,
  html: string,
): ClientAnalysisResult | null {
  try {
    const raw = localStorage.getItem(cacheKey(ruleId, index, html));
    if (!raw) return null;
    const { result, ts } = JSON.parse(raw);
    if (Date.now() - ts > MAX_AGE_MS) {
      localStorage.removeItem(cacheKey(ruleId, index, html));
      return null;
    }
    return result;
  } catch {
    return null;
  }
}

export function cacheAnalysis(
  ruleId: string,
  index: number,
  html: string,
  result: ClientAnalysisResult,
): void {
  try {
    const key = cacheKey(ruleId, index, html);
    localStorage.setItem(key, JSON.stringify({ result, ts: Date.now() }));
  } catch {
    // localStorage full -- evict oldest entries
    try {
      const keys: Array<{ key: string; ts: number }> = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(CACHE_PREFIX)) {
          try {
            const { ts } = JSON.parse(localStorage.getItem(k) || '{}');
            keys.push({ key: k, ts: ts || 0 });
          } catch {
            keys.push({ key: k, ts: 0 });
          }
        }
      }
      keys.sort((a, b) => a.ts - b.ts);
      const toRemove = Math.max(1, Math.floor(keys.length / 4));
      for (let i = 0; i < toRemove; i++) {
        localStorage.removeItem(keys[i].key);
      }
      // Retry
      localStorage.setItem(
        cacheKey(ruleId, index, html),
        JSON.stringify({ result, ts: Date.now() }),
      );
    } catch {
      // Still full -- give up silently
    }
  }
}

export interface CachedRuleSummary {
  ruleId: string;
  results: ClientAnalysisResult[];
  totalIssues: { critical: number; serious: number; moderate: number; minor: number };
}

export function getAllCachedResults(): Map<string, ClientAnalysisResult[]> {
  const map = new Map<string, ClientAnalysisResult[]>();
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith(CACHE_PREFIX)) continue;
      try {
        const { result, ts } = JSON.parse(localStorage.getItem(key) || '{}');
        if (!result || (Date.now() - ts > MAX_AGE_MS)) continue;
        // Extract ruleId from key: audit-analysis-{ruleId}-{index}-{hash}
        const rest = key.slice(CACHE_PREFIX.length);
        const lastDash = rest.lastIndexOf('-');
        const secondLastDash = rest.lastIndexOf('-', lastDash - 1);
        const ruleId = rest.slice(0, secondLastDash);
        if (!ruleId) continue;
        if (!map.has(ruleId)) map.set(ruleId, []);
        map.get(ruleId)!.push(result);
      } catch {
        continue;
      }
    }
  } catch {
    // localStorage not available
  }
  return map;
}

export function getRuleSummary(ruleId: string): CachedRuleSummary | null {
  const all = getAllCachedResults();
  const results = all.get(ruleId);
  if (!results || results.length === 0) return null;

  const totalIssues = { critical: 0, serious: 0, moderate: 0, minor: 0 };
  for (const r of results) {
    if (r.audit) {
      totalIssues.critical += r.audit.summary.critical;
      totalIssues.serious += r.audit.summary.serious;
      totalIssues.moderate += r.audit.summary.moderate;
      totalIssues.minor += r.audit.summary.minor;
    }
  }

  return { ruleId, results, totalIssues };
}

export function clearCache(): void {
  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(CACHE_PREFIX)) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach(k => localStorage.removeItem(k));
}
