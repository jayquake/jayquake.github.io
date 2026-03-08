import {
  AccessibleTwoTone as AccessibleTwoToneIcon,
  AccountTree as AccountTreeIcon,
  Biotech as BiotechIcon,
  CheckCircle as CheckCircleIcon,
  Code as CodeIcon,
  ContentCopy as ContentCopyIcon,
  ContentPaste as ContentPasteIcon,
  Description as DescriptionIcon,
  ExpandMore as ExpandMoreIcon,
  InfoOutlined as InfoOutlinedIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Link as LinkIcon,
  OpenInNew as OpenInNewIcon,
  Print as PrintIcon,
  Science as ScienceIcon,
  Search as SearchIcon,
  Security as SecurityIcon,
  Share as ShareIcon,
  ThumbDownAlt as ThumbDownAltIcon,
  ThumbUpAlt as ThumbUpAltIcon,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardActionArea,
  Chip,
  Divider,
  Fab,
  Fade,
  Grid,
  IconButton,
  Paper,
  Skeleton,
  Slide,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  useMediaQuery,
  Zoom,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DOMPurify from "dompurify";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-markup";
import "prismjs/themes/prism-okaidia.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import engineLegacyMapping from "../../data/engine-legacy-mapping";
import engineRulesMetadata from "../../data/engine-rules-metadata.json";
import legacyEngineMapping from "../../data/legacy-engine-mapping";
import legacyRulesData from "../../data/legacy-rules.json";
import SimpleBreadcrumbs from "../util/BreadCrumb";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomizedBreadcrumbs = require("../util/ruleBreadcrumb").default as React.ComponentType<any>;

const glassCard = {
  background: "rgba(255, 255, 255, 0.55)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.7)",
  borderRadius: 3,
  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
  transition: "all 0.3s ease",
};

interface WcagRef {
  type: string;
  id: string;
  level?: string;
  link?: string;
}

interface EngineRuleData {
  id: string;
  title: string;
  description: string;
  advice?: string;
  impact: string;
  refs?: WcagRef[];
  metadata?: Record<string, string>;
  passCondition?: string;
  associatedDetectors?: any[];
}

interface LegacyRuleData {
  _id?: { $oid: string };
  name: string;
  route: string;
  shortCode?: string;
  criteria: string;
  shortDescription?: string;
  issueDescription?: string;
  issueResolution?: string;
  severity?: string;
  WCAGLevel?: string;
  issueWCAGLink?: string;
  issueTutorialLink?: string;
}

type RuleData = EngineRuleData | LegacyRuleData;

interface UnifiedRulePageProps {
  ruleData: RuleData;
  ruleType: "engine" | "legacy";
}

function getSeverityColor(level: string | undefined) {
  switch (level?.toLowerCase()) {
    case "critical":
    case "extreme":
      return { textColor: "#d32f2f", borderColor: "#d32f2f" };
    case "serious":
    case "major":
    case "high":
      return { textColor: "#f57c00", borderColor: "#f57c00" };
    case "moderate":
    case "medium":
      return { textColor: "#1976d2", borderColor: "#1976d2" };
    case "minor":
    case "low":
      return { textColor: "#388e3c", borderColor: "#388e3c" };
    default:
      return { textColor: "#666", borderColor: "#666" };
  }
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <Box role="tabpanel" hidden={value !== index} sx={{ py: { xs: 1.5, md: 2 } }}>
      {value === index && children}
    </Box>
  );
}

export default function UnifiedRulePage({
  ruleData,
  ruleType,
}: UnifiedRulePageProps) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [tab, setTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(ruleType === "engine");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [jsonExpanded, setJsonExpanded] = useState(false);

  const isEngine = ruleType === "engine";
  const eng = isEngine ? (ruleData as EngineRuleData) : null;
  const leg = !isEngine ? (ruleData as LegacyRuleData) : null;

  useEffect(() => {
    if (isEngine) {
      setLoading(true);
      const t = setTimeout(() => setLoading(false), 400);
      return () => clearTimeout(t);
    }
  }, [ruleData, isEngine]);

  useEffect(() => {
    if (!isEngine) Prism.highlightAll();
  }, [ruleData, isEngine, tab]);

  useEffect(() => {
    const fn = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) {}
  };

  if (!ruleData) {
    return (
      <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: { xs: 2, md: 4 }, maxWidth: 1200, mx: "auto" }}>
        <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, textAlign: "center", ...glassCard }}>
          <Alert severity="info"><AlertTitle>No Rule Data</AlertTitle>The requested rule could not be loaded.</Alert>
        </Paper>
      </Box>
    );
  }

  if (isEngine && loading) {
    return (
      <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: { xs: 2, md: 4 }, maxWidth: 1200, mx: "auto" }}>
        <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, ...glassCard }}>
          <Skeleton variant="rectangular" width="60%" height={32} sx={{ mb: 2, borderRadius: 1 }} />
          <Skeleton variant="rectangular" width="100%" height={2} sx={{ mb: 2 }} />
          <Skeleton variant="rectangular" width="100%" height={80} sx={{ mb: 2, borderRadius: 2 }} />
          <Skeleton variant="rectangular" width="80%" height={48} sx={{ mb: 2, borderRadius: 1 }} />
          <Stack direction="row" spacing={1}>
            <Skeleton variant="rectangular" width={100} height={28} sx={{ borderRadius: 2 }} />
            <Skeleton variant="rectangular" width={100} height={28} sx={{ borderRadius: 2 }} />
          </Stack>
        </Paper>
      </Box>
    );
  }

  const severity = isEngine ? eng!.impact : leg!.severity;
  const severityColors = getSeverityColor(severity);
  const title = isEngine ? eng!.title : leg!.name;
  const ruleId = isEngine ? eng!.id : leg!.shortCode || leg!.route;
  const description = isEngine ? eng!.description : leg!.issueDescription || leg!.shortDescription || "";
  const wcagRefs: WcagRef[] = isEngine
    ? (eng!.refs?.filter((r) => r.type === "WCAG") ?? [])
    : leg!.issueWCAGLink
    ? [{ type: "WCAG", id: leg!.WCAGLevel || "WCAG", level: leg!.WCAGLevel, link: leg!.issueWCAGLink }]
    : [];
  const otherRefs: WcagRef[] = isEngine
    ? (eng!.refs?.filter((r) => r.type !== "WCAG") ?? [])
    : [];

  const successUrl = isEngine
    ? `/engine/${eng!.id}_success`
    : `/${leg!.criteria}/${leg!.route}_success`;
  const failureUrl = isEngine
    ? `/engine/${eng!.id}_failure`
    : `/${leg!.criteria}/${leg!.route}_failure`;

  const relatedLegacyRules: { path: string; name: string }[] = isEngine
    ? (engineLegacyMapping as any)[eng!.id] || []
    : [];

  const relatedEngineRules: { path: string; label: string }[] = !isEngine
    ? (() => {
        const from = leg!.shortCode ? (legacyEngineMapping as any)[leg!.shortCode] || [] : [];
        const seen = new Set<string>();
        return from.filter((r: any) => {
          const key = r.label.replace(/\s*\(Engine rule\)\s*/gi, "").toLowerCase();
          return seen.has(key) ? false : (seen.add(key), true);
        });
      })()
    : [];

  const legacyEquivalent = isEngine
    ? (() => {
        for (const [code, rules] of Object.entries(legacyEngineMapping as any)) {
          const match = (rules as any[]).find((r) => r.id === eng!.id);
          if (match) {
            const lr = (legacyRulesData as any[]).find((r: any) => r.shortCode === code);
            if (lr?.criteria && lr?.route)
              return { path: `/${lr.criteria}/${lr.route}`, name: lr.name, shortCode: code };
          }
        }
        return null;
      })()
    : null;

  const sanitizedHtml = !isEngine ? DOMPurify.sanitize(leg!.issueResolution || "") : "";

  const releaseJson = !isEngine
    ? `{\n  "shortTextMarkdown": "New rule updated",\n  "bodyMarkdown": "**${leg!.name}** detection has been updated and may affect the number of issues found in your audit.",\n  "ctaLink": "rules/${(leg as any)._id?.$oid || "rule-id"}"\n}`
    : "";

  const speedDialActions = [
    { icon: <ShareIcon />, name: "Share", action: () => handleCopy(window.location.href) },
    { icon: <PrintIcon />, name: "Print", action: () => window.print() },
    {
      icon: <ContentCopyIcon />,
      name: "Copy Advice",
      action: () => handleCopy(isEngine ? eng!.advice || "" : leg!.issueResolution || ""),
    },
  ];

  const hasRelated = isEngine
    ? (legacyEquivalent || relatedLegacyRules.length > 0)
    : relatedEngineRules.length > 0;

  return (
    <Box sx={{
      px: { xs: 2, sm: 3, md: 4 },
      py: { xs: 2, sm: 3, md: 4 },
      maxWidth: 1200,
      mx: "auto",
      position: "relative",
    }}>
      {/* Scroll to top */}
      <Zoom in={showScrollTop}>
        <Fab
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          color="primary" size="small"
          sx={{
            position: "fixed",
            bottom: { xs: 144, md: 80 },
            right: { xs: 16, md: 24 },
            zIndex: 1000,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            boxShadow: "0 4px 20px rgba(103,58,183,0.4)",
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>

      {/* Speed dial */}
      <SpeedDial
        ariaLabel="Quick actions"
        sx={{
          position: "fixed",
          bottom: { xs: 80, md: 16 },
          right: 16,
          "& .MuiSpeedDial-fab": {
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          },
        }}
        icon={<SpeedDialIcon />}
      >
        {speedDialActions.map((a) => (
          <SpeedDialAction key={a.name} icon={a.icon} tooltipTitle={a.name} onClick={a.action} tooltipOpen />
        ))}
      </SpeedDial>

      {/* ── Hero Header ──────────────────────────────────────────────────────── */}
      <Slide in direction="down" timeout={500}>
        <Paper elevation={0} sx={{
          p: { xs: 2, sm: 3, md: 4 },
          mb: { xs: 1, md: 2 },
          ...glassCard,
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        }}>
          {isEngine ? <CustomizedBreadcrumbs /> : <SimpleBreadcrumbs />}
          <Divider sx={{ my: { xs: 1.5, md: 2 } }} />

          {/* Title row with type chip */}
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
            <Tooltip title={isEngine
              ? "Automated validation rule from the audit engine"
              : "Guidance for manual and automated accessibility testing"}>
              <Chip
                icon={<InfoOutlinedIcon sx={{ fontSize: 14 }} />}
                label={isEngine ? "Engine Rule" : "Legacy Rule"}
                size="small"
                variant="outlined"
                sx={{
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  height: 24,
                  borderColor: isEngine ? "rgba(102,126,234,0.4)" : "rgba(25,118,210,0.4)",
                  color: isEngine ? "#667eea" : "#1976d2",
                }}
              />
            </Tooltip>
            {legacyEquivalent && (
              <Chip
                label={`Legacy: ${legacyEquivalent.name}`}
                size="small"
                component={Link}
                to={legacyEquivalent.path}
                clickable
                sx={{ fontSize: "0.7rem", height: 24, fontWeight: 500 }}
              />
            )}
          </Stack>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 1,
              background: "linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xs: "1.3rem", sm: "1.6rem", md: "2rem" },
              lineHeight: 1.2,
            }}
          >
            {title}
          </Typography>

          {/* Chips row */}
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 1.5, gap: 0.5 }}>
            <Chip
              icon={<SecurityIcon sx={{ fontSize: 16 }} />}
              label={severity ? `${severity.charAt(0).toUpperCase()}${severity.slice(1)} ${isEngine ? "Impact" : "Severity"}` : "Unknown"}
              variant="outlined"
              size="small"
              sx={{ borderColor: severityColors.borderColor, color: severityColors.textColor, fontWeight: 600, height: 26 }}
            />
            {isEngine ? (
              wcagRefs.length > 0 && (
                <Chip
                  icon={<AccessibleTwoToneIcon sx={{ fontSize: 16 }} />}
                  label={`WCAG ${wcagRefs.map((r) => r.level).filter(Boolean).filter((v, i, a) => a.indexOf(v) === i).join(", ")}`}
                  variant="outlined" size="small"
                  sx={{ borderColor: "#1976d2", color: "#1976d2", fontWeight: 600, height: 26 }}
                />
              )
            ) : (
              leg!.WCAGLevel && leg!.WCAGLevel !== "none" && (
                <Chip
                  icon={<AccessibleTwoToneIcon sx={{ fontSize: 16 }} />}
                  label={`WCAG ${leg!.WCAGLevel}`}
                  variant="outlined" size="small"
                  sx={{ borderColor: "#1976d2", color: "#1976d2", fontWeight: 600, height: 26 }}
                />
              )
            )}
            {isEngine ? (
              <Chip label={eng!.id} size="small" sx={{ fontFamily: "monospace", fontSize: "0.7rem", height: 26, background: "rgba(103,58,183,0.1)", color: "#512da8" }} />
            ) : (
              leg!.criteria && (
                <Chip label={`${leg!.criteria.charAt(0).toUpperCase()}${leg!.criteria.slice(1)}`} size="small" sx={{ height: 26, background: "rgba(25,118,210,0.1)", color: "#1565c0" }} />
              )
            )}
          </Stack>

          <Typography variant="body2" sx={{ color: "#475569", lineHeight: 1.6, fontSize: { xs: "0.85rem", md: "0.95rem" } }}>
            {isEngine ? eng!.description : leg!.shortDescription || ""}
          </Typography>

          {/* Cross-links (compact) */}
          {hasRelated && (
            <Box sx={{ mt: 1.5 }}>
              {isEngine && relatedLegacyRules.length > 0 && (
                <Stack direction="row" spacing={0.5} flexWrap="wrap" alignItems="center" sx={{ gap: 0.5 }}>
                  <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 600 }}>Related:</Typography>
                  {relatedLegacyRules.map((r: any) => (
                    <Chip key={r.path} label={r.name || r.label} size="small" component={Link} to={r.path} clickable
                      sx={{ height: 22, fontSize: "0.7rem", background: "rgba(255,255,255,0.6)", border: "1px solid rgba(148,163,184,0.2)" }} />
                  ))}
                </Stack>
              )}
              {!isEngine && relatedEngineRules.length > 0 && (
                <Stack direction="row" spacing={0.5} flexWrap="wrap" alignItems="center" sx={{ gap: 0.5 }}>
                  <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 600 }}>Related:</Typography>
                  {relatedEngineRules.map((r) => (
                    <Chip key={r.path} label={r.label} size="small" component={Link} to={r.path} clickable
                      sx={{ height: 22, fontSize: "0.7rem", background: "rgba(255,255,255,0.6)", border: "1px solid rgba(148,163,184,0.2)" }} />
                  ))}
                </Stack>
              )}
            </Box>
          )}
        </Paper>
      </Slide>

      {/* ── Tabs (sticky) ─────────────────────────────────────────────────────── */}
      <Paper elevation={0} sx={{
        ...glassCard,
        position: "sticky",
        top: { xs: 56, md: 64 },
        zIndex: 10,
        mb: 1,
      }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            px: { xs: 1, md: 2 },
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 600,
              minHeight: { xs: 44, md: 48 },
              fontSize: { xs: "0.8rem", md: "0.85rem" },
              px: { xs: 1.5, md: 2 },
            },
            "& .MuiTabs-indicator": {
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              height: 3,
              borderRadius: 2,
            },
          }}
        >
          <Tab label="Overview" />
          <Tab label="Examples" />
          <Tab label="MCP Analysis" />
          <Tab label="References" />
          {isEngine && <Tab label="Atomic Tests" />}
        </Tabs>
      </Paper>

      {/* ── Tab 0: Overview ───────────────────────────────────────────────────── */}
      <TabPanel value={tab} index={0}>
        <Stack spacing={2}>
          {/* Description */}
          <Fade in timeout={600}>
            <Paper elevation={0} sx={{ p: { xs: 2, sm: 2.5, md: 3 }, ...glassCard }}>
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                <DescriptionIcon color="primary" sx={{ fontSize: { xs: 20, md: 24 } }} />
                <Typography variant="h6" fontWeight="bold" color="primary" sx={{ fontSize: { xs: "1rem", md: "1.15rem" } }}>
                  Rule Description
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{
                lineHeight: 1.7,
                fontSize: { xs: "0.85rem", md: "0.95rem" },
                color: "#374151",
                background: "rgba(248,250,252,0.8)",
                p: { xs: 1.5, sm: 2, md: 2.5 },
                borderRadius: 2,
                border: "1px solid rgba(203,213,225,0.5)",
              }}>
                {isEngine ? eng!.description : leg!.issueDescription}
              </Typography>
            </Paper>
          </Fade>

          {/* WCAG compliance (engine) */}
          {isEngine && wcagRefs.length > 0 && (
            <Fade in timeout={800}>
              <Paper elevation={0} sx={{ p: { xs: 2, sm: 2.5, md: 3 }, ...glassCard }}>
                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                  <AccessibleTwoToneIcon color="primary" sx={{ fontSize: { xs: 20, md: 24 } }} />
                  <Typography variant="h6" fontWeight="bold" color="primary" sx={{ fontSize: { xs: "1rem", md: "1.15rem" } }}>
                    WCAG Compliance
                  </Typography>
                </Stack>
                <Grid container spacing={1.5}>
                  {wcagRefs.map((ref, i) => (
                    <Grid size={{ xs: 6, sm: 4, md: 3 }} key={i}>
                      <Card elevation={0} sx={{
                        p: 1.5,
                        background: ref.level === "A" ? "rgba(76,175,80,0.08)" : ref.level === "AA" ? "rgba(33,150,243,0.08)" : "rgba(156,39,176,0.08)",
                        border: `1px solid ${ref.level === "A" ? "rgba(76,175,80,0.25)" : ref.level === "AA" ? "rgba(33,150,243,0.25)" : "rgba(156,39,176,0.25)"}`,
                        borderRadius: 2,
                      }}>
                        <Stack direction="row" alignItems="center" spacing={0.75} sx={{ mb: 0.5 }}>
                          <Chip
                            label={ref.level}
                            size="small"
                            sx={{ height: 20, fontSize: "0.65rem", backgroundColor: ref.level === "A" ? "#4caf50" : ref.level === "AA" ? "#2196f3" : "#9c27b0", color: "white", fontWeight: "bold" }}
                          />
                          <Typography variant="body2" fontWeight={700} sx={{ color: "#1e293b", fontSize: "0.8rem" }}>{ref.id}</Typography>
                        </Stack>
                        {ref.link && (
                          <Button href={ref.link} target="_blank" rel="noopener noreferrer" variant="text" size="small" endIcon={<OpenInNewIcon sx={{ fontSize: 14 }} />}
                            sx={{ textTransform: "none", fontSize: "0.7rem", p: 0, minWidth: 0, fontWeight: 600, color: "#667eea" }}>
                            View
                          </Button>
                        )}
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Fade>
          )}

          {/* WCAG link (legacy) */}
          {!isEngine && leg!.issueWCAGLink && (
            <Fade in timeout={800}>
              <Paper elevation={0} sx={{ p: { xs: 2, sm: 2.5, md: 3 }, ...glassCard }}>
                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                  <LinkIcon color="primary" sx={{ fontSize: { xs: 20, md: 24 } }} />
                  <Typography variant="h6" fontWeight="bold" color="primary" sx={{ fontSize: { xs: "1rem", md: "1.15rem" } }}>
                    WCAG Documentation
                  </Typography>
                </Stack>
                <Card elevation={0} sx={{
                  p: { xs: 1.5, md: 2 },
                  background: "linear-gradient(135deg,rgba(25,118,210,0.06),rgba(21,101,192,0.06))",
                  border: "1px solid rgba(25,118,210,0.15)",
                  borderRadius: 2,
                }}>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} alignItems={{ sm: "center" }}>
                    <Button href={leg!.issueWCAGLink} target="_blank" rel="noopener noreferrer" variant="contained" size="small"
                      startIcon={<OpenInNewIcon />}
                      sx={{ textTransform: "none", backgroundColor: "#1976d2", fontWeight: 600, flexShrink: 0 }}>
                      View WCAG Guidelines
                    </Button>
                    <Typography variant="caption" sx={{ wordBreak: "break-all", fontFamily: "monospace", color: "#64748b", fontSize: "0.75rem" }}>
                      {leg!.issueWCAGLink}
                    </Typography>
                  </Stack>
                </Card>
              </Paper>
            </Fade>
          )}

          {/* Advice (engine) */}
          {isEngine && eng!.advice && (
            <Fade in timeout={1000}>
              <Paper elevation={0} sx={{ p: { xs: 2, sm: 2.5, md: 3 }, ...glassCard }}>
                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                  <CodeIcon color="primary" sx={{ fontSize: { xs: 20, md: 24 } }} />
                  <Typography variant="h6" fontWeight="bold" color="primary" sx={{ fontSize: { xs: "1rem", md: "1.15rem" } }}>
                    Implementation Advice
                  </Typography>
                </Stack>
                <Box sx={{
                  background: "linear-gradient(135deg,rgba(16,185,129,0.08),rgba(34,197,94,0.08))",
                  borderRadius: 2,
                  p: { xs: 2, md: 2.5 },
                  position: "relative",
                  border: "1px solid rgba(34,197,94,0.15)",
                }}>
                  <Tooltip title={copied ? "Copied!" : "Copy advice"}>
                    <IconButton onClick={() => handleCopy(eng!.advice!)}
                      sx={{ position: "absolute", top: 8, right: 8, color: "#059669", backgroundColor: "rgba(255,255,255,0.9)" }} size="small">
                      <ContentCopyIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Tooltip>
                  <Typography variant="body2" sx={{ lineHeight: 1.7, pr: 4, fontSize: { xs: "0.85rem", md: "0.95rem" }, color: "#065f46", fontWeight: 500 }}>
                    {eng!.advice}
                  </Typography>
                </Box>
              </Paper>
            </Fade>
          )}

          {/* Issue Resolution (legacy) */}
          {!isEngine && leg!.issueResolution && (
            <Fade in timeout={1000}>
              <Paper elevation={0} sx={{ p: { xs: 2, sm: 2.5, md: 3 }, ...glassCard }}>
                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                  <CodeIcon color="primary" sx={{ fontSize: { xs: 20, md: 24 } }} />
                  <Typography variant="h6" fontWeight="bold" color="primary" sx={{ fontSize: { xs: "1rem", md: "1.15rem" } }}>
                    Issue Resolution
                  </Typography>
                </Stack>
                <Box sx={{
                  background: "linear-gradient(135deg,rgba(16,185,129,0.08),rgba(34,197,94,0.08))",
                  borderRadius: 2,
                  p: { xs: 1.5, md: 2 },
                  position: "relative",
                  border: "1px solid rgba(34,197,94,0.15)",
                }}>
                  <Tooltip title={copied ? "Copied!" : "Copy resolution code"}>
                    <IconButton onClick={() => navigator.clipboard.writeText(leg!.issueResolution!)}
                      sx={{ position: "absolute", top: 8, right: 8, color: "#059669", backgroundColor: "rgba(255,255,255,0.9)", zIndex: 1 }} size="small">
                      <ContentPasteIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Tooltip>
                  <Box sx={{ background: "rgba(30,30,30,0.95)", borderRadius: 2, p: 2, maxHeight: "400px", overflow: "auto" }}>
                    <pre style={{ margin: 0, color: "#f8f8f2", fontSize: "0.8rem", lineHeight: 1.5 }}>
                      <code className="language-html" dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
                    </pre>
                  </Box>
                </Box>
              </Paper>
            </Fade>
          )}
        </Stack>
      </TabPanel>

      {/* ── Tab 1: Examples ──────────────────────────────────────────────────── */}
      <TabPanel value={tab} index={1}>
        <Grid container spacing={{ xs: 1.5, md: 2 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Link to={successUrl} style={{ textDecoration: "none" }}>
              <Card elevation={0} sx={{
                ...glassCard,
                background: "linear-gradient(135deg, rgba(76,175,80,0.08) 0%, rgba(56,142,60,0.08) 100%)",
                border: "1px solid rgba(76,175,80,0.25)",
                "&:hover": { transform: "translateY(-3px)", boxShadow: "0 8px 24px rgba(76,175,80,0.2)", borderColor: "rgba(76,175,80,0.4)" },
              }}>
                <CardActionArea sx={{ p: { xs: 2, md: 2.5 }, textAlign: "center" }}>
                  <ThumbUpAltIcon sx={{ fontSize: { xs: 28, md: 36 }, color: "#4caf50", mb: 1 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#2e7d32", mb: 0.5, fontSize: { xs: "0.9rem", md: "1rem" } }}>
                    Success Examples
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.75rem" }}>
                    See correct implementations
                  </Typography>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Link to={failureUrl} style={{ textDecoration: "none" }}>
              <Card elevation={0} sx={{
                ...glassCard,
                background: "linear-gradient(135deg, rgba(244,67,54,0.08) 0%, rgba(211,47,47,0.08) 100%)",
                border: "1px solid rgba(244,67,54,0.25)",
                "&:hover": { transform: "translateY(-3px)", boxShadow: "0 8px 24px rgba(244,67,54,0.2)", borderColor: "rgba(244,67,54,0.4)" },
              }}>
                <CardActionArea sx={{ p: { xs: 2, md: 2.5 }, textAlign: "center" }}>
                  <ThumbDownAltIcon sx={{ fontSize: { xs: 28, md: 36 }, color: "#f44336", mb: 1 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#c62828", mb: 0.5, fontSize: { xs: "0.9rem", md: "1rem" } }}>
                    Failure Examples
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.75rem" }}>
                    Common mistakes and fixes
                  </Typography>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
        </Grid>
      </TabPanel>

      {/* ── Tab 2: MCP Analysis (action grid) ────────────────────────────────── */}
      <TabPanel value={tab} index={2}>
        <Grid container spacing={{ xs: 1.5, md: 2 }}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Card elevation={0} sx={{ ...glassCard, height: "100%" }}>
              <CardActionArea
                onClick={() => navigate(`/rule-lab?ruleId=${ruleId}`)}
                sx={{ p: { xs: 2, md: 2.5 }, height: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start" }}
              >
                <BiotechIcon sx={{ fontSize: 28, color: "#667eea", mb: 1 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1e293b", mb: 0.5 }}>
                  Analyze in Rule Lab
                </Typography>
                <Typography variant="caption" sx={{ color: "#64748b", lineHeight: 1.5, mb: 1.5 }}>
                  Deep analysis with Playwright MCP -- accessibility tree, ARIA roles, screen reader narration
                </Typography>
                <Button size="small" endIcon={<OpenInNewIcon sx={{ fontSize: 14 }} />}
                  sx={{ mt: "auto", textTransform: "none", fontWeight: 600, fontSize: "0.75rem", color: "#667eea" }}>
                  Open
                </Button>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Card elevation={0} sx={{ ...glassCard, height: "100%" }}>
              <CardActionArea
                onClick={() => navigate(`/rule-lab?ruleId=${ruleId}&view=tree`)}
                sx={{ p: { xs: 2, md: 2.5 }, height: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start" }}
              >
                <AccountTreeIcon sx={{ fontSize: 28, color: "#00897b", mb: 1 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1e293b", mb: 0.5 }}>
                  Accessibility Tree
                </Typography>
                <Typography variant="caption" sx={{ color: "#64748b", lineHeight: 1.5, mb: 1.5 }}>
                  Inspect computed roles, states, and properties visible to assistive technologies
                </Typography>
                <Button size="small" endIcon={<OpenInNewIcon sx={{ fontSize: 14 }} />}
                  sx={{ mt: "auto", textTransform: "none", fontWeight: 600, fontSize: "0.75rem", color: "#00897b" }}>
                  Open
                </Button>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Card elevation={0} sx={{ ...glassCard, height: "100%" }}>
              <CardActionArea
                onClick={() => navigate(`/rule-lab?ruleId=${ruleId}&view=discover`)}
                sx={{ p: { xs: 2, md: 2.5 }, height: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start" }}
              >
                <SearchIcon sx={{ fontSize: 28, color: "#e91e63", mb: 1 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1e293b", mb: 0.5 }}>
                  Discover Patterns
                </Typography>
                <Typography variant="caption" sx={{ color: "#64748b", lineHeight: 1.5, mb: 1.5 }}>
                  Find real-world instances of this pattern across curated websites
                </Typography>
                <Button size="small" endIcon={<OpenInNewIcon sx={{ fontSize: 14 }} />}
                  sx={{ mt: "auto", textTransform: "none", fontWeight: 600, fontSize: "0.75rem", color: "#e91e63" }}>
                  Open
                </Button>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* ── Tab 3: References ────────────────────────────────────────────────── */}
      <TabPanel value={tab} index={3}>
        <Stack spacing={2}>
          {/* Engine: non-WCAG refs as compact list */}
          {isEngine && otherRefs.length > 0 && (
            <Paper elevation={0} sx={{ p: { xs: 2, sm: 2.5, md: 3 }, ...glassCard }}>
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                <LinkIcon color="primary" sx={{ fontSize: { xs: 20, md: 24 } }} />
                <Typography variant="h6" fontWeight="bold" color="primary" sx={{ fontSize: { xs: "1rem", md: "1.15rem" } }}>
                  Additional Resources
                </Typography>
              </Stack>
              <Stack spacing={1}>
                {otherRefs.map((ref, i) => (
                  <Box key={i} sx={{
                    display: "flex", alignItems: "center", gap: 1.5,
                    p: 1.5, borderRadius: 2,
                    background: "rgba(255,255,255,0.5)",
                    border: "1px solid rgba(255,255,255,0.6)",
                  }}>
                    <Chip label={ref.type} size="small" sx={{ fontWeight: 600, fontSize: "0.7rem", height: 22 }} />
                    <Typography variant="body2" fontWeight={600} sx={{ flex: 1, fontSize: "0.85rem" }}>{ref.id}</Typography>
                    {ref.link && (
                      <IconButton href={ref.link} target="_blank" rel="noopener noreferrer" size="small" sx={{ color: "#667eea" }}>
                        <OpenInNewIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    )}
                  </Box>
                ))}
              </Stack>
            </Paper>
          )}

          {/* Legacy: tutorial link */}
          {!isEngine && leg!.issueTutorialLink && (
            <Paper elevation={0} sx={{ p: { xs: 2, sm: 2.5, md: 3 }, ...glassCard }}>
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
                <LinkIcon color="primary" sx={{ fontSize: { xs: 20, md: 24 } }} />
                <Typography variant="h6" fontWeight="bold" color="primary" sx={{ fontSize: { xs: "1rem", md: "1.15rem" } }}>
                  Tutorial Resource
                </Typography>
              </Stack>
              <Button href={leg!.issueTutorialLink} target="_blank" rel="noopener noreferrer" variant="outlined" size="small"
                startIcon={<OpenInNewIcon />} sx={{ textTransform: "none", fontWeight: 600 }}>
                View Tutorial
              </Button>
            </Paper>
          )}

          {/* Legacy: Release JSON accordion */}
          {!isEngine && (
            <Accordion expanded={jsonExpanded} onChange={() => setJsonExpanded(!jsonExpanded)}
              sx={{ ...glassCard, "&:before": { display: "none" } }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={600} fontSize="0.9rem">Rule Release JSON</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ position: "relative" }}>
                  <Tooltip title={copied ? "Copied!" : "Copy JSON"}>
                    <IconButton onClick={() => handleCopy(releaseJson)}
                      sx={{ position: "absolute", top: 8, right: 8, color: "#059669", backgroundColor: "rgba(255,255,255,0.9)", zIndex: 1 }} size="small">
                      <ContentPasteIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Tooltip>
                  <Box sx={{ background: "rgba(30,30,30,0.95)", borderRadius: 2, p: 2, overflow: "auto", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <pre style={{ margin: 0, color: "#f8f8f2", fontSize: "0.8rem", lineHeight: 1.5 }}>
                      <code className="language-json">{releaseJson}</code>
                    </pre>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          )}

          {/* Engine: WCAG refs in compact grid */}
          {isEngine && wcagRefs.length > 0 && (
            <Paper elevation={0} sx={{ p: { xs: 2, sm: 2.5, md: 3 }, ...glassCard }}>
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                <AccessibleTwoToneIcon color="primary" sx={{ fontSize: { xs: 20, md: 24 } }} />
                <Typography variant="h6" fontWeight="bold" color="primary" sx={{ fontSize: { xs: "1rem", md: "1.15rem" } }}>
                  WCAG References
                </Typography>
              </Stack>
              <Grid container spacing={1.5}>
                {wcagRefs.map((ref, i) => (
                  <Grid size={{ xs: 6, sm: 4, md: 3 }} key={i}>
                    <Card elevation={0} sx={{
                      p: 1.5, borderRadius: 2,
                      background: "rgba(255,255,255,0.5)",
                      border: "1px solid rgba(255,255,255,0.6)",
                    }}>
                      <Stack direction="row" spacing={0.75} alignItems="center" sx={{ mb: 0.5 }}>
                        <Chip label={ref.level || "WCAG"} size="small"
                          sx={{ height: 20, fontSize: "0.65rem", backgroundColor: ref.level === "A" ? "#4caf50" : ref.level === "AA" ? "#2196f3" : "#9c27b0", color: "white", fontWeight: "bold" }} />
                        <Typography variant="body2" fontWeight={700} sx={{ fontSize: "0.8rem" }}>{ref.id}</Typography>
                      </Stack>
                      {ref.link && (
                        <Button href={ref.link} target="_blank" rel="noopener noreferrer" variant="text" size="small"
                          endIcon={<OpenInNewIcon sx={{ fontSize: 14 }} />}
                          sx={{ textTransform: "none", fontSize: "0.7rem", p: 0, minWidth: 0, fontWeight: 600, color: "#667eea" }}>
                          View
                        </Button>
                      )}
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          )}
        </Stack>
      </TabPanel>

      {/* ── Tab 4: Atomic Tests (engine only) ───────────────────────────────── */}
      {isEngine && (
        <TabPanel value={tab} index={4}>
          <Paper elevation={0} sx={{ p: { xs: 2, sm: 2.5, md: 3 }, ...glassCard }}>
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
              <CheckCircleIcon color="primary" sx={{ fontSize: { xs: 20, md: 24 } }} />
              <Box>
                <Typography variant="h6" fontWeight="bold" color="primary" sx={{ fontSize: { xs: "1rem", md: "1.15rem" } }}>
                  Atomic Tests
                </Typography>
                <Typography variant="caption" sx={{ color: "#64748b" }}>
                  Minimal HTML fixtures -- pass and fail scenarios
                </Typography>
              </Box>
            </Stack>
            <Typography variant="body2" sx={{
              color: "#475569",
              fontSize: "0.85rem",
              lineHeight: 1.6,
              mb: 2,
              background: "rgba(248,250,252,0.8)",
              p: { xs: 1.5, md: 2 },
              borderRadius: 2,
              border: "1px solid rgba(203,213,225,0.5)",
            }}>
              Atomic tests verify the rule's <code style={{ background: "rgba(0,0,0,0.06)", padding: "1px 4px", borderRadius: 3, fontSize: "0.8rem" }}>validate()</code> logic
              with minimal fixtures. Use the Test Runner to execute them, or open the Rule Lab to analyze with Playwright MCP.
            </Typography>
            <Stack direction="row" spacing={1.5} flexWrap="wrap">
              <Button
                variant="outlined"
                size="small"
                startIcon={<ScienceIcon />}
                onClick={() => navigate(`/test-runner/atomic-tests?ruleId=${eng!.id}`)}
                sx={{ textTransform: "none", fontWeight: 600, borderRadius: 2 }}
              >
                Run Atomic Tests
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<BiotechIcon />}
                onClick={() => navigate(`/rule-lab?ruleId=${eng!.id}`)}
                sx={{ textTransform: "none", fontWeight: 600, borderRadius: 2 }}
              >
                Open in Rule Lab
              </Button>
            </Stack>
          </Paper>
        </TabPanel>
      )}
    </Box>
  );
}
