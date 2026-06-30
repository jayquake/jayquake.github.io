import PropTypes from "prop-types";
import { useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  CheckCircle as CheckIcon,
  CheckCircleOutline as SuccessIcon,
  Code as CodeIcon,
  ErrorOutline as ErrorIcon,
  ExpandMore as ExpandMoreIcon,
  Info as InfoIcon,
  Lightbulb as LightbulbIcon,
} from "@mui/icons-material";
import ExampleCard from "./ExampleCard";
import ExamplePageNav from "./ExamplePageNav";
import { HUD_PANEL, PAGE_SHELL } from "../../theme/layout";
import { MGS, mgsFonts } from "../../theme/mgsTokens";

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
  fontFamily: mgsFonts.hud,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  fontSize: "0.7rem",
  fontWeight: 600,
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [variant, ruleId]);

  return (
    <Box sx={{ ...PAGE_SHELL, display: "flex", flexDirection: "column", gap: 1.5 }}>
      <ExamplePageNav ruleId={ruleId} ruleType={ruleType} variant={variant} />

      <Paper elevation={0} sx={{ ...HUD_PANEL, p: { xs: 2, sm: 2.5 }, width: "100%" }}>
        {title && (
          <Typography
            variant="subtitle1"
            component="h1"
            sx={{
              fontWeight: 700,
              color: pal.primary,
              lineHeight: 1.35,
              fontSize: { xs: "0.95rem", sm: "1.1rem" },
              textTransform: "uppercase",
              mb: description ? 0.75 : 1,
              overflowWrap: "break-word",
            }}
          >
            {title}
          </Typography>
        )}

        {description && (
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              mb: 1,
              lineHeight: 1.6,
              fontSize: "0.85rem",
            }}
          >
            {description}
          </Typography>
        )}

        <Stack direction="row" spacing={0.75} flexWrap="wrap" sx={{ gap: 0.5 }}>
          <Chip
            icon={<StatusIcon sx={{ fontSize: 14 }} />}
            label={pal.statusLabel}
            size="small"
            variant="outlined"
            sx={{
              height: 24,
              fontWeight: 600,
              borderColor: pal.border,
              color: pal.primary,
              fontFamily: mgsFonts.hud,
              fontSize: "0.62rem",
            }}
          />
          <Chip
            label={`${examples.length} example${examples.length !== 1 ? "s" : ""}`}
            size="small"
            variant="outlined"
            sx={{ height: 24, fontSize: "0.62rem" }}
          />
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
              <Typography variant="subtitle2" sx={{ ...sectionLabelSx, color: "primary.dark" }}>
                Best Practices
              </Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 0 }}>
            {helpText && helpText !== "N/A" && (
              <Typography variant="body2" sx={{ mb: bestPractices?.length ? 1.5 : 0, lineHeight: 1.65, color: "text.secondary" }}>
                {helpText}
              </Typography>
            )}
            {bestPractices && bestPractices.length > 0 && (
              <Stack spacing={0.75}>
                {bestPractices.map((practice, i) => (
                  <Typography key={i} variant="body2" sx={{ lineHeight: 1.55, color: "text.secondary", fontSize: "0.85rem" }}>
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
              <Typography variant="subtitle2" sx={{ ...sectionLabelSx, color: "primary.dark" }}>
                How to Fix
              </Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 0 }}>
            {helpText && helpText !== "N/A" && (
              <Typography variant="body2" sx={{ mb: fixSteps?.length ? 1.5 : 0, lineHeight: 1.65, color: "text.secondary" }}>
                {helpText}
              </Typography>
            )}
            {fixSteps && fixSteps.length > 0 && (
              <Stack spacing={0.75}>
                {fixSteps.map((step, i) => (
                  <Typography key={i} variant="body2" sx={{ lineHeight: 1.55, color: "text.secondary", fontSize: "0.85rem" }}>
                    {i + 1}. {step}
                  </Typography>
                ))}
              </Stack>
            )}
          </AccordionDetails>
        </Accordion>
      )}

      <Paper elevation={0} sx={{ ...HUD_PANEL, p: { xs: 2, sm: 2.5 }, width: "100%" }}>
        <Typography
          variant="subtitle2"
          sx={{ ...sectionLabelSx, color: pal.primary, fontSize: "0.72rem", mb: 1.5 }}
        >
          {variant === "success" ? "Success Examples" : "Failure Examples"}
        </Typography>

        <Divider sx={{ mb: 1.5 }} />

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
