import { useRulesCatalog } from "./useRulesCatalog";

/** @deprecated Prefer useRulesCatalog().populated — library hides stubs. */
export function useEngineRulesIndex() {
  const { populated, loading, error } = useRulesCatalog();
  return { rules: populated, loading, error };
}
