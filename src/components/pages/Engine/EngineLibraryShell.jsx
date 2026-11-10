import { useEffect } from "react";
import { Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEngineRuleFull } from "../../../hooks/useEngineRuleFull";
import { useLibraryDetailParams } from "../../../hooks/useLibraryDetailParams";
import { useMatchMedia } from "../../../hooks/useMatchMedia";
import { prefetchEngineExample } from "../../../utils/engineExampleUtils";
import { HudPresence } from "../../motion/HudMotion";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../../ui/resizable";
import LibraryLoadingShell from "./LibraryLoadingShell";
import EngineRuleDetailPane from "./EngineRuleDetailPane";
import EngineRulesTable from "./EngineRulesTable";
import { DEFAULT_RULE_ID } from "./engineLibraryUtils";
import { useLibrarySearchParams } from "../../../hooks/useLibrarySearchParams";
import { useEngineLibraryRules } from "./useEngineLibraryRules";

export default function EngineLibraryShell() {
  const { ruleId: paramRuleId } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const isMobile = useMatchMedia("(max-width: 899px)");
  const { detailOpen, setDetailOpen, toggleDetail } = useLibraryDetailParams();
  const librarySearch = useLibrarySearchParams();

  const library = useEngineLibraryRules(librarySearch);
  const { populatedRules, filteredRules, findRuleBySlug, ...tableProps } = library;

  const selectedRuleId = paramRuleId || DEFAULT_RULE_ID;
  const indexRule = findRuleBySlug(selectedRuleId);
  const { rule: selectedRule } = useEngineRuleFull(selectedRuleId);

  const detailRule = selectedRule?.id === selectedRuleId ? selectedRule : indexRule;

  useEffect(() => {
    if (paramRuleId && !indexRule && !library.loading) {
      navigate("/", { replace: true });
    }
  }, [paramRuleId, indexRule, library.loading, navigate]);

  useEffect(() => {
    if (!selectedRuleId || typeof window === "undefined") return undefined;
    const run = () => prefetchEngineExample(selectedRuleId, "success");
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(run, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = setTimeout(run, 400);
    return () => clearTimeout(timer);
  }, [selectedRuleId]);

  const ensureDetailQuery = () => {
    if (!searchParams.get("detail")) {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set("detail", "open");
          return next;
        },
        { replace: true }
      );
    }
  };

  const buildRuleHref = (slug) => {
    const params = new URLSearchParams(searchParams);
    params.set("detail", "open");
    return `/engine/${slug}?${params.toString()}`;
  };

  const handleSelectRule = (slug) => {
    navigate(buildRuleHref(slug));
    if (isMobile) setDetailOpen(true);
    else ensureDetailQuery();
  };

  if (!paramRuleId) {
    return <Navigate to={`/engine/${DEFAULT_RULE_ID}?detail=open`} replace />;
  }

  if (library.loading) {
    return <LibraryLoadingShell />;
  }

  if (!indexRule) {
    return null;
  }

  const showDetailPanel = !isMobile && detailOpen;

  return (
    <>
      <ResizablePanelGroup direction="horizontal" className="h-full min-h-0 w-full flex-1">
        <ResizablePanel id="rules-list" order={1} defaultSize={showDetailPanel ? 58 : 100} minSize={35}>
          <EngineRulesTable
            layout="compact"
            filteredRules={filteredRules}
            populatedCount={populatedRules.length}
            selectedRuleId={selectedRuleId}
            onSelectRule={handleSelectRule}
            loading={library.loading}
            detailOpen={detailOpen}
            onToggleDetail={toggleDetail}
            {...tableProps}
          />
        </ResizablePanel>

        {showDetailPanel ? (
          <>
            <ResizableHandle withHandle />
            <ResizablePanel id="rule-detail" order={2} defaultSize={42} minSize={28} maxSize={55}>
              <div className="flex h-full min-h-0 flex-col overflow-hidden border-l border-border bg-shell-elevated">
                <HudPresence presenceKey={selectedRuleId} variant="slideX" transitionPreset="detail">
                  <EngineRuleDetailPane
                    rule={detailRule}
                    collapsed={false}
                    onToggleCollapse={() => setDetailOpen(false)}
                    side="right"
                  />
                </HudPresence>
              </div>
            </ResizablePanel>
          </>
        ) : null}
      </ResizablePanelGroup>

      {isMobile && detailOpen ? (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close rule detail"
            onClick={() => setDetailOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[82vh] overflow-hidden rounded-t-xl border-t border-border bg-shell-elevated shadow-xl">
            <EngineRuleDetailPane
              rule={detailRule}
              collapsed={false}
              onToggleCollapse={() => setDetailOpen(false)}
              compact
              side="right"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
