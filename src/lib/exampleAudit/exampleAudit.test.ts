import { ANONYMOUS_RULE, createExampleAuditor } from '.';
import {
  FP_STORE_KEY,
  LEGACY_EXAMPLE_FP_KEY,
  LEGACY_ISSUE_FP_KEY,
  getFalsePositive,
  loadStore,
  mergeLegacyStores,
  setFalsePositive,
} from './falsePositives';

type R = { audit: string };

function setup(opts: { isStatic?: boolean; healthy?: boolean | null; backendThrows?: boolean; noBackend?: boolean } = {}) {
  const calls: string[] = [];
  const store = new Map<string, R>();
  const auditor = createExampleAuditor<R>({
    isStatic: () => Boolean(opts.isStatic),
    client: async (html) => {
      calls.push(`client:${html}`);
      return { audit: `c:${html}` };
    },
    backend: opts.noBackend
      ? undefined
      : {
          checkHealth: async () => {
            calls.push('health');
            if (opts.healthy === null) throw new Error('down');
            return { healthy: opts.healthy ?? true };
          },
          analyze: async (ruleId, ruleType, html, variant) => {
            calls.push(`backend:${ruleId}:${ruleType}:${variant}`);
            if (opts.backendThrows) throw new Error('500');
            return { audit: `b:${html}` };
          },
        },
    cache: {
      get: (ruleId, index, html) => store.get(`${ruleId}|${index}|${html}`) || null,
      set: (ruleId, index, html, result) => {
        calls.push(`cache:${ruleId}|${index}`);
        store.set(`${ruleId}|${index}|${html}`, result);
      },
    },
  });
  return { auditor, calls, store };
}

describe('createExampleAuditor', () => {
  test('static: client once, cached, then served from cache', async () => {
    const { auditor, calls } = setup({ isStatic: true });
    const first = await auditor({ ruleId: 'r', html: '<a>', index: 0 });
    const second = await auditor({ ruleId: 'r', html: '<a>', index: 0 });
    expect(first).toEqual({ audit: 'c:<a>', source: 'client' });
    expect(second).toEqual({ audit: 'c:<a>', source: 'client' });
    expect(calls).toEqual(['client:<a>', 'cache:r|0']);
  });

  test('backend healthy: backend result, not cached', async () => {
    const { auditor, calls } = setup();
    const res = await auditor({ ruleId: 'r', ruleType: 'legacy', variant: 'failure', html: 'x', index: 1 });
    expect(res).toEqual({ audit: 'b:x', source: 'mcp' });
    expect(calls).toEqual(['health', 'backend:r:legacy:failure']);
  });

  test('backend unhealthy: client and cache', async () => {
    const { auditor, calls } = setup({ healthy: false });
    expect((await auditor({ ruleId: 'r', html: 'x', index: 0 })).source).toBe('client');
    expect(calls).toEqual(['health', 'client:x', 'cache:r|0']);
  });

  test('health check error still tries the backend', async () => {
    const { auditor, calls } = setup({ healthy: null });
    expect((await auditor({ ruleId: 'r', html: 'x', index: 0 })).source).toBe('mcp');
    expect(calls).toEqual(['health', 'backend:r:engine:undefined']);
  });

  test('backend throws: client fallback, cached', async () => {
    const { auditor, calls } = setup({ backendThrows: true });
    expect((await auditor({ ruleId: 'r', html: 'x', index: 2 })).source).toBe('client');
    expect(calls).toContain('cache:r|2');
  });

  test('no index: never cached; missing rule id is anonymous', async () => {
    const { auditor, calls } = setup({ isStatic: true });
    await auditor({ html: 'x' });
    expect(calls).toEqual(['client:x']);
    const withIndex = setup({ isStatic: true });
    await withIndex.auditor({ html: 'x', index: 0 });
    expect(withIndex.calls).toContain(`cache:${ANONYMOUS_RULE}|0`);
  });

  test('no backend adapter behaves like static', async () => {
    const { auditor } = setup({ noBackend: true });
    expect((await auditor({ ruleId: 'r', html: 'x' })).source).toBe('client');
  });
});

function memory(initial: Record<string, unknown> = {}) {
  const data: Record<string, string> = {};
  for (const [k, v] of Object.entries(initial)) data[k] = JSON.stringify(v);
  return {
    data,
    getItem: (k: string) => (k in data ? data[k] : null),
    setItem: (k: string, v: string) => {
      data[k] = v;
    },
    removeItem: (k: string) => {
      delete data[k];
    },
  };
}

describe('false positives store', () => {
  const legacyExample = { r1: { 0: { flagged: true, notes: 'n', timestamp: 't' } } };
  const legacyIssues = { r1: { 0: ['k1'], 2: ['k2', 'k3'] }, r2: { 1: ['k4'] } };

  test('mergeLegacyStores combines both shapes', () => {
    expect(mergeLegacyStores(legacyExample, legacyIssues)).toEqual({
      r1: {
        0: { flagged: true, notes: 'n', issues: ['k1'], timestamp: 't' },
        2: { flagged: false, notes: '', issues: ['k2', 'k3'] },
      },
      r2: { 1: { flagged: false, notes: '', issues: ['k4'] } },
    });
  });

  test('loadStore migrates legacy keys once and removes them', () => {
    const s = memory({ [LEGACY_EXAMPLE_FP_KEY]: legacyExample, [LEGACY_ISSUE_FP_KEY]: legacyIssues });
    const store = loadStore(s);
    expect(store.r1['0'].issues).toEqual(['k1']);
    expect(s.data[LEGACY_EXAMPLE_FP_KEY]).toBeUndefined();
    expect(s.data[LEGACY_ISSUE_FP_KEY]).toBeUndefined();
    expect(JSON.parse(s.data[FP_STORE_KEY]).r2['1'].issues).toEqual(['k4']);
  });

  test('new entries win over legacy on migration', () => {
    const s = memory({
      [FP_STORE_KEY]: { r1: { 0: { flagged: false, notes: 'new', issues: [] } } },
      [LEGACY_EXAMPLE_FP_KEY]: legacyExample,
    });
    expect(getFalsePositive(s, 'r1', 0).notes).toBe('new');
  });

  test('set merges a patch and keeps the other fields', () => {
    const s = memory();
    setFalsePositive(s, 'r', 3, { flagged: true, notes: 'a' });
    setFalsePositive(s, 'r', 3, { issues: ['x'] });
    expect(getFalsePositive(s, 'r', 3)).toMatchObject({ flagged: true, notes: 'a', issues: ['x'] });
    expect(getFalsePositive(s, 'r', 4)).toEqual({ flagged: false, notes: '', issues: [] });
    expect(getFalsePositive(null, 'r', 3)).toEqual({ flagged: false, notes: '', issues: [] });
  });
});
