const { CATEGORIES, ruleInCategory: catalogRuleInCategory } = require("../../../lib/rulesCatalog");

/** Populated engine rules — kebabId is the URL slug. */
export function getRuleSlug(rule) {
  return rule.kebabId || rule.id || "";
}

export function isPopulatedRule(rule) {
  if (typeof rule.populated === "boolean") return rule.populated;
  const slug = getRuleSlug(rule);
  return Boolean(slug && (rule.title || rule.description));
}

export const DEFAULT_RULE_ID = "alt-misuse";

export const RULE_CATEGORY_BY_ID = (() => {
  const map = {};
  for (const cat of CATEGORIES) {
    const label = cat.label.toUpperCase();
    for (const ruleId of cat.rules) {
      map[ruleId] = label;
    }
  }
  return map;
})();

export const LIBRARY_CATEGORIES = CATEGORIES.map((c) => ({
  id: c.id,
  label: c.label,
}));

export function ruleInCategory(ruleId, categoryId) {
  return catalogRuleInCategory(ruleId, categoryId);
}

/** Map engine impact to HUD severity label (og-image style). */
export function impactToSeverityLabel(impact) {
  const v = (impact || "").toLowerCase();
  if (v === "critical" || v === "serious") return "HIGH";
  if (v === "moderate") return "MEDIUM";
  if (v === "minor") return "LOW";
  return v ? v.toUpperCase() : "—";
}
