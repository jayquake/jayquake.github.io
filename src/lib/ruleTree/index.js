/**
 * Rule tree model: a pure description of the sidebar rule tree.
 *
 * Inputs are the catalog, the legacy rules, the search, the library location, the
 * expanded state and the rule health. The output is plain nodes; the view in
 * src/components/layout/RuleTreeSidebar only renders them.
 *
 * Node keys double as expanded-state keys: `tier-<tier>`, `cat-<tier>-<category>`,
 * `rule-<tier>-<ruleId>`. Only tier and category keys are persisted.
 */
import { engineRule, ruleKey } from "../libraryLocation";
import { legacyCriteriaColor } from "./legacyCriteriaColors";

export const TIER_ENGINE = "engine";
export const TIER_LEGACY = "legacy";

/** Leaf actions shown under an open rule. Rule Lab replaces the old duplicate "MCP Debug". */
export const RULE_ACTIONS = [
  { key: "success", label: "Success examples" },
  { key: "failure", label: "Failure examples" },
  { key: "rule-lab", label: "Rule Lab" },
];

export const EXPANDED_STORAGE_KEY = "ruleTreeExpanded";
export const DEFAULT_EXPANDED = Object.freeze({ "tier-engine": true });

const PERSISTED_KEY = /^(tier|cat)-/;

export const tierKey = (tier) => `tier-${tier}`;
export const categoryKey = (tier, categoryId) => `cat-${tier}-${categoryId}`;
export const ruleNodeKey = (tier, ruleId) => `rule-${tier}-${ruleId}`;

// ── Expanded state persistence ──────────────────────────────────────────────

function persistable(state) {
  const out = {};
  for (const [key, value] of Object.entries(state || {})) {
    if (PERSISTED_KEY.test(key)) out[key] = Boolean(value);
  }
  return out;
}

/** Load tier/category expansion. Stored `rule-*` keys (older format) are dropped. */
export function loadExpanded(storage) {
  try {
    const raw = storage?.getItem(EXPANDED_STORAGE_KEY);
    return { ...DEFAULT_EXPANDED, ...(raw ? persistable(JSON.parse(raw)) : {}) };
  } catch {
    return { ...DEFAULT_EXPANDED };
  }
}

export function saveExpanded(storage, state) {
  try {
    storage?.setItem(EXPANDED_STORAGE_KEY, JSON.stringify(persistable(state)));
  } catch {
    /* storage full or unavailable */
  }
}

// ── Active rule ─────────────────────────────────────────────────────────────

/** The active rule ref for a library route, or null. */
export function activeRuleOf(route) {
  return route && (route.kind === "rule" || route.kind === "example") ? route.rule : null;
}

/**
 * Tier and category keys that must be expanded so the active rule is visible.
 * @returns {string[]}
 */
export function activeAncestors(activeRule, engineCategories) {
  if (!activeRule) return [];
  if (activeRule.type === "engine") {
    const category = engineCategories.find((cat) => cat.rules.includes(activeRule.id));
    return category ? [tierKey(TIER_ENGINE), categoryKey(TIER_ENGINE, category.id)] : [];
  }
  return [tierKey(TIER_LEGACY), categoryKey(TIER_LEGACY, activeRule.criteria)];
}

function isSameRule(activeRule, ref) {
  if (!activeRule || activeRule.type !== ref.type) return false;
  if (ruleKey(activeRule) !== ruleKey(ref)) return false;
  return ref.type === "engine" || activeRule.criteria === ref.criteria;
}

// ── Health ──────────────────────────────────────────────────────────────────

/**
 * Reduce cached analysis results to a per-rule health status.
 * red: any critical/serious; yellow: only moderate/minor; green: no issues.
 * @param {Map<string, Array<{audit?: {summary: Record<string, number>}}>>} results
 * @returns {Record<string, "red"|"yellow"|"green">}
 */
export function healthFromResults(results) {
  const map = {};
  for (const [ruleId, list] of results.entries()) {
    let status = "green";
    for (const r of list) {
      const s = r?.audit?.summary;
      if (!s) continue;
      if (s.critical > 0 || s.serious > 0) {
        status = "red";
        break;
      }
      if (s.moderate > 0 || s.minor > 0) status = "yellow";
    }
    map[ruleId] = status;
  }
  return map;
}

// ── Tree ────────────────────────────────────────────────────────────────────

function ruleActions(ref, hrefs, location) {
  const paths = {
    success: hrefs.example(ref, "success"),
    failure: hrefs.example(ref, "failure"),
    "rule-lab": hrefs.ruleLab(ref),
  };
  return RULE_ACTIONS.map((action) => {
    const href = paths[action.key];
    const active =
      action.key === "rule-lab"
        ? location.pathname + location.search === href
        : location.pathname === href.split("?")[0];
    return { ...action, href, active };
  });
}

function ruleNode({ tier, ref, label, title, ctx }) {
  const id = ruleKey(ref);
  const key = ruleNodeKey(tier, id);
  const active = isSameRule(ctx.activeRule, ref);
  const open = ctx.openRules.has(key);
  return {
    key,
    id,
    type: ref.type,
    ref,
    label,
    title,
    href: ctx.hrefs.rule(ref),
    active,
    open,
    showActions: open || active,
    health: ctx.health[id] || "gray",
    actions: ctx.location ? ruleActions(ref, ctx.hrefs, ctx.location) : [],
  };
}

function categoryNode({ tier, id, label, color, icon, rules, ctx }) {
  const key = categoryKey(tier, id);
  return {
    key,
    id,
    label,
    color,
    icon,
    count: rules.length,
    expanded: Boolean(ctx.expanded[key]),
    rules,
  };
}

function legacyLabel(slug) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

/** Legacy criteria in configured order; criteria missing from the entries go last, alphabetically. */
export function orderLegacyCriteria(legacyRules, entries = []) {
  const grouped = new Map();
  for (const rule of legacyRules) {
    const criteria = (rule.criteria || "uncategorized").toLowerCase();
    if (!grouped.has(criteria)) grouped.set(criteria, []);
    grouped.get(criteria).push(rule);
  }
  const ordered = [...entries]
    .sort((a, b) => a.order - b.order)
    .filter((entry) => grouped.has(entry.id));
  const known = new Set(ordered.map((e) => e.id));
  const rest = [...grouped.keys()]
    .filter((id) => !known.has(id))
    .sort()
    .map((id) => ({ id, label: legacyLabel(id) }));
  return [...ordered, ...rest].map(({ id, label }) => ({ id, label, rules: grouped.get(id) }));
}

/**
 * @param {object} input
 * @param {Array<{id,label,icon,color,rules:string[]}>} input.engineCategories
 * @param {Set<string>} input.populatedIds   kebabIds with content (stubs are excluded)
 * @param {(id: string) => string} input.engineTitle
 * @param {Set<string>|null} input.engineSearchHits  catalog query hits when searching
 * @param {Array<{route,name,criteria}>} input.legacyRules
 * @param {Array<{id,label,order}>} input.legacyCriteria
 * @param {string} input.search
 * @param {object|null} input.activeRule
 * @param {Record<string, boolean>} input.expanded
 * @param {Set<string>} input.openRules  rule node keys whose action bar was opened by hand
 * @param {Record<string, string>} input.health
 * @param {{rule, example, ruleLab}} input.hrefs
 * @param {{pathname: string, search: string}} input.location
 */
export function buildRuleTree({
  engineCategories,
  populatedIds,
  engineTitle = (id) => id,
  engineSearchHits = null,
  legacyRules = [],
  legacyCriteria = [],
  search = "",
  activeRule = null,
  expanded = {},
  openRules = new Set(),
  health = {},
  hrefs,
  location,
}) {
  const ctx = { activeRule, expanded, openRules, health, hrefs, location };
  const q = search.trim().toLowerCase();
  const searching = q.length > 0;

  const engineCats = engineCategories
    .map((cat) => {
      let ids = cat.rules.filter((id) => populatedIds.has(id));
      if (searching) {
        ids = engineSearchHits
          ? ids.filter((id) => engineSearchHits.has(id))
          : ids.filter((id) => id.toLowerCase().includes(q) || engineTitle(id).toLowerCase().includes(q));
      }
      const rules = ids.map((id) =>
        ruleNode({ tier: TIER_ENGINE, ref: engineRule(id), label: id, title: engineTitle(id), ctx })
      );
      return categoryNode({ tier: TIER_ENGINE, id: cat.id, label: cat.label, color: cat.color, icon: cat.icon, rules, ctx });
    })
    .filter((cat) => !searching || cat.count > 0);

  const legacyCats = orderLegacyCriteria(legacyRules, legacyCriteria)
    .map(({ id, label, rules: source }) => {
      const matches = searching
        ? source.filter(
            (r) => r.route.toLowerCase().includes(q) || String(r.name || r.route).toLowerCase().includes(q)
          )
        : source;
      const rules = matches.map((r) =>
        ruleNode({
          tier: TIER_LEGACY,
          ref: { type: "legacy", criteria: id, route: r.route },
          label: r.name || r.route,
          title: r.route,
          ctx,
        })
      );
      return categoryNode({ tier: TIER_LEGACY, id, label, color: legacyCriteriaColor(id), icon: null, rules, ctx });
    })
    .filter((cat) => !searching || cat.count > 0);

  return [
    {
      key: tierKey(TIER_ENGINE),
      id: TIER_ENGINE,
      label: "Engine Rules",
      count: populatedIds.size,
      expanded: Boolean(expanded[tierKey(TIER_ENGINE)]),
      categories: engineCats,
    },
    {
      key: tierKey(TIER_LEGACY),
      id: TIER_LEGACY,
      label: "Legacy Rules",
      count: legacyRules.length,
      expanded: Boolean(expanded[tierKey(TIER_LEGACY)]),
      categories: legacyCats,
    },
  ];
}
