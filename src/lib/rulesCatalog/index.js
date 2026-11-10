/**
 * Shared rules catalog module (CommonJS).
 * Used by the app (via webpack), Node build scripts, and the Express server.
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
const { loadCatalogFromDisk, DEFAULT_CATALOG_REL } = require("./loadFromDisk");

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
  loadCatalogFromDisk,
  DEFAULT_CATALOG_REL,
};
