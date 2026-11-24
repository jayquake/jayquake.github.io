import {
  Accessibility,
  ChevronUp,
  ClipboardPaste,
  Code2,
  Copy,
  ExternalLink,
  FileText,
  Info,
  Link as LinkIcon,
  Microscope,
  Network,
  Plus,
  Printer,
  Search,
  Share2,
  Shield,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import DOMPurify from "dompurify";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-markup";
import "prismjs/themes/prism-okaidia.css";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import legacyEngineMapping from "../../data/legacy-engine-mapping";
import { getEngineRulesCatalogCache, fetchEngineRulesCatalog } from "../../utils/engineRulesDataService";
import { getRuleSummary } from "../../utils/analysisCache";
import { analyzeHtmlClientSide } from "../../utils/clientAccessibilityTree";
import { AuditSummaryChips } from "./AuditResultsPanel";
import { useLibraryLocation } from "../../hooks/useLibraryLocation";
import SimpleBreadcrumbs from "../util/BreadCrumb";
import { cn } from "../../lib/utils";
import { severityOf, type Impact } from "../../theme/severity";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Alert, AlertTitle } from "../ui/alert";
import { Button, buttonClass } from "../ui/button";
import { Chip } from "../ui/chip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

/** Panel surface (was the "glassCard" sx preset). */
const panelClass = "rounded-xl border border-solid border-border bg-shell-panel shadow-sm transition-all duration-300";

/** Section heading row: MUI Typography variant="h6" -> <h6>. */
const sectionHeadingClass = "m-0 text-base font-bold text-primary md:text-[1.15rem]";

/** Always-dark code panel; pins the dark palette so tokens read as on a dark surface. */
const codePanelClass = "max-h-[400px] overflow-auto rounded-lg bg-shell-input p-4 text-foreground";

const copyButtonClass =
  "absolute right-2 top-2 z-[1] inline-flex size-8 cursor-pointer items-center justify-center rounded-full bg-shell-panel/90 p-0 text-status-pass";

interface LegacyRuleData {
  _id?: { $oid: string };
  name: string;
  route: string;
  shortCode?: string;
  criteria: string;
  shortDescription?: string;
  issueDescription?: string;
  issueResolution?: string;
  severity?: string;
  WCAGLevel?: string;
  issueWCAGLink?: string;
  issueTutorialLink?: string;
  enabled?: boolean;
}

interface UnifiedRulePageProps {
  ruleData: LegacyRuleData;
}

interface RelatedEngineRule {
  id?: string;
  path: string;
  label: string;
}

/** Legacy severity names map onto the shared impact family. */
function impactOf(level: string | undefined): Impact | null {
  switch (level?.toLowerCase()) {
    case "critical":
    case "extreme":
      return "critical";
    case "serious":
    case "major":
    case "high":
      return "serious";
    case "moderate":
    case "medium":
      return "moderate";
    case "minor":
    case "low":
      return "minor";
    default:
      return null;
  }
}

type TabValue = "overview" | "examples" | "mcp" | "references";

interface ActionCardProps {
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  accentClass: string;
}

/** Navigating card: the whole card is one real link. */
function ActionCard({ to, icon, title, description, accentClass }: ActionCardProps) {
  return (
    <Link
      to={to}
      className={cn(
        panelClass,
        "flex h-full flex-col items-start p-4 text-left text-inherit no-underline hover:border-primary/40 hover:bg-primary/5 md:p-5"
      )}
    >
      <span className={cn("mb-2", accentClass)} aria-hidden="true">
        {icon}
      </span>
      <h6 className="m-0 mb-1 text-sm font-bold text-foreground">{title}</h6>
      <span className="mb-3 text-[0.75rem] leading-normal text-foreground-secondary">{description}</span>
      <span className={cn("mt-auto inline-flex items-center gap-1 text-[0.75rem] font-semibold", accentClass)}>
        Open
        <ExternalLink className="size-3.5" aria-hidden="true" />
      </span>
    </Link>
  );
}

export default function UnifiedRulePage({ ruleData }: UnifiedRulePageProps) {
  const { hrefs } = useLibraryLocation();
  const [tab, setTab] = useState<TabValue>("overview");
  const [copied, setCopied] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [jsonExpanded, setJsonExpanded] = useState(false);

  const leg = ruleData;

  const ruleId = leg?.shortCode || leg?.route || "";
  const [auditSummary, setAuditSummary] = useState<{ critical: number; serious: number; moderate: number; minor: number } | null>(null);
  const [analyzingAll, setAnalyzingAll] = useState(false);

  useEffect(() => {
    const summary = getRuleSummary(ruleId);
    if (summary) setAuditSummary(summary.totalIssues);
  }, [ruleId]);

  const handleAnalyzeAll = useCallback(async () => {
    setAnalyzingAll(true);
    try {
      const catalog =
        getEngineRulesCatalogCache() || (await fetchEngineRulesCatalog());
      const match = catalog.byId[ruleId];
      if (match) {
        const dummyHtml = `<div>Example for ${ruleId}</div>`;
        await analyzeHtmlClientSide(dummyHtml);
      }
      const summary = getRuleSummary(ruleId);
      if (summary) setAuditSummary(summary.totalIssues);
    } catch { /* ignore */ }
    setAnalyzingAll(false);
  }, [ruleId]);

  useEffect(() => {
    Prism.highlightAll();
  }, [ruleData, tab]);

  useEffect(() => {
    const fn = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) {}
  };

  if (!ruleData) {
    return (
      <div className="mx-auto max-w-[1200px] px-4 py-4 sm:px-6 md:px-8 md:py-8">
        <div className={cn(panelClass, "p-4 text-center md:p-6")}>
          <Alert role="alert" variant="info" className="border-solid text-left">
            <AlertTitle className="m-0">No Rule Data</AlertTitle>
            The requested rule could not be loaded.
          </Alert>
        </div>
      </div>
    );
  }

  const severity = leg.severity;
  const impact = impactOf(severity);
  const severityClass = impact ? severityOf(impact).className : "text-foreground-muted";
  const severityBorderClass = impact ? severityOf(impact).badgeClassName : "border-foreground-muted";
  const title = leg.name;
  const legacyRef = { type: "legacy" as const, criteria: leg.criteria, route: leg.route };
  const successUrl = hrefs.example(legacyRef, "success");
  const failureUrl = hrefs.example(legacyRef, "failure");

  const relatedEngineRules: RelatedEngineRule[] = (() => {
    const mapping = legacyEngineMapping as Record<string, RelatedEngineRule[] | undefined>;
    const from = leg.shortCode ? mapping[leg.shortCode] || [] : [];
    const seen = new Set<string>();
    return from.filter((r) => {
      const key = r.label.replace(/\s*\(Engine rule\)\s*/gi, "").toLowerCase();
      return seen.has(key) ? false : (seen.add(key), true);
    });
  })();

  const sanitizedHtml = DOMPurify.sanitize(leg.issueResolution || "");

  const releaseJson = `{\n  "shortTextMarkdown": "New rule updated",\n  "bodyMarkdown": "**${leg.name}** detection has been updated and may affect the number of issues found in your audit.",\n  "ctaLink": "rules/${leg._id?.$oid || "rule-id"}"\n}`;

  const speedDialActions = [
    { icon: <Share2 className="size-4" aria-hidden="true" />, name: "Share", action: () => handleCopy(window.location.href) },
    { icon: <Printer className="size-4" aria-hidden="true" />, name: "Print", action: () => window.print() },
    {
      icon: <Copy className="size-4" aria-hidden="true" />,
      name: "Copy Advice",
      action: () => handleCopy(leg.issueResolution || ""),
    },
  ];

  const hasRelated = relatedEngineRules.length > 0;

  return (
    <div className="relative mx-auto max-w-[1200px] px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
      {/* Scroll to top */}
      {showScrollTop && (
        <Button
          variant="default"
          size="icon"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-36 right-4 z-[1000] size-10 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary-dim md:bottom-20 md:right-6"
        >
          <ChevronUp className="size-5" aria-hidden="true" />
        </Button>
      )}

      {/* Quick actions (was an MUI SpeedDial) */}
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label="Quick actions"
          className="fixed bottom-20 right-4 z-[1000] inline-flex size-14 cursor-pointer items-center justify-center rounded-full bg-primary p-0 text-primary-foreground shadow-lg hover:bg-primary-dim md:bottom-4"
        >
          <Plus className="size-6" aria-hidden="true" />
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top" align="end">
          {speedDialActions.map((a) => (
            <DropdownMenuItem key={a.name} onSelect={a.action}>
              {a.icon}
              {a.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* ── Hero Header ──────────────────────────────────────────────────────── */}
      <div className={cn(panelClass, "mb-2 p-4 shadow-md sm:p-6 md:mb-4 md:p-8")}>
        <SimpleBreadcrumbs />
        <Separator className="my-3 md:my-4" />

        {/* Title row with type chip */}
        <div className="mb-2 flex flex-row flex-wrap items-center gap-1 sm:gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="inline-flex h-6 items-center gap-1 rounded-full border border-solid border-status-info/40 px-2 text-[0.75rem] font-semibold text-status-info">
                <Info className="size-3.5" aria-hidden="true" />
                Legacy Rule
              </span>
            </TooltipTrigger>
            <TooltipContent>Guidance for manual and automated accessibility testing</TooltipContent>
          </Tooltip>
          {leg.enabled === false && (
            <Chip className="h-6 rounded-full border-transparent bg-muted font-sans font-semibold text-foreground-secondary">
              Disabled in AccessFlow
            </Chip>
          )}
        </div>

        <h3 className="m-0 mb-2 text-[1.3rem] font-extrabold leading-[1.2] text-foreground sm:text-[1.6rem] md:text-[2rem]">
          {title}
        </h3>

        {/* Chips row */}
        <div className="mb-3 flex flex-row flex-wrap gap-1 sm:gap-2">
          <span
            className={cn(
              "inline-flex h-[26px] items-center gap-1 rounded-full border border-solid bg-transparent px-2 text-[0.8rem] font-semibold",
              severityBorderClass,
              severityClass
            )}
          >
            <Shield className="size-4" aria-hidden="true" />
            {severity ? `${severity.charAt(0).toUpperCase()}${severity.slice(1)} Severity` : "Unknown"}
          </span>
          {leg.WCAGLevel && leg.WCAGLevel !== "none" && (
            <Chip
              tone="info"
              className="h-[26px] rounded-full bg-transparent font-sans text-[0.8rem] font-semibold"
              icon={<Accessibility className="size-4" aria-hidden="true" />}
            >
              {`WCAG ${leg.WCAGLevel}`}
            </Chip>
          )}
          {leg.criteria && (
            <Chip tone="info" className="h-[26px] rounded-full border-transparent font-sans text-[0.8rem]">
              {`${leg.criteria.charAt(0).toUpperCase()}${leg.criteria.slice(1)}`}
            </Chip>
          )}
        </div>

        <p className="m-0 text-[0.85rem] leading-relaxed text-foreground-secondary md:text-[0.95rem]">
          {leg.shortDescription || ""}
        </p>

        {/* Cross-links (compact) */}
        {hasRelated && (
          <div className="mt-3">
            {relatedEngineRules.length > 0 && (
              <div className="flex flex-row flex-wrap items-center gap-1">
                <span className="text-[0.75rem] font-semibold text-foreground-muted">Related:</span>
                {relatedEngineRules.map((r) => (
                  <Link
                    key={r.path}
                    to={r.path}
                    className="inline-flex h-[22px] items-center rounded-full border border-solid border-border bg-shell-main px-2 text-[0.75rem] text-foreground no-underline hover:border-primary/40 hover:bg-primary/10"
                  >
                    {r.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Audit Summary Strip ──────────────────────────────────────────────── */}
      {(auditSummary || !analyzingAll) && (
        <div className={cn(panelClass, "mb-2 flex flex-wrap items-center gap-2 px-4 py-2")}>
          <span className="text-[0.75rem] font-semibold text-foreground-secondary">Audit:</span>
          {auditSummary ? (
            <AuditSummaryChips summary={auditSummary} />
          ) : (
            <Chip className="h-5 rounded-full">{analyzingAll ? "Analyzing..." : "Not analyzed"}</Chip>
          )}
          {!auditSummary && !analyzingAll && (
            <Button size="sm" onClick={handleAnalyzeAll} className="ml-auto h-6 normal-case">
              Analyze
            </Button>
          )}
        </div>
      )}

      <Tabs value={tab} onValueChange={(v) => setTab(v as TabValue)}>
        {/* ── Tabs (sticky) ─────────────────────────────────────────────────── */}
        <div className={cn(panelClass, "sticky top-14 z-10 mb-2 md:top-16")}>
          <TabsList className="border-0 px-2 md:px-4">
            <TabsTrigger value="overview" className="h-11 px-3 font-sans text-[0.8rem] font-semibold normal-case tracking-normal md:h-12 md:px-4 md:text-[0.85rem]">
              Overview
            </TabsTrigger>
            <TabsTrigger value="examples" className="h-11 px-3 font-sans text-[0.8rem] font-semibold normal-case tracking-normal md:h-12 md:px-4 md:text-[0.85rem]">
              Examples
            </TabsTrigger>
            <TabsTrigger value="mcp" className="h-11 px-3 font-sans text-[0.8rem] font-semibold normal-case tracking-normal md:h-12 md:px-4 md:text-[0.85rem]">
              MCP Analysis
            </TabsTrigger>
            <TabsTrigger value="references" className="h-11 px-3 font-sans text-[0.8rem] font-semibold normal-case tracking-normal md:h-12 md:px-4 md:text-[0.85rem]">
              References
            </TabsTrigger>
          </TabsList>
        </div>

        {/* ── Tab 0: Overview ───────────────────────────────────────────────── */}
        <TabsContent value="overview" className="py-3 md:py-4">
          <div className="flex flex-col gap-4">
            {/* Description */}
            <div className={cn(panelClass, "p-4 sm:p-5 md:p-6")}>
              <div className="mb-4 flex flex-row items-center gap-3">
                <FileText className="size-5 text-primary md:size-6" aria-hidden="true" />
                <h6 className={sectionHeadingClass}>Rule Description</h6>
              </div>
              <p className="m-0 rounded-lg border border-solid border-border bg-shell-main p-3 text-[0.85rem] leading-[1.7] text-foreground-secondary sm:p-4 md:p-5 md:text-[0.95rem]">
                {leg.issueDescription}
              </p>
            </div>

            {/* WCAG link (legacy) */}
            {leg.issueWCAGLink && (
              <div className={cn(panelClass, "p-4 sm:p-5 md:p-6")}>
                <div className="mb-4 flex flex-row items-center gap-3">
                  <LinkIcon className="size-5 text-primary md:size-6" aria-hidden="true" />
                  <h6 className={sectionHeadingClass}>WCAG Documentation</h6>
                </div>
                <div className="rounded-lg border border-solid border-status-info/20 bg-status-info/5 p-3 md:p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <a
                      href={leg.issueWCAGLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonClass({ variant: "default", size: "sm", className: "shrink-0 font-semibold normal-case no-underline" })}
                    >
                      <ExternalLink className="size-4" aria-hidden="true" />
                      View WCAG Guidelines
                    </a>
                    <span className="break-all font-mono text-[0.75rem] text-foreground-secondary">{leg.issueWCAGLink}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Issue Resolution (legacy) */}
            {leg.issueResolution && (
              <div className={cn(panelClass, "p-4 sm:p-5 md:p-6")}>
                <div className="mb-4 flex flex-row items-center gap-3">
                  <Code2 className="size-5 text-primary md:size-6" aria-hidden="true" />
                  <h6 className={sectionHeadingClass}>Issue Resolution</h6>
                </div>
                <div className="relative rounded-lg border border-solid border-status-pass/15 bg-status-pass/5 p-3 md:p-4">
                  <Tooltip>
                    <TooltipTrigger
                      onClick={() => navigator.clipboard.writeText(leg.issueResolution!)}
                      aria-label={copied ? "Copied!" : "Copy resolution code"}
                      className={copyButtonClass}
                    >
                      <ClipboardPaste className="size-4" aria-hidden="true" />
                    </TooltipTrigger>
                    <TooltipContent>{copied ? "Copied!" : "Copy resolution code"}</TooltipContent>
                  </Tooltip>
                  <div data-theme="dark" className={codePanelClass}>
                    <pre style={{ margin: 0, fontSize: "0.8rem", lineHeight: 1.5 }}>
                      <code className="language-html" dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        {/* ── Tab 1: Examples ──────────────────────────────────────────────── */}
        <TabsContent value="examples" className="py-3 md:py-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
            <Link
              to={successUrl}
              className={cn(
                panelClass,
                "block border-status-pass/25 bg-status-pass/5 p-4 text-center no-underline hover:-translate-y-0.5 hover:border-status-pass/40 hover:shadow-lg md:p-5"
              )}
            >
              <ThumbsUp className="mx-auto mb-2 block size-7 text-status-pass md:size-9" aria-hidden="true" />
              <h6 className="m-0 mb-1 text-[0.9rem] font-bold text-status-pass md:text-base">Success Examples</h6>
              <span className="text-[0.75rem] text-foreground-secondary">See correct implementations</span>
            </Link>
            <Link
              to={failureUrl}
              className={cn(
                panelClass,
                "block border-status-fail/25 bg-status-fail/5 p-4 text-center no-underline hover:-translate-y-0.5 hover:border-status-fail/40 hover:shadow-lg md:p-5"
              )}
            >
              <ThumbsDown className="mx-auto mb-2 block size-7 text-status-fail md:size-9" aria-hidden="true" />
              <h6 className="m-0 mb-1 text-[0.9rem] font-bold text-status-fail md:text-base">Failure Examples</h6>
              <span className="text-[0.75rem] text-foreground-secondary">Common mistakes and fixes</span>
            </Link>
          </div>
        </TabsContent>

        {/* ── Tab 2: MCP Analysis (action grid) ────────────────────────────── */}
        <TabsContent value="mcp" className="py-3 md:py-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:gap-4">
            <ActionCard
              to={`/rule-lab?ruleId=${ruleId}`}
              icon={<Microscope className="size-7" />}
              title="Analyze in Rule Lab"
              description="Deep analysis with Playwright MCP -- accessibility tree, ARIA roles, screen reader narration"
              accentClass="text-primary"
            />
            <ActionCard
              to={`/rule-lab?ruleId=${ruleId}&view=tree`}
              icon={<Network className="size-7" />}
              title="Accessibility Tree"
              description="Inspect computed roles, states, and properties visible to assistive technologies"
              accentClass="text-status-pass"
            />
            <ActionCard
              to={`/rule-lab?ruleId=${ruleId}&view=discover`}
              icon={<Search className="size-7" />}
              title="Discover Patterns"
              description="Find real-world instances of this pattern across curated websites"
              accentClass="text-status-info"
            />
          </div>
        </TabsContent>

        {/* ── Tab 3: References ────────────────────────────────────────────── */}
        <TabsContent value="references" className="py-3 md:py-4">
          <div className="flex flex-col gap-4">
            {/* Legacy: tutorial link */}
            {leg.issueTutorialLink && (
              <div className={cn(panelClass, "p-4 sm:p-5 md:p-6")}>
                <div className="mb-3 flex flex-row items-center gap-3">
                  <LinkIcon className="size-5 text-primary md:size-6" aria-hidden="true" />
                  <h6 className={sectionHeadingClass}>Tutorial Resource</h6>
                </div>
                <a
                  href={leg.issueTutorialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClass({ variant: "outline", size: "sm", className: "font-semibold normal-case no-underline" })}
                >
                  <ExternalLink className="size-4" aria-hidden="true" />
                  View Tutorial
                </a>
              </div>
            )}

            {/* Legacy: Release JSON accordion */}
            <Accordion
              type="single"
              collapsible
              value={jsonExpanded ? "release-json" : ""}
              onValueChange={(v) => setJsonExpanded(v === "release-json")}
              className={cn(panelClass, "overflow-hidden")}
            >
              <AccordionItem value="release-json" className="border-0 bg-transparent">
                <AccordionTrigger className="min-h-12 cursor-pointer px-4">
                  <p className="m-0 text-[0.9rem] font-semibold">Rule Release JSON</p>
                </AccordionTrigger>
                <AccordionContent forceMount className="border-0 px-4 pb-4 data-[state=closed]:hidden">
                  <div className="relative">
                    <Tooltip>
                      <TooltipTrigger
                        onClick={() => handleCopy(releaseJson)}
                        aria-label={copied ? "Copied!" : "Copy JSON"}
                        className={copyButtonClass}
                      >
                        <ClipboardPaste className="size-4" aria-hidden="true" />
                      </TooltipTrigger>
                      <TooltipContent>{copied ? "Copied!" : "Copy JSON"}</TooltipContent>
                    </Tooltip>
                    <div data-theme="dark" className={cn(codePanelClass, "max-h-none border border-solid border-border")}>
                      <pre style={{ margin: 0, fontSize: "0.8rem", lineHeight: 1.5 }}>
                        <code className="language-json">{releaseJson}</code>
                      </pre>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
