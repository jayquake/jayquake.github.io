import { useMemo, useState } from "react";
import { useEngineRulesIndex } from "../../../hooks/useEngineRulesIndex";
import legacyEngineMapping from "../../../data/legacy-engine-mapping";
import { getRuleSlug, ruleInCategory } from "./engineLibraryUtils";

export function useEngineLibraryRules() {
  const { rules: populatedRules, loading, error } = useEngineRulesIndex();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [impactFilter, setImpactFilter] = useState("all");
  const [wcagLevelFilter, setWcagLevelFilter] = useState("all");
  const [wcagCriteriaFilter, setWcagCriteriaFilter] = useState("all");
  const [legacyRuleFilter, setLegacyRuleFilter] = useState("all");

  const hasLegacyEquivalent = (ruleId) =>
    Object.values(legacyEngineMapping).some((legacyRules) =>
      legacyRules.some((legacyRule) => legacyRule.id === ruleId)
    );

  const wcagLevels = useMemo(() => {
    const levels = new Set();
    populatedRules.forEach((rule) => {
      (rule.refs?.filter((r) => r.type === "WCAG") || []).forEach((ref) => {
        if (ref.level) levels.add(ref.level.toUpperCase());
      });
    });
    return Array.from(levels).sort();
  }, [populatedRules]);

  const wcagCriteriaIds = useMemo(() => {
    const criteria = new Set();
    populatedRules.forEach((rule) => {
      (rule.refs?.filter((r) => r.type === "WCAG") || []).forEach((ref) => {
        if (ref.id) criteria.add(ref.id);
      });
    });
    return Array.from(criteria).sort((a, b) => {
      const aParts = a.split(".").map(Number);
      const bParts = b.split(".").map(Number);
      for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
        const aVal = aParts[i] || 0;
        const bVal = bParts[i] || 0;
        if (aVal !== bVal) return aVal - bVal;
      }
      return a.localeCompare(b);
    });
  }, [populatedRules]);

  const filteredRules = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return populatedRules.filter((rule) => {
      const ruleId = getRuleSlug(rule);
      const matchesImpact =
        impactFilter === "all" ||
        (rule.impact || "").toLowerCase() === impactFilter.toLowerCase();

      const matchesCategory = ruleInCategory(ruleId, categoryFilter);

      const matchesWcagLevel =
        wcagLevelFilter === "all" ||
        (rule.refs?.filter((r) => r.type === "WCAG") || []).some(
          (ref) => ref.level?.toUpperCase() === wcagLevelFilter.toUpperCase()
        );

      const matchesWcagCriteria =
        wcagCriteriaFilter === "all" ||
        (rule.refs?.filter((r) => r.type === "WCAG") || []).some(
          (ref) => ref.id === wcagCriteriaFilter
        );

      const matchesLegacy =
        legacyRuleFilter === "all" ||
        (legacyRuleFilter === "yes"
          ? hasLegacyEquivalent(ruleId)
          : !hasLegacyEquivalent(ruleId));

      if (!term) {
        return (
          matchesCategory && matchesImpact && matchesWcagLevel && matchesWcagCriteria && matchesLegacy
        );
      }

      const haystack = [ruleId, rule.title, rule.description, rule.advice]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return (
        matchesCategory &&
        matchesImpact &&
        matchesWcagLevel &&
        matchesWcagCriteria &&
        matchesLegacy &&
        haystack.includes(term)
      );
    });
  }, [
    populatedRules,
    searchTerm,
    categoryFilter,
    impactFilter,
    wcagLevelFilter,
    wcagCriteriaFilter,
    legacyRuleFilter,
  ]);

  const findRuleBySlug = (slug) =>
    populatedRules.find((r) => getRuleSlug(r) === slug) ?? null;

  return {
    populatedRules,
    filteredRules,
    findRuleBySlug,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    impactFilter,
    setImpactFilter,
    wcagLevelFilter,
    setWcagLevelFilter,
    wcagCriteriaFilter,
    setWcagCriteriaFilter,
    legacyRuleFilter,
    setLegacyRuleFilter,
    wcagLevels,
    wcagCriteriaIds,
    hasLegacyEquivalent,
  };
}
