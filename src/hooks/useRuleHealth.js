import { useEffect, useState } from "react";
import { healthFromResults } from "../lib/ruleTree";
import { CACHE_CHANGED_EVENT, CACHE_PREFIX, getAllCachedResults } from "../utils/analysisCache";

function readHealth() {
  try {
    return healthFromResults(getAllCachedResults());
  } catch {
    return {};
  }
}

/**
 * Per-rule health from cached example analyses. Recomputes when this tab writes
 * or clears the cache, and when another tab changes an analysis entry.
 * @returns {Record<string, "red"|"yellow"|"green">}
 */
export function useRuleHealth() {
  const [health, setHealth] = useState(readHealth);

  useEffect(() => {
    const refresh = () => setHealth(readHealth());
    const onStorage = (event) => {
      // key === null means localStorage.clear() in another tab.
      if (event.key === null || event.key.startsWith(CACHE_PREFIX)) refresh();
    };
    window.addEventListener(CACHE_CHANGED_EVENT, refresh);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(CACHE_CHANGED_EVENT, refresh);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return health;
}
