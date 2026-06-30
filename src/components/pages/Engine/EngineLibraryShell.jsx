import { Box, Drawer, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { LIBRARY_LAYOUT } from "../../../theme/layout";
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
  const { findRuleBySlug, populatedRules, filteredRules, ...tableProps } = library;

  const selectedRuleId = paramRuleId || DEFAULT_RULE_ID;
  const selectedRule = findRuleBySlug(selectedRuleId);

  useEffect(() => {
    if (paramRuleId && !selectedRule) {
      navigate(`/engine/${DEFAULT_RULE_ID}`, { replace: true });
    }
  }, [paramRuleId, selectedRule, navigate]);

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

  if (!selectedRule) {
    return null;
  }

  const detailCol = detailCollapsed
    ? `${LIBRARY_LAYOUT.detailCollapsedPx}px`
    : LIBRARY_LAYOUT.detailColumn;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : `${detailCol} minmax(240px, 1fr)`,
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
          key={selectedRuleId}
          sx={{
            minWidth: 0,
            minHeight: 0,
            width: "100%",
            overflow: "hidden",
            justifySelf: "stretch",
            alignSelf: "stretch",
          }}
        >
          <EngineRuleDetailPane
            rule={selectedRule}
            collapsed={detailCollapsed}
            onToggleCollapse={() => setDetailCollapsed((c) => !c)}
          />
        </Box>
      )}

      <EngineRulesTable
        filteredRules={filteredRules}
        populatedCount={populatedRules.length}
        selectedRuleId={selectedRuleId}
        onSelectRule={handleSelectRule}
        {...tableProps}
      />

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
          rule={selectedRule}
          collapsed={false}
          onToggleCollapse={() => setMobileDetailOpen(false)}
          compact
        />
      </Drawer>
    </Box>
  );
}
