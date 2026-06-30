import { useNavigate } from "react-router-dom";
import EngineRulesTable from "./EngineRulesTable";
import { useEngineLibraryRules } from "./useEngineLibraryRules";

/** Homepage — full-width ENGINE RULES LIBRARY table (og-image layout). */
export default function EngineLibraryHome() {
  const navigate = useNavigate();
  const library = useEngineLibraryRules();

  return (
    <EngineRulesTable
      layout="library"
      selectedRuleId={null}
      onSelectRule={(slug) => navigate(`/engine/${slug}`)}
      loading={library.loading}
      {...library}
    />
  );
}
