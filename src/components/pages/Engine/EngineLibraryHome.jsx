import { useNavigate, useSearchParams } from "react-router-dom";
import { useLibrarySearchParams } from "../../../hooks/useLibrarySearchParams";
import EngineRulesTable from "./EngineRulesTable";
import { useEngineLibraryRules } from "./useEngineLibraryRules";

/** Homepage — full-width rules table; selection opens `/engine/:id?detail=open`. */
export default function EngineLibraryHome() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const librarySearch = useLibrarySearchParams();
  const library = useEngineLibraryRules(librarySearch);
  const ruleFromQuery = searchParams.get("rule");

  const handleSelect = (slug) => {
    const params = new URLSearchParams(searchParams);
    params.set("detail", "open");
    navigate(`/engine/${slug}?${params.toString()}`);
  };

  return (
    <EngineRulesTable
      {...library}
      layout="library"
      populatedCount={library.populatedRules.length}
      selectedRuleId={ruleFromQuery}
      onSelectRule={handleSelect}
      loading={library.loading}
    />
  );
}
