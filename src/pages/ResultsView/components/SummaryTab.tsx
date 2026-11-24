import { type Project } from '../../../../shared/types';
import {
  AlertTriangle,
  Bug,
  CheckCircle2,
  FileText,
  Filter,
  FlaskConical,
  XCircle,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { StepList } from '../../../components/standalone/StepList';
import { Alert } from '../../../components/ui/alert';
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import { Chip, type ChipTone } from '../../../components/ui/chip';
import { Progress } from '../../../components/ui/progress';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../../components/ui/tooltip';
import { cn } from '../../../lib/utils';
import { type TestResult, type TestRunData } from '../models/TestRunData';

type StatusFilter = 'all' | 'failed' | 'passed' | 'skipped';

// Keyword → engine rule IDs for quick suggestion
const KEYWORD_RULE_MAP: Record<string, string[]> = {
  'alt': ['alt-misuse', 'image-alt'],
  'aria': ['aria-invalid-mismatch', 'aria-controls-has-reference', 'aria-describedby-has-reference'],
  'label': ['input-missing-label', 'form-field-multiple-labels'],
  'role': ['aria-invalid-role', 'aria-invalid-attr'],
  'button': ['button-name'],
  'link': ['link-name', 'link-in-text-block'],
  'color': ['color-contrast'],
  'contrast': ['color-contrast'],
  'focus': ['focus-trap', 'focus-visible'],
  'heading': ['heading-order', 'empty-heading'],
  'image': ['image-alt', 'alt-misuse'],
  'keyboard': ['focus-trap', 'keyboard'],
  'landmark': ['landmark-one-main'],
  'table': ['td-headers-attr', 'th-has-data-cells'],
  'form': ['input-missing-label', 'select-name'],
  'iframe': ['frame-title'],
  'title': ['document-title', 'frame-title'],
};

function getRelatedRules(testName: string, errorText?: string): string[] {
  const text = `${testName} ${errorText || ''}`.toLowerCase();
  const matched = new Set<string>();
  for (const [kw, ruleIds] of Object.entries(KEYWORD_RULE_MAP)) {
    if (text.includes(kw)) ruleIds.forEach(r => matched.add(r));
  }
  return Array.from(matched).slice(0, 3);
}

type SummaryTabProps = {
  allProjects?: Project[];
  onDebugWithMCP?: (failedTests: TestResult[]) => void;
  rawResults?: any[];
  summary: null | {
    failed: number;
    passed: number;
    skipped: number;
    total: number;
  };
  testRun: null | TestRunData;
};

/** Map a test file path to the project it belongs to using testDirectory prefix matching. */
function getProjectForFile(filePath: string, projects: Project[]): Project | undefined {
  if (!filePath || !projects.length) return undefined;
  const normalised = filePath.replace(/\\/g, '/');
  return projects.find(p => normalised.includes(p.testDirectory.replace(/\\/g, '/')));
}

const panelClass = 'border border-border bg-shell-panel';

/** Project logo with its name as a tooltip (replaces MUI Tooltip + square Avatar). */
function ProjectLogo({ project, size }: { project: Project; size: 16 | 20 }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <img
          alt={project.name}
          className={cn('shrink-0 object-contain', size === 16 ? 'size-4' : 'size-5')}
          src={project.logo}
        />
      </TooltipTrigger>
      <TooltipContent>{project.name}</TooltipContent>
    </Tooltip>
  );
}

export const SummaryTab = ({
  allProjects = [],
  onDebugWithMCP,
  rawResults,
  summary,
  testRun,
}: SummaryTabProps) => {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [projectFilter, setProjectFilter] = useState<string>('all');

  const allResults: any[] = testRun?.results || rawResults || [];
  const hasResults = allResults.length > 0;
  const totalDuration = allResults.reduce((sum: number, r: any) => sum + (r.duration || 0), 0);
  const avgDuration = allResults.length > 0 ? totalDuration / allResults.length : 0;
  const failedTests = allResults.filter((r: any) => r.status === 'failed');
  const passedTests = allResults.filter((r: any) => r.status === 'passed');
  const passRate = summary && summary.total > 0 ? Math.round((summary.passed / summary.total) * 100) : 0;

  const activeProjects = useMemo((): Project[] => {
    if (!allProjects.length) return [];
    const seen = new Set<string>();
    for (const r of allResults) {
      const p = getProjectForFile(r.file, allProjects);
      if (p && !seen.has(p.id)) seen.add(p.id);
    }
    return allProjects.filter(p => seen.has(p.id));
  }, [allResults, allProjects]);

  const showProjectFilter = activeProjects.length > 1;

  const filteredResults = useMemo(() => {
    return allResults.filter((r: any) => {
      const statusOk = statusFilter === 'all' || r.status === statusFilter;
      if (!statusOk) return false;
      if (projectFilter === 'all') return true;
      const p = getProjectForFile(r.file, allProjects);
      return p?.id === projectFilter;
    });
  }, [allResults, statusFilter, projectFilter, allProjects]);

  const counts = useMemo(() => {
    const base = projectFilter === 'all'
      ? allResults
      : allResults.filter((r: any) => {
          const p = getProjectForFile(r.file, allProjects);
          return p?.id === projectFilter;
        });
    return {
      all: base.length,
      failed: base.filter((r: any) => r.status === 'failed').length,
      passed: base.filter((r: any) => r.status === 'passed').length,
      skipped: base.filter((r: any) => r.status === 'skipped').length,
    };
  }, [allResults, projectFilter, allProjects]);

  if (!summary || summary.total === 0) {
    return (
      <div className={cn(panelClass, 'p-12 text-center')}>
        <FileText aria-hidden="true" className="mx-auto mb-4 size-12 text-foreground-muted" />
        <h6 className="m-0 mb-1 text-lg font-medium text-foreground">No Test Results</h6>
        <p className="m-0 text-sm text-foreground-secondary">
          No test results are available for this run.
        </p>
        <div className="mt-6 rounded bg-shell-main p-4 text-left">
          <span className="mb-1 block text-xs font-semibold text-foreground">Tips:</span>
          <ul className="m-0 flex flex-col gap-1 pl-4">
            {[
              'Check if the test execution completed successfully',
              'Verify that tests were selected and executed',
              'Review test execution logs for more details',
            ].map(tip => (
              <li className="text-xs text-foreground-secondary" key={tip}>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  const statCards: {
    borderClass: string;
    icon: React.ReactNode;
    label: string;
    value: number;
    valueClass: string;
  }[] = [
    {
      borderClass: '',
      icon: <FileText aria-hidden="true" className="size-4 text-foreground-muted" />,
      label: 'Total Tests',
      value: summary.total,
      valueClass: 'text-foreground',
    },
    {
      borderClass: 'border-status-pass/50',
      icon: <CheckCircle2 aria-hidden="true" className="size-4 text-status-pass" />,
      label: 'Passed',
      value: summary.passed,
      valueClass: 'text-status-pass',
    },
    {
      borderClass: 'border-status-fail/50',
      icon: <XCircle aria-hidden="true" className="size-4 text-status-fail" />,
      label: 'Failed',
      value: summary.failed,
      valueClass: 'text-status-fail',
    },
    {
      borderClass: 'border-status-warn/50',
      icon: <AlertTriangle aria-hidden="true" className="size-4 text-status-warn" />,
      label: 'Skipped',
      value: summary.skipped,
      valueClass: 'text-status-warn',
    },
  ];

  const passRateTone =
    passRate >= 80
      ? 'bg-status-pass/20 [&>[data-slot=progress-indicator]]:bg-status-pass'
      : passRate >= 50
        ? 'bg-status-warn/20 [&>[data-slot=progress-indicator]]:bg-status-warn'
        : 'bg-status-fail/20 [&>[data-slot=progress-indicator]]:bg-status-fail';

  return (
    <div className="flex flex-col gap-6">
      <h6 className="m-0 text-lg font-medium text-foreground">Test Run Summary</h6>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {statCards.map(card => (
          <Card className={cn('gap-0 p-4', card.borderClass)} key={card.label}>
            <h4 className={cn('m-0 text-3xl font-bold', card.valueClass)}>{card.value}</h4>
            <div className="mt-1 flex items-center gap-1">
              {card.icon}
              <p className="m-0 text-sm text-foreground-secondary">{card.label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Pass Rate & Duration */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className={cn(panelClass, 'p-4')}>
          <div className="flex flex-row items-center justify-between">
            <div>
              <p className="m-0 text-sm font-semibold text-foreground-secondary">Pass Rate</p>
              <h5 className="m-0 text-2xl font-bold text-foreground">{passRate}%</h5>
            </div>
            <div className="w-[120px]">
              <Progress aria-label="Pass rate" className={cn('rounded', passRateTone)} value={passRate} />
            </div>
          </div>
        </div>
        <div className={cn(panelClass, 'p-4')}>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between">
              <p className="m-0 text-sm font-semibold text-foreground-secondary">Total Duration</p>
              <p className="m-0 font-bold text-foreground">
                {totalDuration > 0 ? `${(totalDuration / 1000).toFixed(2)}s` : 'N/A'}
              </p>
            </div>
            {allResults.length > 0 && (
              <div className="flex flex-row justify-between">
                <span className="text-xs text-foreground-secondary">Average per test</span>
                <span className="text-xs text-foreground">
                  {avgDuration > 0 ? `${(avgDuration / 1000).toFixed(2)}s` : 'N/A'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Failed Tests Summary */}
      {failedTests.length > 0 && (
        <div className={cn(panelClass, 'border-l-4 border-l-status-fail p-4')}>
          <div className="mb-4 flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <XCircle aria-hidden="true" className="size-6 text-status-fail" />
              <h6 className="m-0 text-lg font-bold text-status-fail">
                {failedTests.length} Failed Test{failedTests.length !== 1 ? 's' : ''}
              </h6>
            </div>
            {onDebugWithMCP && (
              <Button
                onClick={() => onDebugWithMCP(failedTests as TestResult[])}
                size="sm"
                variant="default"
              >
                <Bug aria-hidden="true" className="size-4" />
                Debug with MCP
              </Button>
            )}
          </div>
          <div className="flex flex-col gap-1">
            {failedTests.slice(0, 5).map((test: any, idx: number) => {
              const project = getProjectForFile(test.file, allProjects);
              return (
                <div className="flex flex-row items-center gap-2" key={idx}>
                  {project?.logo && <ProjectLogo project={project} size={16} />}
                  <p className="m-0 text-sm text-foreground">
                    <strong>{test.name}</strong>
                    {test.file && (
                      <span className="ml-2 text-xs text-foreground-secondary">
                        ({test.file.split('/').pop()})
                      </span>
                    )}
                  </p>
                </div>
              );
            })}
            {failedTests.length > 5 && (
              <span className="text-xs italic text-foreground-secondary">
                … and {failedTests.length - 5} more failed test
                {failedTests.length - 5 !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Test Results List */}
      {hasResults ? (
        <div className="flex flex-col gap-4">
          {/* Filter Bar */}
          <div className={cn(panelClass, 'p-3')}>
            <div className="flex flex-col gap-3">
              {/* Status Filters */}
              <div className="flex flex-row flex-wrap items-center gap-2">
                <div className="mr-1 flex flex-row items-center gap-1">
                  <Filter aria-hidden="true" className="size-4 text-foreground-secondary" />
                  <span className="text-xs font-semibold text-foreground-secondary">Status</span>
                </div>
                {(
                  [
                    { label: 'All', value: 'all', count: counts.all, tone: undefined },
                    { label: 'Passed', value: 'passed', count: counts.passed, tone: 'pass' as const },
                    { label: 'Failed', value: 'failed', count: counts.failed, tone: 'fail' as const },
                    { label: 'Skipped', value: 'skipped', count: counts.skipped, tone: 'warn' as const },
                  ] satisfies { count: number; label: string; tone: ChipTone | undefined; value: StatusFilter }[]
                ).map(({ count, label, tone, value }) => (
                  <Chip
                    aria-pressed={statusFilter === value}
                    key={value}
                    onClick={() => setStatusFilter(value)}
                    tone={statusFilter === value ? (tone ?? 'primary') : 'default'}
                  >
                    {`${label} (${count})`}
                  </Chip>
                ))}
              </div>

              {/* Project Filters — only rendered when multiple projects are present */}
              {showProjectFilter && (
                <div className="flex flex-row flex-wrap items-center gap-2">
                  <div className="mr-1 flex flex-row items-center gap-1">
                    <span className="text-xs font-semibold text-foreground-secondary">Project</span>
                  </div>
                  <Chip
                    aria-pressed={projectFilter === 'all'}
                    onClick={() => setProjectFilter('all')}
                    tone={projectFilter === 'all' ? 'primary' : 'default'}
                  >
                    All projects
                  </Chip>
                  {activeProjects.map(project => {
                    const isActive = projectFilter === project.id;
                    return (
                      <Chip
                        aria-pressed={isActive}
                        icon={
                          <img
                            alt={project.name}
                            className="size-4 shrink-0 rounded-full object-contain"
                            src={project.logo}
                          />
                        }
                        key={project.id}
                        onClick={() => setProjectFilter(project.id)}
                        tone={isActive ? 'primary' : 'default'}
                      >
                        {project.name}
                      </Chip>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <p className="m-0 text-sm text-foreground-secondary">
            Showing {filteredResults.length} of {allResults.length} test
            {allResults.length !== 1 ? 's' : ''} — {passedTests.length} passed,{' '}
            {failedTests.length} failed, {summary.skipped} skipped
          </p>

          {filteredResults.length === 0 ? (
            <div className={cn(panelClass, 'p-8 text-center')}>
              <p className="m-0 text-sm text-foreground-secondary">
                No tests match the current filters.
              </p>
            </div>
          ) : (
            <div className="max-h-[600px] overflow-y-auto">
              <div className="flex flex-col gap-4">
                {filteredResults.map((result: any, index: number) => {
                  const isFailed = result.status === 'failed';
                  const isPassed = result.status === 'passed';
                  const project = getProjectForFile(result.file, allProjects);

                  return (
                    <div
                      className={cn(
                        panelClass,
                        'border-l-4 p-4',
                        isFailed
                          ? 'border-l-status-fail'
                          : isPassed
                            ? 'border-l-status-pass'
                            : 'border-l-status-warn'
                      )}
                      key={index}
                    >
                      <div className="mb-2 flex flex-row items-start justify-between">
                        <div className="flex min-w-0 flex-1 flex-row items-center gap-2">
                          {/* Project logo */}
                          {project?.logo && <ProjectLogo project={project} size={20} />}
                          <Chip className="shrink-0" tone={isPassed ? 'pass' : isFailed ? 'fail' : 'warn'}>
                            {`${isPassed ? '✓' : isFailed ? '✗' : '⊘'} ${result.status}`}
                          </Chip>
                          <p className="m-0 truncate text-sm font-semibold text-foreground">
                            {result.name}
                          </p>
                        </div>
                        {result.duration && (
                          <span className="ml-2 shrink-0 text-xs text-foreground-secondary">
                            ⏱️ {(result.duration / 1000).toFixed(2)}s
                          </span>
                        )}
                      </div>

                      <div className="mb-2 flex flex-row items-center gap-2">
                        <span className="text-xs text-foreground-secondary">
                          <code>{result.file?.split('/').slice(-2).join('/') || ''}</code>
                        </span>
                        {project && (
                          <span className="text-xs text-foreground-secondary">· {project.name}</span>
                        )}
                      </div>

                      {isFailed && result.error && (
                        <Alert className="my-2" variant="error">
                          <span className="block max-h-32 overflow-auto whitespace-pre-wrap font-mono text-xs">
                            {result.error}
                          </span>
                          {result.error.length > 500 && (
                            <span className="mt-1 block text-xs italic text-foreground-secondary">
                              Error truncated. See Test Details tab for full error.
                            </span>
                          )}
                        </Alert>
                      )}

                      {result.steps && result.steps.length > 0 && (
                        <div className="mt-2 border-t border-border pt-2">
                          <span className="mb-1 block text-xs text-foreground-secondary">
                            Test Steps ({result.steps.length})
                          </span>
                          <StepList enableFilter maxSteps={5} steps={result.steps} />
                        </div>
                      )}

                      {isFailed && (
                        <div className="mt-2 flex flex-row items-center justify-between border-t border-border pt-2">
                          <span className="text-xs text-foreground-secondary">
                            💡 Check the <strong>Test Details</strong> tab for screenshots, videos,
                            and traces
                          </span>
                          {onDebugWithMCP && (
                            <Button
                              className="shrink-0"
                              onClick={() => onDebugWithMCP([result as TestResult])}
                              size="sm"
                              variant="outline"
                            >
                              <Bug aria-hidden="true" className="size-4" />
                              Debug
                            </Button>
                          )}
                        </div>
                      )}

                      {/* Related engine rules for failed tests */}
                      {isFailed && (() => {
                        const related = getRelatedRules(result.name, result.error);
                        if (related.length === 0) return null;
                        return (
                          <div className="mt-2 border-t border-border pt-2">
                            <span className="mb-1 block text-xs text-foreground-secondary">
                              Related engine rules:
                            </span>
                            <div className="flex flex-row flex-wrap gap-1">
                              {related.map(ruleId => (
                                <Link
                                  className="mb-1 rounded-full no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                                  key={ruleId}
                                  to={`/engine/${ruleId}`}
                                >
                                  <Chip
                                    className="hover:border-primary hover:text-foreground"
                                    icon={<FlaskConical aria-hidden="true" className="size-3.5" />}
                                  >
                                    {ruleId}
                                  </Chip>
                                </Link>
                              ))}
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={cn(panelClass, 'p-8 text-center')}>
          <FileText aria-hidden="true" className="mx-auto mb-4 size-12 text-foreground-muted" />
          <h6 className="m-0 mb-1 text-base font-medium text-foreground">
            Detailed Test Results Not Available
          </h6>
          <p className="m-0 mb-4 text-sm text-foreground-secondary">
            Test result details are not available in the database. Check the{' '}
            <strong>Test Details</strong> tab for the full Playwright HTML report with screenshots,
            videos, and traces.
          </p>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-foreground">
              📊 <strong>Summary Stats:</strong> {summary.total} total, {summary.passed} passed,{' '}
              {summary.failed} failed, {summary.skipped} skipped
            </span>
            {summary.failed > 0 && (
              <span className="text-xs text-status-fail">
                ⚠️ {summary.failed} test{summary.failed !== 1 ? 's' : ''} failed — review the Test
                Details tab for error information
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
