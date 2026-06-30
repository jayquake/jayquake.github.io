import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Box,
  Button,
  Chip,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import engineRulesData from "../../data/engine-rules-metadata.json";
import ENGINE_RULE_CATEGORIES from "../../data/engine-rule-categories";
import { getAllCachedResults } from "../../utils/analysisCache";
import { analyzeHtmlClientSide } from "../../utils/clientAccessibilityTree";

const RECENT_RULES_KEY = "recentRulesViewed";

function getRecentRules() {
  try {
    return JSON.parse(localStorage.getItem(RECENT_RULES_KEY) || "[]").slice(0, 8);
  } catch {
    return [];
  }
}

function loadFPData() {
  try {
    const raw = JSON.parse(localStorage.getItem("rule-lab-false-positives") || "{}");
    let count = 0;
    for (const ruleId of Object.keys(raw)) {
      for (const idx of Object.keys(raw[ruleId])) {
        if (raw[ruleId][idx]?.flagged) count++;
      }
    }
    return count;
  } catch {
    return 0;
  }
}

function loadAuditIssueFPs() {
  try {
    const raw = JSON.parse(localStorage.getItem("audit-issue-fps") || "{}");
    let count = 0;
    for (const ruleId of Object.keys(raw)) {
      for (const idx of Object.keys(raw[ruleId])) {
        count += (raw[ruleId][idx] || []).length;
      }
    }
    return count;
  } catch {
    return 0;
  }
}

export default function Home({ title }) {
  const navigate = useNavigate();
  const [recentRules] = useState(getRecentRules);
  const [batchRunning, setBatchRunning] = useState(false);
  const [batchProgress, setBatchProgress] = useState({ done: 0, total: 0 });
  const [cacheStats, setCacheStats] = useState(() => {
    const cached = getAllCachedResults();
    let totalIssues = { critical: 0, serious: 0, moderate: 0, minor: 0 };
    for (const results of cached.values()) {
      for (const r of results) {
        if (r.audit) {
          totalIssues.critical += r.audit.summary.critical;
          totalIssues.serious += r.audit.summary.serious;
          totalIssues.moderate += r.audit.summary.moderate;
          totalIssues.minor += r.audit.summary.minor;
        }
      }
    }
    return {
      analyzedRules: cached.size,
      totalIssues,
      fpCount: loadFPData(),
      auditFPCount: loadAuditIssueFPs(),
    };
  });

  useEffect(() => {
    document.title = title;
  }, [title]);

  const totalRules = engineRulesData.length;
  const coveragePct =
    totalRules > 0 ? Math.round((cacheStats.analyzedRules / totalRules) * 100) : 0;
  const totalIssueCount =
    cacheStats.totalIssues.critical +
    cacheStats.totalIssues.serious +
    cacheStats.totalIssues.moderate +
    cacheStats.totalIssues.minor;
  const fpTotal = cacheStats.fpCount + cacheStats.auditFPCount;

  const cachedRuleIds = useMemo(() => new Set(getAllCachedResults().keys()), [cacheStats]);

  const handleBatchAnalysis = useCallback(async () => {
    setBatchRunning(true);
    const ruleList = engineRulesData;
    setBatchProgress({ done: 0, total: ruleList.length });

    const batchSize = 10;
    for (let i = 0; i < ruleList.length; i += batchSize) {
      const batch = ruleList.slice(i, i + batchSize);
      await Promise.all(
        batch.map(async (rule) => {
          try {
            const success = rule.successUrl ? "<div>Success example</div>" : "";
            if (success) await analyzeHtmlClientSide(success);
          } catch {
            /* ignore */
          }
        })
      );
      setBatchProgress({ done: Math.min(i + batchSize, ruleList.length), total: ruleList.length });
      await new Promise((r) => requestAnimationFrame(r));
    }

    const cached = getAllCachedResults();
    let totalIssues = { critical: 0, serious: 0, moderate: 0, minor: 0 };
    for (const results of cached.values()) {
      for (const r of results) {
        if (r.audit) {
          totalIssues.critical += r.audit.summary.critical;
          totalIssues.serious += r.audit.summary.serious;
          totalIssues.moderate += r.audit.summary.moderate;
          totalIssues.minor += r.audit.summary.minor;
        }
      }
    }
    setCacheStats({
      analyzedRules: cached.size,
      totalIssues,
      fpCount: loadFPData(),
      auditFPCount: loadAuditIssueFPs(),
    });
    setBatchRunning(false);
  }, []);

  return (
    <Box sx={{ maxWidth: 720, mx: "auto", py: { xs: 2, sm: 4 }, px: { xs: 2, sm: 3 } }}>
      <Box
        className="raiden-hud"
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 0.5,
          "& .MuiTypography-root": { position: "relative", zIndex: 2 },
        }}
      >
        <Typography
          variant="caption"
          sx={{
            display: "block",
            mb: 0.5,
            fontFamily: '"IBM Plex Mono", monospace',
            letterSpacing: "0.16em",
            color: "primary.dark",
          }}
        >
          MISSION DATA
        </Typography>
        <Typography
          variant="h4"
          sx={{
            mb: 0.5,
            fontSize: { xs: "1.2rem", sm: "1.55rem" },
            color: "secondary.main",
            fontFamily: '"IBM Plex Mono", monospace',
            letterSpacing: "0.06em",
          }}
        >
          What do you want to test?
          <Box component="span" className="hud-blink" sx={{ color: "primary.main" }}>
            _
          </Box>
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "primary.main",
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: "0.75rem",
            opacity: 0.9,
          }}
        >
          {totalRules} rules · {cacheStats.analyzedRules} analyzed · {coveragePct}% coverage
          {totalIssueCount > 0 && ` · ${totalIssueCount} issues`}
          {fpTotal > 0 && ` · ${fpTotal} FPs`}
        </Typography>
      </Box>

      {recentRules.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Recently viewed
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
            {recentRules.map((rule, i) => (
              <Chip
                key={i}
                label={rule.name || rule.id}
                size="small"
                onClick={() => navigate(rule.path)}
                sx={{
                  cursor: "pointer",
                  borderColor: "primary.dark",
                  color: "primary.main",
                  "&:hover": { bgcolor: "action.hover" },
                }}
              />
            ))}
          </Box>
        </Box>
      )}

      <Box sx={{ mb: 2, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
        <Typography variant="subtitle2">Coverage by category</Typography>
        <Button
          size="small"
          variant="outlined"
          startIcon={batchRunning ? <RefreshIcon /> : <PlayArrowIcon />}
          onClick={handleBatchAnalysis}
          disabled={batchRunning}
        >
          {batchRunning ? `${batchProgress.done}/${batchProgress.total}` : "Batch analyze"}
        </Button>
      </Box>

      {batchRunning && (
        <LinearProgress
          variant="determinate"
          value={batchProgress.total ? (batchProgress.done / batchProgress.total) * 100 : 0}
          sx={{ mb: 2, height: 3 }}
        />
      )}

      <Table size="small" sx={{ border: 1, borderColor: "divider", borderRadius: 1 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600, fontSize: "0.75rem" }}>Category</TableCell>
            <TableCell align="right" sx={{ fontWeight: 600, fontSize: "0.75rem", width: 64 }}>
              Rules
            </TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: "0.75rem", width: "40%" }}>
              Analyzed
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ENGINE_RULE_CATEGORIES.map((cat) => {
            const total = cat.rules.length;
            const tested = cat.rules.filter((rId) => cachedRuleIds.has(rId)).length;
            const pct = total > 0 ? Math.round((tested / total) * 100) : 0;
            return (
              <TableRow key={cat.id} hover>
                <TableCell sx={{ fontSize: "0.8rem", py: 1 }}>{cat.label}</TableCell>
                <TableCell align="right" sx={{ fontSize: "0.8rem", py: 1, color: "text.secondary" }}>
                  {total}
                </TableCell>
                <TableCell sx={{ py: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={pct}
                      sx={{ flex: 1, height: 3 }}
                    />
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ minWidth: 48, textAlign: "right", fontFamily: "ui-monospace, monospace" }}
                    >
                      {tested}/{total}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 3 }}>
        Navigate via RAIDEN sidebar · global search scans engine + legacy rules
      </Typography>
    </Box>
  );
}
