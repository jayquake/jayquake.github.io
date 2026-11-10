const fs = require("fs");
const path = require("path");
const { normalizeRule } = require("./normalize");
const { indexById } = require("./query");

const DEFAULT_CATALOG_REL = path.join("public", "engine-rules.json");

/**
 * Load the generated catalog from disk (Node scripts + server).
 * @param {string} [repoRoot]
 * @param {string} [catalogPath] absolute path override
 */
function loadCatalogFromDisk(repoRoot, catalogPath) {
  const file =
    catalogPath ||
    path.join(repoRoot || path.join(__dirname, "..", "..", ".."), DEFAULT_CATALOG_REL);
  const raw = JSON.parse(fs.readFileSync(file, "utf8"));
  const rules = (raw.rules || []).map((row) => normalizeRule(row));
  return {
    version: raw.version || 1,
    generatedAt: raw.generatedAt || null,
    count: rules.length,
    rules,
    byId: indexById(rules),
  };
}

module.exports = {
  DEFAULT_CATALOG_REL,
  loadCatalogFromDisk,
};
