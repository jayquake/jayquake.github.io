import {
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
  History as HistoryIcon,
  KeyboardArrowRight as ArrowRightIcon,
  PlayArrow as PlayArrowIcon,
  Science as ScienceIcon,
  Search as SearchIcon,
  Speed as SpeedIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  BugReport as BugReportIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import {
  alpha,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Fade,
  Grid,
  Grow,
  IconButton,
  InputAdornment,
  LinearProgress,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import engineRulesData from "../../data/engine-rules-metadata.json";
import ENGINE_RULE_CATEGORIES from "../../data/engine-rule-categories";
import { getAllCachedResults } from "../../utils/analysisCache";
import { analyzeHtmlClientSide } from "../../utils/clientAccessibilityTree";

const RECENT_RULES_KEY = "recentRulesViewed";
const RECENT_RUNS_KEY = "recentTestRuns";

function getRecentRules() {
  try {
    return JSON.parse(localStorage.getItem(RECENT_RULES_KEY) || "[]").slice(0, 8);
  } catch {
    return [];
  }
}

function getRecentRuns() {
  try {
    return JSON.parse(localStorage.getItem(RECENT_RUNS_KEY) || "[]").slice(0, 5);
  } catch {
    return [];
  }
}

const glassCard = {
  background: "rgba(255, 255, 255, 0.55)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.7)",
  borderRadius: 3,
  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
  },
};

function StatCard({ value, label, sublabel, color, icon: Icon, delay }) {
  return (
    <Grid item xs={6} sm={3}>
      <Grow in timeout={delay}>
        <Paper elevation={0} sx={{ ...glassCard, p: 2.5, textAlign: "center" }}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
            <Icon sx={{ fontSize: 28, color, opacity: 0.8 }} />
          </Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, color, mb: 0.25, fontSize: "2rem" }}
          >
            {value}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, color: "#334155", mb: 0.25 }}>
            {label}
          </Typography>
          <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.7rem" }}>
            {sublabel}
          </Typography>
        </Paper>
      </Grow>
    </Grid>
  );
}

function RecentRuleChip({ rule, onClick }) {
  return (
    <Chip
      label={rule.name || rule.id}
      size="small"
      onClick={onClick}
      icon={rule.type === "engine" ? <ScienceIcon sx={{ fontSize: 14 }} /> : undefined}
      sx={{
        background: "rgba(255,255,255,0.6)",
        border: "1px solid rgba(148, 163, 184, 0.2)",
        fontWeight: 500,
        fontSize: "0.75rem",
        cursor: "pointer",
        "&:hover": {
          background: "rgba(102, 126, 234, 0.12)",
          borderColor: "rgba(102, 126, 234, 0.3)",
        },
      }}
    />
  );
}

function CategoryCoverageCard({ category, delay, cachedRuleIds }) {
  const total = category.rules.length;
  const tested = category.rules.filter((rId) => cachedRuleIds.has(rId)).length;
  const coverage = total > 0 ? Math.round((tested / total) * 100) : 0;

  return (
    <Grid item xs={6} sm={4} md={3}>
      <Grow in timeout={delay}>
        <Paper elevation={0} sx={{ ...glassCard, p: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: "#334155", fontSize: "0.8rem" }}>
              {category.label}
            </Typography>
            <Chip
              label={`${total}`}
              size="small"
              sx={{
                height: 20,
                fontSize: "0.65rem",
                fontWeight: 700,
                bgcolor: alpha(category.color, 0.12),
                color: category.color,
              }}
            />
          </Box>
          <LinearProgress
            variant="determinate"
            value={coverage}
            sx={{
              height: 6,
              borderRadius: 3,
              bgcolor: "rgba(148, 163, 184, 0.15)",
              "& .MuiLinearProgress-bar": {
                borderRadius: 3,
                bgcolor: category.color,
              },
            }}
          />
          <Typography variant="caption" sx={{ color: "#94a3b8", mt: 0.5, display: "block" }}>
            {tested}/{total} analyzed
          </Typography>
        </Paper>
      </Grow>
    </Grid>
  );
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
  } catch { return 0; }
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
  } catch { return 0; }
}

export default function Home({ title }) {
  const navigate = useNavigate();
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  const [jumpSearch, setJumpSearch] = useState("");
  const [recentRules] = useState(getRecentRules);
  const [recentRuns] = useState(getRecentRuns);
  const [mobileTab, setMobileTab] = useState(0);
  const [batchRunning, setBatchRunning] = useState(false);
  const [batchProgress, setBatchProgress] = useState({ done: 0, total: 0 });
  const [cacheStats, setCacheStats] = useState(() => {
    const cached = getAllCachedResults();
    let totalIssues = { critical: 0, serious: 0, moderate: 0, minor: 0 };
    let contrastFails = 0;
    for (const results of cached.values()) {
      for (const r of results) {
        if (r.audit) {
          totalIssues.critical += r.audit.summary.critical;
          totalIssues.serious += r.audit.summary.serious;
          totalIssues.moderate += r.audit.summary.moderate;
          totalIssues.minor += r.audit.summary.minor;
          contrastFails += r.audit.contrastResults.filter(c => !c.passes).length;
        }
      }
    }
    return {
      analyzedRules: cached.size,
      totalIssues,
      contrastFails,
      fpCount: loadFPData(),
      auditFPCount: loadAuditIssueFPs(),
    };
  });

  useEffect(() => {
    document.title = title;
  }, [title]);

  const allRules = useMemo(() => {
    const engine = engineRulesData.map((r) => ({
      id: r.id,
      name: r.title,
      type: "engine",
      path: `/engine/${r.id}`,
    }));
    return engine;
  }, []);

  const filteredRules = useMemo(() => {
    if (!jumpSearch.trim()) return [];
    const q = jumpSearch.toLowerCase();
    return allRules.filter((r) => r.name.toLowerCase().includes(q) || r.id.toLowerCase().includes(q)).slice(0, 8);
  }, [jumpSearch, allRules]);

  const handleRuleClick = useCallback(
    (path) => {
      navigate(path);
    },
    [navigate]
  );

  const headerSection = (
    <Fade in timeout={600}>
      <Box sx={{ mb: { xs: 2, sm: 4 } }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: "#1e293b", mb: 0.5, fontSize: { xs: "1.5rem", sm: "2rem" } }}>
          Rule Library
        </Typography>
        <Typography variant="body1" sx={{ color: "#64748b", fontSize: { xs: "0.85rem", sm: "1rem" } }}>
          Browse, test, and validate 248+ accessibility rules
        </Typography>
      </Box>
    </Fade>
  );

  const totalRules = engineRulesData.length;
  const coveragePct = totalRules > 0 ? Math.round((cacheStats.analyzedRules / totalRules) * 100) : 0;
  const totalIssueCount = cacheStats.totalIssues.critical + cacheStats.totalIssues.serious + cacheStats.totalIssues.moderate + cacheStats.totalIssues.minor;

  const statsSection = (
    <Fade in timeout={800}>
      <Grid container spacing={{ xs: 1.5, sm: 2 }} sx={{ mb: { xs: 2, sm: 3 } }}>
        <StatCard value={String(totalRules)} label="Total Rules" sublabel={`${cacheStats.analyzedRules} analyzed`} color="#667eea" icon={TrendingUpIcon} delay={600} />
        <StatCard value={String(totalIssueCount)} label="Issues Found" sublabel={`${cacheStats.totalIssues.critical} critical, ${cacheStats.totalIssues.serious} serious`} color="#f44336" icon={BugReportIcon} delay={700} />
        <StatCard value={String(cacheStats.fpCount + cacheStats.auditFPCount)} label="False Positives" sublabel="flagged by reviewers" color="#ff9800" icon={WarningIcon} delay={800} />
        <StatCard value={`${coveragePct}%`} label="Coverage" sublabel={`${cacheStats.analyzedRules} of ${totalRules} rules`} color="#e91e63" icon={TrendingUpIcon} delay={900} />
      </Grid>
    </Fade>
  );

  const searchSection = (
    <Fade in timeout={900}>
      <Paper elevation={0} sx={{ ...glassCard, p: { xs: 2, sm: 2.5 }, mb: { xs: 2, sm: 3 } }}>
        <Typography id="jump-to-rule-heading" variant="subtitle2" component="h2" sx={{ fontWeight: 700, color: "#334155", mb: 1.5 }}>
          Jump to Rule
        </Typography>
        <TextField
          size="small"
          type="search"
          placeholder="Search by rule name or ID..."
          value={jumpSearch}
          onChange={(e) => setJumpSearch(e.target.value)}
          fullWidth
          inputProps={{
            "aria-labelledby": "jump-to-rule-heading",
            "aria-label": "Search by rule name or ID",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#94a3b8" }} aria-hidden />
              </InputAdornment>
            ),
            endAdornment: jumpSearch && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setJumpSearch("")} aria-label="Clear search">
                  <CancelIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              minWidth: 0,
              bgcolor: "rgba(255,255,255,0.7)",
              borderRadius: 2,
              "& fieldset": { borderColor: "rgba(148, 163, 184, 0.3)" },
              "&:hover fieldset": { borderColor: "rgba(102, 126, 234, 0.4)" },
              "&.Mui-focused fieldset": { borderColor: "#667eea" },
            },
          }}
        />
        {filteredRules.length > 0 && (
          <Box sx={{ mt: 1.5, display: "flex", flexWrap: "wrap", gap: 0.75 }}>
            {filteredRules.map((r) => (
              <Chip
                key={r.id}
                label={r.name}
                size="small"
                icon={<ArrowRightIcon sx={{ fontSize: 14 }} />}
                onClick={() => handleRuleClick(r.path)}
                sx={{
                  cursor: "pointer",
                  fontWeight: 500,
                  fontSize: "0.75rem",
                  bgcolor: "rgba(102, 126, 234, 0.08)",
                  border: "1px solid rgba(102, 126, 234, 0.2)",
                  "&:hover": { bgcolor: "rgba(102, 126, 234, 0.16)" },
                }}
              />
            ))}
          </Box>
        )}
      </Paper>
    </Fade>
  );

  const recentAndActionsSection = (
    <Grid container spacing={2.5} sx={{ mb: { xs: 2, sm: 3 } }}>
      <Grid item xs={12} md={7}>
        <Fade in timeout={1000}>
          <Paper elevation={0} sx={{ ...glassCard, p: { xs: 2, sm: 2.5 }, height: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <HistoryIcon sx={{ fontSize: 20, color: "#667eea", mr: 1 }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#334155" }}>
                Recently Viewed Rules
              </Typography>
            </Box>
            {recentRules.length > 0 ? (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
                {recentRules.map((rule, i) => (
                  <RecentRuleChip key={i} rule={rule} onClick={() => handleRuleClick(rule.path)} />
                ))}
              </Box>
            ) : (
              <Typography variant="body2" sx={{ color: "#94a3b8", fontStyle: "italic" }}>
                No rules viewed yet. Use the tree sidebar to browse rules.
              </Typography>
            )}
          </Paper>
        </Fade>
      </Grid>
      <Grid item xs={12} md={5}>
        <Fade in timeout={1100}>
          <Paper elevation={0} sx={{ ...glassCard, p: { xs: 2, sm: 2.5 }, height: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <PlayArrowIcon sx={{ fontSize: 20, color: "#00897b", mr: 1 }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#334155" }}>
                Quick Actions
              </Typography>
            </Box>
            <Stack spacing={1}>
              <Card elevation={0} sx={{ bgcolor: "rgba(0, 137, 123, 0.06)", border: "1px solid rgba(0, 137, 123, 0.15)", borderRadius: 2 }}>
                <CardActionArea onClick={() => navigate("/test-runner/atomic-tests")} sx={{ p: 1.5 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ScienceIcon sx={{ fontSize: 18, color: "#00897b", mr: 1.5 }} />
                    <Box flex={1}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: "#334155" }}>Run Atomic Tests</Typography>
                      <Typography variant="caption" sx={{ color: "#94a3b8" }}>1,288 pass/fail HTML fixtures</Typography>
                    </Box>
                    <ArrowRightIcon sx={{ color: "#94a3b8" }} />
                  </Box>
                </CardActionArea>
              </Card>
              <Card elevation={0} sx={{ bgcolor: "rgba(102, 126, 234, 0.06)", border: "1px solid rgba(102, 126, 234, 0.15)", borderRadius: 2 }}>
                <CardActionArea onClick={() => navigate("/test-runner/library")} sx={{ p: 1.5 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <PlayArrowIcon sx={{ fontSize: 18, color: "#667eea", mr: 1.5 }} />
                    <Box flex={1}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: "#334155" }}>Test Runner</Typography>
                      <Typography variant="caption" sx={{ color: "#94a3b8" }}>Playwright E2E test suites</Typography>
                    </Box>
                    <ArrowRightIcon sx={{ color: "#94a3b8" }} />
                  </Box>
                </CardActionArea>
              </Card>
              <Card elevation={0} sx={{ bgcolor: "rgba(92, 107, 192, 0.06)", border: "1px solid rgba(92, 107, 192, 0.15)", borderRadius: 2 }}>
                <CardActionArea onClick={() => navigate("/rule-lab")} sx={{ p: 1.5 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ScienceIcon sx={{ fontSize: 18, color: "#5c6bc0", mr: 1.5 }} />
                    <Box flex={1}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: "#334155" }}>Rule Lab</Typography>
                      <Typography variant="caption" sx={{ color: "#94a3b8" }}>MCP analysis and discovery</Typography>
                    </Box>
                    <ArrowRightIcon sx={{ color: "#94a3b8" }} />
                  </Box>
                </CardActionArea>
              </Card>
            </Stack>
          </Paper>
        </Fade>
      </Grid>
    </Grid>
  );

  const cachedRuleIds = useMemo(() => {
    const cached = getAllCachedResults();
    return new Set(cached.keys());
  }, [cacheStats]);

  const unanalyzedRules = useMemo(() => {
    return engineRulesData.filter((r) => !cachedRuleIds.has(r.id || r.kebabId));
  }, [cachedRuleIds]);

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
            const success = rule.successUrl ? '<div>Success example</div>' : '';
            if (success) await analyzeHtmlClientSide(success);
          } catch { /* ignore */ }
        })
      );
      setBatchProgress({ done: Math.min(i + batchSize, ruleList.length), total: ruleList.length });
      await new Promise((r) => requestAnimationFrame(r));
    }

    // Refresh stats
    const cached = getAllCachedResults();
    let totalIssues = { critical: 0, serious: 0, moderate: 0, minor: 0 };
    let contrastFails = 0;
    for (const results of cached.values()) {
      for (const r of results) {
        if (r.audit) {
          totalIssues.critical += r.audit.summary.critical;
          totalIssues.serious += r.audit.summary.serious;
          totalIssues.moderate += r.audit.summary.moderate;
          totalIssues.minor += r.audit.summary.minor;
          contrastFails += r.audit.contrastResults.filter(c => !c.passes).length;
        }
      }
    }
    setCacheStats({
      analyzedRules: cached.size,
      totalIssues,
      contrastFails,
      fpCount: loadFPData(),
      auditFPCount: loadAuditIssueFPs(),
    });
    setBatchRunning(false);
  }, []);

  const coverageSection = (
    <>
      <Fade in timeout={1200}>
        <Paper elevation={0} sx={{ ...glassCard, p: { xs: 2, sm: 2.5 }, mb: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2, flexWrap: "wrap", gap: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TrendingUpIcon sx={{ fontSize: 20, color: "#667eea", mr: 1 }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#334155" }}>
                Engine Rule Coverage by Category
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Chip label={`${totalRules} rules`} size="small" sx={{ fontWeight: 600, bgcolor: "rgba(103,58,183,0.1)", color: "#673ab7" }} />
              <Button
                size="small"
                variant="outlined"
                startIcon={batchRunning ? <RefreshIcon sx={{ animation: "spin 1s linear infinite", "@keyframes spin": { "0%": { transform: "rotate(0deg)" }, "100%": { transform: "rotate(360deg)" } } }} /> : <PlayArrowIcon />}
                onClick={handleBatchAnalysis}
                disabled={batchRunning}
                sx={{ textTransform: "none", fontSize: "0.75rem" }}
              >
                {batchRunning ? `${batchProgress.done}/${batchProgress.total}` : "Batch Analyze"}
              </Button>
            </Box>
          </Box>
          {batchRunning && (
            <LinearProgress
              variant="determinate"
              value={batchProgress.total ? (batchProgress.done / batchProgress.total) * 100 : 0}
              sx={{ mb: 2, height: 6, borderRadius: 3 }}
            />
          )}
          <Grid container spacing={1.5}>
            {ENGINE_RULE_CATEGORIES.map((cat, i) => (
              <CategoryCoverageCard key={cat.id} category={cat} delay={1000 + i * 80} cachedRuleIds={cachedRuleIds} />
            ))}
          </Grid>
        </Paper>
      </Fade>

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={6}>
          <Fade in timeout={1400}>
            <Paper elevation={0} sx={{ ...glassCard, p: { xs: 2, sm: 2.5 } }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <WarningIcon sx={{ fontSize: 20, color: "#ff9800", mr: 1 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#334155" }}>
                  False Positive Tracker
                </Typography>
              </Box>
              {(cacheStats.fpCount + cacheStats.auditFPCount) > 0 ? (
                <Typography variant="body2" sx={{ color: "#64748b", mb: 1.5 }}>
                  {cacheStats.fpCount + cacheStats.auditFPCount} items flagged as false positives across {cacheStats.analyzedRules} analyzed rules.
                </Typography>
              ) : (
                <Typography variant="body2" sx={{ color: "#94a3b8", fontStyle: "italic", mb: 1.5 }}>
                  No false positives tracked yet. Flag issues when analyzing examples.
                </Typography>
              )}
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Chip label={`${cacheStats.fpCount} Example FPs`} size="small" sx={{ bgcolor: "rgba(255, 152, 0, 0.1)", color: "#ff9800", fontWeight: 600 }} />
                <Chip label={`${cacheStats.auditFPCount} Audit Issue FPs`} size="small" sx={{ bgcolor: "rgba(233, 30, 99, 0.1)", color: "#e91e63", fontWeight: 600 }} />
                {cacheStats.contrastFails > 0 && (
                  <Chip label={`${cacheStats.contrastFails} Contrast Failures`} size="small" sx={{ bgcolor: "rgba(244, 67, 54, 0.08)", color: "#f44336", fontWeight: 600 }} />
                )}
              </Box>
            </Paper>
          </Fade>
        </Grid>
        <Grid item xs={12} md={6}>
          <Fade in timeout={1500}>
            <Paper elevation={0} sx={{ ...glassCard, p: { xs: 2, sm: 2.5 } }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <CancelIcon sx={{ fontSize: 20, color: "#f44336", mr: 1 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#334155" }}>
                  Coverage Gaps
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "#64748b", mb: 1.5 }}>
                {unanalyzedRules.length} rules have not been analyzed yet.
              </Typography>
              <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap", maxHeight: 120, overflow: "auto" }}>
                {unanalyzedRules.slice(0, 12).map((r) => (
                  <Chip
                    key={r.id}
                    label={r.title || r.id}
                    size="small"
                    onClick={() => navigate(`/engine/${r.id}`)}
                    sx={{
                      cursor: "pointer",
                      bgcolor: "rgba(244, 67, 54, 0.06)",
                      color: "#f44336",
                      fontWeight: 500,
                      fontSize: "0.7rem",
                      "&:hover": { bgcolor: "rgba(244, 67, 54, 0.12)" },
                    }}
                  />
                ))}
                {unanalyzedRules.length > 12 && (
                  <Chip
                    label={`+${unanalyzedRules.length - 12} more`}
                    size="small"
                    sx={{ bgcolor: "rgba(148, 163, 184, 0.1)", color: "#94a3b8", fontWeight: 500, fontSize: "0.7rem" }}
                  />
                )}
              </Box>
            </Paper>
          </Fade>
        </Grid>
      </Grid>
    </>
  );

  if (isMobile) {
    return (
      <Box sx={{ position: "relative", minHeight: "calc(100vh - 130px)" }}>
        <Box sx={{ py: 2, px: 2 }}>
          {headerSection}
          <Tabs
            value={mobileTab}
            onChange={(_, v) => setMobileTab(v)}
            variant="fullWidth"
            sx={{
              mb: 2,
              minHeight: 36,
              "& .MuiTab-root": {
                minHeight: 36,
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.8rem",
                color: "#94a3b8",
                "&.Mui-selected": { color: "#667eea" },
              },
              "& .MuiTabs-indicator": {
                bgcolor: "#667eea",
                height: 3,
                borderRadius: 1.5,
              },
            }}
          >
            <Tab label="Overview" />
            <Tab label="Quick Access" />
            <Tab label="Coverage" />
          </Tabs>
          {mobileTab === 0 && (
            <>
              {statsSection}
              {searchSection}
            </>
          )}
          {mobileTab === 1 && recentAndActionsSection}
          {mobileTab === 2 && coverageSection}
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ position: "relative", minHeight: "calc(100vh - 100px)" }}>
      <Box sx={{ py: 3, px: { xs: 2, sm: 3, md: 4 } }}>
        {headerSection}
        {statsSection}
        {searchSection}
        {recentAndActionsSection}
        {coverageSection}
      </Box>
    </Box>
  );
}
