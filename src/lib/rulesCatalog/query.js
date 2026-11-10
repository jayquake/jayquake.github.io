const { CATEGORIES } = require("./categories");
const { isPopulated } = require("./normalize");

const ALL = "all";

function ruleInCategory(kebabId, categoryId) {
  if (!categoryId || categoryId === ALL) return true;
  const cat = CATEGORIES.find((c) => c.id === categoryId);
  return cat ? cat.rules.includes(kebabId) : false;
}

function scoreRule(rule, term) {
  if (!term) return 1;
  const id = (rule.kebabId || "").toLowerCase();
  const engineId = (rule.id || "").toLowerCase();
  const title = (rule.title || "").toLowerCase();
  if (id === term || engineId === term || title === term) return 100;
  if (id.startsWith(term) || engineId.startsWith(term) || title.startsWith(term)) return 80;
  if (id.includes(term) || engineId.includes(term) || title.includes(term)) return 60;
  const haystack = (rule.search || "").toLowerCase();
  if (haystack.includes(term)) return 20;
  return 0;
}

function collectFacets(rules) {
  const levels = new Set();
  const criteria = new Set();
  for (const rule of rules) {
    for (const ref of rule.refs || []) {
      if (ref.type !== "WCAG") continue;
      if (ref.level) levels.add(ref.level.toUpperCase());
      if (ref.id) criteria.add(ref.id);
    }
  }
  const sortedLevels = Array.from(levels).sort();
  const sortedCriteria = Array.from(criteria).sort((a, b) => {
    const aParts = a.split(".").map(Number);
    const bParts = b.split(".").map(Number);
    for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
      const aVal = aParts[i] || 0;
      const bVal = bParts[i] || 0;
      if (aVal !== bVal) return aVal - bVal;
    }
    return a.localeCompare(b);
  });
  return { levels: sortedLevels, criteria: sortedCriteria };
}

/**
 * Filter + rank rules for the library.
 * @param {object[]} rules - normalised catalog rows
 * @param {object} libraryQuery - { q, filters: { category, impact, level, wcag, legacy } }
 * @param {object} [opts]
 * @param {(kebabId: string) => boolean} [opts.hasLegacyEquivalent]
 * @param {boolean} [opts.includeStubs=false]
 */
function query(rules, libraryQuery = {}, opts = {}) {
  const includeStubs = opts.includeStubs === true;
  const hasLegacyEquivalent =
    opts.hasLegacyEquivalent ||
    (() => false);

  const q = libraryQuery.q || "";
  const filters = libraryQuery.filters || {};
  const categoryFilter = filters.category || ALL;
  const impactFilter = filters.impact || ALL;
  const levelFilter = filters.level || ALL;
  const wcagFilter = filters.wcag || ALL;
  const legacyFilter = filters.legacy || ALL;

  const term = String(q).trim().toLowerCase();
  const pool = includeStubs ? rules : rules.filter(isPopulated);

  const matched = [];
  for (const rule of pool) {
    const kebabId = rule.kebabId || rule.id || "";

    if (!ruleInCategory(kebabId, categoryFilter)) continue;

    if (
      impactFilter !== ALL &&
      (rule.impact || "").toLowerCase() !== String(impactFilter).toLowerCase()
    ) {
      continue;
    }

    const wcagRefs = (rule.refs || []).filter((r) => r.type === "WCAG");
    if (
      levelFilter !== ALL &&
      !wcagRefs.some((r) => r.level?.toUpperCase() === String(levelFilter).toUpperCase())
    ) {
      continue;
    }
    if (wcagFilter !== ALL && !wcagRefs.some((r) => r.id === wcagFilter)) {
      continue;
    }

    if (legacyFilter === "yes" && !hasLegacyEquivalent(kebabId)) continue;
    if (legacyFilter === "no" && hasLegacyEquivalent(kebabId)) continue;

    const rank = scoreRule(rule, term);
    if (term && rank === 0) continue;
    matched.push({ rule, rank });
  }

  matched.sort((a, b) => {
    if (b.rank !== a.rank) return b.rank - a.rank;
    return (a.rule.kebabId || "").localeCompare(b.rule.kebabId || "");
  });

  const resultRules = matched.map((m) => m.rule);
  return {
    rules: resultRules,
    facets: collectFacets(pool),
  };
}

function indexById(rules) {
  const byId = Object.create(null);
  for (const rule of rules) {
    if (rule.kebabId) byId[rule.kebabId] = rule;
    if (rule.id) byId[rule.id] = rule;
  }
  return byId;
}

function resolveRule(rulesOrIndex, idOrKebab) {
  if (!idOrKebab) return null;
  if (Array.isArray(rulesOrIndex)) {
    return (
      rulesOrIndex.find(
        (r) => r.kebabId === idOrKebab || r.id === idOrKebab
      ) || null
    );
  }
  return rulesOrIndex[idOrKebab] || null;
}

module.exports = {
  ALL,
  ruleInCategory,
  scoreRule,
  query,
  collectFacets,
  indexById,
  resolveRule,
};
