import ENGINE_RULE_CATEGORIES from "../../../data/engine-rule-categories";

/** Populated engine rules — excludes metadata stubs with empty id/title. */
export function getRuleSlug(rule) {
  return rule.id || rule.kebabId || "";
}

export function isPopulatedRule(rule) {
  const slug = getRuleSlug(rule);
  return Boolean(slug && (rule.title || rule.description));
}

export const DEFAULT_RULE_ID = "alt-misuse";

export const RULE_CATEGORY_BY_ID = (() => {
  const map = {};
  for (const cat of ENGINE_RULE_CATEGORIES) {
    const label = cat.label.toUpperCase();
    for (const ruleId of cat.rules) {
      map[ruleId] = label;
    }
  }
  return map;
})();

export const LIBRARY_CATEGORIES = ENGINE_RULE_CATEGORIES.map((c) => ({
  id: c.id,
  label: c.label,
}));

export function ruleInCategory(ruleId, categoryId) {
  if (categoryId === "all") return true;
  const cat = ENGINE_RULE_CATEGORIES.find((c) => c.id === categoryId);
  return cat?.rules.includes(ruleId) ?? false;
}

/** Map engine impact to HUD severity label (og-image style). */
export function impactToSeverityLabel(impact) {
  const v = (impact || "").toLowerCase();
  if (v === "critical" || v === "serious") return "HIGH";
  if (v === "moderate") return "MEDIUM";
  if (v === "minor") return "LOW";
  return v ? v.toUpperCase() : "—";
}
