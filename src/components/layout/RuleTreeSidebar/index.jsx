import {
  Accessibility,
  Bug,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  CircleX,
  FileText,
  FlaskConical,
  GitBranch,
  Image,
  LayoutDashboard,
  Link2,
  Pencil,
  SquaresExclude,
  Type,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { HudLayoutIndicator } from "../../motion/HudMotion";
import { Button } from "../../ui/button";
import { SearchField } from "../../ui/search-field";
import { useLibraryLocation, useLibrarySearchInput } from "../../../hooks/useLibraryLocation";
import { engineRule, ruleKey } from "../../../lib/libraryLocation";
import { useRulesCatalog } from "../../../hooks/useRulesCatalog";
import { prefetchEngineExample } from "../../../utils/engineExampleUtils";
import { DataService } from "../../util/dataService";
import { getAllCachedResults } from "../../../utils/analysisCache";
import { cn } from "../../../lib/utils";

const { CATEGORIES: ENGINE_RULE_CATEGORIES } = require("../../../lib/rulesCatalog");

const STORAGE_KEY = "ruleTreeExpanded";

const ICON_MAP = {
  Accessibility,
  EditNote: Pencil,
  Link: Link2,
  Image,
  AccountTree: GitBranch,
  Widgets: SquaresExclude,
  TextFields: Type,
  Description: FileText,
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
  "text-content": "#8bc34a",
  tables: "#3f51b5",
  dialogs: "#7b1fa2",
  general: "#546e7a",
  "interactive-content": "#c2185b",
  landmarks: "#00838f",
  lists: "#6d4c41",
  "moving-content": "#ef6c00",
};

/** Preferred tree order; any criteria not listed are appended alphabetically. */
const LEGACY_CRITERIA_ORDER = [
  "graphics",
  "forms",
  "keyboard",
  "navigation",
  "landmarks",
  "headings",
  "errors",
  "context",
  "clickables",
  "interactive-content",
  "document",
  "text-content",
  "readability",
  "tables",
  "carousels",
  "moving-content",
  "dialogs",
  "lists",
  "general",
];

function capitalize(str) {
  return str
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
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
  { key: "success", label: "Success examples", icon: CircleCheck, color: "#6ee7b7" },
  { key: "failure", label: "Failure examples", icon: CircleX, color: "#ff6b6b" },
  { key: "rule-lab", label: "Rule Lab", icon: FlaskConical, color: "#8b9cf6" },
  { key: "mcp-debug", label: "MCP Debug", icon: Bug, color: "#ffb74d" },
];

function RuleActionBar({ items, leafPaths, ruleId, ruleType, onCloseMobile, location, isOpen }) {
  if (!isOpen) return null;

  return (
    <div className="mb-0.5 flex items-center gap-0.5 py-0.5 pl-12 pr-2">
      {items.map((item) => {
        const Icon = item.icon;
        const to = leafPaths[item.key];
        const isActive =
          item.key === "success" || item.key === "failure"
            ? location.pathname === to.split("?")[0]
            : location.pathname + location.search === to;
        return (
          <RouterLink
            key={item.key}
            to={to}
            title={item.label}
            aria-label={item.label}
            onClick={onCloseMobile}
            onMouseEnter={
              ruleType === "engine" && (item.key === "success" || item.key === "failure")
                ? () => prefetchEngineExample(ruleId, item.key)
                : undefined
            }
            className={cn(
              "rounded-sm border border-border p-1 no-underline transition-colors",
              isActive && "ring-1 ring-primary/30"
            )}
            style={{
              borderColor: isActive ? item.color : undefined,
              backgroundColor: isActive ? `${item.color}26` : "transparent",
              color: item.color,
            }}
          >
            <Icon className="size-3" />
          </RouterLink>
        );
      })}
    </div>
  );
}

function HealthDot({ status }) {
  const colors = {
    green: "#00a38d",
    yellow: "#ff9800",
    red: "#f44336",
    gray: "#cbd5e1",
  };
  const title =
    status === "green" ? "No critical/serious issues" :
    status === "yellow" ? "Has moderate/minor issues" :
    status === "red" ? "Has critical/serious issues" :
    "Not analyzed";
  return (
    <span
      title={title}
      className="ml-1 inline-block size-2 shrink-0 rounded-full"
      style={{ backgroundColor: colors[status] || colors.gray, opacity: status === "gray" ? 0.4 : 0.8 }}
    />
  );
}

function RuleNode({ ruleId, ruleLabel, ruleType, criteriaOrCategory, isOpen, expanded, onToggle, onCloseMobile, location, healthStatus }) {
  const { route, hrefs } = useLibraryLocation();
  const nodeKey = `rule-${ruleType}-${ruleId}`;
  const isExpanded = expanded[nodeKey] ?? false;
  const ref = useMemo(
    () => (ruleType === "engine" ? engineRule(ruleId) : { type: "legacy", criteria: criteriaOrCategory, route: ruleId }),
    [ruleType, ruleId, criteriaOrCategory]
  );
  const basePath = hrefs.rule(ref);
  const isRuleActive =
    (route.kind === "rule" || route.kind === "example") &&
    route.rule.type === ref.type &&
    ruleKey(route.rule) === ruleId &&
    (ref.type === "engine" || route.rule.criteria === ref.criteria);

  const displayLabel = ruleType === "engine" ? ruleId : ruleLabel;
  const tooltipTitle = ruleType === "engine" ? ruleLabel : ruleId;

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggle(`rule-${ruleType}-${ruleId}`);
  };

  const leafPaths = useMemo(
    () => ({
      success: hrefs.example(ref, "success"),
      failure: hrefs.example(ref, "failure"),
      "rule-lab": hrefs.ruleLab(ref),
      "mcp-debug": hrefs.ruleLab(ref),
    }),
    [hrefs, ref]
  );

  return (
  <>
      <div
        className={cn(
          "relative flex min-h-[26px] items-center rounded-sm py-0.5",
          isOpen ? "mx-1 pl-2" : "pl-2",
          isRuleActive && "bg-primary/10"
        )}
      >
        {isRuleActive && ruleType === "engine" ? (
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
        ) : null}
        {isOpen ? (
          <button
            type="button"
            onClick={handleToggle}
            aria-label={isExpanded ? "Collapse rule actions" : "Expand rule actions"}
            className="mr-0.5 flex size-4 shrink-0 items-center justify-center text-foreground-secondary"
          >
            {isExpanded ? <ChevronDown className="size-3" /> : <ChevronRight className="size-3" />}
          </button>
        ) : null}
        <RouterLink
          to={basePath}
          onClick={onCloseMobile}
          title={isOpen ? tooltipTitle : displayLabel}
          aria-current={isRuleActive ? "page" : undefined}
          className={cn(
            "flex min-w-0 flex-1 items-center gap-1 py-0.5 text-inherit no-underline hover:underline",
            !isOpen && "justify-center px-1"
          )}
        >
          {isOpen ? (
            <>
              <span
                className={cn(
                  "min-w-0 flex-1 truncate text-[0.75rem]",
                  ruleType === "engine" && "font-mono",
                  isRuleActive ? "font-semibold text-foreground-accent" : "font-medium text-foreground"
                )}
              >
                {displayLabel}
              </span>
              <HealthDot status={healthStatus || "gray"} />
            </>
          ) : (
            <span className="font-mono text-[0.7rem] text-primary">{ruleId.slice(0, 3)}</span>
          )}
        </RouterLink>
      </div>
      {isOpen && (isExpanded || isRuleActive) ? (
        <RuleActionBar
          items={LEAF_ITEMS}
          leafPaths={leafPaths}
          ruleId={ruleId}
          ruleType={ruleType}
          onCloseMobile={onCloseMobile}
          location={location}
          isOpen={isOpen}
        />
      ) : null}
    </>
  );
}

function CategoryNode({ categoryId, label, color, icon, rules, ruleType, isOpen, expanded, onToggle, onCloseMobile, location, search, healthMap, getEngineRuleTitle, engineSearchHits }) {
  const isExpanded = expanded[`cat-${ruleType}-${categoryId}`] || false;
  const Icon = typeof icon === "string" ? ICON_MAP[icon] || FileText : icon;

  const filteredRules = useMemo(() => {
    if (!search) return rules;
    if (ruleType === "engine" && engineSearchHits) {
      return rules.filter((r) => {
        const ruleId = typeof r === "string" ? r : r.id || r.route;
        return engineSearchHits.has(ruleId);
      });
    }
    const q = search.toLowerCase();
    return rules.filter((r) => {
      const ruleId = typeof r === "string" ? r : r.id || r.route;
      const ruleLabel =
        typeof r === "string"
          ? ruleType === "engine"
            ? getEngineRuleTitle(r)
            : r
          : r.name || r.label || ruleId;
      return ruleId.toLowerCase().includes(q) || String(ruleLabel).toLowerCase().includes(q);
    });
  }, [rules, search, ruleType, getEngineRuleTitle, engineSearchHits]);

  if (search && filteredRules.length === 0) return null;

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => onToggle(`cat-${ruleType}-${categoryId}`)}
        className={cn("h-auto min-h-8 w-[calc(100%-4px)] justify-start rounded-md py-1 text-left font-sans normal-case tracking-normal", isOpen ? "mx-1 pl-8" : "pl-4")}
      >
        <Icon className="mr-1 size-4 shrink-0" style={{ color }} />
        {isOpen ? (
          <>
            <span className="min-w-0 flex-1 truncate text-[0.76rem] font-semibold text-foreground">{label}</span>
            <span className="text-[0.75rem] font-semibold text-foreground-accent">{filteredRules.length}</span>
            {isExpanded ? <ChevronDown className="ml-1 size-4 text-foreground-secondary" /> : <ChevronRight className="ml-1 size-4 text-foreground-secondary" />}
          </>
        ) : null}
      </Button>
      {isOpen && isExpanded ? (
        <div>
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
                onCloseMobile={onCloseMobile}
                location={location}
                healthStatus={healthMap?.[ruleId]}
              />
            );
          })}
        </div>
      ) : null}
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
      <Button
        variant="ghost"
        title={!isOpen ? `${label} (${count})` : undefined}
        onClick={handleClick}
        className={cn(
          "mb-0.5 h-auto w-[calc(100%-4px)] justify-start rounded-md text-left font-sans normal-case tracking-normal",
          isOpen ? "mx-1 min-h-10 py-2 pl-4" : "mx-0.5 min-h-11 justify-center py-2"
        )}
      >
        <Icon className={isOpen ? "mr-2 size-5 shrink-0" : "size-5 shrink-0"} style={{ color }} />
        {isOpen ? (
          <>
            <span className="min-w-0 flex-1 truncate text-[0.85rem] font-bold text-foreground">{label}</span>
            <span className="text-[0.75rem] font-bold text-foreground-secondary">{count}</span>
            {isExpanded ? <ChevronDown className="ml-1 size-[18px] text-foreground-secondary" /> : <ChevronRight className="ml-1 size-[18px] text-foreground-secondary" />}
          </>
        ) : null}
      </Button>
      {isOpen && isExpanded ? <div>{children}</div> : null}
    </>
  );
}

export default function RuleTreeSidebar({
  isOpen = true,
  showDashboardLink = true,
  onRequestOpen,
  onCloseMobile,
}) {
  const location = useLocation();
  const { route } = useLibraryLocation();
  const [expanded, setExpanded] = useState(loadExpanded);
  const [search, setSearch] = useLibrarySearchInput();
  const [data, setData] = useState([]);
  const { populated, getById, query: runCatalogQuery } = useRulesCatalog();

  const engineTitles = useMemo(() => {
    const titles = {};
    populated.forEach((row) => {
      titles[row.kebabId] = row.title;
      if (row.id) titles[row.id] = row.title;
    });
    return titles;
  }, [populated]);
  const engineRuleCount = populated.length;

  /** Same full-text query as the library table (id/title ranked). */
  const engineSearchHits = useMemo(() => {
    if (!search.trim()) return null;
    const { rules } = runCatalogQuery(
      { q: search, filters: { category: "all", impact: "all", level: "all", wcag: "all", legacy: "all" } },
      { includeStubs: false }
    );
    return new Set(rules.map((r) => r.kebabId));
  }, [search, runCatalogQuery]);

  const getEngineRuleTitle = useCallback(
    (ruleId) => {
      const fromMap = engineTitles[ruleId];
      if (fromMap) return fromMap;
      return getById(ruleId)?.title || ruleId;
    },
    [engineTitles, getById]
  );

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

  // Auto-expand the tree to the rule the URL points at (engine or legacy).
  const activeRule = route.kind === "rule" || route.kind === "example" ? route.rule : null;
  const activeType = activeRule?.type;
  const activeKey = activeRule ? ruleKey(activeRule) : null;
  const activeCriteria = activeRule?.type === "legacy" ? activeRule.criteria : null;
  useEffect(() => {
    if (!activeKey) return;
    if (activeType === "engine") {
      const category = ENGINE_RULE_CATEGORIES.find((cat) => cat.rules.includes(activeKey));
      if (!category) return;
      setExpanded((prev) => ({
        ...prev,
        "tier-engine": true,
        [`cat-engine-${category.id}`]: true,
        [`rule-engine-${activeKey}`]: true,
      }));
    } else {
      setExpanded((prev) => ({
        ...prev,
        "tier-legacy": true,
        [`cat-legacy-${activeCriteria}`]: true,
        [`rule-legacy-${activeKey}`]: true,
      }));
    }
  }, [activeType, activeKey, activeCriteria]);

  const handleToggle = useCallback((nodeId) => {
    setExpanded((prev) => ({ ...prev, [nodeId]: !prev[nodeId] }));
  }, []);

  const legacyByCategory = useMemo(() => {
    const grouped = {};
    data.forEach((rule) => {
      const cat = (rule.criteria || "uncategorized").toLowerCase();
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(rule);
    });
    const known = LEGACY_CRITERIA_ORDER.filter((cat) => grouped[cat]);
    const rest = Object.keys(grouped)
      .filter((cat) => !LEGACY_CRITERIA_ORDER.includes(cat))
      .sort();
    return [...known, ...rest].map((cat) => ({
      id: cat,
      label: capitalize(cat),
      color: LEGACY_CRITERIA_COLORS[cat] || "#667eea",
      rules: grouped[cat],
    }));
  }, [data]);

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

  useEffect(() => {
    const handler = () => {
      setExpanded((prev) => ({ ...prev }));
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const isDashboardActive = location.pathname === "/";

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {showDashboardLink ? (
        <div className="mb-1 mt-1">
          <RouterLink
            to="/"
            title={!isOpen ? "Dashboard" : undefined}
            onClick={onCloseMobile}
            className={cn(
              "flex w-full items-center text-left no-underline text-inherit",
              isOpen ? "min-h-10 py-2 pl-4" : "min-h-11 justify-center py-2",
              isDashboardActive && "bg-primary/10"
            )}
          >
            <LayoutDashboard className={cn("text-foreground-secondary", isOpen ? "mr-2 size-5" : "size-5")} />
            {isOpen ? <span className="text-[0.85rem] font-semibold">Dashboard</span> : null}
          </RouterLink>
        </div>
      ) : null}

      {showDashboardLink ? <div className={`my-1 h-px bg-border ${isOpen ? "mx-4" : "mx-1"}`} /> : null}

      {isOpen ? (
        <div className="px-3 py-1.5">
          <SearchField
            value={search}
            onValueChange={setSearch}
            placeholder="Filter rules…"
            aria-label="Filter rules in sidebar"
            containerClassName="h-8 rounded-md shadow-none"
            className="text-[0.75rem]"
          />
        </div>
      ) : null}

      <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto pb-4">
        <TierNode
          tierId="engine"
          label="Engine Rules"
          icon={FlaskConical}
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
              onCloseMobile={onCloseMobile}
              location={location}
              search={search}
              healthMap={healthMap}
              getEngineRuleTitle={getEngineRuleTitle}
              engineSearchHits={engineSearchHits}
            />
          ))}
        </TierNode>

        <div className={`my-1 h-px bg-border ${isOpen ? "mx-4" : "mx-1"}`} />

        <TierNode
          tierId="legacy"
          label="Legacy Rules"
          icon={FileText}
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
              icon={FileText}
              rules={cat.rules.map((r) => ({
                id: r.route,
                name: r.name,
                label: r.name,
              }))}
              ruleType="legacy"
              isOpen={isOpen}
              expanded={expanded}
              onToggle={handleToggle}
              onCloseMobile={onCloseMobile}
              location={location}
              search={search}
              healthMap={healthMap}
            />
          ))}
        </TierNode>
      </div>
    </div>
  );
}
