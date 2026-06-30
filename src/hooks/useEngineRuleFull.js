import { useEffect, useState } from "react";
import {
  fetchEngineRuleById,
  getEngineRulesCatalogCache,
} from "../utils/engineRulesDataService";

export function useEngineRuleFull(slug) {
  const cached = slug ? getEngineRulesCatalogCache()?.byId[slug] : null;
  const [rule, setRule] = useState(cached ?? null);
  const [loading, setLoading] = useState(Boolean(slug) && !cached);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) {
      setRule(null);
      setLoading(false);
      return undefined;
    }

    const fromCache = getEngineRulesCatalogCache()?.byId[slug];
    if (fromCache) {
      setRule(fromCache);
      setLoading(false);
      return undefined;
    }

    let cancelled = false;
    setLoading(true);

    fetchEngineRuleById(slug)
      .then((found) => {
        if (!cancelled) {
          setRule(found);
          setLoading(false);
        }
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
