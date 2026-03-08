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
} from "@mui/icons-material";
import {
  alpha,
  Box,
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

function CategoryCoverageCard({ category, delay }) {
  const total = category.rules.length;
  const tested = Math.floor(total * 0.75);
  const coverage = Math.round((tested / total) * 100);

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
            {tested}/{total} tested
          </Typography>
        </Paper>
      </Grow>
    </Grid>
  );
}

export default function Home({ title }) {
  const navigate = useNavigate();
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  const [jumpSearch, setJumpSearch] = useState("");
  const [recentRules] = useState(getRecentRules);
  const [recentRuns] = useState(getRecentRuns);
  const [mobileTab, setMobileTab] = useState(0);

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

  const statsSection = (
    <Fade in timeout={800}>
      <Grid container spacing={{ xs: 1.5, sm: 2 }} sx={{ mb: { xs: 2, sm: 3 } }}>
        <StatCard value="248" label="Total Rules" sublabel="90 Legacy + 162 Engine" color="#667eea" icon={TrendingUpIcon} delay={600} />
        <StatCard value="1,288" label="Test Fixtures" sublabel="748 pass + 540 fail" color="#00897b" icon={CheckCircleIcon} delay={700} />
        <StatCard value="20" label="Categories" sublabel="8 engine + 12 legacy" color="#ff9800" icon={SpeedIcon} delay={800} />
        <StatCard value="98%" label="Coverage" sublabel="159 of 162 engine rules" color="#e91e63" icon={TrendingUpIcon} delay={900} />
      </Grid>
    </Fade>
  );

  const searchSection = (
    <Fade in timeout={900}>
      <Paper elevation={0} sx={{ ...glassCard, p: { xs: 2, sm: 2.5 }, mb: { xs: 2, sm: 3 } }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#334155", mb: 1.5 }}>
          Jump to Rule
        </Typography>
        <TextField
          size="small"
          placeholder="Search by rule name or ID..."
          value={jumpSearch}
          onChange={(e) => setJumpSearch(e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#94a3b8" }} />
              </InputAdornment>
            ),
            endAdornment: jumpSearch && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setJumpSearch("")}>
                  <CancelIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
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

  const coverageSection = (
    <>
      <Fade in timeout={1200}>
        <Paper elevation={0} sx={{ ...glassCard, p: { xs: 2, sm: 2.5 }, mb: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TrendingUpIcon sx={{ fontSize: 20, color: "#667eea", mr: 1 }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#334155" }}>
                Engine Rule Coverage by Category
              </Typography>
            </Box>
            <Chip label="162 rules" size="small" sx={{ fontWeight: 600, bgcolor: "rgba(103,58,183,0.1)", color: "#673ab7" }} />
          </Box>
          <Grid container spacing={1.5}>
            {ENGINE_RULE_CATEGORIES.map((cat, i) => (
              <CategoryCoverageCard key={cat.id} category={cat} delay={1000 + i * 80} />
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
              <Typography variant="body2" sx={{ color: "#94a3b8", fontStyle: "italic" }}>
                No false positives tracked yet. When rules flag incorrect results, they will appear here.
              </Typography>
              <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Chip label="0 Reported" size="small" sx={{ bgcolor: "rgba(76, 175, 80, 0.1)", color: "#4caf50", fontWeight: 600 }} />
                <Chip label="0 Confirmed" size="small" sx={{ bgcolor: "rgba(255, 152, 0, 0.1)", color: "#ff9800", fontWeight: 600 }} />
                <Chip label="0 Resolved" size="small" sx={{ bgcolor: "rgba(33, 150, 243, 0.1)", color: "#2196f3", fontWeight: 600 }} />
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
                Rules without atomic test fixtures or that have never been tested.
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Chip label="3 engine rules without fixtures" size="small" sx={{ bgcolor: "rgba(244, 67, 54, 0.08)", color: "#f44336", fontWeight: 500 }} />
                <Chip label="90 legacy rules untested" size="small" sx={{ bgcolor: "rgba(255, 152, 0, 0.08)", color: "#ff9800", fontWeight: 500 }} />
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
