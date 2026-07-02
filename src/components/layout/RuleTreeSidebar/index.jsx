import AccessibilityIcon from "@mui/icons-material/Accessibility";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import BugReportIcon from "@mui/icons-material/BugReport";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ImageIcon from "@mui/icons-material/Image";
import LinkIcon from "@mui/icons-material/Link";
import ScienceIcon from "@mui/icons-material/Science";
import SearchIcon from "@mui/icons-material/Search";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import WidgetsIcon from "@mui/icons-material/Widgets";
import {
  Box,
  Collapse,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { HudLayoutIndicator } from "../../motion/HudMotion";
import ENGINE_RULE_CATEGORIES from "../../../data/engine-rule-categories";
import { fetchEngineRulesCatalog, getEngineRulesCatalogCache } from "../../../utils/engineRulesDataService";
import { prefetchEngineExample } from "../../../utils/engineExampleUtils";
import { DataService } from "../../util/dataService";
import { getAllCachedResults } from "../../../utils/analysisCache";

const STORAGE_KEY = "ruleTreeExpanded";

const ICON_MAP = {
  Accessibility: AccessibilityIcon,
  EditNote: EditNoteIcon,
  Link: LinkIcon,
  Image: ImageIcon,
  AccountTree: AccountTreeIcon,
  Widgets: WidgetsIcon,
  TextFields: TextFieldsIcon,
  Description: DescriptionIcon,
};

const LEGACY_CRITERIA_COLORS = {
  graphics: "#00a38d",
  forms: "#2196f3",
  keyboard: "#ff9800",
  navigation: "#9c27b0",
  headings: "#f44336",
  errors: "#607d8b",
  carousels: "#ff5722",
  clickables: "#e91e63",
  context: "#00bcd4",
  document: "#795548",
  readability: "#8bc34a",
  tables: "#3f51b5",
};

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const DEFAULT_EXPANDED = {
  "tier-engine": true,
};

function loadExpanded() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? { ...DEFAULT_EXPANDED, ...JSON.parse(stored) } : { ...DEFAULT_EXPANDED };
  } catch {
    return { ...DEFAULT_EXPANDED };
  }
}

function saveExpanded(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* noop */ }
}

const LEAF_ITEMS = [
  { key: "success", label: "Success examples", icon: CheckCircleIcon, color: "#6ee7b7" },
  { key: "failure", label: "Failure examples", icon: CancelIcon, color: "#ff6b6b" },
  { key: "rule-lab", label: "Rule Lab", icon: ScienceIcon, color: "#8b9cf6" },
  { key: "mcp-debug", label: "MCP Debug", icon: BugReportIcon, color: "#ffb74d" },
];

function RuleActionBar({ items, leafPaths, ruleId, ruleType, onNavigate, location, isOpen }) {
  if (!isOpen) return null;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.25,
        pl: 6.5,
        pr: 1,
        py: 0.25,
        mb: 0.25,
      }}
    >
      {items.map((item) => {
        const Icon = item.icon;
        const to = leafPaths[item.key];
        const isActive =
          item.key === "mcp-debug"
            ? location.pathname + location.search === to
            : location.pathname === to;
        return (
          <Tooltip key={item.key} title={item.label} placement="top">
            <IconButton
              component={RouterLink}
              to={to}
              size="small"
              onClick={() => onNavigate(to)}
              onMouseEnter={
                ruleType === "engine" && (item.key === "success" || item.key === "failure")
                  ? () => prefetchEngineExample(ruleId, item.key)
                  : undefined
              }
              aria-label={item.label}
              sx={{
                p: 0.4,
                border: 1,
                borderColor: isActive ? item.color : "divider",
                borderRadius: 0.5,
                bgcolor: isActive ? alpha(item.color, 0.15) : "transparent",
                color: item.color,
                "&:hover": {
                  bgcolor: alpha(item.color, 0.12),
                  borderColor: item.color,
                },
              }}
            >
              <Icon sx={{ fontSize: 13 }} />
            </IconButton>
          </Tooltip>
        );
      })}
    </Box>
  );
}

function HealthDot({ status }) {
  const colors = {
    green: "#00a38d",
    yellow: "#ff9800",
    red: "#f44336",
    gray: "#cbd5e1",
  };
  return (
    <Tooltip title={
      status === "green" ? "No critical/serious issues" :
      status === "yellow" ? "Has moderate/minor issues" :
      status === "red" ? "Has critical/serious issues" :
      "Not analyzed"
    }>
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          bgcolor: colors[status] || colors.gray,
          flexShrink: 0,
          opacity: status === "gray" ? 0.4 : 0.8,
          ml: 0.5,
        }}
      />
    </Tooltip>
  );
}

function RuleNode({ ruleId, ruleLabel, ruleType, criteriaOrCategory, isOpen, expanded, onToggle, onNavigate, location, healthStatus }) {
  const nodeKey = `rule-${ruleType}-${ruleId}`;
  const isExpanded = expanded[nodeKey] ?? false;
  const basePath = ruleType === "engine" ? `/engine/${ruleId}` : `/${criteriaOrCategory}/${ruleId}`;
  const isRuleActive =
    location.pathname === basePath ||
    location.pathname.startsWith(`${basePath}_`);

  const displayLabel = ruleType === "engine" ? ruleId : ruleLabel;
  const tooltipTitle = ruleType === "engine" ? ruleLabel : ruleId;

  const handleClick = () => {
    onNavigate(basePath);
  };

  const handleToggle = (e) => {
    e.stopPropagation();
    onToggle(`rule-${ruleType}-${ruleId}`);
  };

  const leafPaths = useMemo(() => ({
    success: `${basePath}_success`,
    failure: `${basePath}_failure`,
    "rule-lab": `/rule-lab?rule=${ruleId}&type=${ruleType}`,
    "mcp-debug":
      ruleType === "engine"
        ? `${basePath}?debug=mcp`
        : `/rule-lab?rule=${ruleId}&type=${ruleType}&mode=mcp`,
  }), [basePath, ruleId, ruleType]);

  return (
    <>
      <Tooltip title={isOpen ? tooltipTitle : displayLabel} placement="right" disableHoverListener={!isOpen}>
        <ListItemButton
          component={RouterLink}
          to={basePath}
          onClick={handleClick}
          selected={isRuleActive}
          sx={{
            pl: isOpen ? 5.5 : 2,
            py: 0.25,
            minHeight: 26,
            borderRadius: 1,
            mx: isOpen ? 0.5 : 0,
            textDecoration: "none",
            color: "inherit",
            position: "relative",
            "&.Mui-selected": {
              bgcolor: "action.selected",
            },
            "&:hover": { bgcolor: "action.hover" },
          }}
        >
          {isRuleActive && ruleType === "engine" && (
            <HudLayoutIndicator
              layoutId="sidebar-rule-active"
              style={{
                position: "absolute",
                left: 0,
                top: 4,
                bottom: 4,
                width: 2,
                backgroundColor: "#00a38d",
                pointerEvents: "none",
              }}
            />
          )}
          {isOpen && (
            <IconButton
              size="small"
              onClick={handleToggle}
              aria-label={isExpanded ? "Collapse rule actions" : "Expand rule actions"}
              sx={{ p: 0, mr: 0.25, width: 16, height: 16, flexShrink: 0 }}
            >
              {isExpanded ? (
                <ExpandMoreIcon sx={{ fontSize: 13, color: "text.secondary" }} />
              ) : (
                <ChevronRightIcon sx={{ fontSize: 13, color: "text.secondary" }} />
              )}
            </IconButton>
          )}
          {isOpen && (
            <>
              <ListItemText
                primary={displayLabel}
                primaryTypographyProps={{
                  fontFamily: ruleType === "engine" ? '"IBM Plex Mono", monospace' : undefined,
                  fontSize: ruleType === "engine" ? "0.68rem" : "0.74rem",
                  fontWeight: isRuleActive ? 600 : 500,
                  color: isRuleActive ? "primary.light" : "text.primary",
                  noWrap: true,
                }}
              />
              <HealthDot status={healthStatus || "gray"} />
            </>
          )}
        </ListItemButton>
      </Tooltip>
      {isOpen && (isExpanded || isRuleActive) && (
        <RuleActionBar
          items={LEAF_ITEMS}
          leafPaths={leafPaths}
          ruleId={ruleId}
          ruleType={ruleType}
          onNavigate={onNavigate}
          location={location}
          isOpen={isOpen}
        />
      )}
    </>
  );
}

function CategoryNode({ categoryId, label, color, icon, rules, ruleType, isOpen, expanded, onToggle, onNavigate, location, search, healthMap, getEngineRuleTitle }) {
  const isExpanded = expanded[`cat-${ruleType}-${categoryId}`] || false;
  const Icon = typeof icon === "string" ? ICON_MAP[icon] || DescriptionIcon : icon;

  const filteredRules = useMemo(() => {
    if (!search) return rules;
    const q = search.toLowerCase();
    return rules.filter((r) => {
      const ruleId = typeof r === "string" ? r : r.id || r.route;
      const label =
        typeof r === "string"
          ? ruleType === "engine"
            ? getEngineRuleTitle(r)
            : r
          : r.name || r.label || ruleId;
      return ruleId.toLowerCase().includes(q) || String(label).toLowerCase().includes(q);
    });
  }, [rules, search, ruleType, getEngineRuleTitle]);

  if (search && filteredRules.length === 0) return null;

  const handleToggle = () => {
    onToggle(`cat-${ruleType}-${categoryId}`);
  };

  return (
    <>
      <ListItemButton
        onClick={handleToggle}
        sx={{
          pl: isOpen ? 4 : 2,
          py: 0.5,
          minHeight: 32,
          borderRadius: 1.5,
          mx: isOpen ? 0.5 : 0,
          "&:hover": { bgcolor: alpha(color, 0.08) },
        }}
      >
        <ListItemIcon sx={{ minWidth: isOpen ? 28 : 24, mr: isOpen ? 0.5 : 0 }}>
          <Icon sx={{ fontSize: 16, color }} />
        </ListItemIcon>
        {isOpen && (
          <>
            <ListItemText
              primary={label}
              primaryTypographyProps={{
                fontSize: "0.76rem",
                fontWeight: 600,
                color: "text.primary",
              }}
            />
            <Typography variant="caption" sx={{ color: "primary.light", fontSize: "0.65rem", fontWeight: 600 }}>
              {filteredRules.length}
            </Typography>
            {isExpanded ? (
              <ExpandMoreIcon sx={{ fontSize: 16, color: "text.secondary", ml: 0.5 }} />
            ) : (
              <ChevronRightIcon sx={{ fontSize: 16, color: "text.secondary", ml: 0.5 }} />
            )}
          </>
        )}
      </ListItemButton>
      {isOpen && (
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <List disablePadding>
            {filteredRules.map((rule) => {
              const ruleId = typeof rule === "string" ? rule : rule.id || rule.route;
              const ruleLabel = typeof rule === "string"
                ? (ruleType === "engine" ? getEngineRuleTitle(rule) : rule)
                : (rule.name || rule.label || rule.id);
              return (
                <RuleNode
                  key={ruleId}
                  ruleId={ruleId}
                  ruleLabel={ruleLabel}
                  ruleType={ruleType}
                  criteriaOrCategory={categoryId}
                  isOpen={isOpen}
                  expanded={expanded}
                  onToggle={onToggle}
                  onNavigate={onNavigate}
                  location={location}
                  healthStatus={healthMap?.[ruleId]}
                />
              );
            })}
          </List>
        </Collapse>
      )}
    </>
  );
}

function TierNode({ tierId, label, icon: Icon, count, color, isOpen, expanded, onToggle, onRequestOpen, children }) {
  const isExpanded = expanded[`tier-${tierId}`] || false;

  const handleClick = () => {
    if (!isOpen && onRequestOpen) {
      onRequestOpen();
      if (!isExpanded) onToggle(`tier-${tierId}`);
    } else {
      onToggle(`tier-${tierId}`);
    }
  };

  return (
    <>
      <Tooltip title={!isOpen ? `${label} (${count})` : ""} placement="right">
        <ListItemButton
          onClick={handleClick}
          sx={{
            pl: isOpen ? 2 : 1.5,
            py: isOpen ? 0.8 : 1,
            minHeight: isOpen ? 40 : 44,
            borderRadius: 2,
            mx: isOpen ? 0.5 : 0.25,
            mb: 0.25,
            "&:hover": { bgcolor: alpha(color, 0.08) },
          }}
        >
          <ListItemIcon sx={{ minWidth: isOpen ? 32 : 28, mr: isOpen ? 1 : 0 }}>
            <Icon sx={{ fontSize: isOpen ? 20 : 22, color }} />
          </ListItemIcon>
          {isOpen && (
            <>
              <ListItemText
                primary={label}
                primaryTypographyProps={{
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: "text.primary",
                }}
              />
              <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, fontSize: "0.7rem" }}>
                {count}
              </Typography>
              {isExpanded ? (
                <ExpandMoreIcon sx={{ fontSize: 18, color: "text.secondary", ml: 0.5 }} />
              ) : (
                <ChevronRightIcon sx={{ fontSize: 18, color: "text.secondary", ml: 0.5 }} />
              )}
            </>
          )}
        </ListItemButton>
      </Tooltip>
      {isOpen && (
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <List disablePadding>{children}</List>
        </Collapse>
      )}
    </>
  );
}

export default function RuleTreeSidebar({
  isOpen = true,
  showDashboardLink = true,
  onRequestOpen,
  onCloseMobile,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(loadExpanded);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [engineTitles, setEngineTitles] = useState({});
  const [engineRuleCount, setEngineRuleCount] = useState(0);

  const getEngineRuleTitle = useCallback(
    (ruleId) => engineTitles[ruleId] || ruleId,
    [engineTitles]
  );

  useEffect(() => {
    const cached = getEngineRulesCatalogCache();
    if (cached) {
      const titles = {};
      cached.rules.forEach((row) => {
        titles[row.id] = row.title;
      });
      setEngineTitles(titles);
      setEngineRuleCount(cached.rules.length);
      return undefined;
    }

    let cancelled = false;
    fetchEngineRulesCatalog()
      .then((catalog) => {
        if (cancelled) return;
        const titles = {};
        catalog.rules.forEach((row) => {
          titles[row.id] = row.title;
        });
        setEngineTitles(titles);
        setEngineRuleCount(catalog.rules.length);
      })
      .catch(() => {
        if (!cancelled) {
          setEngineTitles({});
          setEngineRuleCount(0);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    DataService.getData()
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setData([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    saveExpanded(expanded);
  }, [expanded]);

  useEffect(() => {
    const engineMatch = location.pathname.match(/^\/engine\/([^_/?]+)/);
    if (!engineMatch) return;
    const ruleId = engineMatch[1];
    const category = ENGINE_RULE_CATEGORIES.find((cat) => cat.rules.includes(ruleId));
    if (!category) return;
    setExpanded((prev) => ({
      ...prev,
      "tier-engine": true,
      [`cat-engine-${category.id}`]: true,
      [`rule-engine-${ruleId}`]: true,
    }));
  }, [location.pathname]);

  const handleToggle = useCallback((nodeId) => {
    setExpanded((prev) => {
      const next = { ...prev, [nodeId]: !prev[nodeId] };
      return next;
    });
  }, []);

  const handleNavigate = useCallback(
    (path) => {
      navigate(path);
      onCloseMobile?.();
    },
    [navigate, onCloseMobile]
  );

  const legacyByCategory = useMemo(() => {
    const grouped = {};
    data.forEach((rule) => {
      const cat = (rule.criteria || "uncategorized").toLowerCase();
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(rule);
    });
    const order = [
      "graphics", "forms", "keyboard", "navigation", "headings",
      "errors", "context", "clickables", "document", "readability",
      "tables", "carousels",
    ];
    return order
      .filter((cat) => grouped[cat])
      .map((cat) => ({
        id: cat,
        label: capitalize(cat),
        color: LEGACY_CRITERIA_COLORS[cat] || "#667eea",
        rules: grouped[cat],
      }));
  }, [data]);

  // Health status map from analysis cache
  const healthMap = useMemo(() => {
    const map = {};
    try {
      const cached = getAllCachedResults();
      for (const [ruleId, results] of cached.entries()) {
        let hasCS = false;
        let hasModerate = false;
        for (const r of results) {
          if (r.audit) {
            if (r.audit.summary.critical > 0 || r.audit.summary.serious > 0) {
              map[ruleId] = "red";
              hasCS = true;
              break;
            }
            if (r.audit.summary.moderate > 0 || r.audit.summary.minor > 0) {
              hasModerate = true;
            }
          }
        }
        if (!hasCS) {
          map[ruleId] = hasModerate ? "yellow" : "green";
        }
      }
    } catch { /* ignore */ }
    return map;
  }, []);

  // Subscribe to storage events for cross-tab updates
  useEffect(() => {
    const handler = () => {
      // Force re-render when localStorage changes (from batch analysis, etc.)
      setExpanded((prev) => ({ ...prev }));
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const isDashboardActive = location.pathname === "/";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      {showDashboardLink && (
      <Box sx={{ mb: 0.5, mt: 0.5 }}>
        <Tooltip title={!isOpen ? "Dashboard" : ""} placement="right">
          <ListItemButton
            onClick={() => handleNavigate("/")}
            selected={isDashboardActive}
            sx={{
              pl: isOpen ? 2 : 1.5,
              py: isOpen ? 0.8 : 1,
              minHeight: isOpen ? 40 : 44,
              mx: isOpen ? 0.5 : 0.25,
              "&.Mui-selected": { bgcolor: "action.selected" },
            }}
          >
            <ListItemIcon sx={{ minWidth: isOpen ? 32 : 28, mr: isOpen ? 1 : 0 }}>
              <DashboardIcon sx={{ fontSize: isOpen ? 20 : 22, color: "text.secondary" }} />
            </ListItemIcon>
            {isOpen && (
              <ListItemText
                primary="Dashboard"
                primaryTypographyProps={{ fontSize: "0.85rem", fontWeight: 600 }}
              />
            )}
          </ListItemButton>
        </Tooltip>
      </Box>
      )}

      {showDashboardLink && (
      <Box sx={{ height: "1px", bgcolor: "divider", mx: isOpen ? 2 : 0.5, my: 0.5 }} />
      )}

      {/* Search (only when drawer is open) */}
      {isOpen && (
        <Box sx={{ px: 1.5, py: 0.5 }}>
          <TextField
            size="small"
            placeholder="Filter rules..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 16, color: "primary.main" }} />
                </InputAdornment>
              ),
              endAdornment: search && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearch("")} sx={{ p: 0.25 }}>
                    <CancelIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                </InputAdornment>
              ),
              sx: { fontSize: "0.75rem", height: 30 },
            }}
          />
        </Box>
      )}

      {/* Scrollable tree area */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          pb: 2,
          "&::-webkit-scrollbar": { width: 6 },
          "&::-webkit-scrollbar-track": { background: "transparent" },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(148, 163, 184, 0.3)",
            borderRadius: 3,
            "&:hover": { background: "rgba(148, 163, 184, 0.5)" },
          },
        }}
      >
        <List disablePadding>
          {/* Engine Rules Tier */}
          <TierNode
            tierId="engine"
            label="Engine Rules"
            icon={ScienceIcon}
            count={engineRuleCount}
            color="#673ab7"
            isOpen={isOpen}
            expanded={expanded}
            onToggle={handleToggle}
            onRequestOpen={onRequestOpen}
          >
            {ENGINE_RULE_CATEGORIES.map((cat) => (
              <CategoryNode
                key={cat.id}
                categoryId={cat.id}
                label={cat.label}
                color={cat.color}
                icon={cat.icon}
                rules={cat.rules}
                ruleType="engine"
                isOpen={isOpen}
                expanded={expanded}
                onToggle={handleToggle}
                onNavigate={handleNavigate}
                location={location}
                search={search}
                healthMap={healthMap}
                getEngineRuleTitle={getEngineRuleTitle}
              />
            ))}
          </TierNode>

          {/* Divider between tiers */}
          <Box sx={{ height: "1px", bgcolor: "divider", mx: isOpen ? 2 : 0.5, my: 0.5 }} />

          {/* Legacy Rules Tier */}
          <TierNode
            tierId="legacy"
            label="Legacy Rules"
            icon={({ sx, ...props }) => (
              <DescriptionIcon sx={{ ...sx }} {...props} />
            )}
            count={data.length || 90}
            color="#1e88e5"
            isOpen={isOpen}
            expanded={expanded}
            onToggle={handleToggle}
            onRequestOpen={onRequestOpen}
          >
            {legacyByCategory.map((cat) => (
              <CategoryNode
                key={cat.id}
                categoryId={cat.id}
                label={cat.label}
                color={cat.color}
                icon={DescriptionIcon}
                rules={cat.rules.map((r) => ({
                  id: r.route,
                  name: r.name,
                  label: r.name,
                }))}
                ruleType="legacy"
                isOpen={isOpen}
                expanded={expanded}
                onToggle={handleToggle}
                onNavigate={handleNavigate}
                location={location}
                search={search}
                healthMap={healthMap}
              />
            ))}
          </TierNode>
        </List>
      </Box>
    </Box>
  );
}
