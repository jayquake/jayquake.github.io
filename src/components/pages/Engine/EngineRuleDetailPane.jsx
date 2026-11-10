import { Bug, ChevronLeft, ChevronRight, CircleCheck, CircleX, FlaskConical } from "lucide-react";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import { Button, buttonClass } from "../../ui/button";
import { Badge, severityVariant } from "../../ui/badge";
import { Card, CardContent, CardTitle } from "../../ui/card";
import { impactToSeverityLabel } from "./engineLibraryUtils";
import { LIBRARY_LAYOUT } from "../../../theme/layout";
import { prefetchEngineExample } from "../../../utils/engineExampleUtils";
import { getRuleSlug } from "./engineLibraryUtils";
import { MGS } from "../../../theme/mgsTokens";

const sectionLabelClass =
  "mb-2 block font-mono text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-foreground-accent";
const bodyClass = "text-left text-sm leading-relaxed text-foreground-secondary [overflow-wrap:break-word]";

export default function EngineRuleDetailPane({
  rule,
  collapsed,
  onToggleCollapse,
  compact = false,
  side = "left",
}) {
  const CloseIcon = side === "right" ? ChevronRight : ChevronLeft;
  const [searchParams] = useSearchParams();
  if (!rule) {
    return <div className="p-4 text-sm text-foreground-secondary">Select a rule from the table.</div>;
  }

  const slug = getRuleSlug(rule);
  const wcagRefs = rule.refs?.filter((r) => r.type === "WCAG") || [];
  const canonicalRuleHref = (() => {
    const params = new URLSearchParams(searchParams);
    params.set("detail", "open");
    return `/engine/${slug}?${params.toString()}`;
  })();

  if (collapsed) {
    return (
      <div
        className="flex h-full flex-col items-center border-r border-border bg-shell-main py-2"
        style={{ width: LIBRARY_LAYOUT.detailCollapsedPx, minWidth: LIBRARY_LAYOUT.detailCollapsedPx }}
      >
        <Button variant="ghost" size="icon" onClick={onToggleCollapse} aria-label="Expand detail pane">
          <ChevronRight className="size-4" />
        </Button>
        <p className="mt-2 max-h-[120px] overflow-hidden text-ellipsis font-mono text-[0.75rem] tracking-widest text-primary [writing-mode:vertical-rl] rotate-180">
          {slug}
        </p>
      </div>
    );
  }

  return (
    <div className={`flex h-full w-full min-w-0 flex-col overflow-hidden bg-shell-elevated text-left`}>
      <div className="flex w-full shrink-0 items-start justify-start gap-2 border-b border-border bg-shell-panel px-4 py-3 sm:px-5">
        <div className="min-w-0 flex-1 pr-2">
          <p className={sectionLabelClass}>Rule description</p>
          <RouterLink
            to={canonicalRuleHref}
            className="mb-1 block font-mono text-[0.75rem] tracking-wide text-primary no-underline hover:underline"
          >
            [ {slug} ]
          </RouterLink>
          <h2 className="text-left text-[0.85rem] font-semibold leading-snug text-foreground [overflow-wrap:break-word] sm:text-[0.95rem]">
            {rule.title}
          </h2>
        </div>
        <Button variant="ghost" size="icon" onClick={onToggleCollapse} aria-label="Close description panel">
          <CloseIcon className="size-4" />
        </Button>
      </div>

      <div className="flex w-full flex-1 flex-col gap-3 overflow-y-auto px-4 py-4 text-left sm:px-5">
        {rule.impact ? (
          <Badge variant={severityVariant(impactToSeverityLabel(rule.impact))} className="w-fit">
            {impactToSeverityLabel(rule.impact)}
          </Badge>
        ) : null}
        <Card>
          <CardTitle>Description</CardTitle>
          <CardContent className={bodyClass}>{rule.description}</CardContent>
        </Card>
        {rule.advice ? (
          <Card>
            <CardTitle>Advice</CardTitle>
            <CardContent className={bodyClass}>{rule.advice}</CardContent>
          </Card>
        ) : null}
        {wcagRefs.length > 0 ? (
          <Card>
            <CardTitle>WCAG</CardTitle>
            <div className="flex flex-wrap gap-1">
              {wcagRefs.map((ref, i) =>
                ref.link ? (
                  <a key={i} href={ref.link} target="_blank" rel="noopener noreferrer">
                    <Badge variant="outline">
                      {ref.id} ({ref.level || "?"})
                    </Badge>
                  </a>
                ) : (
                  <Badge key={i} variant="outline">
                    {ref.id} ({ref.level || "?"})
                  </Badge>
                )
              )}
            </div>
          </Card>
        ) : null}
        <Card>
          <CardTitle>Actions</CardTitle>
          <div className="flex w-full flex-col items-stretch gap-2">
          <RouterLink
            to={`/engine/${slug}_success`}
            className={buttonClass({ className: "w-full justify-start border-primary text-foreground" })}
            onMouseEnter={() => prefetchEngineExample(slug, "success")}
            onFocus={() => prefetchEngineExample(slug, "success")}
          >
            <CircleCheck className="size-4" style={{ color: MGS.passGreen }} />
            Success examples
          </RouterLink>
          <RouterLink
            to={`/engine/${slug}_failure`}
            className={buttonClass({ className: "w-full justify-start border-primary text-foreground" })}
            onMouseEnter={() => prefetchEngineExample(slug, "failure")}
            onFocus={() => prefetchEngineExample(slug, "failure")}
          >
            <CircleX className="size-4" style={{ color: MGS.alertRed }} />
            Failure examples
          </RouterLink>
          <RouterLink to={`/rule-lab?rule=${slug}`} className={buttonClass({ className: "w-full justify-start" })}>
            <FlaskConical className="size-4" />
            Rule Lab
          </RouterLink>
          <RouterLink to={`/engine/${slug}?debug=mcp`} className={buttonClass({ className: "w-full justify-start" })}>
            <Bug className="size-4" />
            MCP Debug
          </RouterLink>
          </div>
        </Card>
      </div>
    </div>
  );
}
