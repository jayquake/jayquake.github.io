import { useState } from 'react';
import { AlertTriangle, CheckCircle2, ChevronDown } from 'lucide-react';
import type {
  AuditIssue,
  ClientAnalysisResult,
  ContrastResult,
  TouchTargetResult,
} from '../../utils/clientAccessibilityTree';
import { cn } from '../../lib/utils';
import { IMPACTS, severityOf } from '../../theme/severity';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Chip } from '../ui/chip';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface AuditResultsPanelProps {
  audit: ClientAnalysisResult['audit'];
  compact?: boolean;
  onFlagFalsePositive?: (issue: AuditIssue, flagged: boolean) => void;
  falsePositives?: Set<string>;
}

/** Severity pill: token colours from severityOf(). */
const severityPillClass = 'inline-flex h-5 shrink-0 items-center rounded-full border border-solid px-2 text-[0.75rem] font-bold';

/** Section heading, as MUI Typography variant="subtitle2" rendered (an <h6>). */
const subtitleClass = 'm-0 mb-2 flex items-center gap-1 text-sm font-semibold text-foreground';

function issueKey(issue: AuditIssue): string {
  return `${issue.rule}:${issue.element}:${issue.message}`;
}

function IssueRow({
  issue,
  isFP,
  onToggleFP,
}: {
  issue: AuditIssue;
  isFP?: boolean;
  onToggleFP?: (issue: AuditIssue, flagged: boolean) => void;
}) {
  const sev = severityOf(issue.severity);
  return (
    <div
      className={cn(
        'flex items-start gap-2 border-0 border-b border-solid border-border px-2 py-1.5 last:border-b-0',
        isFP && 'line-through opacity-50'
      )}
    >
      <span className={cn(severityPillClass, 'mt-0.5', sev.badgeClassName)}>{sev.label}</span>
      <div className="min-w-0 flex-1">
        <p className="m-0 text-[0.8rem] font-medium text-foreground">{issue.message}</p>
        <span className="break-all font-mono text-[0.75rem] text-foreground-secondary">{issue.element}</span>
        {issue.impact && (
          <span className="mt-0.5 block text-[0.75rem] text-foreground-secondary">{issue.impact}</span>
        )}
      </div>
      {onToggleFP && (
        <Tooltip>
          <TooltipTrigger
            onClick={() => onToggleFP(issue, !isFP)}
            className={cn(
              'inline-flex h-5 shrink-0 cursor-pointer items-center rounded-full border border-solid px-2 font-mono text-[0.75rem]',
              isFP ? 'border-status-warn bg-status-warn text-primary-foreground' : 'border-border-strong text-foreground-secondary'
            )}
          >
            FP
          </TooltipTrigger>
          <TooltipContent>{isFP ? 'Unmark as false positive' : 'Flag as false positive'}</TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}

export function AuditIssuesList({
  issues,
  compact,
  onFlagFalsePositive,
  falsePositives,
}: {
  issues: AuditIssue[];
  compact?: boolean;
  onFlagFalsePositive?: (issue: AuditIssue, flagged: boolean) => void;
  falsePositives?: Set<string>;
}) {
  if (!issues.length) {
    return (
      <div className="px-3 py-2">
        <p className="m-0 flex items-center gap-1 text-sm text-foreground-secondary">
          <CheckCircle2 className="size-4 text-status-pass" aria-hidden="true" />
          No accessibility issues found
        </p>
      </div>
    );
  }

  const grouped: Record<string, AuditIssue[]> = {};
  for (const issue of issues) {
    if (!grouped[issue.severity]) grouped[issue.severity] = [];
    grouped[issue.severity].push(issue);
  }

  if (compact) {
    return (
      <div>
        {issues.slice(0, 5).map((issue, i) => (
          <IssueRow
            key={i}
            issue={issue}
            isFP={falsePositives?.has(issueKey(issue))}
            onToggleFP={onFlagFalsePositive}
          />
        ))}
        {issues.length > 5 && (
          <span className="px-2 py-1 text-[0.75rem] text-foreground-secondary">+{issues.length - 5} more issues</span>
        )}
      </div>
    );
  }

  const present = IMPACTS.filter((severity) => grouped[severity]?.length);

  return (
    <Accordion
      type="multiple"
      defaultValue={present.filter((severity) => severity === 'critical' || severity === 'serious')}
    >
      {present.map((severity) => {
        const group = grouped[severity];
        const sev = severityOf(severity);
        return (
          <AccordionItem key={severity} value={severity} className="border-solid">
            <AccordionTrigger className="min-h-9 cursor-pointer border-0 bg-transparent py-1">
              <span className={cn(severityPillClass, 'h-[22px]', sev.badgeClassName)}>
                {`${group.length} ${sev.label}`}
              </span>
            </AccordionTrigger>
            <AccordionContent className="border-0 border-t border-solid p-0">
              {group.map((issue, i) => (
                <IssueRow
                  key={i}
                  issue={issue}
                  isFP={falsePositives?.has(issueKey(issue))}
                  onToggleFP={onFlagFalsePositive}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

function ContrastTable({ results }: { results: ContrastResult[] }) {
  if (!results.length) return null;

  const failures = results.filter(r => !r.passes);
  const passes = results.filter(r => r.passes);

  return (
    <div>
      <h6 className={subtitleClass}>
        Color Contrast
        <Chip tone="pass" className="h-5 rounded-full">{`${passes.length} pass`}</Chip>
        {failures.length > 0 && <Chip tone="fail" className="h-5 rounded-full">{`${failures.length} fail`}</Chip>}
      </h6>
      {failures.length > 0 && (
        <div className="max-h-[200px] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="py-1">Element</TableHead>
                <TableHead className="py-1">Colors</TableHead>
                <TableHead className="py-1">Ratio</TableHead>
                <TableHead className="py-1">Required</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {failures.map((r, i) => (
                <TableRow key={i} className="border-0 border-b border-solid">
                  <TableCell className="max-w-[150px] overflow-hidden text-ellipsis py-1 font-mono text-[0.75rem]">
                    {r.element}
                  </TableCell>
                  <TableCell className="py-1">
                    <div className="flex items-center gap-1">
                      {/* Swatches show the audited colours themselves, so they stay inline. */}
                      <span
                        className="inline-block size-3.5 rounded-full border border-solid border-border-strong"
                        style={{ backgroundColor: r.foreground }}
                      />
                      <span
                        className="inline-block size-3.5 rounded-full border border-solid border-border-strong"
                        style={{ backgroundColor: r.background }}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="py-1 text-[0.75rem] font-semibold text-status-fail">{r.ratio}:1</TableCell>
                  <TableCell className="py-1 text-[0.75rem]">
                    {r.requiredRatio}:1 ({r.isLargeText ? 'large' : 'normal'})
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

function TouchTargetsGrid({ targets }: { targets: TouchTargetResult[] }) {
  const failures = targets.filter(t => !t.meetsWCAG);
  if (!failures.length) return null;

  return (
    <div>
      <h6 className={subtitleClass}>
        <AlertTriangle className="size-4 text-status-warn" aria-hidden="true" />
        Small Touch Targets ({failures.length})
      </h6>
      <div className="flex flex-wrap gap-1">
        {failures.map((t, i) => (
          <Tooltip key={i}>
            <TooltipTrigger asChild>
              <span
                className={cn(
                  'inline-flex h-[22px] items-center rounded-full border border-solid px-2 font-mono text-[0.75rem]',
                  t.meetsWCAG
                    ? 'border-status-pass/60 text-status-pass'
                    : 'border-status-warn/60 text-status-warn'
                )}
              >
                {`${t.role} ${t.width}x${t.height}`}
              </span>
            </TooltipTrigger>
            <TooltipContent>{`${t.element} (${t.width}x${t.height}px)`}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}

function HeadingOutline({ headings }: { headings: Array<{ level: number; text: string }> }) {
  if (!headings.length) return null;

  return (
    <div>
      <h6 className={cn(subtitleClass, 'mb-1')}>Heading Outline</h6>
      <div className="font-mono text-[0.75rem]">
        {headings.map((h, i) => {
          const prevLevel = i > 0 ? headings[i - 1].level : 0;
          const skipped = h.level > prevLevel + 1 && prevLevel > 0;
          return (
            <div
              key={i}
              className={cn('py-0.5', skipped ? 'text-status-warn' : 'text-foreground')}
              style={{ paddingLeft: `${(h.level - 1) * 16}px` }}
            >
              {skipped && <AlertTriangle className="mr-1 inline size-3 align-middle" aria-hidden="true" />}
              <span className="text-[0.75rem] font-semibold text-primary">H{h.level}</span>
              {' '}
              {h.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FocusOrderList({ order }: { order: Array<{ element: string; tabIndex: number; role: string; name: string }> }) {
  if (!order.length) return null;

  return (
    <div>
      <h6 className={cn(subtitleClass, 'mb-1')}>Focus Order ({order.length} focusable)</h6>
      <div className="max-h-[150px] overflow-auto font-mono text-[0.75rem]">
        {order.map((item, i) => (
          <div key={i} className="flex gap-2 py-0.5">
            <span className="min-w-5 text-[0.75rem] font-bold text-primary">{i + 1}.</span>
            <Chip className="h-[18px] rounded-full">{item.role}</Chip>
            {item.name && <span className="text-[0.75rem] text-foreground-secondary">"{item.name}"</span>}
            {item.tabIndex > 0 && (
              <Chip tone="warn" className="h-[18px] rounded-full">{`tabindex=${item.tabIndex}`}</Chip>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function AuditSummaryChips({ summary }: { summary: ClientAnalysisResult['audit']['summary'] }) {
  const total = summary.critical + summary.serious + summary.moderate + summary.minor;
  if (total === 0) {
    return (
      <Chip tone="pass" className="h-[22px] rounded-full" icon={<CheckCircle2 className="size-3.5" aria-hidden="true" />}>
        No issues
      </Chip>
    );
  }

  return (
    <div className="flex flex-wrap gap-1">
      {IMPACTS.map((impact) =>
        summary[impact] > 0 ? (
          <span key={impact} className={cn(severityPillClass, severityOf(impact).badgeClassName)}>
            {`${summary[impact]} ${impact}`}
          </span>
        ) : null
      )}
    </div>
  );
}

export default function AuditResultsPanel({
  audit,
  compact = false,
  onFlagFalsePositive,
  falsePositives,
}: AuditResultsPanelProps) {
  const [expanded, setExpanded] = useState(!compact);

  if (compact) {
    return (
      <div className="mt-2">
        <button
          type="button"
          aria-expanded={expanded}
          className="mb-1 flex cursor-pointer items-center gap-2 p-0 text-left"
          onClick={() => setExpanded(!expanded)}
        >
          <AuditSummaryChips summary={audit.summary} />
          <ChevronDown
            className={cn('size-[18px] text-foreground-secondary transition-transform duration-200', expanded && 'rotate-180')}
            aria-hidden="true"
          />
        </button>
        {expanded && (
          <div className="overflow-hidden rounded border border-solid border-border">
            <AuditIssuesList
              issues={audit.issues}
              compact
              onFlagFalsePositive={onFlagFalsePositive}
              falsePositives={falsePositives}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h6 className={subtitleClass}>Accessibility Issues</h6>
        <AuditIssuesList
          issues={audit.issues}
          onFlagFalsePositive={onFlagFalsePositive}
          falsePositives={falsePositives}
        />
      </div>

      <ContrastTable results={audit.contrastResults} />
      <TouchTargetsGrid targets={audit.touchTargets} />
      <HeadingOutline headings={audit.headingOutline} />
      <FocusOrderList order={audit.focusOrder} />
    </div>
  );
}

export { issueKey };
