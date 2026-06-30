import { useEffect, useState } from "react";
import { fetchEngineRulesFull } from "../utils/engineRulesDataService";
import { getRuleSlug, isPopulatedRule } from "../components/pages/Engine/engineLibraryUtils";

export function useEngineRuleFull(slug) {
  const [rule, setRule] = useState(null);
  const [loading, setLoading] = useState(Boolean(slug));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) {
      setRule(null);
      setLoading(false);
      return undefined;
    }

    let cancelled = false;
    setLoading(true);

    fetchEngineRulesFull()
      .then((data) => {
        if (cancelled) return;
        const found = data.filter(isPopulatedRule).find((r) => getRuleSlug(r) === slug) ?? null;
        setRule(found);
        setLoading(false);
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { rule, loading, error };
}
