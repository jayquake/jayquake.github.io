/**
 * Re-export categories from the shared rules catalog module.
 * Prefer importing from `src/lib/rulesCatalog` in new code.
 */
const { CATEGORIES } = require("../lib/rulesCatalog/categories");

export default CATEGORIES;
