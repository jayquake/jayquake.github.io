import { Box, Drawer, useMediaQuery, useTheme } from "@mui/material";
import { LayoutGroup } from "motion/react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEngineRuleFull } from "../../../hooks/useEngineRuleFull";
import { prefetchEngineExample } from "../../../utils/engineExampleUtils";
import { LIBRARY_LAYOUT } from "../../../theme/layout";
import { hudLayoutTransition } from "../../../theme/motionPresets";
import { HudPresence, m } from "../../motion/HudMotion";
import EngineRuleDetailPane from "./EngineRuleDetailPane";
import EngineRulesTable from "./EngineRulesTable";
import { DEFAULT_RULE_ID } from "./engineLibraryUtils";
import { useEngineLibraryRules } from "./useEngineLibraryRules";

export default function EngineLibraryShell() {
  const { ruleId: paramRuleId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [detailCollapsed, setDetailCollapsed] = useState(false);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);

  const library = useEngineLibraryRules();
  const { populatedRules, filteredRules, findRuleBySlug, ...tableProps } = library;

  const selectedRuleId = paramRuleId || DEFAULT_RULE_ID;
  const indexRule = findRuleBySlug(selectedRuleId);
  const { rule: selectedRule } = useEngineRuleFull(selectedRuleId);

  const detailRule = selectedRule || indexRule;

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

  const handleSelectRule = (slug) => {
    navigate(`/engine/${slug}`);
    if (isMobile) {
      setMobileDetailOpen(true);
    } else if (detailCollapsed) {
      setDetailCollapsed(false);
    }
  };

  if (!paramRuleId) {
    return <Navigate to={`/engine/${DEFAULT_RULE_ID}`} replace />;
  }

  if (!indexRule) {
    return null;
  }

  const detailCol = detailCollapsed
    ? `${LIBRARY_LAYOUT.detailCollapsedPx}px`
    : LIBRARY_LAYOUT.detailColumn;

  return (
    <LayoutGroup>
      <Box
        component={m.div}
        layout
        transition={hudLayoutTransition("soft")}
        sx={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : `${detailCol} ${LIBRARY_LAYOUT.listColumn}`,
          justifyContent: "stretch",
          alignContent: "stretch",
          flex: 1,
          minHeight: 0,
          height: "100%",
          width: "100%",
          maxWidth: "100%",
          overflow: "hidden",
        }}
      >
        {!isMobile && (
          <Box
            component={m.div}
            layout
            transition={hudLayoutTransition("soft")}
            sx={{
              minWidth: 0,
              minHeight: 0,
              width: "100%",
              overflow: "hidden",
              justifySelf: "stretch",
              alignSelf: "stretch",
              borderRight: 1,
              borderColor: "primary.dark",
            }}
          >
            <HudPresence
              presenceKey={selectedRuleId}
              variant="slideX"
              transitionPreset="detail"
            >
              <EngineRuleDetailPane
                rule={detailRule}
                collapsed={detailCollapsed}
                onToggleCollapse={() => setDetailCollapsed((c) => !c)}
              />
            </HudPresence>
          </Box>
        )}

        <Box
          component={m.div}
          layout
          transition={hudLayoutTransition("soft")}
          sx={{ minWidth: 0, minHeight: 0, overflow: "hidden" }}
        >
          <EngineRulesTable
            layout="compact"
            filteredRules={filteredRules}
            populatedCount={populatedRules.length}
            selectedRuleId={selectedRuleId}
            onSelectRule={handleSelectRule}
            loading={library.loading}
            {...tableProps}
          />
        </Box>

        <Drawer
          anchor="bottom"
          open={isMobile && mobileDetailOpen}
          onClose={() => setMobileDetailOpen(false)}
          PaperProps={{
            sx: {
              maxHeight: "72vh",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              bgcolor: "background.default",
            },
          }}
        >
          <EngineRuleDetailPane
            rule={detailRule}
            collapsed={false}
            onToggleCollapse={() => setMobileDetailOpen(false)}
            compact
          />
        </Drawer>
      </Box>
    </LayoutGroup>
  );
}
