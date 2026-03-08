import {
  Accessibility as AccessibilityIcon,
  AccountTree as AccountTreeIcon,
  BugReport as BugReportIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
  ChevronRight as ChevronRightIcon,
  Dashboard as DashboardIcon,
  Description as DescriptionIcon,
  EditNote as EditNoteIcon,
  ExpandMore as ExpandMoreIcon,
  Image as ImageIcon,
  Link as LinkIcon,
  Science as ScienceIcon,
  Search as SearchIcon,
  TextFields as TextFieldsIcon,
  Widgets as WidgetsIcon,
} from "@mui/icons-material";
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
import { useLocation, useNavigate } from "react-router-dom";
import ENGINE_RULE_CATEGORIES from "../../../data/engine-rule-categories";
import engineRulesData from "../../../data/engine-rules-metadata.json";

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
  graphics: "#4caf50",
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

function getEngineRuleTitle(ruleId) {
  const rule = engineRulesData.find((r) => r.id === ruleId);
  return rule ? rule.title : ruleId;
}

function loadExpanded() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveExpanded(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* noop */ }
}

const LEAF_ITEMS = [
  { key: "success", label: "Success", icon: CheckCircleIcon, color: "#4caf50" },
  { key: "failure", label: "Failure", icon: CancelIcon, color: "#f44336" },
  { key: "rule-lab", label: "Rule Lab", icon: ScienceIcon, color: "#5c6bc0" },
  { key: "mcp-debug", label: "MCP Debug", icon: BugReportIcon, color: "#ff9800" },
];

function LeafItem({ item, onClick, isActive, isOpen }) {
  const Icon = item.icon;
  return (
    <ListItemButton
      onClick={onClick}
      selected={isActive}
      sx={{
        pl: isOpen ? 8 : 2,
        py: 0.3,
        minHeight: 28,
        borderRadius: 1,
        mx: isOpen ? 0.5 : 0,
        "&.Mui-selected": {
          bgcolor: alpha(item.color, 0.12),
          "&:hover": { bgcolor: alpha(item.color, 0.18) },
        },
        "&:hover": { bgcolor: alpha(item.color, 0.08) },
      }}
    >
      <ListItemIcon sx={{ minWidth: 24, mr: isOpen ? 1 : 0 }}>
        <Icon sx={{ fontSize: 14, color: item.color }} />
      </ListItemIcon>
      {isOpen && (
        <ListItemText
          primary={item.label}
          primaryTypographyProps={{
            fontSize: "0.7rem",
            fontWeight: 500,
            color: "#64748b",
          }}
        />
      )}
    </ListItemButton>
  );
}

function RuleNode({ ruleId, ruleLabel, ruleType, criteriaOrCategory, isOpen, expanded, onToggle, onNavigate, location }) {
  const isExpanded = expanded[`rule-${ruleType}-${ruleId}`] || false;
  const basePath = ruleType === "engine" ? `/engine/${ruleId}` : `/${criteriaOrCategory}/${ruleId}`;
  const isRuleActive = location.pathname === basePath;

  const handleClick = () => {
    onNavigate(basePath);
  };

  const handleToggle = (e) => {
    e.stopPropagation();
    onToggle(`rule-${ruleType}-${ruleId}`);
  };

  const handleLeafClick = (leafKey) => {
    switch (leafKey) {
      case "success":
        onNavigate(`${basePath}_success`);
        break;
      case "failure":
        onNavigate(`${basePath}_failure`);
        break;
      case "rule-lab":
        onNavigate(`/rule-lab?rule=${ruleId}&type=${ruleType}`);
        break;
      case "mcp-debug":
        onNavigate(`/rule-lab?rule=${ruleId}&type=${ruleType}&mode=mcp`);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        selected={isRuleActive}
        sx={{
          pl: isOpen ? 6 : 2,
          py: 0.4,
          minHeight: 30,
          borderRadius: 1,
          mx: isOpen ? 0.5 : 0,
          "&.Mui-selected": {
            bgcolor: "rgba(102, 126, 234, 0.12)",
            "&:hover": { bgcolor: "rgba(102, 126, 234, 0.18)" },
          },
          "&:hover": { bgcolor: "rgba(102, 126, 234, 0.06)" },
        }}
      >
        {isOpen && (
          <IconButton
            size="small"
            onClick={handleToggle}
            sx={{ p: 0, mr: 0.5, width: 18, height: 18 }}
          >
            {isExpanded ? (
              <ExpandMoreIcon sx={{ fontSize: 14 }} />
            ) : (
              <ChevronRightIcon sx={{ fontSize: 14 }} />
            )}
          </IconButton>
        )}
        {isOpen && (
          <ListItemText
            primary={ruleLabel}
            primaryTypographyProps={{
              fontSize: "0.75rem",
              fontWeight: isRuleActive ? 600 : 400,
              color: "#334155",
              noWrap: true,
            }}
          />
        )}
      </ListItemButton>
      {isOpen && (
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <List disablePadding>
            {LEAF_ITEMS.map((item) => (
              <LeafItem
                key={item.key}
                item={item}
                onClick={() => handleLeafClick(item.key)}
                isActive={false}
                isOpen={isOpen}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}

function CategoryNode({ categoryId, label, color, icon, rules, ruleType, isOpen, expanded, onToggle, onNavigate, location, search }) {
  const isExpanded = expanded[`cat-${ruleType}-${categoryId}`] || false;
  const Icon = typeof icon === "string" ? ICON_MAP[icon] || DescriptionIcon : icon;

  const filteredRules = useMemo(() => {
    if (!search) return rules;
    const q = search.toLowerCase();
    return rules.filter((r) => {
      const label = r.label || r.id || r;
      return label.toLowerCase().includes(q);
    });
  }, [rules, search]);

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
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "#475569",
              }}
            />
            <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.65rem", fontWeight: 600 }}>
              {filteredRules.length}
            </Typography>
            {isExpanded ? (
              <ExpandMoreIcon sx={{ fontSize: 16, color: "#94a3b8", ml: 0.5 }} />
            ) : (
              <ChevronRightIcon sx={{ fontSize: 16, color: "#94a3b8", ml: 0.5 }} />
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
                  color: "#1e293b",
                }}
              />
              <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 700, fontSize: "0.7rem" }}>
                {count}
              </Typography>
              {isExpanded ? (
                <ExpandMoreIcon sx={{ fontSize: 18, color: "#94a3b8", ml: 0.5 }} />
              ) : (
                <ChevronRightIcon sx={{ fontSize: 18, color: "#94a3b8", ml: 0.5 }} />
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

export default function RuleTreeSidebar({ data = [], isOpen = true, onRequestOpen, onCloseMobile }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(loadExpanded);
  const [search, setSearch] = useState("");

  useEffect(() => {
    saveExpanded(expanded);
  }, [expanded]);

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

  const isDashboardActive = location.pathname === "/";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      {/* Dashboard link */}
      <Box sx={{ mb: 0.5, mt: 0.5 }}>
        <Tooltip title={!isOpen ? "Dashboard" : ""} placement="right">
          <ListItemButton
            onClick={() => handleNavigate("/")}
            selected={isDashboardActive}
            sx={{
              pl: isOpen ? 2 : 1.5,
              py: isOpen ? 0.8 : 1,
              minHeight: isOpen ? 40 : 44,
              borderRadius: 2,
              mx: isOpen ? 0.5 : 0.25,
              "&.Mui-selected": {
                bgcolor: "rgba(102, 126, 234, 0.12)",
                "&:hover": { bgcolor: "rgba(102, 126, 234, 0.18)" },
              },
              "&:hover": { bgcolor: "rgba(102, 126, 234, 0.06)" },
            }}
          >
            <ListItemIcon sx={{ minWidth: isOpen ? 32 : 28, mr: isOpen ? 1 : 0 }}>
              <DashboardIcon sx={{ fontSize: isOpen ? 20 : 22, color: "#667eea" }} />
            </ListItemIcon>
            {isOpen && (
              <ListItemText
                primary="Dashboard"
                primaryTypographyProps={{
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: "#1e293b",
                }}
              />
            )}
          </ListItemButton>
        </Tooltip>
      </Box>

      {/* Divider */}
      <Box
        sx={{
          height: "1px",
          bgcolor: "rgba(102, 126, 234, 0.15)",
          mx: isOpen ? 2 : 0.5,
          my: 0.5,
        }}
      />

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
                  <SearchIcon sx={{ fontSize: 16, color: "#94a3b8" }} />
                </InputAdornment>
              ),
              endAdornment: search && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearch("")} sx={{ p: 0.25 }}>
                    <CancelIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                fontSize: "0.75rem",
                height: 30,
                borderRadius: 2,
                bgcolor: "rgba(255,255,255,0.4)",
                backdropFilter: "blur(8px)",
                "& fieldset": {
                  borderColor: "rgba(148, 163, 184, 0.3)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(102, 126, 234, 0.4) !important",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "rgba(102, 126, 234, 0.6) !important",
                },
              },
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
            count={engineRulesData.length}
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
              />
            ))}
          </TierNode>

          {/* Divider between tiers */}
          <Box
            sx={{
              height: "1px",
              bgcolor: "rgba(102, 126, 234, 0.1)",
              mx: isOpen ? 2 : 0.5,
              my: 0.5,
            }}
          />

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
              />
            ))}
          </TierNode>
        </List>
      </Box>
    </Box>
  );
}
