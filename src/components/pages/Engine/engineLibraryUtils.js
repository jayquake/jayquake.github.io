/** Populated engine rules — excludes metadata stubs with empty id/title. */
export function getRuleSlug(rule) {
  return rule.id || rule.kebabId || "";
}

export function isPopulatedRule(rule) {
  const slug = getRuleSlug(rule);
  return Boolean(slug && (rule.title || rule.description));
}

export const DEFAULT_RULE_ID = "alt-misuse";
