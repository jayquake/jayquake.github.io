import { useMemo, useState } from "react";
import engineRulesData from "../../../data/engine-rules-metadata.json";
import legacyEngineMapping from "../../../data/legacy-engine-mapping";
import { getRuleSlug, isPopulatedRule } from "./engineLibraryUtils";

export function useEngineLibraryRules() {
  const [searchTerm, setSearchTerm] = useState("");
  const [impactFilter, setImpactFilter] = useState("all");
  const [wcagLevelFilter, setWcagLevelFilter] = useState("all");
  const [wcagCriteriaFilter, setWcagCriteriaFilter] = useState("all");
  const [legacyRuleFilter, setLegacyRuleFilter] = useState("all");

  const populatedRules = useMemo(
    () => engineRulesData.filter(isPopulatedRule),
    []
  );

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
        return matchesImpact && matchesWcagLevel && matchesWcagCriteria && matchesLegacy;
      }

      const haystack = [ruleId, rule.title, rule.description, rule.advice]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return (
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
    searchTerm,
    setSearchTerm,
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
