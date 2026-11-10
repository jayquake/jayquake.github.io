import { FileText, PanelRight } from "lucide-react";
import { memo, useCallback } from "react";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
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

function buildRuleHref(slug, searchParams) {
  const params = new URLSearchParams(searchParams);
  params.set("detail", "open");
  return `/engine/${slug}?${params.toString()}`;
}

const RuleRow = memo(function RuleRow({ rule, selected, layout, searchParams }) {
  const slug = getRuleSlug(rule);
  const engineBase = `/engine/${slug}`;
  const rulePath = buildRuleHref(slug, searchParams);
  const successPath = `${engineBase}_success`;
  const failurePath = `${engineBase}_failure`;
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

export default function EngineRulesTable({
  layout = "compact",
  filteredRules,
  populatedCount,
  selectedRuleId,
  onSelectRule,
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  impactFilter,
  setImpactFilter,
  wcagLevelFilter,
  setWcagLevelFilter,
  wcagCriteriaFilter,
  setWcagCriteriaFilter,
  legacyRuleFilter,
  setLegacyRuleFilter,
  wcagLevels,
  wcagCriteriaIds,
  loading = false,
  detailOpen,
  onToggleDetail,
}) {
  const isLibrary = layout === "library";
  const [searchParams] = useSearchParams();

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
            <p className="shrink-0 font-mono text-[0.75rem] text-foreground-secondary">
              {loading ? "Loading rules…" : `${populatedCount ?? 0} rules · ${filteredRules.length} shown`}
            </p>
          </div>
        ) : (
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-foreground-secondary">
              {loading ? "Loading rules…" : `${populatedCount ?? 0} rules · showing ${filteredRules.length}`}
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

        <div
          className={
            isLibrary
              ? "grid grid-cols-1 items-stretch gap-2 sm:grid-cols-2 lg:grid-cols-[minmax(140px,1fr)_2fr_minmax(120px,1fr)]"
              : "grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(108px,1fr))]"
          }
        >
          {isLibrary ? (
            <FilterSelect label="Filter by category" value={categoryFilter} onChange={setCategoryFilter}>
              <option value="all">ALL CATEGORIES</option>
              {LIBRARY_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label.toUpperCase()}
                </option>
              ))}
            </FilterSelect>
          ) : null}
          <SearchField
            containerClassName={!isLibrary ? "sm:col-span-2 lg:col-span-1" : undefined}
            placeholder="Search rules…"
            value={searchTerm}
            onValueChange={setSearchTerm}
            aria-label="Search rules"
          />
          <FilterSelect
            label={isLibrary ? "Filter by severity" : "Filter by impact"}
            value={impactFilter}
            onChange={setImpactFilter}
          >
            <option value="all">{isLibrary ? "ALL SEVERITY" : "Impact: All"}</option>
            <option value="critical">{isLibrary ? "CRITICAL" : "Critical"}</option>
            <option value="serious">{isLibrary ? "SERIOUS" : "Serious"}</option>
            <option value="moderate">{isLibrary ? "MODERATE" : "Moderate"}</option>
            <option value="minor">{isLibrary ? "MINOR" : "Minor"}</option>
          </FilterSelect>
          {!isLibrary ? (
            <>
              <FilterSelect label="Filter by WCAG level" value={wcagLevelFilter} onChange={setWcagLevelFilter}>
                <option value="all">WCAG: All</option>
                {wcagLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </FilterSelect>
              <FilterSelect label="Filter by WCAG criteria" value={wcagCriteriaFilter} onChange={setWcagCriteriaFilter}>
                <option value="all">Criteria: All</option>
                {wcagCriteriaIds.map((criteria) => (
                  <option key={criteria} value={criteria}>
                    {criteria}
                  </option>
                ))}
              </FilterSelect>
              <FilterSelect label="Filter by legacy rule" value={legacyRuleFilter} onChange={setLegacyRuleFilter}>
                <option value="all">Legacy: All</option>
                <option value="yes">Has legacy</option>
                <option value="no">No legacy</option>
              </FilterSelect>
            </>
          ) : null}
        </div>
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
            <p className="py-8 text-center text-sm text-foreground-secondary">No rules match your filters.</p>
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
                      searchParams={searchParams}
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
