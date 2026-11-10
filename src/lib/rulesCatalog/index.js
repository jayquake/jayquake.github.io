/**
 * Shared rules catalog module (CommonJS) — browser-safe surface.
 * Node-only disk loading: require("./loadFromDisk") or "./node".
 */
const { CATEGORIES, CATEGORY_BY_KEBAB_ID } = require("./categories");
const {
  ID_TO_KEBAB,
  KEBAB_TO_ID,
  RETIRED_ID_TO_CURRENT,
  toKebabId,
  toEngineId,
} = require("./aliases");
const { stripHtml, normalizeRule, isPopulated } = require("./normalize");
const {
  ALL,
  ruleInCategory,
  scoreRule,
  query,
  collectFacets,
  indexById,
  resolveRule,
} = require("./query");

module.exports = {
  CATEGORIES,
  CATEGORY_BY_KEBAB_ID,
  ID_TO_KEBAB,
  KEBAB_TO_ID,
  RETIRED_ID_TO_CURRENT,
  toKebabId,
  toEngineId,
  stripHtml,
  normalizeRule,
  isPopulated,
  ALL,
  ruleInCategory,
  scoreRule,
  query,
  collectFacets,
  indexById,
  resolveRule,
};
