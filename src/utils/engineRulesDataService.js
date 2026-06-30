/** Runtime fetch for engine rules — single searchable catalog JSON (like legacy data.json). */

const CATALOG_URL = `${process.env.PUBLIC_URL || ""}/engine-rules.json`;

let catalogPromise = null;
/** @type {{ rules: object[], byId: Record<string, object> } | null} */
let catalogCache = null;

function buildCacheFromPayload(data) {
  const byId = {};
  const rules = (data.rules || []).map((row) => {
    const rule = catalogRowToRule(row);
    byId[rule.id] = rule;
    return rule;
  });
  return { rules, byId };
}

/** Map catalog row → shape expected by library table + detail pane. */
export function catalogRowToRule(row) {
  return {
    id: row.id,
    kebabId: row.id,
    title: row.title,
    description: row.description || "",
    advice: row.advice || "",
    impact: row.impact || "",
    search: row.search || "",
    refs: row.refs || (row.wcag || []).map((w) => ({
      type: "WCAG",
      id: w.id,
      level: w.level || "",
      link: w.link || "",
    })),
  };
}

/** @deprecated use catalogRowToRule */
export function indexRowToRule(row) {
  return catalogRowToRule(row);
}

export function getEngineRulesCatalogCache() {
  return catalogCache;
}

/** Start fetch early (index.html preload + index.js boot). */
export function prefetchEngineRulesCatalog() {
  fetchEngineRulesCatalog().catch(() => {});
}

export function fetchEngineRulesCatalog() {
  if (catalogCache) {
    return Promise.resolve(catalogCache);
  }
  if (!catalogPromise) {
    catalogPromise = fetch(CATALOG_URL)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load engine-rules.json");
        return r.json();
      })
      .then((data) => {
        catalogCache = buildCacheFromPayload(data);
        return catalogCache;
      })
      .catch((err) => {
        catalogPromise = null;
        throw err;
      });
  }
  return catalogPromise;
}

/** Slim index — delegates to catalog (one network request). */
export function fetchEngineRulesIndex() {
  return fetchEngineRulesCatalog().then((c) => c.rules);
}

export function fetchEngineRuleById(id) {
  return fetchEngineRulesCatalog().then((c) => c.byId[id] ?? null);
}

/** Full metadata — same catalog; kept for API compatibility. */
export function fetchEngineRulesFull() {
  return fetchEngineRulesCatalog().then((c) => c.rules);
}

/** Clear cache (tests only). */
export function clearEngineRulesCatalogCache() {
  catalogPromise = null;
  catalogCache = null;
}
