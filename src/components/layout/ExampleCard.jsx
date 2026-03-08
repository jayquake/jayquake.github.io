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

const VARIANT_CONFIG = {
  success: {
    color: "#4caf50",
    darkColor: "#2e7d32",
    bgTint: "rgba(76, 175, 80, 0.08)",
    borderColor: "rgba(76, 175, 80, 0.25)",
    hoverBorder: "rgba(76, 175, 80, 0.4)",
    icon: SuccessIcon,
    label: "Best Practice",
    badgeIcon: CheckIcon,
    alertSeverity: "success",
    alertText: (ruleId) =>
      `This example properly implements the ${ruleId || "accessibility"} requirement.`,
  },
  failure: {
    color: "#f44336",
    darkColor: "#d32f2f",
    bgTint: "rgba(244, 67, 54, 0.06)",
    borderColor: "rgba(244, 67, 54, 0.25)",
    hoverBorder: "rgba(244, 67, 54, 0.4)",
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
    try {
      const { api } = await import("../../api/client");

      const health = await api.ruleLab.checkHealth().catch(() => null);
      if (health && !health.healthy) {
        setTreeError("MCP server is offline. Start the Playwright MCP server to analyze examples.");
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
      const msg = err.message || "";
      if (msg.includes("Missing required fields")) {
        setTreeError("Rule context unavailable. Use 'Analyze in Rule Lab' instead.");
      } else if (msg.toLowerCase().includes("mcp") || msg.toLowerCase().includes("not reachable")) {
        setTreeError("MCP server is not running. Start the Playwright MCP server to use this feature.");
      } else {
        setTreeError(msg || "Analysis failed. The server may be unreachable.");
      }
    } finally {
      setTreeLoading(false);
    }
  }, [treeOpen, treeData, ruleId, ruleType, html, variant]);

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

  return (
    <Card
      sx={{
        mb: 2,
        background: "rgba(255, 255, 255, 0.55)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${fpFlagged ? "rgba(255, 152, 0, 0.5)" : cfg.borderColor}`,
        borderLeft: `4px solid ${fpFlagged ? "#ff9800" : cfg.color}`,
        borderRadius: 3,
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
          borderColor: fpFlagged ? "rgba(255, 152, 0, 0.6)" : cfg.hoverBorder,
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
                  fontFamily: "monospace",
                  fontSize: "0.7rem",
                  height: 22,
                  background: cfg.bgTint,
                  color: cfg.darkColor,
                  border: `1px solid ${cfg.borderColor}`,
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
          <Stack direction="row" spacing={0.5}>
            <Tooltip title={showCode ? "Show rendered" : "Show code"}>
              <IconButton
                size="small"
                onClick={() => setShowCode((p) => !p)}
                sx={{
                  color: showCode ? "#1976d2" : cfg.color,
                  background: showCode ? "rgba(25,118,210,0.08)" : cfg.bgTint,
                  border: `1px solid ${showCode ? "rgba(25,118,210,0.25)" : cfg.borderColor}`,
                  "&:hover": { transform: "scale(1.1)" },
                  transition: "all 0.2s ease",
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
                  color: copied ? "#4caf50" : "#666",
                  background: copied ? "rgba(76,175,80,0.08)" : "rgba(0,0,0,0.03)",
                  border: `1px solid ${copied ? "rgba(76,175,80,0.25)" : "rgba(0,0,0,0.08)"}`,
                  "&:hover": { transform: "scale(1.1)" },
                  transition: "all 0.2s ease",
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
                  color: "#7c4dff",
                  background: "rgba(124,77,255,0.06)",
                  border: "1px solid rgba(124,77,255,0.2)",
                  "&:hover": { transform: "scale(1.1)", background: "rgba(124,77,255,0.12)" },
                  transition: "all 0.2s ease",
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
                  color: treeOpen ? "#1976d2" : "#546e7a",
                  background: treeOpen ? "rgba(25,118,210,0.08)" : "rgba(0,0,0,0.03)",
                  border: `1px solid ${treeOpen ? "rgba(25,118,210,0.25)" : "rgba(0,0,0,0.08)"}`,
                  "&:hover": { transform: "scale(1.1)" },
                  transition: "all 0.2s ease",
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
                  color: fpFlagged ? "#ff9800" : "#999",
                  background: fpFlagged ? "rgba(255,152,0,0.1)" : "rgba(0,0,0,0.03)",
                  border: `1px solid ${fpFlagged ? "rgba(255,152,0,0.3)" : "rgba(0,0,0,0.08)"}`,
                  "&:hover": { transform: "scale(1.1)" },
                  transition: "all 0.2s ease",
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
              p: { xs: 1.5, sm: 2, md: 3 },
              background: "rgba(255, 255, 255, 0.8)",
              border: `2px solid ${cfg.borderColor}`,
              borderRadius: 2,
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
            {reactContent ? (
              <Box sx={{ "& .list-item": { border: `1px solid ${cfg.borderColor}`, background: cfg.bgTint, m: "8px 0", p: "12px", borderRadius: "8px" } }}>
                {reactContent}
              </Box>
            ) : (
              <Box dangerouslySetInnerHTML={{ __html: html }} sx={{ "& *": { maxWidth: "100%" } }} />
            )}
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
              background: "rgba(245, 247, 250, 0.9)",
              border: "1px solid rgba(25, 118, 210, 0.2)",
              borderRadius: 2,
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: "#1565c0" }}>
              Accessibility Tree
            </Typography>
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
                  <Box sx={{ mt: 1, p: 1, background: "rgba(0,0,0,0.04)", borderRadius: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, display: "block", mb: 0.5 }}>
                      Screen Reader Narration:
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: "0.8rem", fontStyle: "italic" }}>
                      {treeData.screenReaderNarration}
                    </Typography>
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
                background: "rgba(255, 152, 0, 0.04)",
                "& fieldset": { borderColor: "rgba(255, 152, 0, 0.3)" },
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
