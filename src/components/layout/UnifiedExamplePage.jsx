import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Chip,
  Divider,
  Fab,
  Fade,
  Paper,
  Skeleton,
  Slide,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stack,
  Tooltip,
  Typography,
  Zoom,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  CheckCircle as CheckIcon,
  CheckCircleOutline as SuccessIcon,
  Code as CodeIcon,
  ContentCopy as CopyIcon,
  ErrorOutline as ErrorIcon,
  ExpandMore as ExpandMoreIcon,
  Info as InfoIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Lightbulb as LightbulbIcon,
  Print as PrintIcon,
  Share as ShareIcon,
} from "@mui/icons-material";
import CustomizedBreadcrumbs from "../util/ruleBreadcrumb";
import ExampleCard from "./ExampleCard";

const glassCard = {
  background: "rgba(255, 255, 255, 0.55)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.7)",
  borderRadius: 3,
  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
  transition: "all 0.3s ease",
};

const PALETTE = {
  success: {
    primary: "#4caf50",
    dark: "#2e7d32",
    tint: "rgba(76, 175, 80, 0.08)",
    border: "rgba(76, 175, 80, 0.25)",
    gradient: "linear-gradient(135deg, #66bb6a 0%, #43a047 100%)",
    icon: SuccessIcon,
    statusLabel: "Compliant",
    statusIcon: CheckIcon,
  },
  failure: {
    primary: "#f44336",
    dark: "#d32f2f",
    tint: "rgba(244, 67, 54, 0.06)",
    border: "rgba(244, 67, 54, 0.25)",
    gradient: "linear-gradient(135deg, #ef5350 0%, #d32f2f 100%)",
    icon: ErrorIcon,
    statusLabel: "Needs Fix",
    statusIcon: ErrorIcon,
  },
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const pal = PALETTE[variant];
  const StatusIcon = pal.statusIcon;

  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, [ruleId]);

  useEffect(() => {
    const handler = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({ title: title || "", text: description, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
  }, [title, description]);

  const handlePrint = () => window.print();

  const handleCopyAll = useCallback(() => {
    const allHtml = examples.map((ex) => ex.html || "").join("\n\n");
    navigator.clipboard.writeText(allHtml).catch(() => {});
  }, [examples]);

  const speedDialActions = [
    { icon: <ShareIcon />, name: "Share", action: handleShare },
    { icon: <PrintIcon />, name: "Print", action: handlePrint },
    { icon: <CopyIcon />, name: "Copy All Examples", action: handleCopyAll },
  ];

  if (loading) {
    return (
      <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: { xs: 2, sm: 3, md: 4 }, maxWidth: 1200, mx: "auto" }}>
        <Paper elevation={0} sx={{ ...glassCard, p: { xs: 2, sm: 3, md: 4 } }}>
          <Skeleton variant="rectangular" width="60%" height={40} sx={{ mb: 2 }} />
          <Skeleton variant="rectangular" width="100%" height={2} sx={{ mb: 3 }} />
          <Skeleton variant="rectangular" width="100%" height={100} sx={{ mb: 3, borderRadius: 2 }} />
          <Stack direction="row" spacing={2}>
            <Skeleton variant="rectangular" width={120} height={32} sx={{ borderRadius: 2 }} />
            <Skeleton variant="rectangular" width={120} height={32} sx={{ borderRadius: 2 }} />
          </Stack>
        </Paper>
        <Paper elevation={0} sx={{ ...glassCard, p: { xs: 2, sm: 3, md: 4 }, mt: 3 }}>
          <Skeleton variant="rectangular" width="40%" height={32} sx={{ mb: 3 }} />
          <Skeleton variant="rectangular" width="100%" height={120} sx={{ borderRadius: 2 }} />
        </Paper>
      </Box>
    );
  }

  return (
    <>
      {/* Scroll to Top */}
      <Zoom in={showScrollTop}>
        <Fab
          onClick={scrollToTop}
          size="small"
          sx={{
            position: "fixed",
            bottom: { xs: 144, md: 80 },
            right: 24,
            zIndex: 1000,
            background: pal.gradient,
            color: "#fff",
            boxShadow: `0 4px 20px ${pal.tint}`,
            "&:hover": { transform: "scale(1.1)" },
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>

      {/* SpeedDial */}
      <SpeedDial
        ariaLabel="Quick actions"
        sx={{
          position: "fixed",
          bottom: { xs: 80, md: 16 },
          right: 16,
          "& .MuiSpeedDial-fab": {
            background: pal.gradient,
            "&:hover": { background: pal.gradient, opacity: 0.9 },
          },
        }}
        icon={<SpeedDialIcon />}
      >
        {speedDialActions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.action}
            tooltipOpen={!isMobile}
          />
        ))}
      </SpeedDial>

      <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: { xs: 2, sm: 3, md: 4 }, maxWidth: 1200, mx: "auto" }}>
        {/* Header */}
        <Slide in direction="down" timeout={500}>
          <Paper elevation={0} sx={{ ...glassCard, p: { xs: 2, sm: 2.5, md: 3 }, mb: 3 }}>
            <CustomizedBreadcrumbs />
            <Divider sx={{ my: { xs: 1.5, md: 2 } }} />

            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1, flexWrap: "wrap", gap: 0.5 }}>
              {title && (
                <Typography
                  variant={isMobile ? "h5" : "h4"}
                  sx={{
                    fontWeight: 700,
                    color: pal.dark,
                    lineHeight: 1.2,
                    fontSize: { xs: "1.3rem", sm: "1.6rem", md: "2rem" },
                  }}
                >
                  {title}
                </Typography>
              )}
              <Tooltip title={ruleType === "engine" ? "Engine Rule" : "Legacy Rule"}>
                <Chip
                  label={ruleType === "engine" ? "Engine" : "Legacy"}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    background: ruleType === "engine" ? "rgba(25,118,210,0.1)" : "rgba(156,39,176,0.1)",
                    color: ruleType === "engine" ? "#1565c0" : "#7b1fa2",
                    border: `1px solid ${ruleType === "engine" ? "rgba(25,118,210,0.3)" : "rgba(156,39,176,0.3)"}`,
                  }}
                />
              </Tooltip>
            </Stack>

            {description && (
              <Typography
                variant="body2"
                sx={{
                  color: "#546e7a",
                  mb: 1.5,
                  lineHeight: 1.6,
                  fontSize: { xs: "0.85rem", md: "0.9rem" },
                }}
              >
                {description}
              </Typography>
            )}

            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 0.75 }}>
              <Chip
                icon={<StatusIcon sx={{ fontSize: 16 }} />}
                label={pal.statusLabel}
                size="small"
                sx={{
                  height: 26,
                  fontWeight: 600,
                  background: pal.tint,
                  color: pal.dark,
                  border: `1px solid ${pal.border}`,
                }}
              />
              <Chip
                icon={<InfoIcon sx={{ fontSize: 14 }} />}
                label={`${examples.length} Example${examples.length !== 1 ? "s" : ""}`}
                size="small"
                variant="outlined"
                sx={{ height: 26 }}
              />
              {ruleId && (
                <Chip
                  label={ruleId}
                  size="small"
                  sx={{
                    height: 26,
                    fontFamily: "monospace",
                    fontSize: "0.75rem",
                    background: "rgba(103, 58, 183, 0.08)",
                    color: "#673ab7",
                    border: "1px solid rgba(103, 58, 183, 0.25)",
                  }}
                />
              )}
            </Stack>
          </Paper>
        </Slide>

        {/* Help / Best Practices / Fix Steps */}
        {variant === "success" && (helpText || (bestPractices && bestPractices.length > 0)) && (
          <Fade in timeout={700}>
            <Accordion
              defaultExpanded
              sx={{
                ...glassCard,
                mb: 3,
                border: `1px solid ${pal.border}`,
                "&:before": { display: "none" },
                "&.Mui-expanded": { margin: 0, mb: 3 },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <LightbulbIcon sx={{ color: pal.primary, fontSize: 20 }} />
                  <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ fontWeight: 600 }}>
                    Understanding Best Practices
                  </Typography>
                </Stack>
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 0 }}>
                {helpText && helpText !== "N/A" && (
                  <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.7, color: "#374151" }}>
                    {helpText}
                  </Typography>
                )}
                {bestPractices && bestPractices.length > 0 && (
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1, color: pal.dark, fontWeight: 600 }}>
                      Best Practices:
                    </Typography>
                    <Stack spacing={1}>
                      {bestPractices.map((practice, i) => (
                        <Box
                          key={i}
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 1.5,
                            p: 1.5,
                            background: pal.tint,
                            borderRadius: 2,
                            border: `1px solid ${pal.border}`,
                          }}
                        >
                          <Chip
                            label={i + 1}
                            size="small"
                            sx={{ minWidth: 28, height: 28, background: pal.border, color: pal.dark, fontWeight: "bold", flexShrink: 0 }}
                          />
                          <Typography variant="body2" sx={{ lineHeight: 1.6, color: "#374151" }}>
                            {practice}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                )}
              </AccordionDetails>
            </Accordion>
          </Fade>
        )}

        {variant === "failure" && (helpText || (fixSteps && fixSteps.length > 0)) && (
          <Fade in timeout={700}>
            <Paper elevation={0} sx={{ ...glassCard, p: { xs: 2, sm: 2.5, md: 3 }, mb: 3 }}>
              {helpText && helpText !== "N/A" && (
                <Box sx={{ mb: fixSteps && fixSteps.length > 0 ? 3 : 0 }}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
                    <InfoIcon sx={{ color: "#1976d2", fontSize: 20 }} />
                    <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ fontWeight: 600, color: "#1976d2" }}>
                      Understanding This Issue
                    </Typography>
                  </Stack>
                  <Typography
                    variant="body2"
                    sx={{
                      lineHeight: 1.7,
                      color: "#374151",
                      background: "rgba(248, 250, 252, 0.8)",
                      p: { xs: 1.5, md: 2.5 },
                      borderRadius: 2,
                      border: "1px solid rgba(203, 213, 225, 0.4)",
                    }}
                  >
                    {helpText}
                  </Typography>
                </Box>
              )}

              {fixSteps && fixSteps.length > 0 && (
                <Box>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
                    <CodeIcon sx={{ color: "#1976d2", fontSize: 20 }} />
                    <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ fontWeight: 600, color: "#1976d2" }}>
                      How to Fix
                    </Typography>
                  </Stack>
                  <Box
                    sx={{
                      background: "linear-gradient(135deg, rgba(16, 185, 129, 0.06) 0%, rgba(34, 197, 94, 0.06) 100%)",
                      borderRadius: 3,
                      p: { xs: 1.5, md: 2.5 },
                      border: "1px solid rgba(34, 197, 94, 0.2)",
                    }}
                  >
                    <Stack spacing={1.5}>
                      {fixSteps.map((step, i) => (
                        <Box
                          key={i}
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 1.5,
                            p: 1.5,
                            background: "rgba(255, 255, 255, 0.6)",
                            borderRadius: 2,
                            border: "1px solid rgba(34, 197, 94, 0.15)",
                          }}
                        >
                          <Chip
                            label={i + 1}
                            size="small"
                            sx={{ minWidth: 28, height: 28, background: "rgba(34, 197, 94, 0.15)", color: "#059669", fontWeight: "bold", flexShrink: 0 }}
                          />
                          <Typography variant="body2" sx={{ lineHeight: 1.6, color: "#065f46", fontWeight: 500 }}>
                            {step}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </Box>
              )}
            </Paper>
          </Fade>
        )}

        {/* Examples List */}
        <Fade in timeout={900}>
          <Paper elevation={0} sx={{ ...glassCard, p: { xs: 2, sm: 2.5, md: 3 } }}>
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
              <CodeIcon sx={{ color: pal.primary, fontSize: 24 }} />
              <Box>
                <Typography
                  variant={isMobile ? "subtitle1" : "h6"}
                  sx={{ fontWeight: 700, color: pal.dark, lineHeight: 1.2 }}
                >
                  {variant === "success" ? "Success Examples" : "Failure Examples"}
                </Typography>
                <Typography variant="caption" sx={{ color: "#64748b" }}>
                  {variant === "success"
                    ? "Patterns that demonstrate proper accessibility implementation"
                    : "Common accessibility failures that need to be fixed"}
                </Typography>
              </Box>
            </Stack>

            <Divider sx={{ mb: 2 }} />

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

            {examples.length > 0 && (
              <Box sx={{ mt: 2, p: 1.5, background: pal.tint, borderRadius: 2, border: `1px solid ${pal.border}` }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                  <strong>Tip:</strong> Use the action buttons on each example to copy code, analyze in Rule Lab, view the accessibility tree, or flag false positives.
                </Typography>
              </Box>
            )}
          </Paper>
        </Fade>
      </Box>
    </>
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
