import PropTypes from "prop-types";
import { useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  CheckCircle as CheckIcon,
  ErrorOutline as ErrorIcon,
  ExpandMore as ExpandMoreIcon,
  Info as InfoIcon,
  Lightbulb as LightbulbIcon,
} from "@mui/icons-material";
import { m } from "../motion/HudMotion";
import ExampleCard from "./ExampleCard";
import ExamplePageNav from "./ExamplePageNav";
import engineLegacyMapping from "../../data/engine-legacy-mapping";
import { HUD_PANEL, PAGE_SHELL } from "../../theme/layout";
import { MGS, MIN_TEXT_SIZE, mgsFonts, raidenType } from "../../theme/mgsTokens";
import { hudVariantMotion, hudVariantTransition } from "../../theme/motionPresets";

const PALETTE = {
  success: {
    primary: MGS.passGreen,
    tint: "rgba(110, 231, 183, 0.08)",
    border: "rgba(110, 231, 183, 0.28)",
    statusLabel: "Compliant",
    statusIcon: CheckIcon,
  },
  failure: {
    primary: MGS.alertRed,
    tint: "rgba(255, 92, 92, 0.08)",
    border: "rgba(255, 92, 92, 0.28)",
    statusLabel: "Needs Fix",
    statusIcon: ErrorIcon,
  },
};

const sectionLabelSx = {
  ...raidenType.sectionLabel,
};

export default function UnifiedExamplePage({
  variant,
  ruleType,
  ruleId,
  title,
  description,
  helpText,
  bestPractices,
  fixSteps,
  examples,
}) {
  const pal = PALETTE[variant];
  const StatusIcon = pal.statusIcon;
  const location = useLocation();
  const legacyPath = location.pathname.replace(/_(success|failure)$/, "");
  const relatedEngineRules = ruleType === "legacy"
    ? Object.entries(engineLegacyMapping)
        .filter(([, legacyRules]) => legacyRules.some((legacy) => legacy.path === legacyPath))
        .map(([id]) => id)
    : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [variant, ruleId]);

  const variantMotion = hudVariantMotion(variant);

  const variantContent = (
    <>
      <Paper
        elevation={0}
        sx={{
          ...HUD_PANEL,
          overflow: "hidden",
          width: "100%",
          borderLeft: `3px solid ${pal.primary}`,
        }}
      >
        <Box sx={{ p: { xs: 2, sm: 2.5 }, background: `linear-gradient(120deg, ${pal.tint}, transparent 55%)` }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ ...sectionLabelSx, color: pal.primary, mb: 0.75, fontSize: "0.68rem" }}>
                Fixture review · {variant === "success" ? "expected pass" : "expected finding"}
              </Typography>
              {title && (
                <Typography
                  variant="subtitle1"
                  component="h1"
                  sx={{
                    fontFamily: mgsFonts.display,
                    fontWeight: 700,
                    color: "text.primary",
                    lineHeight: 1.2,
                    fontSize: { xs: "1.05rem", sm: "1.2rem" },
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    mb: description ? 0.9 : 0,
                    overflowWrap: "break-word",
                  }}
                >
                  {title}
                </Typography>
              )}
            </Box>
            <Box sx={{ display: { xs: "none", sm: "flex" }, flexShrink: 0, width: 38, height: 38, alignItems: "center", justifyContent: "center", border: `1px solid ${pal.border}`, color: pal.primary, bgcolor: pal.tint }}>
              <StatusIcon sx={{ fontSize: 21 }} />
            </Box>
          </Stack>

          {description && (
            <Typography variant="body2" sx={{ ...raidenType.bodyHud, maxWidth: 820 }}>
              {description}
            </Typography>
          )}
        </Box>

        <Stack direction="row" spacing={0.75} flexWrap="wrap" sx={{ gap: 0.5, px: { xs: 2, sm: 2.5 }, py: 1.25, borderTop: `1px solid ${pal.border}`, bgcolor: "background.default" }}>
          <Chip
            icon={<StatusIcon sx={{ fontSize: 14 }} />}
            label={pal.statusLabel}
            size="small"
            variant="outlined"
            sx={{ height: 24, fontWeight: 600, borderColor: pal.border, color: pal.primary, fontFamily: mgsFonts.hud, fontSize: MIN_TEXT_SIZE }}
          />
          <Chip
            label={`${examples.length} fixture${examples.length !== 1 ? "s" : ""}`}
            size="small"
            variant="outlined"
            sx={{ height: 24, fontSize: MIN_TEXT_SIZE }}
          />
          <Typography sx={{ ml: "auto", alignSelf: "center", fontFamily: mgsFonts.hud, color: "text.secondary", fontSize: MIN_TEXT_SIZE }}>
            Preview · source · audit tree
          </Typography>
        </Stack>
      </Paper>

      {variant === "success" && (helpText || (bestPractices && bestPractices.length > 0)) && (
        <Accordion
          defaultExpanded={false}
          disableGutters
          sx={{
            ...HUD_PANEL,
            width: "100%",
            "&:before": { display: "none" },
            "&.Mui-expanded": { margin: 0 },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "text.secondary" }} />}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <LightbulbIcon sx={{ color: pal.primary, fontSize: 18 }} />
              <Typography variant="subtitle2" sx={sectionLabelSx}>
                Best Practices
              </Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 0 }}>
            {helpText && helpText !== "N/A" && (
              <Typography variant="body2" sx={{ mb: bestPractices?.length ? 1.5 : 0, ...raidenType.bodyHud }}>
                {helpText}
              </Typography>
            )}
            {bestPractices && bestPractices.length > 0 && (
              <Stack spacing={0.75}>
                {bestPractices.map((practice, i) => (
                  <Typography key={i} variant="body2" sx={{ ...raidenType.bodyHud, fontSize: "0.85rem" }}>
                    {i + 1}. {practice}
                  </Typography>
                ))}
              </Stack>
            )}
          </AccordionDetails>
        </Accordion>
      )}

      {variant === "failure" && (helpText || (fixSteps && fixSteps.length > 0)) && (
        <Accordion
          defaultExpanded={false}
          disableGutters
          sx={{
            ...HUD_PANEL,
            width: "100%",
            "&:before": { display: "none" },
            "&.Mui-expanded": { margin: 0 },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "text.secondary" }} />}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <InfoIcon sx={{ color: "primary.main", fontSize: 18 }} />
              <Typography variant="subtitle2" sx={sectionLabelSx}>
                How to Fix
              </Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 0 }}>
            {helpText && helpText !== "N/A" && (
              <Typography variant="body2" sx={{ mb: fixSteps?.length ? 1.5 : 0, ...raidenType.bodyHud }}>
                {helpText}
              </Typography>
            )}
            {fixSteps && fixSteps.length > 0 && (
              <Stack spacing={0.75}>
                {fixSteps.map((step, i) => (
                  <Typography key={i} variant="body2" sx={{ ...raidenType.bodyHud, fontSize: "0.85rem" }}>
                    {i + 1}. {step}
                  </Typography>
                ))}
              </Stack>
            )}
          </AccordionDetails>
        </Accordion>
      )}

      <Paper elevation={0} sx={{ ...HUD_PANEL, p: { xs: 2, sm: 2.5 }, width: "100%" }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2} sx={{ mb: 1.5 }}>
          <Box>
            <Typography variant="subtitle2" sx={{ ...sectionLabelSx, color: pal.primary, fontSize: MIN_TEXT_SIZE }}>
              {variant === "success" ? "Success fixtures" : "Failure fixtures"}
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.35, fontSize: "0.78rem" }}>
              Inspect each isolated case before moving it into your test run.
            </Typography>
          </Box>
          <Chip label={`${examples.length} total`} size="small" variant="outlined" sx={{ flexShrink: 0, height: 23, fontSize: MIN_TEXT_SIZE }} />
        </Stack>

        <Divider sx={{ mb: 1.5 }} />

        {relatedEngineRules.length > 0 && (
          <Box sx={{ mb: 1.5, p: 1.25, border: "1px solid", borderColor: "divider", bgcolor: "background.default" }}>
            <Typography sx={{ ...sectionLabelSx, mb: 0.75, fontSize: "0.68rem" }}>Mapped engine fixtures</Typography>
            <Stack direction="row" flexWrap="wrap" gap={0.75}>
              {relatedEngineRules.map((engineId) => (
                <Button
                  key={engineId}
                  component={RouterLink}
                  to={`/engine/${engineId}_${variant}`}
                  size="small"
                  variant="outlined"
                  sx={{ textTransform: "none", fontSize: MIN_TEXT_SIZE }}
                >
                  {engineId}
                </Button>
              ))}
            </Stack>
          </Box>
        )}

        <Box role="region" aria-label={`${variant} examples list`}>
          {examples.length > 0 ? (
            examples.map((ex, i) => (
              <ExampleCard
                key={i}
                index={i}
                variant={variant}
                ruleId={ruleId}
                ruleType={ruleType}
                html={ex.html}
                reactContent={ex.reactContent}
                filename={ex.filename}
              />
            ))
          ) : (
            <Alert severity="info" icon={<InfoIcon />}>
              No {variant} examples available for this rule.
            </Alert>
          )}
        </Box>
      </Paper>
    </>
  );

  return (
    <Box sx={{ ...PAGE_SHELL, display: "flex", flexDirection: "column", gap: 1.5 }}>
      <ExamplePageNav ruleId={ruleId} ruleType={ruleType} variant={variant} />

      <Box
        component="main"
        data-scan-ready="true"
        data-rule-id={ruleId}
        data-variant={variant}
        sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
      >
        {ruleType === "legacy" ? (
          <AnimatePresence mode="wait">
            <m.div
              key={variant}
              initial={variantMotion.initial}
              animate={variantMotion.animate}
              exit={variantMotion.exit}
              transition={hudVariantTransition()}
              style={{ display: "flex", flexDirection: "column", gap: 12 }}
            >
              {variantContent}
            </m.div>
          </AnimatePresence>
        ) : (
          variantContent
        )}
      </Box>
    </Box>
  );
}

UnifiedExamplePage.propTypes = {
  variant: PropTypes.oneOf(["success", "failure"]).isRequired,
  ruleType: PropTypes.oneOf(["engine", "legacy"]).isRequired,
  ruleId: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string.isRequired,
  helpText: PropTypes.string,
  bestPractices: PropTypes.arrayOf(PropTypes.string),
  fixSteps: PropTypes.arrayOf(PropTypes.string),
  examples: PropTypes.arrayOf(
    PropTypes.shape({
      html: PropTypes.string,
      reactContent: PropTypes.node,
      filename: PropTypes.string,
    })
  ).isRequired,
};
