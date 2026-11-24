import {
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  FileText,
  Filter,
  FlaskConical,
  Globe,
  OctagonAlert,
  ShieldCheck,
  TriangleAlert,
  XCircle,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { api } from '../../../api/client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../../components/ui/accordion';
import { Alert, AlertTitle } from '../../../components/ui/alert';
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import { Chip, type ChipTone } from '../../../components/ui/chip';
import { Progress } from '../../../components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import legacyEngineMapping from '../../../data/legacy-engine-mapping';
import { cn } from '../../../lib/utils';
import { type Impact, severityOf } from '../../../theme/severity';

const getBasename = (p: string) => p.replace(/^.*[/\\]/, '');

/** SDK severities map onto the shared impact scale so colours come from one place. */
const SDK_SEVERITY_IMPACT: Record<string, Impact> = {
  extreme: 'critical',
  high: 'serious',
  medium: 'moderate',
  low: 'minor',
};

/** Tailwind needs literal class names, so the alpha / side variants are listed per impact. */
const IMPACT_CLASSES: Record<Impact, { bar: string; border: string; borderLeft: string }> = {
  critical: { bar: 'bg-severity-critical', border: 'border-severity-critical/25', borderLeft: 'border-l-severity-critical' },
  serious: { bar: 'bg-severity-serious', border: 'border-severity-serious/25', borderLeft: 'border-l-severity-serious' },
  moderate: { bar: 'bg-severity-moderate', border: 'border-severity-moderate/25', borderLeft: 'border-l-severity-moderate' },
  minor: { bar: 'bg-severity-minor', border: 'border-severity-minor/25', borderLeft: 'border-l-severity-minor' },
};

function sdkSeverity(severity: string) {
  const impact: Impact = SDK_SEVERITY_IMPACT[severity] ?? 'minor';
  return { ...severityOf(impact), ...IMPACT_CLASSES[impact], known: severity in SDK_SEVERITY_IMPACT };
}

const SEVERITY_ORDER: Record<string, number> = { extreme: 0, high: 1, medium: 2, low: 3 };

const SEVERITY_ICONS: Record<string, React.ReactElement> = {
  extreme: <XCircle aria-hidden="true" className="size-4" />,
  high: <OctagonAlert aria-hidden="true" className="size-4" />,
  medium: <TriangleAlert aria-hidden="true" className="size-4" />,
  low: <CheckCircle2 aria-hidden="true" className="size-4" />,
};

const SDK_TONES: Record<string, ChipTone> = {
  node: 'info',
  python: 'pass',
  java: 'warn',
};

const panelClass = 'border border-border bg-shell-panel';
const wcagLinkClass = 'text-xs text-foreground-accent underline-offset-2 hover:underline';
const chipLinkClass =
  'rounded-full no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary';

type SeverityFilter = 'all' | 'extreme' | 'high' | 'low' | 'medium';

type SdkAuditReport = {
  environment: string;
  extremeCount: number;
  highCount: number;
  lowCount: number;
  mediumCount: number;
  rawAuditPaths?: string[];
  sdkType: string;
  summaryData: {
    config?: {
      issuesFoundThreshold?: Record<string, number>;
      localCheck?: boolean;
    };
    pages?: Record<string, {
      numberOfIssuesFound?: Record<string, number>;
      ruleViolations?: Record<string, {
        WCAGLink?: string;
        description?: string;
        name?: string;
        numberOfOccurrences?: number;
        selectorData?: Array<{ HTML?: string; selector?: string; suggestionLabel?: string }>;
        severity?: string;
      }>;
    }>;
  };
  thresholdPassed: boolean;
  totalIssues: number;
  totalPages: number;
};

interface SdkAuditTabProps {
  report: SdkAuditReport | null;
  runId: string | undefined;
}

type AggregatedRule = {
  WCAGLink?: string;
  description?: string;
  engineRules: Array<{ id: string; label: string; path: string }>;
  name: string;
  ruleId: string;
  severity: string;
  totalOccurrences: number;
};

type SortField = 'name' | 'occurrences' | 'severity';
type SortDir = 'asc' | 'desc';

function SeverityChip({ severity }: { severity: string }) {
  const sev = sdkSeverity(severity);
  return (
    <span
      className={cn(
        'inline-flex h-5 items-center rounded-full border px-2 text-xs font-bold capitalize',
        sev.known ? sev.badgeClassName : 'border-border-strong bg-muted/30 text-foreground-muted'
      )}
    >
      {severity}
    </span>
  );
}

function EngineRuleChips({ ruleId }: { ruleId: string }) {
  const mapping = (legacyEngineMapping as Record<string, Array<{ id: string; label: string; path: string }>>);
  const engineRules = mapping[ruleId];
  if (!engineRules?.length) return <span className="text-xs text-foreground-muted">—</span>;

  return (
    <div className="flex flex-row flex-wrap gap-1">
      {engineRules.map(rule => (
        <Link className={chipLinkClass} key={rule.id} onClick={(e) => e.stopPropagation()} to={rule.path}>
          <Chip
            className="h-5 hover:border-primary hover:text-foreground"
            icon={<FlaskConical aria-hidden="true" className="size-3.5" />}
          >
            {rule.id}
          </Chip>
        </Link>
      ))}
    </div>
  );
}

function SortHeader({
  active,
  align,
  dir,
  label,
  onSort,
}: {
  active: boolean;
  align?: 'center';
  dir: SortDir;
  label: string;
  onSort: () => void;
}) {
  const Arrow = dir === 'asc' ? ArrowUp : ArrowDown;
  return (
    <TableHead
      aria-sort={active ? (dir === 'asc' ? 'ascending' : 'descending') : undefined}
      className={cn('bg-shell-panel', align === 'center' && 'text-center')}
    >
      <button
        className="inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0 font-[inherit] uppercase tracking-[inherit] text-inherit hover:text-foreground"
        onClick={onSort}
        type="button"
      >
        {label}
        <Arrow aria-hidden="true" className={cn('size-3.5', active ? 'opacity-100' : 'opacity-0')} />
      </button>
    </TableHead>
  );
}

export function SdkAuditTab({ report, runId }: SdkAuditTabProps) {
  const [expandedPage, setExpandedPage] = useState<string | false>(false);
  const [rawFileContent, setRawFileContent] = useState<{ filename: string; lines: any[] } | null>(null);
  const [rawFileLoading, setRawFileLoading] = useState<string | null>(null);
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>('all');
  const [sortField, setSortField] = useState<SortField>('severity');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir(field === 'occurrences' ? 'desc' : 'asc');
    }
  };

  const pages = useMemo(() => report?.summaryData?.pages ?? {}, [report]);
  const pageEntries = useMemo(() => Object.entries(pages), [pages]);

  const aggregatedRules = useMemo((): AggregatedRule[] => {
    const ruleMap = new Map<string, AggregatedRule>();
    const mapping = legacyEngineMapping as Record<string, Array<{ id: string; label: string; path: string }>>;

    for (const pageData of Object.values(pages)) {
      const violations = pageData.ruleViolations || {};
      for (const [ruleId, rule] of Object.entries(violations)) {
        const existing = ruleMap.get(ruleId);
        if (existing) {
          existing.totalOccurrences += rule.numberOfOccurrences || 0;
        } else {
          ruleMap.set(ruleId, {
            WCAGLink: rule.WCAGLink,
            description: rule.description,
            engineRules: mapping[ruleId] || [],
            name: rule.name || ruleId,
            ruleId,
            severity: rule.severity || 'medium',
            totalOccurrences: rule.numberOfOccurrences || 0,
          });
        }
      }
    }

    return Array.from(ruleMap.values());
  }, [pages]);

  const filteredRules = useMemo(() => {
    let rules = aggregatedRules;
    if (severityFilter !== 'all') {
      rules = rules.filter(r => r.severity === severityFilter);
    }

    return [...rules].sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1;
      if (sortField === 'severity') {
        const diff = (SEVERITY_ORDER[a.severity] ?? 9) - (SEVERITY_ORDER[b.severity] ?? 9);
        return diff !== 0 ? diff * dir : b.totalOccurrences - a.totalOccurrences;
      }
      if (sortField === 'occurrences') {
        return (a.totalOccurrences - b.totalOccurrences) * dir;
      }
      return a.name.localeCompare(b.name) * dir;
    });
  }, [aggregatedRules, severityFilter, sortField, sortDir]);

  const filteredPageEntries = useMemo(() => {
    if (severityFilter === 'all') return pageEntries;
    return pageEntries.filter(([, pageData]) => {
      const violations = pageData.ruleViolations || {};
      return Object.values(violations).some(r => r.severity === severityFilter);
    });
  }, [pageEntries, severityFilter]);

  const filterCounts = useMemo(() => ({
    all: aggregatedRules.length,
    extreme: aggregatedRules.filter(r => r.severity === 'extreme').length,
    high: aggregatedRules.filter(r => r.severity === 'high').length,
    medium: aggregatedRules.filter(r => r.severity === 'medium').length,
    low: aggregatedRules.filter(r => r.severity === 'low').length,
  }), [aggregatedRules]);

  if (!report) {
    return (
      <div className={cn(panelClass, 'p-12 text-center')}>
        <ShieldCheck aria-hidden="true" className="mx-auto mb-4 size-12 text-foreground-muted" />
        <h6 className="m-0 mb-1 text-lg font-medium text-foreground">
          No Audit Report Available
        </h6>
        <p className="m-0 text-sm text-foreground-secondary">
          The SDK audit report has not been generated for this test run.
          Run tests with the AccessFlow SDK to generate audit data.
        </p>
      </div>
    );
  }

  const rawPaths = report.rawAuditPaths || [];
  const rawFilenames = rawPaths.map(getBasename);
  const config = report.summaryData?.config;
  const thresholds = config?.issuesFoundThreshold;

  const severityCounts: Record<string, number> = {
    extreme: report.extremeCount,
    high: report.highCount,
    medium: report.mediumCount,
    low: report.lowCount,
  };

  const handleViewRawFile = async (filename: string) => {
    if (!runId) return;
    setRawFileLoading(filename);
    setRawFileContent(null);
    try {
      const data = await api.runs.getSdkAuditRawFile(runId, filename);
      setRawFileContent({ filename: data.filename, lines: data.lines });
    } catch {
      setRawFileContent({ filename, lines: [] });
    } finally {
      setRawFileLoading(null);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className={cn(panelClass, 'p-4')}>
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-row flex-wrap items-center gap-3">
            <Chip className="font-bold" tone={SDK_TONES[report.sdkType] || 'default'}>
              {report.sdkType.toUpperCase()}
            </Chip>
            <div className="flex flex-row items-center gap-1">
              <Globe aria-hidden="true" className="size-4 text-foreground-secondary" />
              <p className="m-0 text-sm text-foreground-secondary">{report.environment}</p>
            </div>
            {config && typeof config.localCheck === 'boolean' && (
              <Chip
                className="font-semibold"
                icon={config.localCheck ? <CheckCircle2 aria-hidden="true" className="size-3.5" /> : undefined}
                tone={config.localCheck ? 'pass' : 'default'}
              >
                {`Local check: ${config.localCheck}`}
              </Chip>
            )}
            <Chip
              icon={
                report.thresholdPassed ? (
                  <CheckCircle2 aria-hidden="true" className="size-3.5" />
                ) : (
                  <XCircle aria-hidden="true" className="size-3.5" />
                )
              }
              tone={report.thresholdPassed ? 'pass' : 'fail'}
            >
              {report.thresholdPassed ? 'Threshold Passed' : 'Threshold Failed'}
            </Chip>
          </div>

          <p className="m-0 text-sm text-foreground-secondary">
            {report.totalPages} page{report.totalPages !== 1 ? 's' : ''} audited
          </p>
        </div>
      </div>

      {/* Threshold Result Banner */}
      {(() => {
        const exceededSeverities = (['extreme', 'high', 'medium', 'low'] as const).filter(sev => {
          const t = thresholds?.[sev];
          return t != null && severityCounts[sev] > t;
        });

        if (!report.thresholdPassed && exceededSeverities.length > 0) {
          return (
            <Alert className="border-l-4 border-l-status-fail" variant="error">
              <AlertTitle className="m-0 font-bold">SDK Audit Failed — Threshold Exceeded</AlertTitle>
              <p className="m-0 mb-3 text-sm">
                The audit did not pass because {exceededSeverities.length === 1 ? '1 severity level exceeds its' : `${exceededSeverities.length} severity levels exceed their`} configured threshold{exceededSeverities.length !== 1 ? 's' : ''}:
              </p>
              <div className="flex flex-col gap-1.5">
                {exceededSeverities.map(sev => {
                  const count = severityCounts[sev];
                  const limit = thresholds![sev]!;
                  const overage = count - limit;
                  const sevStyle = sdkSeverity(sev);
                  return (
                    <div className="flex flex-row items-center gap-2" key={sev}>
                      <span className={cn('flex', sevStyle.className)}>{SEVERITY_ICONS[sev]}</span>
                      <p className={cn('m-0 w-[65px] text-sm font-semibold capitalize', sevStyle.className)}>
                        {sev}
                      </p>
                      <p className="m-0 text-sm">
                        <strong>{count.toLocaleString()}</strong> found — exceeds threshold of <strong>{limit.toLocaleString()}</strong> by {overage.toLocaleString()}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Alert>
          );
        }

        if (report.thresholdPassed && thresholds) {
          return (
            <Alert variant="success">
              <AlertTitle className="m-0 font-bold">SDK Audit Passed</AlertTitle>
              <p className="m-0 text-sm">
                All severity levels are within the configured thresholds.
              </p>
            </Alert>
          );
        }

        if (!report.thresholdPassed && !thresholds) {
          return (
            <Alert variant="error">
              <AlertTitle className="m-0 font-bold">SDK Audit Failed</AlertTitle>
              <p className="m-0 text-sm">
                The audit threshold was not met. {report.extremeCount > 0 || report.highCount > 0
                  ? `Found ${report.extremeCount.toLocaleString()} extreme and ${report.highCount.toLocaleString()} high severity issues.`
                  : `Found ${report.totalIssues.toLocaleString()} total issues.`}
              </p>
            </Alert>
          );
        }

        return null;
      })()}

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {(['extreme', 'high', 'medium', 'low'] as const).map(severity => {
          const count = severityCounts[severity];
          const sevStyle = sdkSeverity(severity);
          const threshold = thresholds?.[severity];
          const exceeded = threshold != null && count > threshold;
          return (
            <Card
              className={cn(
                'relative gap-0 overflow-hidden p-4',
                exceeded ? 'border-status-fail bg-status-fail/5' : sevStyle.border
              )}
              key={severity}
            >
              <h4 className={cn('m-0 text-3xl font-bold', sevStyle.className)}>
                {count.toLocaleString()}
              </h4>
              <div className="mt-1 flex items-center gap-1">
                <span className={cn('flex', sevStyle.className)}>{SEVERITY_ICONS[severity]}</span>
                <p className="m-0 text-sm capitalize text-foreground-secondary">{severity}</p>
              </div>
              {threshold != null && (
                <div className="mt-1 flex flex-row items-center gap-1">
                  {exceeded ? (
                    <XCircle aria-hidden="true" className="size-3.5 text-status-fail" />
                  ) : (
                    <CheckCircle2 aria-hidden="true" className="size-3.5 text-status-pass" />
                  )}
                  <span className={cn('text-xs font-semibold', exceeded ? 'text-status-fail' : 'text-status-pass')}>
                    {exceeded ? `Exceeded by ${(count - threshold).toLocaleString()}` : 'Within threshold'}
                  </span>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Threshold Gauges */}
      {thresholds && (
        <div className={cn(panelClass, 'p-4')}>
          <div className="mb-3 flex flex-row items-center justify-between">
            <h6 className="m-0 text-sm font-semibold text-foreground">Threshold Comparison</h6>
            {typeof config?.localCheck === 'boolean' && (
              <Chip
                className="font-semibold"
                icon={config.localCheck ? <CheckCircle2 aria-hidden="true" className="size-3.5" /> : undefined}
                tone={config.localCheck ? 'pass' : 'default'}
              >
                {`Local check: ${config.localCheck}`}
              </Chip>
            )}
          </div>
          <div className="flex flex-col gap-3">
            {(['extreme', 'high', 'medium', 'low'] as const).map(severity => {
              const count = severityCounts[severity];
              const limit = thresholds[severity] ?? 0;
              const ratio = limit > 0 ? Math.min((count / limit) * 100, 100) : (count > 0 ? 100 : 0);
              const exceeded = count > limit;
              const sevStyle = sdkSeverity(severity);

              return (
                <div className="flex flex-row items-center gap-4" key={severity}>
                  <p className={cn('m-0 w-[70px] text-sm font-semibold capitalize', sevStyle.className)}>
                    {severity}
                  </p>
                  <p className="m-0 w-[50px] text-right text-sm font-bold text-foreground">
                    {count.toLocaleString()}
                  </p>
                  <div className="flex-1">
                    <Progress
                      aria-label={`${severity} issues against threshold`}
                      className={cn(
                        'rounded bg-hover/5',
                        exceeded
                          ? '[&>[data-slot=progress-indicator]]:bg-status-fail'
                          : '[&>[data-slot=progress-indicator]]:bg-status-pass'
                      )}
                      value={ratio}
                    />
                  </div>
                  <span className="w-[90px] text-right text-xs text-foreground-secondary">
                    / {limit.toLocaleString()}
                  </span>
                  {exceeded ? (
                    <XCircle aria-hidden="true" className="size-4 text-status-fail" />
                  ) : (
                    <CheckCircle2 aria-hidden="true" className="size-4 text-status-pass" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Severity Filter Bar */}
      <div className={cn(panelClass, 'p-3')}>
        <div className="flex flex-row flex-wrap items-center gap-2">
          <div className="mr-1 flex flex-row items-center gap-1">
            <Filter aria-hidden="true" className="size-4 text-foreground-secondary" />
            <span className="text-xs font-semibold text-foreground-secondary">Severity</span>
          </div>
          {([
            { value: 'all' as const, label: 'All', count: filterCounts.all },
            { value: 'extreme' as const, label: 'Extreme', count: filterCounts.extreme },
            { value: 'high' as const, label: 'High', count: filterCounts.high },
            { value: 'medium' as const, label: 'Medium', count: filterCounts.medium },
            { value: 'low' as const, label: 'Low', count: filterCounts.low },
          ]).map(({ value, label, count }) => {
            const active = severityFilter === value;
            return (
              <Chip
                aria-pressed={active}
                className={cn(
                  active && value !== 'all' && 'border-transparent text-primary-foreground',
                  active && value === 'all' && 'bg-muted text-foreground'
                )}
                key={value}
                onClick={() => setSeverityFilter(value)}
                style={active && value !== 'all' ? { backgroundColor: sdkSeverity(value).color } : undefined}
              >
                {`${label} (${count})`}
              </Chip>
            );
          })}
        </div>
      </div>

      {/* Cross-Page Rule Summary Table */}
      <div className={panelClass}>
        <div className="px-4 py-3">
          <h6 className="m-0 text-sm font-semibold text-foreground">All Rules ({filteredRules.length})</h6>
        </div>
        <div className="max-h-[480px] overflow-auto">
          <Table>
            <TableHeader className="bg-shell-panel">
              <TableRow>
                <SortHeader
                  active={sortField === 'name'}
                  dir={sortField === 'name' ? sortDir : 'asc'}
                  label="Rule"
                  onSort={() => handleSort('name')}
                />
                <SortHeader
                  active={sortField === 'severity'}
                  dir={sortField === 'severity' ? sortDir : 'asc'}
                  label="Severity"
                  onSort={() => handleSort('severity')}
                />
                <SortHeader
                  active={sortField === 'occurrences'}
                  align="center"
                  dir={sortField === 'occurrences' ? sortDir : 'desc'}
                  label="Occurrences"
                  onSort={() => handleSort('occurrences')}
                />
                <TableHead className="bg-shell-panel">Engine Rules</TableHead>
                <TableHead className="bg-shell-panel">WCAG</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRules.map(rule => (
                <TableRow className="hover:bg-hover/5" key={rule.ruleId}>
                  <TableCell>
                    <p className="m-0 text-sm font-semibold text-foreground">{rule.name}</p>
                    {rule.description && (
                      <p className="m-0 mt-0.5 text-xs text-foreground-secondary">{rule.description}</p>
                    )}
                  </TableCell>
                  <TableCell>
                    <SeverityChip severity={rule.severity} />
                  </TableCell>
                  <TableCell className="text-center">
                    <p className="m-0 text-sm font-bold text-foreground">
                      {rule.totalOccurrences.toLocaleString()}
                    </p>
                  </TableCell>
                  <TableCell>
                    <EngineRuleChips ruleId={rule.ruleId} />
                  </TableCell>
                  <TableCell>
                    {rule.WCAGLink && rule.WCAGLink !== '-' ? (
                      <a className={wcagLinkClass} href={rule.WCAGLink} rel="noopener noreferrer" target="_blank">
                        WCAG Link
                      </a>
                    ) : (
                      <span className="text-xs text-foreground-muted">—</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {filteredRules.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5}>
                    <span className="text-xs text-foreground-secondary">
                      No rules match the current filter
                    </span>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Raw audit files */}
      {runId && rawFilenames.length > 0 && (
        <div className={cn(panelClass, 'p-4')}>
          <h6 className="m-0 mb-3 text-sm font-semibold text-foreground">Raw audit files (JSONL)</h6>
          <div className="flex flex-col gap-2">
            {rawFilenames.map((filename) => (
              <div className="flex flex-row items-center gap-2" key={filename}>
                <FileText aria-hidden="true" className="size-5 text-foreground-secondary" />
                <p className="m-0 font-mono text-[0.85rem] text-foreground">{filename}</p>
                <Button
                  className="h-6 rounded-full normal-case tracking-wide"
                  disabled={rawFileLoading === filename}
                  onClick={() => handleViewRawFile(filename)}
                  size="sm"
                  variant="outline"
                >
                  {rawFileLoading === filename ? 'Loading…' : 'View'}
                </Button>
              </div>
            ))}
            {rawFileContent && (
              <div className="mt-2 max-h-[360px] overflow-auto rounded border border-border bg-shell-main p-3">
                <span className="mb-2 block text-xs font-semibold text-foreground">
                  {rawFileContent.filename} ({rawFileContent.lines.length} line
                  {rawFileContent.lines.length !== 1 ? 's' : ''})
                </span>
                <div className="flex flex-col gap-1">
                  {rawFileContent.lines.map((line, idx) => (
                    <pre
                      className="m-0 whitespace-pre-wrap break-all border border-border bg-shell-panel p-2 text-xs text-foreground"
                      key={idx}
                    >
                      {JSON.stringify(line)}
                    </pre>
                  ))}
                  {rawFileContent.lines.length === 0 && (
                    <span className="text-xs text-foreground-secondary">No audit entries in this file</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Per-page accordions */}
      {filteredPageEntries.length === 0 ? (
        <div className={cn(panelClass, 'p-8 text-center')}>
          <p className="m-0 text-foreground-secondary">
            {pageEntries.length === 0
              ? 'No SDK audit data available for this run'
              : 'No pages match the current severity filter'}
          </p>
        </div>
      ) : (
        <>
          <h6 className="m-0 mt-2 text-sm font-semibold text-foreground">Pages ({filteredPageEntries.length})</h6>
          <Accordion
            className="flex flex-col gap-5"
            collapsible
            onValueChange={(value) => setExpandedPage(value || false)}
            type="single"
            value={expandedPage || ''}
          >
            {filteredPageEntries.map(([pageUrl, pageData]) => {
              const counts = pageData.numberOfIssuesFound || {};
              const violations = pageData.ruleViolations || {};
              const violationEntries = severityFilter === 'all'
                ? Object.entries(violations)
                : Object.entries(violations).filter(([, r]) => r.severity === severityFilter);

              const totalForPage = (counts.extreme || 0) + (counts.high || 0) + (counts.medium || 0) + (counts.low || 0);
              const dominantSeverity =
                (counts.extreme || 0) > 0 ? 'extreme'
                : (counts.high || 0) > 0 ? 'high'
                : (counts.medium || 0) > 0 ? 'medium'
                : 'low';

              return (
                <AccordionItem
                  className={cn('border-l-4', sdkSeverity(dominantSeverity).borderLeft)}
                  key={pageUrl}
                  value={pageUrl}
                >
                  <AccordionTrigger className="cursor-pointer border-0 bg-transparent px-4 py-3 font-[inherit]">
                    <div className="flex w-full flex-row items-center justify-between gap-2 pr-2">
                      <p className="m-0 flex-1 truncate font-mono text-[0.85rem] font-semibold text-foreground">
                        {pageUrl}
                      </p>
                      <div className="flex shrink-0 flex-row items-center gap-1">
                        {/* Mini severity distribution bar */}
                        {totalForPage > 0 && (
                          <div aria-hidden="true" className="flex h-1.5 w-20 overflow-hidden rounded">
                            {(['extreme', 'high', 'medium', 'low'] as const).map(sev => {
                              const c = counts[sev] || 0;
                              if (c === 0) return null;
                              return (
                                <div
                                  className={cn('h-full', sdkSeverity(sev).bar)}
                                  key={sev}
                                  style={{ width: `${(c / totalForPage) * 100}%` }}
                                />
                              );
                            })}
                          </div>
                        )}
                        {counts.extreme ? <SeverityChip severity="extreme" /> : null}
                        {counts.high ? <SeverityChip severity="high" /> : null}
                        {counts.medium ? <SeverityChip severity="medium" /> : null}
                        {counts.low ? <SeverityChip severity="low" /> : null}
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader className="static bg-shell-panel">
                          <TableRow>
                            <TableHead>Rule</TableHead>
                            <TableHead>Severity</TableHead>
                            <TableHead className="text-center">Occurrences</TableHead>
                            <TableHead>Engine Rules</TableHead>
                            <TableHead>WCAG</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {violationEntries.map(([ruleId, rule]) => (
                            <RuleRow key={ruleId} rule={rule} ruleId={ruleId} />
                          ))}
                          {violationEntries.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={5}>
                                <span className="text-xs text-foreground-secondary">
                                  No rule violations found on this page
                                </span>
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </>
      )}
    </div>
  );
}

function RuleRow({ rule, ruleId }: { rule: any; ruleId: string }) {
  const [expanded, setExpanded] = useState(false);
  const severity = rule.severity || 'medium';
  const selectorData = rule.selectorData || [];

  return (
    <>
      <TableRow
        className={cn('hover:bg-hover/5', selectorData.length > 0 ? 'cursor-pointer' : 'cursor-default')}
        onClick={() => selectorData.length > 0 && setExpanded(!expanded)}
      >
        <TableCell>
          <div>
            <p className="m-0 text-sm font-semibold text-foreground">{rule.name || 'Unknown Rule'}</p>
            {rule.description && (
              <p className="m-0 mt-0.5 text-xs text-foreground-secondary">{rule.description}</p>
            )}
          </div>
        </TableCell>
        <TableCell>
          <SeverityChip severity={severity} />
        </TableCell>
        <TableCell className="text-center">
          <p className="m-0 text-sm font-bold text-foreground">
            {(rule.numberOfOccurrences ?? 0).toLocaleString()}
          </p>
        </TableCell>
        <TableCell>
          <EngineRuleChips ruleId={ruleId} />
        </TableCell>
        <TableCell>
          {rule.WCAGLink && rule.WCAGLink !== '-' ? (
            <a
              className={wcagLinkClass}
              href={rule.WCAGLink}
              onClick={(e) => e.stopPropagation()}
              rel="noopener noreferrer"
              target="_blank"
            >
              WCAG Link
            </a>
          ) : (
            <span className="text-xs text-foreground-muted">—</span>
          )}
        </TableCell>
      </TableRow>

      {expanded && selectorData.length > 0 && (
        <TableRow>
          <TableCell className="bg-hover/5 py-3" colSpan={5}>
            <p className="m-0 mb-2 text-xs font-semibold text-foreground">
              Affected Elements ({selectorData.length})
            </p>
            <div className="flex flex-col gap-2">
              {selectorData.slice(0, 5).map((item: any, idx: number) => (
                <div className={cn(panelClass, 'p-3')} key={idx}>
                  {item.HTML && (
                    <pre className="m-0 overflow-auto whitespace-pre-wrap break-all rounded bg-shell-main p-2 text-xs text-foreground">
                      {item.HTML}
                    </pre>
                  )}
                  {item.suggestionLabel && (
                    <p className="m-0 mt-1 text-xs text-foreground-accent">
                      Suggestion: {item.suggestionLabel}
                    </p>
                  )}
                </div>
              ))}
              {selectorData.length > 5 && (
                <span className="text-xs text-foreground-secondary">
                  …and {selectorData.length - 5} more
                </span>
              )}
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
