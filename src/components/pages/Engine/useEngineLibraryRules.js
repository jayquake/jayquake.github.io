import { useMemo } from "react";
import { useRulesCatalog } from "../../../hooks/useRulesCatalog";
import legacyEngineMapping from "../../../data/legacy-engine-mapping";
import { getRuleSlug } from "./engineLibraryUtils";

/**
 * Engine rules filtered by library query state (`q` + filters from the URL).
 * Uses the shared catalog query (ranked; stubs hidden).
 * @param {import("../../../lib/libraryLocation").LibraryQuery} query
 */
export function useEngineLibraryRules(query) {
  const { populated, loading, error, query: runQuery } = useRulesCatalog();
  const searchTerm = query.q;
  const {
    category: categoryFilter,
    impact: impactFilter,
    level: wcagLevelFilter,
    wcag: wcagCriteriaFilter,
    legacy: legacyRuleFilter,
  } = query.filters;

  const hasLegacyEquivalent = useMemo(() => {
    const set = new Set();
    for (const entries of Object.values(legacyEngineMapping)) {
      for (const entry of entries) {
        if (entry.id) set.add(entry.id);
      }
    }
    return (ruleId) => set.has(ruleId);
  }, []);

  const { rules: filteredRules, facets } = useMemo(
    () =>
      runQuery(
        {
          q: searchTerm,
          filters: {
            category: categoryFilter,
            impact: impactFilter,
            level: wcagLevelFilter,
            wcag: wcagCriteriaFilter,
            legacy: legacyRuleFilter,
          },
        },
        {
          includeStubs: false,
          hasLegacyEquivalent,
        }
      ),
    [
      runQuery,
      searchTerm,
      categoryFilter,
      impactFilter,
      wcagLevelFilter,
      wcagCriteriaFilter,
      legacyRuleFilter,
      hasLegacyEquivalent,
    ]
  );

  const findRuleBySlug = (slug) =>
    populated.find((r) => getRuleSlug(r) === slug) ?? null;

  return {
    populatedRules: populated,
    filteredRules,
    findRuleBySlug,
    loading,
    error,
    wcagLevels: facets.levels,
    wcagCriteriaIds: facets.criteria,
  };
}
