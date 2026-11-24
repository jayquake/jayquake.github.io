import { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { AlertCircle, Bookmark, Bug, CheckCircle2, Code2, Copy, FlaskConical, Network } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import { analyzeExample } from "../../utils/exampleAuditor";
import { getFalsePositive, setFalsePositive } from "../../lib/exampleAudit/falsePositives";
import AuditResultsPanel, { issueKey } from "./AuditResultsPanel";
import { scopeExampleHtml } from "../../utils/scopeExampleHtml";
import { cn } from "../../lib/utils";
import { Alert } from "../ui/alert";
import { Chip } from "../ui/chip";
import { Input } from "../ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

/**
 * Per-variant token classes. Written out in full so Tailwind can see them.
 * success -> status-pass, failure -> status-fail.
 */
const VARIANT_CONFIG = {
  success: {
    text: "text-status-pass",
    tint: "bg-status-pass/10",
    border: "border-status-pass/30",
    cardBorder: "border-status-pass/30 border-l-status-pass hover:border-status-pass/45",
    listItem:
      "[&_.list-item]:border-status-pass/30 [&_.list-item]:bg-status-pass/10",
    icon: CheckCircle2,
    label: "Best Practice",
    badgeIcon: CheckCircle2,
    alertVariant: "success",
    alertText: (ruleId) =>
      `This example properly implements the ${ruleId || "accessibility"} requirement.`,
  },
  failure: {
    text: "text-status-fail",
    tint: "bg-status-fail/10",
    border: "border-status-fail/30",
    cardBorder: "border-status-fail/30 border-l-status-fail hover:border-status-fail/45",
    listItem:
      "[&_.list-item]:border-status-fail/30 [&_.list-item]:bg-status-fail/10",
    icon: AlertCircle,
    label: "Accessibility Issue",
    badgeIcon: Bug,
    alertVariant: "error",
    alertText: (ruleId) =>
      `This example violates the ${ruleId || "accessibility"} requirement and needs to be fixed.`,
  },
};

const iconButtonClass =
  "inline-flex size-8 shrink-0 cursor-pointer items-center justify-center border border-solid p-0 no-underline transition-colors";

const neutralIconButton = "border-border bg-shell-panel text-foreground-secondary";
const activeIconButton = "border-primary/25 bg-primary/10 text-primary";

const captionClass = "mb-2 block text-[0.75rem] font-semibold uppercase tracking-[0.5px]";

const fpStorage = () => {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

export default function ExampleCard({
  index,
  variant,
  ruleId,
  ruleType,
  html,
  reactContent,
  filename,
}) {
  const cfg = VARIANT_CONFIG[variant];
  const StatusIcon = cfg.icon;
  const BadgeIcon = cfg.badgeIcon;
  const scopedHtml = html ? scopeExampleHtml(html, index) : html;

  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [treeOpen, setTreeOpen] = useState(false);
  const [treeData, setTreeData] = useState(null);
  const [treeLoading, setTreeLoading] = useState(false);
  const [treeError, setTreeError] = useState(null);
  const [fpFlagged, setFpFlagged] = useState(() => getFalsePositive(fpStorage(), ruleId, index).flagged);
  const [fpNotes, setFpNotes] = useState(() => getFalsePositive(fpStorage(), ruleId, index).notes);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(html || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [html]);

  const ruleLabHref = useMemo(() => {
    const params = new URLSearchParams();
    if (ruleId) params.set("ruleId", ruleId);
    if (ruleType) params.set("type", ruleType);
    if (html) params.set("html", btoa(unescape(encodeURIComponent(html))));
    params.set("exampleType", variant);
    return `/rule-lab?${params.toString()}`;
  }, [ruleId, ruleType, html, variant]);

  const handleTreeToggle = useCallback(async () => {
    if (treeOpen) {
      setTreeOpen(false);
      return;
    }
    setTreeOpen(true);
    if (treeData) return;

    setTreeLoading(true);
    setTreeError(null);

    try {
      setTreeData(await analyzeExample({ ruleId, ruleType, variant, html: html || "", index }));
    } catch (err) {
      setTreeError("Analysis failed: " + (err.message || "The server may be unreachable."));
    } finally {
      setTreeLoading(false);
    }
  }, [treeOpen, treeData, ruleId, ruleType, html, variant, index]);

  const handleFPToggle = useCallback(() => {
    const next = !fpFlagged;
    setFpFlagged(next);
    setFalsePositive(fpStorage(), ruleId, index, { flagged: next, notes: fpNotes });
  }, [fpFlagged, fpNotes, ruleId, index]);

  const handleFPNotes = useCallback(
    (e) => {
      const notes = e.target.value;
      setFpNotes(notes);
      setFalsePositive(fpStorage(), ruleId, index, { flagged: fpFlagged, notes });
    },
    [ruleId, index, fpFlagged]
  );

  // Per-audit-issue false positives (same store as the example-level flag).
  const [auditFPs, setAuditFPs] = useState(() => new Set(getFalsePositive(fpStorage(), ruleId, index).issues));

  const handleAuditFP = useCallback(
    (issue, flagged) => {
      const key = issueKey(issue);
      setAuditFPs((prev) => {
        const next = new Set(prev);
        if (flagged) next.add(key);
        else next.delete(key);
        setFalsePositive(fpStorage(), ruleId, index, { issues: Array.from(next) });
        return next;
      });
    },
    [ruleId, index]
  );

  return (
    <div
      className={cn(
        "mb-4 border border-l-[3px] border-solid bg-shell-panel transition-colors duration-200",
        fpFlagged ? "border-status-warn/50 border-l-status-warn hover:border-status-warn/65" : cfg.cardBorder
      )}
      role="region"
      aria-labelledby={`${variant}-example-${index}`}
    >
      <div className="p-4 sm:p-5 md:p-6">
        {/* Header row */}
        <div className="mb-3 flex flex-row flex-wrap items-center justify-between gap-2">
          <div className="flex flex-row flex-wrap items-center gap-1 sm:gap-2">
            <div
              className={cn(
                "grid size-[25px] place-items-center border border-solid font-mono text-[0.7rem] font-bold",
                cfg.tint,
                cfg.border,
                cfg.text
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </div>
            <StatusIcon className={cn("size-[18px]", cfg.text)} aria-hidden="true" />
            <h6 id={`${variant}-example-${index}`} className={cn("m-0 text-sm font-semibold", cfg.text)}>
              {variant === "success" ? "Success" : "Failure"} Example #{index + 1}
            </h6>
            {filename && (
              <Chip className={cn("h-[22px] rounded-none bg-transparent", cfg.border, cfg.text)}>{filename}</Chip>
            )}
            <Chip
              className={cn("h-[22px] rounded-full font-sans font-semibold", cfg.tint, cfg.border, cfg.text)}
              icon={<BadgeIcon className="size-3.5" aria-hidden="true" />}
            >
              {cfg.label}
            </Chip>
          </div>

          {/* Action buttons */}
          <div className="flex flex-row flex-wrap gap-1" aria-label={`Actions for example ${index + 1}`}>
            <Tooltip>
              <TooltipTrigger
                onClick={() => setShowCode((p) => !p)}
                className={cn(iconButtonClass, showCode ? activeIconButton : cn(cfg.tint, cfg.border, cfg.text))}
                aria-label={showCode ? "Show rendered HTML" : "Show code"}
              >
                <Code2 className="size-5" aria-hidden="true" />
              </TooltipTrigger>
              <TooltipContent>{showCode ? "Show rendered" : "Show code"}</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger
                onClick={handleCopy}
                className={cn(
                  iconButtonClass,
                  copied ? cn(cfg.tint, cfg.border, cfg.text) : neutralIconButton,
                  variant === "success" ? "hover:bg-status-pass/10" : "hover:bg-status-fail/10"
                )}
                aria-label={`Copy example ${index + 1} code`}
              >
                <Copy className="size-5" aria-hidden="true" />
              </TooltipTrigger>
              <TooltipContent>{copied ? "Copied!" : "Copy code"}</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <RouterLink
                  to={ruleLabHref}
                  className={cn(iconButtonClass, activeIconButton, "hover:bg-primary/15")}
                  aria-label="Analyze in Rule Lab"
                >
                  <FlaskConical className="size-5" aria-hidden="true" />
                </RouterLink>
              </TooltipTrigger>
              <TooltipContent>Analyze in Rule Lab</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger
                onClick={handleTreeToggle}
                className={cn(iconButtonClass, treeOpen ? activeIconButton : neutralIconButton, "hover:bg-primary/10")}
                aria-label="View accessibility tree"
              >
                <Network className="size-5" aria-hidden="true" />
              </TooltipTrigger>
              <TooltipContent>Accessibility Tree</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger
                onClick={handleFPToggle}
                className={cn(
                  iconButtonClass,
                  fpFlagged ? "border-status-warn/35 bg-status-warn/10 text-status-warn" : neutralIconButton
                )}
                aria-label="Flag as false positive"
              >
                <Bookmark className={cn("size-5", fpFlagged && "fill-current")} aria-hidden="true" />
              </TooltipTrigger>
              <TooltipContent>{fpFlagged ? "Unflag false positive" : "Flag as false positive"}</TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Rendered HTML view. Fixtures always see the light palette. */}
        {!showCode && (
          <div
            data-theme="light"
            className={cn(
              "mb-3 min-h-12 rounded border border-solid bg-shell-panel p-3 text-foreground sm:p-4 md:p-5",
              cfg.border
            )}
          >
            <span className={cn(captionClass, cfg.text)}>Fixture Preview</span>
            <section
              data-audit-example={index}
              data-rule-id={ruleId}
              data-variant={variant}
              aria-label={`Example ${index + 1} ${variant}`}
            >
              {reactContent ? (
                <div
                  data-theme="light"
                  data-fixture
                  className={cn(
                    "[&_.list-item]:my-2 [&_.list-item]:rounded-lg [&_.list-item]:border [&_.list-item]:border-solid [&_.list-item]:p-3",
                    cfg.listItem
                  )}
                >
                  {reactContent}
                </div>
              ) : (
                <div data-theme="light" data-fixture dangerouslySetInnerHTML={{ __html: scopedHtml }} className="[&_*]:max-w-full" />
              )}
            </section>
          </div>
        )}

        {/* Code view */}
        {showCode && (
          // Source view is always a dark code panel, so it pins the dark palette.
          <div
            data-theme="dark"
            className={cn("mb-3 rounded-lg border border-solid bg-shell-input p-3 text-foreground sm:p-4 md:p-5", cfg.border)}
          >
            <span className={cn(captionClass, cfg.text)}>Fixture Source</span>
            <pre className="m-0 max-h-[200px] overflow-auto whitespace-pre-wrap break-words rounded bg-overlay/30 p-4 font-mono text-[0.75rem] text-foreground md:max-h-[400px] md:text-[0.875rem]">
              <code>{html}</code>
            </pre>
          </div>
        )}

        {/* Alert footer */}
        <Alert
          role="alert"
          variant={cfg.alertVariant}
          icon={<StatusIcon className={cn("mt-0.5 size-[18px] shrink-0", cfg.text)} aria-hidden="true" />}
          className={cn("rounded-lg py-1", cfg.tint, cfg.border, "border-solid")}
        >
          <p className={cn("m-0 text-[0.8rem] font-medium", cfg.text)}>{cfg.alertText(ruleId)}</p>
        </Alert>

        {/* Inline Accessibility Tree */}
        {treeOpen && (
          <div className="mt-3 rounded border border-solid border-border bg-shell-panel p-3 sm:p-4">
            <div className="mb-2 flex flex-row items-center gap-2">
              <h6 className="m-0 text-sm font-semibold text-primary">Accessibility Tree</h6>
              {treeData?.source === "client" && <Chip className="h-5 rounded-full">Client-Side</Chip>}
            </div>
            {treeLoading && (
              <div role="progressbar" className="relative mb-2 h-1 overflow-hidden bg-primary/20">
                <div className="absolute inset-y-0 left-0 w-2/5 animate-progress-indeterminate bg-primary" />
              </div>
            )}
            {treeError && (
              <Alert role="alert" variant="warning" className="border-solid py-1 text-[0.8rem]">
                {treeError}{" "}
                <RouterLink to={ruleLabHref} className="text-[0.8rem] font-semibold text-inherit underline">
                  Open in Rule Lab
                </RouterLink>
              </Alert>
            )}
            {treeData && !treeError && (
              <div>
                <div className="max-h-[300px] overflow-auto font-mono text-[0.75rem] md:text-[0.8rem]">
                  {treeData.accessibilityTree ? (
                    <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                      {typeof treeData.accessibilityTree === "string"
                        ? treeData.accessibilityTree
                        : JSON.stringify(treeData.accessibilityTree, null, 2)}
                    </pre>
                  ) : (
                    <p className="m-0 text-sm text-foreground-secondary">No accessibility tree data returned.</p>
                  )}
                  {treeData.computedRoles && treeData.computedRoles.length > 0 && (
                    <div className="mt-2 flex flex-row flex-wrap gap-1">
                      {treeData.computedRoles.map((role, i) => (
                        <Chip key={i} className="h-5 rounded-full">
                          {role}
                        </Chip>
                      ))}
                    </div>
                  )}
                  {treeData.screenReaderNarration && (
                    <div className="mt-2 rounded border border-solid border-border bg-shell-main p-2">
                      <span className="mb-1 block text-[0.75rem] font-semibold">Screen Reader Narration:</span>
                      <p className="m-0 text-[0.8rem] italic">{treeData.screenReaderNarration}</p>
                    </div>
                  )}
                </div>

                {/* Audit results from client-side analysis */}
                {treeData.audit && (
                  <div className="mt-4">
                    <AuditResultsPanel
                      audit={treeData.audit}
                      compact
                      onFlagFalsePositive={handleAuditFP}
                      falsePositives={auditFPs}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* False Positive notes */}
        {fpFlagged && (
          <Input
            placeholder="Notes about this false positive..."
            value={fpNotes}
            onChange={handleFPNotes}
            className="mt-3 box-border border border-solid border-status-warn/30 bg-status-warn/5 px-3 font-sans text-[0.8rem]"
          />
        )}
      </div>
    </div>
  );
}

ExampleCard.propTypes = {
  index: PropTypes.number.isRequired,
  variant: PropTypes.oneOf(["success", "failure"]).isRequired,
  ruleId: PropTypes.string,
  ruleType: PropTypes.string,
  html: PropTypes.string,
  reactContent: PropTypes.node,
  filename: PropTypes.string,
};
