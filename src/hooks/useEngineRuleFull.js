import { useRulesCatalog } from "./useRulesCatalog";

/** Pass-through to the shared catalog (resolves id or kebabId). */
export function useEngineRuleFull(slug) {
  const { getById, loading, error } = useRulesCatalog();
  const rule = slug ? getById(slug) : null;
  return {
    rule,
    loading: Boolean(slug) && loading && !rule,
    error,
  };
}
