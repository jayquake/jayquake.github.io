import { FileText, PanelRight, X } from "lucide-react";
import { memo, useCallback } from "react";
import { Link as RouterLink } from "react-router-dom";
import { HudMotion } from "../../motion/HudMotion";
import { Badge, severityVariant } from "../../ui/badge";
import { SearchField } from "../../ui/search-field";
import { NativeSelect } from "../../ui/native-select";
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

function FilterSelect({ label, value, onChange, children }) {
  return (
    <NativeSelect aria-label={label} value={value} onChange={(event) => onChange(event.target.value)}>
      {children}
    </NativeSelect>
  );
}

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
        <TableCell className={cn("relative p-0", selected && "shadow-[inset_3px_0_0_#00a38d]")}>
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
      <TableCell className={cn("max-w-0 p-0", selected && "shadow-[inset_2px_0_0_#00a38d]")}>
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
  const countText = loading
    ? "Loading rules…"
    : `${populatedCount ?? 0} rules · ${filteredRules.length} shown`;

  return (
    <div className="flex h-full w-full min-w-0 flex-1 flex-col overflow-hidden bg-shell-main">
      <div className={`shrink-0 border-border pb-2 ${isLibrary ? "border-b px-4 pt-4 sm:px-6 sm:pt-5" : "px-3 pt-3 sm:px-4"}`}>
        {isLibrary ? (
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <FileText className="size-6 text-foreground-accent" />
                <h1 className="font-['Rajdhani',sans-serif] text-base font-bold uppercase tracking-[0.14em] text-primary sm:text-[1.05rem]">
                  Engine Rules Library
                </h1>
              </div>
              <p className="max-w-[520px] text-[0.8rem] leading-relaxed text-foreground-secondary">
                Manage and configure accessibility rules used by the RAIDEN engine.
              </p>
            </div>
            <p className="shrink-0 font-mono text-[0.75rem] text-foreground-secondary" aria-live="polite">
              {countText}
            </p>
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
