import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEngineRuleFull } from "../../../hooks/useEngineRuleFull";
import { useLibraryLocation } from "../../../hooks/useLibraryLocation";
import { engineRule } from "../../../lib/libraryLocation";
import { useMatchMedia } from "../../../hooks/useMatchMedia";
import { prefetchEngineExample } from "../../../utils/engineExampleUtils";
import { HudPresence } from "../../motion/HudMotion";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../../ui/resizable";
import LibraryLoadingShell from "./LibraryLoadingShell";
import EngineRuleDetailPane from "./EngineRuleDetailPane";
import EngineRulesTable from "./EngineRulesTable";
import { DEFAULT_RULE_ID } from "./engineLibraryUtils";
import { useEngineLibraryRules } from "./useEngineLibraryRules";

export default function EngineLibraryShell() {
  const { ruleId: paramRuleId } = useParams();
  const navigate = useNavigate();
  const isMobile = useMatchMedia("(max-width: 899px)");
  const { query, hrefs, setDetailOpen } = useLibraryLocation();
  const { detailOpen } = query;

  const library = useEngineLibraryRules(query);
  const { populatedRules, filteredRules, findRuleBySlug, wcagLevels, wcagCriteriaIds } = library;

  const selectedRuleId = paramRuleId || DEFAULT_RULE_ID;
  const indexRule = findRuleBySlug(selectedRuleId);
  const { rule: selectedRule } = useEngineRuleFull(selectedRuleId);

  const detailRule = selectedRule?.id === selectedRuleId ? selectedRule : indexRule;

  useEffect(() => {
    if (paramRuleId && !indexRule && !library.loading) {
      navigate(hrefs.home(), { replace: true });
    }
  }, [paramRuleId, indexRule, library.loading, navigate, hrefs]);

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

  if (!paramRuleId) {
    return <Navigate to={hrefs.rule(engineRule(DEFAULT_RULE_ID))} replace />;
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
            wcagLevels={wcagLevels}
            wcagCriteriaIds={wcagCriteriaIds}
            loading={library.loading}
            detailOpen={detailOpen}
            onToggleDetail={() => setDetailOpen(!detailOpen)}
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
