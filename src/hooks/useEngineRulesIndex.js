import { useEffect, useState } from "react";
import { fetchEngineRulesIndex, indexRowToRule } from "../utils/engineRulesDataService";

export function useEngineRulesIndex() {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchEngineRulesIndex()
      .then((rows) => {
        if (!cancelled) {
          setRules(rows.map(indexRowToRule));
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
