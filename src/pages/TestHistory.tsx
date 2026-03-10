import { TestRunSummary } from '../../shared/domain/valueObjects/TestRunSummary';
import { type Project } from '../../shared/types';
import Alert from '@mui/material/Alert';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import MenuIcon from '@mui/icons-material/Menu';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import TableRowsIcon from '@mui/icons-material/TableRows';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import WarningIcon from '@mui/icons-material/Warning';
import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { api } from '../api/client';
import { useToast } from '../components/standalone/ToastContainer';
import { useCommonShortcuts } from '../hooks/useKeyboardShortcuts';

type FilterType = 'all' | 'completed' | 'failed';
type SortField = 'date' | 'passRate' | 'duration' | 'project' | 'total';
type SortDir = 'asc' | 'desc';
type ViewMode = 'table' | 'cards';

const NAV_LINKS = [
  { label: 'Projects', to: '/' },
  { label: 'Run Tests', to: '/run' },
  { label: 'History', to: '/history' },
];

const STATUS_COLOR: Record<string, 'default' | 'error' | 'success' | 'warning'> = {
  completed: 'success',
  failed: 'error',
  running: 'warning',
  cancelled: 'default',
};

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
    <Tooltip title={date.toLocaleString()}>
      <Typography color="text.secondary" variant="caption" noWrap>{label}</Typography>
    </Tooltip>
  );
}

function PassRateBar({ value, compact = false }: { value: number; compact?: boolean }) {
  const color: 'error' | 'success' | 'warning' =
    value >= 80 ? 'success' : value >= 40 ? 'warning' : 'error';
  return (
    <Stack alignItems="center" direction="row" spacing={1} sx={{ minWidth: compact ? 80 : 120 }}>
      <LinearProgress
        color={color}
        sx={{ flex: 1, height: 6, borderRadius: 1 }}
        value={value}
        variant="determinate"
      />
      <Typography
        color={`${color}.main`}
        fontWeight={700}
        noWrap
        sx={{ fontSize: '0.75rem', minWidth: 36, textAlign: 'right' }}
      >
        {value.toFixed(0)}%
      </Typography>
    </Stack>
  );
}

/* ─── Top nav bar (shared with Layout style) ────────────── */
function HistoryAppBar() {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <AppBar
        color="default"
        elevation={1}
        position="sticky"
        sx={{ zIndex: t => t.zIndex.appBar, bgcolor: 'background.paper' }}
      >
        <Toolbar sx={{ gap: 2 }}>
          <Box
            component={Link}
            to="/test-runner"
            sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexGrow: 1 }}
          >
            <Box
              alt="AccessE2E"
              component="img"
              src="/accessE2E_logo.png"
              sx={{ height: { xs: 32, sm: 40 }, width: 'auto' }}
            />
          </Box>

          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 0.5 }}>
            {NAV_LINKS.map(link => (
              <Button
                color={isActive(link.to) ? 'primary' : 'inherit'}
                component={Link}
                key={link.to}
                to={link.to}
                sx={{
                  fontWeight: isActive(link.to) ? 700 : 500,
                  borderBottom: isActive(link.to) ? '2px solid' : '2px solid transparent',
                  borderRadius: 0,
                  pb: '6px',
                  minWidth: 0,
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          <IconButton
            aria-label="open navigation menu"
            edge="end"
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        PaperProps={{ sx: { width: 240 } }}
      >
        <Box sx={{ pt: 2, pb: 1, px: 2 }}>
          <Box alt="AccessE2E" component="img" src="/accessE2E_logo.png" sx={{ height: 32, width: 'auto' }} />
        </Box>
        <Divider />
        <List>
          {NAV_LINKS.map(link => (
            <ListItem disablePadding key={link.to}>
              <ListItemButton
                component={Link}
                selected={isActive(link.to)}
                to={link.to}
                sx={{ fontWeight: isActive(link.to) ? 700 : 400 }}
              >
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
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
  const navigate = useNavigate();
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

  const sortLabel = (field: SortField, label: string) => (
    <TableSortLabel
      active={sortField === field}
      direction={sortField === field ? sortDir : 'desc'}
      onClick={() => handleSort(field)}
    >
      {label}
    </TableSortLabel>
  );

  /* ─── Shell ─────────────────────────────────────────── */
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <HistoryAppBar />

      <Box component="main" sx={{ flex: 1, width: '100%', px: { xs: 2, sm: 3, md: 4 }, py: { xs: 2, sm: 3 } }}>

        {/* ─── Page header ──────────────────────────────── */}
        <Stack
          alignItems={{ sm: 'center' }}
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Box>
            <Typography fontWeight={700} variant="h5">
              Test <Box component="span" sx={{ color: 'primary.main' }}>History</Box>
            </Typography>
            <Typography color="text.secondary" variant="body2" sx={{ mt: 0.25 }}>
              {loading ? 'Loading…' : `${runs.length} total runs across all projects`}
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Button disabled={loading} onClick={loadHistory} size="small" startIcon={<RefreshIcon />} variant="outlined">
              Refresh
            </Button>
          </Stack>
        </Stack>

        {/* ─── Loading ──────────────────────────────────── */}
        {loading && (
          <Stack spacing={3}>
            <Stack direction="row" spacing={2}>
              {[...Array(4)].map((_, i) => <Skeleton key={i} height={80} sx={{ flex: 1, borderRadius: 2 }} variant="rectangular" />)}
            </Stack>
            <Paper variant="outlined">
              {[...Array(10)].map((_, i) => (
                <Box key={i} sx={{ px: 3, py: 1.5, borderBottom: 1, borderColor: 'divider' }}>
                  <Skeleton height={22} />
                </Box>
              ))}
            </Paper>
          </Stack>
        )}

        {/* ─── Error ────────────────────────────────────── */}
        {!loading && error && (
          <Alert
            action={<Button color="inherit" onClick={loadHistory} size="small" startIcon={<RefreshIcon />}>Retry</Button>}
            severity="error"
          >
            {error}
          </Alert>
        )}

        {/* ─── Stats strip ──────────────────────────────── */}
        {!loading && !error && runs.length > 0 && (
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2.5 }}>
            {[
              { color: 'text.primary',  icon: <ShowChartIcon color="primary" />,  label: 'Total Runs',    value: stats.total },
              { color: 'success.main',  icon: <CheckCircleIcon color="success" />, label: 'Completed',     value: stats.completed },
              { color: 'error.main',    icon: <ErrorIcon color="error" />,         label: 'Failed',        value: stats.failed },
              { color: 'warning.main',  icon: <WarningIcon color="warning" />,     label: 'Avg Pass Rate', value: `${stats.avgPassRate.toFixed(1)}%` },
            ].map(s => (
              <Card key={s.label} sx={{ flex: 1 }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: '10px !important' }}>
                  {s.icon}
                  <Box>
                    <Typography fontWeight={700} lineHeight={1} sx={{ color: s.color }} variant="h6">{s.value}</Typography>
                    <Typography color="text.secondary" variant="caption">{s.label}</Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}

        {/* ─── Toolbar ──────────────────────────────────── */}
        {!loading && !error && runs.length > 0 && (
          <Paper sx={{ p: 1.5, mb: 2 }} variant="outlined">
            <Stack spacing={1.5}>
              {/* Row 1: search, status filter, view toggle */}
              <Stack alignItems="center" direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                <TextField
                  InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
                  onChange={e => { setSearchQuery(e.target.value); setPage(0); }}
                  placeholder="Search project, domain, run ID…"
                  size="small"
                  sx={{ flex: 1, minWidth: 220 }}
                  value={searchQuery}
                />

                <ToggleButtonGroup
                  exclusive
                  onChange={(_, v) => { if (v) { setFilterType(v); setPage(0); } }}
                  size="small"
                  value={filterType}
                >
                  <ToggleButton value="all">All</ToggleButton>
                  <ToggleButton value="completed" sx={{ color: 'success.main' }}>Completed</ToggleButton>
                  <ToggleButton value="failed" sx={{ color: 'error.main' }}>Failed</ToggleButton>
                </ToggleButtonGroup>

                {viewMode === 'cards' && (
                  <Select onChange={e => setSortField(e.target.value as SortField)} size="small" value={sortField}>
                    <MenuItem value="date">Date</MenuItem>
                    <MenuItem value="passRate">Pass Rate</MenuItem>
                    <MenuItem value="duration">Duration</MenuItem>
                    <MenuItem value="total">Total Tests</MenuItem>
                    <MenuItem value="project">Project</MenuItem>
                  </Select>
                )}

                <ToggleButtonGroup exclusive onChange={(_, v) => v && setViewMode(v)} size="small" value={viewMode}>
                  <Tooltip title="Table view"><ToggleButton value="table"><TableRowsIcon fontSize="small" /></ToggleButton></Tooltip>
                  <Tooltip title="Card view"><ToggleButton value="cards"><ViewModuleIcon fontSize="small" /></ToggleButton></Tooltip>
                </ToggleButtonGroup>
              </Stack>

              {/* Row 2: project filter chips — only shown when multiple projects exist */}
              {activeProjects.length > 1 && (
                <Stack alignItems="center" direction="row" flexWrap="wrap" gap={0.75}>
                  <Typography color="text.secondary" fontWeight={600} sx={{ mr: 0.5, flexShrink: 0 }} variant="caption">
                    Project:
                  </Typography>
                  <Chip
                    clickable
                    color={projectFilter === 'all' ? 'primary' : undefined}
                    label="All"
                    onClick={() => { setProjectFilter('all'); setPage(0); }}
                    size="small"
                    variant={projectFilter === 'all' ? 'filled' : 'outlined'}
                  />
                  {activeProjects.map(project => (
                    <Chip
                      avatar={
                        <Avatar
                          alt={project.name}
                          src={project.logo}
                          sx={{ bgcolor: 'transparent !important' }}
                        />
                      }
                      clickable
                      color={projectFilter === project.id ? 'primary' : undefined}
                      key={project.id}
                      label={project.name}
                      onClick={() => { setProjectFilter(project.id); setPage(0); }}
                      size="small"
                      variant={projectFilter === project.id ? 'filled' : 'outlined'}
                    />
                  ))}
                </Stack>
              )}
            </Stack>
          </Paper>
        )}

        {/* Result count */}
        {!loading && !error && filteredRuns.length > 0 && (
          <Typography color="text.secondary" sx={{ mb: 1 }} variant="caption">
            Showing {Math.min(page * rowsPerPage + 1, filteredRuns.length)}–{Math.min((page + 1) * rowsPerPage, filteredRuns.length)} of {filteredRuns.length} run{filteredRuns.length !== 1 ? 's' : ''}
            {filteredRuns.length !== runs.length && ` (filtered from ${runs.length})`}
          </Typography>
        )}

        {/* ─── TABLE VIEW ───────────────────────────────── */}
        {!loading && !error && viewMode === 'table' && filteredRuns.length > 0 && (
          <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 'calc(100vh - 340px)' }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, minWidth: 90,  bgcolor: 'background.paper' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 700, minWidth: 120, bgcolor: 'background.paper' }}>{sortLabel('project', 'Project')}</TableCell>
                    <TableCell sx={{ fontWeight: 700, minWidth: 220, bgcolor: 'background.paper' }}>Domain</TableCell>
                    <TableCell sx={{ fontWeight: 700, minWidth: 100, bgcolor: 'background.paper' }}>{sortLabel('date', 'Date')}</TableCell>
                    <TableCell sx={{ fontWeight: 700, minWidth: 80,  bgcolor: 'background.paper' }} align="center">{sortLabel('duration', 'Duration')}</TableCell>
                    <TableCell sx={{ fontWeight: 700, minWidth: 56,  bgcolor: 'background.paper' }} align="center">
                      <CheckCircleIcon color="success" sx={{ fontSize: 13, verticalAlign: 'middle', mr: 0.5 }} />Pass
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, minWidth: 56,  bgcolor: 'background.paper' }} align="center">
                      <ErrorIcon color="error" sx={{ fontSize: 13, verticalAlign: 'middle', mr: 0.5 }} />Fail
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, minWidth: 60,  bgcolor: 'background.paper' }} align="center">{sortLabel('total', 'Total')}</TableCell>
                    <TableCell sx={{ fontWeight: 700, minWidth: 160, bgcolor: 'background.paper' }}>{sortLabel('passRate', 'Pass Rate')}</TableCell>
                    <TableCell sx={{ fontWeight: 700, minWidth: 52,  bgcolor: 'background.paper' }} align="right" />
                  </TableRow>
                </TableHead>
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
                        hover
                        key={run.id}
                        onClick={() => navigate(`/test-runner/results/${run.id}`)}
                        sx={{
                          cursor: 'pointer',
                          bgcolor: i % 2 === 0 ? 'transparent' : 'action.hover',
                          borderLeft: '3px solid',
                          borderColor:
                            run.status === 'completed' ? 'success.main'
                            : run.status === 'failed' ? 'error.main'
                            : 'divider',
                        }}
                      >
                        <TableCell>
                          <Chip
                            color={STATUS_COLOR[run.status] ?? 'default'}
                            label={run.status}
                            size="small"
                            sx={{ fontSize: '0.65rem', height: 20 }}
                          />
                        </TableCell>

                        <TableCell>
                          <Stack alignItems="center" direction="row" spacing={0.75}>
                            {project?.logo && (
                              <Tooltip title={project.name}>
                                <Avatar
                                  alt={project.name}
                                  src={project.logo}
                                  sx={{ width: 20, height: 20, flexShrink: 0, bgcolor: 'transparent' }}
                                  variant="square"
                                />
                              </Tooltip>
                            )}
                            <Box sx={{ minWidth: 0 }}>
                              <Stack alignItems="center" direction="row" spacing={0.5}>
                                <Typography fontWeight={600} noWrap variant="body2">
                                  {project?.name ?? run.projectId ?? 'Multi-Project'}
                                </Typography>
                                {run.sdkType && (
                                  <Chip
                                    color={run.sdkType === 'node' ? 'info' : run.sdkType === 'python' ? 'success' : 'warning'}
                                    label={run.sdkType}
                                    size="small"
                                    sx={{ fontSize: '0.6rem', height: 16, textTransform: 'uppercase', fontWeight: 700 }}
                                  />
                                )}
                              </Stack>
                              <Typography color="text.disabled" noWrap sx={{ fontSize: '0.65rem', fontFamily: 'monospace' }}>
                                {run.id.substring(0, 14)}…
                              </Typography>
                            </Box>
                          </Stack>
                        </TableCell>

                        <TableCell>
                          {displayDomain ? (
                            <Tooltip title={run.config?.baseUrl}>
                              <Typography color="primary" noWrap sx={{ maxWidth: 280, fontSize: '0.75rem' }}>
                                {displayDomain}
                              </Typography>
                            </Tooltip>
                          ) : (
                            <Typography color="text.disabled" variant="caption">—</Typography>
                          )}
                        </TableCell>

                        <TableCell><RelativeTime iso={run.startTime} /></TableCell>

                        <TableCell align="center">
                          <Typography variant="caption">{duration}s</Typography>
                        </TableCell>

                        <TableCell align="center">
                          <Typography color="success.main" fontWeight={700} variant="body2">{s.passed}</Typography>
                        </TableCell>

                        <TableCell align="center">
                          <Typography color={s.failed > 0 ? 'error.main' : 'text.secondary'} fontWeight={s.failed > 0 ? 700 : 400} variant="body2">
                            {s.failed}
                          </Typography>
                        </TableCell>

                        <TableCell align="center">
                          <Typography variant="body2">{s.total}</Typography>
                        </TableCell>

                        <TableCell><PassRateBar compact value={passRate} /></TableCell>

                        <TableCell align="right" onClick={e => e.stopPropagation()}>
                          <Tooltip title="View results">
                            <IconButton onClick={() => navigate(`/test-runner/results/${run.id}`)} size="small">
                              <OpenInNewIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={filteredRuns.length}
              onPageChange={(_, p) => setPage(p)}
              onRowsPerPageChange={e => { setRowsPerPage(Number(e.target.value)); setPage(0); }}
              page={page}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[10, 25, 50, 100]}
            />
          </Paper>
        )}

        {/* ─── CARDS VIEW ───────────────────────────────── */}
        {!loading && !error && viewMode === 'cards' && filteredRuns.length > 0 && (
          <>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr', lg: '1fr 1fr 1fr 1fr' }, gap: 2 }}>
              {paginatedRuns.map(run => {
                const s = getSummary(run);
                const passRate = s.getSuccessRate();
                const duration = run.duration ? (run.duration / 1000).toFixed(1) : null;
                const displayDomain = run.config?.baseUrl
                  ? run.config.baseUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
                  : null;
                const project = getProject(run.projectId);

                return (
                  <Card
                    key={run.id}
                    onClick={() => navigate(`/test-runner/results/${run.id}`)}
                    sx={{
                      cursor: 'pointer',
                      borderLeft: '4px solid',
                      borderColor: run.status === 'completed' ? 'success.main' : run.status === 'failed' ? 'error.main' : 'divider',
                      transition: 'box-shadow 0.2s, transform 0.1s',
                      '&:hover': { boxShadow: 4, transform: 'translateY(-2px)' },
                    }}
                    variant="outlined"
                  >
                    <CardContent sx={{ pb: '12px !important' }}>
                      <Stack alignItems="flex-start" direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                        <Stack alignItems="center" direction="row" spacing={0.75} sx={{ flex: 1, minWidth: 0 }}>
                          {project?.logo && (
                            <Avatar
                              alt={project.name}
                              src={project.logo}
                              sx={{ width: 22, height: 22, flexShrink: 0, bgcolor: 'transparent' }}
                              variant="square"
                            />
                          )}
                          <Box sx={{ minWidth: 0 }}>
                            <Stack alignItems="center" direction="row" spacing={0.5}>
                              <Typography fontWeight={700} noWrap variant="subtitle2">
                                {project?.name ?? run.projectId ?? 'Multi-Project'}
                              </Typography>
                              {run.sdkType && (
                                <Chip
                                  color={run.sdkType === 'node' ? 'info' : run.sdkType === 'python' ? 'success' : 'warning'}
                                  label={run.sdkType}
                                  size="small"
                                  sx={{ fontSize: '0.6rem', height: 16, textTransform: 'uppercase', fontWeight: 700 }}
                                />
                              )}
                            </Stack>
                            {displayDomain && <Typography color="primary" noWrap variant="caption">{displayDomain}</Typography>}
                          </Box>
                        </Stack>
                        <Chip color={STATUS_COLOR[run.status] ?? 'default'} label={run.status} size="small" sx={{ ml: 1, flexShrink: 0, height: 20, fontSize: '0.65rem' }} />
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                        <Stack direction="row" spacing={2}>
                          {[
                            { color: 'success.main', label: 'pass', value: s.passed },
                            { color: s.failed > 0 ? 'error.main' : 'text.secondary', label: 'fail', value: s.failed },
                            { color: 'text.primary', label: 'total', value: s.total },
                          ].map(stat => (
                            <Box key={stat.label} sx={{ textAlign: 'center' }}>
                              <Typography color={stat.color} fontWeight={700} lineHeight={1} variant="h6">{stat.value}</Typography>
                              <Typography color="text.secondary" variant="caption">{stat.label}</Typography>
                            </Box>
                          ))}
                        </Stack>
                        <Stack alignItems="flex-end" justifyContent="center">
                          <RelativeTime iso={run.startTime} />
                          {duration && <Typography color="text.disabled" variant="caption">{duration}s</Typography>}
                        </Stack>
                      </Stack>
                      <PassRateBar value={passRate} />
                    </CardContent>
                  </Card>
                );
              })}
            </Box>
            <TablePagination
              component="div"
              count={filteredRuns.length}
              onPageChange={(_, p) => setPage(p)}
              onRowsPerPageChange={e => { setRowsPerPage(Number(e.target.value)); setPage(0); }}
              page={page}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[12, 24, 48]}
            />
          </>
        )}

        {/* ─── Empty: no match ──────────────────────────── */}
        {!loading && !error && filteredRuns.length === 0 && runs.length > 0 && (
          <Paper sx={{ textAlign: 'center', py: 8 }} variant="outlined">
            <SearchIcon sx={{ fontSize: 56, color: 'text.disabled', mb: 2 }} />
            <Typography color="text.secondary" variant="h6">No matching runs</Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }} variant="body2">Try adjusting your filters or search query</Typography>
            <Button onClick={() => { setSearchQuery(''); setFilterType('all'); setProjectFilter('all'); }} size="small" sx={{ mt: 2 }} variant="outlined">
              Clear filters
            </Button>
          </Paper>
        )}

        {/* ─── Empty: no runs ───────────────────────────── */}
        {!loading && !error && runs.length === 0 && (
          <Paper sx={{ textAlign: 'center', py: 10 }} variant="outlined">
            <ShowChartIcon sx={{ fontSize: 72, color: 'text.disabled', mb: 2 }} />
            <Typography color="text.secondary" variant="h6">No test runs yet</Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }} variant="body2">Run your first test to see history here</Typography>
            <Button component={Link} size="small" startIcon={<ArrowForwardIcon />} sx={{ mt: 2 }} to="/test-runner" variant="contained">
              Go to Projects
            </Button>
          </Paper>
        )}

      </Box>
    </Box>
  );
}
