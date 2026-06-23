import ENGINE_RULE_CATEGORIES from "../data/engine-rule-categories";

/** Rule count without importing the full ~200KB metadata JSON. */
export const ENGINE_RULE_COUNT = ENGINE_RULE_CATEGORIES.reduce(
  (total, category) => total + category.rules.length,
  0
);
