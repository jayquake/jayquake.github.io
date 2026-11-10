import { useLibraryLocation } from "../../../hooks/useLibraryLocation";
import EngineRulesTable from "./EngineRulesTable";
import { useEngineLibraryRules } from "./useEngineLibraryRules";

/** Homepage: full-width rules table. Rows link to `/engine/:id` carrying search + filters. */
export default function EngineLibraryHome() {
  const { query } = useLibraryLocation();
  const { populatedRules, filteredRules, wcagLevels, wcagCriteriaIds, loading } = useEngineLibraryRules(query);

  return (
    <EngineRulesTable
      layout="library"
      filteredRules={filteredRules}
      populatedCount={populatedRules.length}
      selectedRuleId={null}
      wcagLevels={wcagLevels}
      wcagCriteriaIds={wcagCriteriaIds}
      loading={loading}
    />
  );
}
