/**
 * Library location: the single owner of what library URLs mean.
 *
 * Pure functions only (no React). Everything that reads or writes a library URL
 * goes through here: route grammar (engine + legacy, `_success` / `_failure`),
 * query state (`q`, filters, `detail`), and href building.
 *
 * URL grammar
 *   /                                  library home
 *   /engine/:ruleId                    engine rule (detail panel)
 *   /engine/:ruleId_(success|failure)  engine example page
 *   /:criteria/:route                  legacy rule page
 *   /:criteria/:route_(success|failure) legacy example page
 *
 * Query (defaults are omitted from URLs)
 *   q=<text>  category=<id>  impact=<critical|serious|moderate|minor>
 *   level=<A|AA|AAA>  wcag=<n.n.n>  legacy=<1|0>  detail=closed
 */
import ENGINE_RULE_CATEGORIES from "../data/engine-rule-categories";
import { CRITERIA_PREFIXES } from "../routes/criteriaPathUtils";

export const ALL = "all";

/** @typedef {'success' | 'failure'} ExampleVariant */
/** @typedef {{ category: string, impact: string, level: string, wcag: string, legacy: 'all'|'yes'|'no' }} LibraryFilters */
/** @typedef {{ q: string, filters: LibraryFilters, detailOpen: boolean }} LibraryQuery */
/** @typedef {{ type: 'engine', id: string } | { type: 'legacy', criteria: string, route: string }} RuleRef */

export const DEFAULT_FILTERS = Object.freeze({
  category: ALL,
  impact: ALL,
  level: ALL,
  wcag: ALL,
  legacy: ALL,
});

export const DEFAULT_QUERY = Object.freeze({ q: "", filters: DEFAULT_FILTERS, detailOpen: true });

export const FILTER_KEYS = Object.freeze(Object.keys(DEFAULT_FILTERS));

export const IMPACT_VALUES = Object.freeze(["critical", "serious", "moderate", "minor"]);
export const LEVEL_VALUES = Object.freeze(["A", "AA", "AAA"]);

const CATEGORY_IDS = new Set(ENGINE_RULE_CATEGORIES.map((c) => c.id));
const CRITERIA = new Set(CRITERIA_PREFIXES.map((p) => p.slice(1)));
const WCAG_ID = /^\d+(\.\d+){1,2}$/;
const VARIANT_SUFFIX = /^(.+)_(success|failure)$/;

// ── Route grammar ────────────────────────────────────────────────────────────

/**
 * Split a slug into rule id and optional example variant.
 * @param {string | undefined} slug
 * @returns {{ id: string, variant: ExampleVariant | null }}
 */
export function parseSlug(slug) {
  if (!slug) return { id: "", variant: null };
  const match = slug.match(VARIANT_SUFFIX);
  return match ? { id: match[1], variant: /** @type {ExampleVariant} */ (match[2]) } : { id: slug, variant: null };
}

/**
 * What page a pathname is, in library terms.
 * @param {string} pathname
 * @returns {{ kind: 'home' } | { kind: 'rule' | 'example', rule: RuleRef, variant: ExampleVariant | null } | { kind: 'other' }}
 */
export function parseRoute(pathname) {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  if (path === "/" || path === "" || path === "/engine/library") return { kind: "home" };

  const segments = path.split("/").filter(Boolean);
  if (segments.length !== 2) return { kind: "other" };
  const [first, second] = segments.map(safeDecode);
  const { id, variant } = parseSlug(second);
  if (!id) return { kind: "other" };

  /** @type {RuleRef | null} */
  let rule = null;
  if (first === "engine") rule = { type: "engine", id };
  else if (CRITERIA.has(first)) rule = { type: "legacy", criteria: first, route: id };
  if (!rule) return { kind: "other" };

  return { kind: variant ? "example" : "rule", rule, variant };
}

/** @param {RuleRef} rule */
export function ruleKey(rule) {
  return rule.type === "engine" ? rule.id : rule.route;
}

/** @param {RuleRef} rule */
export function rulePath(rule) {
  return rule.type === "engine"
    ? `/engine/${encodeURIComponent(rule.id)}`
    : `/${rule.criteria}/${encodeURIComponent(rule.route)}`;
}

/** @param {RuleRef} rule @param {ExampleVariant} variant */
export function examplePath(rule, variant) {
  return `${rulePath(rule)}_${variant}`;
}

/** Shorthand for the common engine case. */
export const engineRule = (id) => ({ type: "engine", id });

// ── Query state ──────────────────────────────────────────────────────────────

/**
 * Parse `?q=…&category=…` into library query state. Invalid values fall back to defaults.
 * @param {string | URLSearchParams} search
 * @returns {LibraryQuery}
 */
export function parseQuery(search) {
  const params = search instanceof URLSearchParams ? search : new URLSearchParams(search);
  const pick = (key, valid) => {
    const raw = params.get(key);
    return raw && valid(raw) ? raw : ALL;
  };
  const impactRaw = (params.get("impact") || "").toLowerCase();
  const levelRaw = (params.get("level") || "").toUpperCase();
  const legacyRaw = params.get("legacy");

  return {
    q: (params.get("q") || "").trim(),
    filters: {
      category: pick("category", (v) => CATEGORY_IDS.has(v)),
      impact: IMPACT_VALUES.includes(impactRaw) ? impactRaw : ALL,
      level: LEVEL_VALUES.includes(levelRaw) ? levelRaw : ALL,
      wcag: pick("wcag", (v) => WCAG_ID.test(v)),
      legacy: legacyRaw === "1" ? "yes" : legacyRaw === "0" ? "no" : ALL,
    },
    detailOpen: params.get("detail") !== "closed",
  };
}

/**
 * Serialize library query state, omitting defaults. Returns "" or "?…".
 * Params that are not library params (e.g. `rule-lab`'s own) are preserved from `base`.
 * @param {Partial<LibraryQuery>} query
 * @param {string | URLSearchParams} [base]
 */
export function serializeQuery(query, base = "") {
  const params = new URLSearchParams(base);
  for (const key of ["q", "detail", "legacy", ...FILTER_KEYS]) params.delete(key);

  const q = (query.q || "").trim();
  if (q) params.set("q", q);
  const filters = { ...DEFAULT_FILTERS, ...(query.filters || {}) };
  for (const key of FILTER_KEYS) {
    const value = filters[key];
    if (!value || value === ALL) continue;
    params.set(key, key === "legacy" ? (value === "yes" ? "1" : "0") : value);
  }
  if (query.detailOpen === false) params.set("detail", "closed");

  const out = params.toString();
  return out ? `?${out}` : "";
}

/** @param {LibraryFilters} filters */
export function activeFilterCount(filters) {
  return FILTER_KEYS.filter((k) => filters[k] && filters[k] !== ALL).length;
}

/**
 * Apply a change to query state. `filters` merges; everything else replaces.
 * @param {LibraryQuery} query
 * @param {{ q?: string, filters?: Partial<LibraryFilters>, detailOpen?: boolean }} change
 * @returns {LibraryQuery}
 */
export function applyChange(query, change) {
  return {
    q: change.q !== undefined ? change.q : query.q,
    filters: change.filters ? { ...query.filters, ...change.filters } : query.filters,
    detailOpen: change.detailOpen !== undefined ? change.detailOpen : query.detailOpen,
  };
}

// ── Hrefs ────────────────────────────────────────────────────────────────────
// Library links carry q + filters. Opening a rule resets `detail` (panel opens).

/** Search + filters only; drops `detail`. */
const carried = (query) => ({ q: query.q, filters: query.filters });

/** @param {LibraryQuery} query */
export function homeHref(query) {
  return `/${serializeQuery(carried(query))}`;
}

/** @param {RuleRef} rule @param {LibraryQuery} query */
export function ruleHref(rule, query) {
  return `${rulePath(rule)}${serializeQuery(carried(query))}`;
}

/** @param {RuleRef} rule @param {ExampleVariant} variant @param {LibraryQuery} query */
export function exampleHref(rule, variant, query) {
  return `${examplePath(rule, variant)}${serializeQuery(carried(query))}`;
}

/** Rule Lab is a separate tool: it does not carry library state. @param {RuleRef} rule */
export function ruleLabHref(rule) {
  const params = new URLSearchParams({ ruleId: ruleKey(rule), type: rule.type });
  return `/rule-lab?${params.toString()}`;
}

function safeDecode(segment) {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}
