/**
 * One false-positive store for example analyses.
 *
 * Shape: { [ruleId]: { [index]: { flagged, notes, issues: string[], timestamp } } }
 * - flagged/notes: the whole example is a false positive (was `rule-lab-false-positives`)
 * - issues: issue keys flagged individually in the audit panel (was `audit-issue-fps`)
 *
 * The two legacy keys are merged into the new key on first read and then removed.
 */

export const FP_STORE_KEY = 'example-false-positives';
export const LEGACY_EXAMPLE_FP_KEY = 'rule-lab-false-positives';
export const LEGACY_ISSUE_FP_KEY = 'audit-issue-fps';

export interface ExampleFalsePositive {
  flagged: boolean;
  notes: string;
  issues: string[];
  timestamp?: string;
}

type Store = Record<string, Record<string, ExampleFalsePositive>>;

interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

const EMPTY: ExampleFalsePositive = { flagged: false, notes: '', issues: [] };

function parse(storage: StorageLike, key: string): any {
  try {
    return JSON.parse(storage.getItem(key) || '{}') || {};
  } catch {
    return {};
  }
}

/** Merge the two legacy stores into the unified shape (pure). */
export function mergeLegacyStores(exampleFps: any, issueFps: any): Store {
  const out: Store = {};
  const entry = (ruleId: string, index: string) => {
    out[ruleId] = out[ruleId] || {};
    out[ruleId][index] = out[ruleId][index] || { ...EMPTY, issues: [] };
    return out[ruleId][index];
  };
  for (const [ruleId, byIndex] of Object.entries(exampleFps || {})) {
    for (const [index, v] of Object.entries((byIndex as any) || {})) {
      const e = entry(ruleId, index);
      e.flagged = Boolean((v as any)?.flagged);
      e.notes = (v as any)?.notes || '';
      if ((v as any)?.timestamp) e.timestamp = (v as any).timestamp;
    }
  }
  for (const [ruleId, byIndex] of Object.entries(issueFps || {})) {
    for (const [index, keys] of Object.entries((byIndex as any) || {})) {
      if (Array.isArray(keys)) entry(ruleId, index).issues = keys.map(String);
    }
  }
  return out;
}

export function loadStore(storage: StorageLike | null): Store {
  if (!storage) return {};
  const hasLegacy =
    storage.getItem(LEGACY_EXAMPLE_FP_KEY) !== null || storage.getItem(LEGACY_ISSUE_FP_KEY) !== null;
  const current = parse(storage, FP_STORE_KEY) as Store;
  if (!hasLegacy) return current;

  const legacy = mergeLegacyStores(parse(storage, LEGACY_EXAMPLE_FP_KEY), parse(storage, LEGACY_ISSUE_FP_KEY));
  // Entries already in the new store win over legacy ones.
  const merged: Store = { ...legacy };
  for (const [ruleId, byIndex] of Object.entries(current)) {
    merged[ruleId] = { ...(merged[ruleId] || {}), ...byIndex };
  }
  try {
    storage.setItem(FP_STORE_KEY, JSON.stringify(merged));
    storage.removeItem(LEGACY_EXAMPLE_FP_KEY);
    storage.removeItem(LEGACY_ISSUE_FP_KEY);
  } catch {
    /* storage full or unavailable: keep legacy keys */
  }
  return merged;
}

export function getFalsePositive(storage: StorageLike | null, ruleId: string, index: number): ExampleFalsePositive {
  const e = loadStore(storage)[ruleId]?.[String(index)];
  return e ? { ...EMPTY, ...e, issues: [...(e.issues || [])] } : { ...EMPTY, issues: [] };
}

export function setFalsePositive(
  storage: StorageLike | null,
  ruleId: string,
  index: number,
  patch: Partial<ExampleFalsePositive>
): ExampleFalsePositive {
  const store = loadStore(storage);
  const prev = store[ruleId]?.[String(index)] || { ...EMPTY, issues: [] };
  const next: ExampleFalsePositive = { ...prev, ...patch, timestamp: new Date().toISOString() };
  store[ruleId] = { ...(store[ruleId] || {}), [String(index)]: next };
  try {
    storage?.setItem(FP_STORE_KEY, JSON.stringify(store));
  } catch {
    /* ignore */
  }
  return next;
}
