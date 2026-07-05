import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Collapse,
  IconButton,
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
  Alert,
  TextField,
} from "@mui/material";
import {
  CheckCircleOutline as SuccessIcon,
  ErrorOutline as ErrorIcon,
  BugReport as BugIcon,
  CheckCircle as CheckIcon,
  Code as CodeIcon,
  ContentCopy as CopyIcon,
  Science as ScienceIcon,
  AccountTree as TreeIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Bookmark as BookmarkIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { isStaticDeployment } from "../../utils/environment";
import { analyzeHtmlClientSide } from "../../utils/clientAccessibilityTree";
import { getCachedAnalysis, cacheAnalysis } from "../../utils/analysisCache";
import AuditResultsPanel, { issueKey } from "./AuditResultsPanel";
import { scopeExampleHtml } from "../../utils/scopeExampleHtml";

const VARIANT_CONFIG = {
  success: {
    color: "#6ee7b7",
    darkColor: "#6ee7b7",
    bgTint: "rgba(110, 231, 183, 0.08)",
    borderColor: "rgba(110, 231, 183, 0.28)",
    hoverBorder: "rgba(110, 231, 183, 0.45)",
    icon: SuccessIcon,
    label: "Best Practice",
    badgeIcon: CheckIcon,
    alertSeverity: "success",
    alertText: (ruleId) =>
      `This example properly implements the ${ruleId || "accessibility"} requirement.`,
  },
  failure: {
    color: "#ff5c5c",
    darkColor: "#ff5c5c",
    bgTint: "rgba(255, 92, 92, 0.08)",
    borderColor: "rgba(255, 92, 92, 0.28)",
    hoverBorder: "rgba(255, 92, 92, 0.45)",
    icon: ErrorIcon,
    label: "Accessibility Issue",
    badgeIcon: BugIcon,
    alertSeverity: "error",
    alertText: (ruleId) =>
      `This example violates the ${ruleId || "accessibility"} requirement and needs to be fixed.`,
  },
};

const FP_STORAGE_KEY = "rule-lab-false-positives";

function loadFPFlags() {
  try {
    return JSON.parse(localStorage.getItem(FP_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveFPFlags(data) {
  localStorage.setItem(FP_STORAGE_KEY, JSON.stringify(data));
}

export default function ExampleCard({
  index,
  variant,
  ruleId,
  ruleType,
  html,
  reactContent,
  filename,
}) {
  const navigate = useNavigate();
  const cfg = VARIANT_CONFIG[variant];
  const StatusIcon = cfg.icon;
  const BadgeIcon = cfg.badgeIcon;
  const scopedHtml = html ? scopeExampleHtml(html, index) : html;

  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [treeOpen, setTreeOpen] = useState(false);
  const [treeData, setTreeData] = useState(null);
  const [treeLoading, setTreeLoading] = useState(false);
  const [treeError, setTreeError] = useState(null);
  const [fpFlagged, setFpFlagged] = useState(() => {
    const all = loadFPFlags();
    return !!all?.[ruleId]?.[index]?.flagged;
  });
  const [fpNotes, setFpNotes] = useState(() => {
    const all = loadFPFlags();
    return all?.[ruleId]?.[index]?.notes || "";
  });

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(html || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [html]);

  const handleAnalyzeInRuleLab = useCallback(() => {
    const params = new URLSearchParams();
    if (ruleId) params.set("ruleId", ruleId);
    if (ruleType) params.set("type", ruleType);
    if (html) params.set("html", btoa(unescape(encodeURIComponent(html))));
    params.set("exampleType", variant);
    navigate(`/rule-lab?${params.toString()}`);
  }, [ruleId, ruleType, html, variant, navigate]);

  const handleTreeToggle = useCallback(async () => {
    if (treeOpen) {
      setTreeOpen(false);
      return;
    }
    setTreeOpen(true);
    if (treeData) return;

    setTreeLoading(true);
    setTreeError(null);

    // Check cache first
    const cached = getCachedAnalysis(ruleId || "anonymous", index, html || "");
    if (cached) {
      setTreeData(cached);
      setTreeLoading(false);
      return;
    }

    const staticMode = isStaticDeployment();

    if (staticMode) {
      // Client-side analysis only
      try {
        const result = await analyzeHtmlClientSide(html || "");
        cacheAnalysis(ruleId || "anonymous", index, html || "", result);
        setTreeData(result);
      } catch (err) {
        setTreeError("Client-side analysis failed: " + (err.message || "Unknown error"));
      } finally {
        setTreeLoading(false);
      }
      return;
    }

    // Backend mode: try backend first, fall back to client-side
    try {
      const { api } = await import("../../api/client");

      const health = await api.ruleLab.checkHealth().catch(() => null);
      if (health && !health.healthy) {
        // Fall back to client-side
        const result = await analyzeHtmlClientSide(html || "");
        cacheAnalysis(ruleId || "anonymous", index, html || "", result);
        setTreeData(result);
        setTreeLoading(false);
        return;
      }

      const result = await api.ruleLab.analyzeExample(
        ruleId || "anonymous",
        ruleType || "engine",
        html || "",
        variant
      );
      setTreeData(result);
    } catch (err) {
      // Fall back to client-side analysis
      try {
        const result = await analyzeHtmlClientSide(html || "");
        cacheAnalysis(ruleId || "anonymous", index, html || "", result);
        setTreeData(result);
      } catch (clientErr) {
        setTreeError("Analysis failed: " + (err.message || "The server may be unreachable."));
      }
    } finally {
      setTreeLoading(false);
    }
  }, [treeOpen, treeData, ruleId, ruleType, html, variant, index]);

  const handleFPToggle = useCallback(() => {
    const next = !fpFlagged;
    setFpFlagged(next);
    const all = loadFPFlags();
    if (!all[ruleId]) all[ruleId] = {};
    all[ruleId][index] = {
      flagged: next,
      notes: fpNotes,
      timestamp: new Date().toISOString(),
    };
    saveFPFlags(all);
  }, [fpFlagged, fpNotes, ruleId, index]);

  const handleFPNotes = useCallback(
    (e) => {
      const notes = e.target.value;
      setFpNotes(notes);
      const all = loadFPFlags();
      if (!all[ruleId]) all[ruleId] = {};
      all[ruleId][index] = {
        flagged: fpFlagged,
        notes,
        timestamp: new Date().toISOString(),
      };
      saveFPFlags(all);
    },
    [ruleId, index, fpFlagged]
  );

  // Per-audit-issue FP tracking
  const [auditFPs, setAuditFPs] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("audit-issue-fps") || "{}");
      const ruleIssues = stored[ruleId]?.[index] || [];
      return new Set(ruleIssues);
    } catch { return new Set(); }
  });

  const handleAuditFP = useCallback((issue, flagged) => {
    const key = issueKey(issue);
    setAuditFPs(prev => {
      const next = new Set(prev);
      if (flagged) next.add(key);
      else next.delete(key);

      // Persist
      try {
        const stored = JSON.parse(localStorage.getItem("audit-issue-fps") || "{}");
        if (!stored[ruleId]) stored[ruleId] = {};
        stored[ruleId][index] = Array.from(next);
        localStorage.setItem("audit-issue-fps", JSON.stringify(stored));
      } catch { /* ignore */ }

      return next;
    });
  }, [ruleId, index]);

  return (
    <Card
      sx={{
        mb: 2,
        bgcolor: "background.default",
        border: `1px solid ${fpFlagged ? "rgba(255, 193, 77, 0.5)" : cfg.borderColor}`,
        borderLeft: `3px solid ${fpFlagged ? "#ffc14d" : cfg.color}`,
        borderRadius: 0,
        boxShadow: "none",
        transition: "border-color 0.2s ease",
        "&:hover": {
          borderColor: fpFlagged ? "rgba(255, 193, 77, 0.65)" : cfg.hoverBorder,
        },
      }}
      role="region"
      aria-labelledby={`${variant}-example-${index}`}
    >
      <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
        {/* Header row */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 1.5, flexWrap: "wrap", gap: 1 }}
        >
          <Stack direction="row" alignItems="center" spacing={1} sx={{ flexWrap: "wrap", gap: 0.5 }}>
            <StatusIcon sx={{ color: cfg.color, fontSize: 20 }} />
            <Typography
              id={`${variant}-example-${index}`}
              variant="subtitle2"
              sx={{ fontWeight: 600, color: cfg.darkColor }}
            >
              {variant === "success" ? "Success" : "Failure"} Example #{index + 1}
            </Typography>
            {filename && (
              <Chip
                label={filename}
                size="small"
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: "0.65rem",
                  height: 22,
                  background: "transparent",
                  color: cfg.darkColor,
                  border: `1px solid ${cfg.borderColor}`,
                  borderRadius: 0,
                }}
              />
            )}
            <Chip
              label={cfg.label}
              size="small"
              icon={<BadgeIcon sx={{ fontSize: 14 }} />}
              sx={{
                height: 22,
                fontSize: "0.7rem",
                fontWeight: 600,
                background: cfg.bgTint,
                color: cfg.darkColor,
                border: `1px solid ${cfg.borderColor}`,
              }}
            />
          </Stack>

          {/* Action buttons */}
          <Stack direction="row" spacing={0.5} sx={{ flexWrap: "wrap", gap: 0.5 }}>
            <Tooltip title={showCode ? "Show rendered" : "Show code"}>
              <IconButton
                size="small"
                onClick={() => setShowCode((p) => !p)}
                sx={{
                  color: showCode ? "primary.main" : cfg.color,
                  bgcolor: showCode ? "rgba(0, 163, 141, 0.08)" : cfg.bgTint,
                  border: `1px solid ${showCode ? "rgba(0, 163, 141, 0.22)" : cfg.borderColor}`,
                }}
                aria-label={showCode ? "Show rendered HTML" : "Show code"}
              >
                <CodeIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title={copied ? "Copied!" : "Copy code"}>
              <IconButton
                size="small"
                onClick={handleCopy}
                sx={{
                  color: copied ? cfg.color : "text.secondary",
                  bgcolor: copied ? cfg.bgTint : "background.paper",
                  border: `1px solid ${copied ? cfg.borderColor : "divider"}`,
                  "&:hover": { bgcolor: cfg.bgTint },
                }}
                aria-label={`Copy example ${index + 1} code`}
              >
                <CopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Analyze in Rule Lab">
              <IconButton
                size="small"
                onClick={handleAnalyzeInRuleLab}
                sx={{
                  color: "primary.main",
                  bgcolor: "rgba(0, 163, 141, 0.08)",
                  border: "1px solid rgba(0, 163, 141, 0.22)",
                  "&:hover": { bgcolor: "rgba(0, 163, 141, 0.14)" },
                }}
                aria-label="Analyze in Rule Lab"
              >
                <ScienceIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Accessibility Tree">
              <IconButton
                size="small"
                onClick={handleTreeToggle}
                sx={{
                  color: treeOpen ? "primary.main" : "text.secondary",
                  bgcolor: treeOpen ? "rgba(0, 163, 141, 0.08)" : "background.paper",
                  border: `1px solid ${treeOpen ? "rgba(0, 163, 141, 0.22)" : "divider"}`,
                  "&:hover": { bgcolor: "rgba(0, 163, 141, 0.08)" },
                }}
                aria-label="View accessibility tree"
              >
                <TreeIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title={fpFlagged ? "Unflag false positive" : "Flag as false positive"}>
              <IconButton
                size="small"
                onClick={handleFPToggle}
                sx={{
                  color: fpFlagged ? "#ffc14d" : "text.secondary",
                  bgcolor: fpFlagged ? "rgba(255, 193, 77, 0.1)" : "background.paper",
                  border: `1px solid ${fpFlagged ? "rgba(255, 193, 77, 0.35)" : "divider"}`,
                }}
                aria-label="Flag as false positive"
              >
                {fpFlagged ? <BookmarkIcon fontSize="small" /> : <BookmarkBorderIcon fontSize="small" />}
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        {/* Rendered HTML view */}
        {!showCode && (
          <Box
            sx={{
              p: { xs: 1.5, sm: 2, md: 2.5 },
              bgcolor: "background.paper",
              border: `1px solid ${cfg.borderColor}`,
              borderRadius: 1,
              mb: 1.5,
              minHeight: 48,
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: cfg.darkColor, fontWeight: 600, mb: 1, display: "block", textTransform: "uppercase", letterSpacing: "0.5px", fontSize: "0.7rem" }}
            >
              Rendered Output:
            </Typography>
            <Box
              component="section"
              data-audit-example={index}
              data-rule-id={ruleId}
              data-variant={variant}
              aria-label={`Example ${index + 1} ${variant}`}
            >
              {reactContent ? (
                <Box sx={{ "& .list-item": { border: `1px solid ${cfg.borderColor}`, background: cfg.bgTint, m: "8px 0", p: "12px", borderRadius: "8px" } }}>
                  {reactContent}
                </Box>
              ) : (
                <Box dangerouslySetInnerHTML={{ __html: scopedHtml }} sx={{ "& *": { maxWidth: "100%" } }} />
              )}
            </Box>
          </Box>
        )}

        {/* Code view */}
        {showCode && (
          <Box
            sx={{
              p: { xs: 1.5, sm: 2, md: 2.5 },
              background: "rgba(30, 30, 30, 0.95)",
              border: `1px solid ${cfg.borderColor}`,
              borderRadius: 2,
              mb: 1.5,
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: variant === "failure" ? "#ffcdd2" : "#c8e6c9", fontWeight: 600, mb: 1, display: "block", textTransform: "uppercase", letterSpacing: "0.5px", fontSize: "0.7rem" }}
            >
              HTML Code:
            </Typography>
            <Typography
              component="pre"
              sx={{
                m: 0,
                p: 2,
                fontSize: { xs: "0.75rem", md: "0.875rem" },
                fontFamily: "monospace",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                borderRadius: 1,
                overflow: "auto",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                color: "#f8f8f2",
                maxHeight: { xs: 200, md: 400 },
              }}
            >
              <code>{html}</code>
            </Typography>
          </Box>
        )}

        {/* Alert footer */}
        <Alert
          severity={cfg.alertSeverity}
          icon={<StatusIcon sx={{ fontSize: 18 }} />}
          sx={{
            background: cfg.bgTint,
            border: `1px solid ${cfg.borderColor}`,
            borderRadius: 2,
            py: 0.5,
            "& .MuiAlert-icon": { color: cfg.darkColor },
            "& .MuiAlert-message": { py: 0.25 },
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 500, color: cfg.darkColor, fontSize: "0.8rem" }}>
            {cfg.alertText(ruleId)}
          </Typography>
        </Alert>

        {/* Inline Accessibility Tree */}
        <Collapse in={treeOpen}>
          <Box
            sx={{
              mt: 1.5,
              p: { xs: 1.5, sm: 2 },
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "primary.main" }}>
                Accessibility Tree
              </Typography>
              {treeData?.source === "client" && (
                <Chip label="Client-Side" size="small" variant="outlined" sx={{ height: 20, fontSize: "0.6rem" }} />
              )}
            </Stack>
            {treeLoading && <LinearProgress sx={{ mb: 1 }} />}
            {treeError && (
              <Alert severity="warning" sx={{ py: 0.5, fontSize: "0.8rem" }}>
                {treeError}{" "}
                <Typography
                  component="span"
                  sx={{ cursor: "pointer", textDecoration: "underline", fontWeight: 600, fontSize: "0.8rem" }}
                  onClick={handleAnalyzeInRuleLab}
                >
                  Open in Rule Lab
                </Typography>
              </Alert>
            )}
            {treeData && !treeError && (
              <Box>
                <Box sx={{ fontFamily: "monospace", fontSize: { xs: "0.7rem", md: "0.8rem" }, maxHeight: 300, overflow: "auto" }}>
                  {treeData.accessibilityTree ? (
                    <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                      {typeof treeData.accessibilityTree === "string"
                        ? treeData.accessibilityTree
                        : JSON.stringify(treeData.accessibilityTree, null, 2)}
                    </pre>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No accessibility tree data returned.
                    </Typography>
                  )}
                  {treeData.computedRoles && treeData.computedRoles.length > 0 && (
                    <Stack direction="row" spacing={0.5} flexWrap="wrap" sx={{ mt: 1, gap: 0.5 }}>
                      {treeData.computedRoles.map((role, i) => (
                        <Chip key={i} label={role} size="small" sx={{ height: 20, fontSize: "0.7rem" }} />
                      ))}
                    </Stack>
                  )}
                  {treeData.screenReaderNarration && (
                    <Box sx={{ mt: 1, p: 1, bgcolor: "background.default", borderRadius: 1, border: 1, borderColor: "divider" }}>
                      <Typography variant="caption" sx={{ fontWeight: 600, display: "block", mb: 0.5 }}>
                        Screen Reader Narration:
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: "0.8rem", fontStyle: "italic" }}>
                        {treeData.screenReaderNarration}
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* Audit results from client-side analysis */}
                {treeData.audit && (
                  <Box sx={{ mt: 2 }}>
                    <AuditResultsPanel
                      audit={treeData.audit}
                      compact
                      onFlagFalsePositive={handleAuditFP}
                      falsePositives={auditFPs}
                    />
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Collapse>

        {/* False Positive notes */}
        <Collapse in={fpFlagged}>
          <TextField
            size="small"
            fullWidth
            placeholder="Notes about this false positive..."
            value={fpNotes}
            onChange={handleFPNotes}
            sx={{
              mt: 1.5,
              "& .MuiOutlinedInput-root": {
                fontSize: "0.8rem",
                bgcolor: "rgba(255, 193, 77, 0.06)",
                "& fieldset": { borderColor: "rgba(255, 193, 77, 0.3)" },
              },
            }}
          />
        </Collapse>
      </CardContent>
    </Card>
  );
}

ExampleCard.propTypes = {
  index: PropTypes.number.isRequired,
  variant: PropTypes.oneOf(["success", "failure"]).isRequired,
  ruleId: PropTypes.string,
  ruleType: PropTypes.string,
  html: PropTypes.string,
  reactContent: PropTypes.node,
  filename: PropTypes.string,
};
