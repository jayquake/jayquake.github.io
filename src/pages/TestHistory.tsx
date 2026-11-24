import { TestRunSummary } from '../../shared/domain/valueObjects/TestRunSummary';
import { type Project } from '../../shared/types';
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  LayoutGrid,
  LineChart,
  Menu,
  RefreshCw,
  Rows3,
  Search,
  XCircle,
} from 'lucide-react';
import { useEffect, useId, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { api } from '../api/client';
import { useToast } from '../components/standalone/ToastContainer';
import { Alert } from '../components/ui/alert';
import { Button, buttonClass } from '../components/ui/button';
import { Chip, type ChipTone } from '../components/ui/chip';
import { Dialog, DialogContent, DialogTitle } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { NativeSelect } from '../components/ui/native-select';
import { Progress } from '../components/ui/progress';
import { SearchField } from '../components/ui/search-field';
import { Skeleton } from '../components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { ToggleGroup, ToggleGroupItem } from '../components/ui/toggle-group';
import { Tooltip, TooltipContent, TooltipTrigger } from '../components/ui/tooltip';
import { useCommonShortcuts } from '../hooks/useKeyboardShortcuts';
import { cn } from '../lib/utils';

type FilterType = 'all' | 'completed' | 'failed';
type SortField = 'date' | 'passRate' | 'duration' | 'project' | 'total';
type SortDir = 'asc' | 'desc';
type ViewMode = 'table' | 'cards';

const NAV_LINKS = [
  { label: 'Projects', to: '/' },
  { label: 'Run Tests', to: '/run' },
  { label: 'History', to: '/history' },
];

const STATUS_TONE: Record<string, ChipTone> = {
  completed: 'pass',
  failed: 'fail',
  running: 'warn',
  cancelled: 'default',
};

const FILTER_TYPES: readonly FilterType[] = ['all', 'completed', 'failed'];
const SORT_FIELDS: readonly SortField[] = ['date', 'passRate', 'duration', 'project', 'total'];
const VIEW_MODES: readonly ViewMode[] = ['table', 'cards'];

function isOneOf<T extends string>(list: readonly T[], value: string): value is T {
  return (list as readonly string[]).includes(value);
}

const sdkTone = (sdkType: string): ChipTone =>
  sdkType === 'node' ? 'info' : sdkType === 'python' ? 'pass' : 'warn';

const statusBorder = (status: string) =>
  status === 'completed' ? 'border-l-status-pass'
  : status === 'failed' ? 'border-l-status-fail'
  : 'border-l-border';

const resultsHref = (runId: string) => `/test-runner/results/${runId}`;

/* ─── Sub-components ────────────────────────────────────── */

function RelativeTime({ iso }: { iso: string }) {
  const date = new Date(iso);
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  const label =
    mins < 1 ? 'just now'
    : mins < 60 ? `${mins}m ago`
    : hours < 24 ? `${hours}h ago`
    : days < 7 ? `${days}d ago`
    : date.toLocaleDateString();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <time dateTime={iso} className="whitespace-nowrap text-[0.75rem] text-foreground-secondary">{label}</time>
      </TooltipTrigger>
      <TooltipContent>{date.toLocaleString()}</TooltipContent>
    </Tooltip>
  );
}

function PassRateBar({ value, compact = false }: { value: number; compact?: boolean }) {
  const tone = value >= 80 ? 'pass' : value >= 40 ? 'warn' : 'fail';
  const indicator = {
    pass: '[&>[data-slot=progress-indicator]]:bg-status-pass',
    warn: '[&>[data-slot=progress-indicator]]:bg-status-warn',
    fail: '[&>[data-slot=progress-indicator]]:bg-status-fail',
  }[tone];
  const text = { pass: 'text-status-pass', warn: 'text-status-warn', fail: 'text-status-fail' }[tone];
  return (
    <div className={cn('flex flex-row items-center gap-2', compact ? 'min-w-20' : 'min-w-[120px]')}>
      <Progress
        value={value}
        aria-label="Pass rate"
        className={cn('h-1.5 flex-1 rounded bg-muted', indicator)}
      />
      <span className={cn('min-w-9 whitespace-nowrap text-right text-[0.75rem] font-bold', text)}>
        {value.toFixed(0)}%
      </span>
    </div>
  );
}

function SortHeader({
  active,
  dir,
  label,
  onSort,
}: {
  active: boolean;
  dir: SortDir;
  label: string;
  onSort: () => void;
}) {
  const Arrow = dir === 'asc' ? ArrowUp : ArrowDown;
  return (
    <button
      type="button"
      onClick={onSort}
      className={cn(
        'group inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0 font-[inherit] uppercase tracking-[inherit] text-inherit',
        active ? 'text-foreground' : 'hover:text-foreground'
      )}
    >
      {label}
      <Arrow
        aria-hidden="true"
        className={cn('size-3.5 transition-opacity', active ? 'opacity-100' : 'opacity-0 group-hover:opacity-50')}
      />
    </button>
  );
}

function Pagination({
  count,
  onPageChange,
  onRowsPerPageChange,
  page,
  rowsPerPage,
  rowsPerPageOptions,
}: {
  count: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  page: number;
  rowsPerPage: number;
  rowsPerPageOptions: number[];
}) {
  const id = useId();
  const from = count === 0 ? 0 : page * rowsPerPage + 1;
  const to = Math.min(count, (page + 1) * rowsPerPage);
  const options = rowsPerPageOptions.includes(rowsPerPage)
    ? rowsPerPageOptions
    : [...rowsPerPageOptions, rowsPerPage].sort((a, b) => a - b);
  return (
    <div className="flex flex-wrap items-center justify-end gap-4 px-2 py-2 text-[0.75rem] text-foreground-secondary">
      <div className="flex items-center gap-2">
        <Label htmlFor={`${id}-rows`} className="normal-case tracking-normal">Rows per page:</Label>
        <div className="w-20">
          <NativeSelect
            id={`${id}-rows`}
            value={rowsPerPage}
            onChange={e => onRowsPerPageChange(Number(e.target.value))}
            className="h-8"
          >
            {options.map(n => <option key={n} value={n}>{n}</option>)}
          </NativeSelect>
        </div>
      </div>
      <span aria-live="polite">{`${from}–${to} of ${count}`}</span>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Go to previous page"
          disabled={page === 0}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Go to next page"
          disabled={(page + 1) * rowsPerPage >= count}
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}

/* ─── Top nav bar (shared with Layout style) ────────────── */
function HistoryAppBar() {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-shell-elevated shadow-sm">
        <div className="flex min-h-14 items-center gap-4 px-4 sm:min-h-16">
          <Link to="/test-runner" className="flex flex-grow items-center no-underline">
            <img alt="AccessE2E" src="/accessE2E_logo.png" className="h-8 w-auto sm:h-10" />
          </Link>

          <nav aria-label="Main" className="hidden gap-1 sm:flex">
            {NAV_LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                aria-current={isActive(link.to) ? 'page' : undefined}
                className={cn(
                  'border-b-2 px-2 pb-1.5 pt-2 text-sm uppercase no-underline',
                  isActive(link.to)
                    ? 'border-primary font-bold text-primary'
                    : 'border-transparent font-medium text-foreground hover:text-primary'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Button
            aria-label="open navigation menu"
            variant="ghost"
            size="icon"
            onClick={() => setDrawerOpen(true)}
            className="sm:hidden"
          >
            <Menu className="size-5" aria-hidden="true" />
          </Button>
        </div>
      </header>

      <Dialog open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DialogContent
          aria-describedby={undefined}
          className="left-auto right-0 top-0 h-screen max-h-screen w-60 translate-x-0 translate-y-0 gap-0 p-0"
        >
          <DialogTitle className="sr-only">Navigation</DialogTitle>
          <div className="px-4 pb-2 pt-4">
            <img alt="AccessE2E" src="/accessE2E_logo.png" className="h-8 w-auto" />
          </div>
          <div className="h-px bg-border" />
          <nav aria-label="Main">
            <ul className="m-0 list-none p-0 py-2">
              {NAV_LINKS.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    aria-current={isActive(link.to) ? 'page' : undefined}
                    className={cn(
                      'block px-4 py-2 text-sm text-foreground no-underline hover:bg-hover/5',
                      isActive(link.to) ? 'bg-primary/10 font-bold' : 'font-normal'
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </DialogContent>
      </Dialog>
    </>
  );
}

/* ─── Main page ─────────────────────────────────────────── */
export default function TestHistory() {
  const [runs, setRuns] = useState<any[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [projectFilter, setProjectFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const { showToast } = useToast();

  useCommonShortcuts();

  useEffect(() => {
    loadHistory();
    api.projects.getAll().then(setAllProjects).catch(() => {});
  }, []);

  const loadHistory = async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await api.runs.getAll();
      const runsWithSummaries = data.map((run: any) => ({
        ...run,
        summary:
          run.summary instanceof TestRunSummary
            ? run.summary
            : TestRunSummary.fromJSON(run.summary),
      }));
      setRuns(runsWithSummaries);
      showToast(`Loaded ${runsWithSummaries.length} test run${runsWithSummaries.length !== 1 ? 's' : ''}`, 'success');
    } catch (err: any) {
      setError(err.message || 'Failed to load test history.');
      showToast('Failed to load test history', 'error');
    } finally {
      setLoading(false);
    }
  };

  /** Find the Project object for a run's projectId. */
  const getProject = (projectId: null | string): Project | undefined =>
    projectId ? allProjects.find(p => p.id === projectId) : undefined;

  /** Projects that actually appear in the loaded runs, for the filter chips. */
  const activeProjects = useMemo((): Project[] => {
    const seen = new Set<string>();
    for (const r of runs) {
      if (r.projectId) seen.add(r.projectId);
    }
    return allProjects.filter(p => seen.has(p.id));
  }, [runs, allProjects]);

  const handleSort = (field: SortField) => {
    if (sortField === field) setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortField(field); setSortDir('desc'); }
    setPage(0);
  };

  const getSummary = (run: any) =>
    run.summary instanceof TestRunSummary ? run.summary : TestRunSummary.fromJSON(run.summary);

  const filteredRuns = useMemo(() => {
    let result = runs;
    if (filterType !== 'all') result = result.filter(r => r.status === filterType);
    if (projectFilter !== 'all') result = result.filter(r => r.projectId === projectFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(r =>
        r.projectId?.toLowerCase().includes(q) ||
        r.config?.baseUrl?.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q)
      );
    }
    return [...result].sort((a, b) => {
      const mul = sortDir === 'asc' ? 1 : -1;
      const sa = getSummary(a);
      const sb = getSummary(b);
      switch (sortField) {
        case 'date':     return mul * (new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
        case 'passRate': return mul * (sa.getSuccessRate() - sb.getSuccessRate());
        case 'duration': return mul * ((a.duration || 0) - (b.duration || 0));
        case 'project':  return mul * ((a.projectId || '').localeCompare(b.projectId || ''));
        case 'total':    return mul * (sa.total - sb.total);
        default:         return 0;
      }
    });
  }, [runs, filterType, projectFilter, searchQuery, sortField, sortDir]);

  const paginatedRuns = useMemo(
    () => filteredRuns.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filteredRuns, page, rowsPerPage]
  );

  const stats = useMemo(() => {
    const total = runs.length;
    const completed = runs.filter(r => r.status === 'completed').length;
    const failed = runs.filter(r => r.status === 'failed').length;
    const avgPassRate = total > 0
      ? runs.reduce((acc, r) => acc + getSummary(r).getSuccessRate(), 0) / total
      : 0;
    return { avgPassRate, completed, failed, total };
  }, [runs]);

  const sortHeader = (field: SortField, label: string) => (
    <SortHeader
      active={sortField === field}
      dir={sortField === field ? sortDir : 'desc'}
      label={label}
      onSort={() => handleSort(field)}
    />
  );

  const ariaSort = (field: SortField): 'ascending' | 'descending' | undefined =>
    sortField === field ? (sortDir === 'asc' ? 'ascending' : 'descending') : undefined;

  const ids = { search: useId(), sort: useId() };

  const headCell = 'sticky top-0 z-10 bg-shell-panel font-bold';

  const projectLogo = (project: Project | undefined, size: string): ReactNode =>
    project?.logo ? (
      <img alt={project.name} src={project.logo} className={cn('shrink-0 object-contain', size)} />
    ) : null;

  /* ─── Shell ─────────────────────────────────────────── */
  return (
    <div className="flex min-h-screen flex-col bg-shell-main">
      <HistoryAppBar />

      <main className="w-full flex-1 px-4 py-4 sm:px-6 sm:py-6 md:px-8">

        {/* ─── Page header ──────────────────────────────── */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h5 className="m-0 text-2xl font-bold text-foreground">
              Test <span className="text-primary">History</span>
            </h5>
            <p className="m-0 mt-0.5 text-sm text-foreground-secondary">
              {loading ? 'Loading…' : `${runs.length} total runs across all projects`}
            </p>
          </div>
          <div className="flex flex-row gap-2">
            <Button disabled={loading} onClick={loadHistory} size="sm">
              <RefreshCw className="size-4" aria-hidden="true" />
              Refresh
            </Button>
          </div>
        </div>

        {/* ─── Loading ──────────────────────────────────── */}
        {loading && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-row gap-4">
              {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-20 flex-1 rounded-lg" />)}
            </div>
            <div className="border border-border bg-shell-panel">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="border-b border-border px-6 py-3">
                  <Skeleton className="h-[22px]" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── Error ────────────────────────────────────── */}
        {!loading && error && (
          <Alert
            action={
              <Button onClick={loadHistory} size="sm" variant="ghost">
                <RefreshCw className="size-4" aria-hidden="true" />
                Retry
              </Button>
            }
            variant="error"
          >
            {error}
          </Alert>
        )}

        {/* ─── Stats strip ──────────────────────────────── */}
        {!loading && !error && runs.length > 0 && (
          <div className="mb-5 flex flex-col gap-4 sm:flex-row">
            {[
              { color: 'text-foreground',  icon: <LineChart className="size-6 text-primary" aria-hidden="true" />,         label: 'Total Runs',    value: stats.total },
              { color: 'text-status-pass', icon: <CheckCircle2 className="size-6 text-status-pass" aria-hidden="true" />,  label: 'Completed',     value: stats.completed },
              { color: 'text-status-fail', icon: <XCircle className="size-6 text-status-fail" aria-hidden="true" />,       label: 'Failed',        value: stats.failed },
              { color: 'text-status-warn', icon: <AlertTriangle className="size-6 text-status-warn" aria-hidden="true" />, label: 'Avg Pass Rate', value: `${stats.avgPassRate.toFixed(1)}%` },
            ].map(s => (
              <div key={s.label} className="flex flex-1 items-center gap-4 border border-border bg-shell-panel px-4 py-2.5 shadow-sm">
                {s.icon}
                <div>
                  <h6 className={cn('m-0 text-xl font-bold leading-none', s.color)}>{s.value}</h6>
                  <span className="text-[0.75rem] text-foreground-secondary">{s.label}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ─── Toolbar ──────────────────────────────────── */}
        {!loading && !error && runs.length > 0 && (
          <div className="mb-4 border border-border bg-shell-panel p-3">
            <div className="flex flex-col gap-3">
              {/* Row 1: search, status filter, view toggle */}
              <div className="flex flex-col items-center gap-3 sm:flex-row">
                <SearchField
                  id={ids.search}
                  aria-label="Search runs"
                  value={searchQuery}
                  onValueChange={v => { setSearchQuery(v); setPage(0); }}
                  placeholder="Search project, domain, run ID…"
                  containerClassName="min-w-[220px] flex-1"
                />

                <ToggleGroup
                  type="single"
                  aria-label="Status filter"
                  value={filterType}
                  onValueChange={v => { if (v && isOneOf(FILTER_TYPES, v)) { setFilterType(v); setPage(0); } }}
                >
                  <ToggleGroupItem value="all">All</ToggleGroupItem>
                  <ToggleGroupItem value="completed" className="text-status-pass hover:text-status-pass data-[state=on]:text-status-pass">Completed</ToggleGroupItem>
                  <ToggleGroupItem value="failed" className="text-status-fail hover:text-status-fail data-[state=on]:text-status-fail">Failed</ToggleGroupItem>
                </ToggleGroup>

                {viewMode === 'cards' && (
                  <div className="w-36">
                    <NativeSelect
                      id={ids.sort}
                      aria-label="Sort by"
                      value={sortField}
                      onChange={e => { if (isOneOf(SORT_FIELDS, e.target.value)) setSortField(e.target.value); }}
                    >
                      <option value="date">Date</option>
                      <option value="passRate">Pass Rate</option>
                      <option value="duration">Duration</option>
                      <option value="total">Total Tests</option>
                      <option value="project">Project</option>
                    </NativeSelect>
                  </div>
                )}

                <ToggleGroup
                  type="single"
                  aria-label="View mode"
                  value={viewMode}
                  onValueChange={v => { if (v && isOneOf(VIEW_MODES, v)) setViewMode(v); }}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ToggleGroupItem value="table" aria-label="Table view"><Rows3 className="size-4" aria-hidden="true" /></ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>Table view</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ToggleGroupItem value="cards" aria-label="Card view"><LayoutGrid className="size-4" aria-hidden="true" /></ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>Card view</TooltipContent>
                  </Tooltip>
                </ToggleGroup>
              </div>

              {/* Row 2: project filter chips — only shown when multiple projects exist */}
              {activeProjects.length > 1 && (
                <div role="group" aria-label="Project filter" className="flex flex-row flex-wrap items-center gap-1.5">
                  <span className="mr-1 shrink-0 text-[0.75rem] font-semibold text-foreground-secondary">
                    Project:
                  </span>
                  <Chip
                    tone={projectFilter === 'all' ? 'primary' : 'default'}
                    aria-pressed={projectFilter === 'all'}
                    onClick={() => { setProjectFilter('all'); setPage(0); }}
                  >
                    All
                  </Chip>
                  {activeProjects.map(project => (
                    <Chip
                      key={project.id}
                      tone={projectFilter === project.id ? 'primary' : 'default'}
                      aria-pressed={projectFilter === project.id}
                      icon={project.logo ? <img alt="" src={project.logo} className="size-4 rounded-full object-contain" /> : undefined}
                      onClick={() => { setProjectFilter(project.id); setPage(0); }}
                    >
                      {project.name}
                    </Chip>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Result count */}
        {!loading && !error && filteredRuns.length > 0 && (
          <span className="mb-2 block text-[0.75rem] text-foreground-secondary">
            Showing {Math.min(page * rowsPerPage + 1, filteredRuns.length)}–{Math.min((page + 1) * rowsPerPage, filteredRuns.length)} of {filteredRuns.length} run{filteredRuns.length !== 1 ? 's' : ''}
            {filteredRuns.length !== runs.length && ` (filtered from ${runs.length})`}
          </span>
        )}

        {/* ─── TABLE VIEW ───────────────────────────────── */}
        {!loading && !error && viewMode === 'table' && filteredRuns.length > 0 && (
          <div className="overflow-hidden border border-border bg-shell-panel">
            <div className="max-h-[calc(100vh-340px)] overflow-auto">
              <Table className="border-collapse">
                <TableHeader className="bg-shell-panel">
                  <TableRow>
                    <TableHead className={cn(headCell, 'min-w-[90px]')}>Status</TableHead>
                    <TableHead className={cn(headCell, 'min-w-[120px]')} aria-sort={ariaSort('project')}>{sortHeader('project', 'Project')}</TableHead>
                    <TableHead className={cn(headCell, 'min-w-[220px]')}>Domain</TableHead>
                    <TableHead className={cn(headCell, 'min-w-[100px]')} aria-sort={ariaSort('date')}>{sortHeader('date', 'Date')}</TableHead>
                    <TableHead className={cn(headCell, 'min-w-[80px] text-center')} aria-sort={ariaSort('duration')}>{sortHeader('duration', 'Duration')}</TableHead>
                    <TableHead className={cn(headCell, 'min-w-14 text-center')}>
                      <CheckCircle2 className="mr-1 inline size-[13px] align-middle text-status-pass" aria-hidden="true" />Pass
                    </TableHead>
                    <TableHead className={cn(headCell, 'min-w-14 text-center')}>
                      <XCircle className="mr-1 inline size-[13px] align-middle text-status-fail" aria-hidden="true" />Fail
                    </TableHead>
                    <TableHead className={cn(headCell, 'min-w-[60px] text-center')} aria-sort={ariaSort('total')}>{sortHeader('total', 'Total')}</TableHead>
                    <TableHead className={cn(headCell, 'min-w-40')} aria-sort={ariaSort('passRate')}>{sortHeader('passRate', 'Pass Rate')}</TableHead>
                    <TableHead className={cn(headCell, 'min-w-[52px] text-right')}><span className="sr-only">Actions</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedRuns.map((run, i) => {
                    const s = getSummary(run);
                    const passRate = s.getSuccessRate();
                    const duration = run.duration ? (run.duration / 1000).toFixed(1) : '—';
                    const displayDomain = run.config?.baseUrl
                      ? run.config.baseUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
                      : null;
                    const project = getProject(run.projectId);

                    return (
                      <TableRow
                        key={run.id}
                        className={cn(
                          'border-l-[3px] hover:bg-hover/5',
                          i % 2 === 0 ? 'bg-transparent' : 'bg-hover/[0.03]',
                          statusBorder(run.status)
                        )}
                      >
                        <TableCell className="align-middle">
                          <Chip tone={STATUS_TONE[run.status] ?? 'default'} className="h-5">
                            {run.status}
                          </Chip>
                        </TableCell>

                        <TableCell className="align-middle">
                          <div className="flex flex-row items-center gap-1.5">
                            {project?.logo && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  {projectLogo(project, 'size-5')}
                                </TooltipTrigger>
                                <TooltipContent>{project.name}</TooltipContent>
                              </Tooltip>
                            )}
                            <div className="min-w-0">
                              <div className="flex flex-row items-center gap-1">
                                <Link
                                  to={resultsHref(run.id)}
                                  className="truncate text-sm font-semibold text-foreground no-underline hover:underline"
                                >
                                  {project?.name ?? run.projectId ?? 'Multi-Project'}
                                </Link>
                                {run.sdkType && (
                                  <Chip tone={sdkTone(run.sdkType)} className="min-h-5 font-bold uppercase">
                                    {run.sdkType}
                                  </Chip>
                                )}
                              </div>
                              <span className="block truncate font-mono text-[0.75rem] text-foreground-muted">
                                {run.id.substring(0, 14)}…
                              </span>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="align-middle">
                          {displayDomain ? (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="block max-w-[280px] truncate text-[0.75rem] text-primary">
                                  {displayDomain}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>{run.config?.baseUrl}</TooltipContent>
                            </Tooltip>
                          ) : (
                            <span className="text-[0.75rem] text-foreground-muted">—</span>
                          )}
                        </TableCell>

                        <TableCell className="align-middle"><RelativeTime iso={run.startTime} /></TableCell>

                        <TableCell className="text-center align-middle">
                          <span className="text-[0.75rem]">{duration}s</span>
                        </TableCell>

                        <TableCell className="text-center align-middle">
                          <span className="text-sm font-bold text-status-pass">{s.passed}</span>
                        </TableCell>

                        <TableCell className="text-center align-middle">
                          <span className={cn('text-sm', s.failed > 0 ? 'font-bold text-status-fail' : 'font-normal text-foreground-secondary')}>
                            {s.failed}
                          </span>
                        </TableCell>

                        <TableCell className="text-center align-middle">
                          <span className="text-sm text-foreground">{s.total}</span>
                        </TableCell>

                        <TableCell className="align-middle"><PassRateBar compact value={passRate} /></TableCell>

                        <TableCell className="text-right align-middle">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link
                                to={resultsHref(run.id)}
                                aria-label="View results"
                                className={buttonClass({ variant: 'ghost', size: 'icon' })}
                              >
                                <ExternalLink className="size-4" aria-hidden="true" />
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent>View results</TooltipContent>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            <Pagination
              count={filteredRuns.length}
              onPageChange={p => setPage(p)}
              onRowsPerPageChange={n => { setRowsPerPage(n); setPage(0); }}
              page={page}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[10, 25, 50, 100]}
            />
          </div>
        )}

        {/* ─── CARDS VIEW ───────────────────────────────── */}
        {!loading && !error && viewMode === 'cards' && filteredRuns.length > 0 && (
          <>
            <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {paginatedRuns.map(run => {
                const s = getSummary(run);
                const passRate = s.getSuccessRate();
                const duration = run.duration ? (run.duration / 1000).toFixed(1) : null;
                const displayDomain = run.config?.baseUrl
                  ? run.config.baseUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
                  : null;
                const project = getProject(run.projectId);

                return (
                  <li
                    key={run.id}
                    className={cn(
                      'relative border border-l-4 border-border bg-shell-panel p-4 pb-3 transition-[box-shadow,transform] duration-200',
                      'focus-within:-translate-y-0.5 focus-within:shadow-lg hover:-translate-y-0.5 hover:shadow-lg',
                      statusBorder(run.status)
                    )}
                  >
                    <div className="mb-2 flex flex-row items-start justify-between">
                      <div className="flex min-w-0 flex-1 flex-row items-center gap-1.5">
                        {projectLogo(project, 'size-[22px]')}
                        <div className="min-w-0">
                          <div className="flex flex-row items-center gap-1">
                            <h6 className="m-0 truncate text-sm font-bold text-foreground">
                              <Link
                                to={resultsHref(run.id)}
                                className="text-inherit no-underline outline-none after:absolute after:inset-0 after:content-[''] hover:underline focus-visible:underline"
                              >
                                {project?.name ?? run.projectId ?? 'Multi-Project'}
                              </Link>
                            </h6>
                            {run.sdkType && (
                              <Chip tone={sdkTone(run.sdkType)} className="min-h-5 font-bold uppercase">
                                {run.sdkType}
                              </Chip>
                            )}
                          </div>
                          {displayDomain && <span className="block truncate text-[0.75rem] text-primary">{displayDomain}</span>}
                        </div>
                      </div>
                      <Chip tone={STATUS_TONE[run.status] ?? 'default'} className="ml-2 h-5 shrink-0">{run.status}</Chip>
                    </div>
                    <div className="mb-2 flex flex-row justify-between">
                      <div className="flex flex-row gap-4">
                        {[
                          { color: 'text-status-pass', label: 'pass', value: s.passed },
                          { color: s.failed > 0 ? 'text-status-fail' : 'text-foreground-secondary', label: 'fail', value: s.failed },
                          { color: 'text-foreground', label: 'total', value: s.total },
                        ].map(stat => (
                          <div key={stat.label} className="text-center">
                            <span className={cn('block text-xl font-bold leading-none', stat.color)}>{stat.value}</span>
                            <span className="text-[0.75rem] text-foreground-secondary">{stat.label}</span>
                          </div>
                        ))}
                      </div>
                      <div className="relative z-[1] flex flex-col items-end justify-center">
                        <RelativeTime iso={run.startTime} />
                        {duration && <span className="text-[0.75rem] text-foreground-muted">{duration}s</span>}
                      </div>
                    </div>
                    <PassRateBar value={passRate} />
                  </li>
                );
              })}
            </ul>
            <Pagination
              count={filteredRuns.length}
              onPageChange={p => setPage(p)}
              onRowsPerPageChange={n => { setRowsPerPage(n); setPage(0); }}
              page={page}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[12, 24, 48]}
            />
          </>
        )}

        {/* ─── Empty: no match ──────────────────────────── */}
        {!loading && !error && filteredRuns.length === 0 && runs.length > 0 && (
          <div className="border border-border bg-shell-panel py-16 text-center">
            <Search className="mx-auto mb-4 block size-14 text-foreground-muted" aria-hidden="true" />
            <h6 className="m-0 text-xl font-medium text-foreground-secondary">No matching runs</h6>
            <p className="m-0 mt-2 text-sm text-foreground-secondary">Try adjusting your filters or search query</p>
            <Button onClick={() => { setSearchQuery(''); setFilterType('all'); setProjectFilter('all'); }} size="sm" className="mt-4">
              Clear filters
            </Button>
          </div>
        )}

        {/* ─── Empty: no runs ───────────────────────────── */}
        {!loading && !error && runs.length === 0 && (
          <div className="border border-border bg-shell-panel py-20 text-center">
            <LineChart className="mx-auto mb-4 block size-[72px] text-foreground-muted" aria-hidden="true" />
            <h6 className="m-0 text-xl font-medium text-foreground-secondary">No test runs yet</h6>
            <p className="m-0 mt-2 text-sm text-foreground-secondary">Run your first test to see history here</p>
            <Link to="/test-runner" className={buttonClass({ variant: 'default', size: 'sm', className: 'mt-4 no-underline' })}>
              <ArrowRight className="size-4" aria-hidden="true" />
              Go to Projects
            </Link>
          </div>
        )}

      </main>
    </div>
  );
}
