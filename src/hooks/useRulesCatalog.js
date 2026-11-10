import { useEffect, useMemo, useState } from "react";
import {
  fetchEngineRulesCatalog,
  getEngineRulesCatalogCache,
} from "../utils/engineRulesDataService";

const { query: catalogQuery, resolveRule } = require("../lib/rulesCatalog");

/**
 * Load-once rules catalog: all rules, byId (id + kebabId), and query().
 */
export function useRulesCatalog() {
  const cached = getEngineRulesCatalogCache();
  const [catalog, setCatalog] = useState(() => cached);
  const [loading, setLoading] = useState(() => !cached);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchEngineRulesCatalog()
      .then((data) => {
        if (!cancelled) {
          setCatalog(data);
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

  const byId = catalog?.byId ?? {};
  const rules = catalog?.rules ?? [];
  const populated = catalog?.populated ?? [];

  const api = useMemo(
    () => ({
      rules,
      populated,
      byId,
      loading,
      error,
      getById: (id) => resolveRule(byId, id),
      query: (libraryQuery, opts) => catalogQuery(rules, libraryQuery, opts),
    }),
    [rules, populated, byId, loading, error]
  );

  return api;
}
