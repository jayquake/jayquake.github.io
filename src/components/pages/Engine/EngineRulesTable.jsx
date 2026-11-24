import { ArrowRight, FileText, FlaskConical, Layers3, PanelRight, Play, ShieldCheck, X } from "lucide-react";
import { memo, useCallback } from "react";
import { Link as RouterLink } from "react-router-dom";
import { HudMotion } from "../../motion/HudMotion";
import { Badge, severityVariant } from "../../ui/badge";
import { SearchField } from "../../ui/search-field";
import { FilterSelect } from "../../ui/filter-select";
import { Skeleton } from "../../ui/skeleton";
import { Spinner } from "../../ui/spinner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Button } from "../../ui/button";
import { cn } from "../../../lib/utils";
import { prefetchEngineExample } from "../../../utils/engineExampleUtils";
import { useLibraryLocation, useLibrarySearchInput } from "../../../hooks/useLibraryLocation";
import { activeFilterCount, engineRule, IMPACT_VALUES } from "../../../lib/libraryLocation";
import {
  getRuleSlug,
  impactToSeverityLabel,
  LIBRARY_CATEGORIES,
  RULE_CATEGORY_BY_ID,
} from "./engineLibraryUtils";

const ruleLinkClass = "text-inherit no-underline hover:text-foreground-accent hover:underline";

const RuleRow = memo(function RuleRow({ rule, selected, layout, hrefs }) {
  const slug = getRuleSlug(rule);
  const ref = engineRule(slug);
  const rulePath = hrefs.rule(ref);
  const successPath = hrefs.example(ref, "success");
  const failurePath = hrefs.example(ref, "failure");
  const wcagRefs = rule.refs?.filter((r) => r.type === "WCAG") || [];
  const severity = impactToSeverityLabel(rule.impact);
  const category = RULE_CATEGORY_BY_ID[slug] || "—";
  const isLibrary = layout === "library";

  const handleWarm = useCallback(() => {
    prefetchEngineExample(slug, "success");
  }, [slug]);

  if (!isLibrary) {
    return (
      <TableRow data-state={selected ? "selected" : undefined} className="relative">
        <TableCell className={cn("relative p-0", selected && "shadow-[inset_3px_0_0_hsl(var(--primary))]")}>
          <RouterLink
            to={rulePath}
            onMouseDown={handleWarm}
            aria-current={selected ? "page" : undefined}
            className={cn(
              ruleLinkClass,
              "flex flex-col gap-1.5 px-2 py-2.5 text-inherit hover:bg-black/[0.02]"
            )}
          >
            <span className="font-mono text-[0.75rem] tracking-wide text-primary">{slug}</span>
            <span
              className={cn(
                "block text-[0.8rem] leading-snug text-foreground",
                selected ? "font-semibold" : "font-medium"
              )}
            >
              {rule.title}
            </span>
            {severity !== "—" || wcagRefs[0] ? (
              <span className="mt-0.5 flex flex-wrap gap-1">
                {severity !== "—" ? <Badge variant={severityVariant(severity)}>{severity}</Badge> : null}
                {wcagRefs[0] ? (
                  <Badge className="border-border-strong text-foreground-secondary">{wcagRefs[0].id}</Badge>
                ) : null}
              </span>
            ) : null}
          </RouterLink>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow data-state={selected ? "selected" : undefined}>
      <TableCell className={cn("max-w-0 p-0", selected && "shadow-[inset_2px_0_0_hsl(var(--primary))]")}>
        <RouterLink
          to={rulePath}
          title={slug}
          onMouseDown={handleWarm}
          aria-current={selected ? "page" : undefined}
          className={cn(ruleLinkClass, "block truncate px-2 py-2 font-mono text-[0.75rem] text-primary")}
        >
          [ {slug} ]
        </RouterLink>
      </TableCell>
      <TableCell className="max-w-0 p-0">
        <RouterLink
          to={rulePath}
          title={rule.title}
          aria-current={selected ? "page" : undefined}
          className={cn(
            ruleLinkClass,
            "block truncate px-2 py-2 text-[0.84rem] text-foreground",
            selected ? "font-semibold" : "font-medium"
          )}
        >
          {rule.title}
        </RouterLink>
      </TableCell>
      <TableCell className="max-w-0 truncate font-['Rajdhani',sans-serif] text-[0.75rem] uppercase tracking-[0.12em] text-foreground-secondary">
        {(category || "—").toUpperCase()}
      </TableCell>
      <TableCell>
        {severity !== "—" ? <Badge variant={severityVariant(severity)}>{severity}</Badge> : <span className="text-foreground-muted">—</span>}
      </TableCell>
      <TableCell>
        <span className="inline-flex items-center gap-1.5 font-mono text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-primary">
          <span className="size-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(0,163,141,0.6)]" />
          ACTIVE
        </span>
      </TableCell>
      <TableCell className="font-mono text-[0.75rem] text-foreground-secondary">
        {wcagRefs[0]?.id || "—"}
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <RouterLink
            to={successPath}
            onMouseDown={() => prefetchEngineExample(slug, "success")}
            className="font-mono text-[0.75rem] text-foreground-accent no-underline hover:underline"
          >
            Success
          </RouterLink>
          <RouterLink
            to={failurePath}
            onMouseDown={() => prefetchEngineExample(slug, "failure")}
            className="font-mono text-[0.75rem] text-status-fail no-underline hover:underline"
          >
            Failure
          </RouterLink>
        </div>
      </TableCell>
    </TableRow>
  );
});

const capitalize = (v) => v.charAt(0).toUpperCase() + v.slice(1);

/** Search + the five library filters, bound to the URL via the library location module. */
function LibraryFilterBar({ layout, wcagLevels, wcagCriteriaIds }) {
  const { query, setFilter, clearFilters } = useLibraryLocation();
  const [search, setSearch] = useLibrarySearchInput();
  const { filters } = query;
  const activeCount = activeFilterCount(filters);
  const isLibrary = layout === "library";

  return (
    <div
      className={cn(
        "grid grid-cols-2 items-stretch gap-2",
        isLibrary ? "sm:grid-cols-3 lg:grid-cols-[minmax(0,2fr)_repeat(5,minmax(0,1fr))_auto]" : "sm:grid-cols-3"
      )}
    >
      <SearchField
        containerClassName={cn("col-span-2", isLibrary ? "sm:col-span-3 lg:col-span-1" : "sm:col-span-3")}
        placeholder="Search rules…"
        value={search}
        onValueChange={setSearch}
        aria-label="Search rules"
      />
      <FilterSelect label="Filter by category" value={filters.category} onChange={(v) => setFilter("category", v)}>
        <option value="all">All categories</option>
        {LIBRARY_CATEGORIES.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.label}
          </option>
        ))}
      </FilterSelect>
      <FilterSelect label="Filter by impact" value={filters.impact} onChange={(v) => setFilter("impact", v)}>
        <option value="all">Impact: All</option>
        {IMPACT_VALUES.map((impact) => (
          <option key={impact} value={impact}>
            {capitalize(impact)}
          </option>
        ))}
      </FilterSelect>
      <FilterSelect label="Filter by WCAG level" value={filters.level} onChange={(v) => setFilter("level", v)}>
        <option value="all">WCAG: All</option>
        {wcagLevels.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </FilterSelect>
      <FilterSelect label="Filter by WCAG criterion" value={filters.wcag} onChange={(v) => setFilter("wcag", v)}>
        <option value="all">Criterion: All</option>
        {wcagCriteriaIds.map((criteria) => (
          <option key={criteria} value={criteria}>
            {criteria}
          </option>
        ))}
      </FilterSelect>
      <FilterSelect label="Filter by legacy equivalent" value={filters.legacy} onChange={(v) => setFilter("legacy", v)}>
        <option value="all">Legacy: All</option>
        <option value="yes">Has legacy</option>
        <option value="no">No legacy</option>
      </FilterSelect>
      {activeCount > 0 ? (
        <Button type="button" variant="ghost" size="sm" onClick={clearFilters} className="h-9 justify-self-start">
          <X className="size-3.5" />
          Clear filters ({activeCount})
        </Button>
      ) : null}
    </div>
  );
}

export default function EngineRulesTable({
  layout = "compact",
  filteredRules,
  populatedCount,
  selectedRuleId,
  wcagLevels = [],
  wcagCriteriaIds = [],
  loading = false,
  detailOpen,
  onToggleDetail,
}) {
  const isLibrary = layout === "library";
  const { query, hrefs, clearFilters, setSearch } = useLibraryLocation();
  const hasNarrowing = Boolean(query.q) || activeFilterCount(query.filters) > 0;
  const categoriesCovered = new Set(filteredRules.map((rule) => RULE_CATEGORY_BY_ID[getRuleSlug(rule)]).filter(Boolean)).size;
  const wcagMapped = filteredRules.filter((rule) => rule.refs?.some((ref) => ref.type === "WCAG")).length;
  const countText = loading
    ? "Loading rules…"
    : `${populatedCount ?? 0} rules · ${filteredRules.length} shown`;

  return (
    <div className="flex h-full w-full min-w-0 flex-1 flex-col overflow-hidden bg-shell-main">
      <div className={`shrink-0 border-border pb-2 ${isLibrary ? "border-b px-4 pt-4 sm:px-6 sm:pt-5" : "px-3 pt-3 sm:px-4"}`}>
        {isLibrary ? (
          <div className="mb-4 overflow-hidden border border-border bg-shell-elevated">
            <div className="relative grid gap-5 border-b border-border bg-[radial-gradient(circle_at_top_right,rgba(0,163,141,0.13),transparent_38%)] p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div className="absolute left-0 top-0 h-full w-1 bg-primary" aria-hidden="true" />
              <div className="min-w-0 pl-2">
                <p className="mb-2 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-foreground-accent">
                  Accessibility intelligence workspace
                </p>
                <div className="flex items-center gap-2.5">
                  <span className="flex size-9 shrink-0 items-center justify-center border border-primary/35 bg-primary/10 text-primary">
                    <FileText className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h1 className="font-['Rajdhani',sans-serif] text-xl font-bold uppercase leading-none tracking-[0.1em] text-foreground sm:text-2xl">
                      Engine Rules Library
                    </h1>
                    <p className="mt-1.5 max-w-[580px] text-[0.82rem] leading-relaxed text-foreground-secondary">
                      Search, inspect, and validate the checks that power your accessibility audits.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 lg:justify-end">
                <RouterLink to="/test-runner/library" className="inline-flex h-9 items-center gap-2 border border-primary bg-primary px-3 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-white no-underline transition-colors hover:bg-foreground-accent">
                  <Play className="size-3.5" aria-hidden="true" />
                  Run tests
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </RouterLink>
                <RouterLink to="/rule-lab" className="inline-flex h-9 items-center gap-2 border border-border-strong px-3 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-foreground-secondary no-underline transition-colors hover:border-primary hover:text-foreground">
                  <FlaskConical className="size-3.5" aria-hidden="true" />
                  Open rule lab
                </RouterLink>
              </div>
            </div>
            <div className="grid grid-cols-3 divide-x divide-border">
              <div className="px-3 py-2.5 sm:px-5">
                <span className="flex items-center gap-1.5 font-mono text-[0.63rem] uppercase tracking-[0.1em] text-foreground-muted">
                  <ShieldCheck className="size-3 text-status-pass" aria-hidden="true" /> Active rules
                </span>
                <p className="mt-1 font-['Rajdhani',sans-serif] text-lg font-bold leading-none text-foreground" aria-live="polite">{loading ? "—" : populatedCount ?? 0}</p>
              </div>
              <div className="px-3 py-2.5 sm:px-5">
                <span className="flex items-center gap-1.5 font-mono text-[0.63rem] uppercase tracking-[0.1em] text-foreground-muted">
                  <Layers3 className="size-3 text-primary" aria-hidden="true" /> Categories
                </span>
                <p className="mt-1 font-['Rajdhani',sans-serif] text-lg font-bold leading-none text-foreground">{loading ? "—" : categoriesCovered}</p>
              </div>
              <div className="px-3 py-2.5 sm:px-5">
                <span className="font-mono text-[0.63rem] uppercase tracking-[0.1em] text-foreground-muted">WCAG mapped</span>
                <p className="mt-1 font-['Rajdhani',sans-serif] text-lg font-bold leading-none text-foreground">{loading ? "—" : wcagMapped}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-foreground-secondary" aria-live="polite">
              {countText}
            </p>
            {onToggleDetail ? (
              <Button
                type="button"
                variant={detailOpen ? "default" : "outline"}
                size="sm"
                onClick={onToggleDetail}
                aria-pressed={detailOpen}
              >
                <PanelRight className="size-3.5" />
                {detailOpen ? "Hide description" : "Show description"}
              </Button>
            ) : null}
          </div>
        )}

        <LibraryFilterBar layout={layout} wcagLevels={wcagLevels} wcagCriteriaIds={wcagCriteriaIds} />
      </div>

      <HudMotion
        variant="fade"
        transitionPreset="fast"
        style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}
      >
        <div className={`min-h-0 flex-1 overflow-auto pb-4 ${isLibrary ? "px-4 sm:px-6" : "px-2 sm:px-4"}`}>
          {loading ? (
            <div className="flex flex-col gap-3 py-6">
              <div className="flex items-center gap-2">
                <Spinner className="size-5" />
                <span className="font-mono text-xs uppercase tracking-widest text-primary">Loading rules</span>
              </div>
              {Array.from({ length: 8 }, (_, index) => (
                <Skeleton key={index} className="h-10 w-full" />
              ))}
            </div>
          ) : filteredRules.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <p className="text-sm text-foreground-secondary">No rules match your filters.</p>
              {hasNarrowing ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    clearFilters();
                    setSearch("");
                  }}
                >
                  Clear search and filters
                </Button>
              ) : null}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-b-2 border-primary hover:bg-transparent">
                  {isLibrary ? (
                    <>
                      <TableHead className="w-[18%]">Rule ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="w-[14%]">Category</TableHead>
                      <TableHead className="w-[10%]">Severity</TableHead>
                      <TableHead className="w-[10%]">Status</TableHead>
                      <TableHead className="w-[10%]">WCAG</TableHead>
                      <TableHead className="w-[10%]">Examples</TableHead>
                    </>
                  ) : (
                    <TableHead>Rule</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRules.map((rule) => {
                  const slug = getRuleSlug(rule);
                  return (
                    <RuleRow
                      key={slug}
                      rule={rule}
                      selected={slug === selectedRuleId}
                      layout={layout}
                      hrefs={hrefs}
                    />
                  );
                })}
              </TableBody>
            </Table>
          )}
        </div>
      </HudMotion>
    </div>
  );
}
