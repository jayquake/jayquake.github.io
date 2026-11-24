import {
  Accessibility,
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
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { HudLayoutIndicator } from "../../motion/HudMotion";
import { Button } from "../../ui/button";
import { SearchField } from "../../ui/search-field";
import { useLibraryLocation, useLibrarySearchInput } from "../../../hooks/useLibraryLocation";
import { useRulesCatalog } from "../../../hooks/useRulesCatalog";
import { useRuleHealth } from "../../../hooks/useRuleHealth";
import { prefetchEngineExample } from "../../../utils/engineExampleUtils";
import { DataService } from "../../util/dataService";
import {
  activeAncestors,
  activeRuleOf,
  buildRuleTree,
  loadExpanded,
  saveExpanded,
} from "../../../lib/ruleTree";
import legacyCriteriaData from "../../../data/legacy-criteria.json";
import { cn } from "../../../lib/utils";

const { CATEGORIES: ENGINE_RULE_CATEGORIES } = require("../../../lib/rulesCatalog");

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

const ACTION_STYLE = {
  success: { icon: CircleCheck, className: "text-status-pass", activeClassName: "border-status-pass bg-status-pass/15" },
  failure: { icon: CircleX, className: "text-status-fail", activeClassName: "border-status-fail bg-status-fail/15" },
  "rule-lab": { icon: FlaskConical, className: "text-status-info", activeClassName: "border-status-info bg-status-info/15" },
};

const TIER_STYLE = {
  engine: { icon: FlaskConical, className: "text-primary" },
  legacy: { icon: FileText, className: "text-status-info" },
};

const toneColor = (tone) => `hsl(var(--cat-${tone}))`;

const safeStorage = () => {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

function RuleActionBar({ rule, onCloseMobile }) {
  return (
    <div className="mb-0.5 flex items-center gap-0.5 py-0.5 pl-12 pr-2">
      {rule.actions.map((action) => {
        const { icon: Icon, className: toneClass, activeClassName } = ACTION_STYLE[action.key];
        const prefetch =
          rule.type === "engine" && (action.key === "success" || action.key === "failure")
            ? () => prefetchEngineExample(rule.id, action.key)
            : undefined;
        return (
          <RouterLink
            key={action.key}
            to={action.href}
            title={action.label}
            aria-label={action.label}
            onClick={onCloseMobile}
            onMouseEnter={prefetch}
            className={cn(
              "rounded-sm border border-border bg-transparent p-1 no-underline transition-colors",
              toneClass,
              action.active && cn("ring-1 ring-primary/30", activeClassName)
            )}
          >
            <Icon className="size-3" />
          </RouterLink>
        );
      })}
    </div>
  );
}

const HEALTH = {
  green: { className: "bg-status-pass opacity-80", title: "No critical/serious issues" },
  yellow: { className: "bg-status-warn opacity-80", title: "Has moderate/minor issues" },
  red: { className: "bg-status-fail opacity-80", title: "Has critical/serious issues" },
  gray: { className: "bg-foreground-muted opacity-40", title: "Not analyzed" },
};

function HealthDot({ status }) {
  const h = HEALTH[status] || HEALTH.gray;
  return <span title={h.title} className={cn("ml-1 inline-block size-2 shrink-0 rounded-full", h.className)} />;
}

function RuleNode({ rule, isOpen, onToggleRule, onCloseMobile }) {
  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleRule(rule.key);
  };

  return (
    <>
      <div
        className={cn(
          "relative flex min-h-[26px] items-center rounded-sm py-0.5",
          isOpen ? "mx-1 pl-2" : "pl-2",
          rule.active && "bg-primary/10"
        )}
      >
        {rule.active && rule.type === "engine" ? (
          <HudLayoutIndicator
            layoutId="sidebar-rule-active"
            style={{
              position: "absolute",
              left: 0,
              top: 4,
              bottom: 4,
              width: 2,
              backgroundColor: "hsl(var(--primary))",
              pointerEvents: "none",
            }}
          />
        ) : null}
        {isOpen ? (
          <button
            type="button"
            onClick={handleToggle}
            aria-label={rule.showActions ? "Collapse rule actions" : "Expand rule actions"}
            className="mr-0.5 flex size-4 shrink-0 items-center justify-center text-foreground-secondary"
          >
            {rule.showActions ? <ChevronDown className="size-3" /> : <ChevronRight className="size-3" />}
          </button>
        ) : null}
        <RouterLink
          to={rule.href}
          onClick={onCloseMobile}
          title={isOpen ? rule.title : rule.label}
          aria-current={rule.active ? "page" : undefined}
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
                  rule.type === "engine" && "font-mono",
                  rule.active ? "font-semibold text-foreground-accent" : "font-medium text-foreground"
                )}
              >
                {rule.label}
              </span>
              <HealthDot status={rule.health} />
            </>
          ) : (
            <span className="font-mono text-[0.7rem] text-primary">{rule.id.slice(0, 3)}</span>
          )}
        </RouterLink>
      </div>
      {isOpen && rule.showActions ? <RuleActionBar rule={rule} onCloseMobile={onCloseMobile} /> : null}
    </>
  );
}

function CategoryNode({ category, isOpen, onToggle, onToggleRule, onCloseMobile }) {
  const Icon = typeof category.icon === "string" ? ICON_MAP[category.icon] || FileText : FileText;

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => onToggle(category.key)}
        className={cn("h-auto min-h-8 w-[calc(100%-4px)] justify-start rounded-md py-1 text-left font-sans normal-case tracking-normal", isOpen ? "mx-1 pl-8" : "pl-4")}
      >
        <Icon className="mr-1 size-4 shrink-0" style={{ color: toneColor(category.tone) }} aria-hidden="true" />
        {isOpen ? (
          <>
            <span className="min-w-0 flex-1 truncate text-[0.76rem] font-semibold text-foreground">{category.label}</span>
            <span className="text-[0.75rem] font-semibold text-foreground-accent">{category.count}</span>
            {category.expanded ? <ChevronDown className="ml-1 size-4 text-foreground-secondary" /> : <ChevronRight className="ml-1 size-4 text-foreground-secondary" />}
          </>
        ) : null}
      </Button>
      {isOpen && category.expanded ? (
        <div>
          {category.rules.map((rule) => (
            <RuleNode
              key={rule.key}
              rule={rule}
              isOpen={isOpen}
              onToggleRule={onToggleRule}
              onCloseMobile={onCloseMobile}
            />
          ))}
        </div>
      ) : null}
    </>
  );
}

function TierNode({ tier, isOpen, onToggle, onRequestOpen, children }) {
  const { icon: Icon, className: tierClass } = TIER_STYLE[tier.id];

  const handleClick = () => {
    if (!isOpen && onRequestOpen) {
      onRequestOpen();
      if (!tier.expanded) onToggle(tier.key);
    } else {
      onToggle(tier.key);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        title={!isOpen ? `${tier.label} (${tier.count})` : undefined}
        onClick={handleClick}
        className={cn(
          "mb-0.5 h-auto w-[calc(100%-4px)] justify-start rounded-md text-left font-sans normal-case tracking-normal",
          isOpen ? "mx-1 min-h-10 py-2 pl-4" : "mx-0.5 min-h-11 justify-center py-2"
        )}
      >
        <Icon className={cn(isOpen ? "mr-2 size-5 shrink-0" : "size-5 shrink-0", tierClass)} aria-hidden="true" />
        {isOpen ? (
          <>
            <span className="min-w-0 flex-1 truncate text-[0.85rem] font-bold text-foreground">{tier.label}</span>
            <span className="text-[0.75rem] font-bold text-foreground-secondary">{tier.count}</span>
            {tier.expanded ? <ChevronDown className="ml-1 size-[18px] text-foreground-secondary" /> : <ChevronRight className="ml-1 size-[18px] text-foreground-secondary" />}
          </>
        ) : null}
      </Button>
      {isOpen && tier.expanded ? <div>{children}</div> : null}
    </>
  );
}

const ALL_FILTERS = { category: "all", impact: "all", level: "all", wcag: "all", legacy: "all" };

export default function RuleTreeSidebar({
  isOpen = true,
  showDashboardLink = true,
  onRequestOpen,
  onCloseMobile,
}) {
  const location = useLocation();
  const { route, hrefs } = useLibraryLocation();
  const [expanded, setExpanded] = useState(() => loadExpanded(safeStorage()));
  const [openRules, setOpenRules] = useState(() => new Set());
  const [search, setSearch] = useLibrarySearchInput();
  const [legacyRules, setLegacyRules] = useState([]);
  const { populated, getById, query: runCatalogQuery } = useRulesCatalog();
  const health = useRuleHealth();

  const populatedIds = useMemo(() => new Set(populated.map((row) => row.kebabId)), [populated]);

  const engineTitle = useCallback((ruleId) => getById(ruleId)?.title || ruleId, [getById]);

  /** Same full-text query as the library table (id/title ranked). */
  const engineSearchHits = useMemo(() => {
    if (!search.trim()) return null;
    const { rules } = runCatalogQuery({ q: search, filters: ALL_FILTERS }, { includeStubs: false });
    return new Set(rules.map((r) => r.kebabId));
  }, [search, runCatalogQuery]);

  useEffect(() => {
    let cancelled = false;
    DataService.getData()
      .then((json) => {
        if (!cancelled) setLegacyRules(Array.isArray(json) ? json : []);
      })
      .catch(() => {
        if (!cancelled) setLegacyRules([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    saveExpanded(safeStorage(), expanded);
  }, [expanded]);

  // Expand the tier and category that hold the rule the URL points at.
  const activeRule = activeRuleOf(route);
  const ancestorKeys = activeAncestors(activeRule, ENGINE_RULE_CATEGORIES).join("|");
  useEffect(() => {
    if (!ancestorKeys) return;
    setExpanded((prev) => {
      const keys = ancestorKeys.split("|");
      if (keys.every((key) => prev[key])) return prev;
      const next = { ...prev };
      keys.forEach((key) => {
        next[key] = true;
      });
      return next;
    });
  }, [ancestorKeys]);

  const handleToggle = useCallback((nodeKey) => {
    setExpanded((prev) => ({ ...prev, [nodeKey]: !prev[nodeKey] }));
  }, []);

  const handleToggleRule = useCallback((ruleNodeKey) => {
    setOpenRules((prev) => {
      const next = new Set(prev);
      if (next.has(ruleNodeKey)) next.delete(ruleNodeKey);
      else next.add(ruleNodeKey);
      return next;
    });
  }, []);

  const tiers = useMemo(
    () =>
      buildRuleTree({
        engineCategories: ENGINE_RULE_CATEGORIES,
        populatedIds,
        engineTitle,
        engineSearchHits,
        legacyRules,
        legacyCriteria: legacyCriteriaData.entries,
        search,
        activeRule,
        expanded,
        openRules,
        health,
        hrefs,
        location,
      }),
    // activeRule is derived from route on every render; route identity tracks it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [populatedIds, engineTitle, engineSearchHits, legacyRules, search, route, expanded, openRules, health, hrefs, location]
  );

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
        {tiers.map((tier, index) => (
          <Fragment key={tier.key}>
            {index > 0 ? <div className={`my-1 h-px bg-border ${isOpen ? "mx-4" : "mx-1"}`} /> : null}
            <TierNode tier={tier} isOpen={isOpen} onToggle={handleToggle} onRequestOpen={onRequestOpen}>
              {tier.categories.map((category) => (
                <CategoryNode
                  key={category.key}
                  category={category}
                  isOpen={isOpen}
                  onToggle={handleToggle}
                  onToggleRule={handleToggleRule}
                  onCloseMobile={onCloseMobile}
                />
              ))}
            </TierNode>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
