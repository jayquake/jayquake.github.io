/** Runtime fetch for engine rules — single searchable catalog JSON. */

const {
  normalizeRule,
  indexById,
  query: catalogQuery,
  isPopulated,
} = require("../lib/rulesCatalog");

const CATALOG_URL = `${process.env.PUBLIC_URL || ""}/engine-rules.json`;

let catalogPromise = null;
/** @type {{ rules: object[], byId: Record<string, object>, populated: object[] } | null} */
let catalogCache = null;

function buildCacheFromPayload(data) {
  const rules = (data.rules || []).map((row) => normalizeRule(row));
  return {
    rules,
    populated: rules.filter(isPopulated),
    byId: indexById(rules),
  };
}

/** @deprecated use normalizeRule from rulesCatalog */
export function catalogRowToRule(row) {
  return normalizeRule(row);
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

/** Slim index — populated rules only (library / tree). */
export function fetchEngineRulesIndex() {
  return fetchEngineRulesCatalog().then((c) => c.populated);
}

export function fetchEngineRuleById(id) {
  return fetchEngineRulesCatalog().then((c) => c.byId[id] ?? null);
}

/** Full catalog including stubs. */
export function fetchEngineRulesFull() {
  return fetchEngineRulesCatalog().then((c) => c.rules);
}

export function queryEngineRules(libraryQuery, opts) {
  return fetchEngineRulesCatalog().then((c) =>
    catalogQuery(c.rules, libraryQuery, opts)
  );
}

/** Clear cache (tests only). */
export function clearEngineRulesCatalogCache() {
  catalogPromise = null;
  catalogCache = null;
}
