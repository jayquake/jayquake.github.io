import { useEffect, useState } from "react";
import {
  fetchEngineRulesCatalog,
  getEngineRulesCatalogCache,
} from "../utils/engineRulesDataService";

export function useEngineRulesIndex() {
  const cached = getEngineRulesCatalogCache();
  const [rules, setRules] = useState(() => cached?.rules ?? []);
  const [loading, setLoading] = useState(() => !cached);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchEngineRulesCatalog()
      .then((catalog) => {
        if (!cancelled) {
          setRules(catalog.rules);
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
  }, []);

  return { rules, loading, error };
}
