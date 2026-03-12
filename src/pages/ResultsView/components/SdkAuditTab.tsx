import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import BiotechIcon from '@mui/icons-material/Biotech';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import LanguageIcon from '@mui/icons-material/Language';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import SecurityIcon from '@mui/icons-material/Security';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { api } from '../../../api/client';
import legacyEngineMapping from '../../../data/legacy-engine-mapping';

const getBasename = (p: string) => p.replace(/^.*[/\\]/, '');

const SEVERITY_COLORS: Record<string, string> = {
  extreme: '#d32f2f',
  high: '#f57c00',
  medium: '#1976d2',
  low: '#388e3c',
};

const SEVERITY_ORDER: Record<string, number> = { extreme: 0, high: 1, medium: 2, low: 3 };

const SEVERITY_ICONS: Record<string, React.ReactElement> = {
  extreme: <ErrorIcon fontSize="small" />,
  high: <ReportProblemIcon fontSize="small" />,
  medium: <WarningAmberIcon fontSize="small" />,
  low: <CheckCircleIcon fontSize="small" />,
};

const SDK_COLORS: Record<string, 'info' | 'success' | 'warning'> = {
  node: 'info',
  python: 'success',
  java: 'warning',
};

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
  return (
    <Chip
      label={severity}
      size="small"
      sx={{
        bgcolor: `${SEVERITY_COLORS[severity] || '#888'}18`,
        color: SEVERITY_COLORS[severity] || '#888',
        fontWeight: 700,
        fontSize: '0.65rem',
        textTransform: 'capitalize',
        height: 20,
      }}
    />
  );
}

function EngineRuleChips({ ruleId }: { ruleId: string }) {
  const navigate = useNavigate();
  const mapping = (legacyEngineMapping as Record<string, Array<{ id: string; label: string; path: string }>>);
  const engineRules = mapping[ruleId];
  if (!engineRules?.length) return <Typography color="text.disabled" variant="caption">—</Typography>;

  return (
    <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
      {engineRules.map(rule => (
        <Chip
          key={rule.id}
          icon={<BiotechIcon />}
          label={rule.id}
          size="small"
          onClick={(e) => { e.stopPropagation(); navigate(rule.path); }}
          sx={{
            fontFamily: 'monospace',
            fontSize: '0.65rem',
            cursor: 'pointer',
            height: 20,
          }}
        />
      ))}
    </Stack>
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
      <Paper sx={{ p: 6, textAlign: 'center' }} variant="outlined">
        <SecurityIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
        <Typography gutterBottom variant="h6">
          No Audit Report Available
        </Typography>
        <Typography color="text.secondary" variant="body2">
          The SDK audit report has not been generated for this test run.
          Run tests with the AccessFlow SDK to generate audit data.
        </Typography>
      </Paper>
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
    <Stack spacing={2.5}>
      {/* Header */}
      <Paper sx={{ p: 2 }} variant="outlined">
        <Stack
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          spacing={1.5}
        >
          <Stack alignItems="center" direction="row" spacing={1.5}>
            <Chip
              color={SDK_COLORS[report.sdkType] || 'default'}
              label={report.sdkType.toUpperCase()}
              size="small"
              sx={{ fontWeight: 700 }}
            />
            <Stack alignItems="center" direction="row" spacing={0.5}>
              <LanguageIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography color="text.secondary" variant="body2">
                {report.environment}
              </Typography>
            </Stack>
            {config && typeof config.localCheck === 'boolean' && (
              <Chip
                size="small"
                variant="outlined"
                label={`Local check: ${config.localCheck}`}
                color={config.localCheck ? 'success' : 'default'}
                icon={config.localCheck ? <CheckCircleIcon /> : undefined}
                sx={{ fontWeight: 600, fontSize: '0.7rem' }}
              />
            )}
            <Chip
              color={report.thresholdPassed ? 'success' : 'error'}
              icon={report.thresholdPassed ? <CheckCircleIcon /> : <ErrorIcon />}
              label={report.thresholdPassed ? 'Threshold Passed' : 'Threshold Failed'}
              size="small"
              variant="outlined"
            />
          </Stack>

          <Typography color="text.secondary" variant="body2">
            {report.totalPages} page{report.totalPages !== 1 ? 's' : ''} audited
          </Typography>
        </Stack>
      </Paper>

      {/* Threshold Result Banner */}
      {(() => {
        const exceededSeverities = (['extreme', 'high', 'medium', 'low'] as const).filter(sev => {
          const t = thresholds?.[sev];
          return t != null && severityCounts[sev] > t;
        });

        if (!report.thresholdPassed && exceededSeverities.length > 0) {
          return (
            <Alert
              severity="error"
              icon={<ErrorIcon />}
              sx={{
                borderLeft: 4,
                borderLeftColor: 'error.main',
                '& .MuiAlert-message': { width: '100%' },
              }}
            >
              <AlertTitle sx={{ fontWeight: 700 }}>SDK Audit Failed — Threshold Exceeded</AlertTitle>
              <Typography variant="body2" sx={{ mb: 1.5 }}>
                The audit did not pass because {exceededSeverities.length === 1 ? '1 severity level exceeds its' : `${exceededSeverities.length} severity levels exceed their`} configured threshold{exceededSeverities.length !== 1 ? 's' : ''}:
              </Typography>
              <Stack spacing={0.75}>
                {exceededSeverities.map(sev => {
                  const count = severityCounts[sev];
                  const limit = thresholds![sev]!;
                  const overage = count - limit;
                  return (
                    <Stack key={sev} direction="row" alignItems="center" spacing={1}>
                      <Box sx={{ color: SEVERITY_COLORS[sev] }}>{SEVERITY_ICONS[sev]}</Box>
                      <Typography variant="body2" fontWeight={600} sx={{ textTransform: 'capitalize', color: SEVERITY_COLORS[sev], width: 65 }}>
                        {sev}
                      </Typography>
                      <Typography variant="body2">
                        <strong>{count.toLocaleString()}</strong> found — exceeds threshold of <strong>{limit.toLocaleString()}</strong> by {overage.toLocaleString()}
                      </Typography>
                    </Stack>
                  );
                })}
              </Stack>
            </Alert>
          );
        }

        if (report.thresholdPassed && thresholds) {
          return (
            <Alert severity="success" icon={<CheckCircleIcon />}>
              <AlertTitle sx={{ fontWeight: 700 }}>SDK Audit Passed</AlertTitle>
              <Typography variant="body2">
                All severity levels are within the configured thresholds.
              </Typography>
            </Alert>
          );
        }

        if (!report.thresholdPassed && !thresholds) {
          return (
            <Alert severity="error" icon={<ErrorIcon />}>
              <AlertTitle sx={{ fontWeight: 700 }}>SDK Audit Failed</AlertTitle>
              <Typography variant="body2">
                The audit threshold was not met. {report.extremeCount > 0 || report.highCount > 0
                  ? `Found ${report.extremeCount.toLocaleString()} extreme and ${report.highCount.toLocaleString()} high severity issues.`
                  : `Found ${report.totalIssues.toLocaleString()} total issues.`}
              </Typography>
            </Alert>
          );
        }

        return null;
      })()}

      {/* Stats Cards Grid */}
      <Grid container spacing={2}>
        {(['extreme', 'high', 'medium', 'low'] as const).map(severity => {
          const count = severityCounts[severity];
          const color = SEVERITY_COLORS[severity];
          const threshold = thresholds?.[severity];
          const exceeded = threshold != null && count > threshold;
          return (
            <Grid size={{ xs: 6, sm: 3 }} key={severity}>
              <Card
                variant="outlined"
                sx={{
                  borderColor: exceeded ? 'error.main' : `${color}40`,
                  bgcolor: exceeded ? 'rgba(211,47,47,0.04)' : undefined,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Typography fontWeight={700} variant="h4" sx={{ color }}>
                    {count.toLocaleString()}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                    <Box sx={{ color }}>{SEVERITY_ICONS[severity]}</Box>
                    <Typography color="text.secondary" variant="body2" sx={{ textTransform: 'capitalize' }}>
                      {severity}
                    </Typography>
                  </Box>
                  {threshold != null && (
                    <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 0.5 }}>
                      {exceeded ? (
                        <ErrorIcon sx={{ fontSize: 14, color: 'error.main' }} />
                      ) : (
                        <CheckCircleIcon sx={{ fontSize: 14, color: 'success.main' }} />
                      )}
                      <Typography
                        variant="caption"
                        sx={{ color: exceeded ? 'error.main' : 'success.main', fontWeight: 600 }}
                      >
                        {exceeded ? `Exceeded by ${(count - threshold).toLocaleString()}` : 'Within threshold'}
                      </Typography>
                    </Stack>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Threshold Gauges */}
      {thresholds && (
        <Paper sx={{ p: 2 }} variant="outlined">
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.5 }}>
            <Typography fontWeight={600} variant="subtitle2">
              Threshold Comparison
            </Typography>
            {typeof config?.localCheck === 'boolean' && (
              <Chip
                size="small"
                variant="outlined"
                label={`Local check: ${config.localCheck}`}
                color={config.localCheck ? 'success' : 'default'}
                icon={config.localCheck ? <CheckCircleIcon sx={{ fontSize: 14 }} /> : undefined}
                sx={{ fontWeight: 600, fontSize: '0.7rem' }}
              />
            )}
          </Stack>
          <Stack spacing={1.5}>
            {(['extreme', 'high', 'medium', 'low'] as const).map(severity => {
              const count = severityCounts[severity];
              const limit = thresholds[severity] ?? 0;
              const ratio = limit > 0 ? Math.min((count / limit) * 100, 100) : (count > 0 ? 100 : 0);
              const exceeded = count > limit;
              const color = SEVERITY_COLORS[severity];

              return (
                <Stack key={severity} direction="row" alignItems="center" spacing={2}>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{ width: 70, textTransform: 'capitalize', color }}
                  >
                    {severity}
                  </Typography>
                  <Typography variant="body2" fontWeight={700} sx={{ width: 50, textAlign: 'right' }}>
                    {count.toLocaleString()}
                  </Typography>
                  <Box sx={{ flex: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={ratio}
                      sx={{
                        height: 8,
                        borderRadius: 1,
                        bgcolor: 'action.hover',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: exceeded ? 'error.main' : 'success.main',
                          borderRadius: 1,
                        },
                      }}
                    />
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ width: 90, textAlign: 'right' }}>
                    / {limit.toLocaleString()}
                  </Typography>
                  {exceeded ? (
                    <ErrorIcon sx={{ fontSize: 16, color: 'error.main' }} />
                  ) : (
                    <CheckCircleIcon sx={{ fontSize: 16, color: 'success.main' }} />
                  )}
                </Stack>
              );
            })}
          </Stack>
        </Paper>
      )}

      {/* Severity Filter Bar */}
      <Paper sx={{ p: 1.5 }} variant="outlined">
        <Stack alignItems="center" direction="row" flexWrap="wrap" gap={1}>
          <Stack alignItems="center" direction="row" spacing={0.5} sx={{ mr: 0.5 }}>
            <FilterListIcon fontSize="small" sx={{ color: 'text.secondary' }} />
            <Typography color="text.secondary" fontWeight={600} variant="caption">
              Severity
            </Typography>
          </Stack>
          {([
            { value: 'all' as const, label: 'All', count: filterCounts.all, chipColor: undefined },
            { value: 'extreme' as const, label: 'Extreme', count: filterCounts.extreme, chipColor: SEVERITY_COLORS.extreme },
            { value: 'high' as const, label: 'High', count: filterCounts.high, chipColor: SEVERITY_COLORS.high },
            { value: 'medium' as const, label: 'Medium', count: filterCounts.medium, chipColor: SEVERITY_COLORS.medium },
            { value: 'low' as const, label: 'Low', count: filterCounts.low, chipColor: SEVERITY_COLORS.low },
          ]).map(({ value, label, count, chipColor }) => (
            <Chip
              key={value}
              clickable
              label={`${label} (${count})`}
              onClick={() => setSeverityFilter(value)}
              size="small"
              variant={severityFilter === value ? 'filled' : 'outlined'}
              sx={severityFilter === value && chipColor ? {
                bgcolor: chipColor,
                color: '#fff',
                '&:hover': { bgcolor: chipColor, opacity: 0.9 },
              } : undefined}
            />
          ))}
        </Stack>
      </Paper>

      {/* Cross-Page Rule Summary Table */}
      <Paper variant="outlined">
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography fontWeight={600} variant="subtitle2">
            All Rules ({filteredRules.length})
          </Typography>
        </Box>
        <TableContainer sx={{ maxHeight: 480 }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, bgcolor: 'background.paper' }}>
                  <TableSortLabel
                    active={sortField === 'name'}
                    direction={sortField === 'name' ? sortDir : 'asc'}
                    onClick={() => handleSort('name')}
                  >
                    Rule
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 700, bgcolor: 'background.paper' }}>
                  <TableSortLabel
                    active={sortField === 'severity'}
                    direction={sortField === 'severity' ? sortDir : 'asc'}
                    onClick={() => handleSort('severity')}
                  >
                    Severity
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 700, bgcolor: 'background.paper' }} align="center">
                  <TableSortLabel
                    active={sortField === 'occurrences'}
                    direction={sortField === 'occurrences' ? sortDir : 'desc'}
                    onClick={() => handleSort('occurrences')}
                  >
                    Occurrences
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 700, bgcolor: 'background.paper' }}>Engine Rules</TableCell>
                <TableCell sx={{ fontWeight: 700, bgcolor: 'background.paper' }}>WCAG</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRules.map(rule => (
                <TableRow key={rule.ruleId} hover>
                  <TableCell>
                    <Typography fontWeight={600} variant="body2">
                      {rule.name}
                    </Typography>
                    {rule.description && (
                      <Typography color="text.secondary" sx={{ fontSize: '0.7rem', mt: 0.25 }}>
                        {rule.description}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <SeverityChip severity={rule.severity} />
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight={700} variant="body2">
                      {rule.totalOccurrences.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <EngineRuleChips ruleId={rule.ruleId} />
                  </TableCell>
                  <TableCell>
                    {rule.WCAGLink && rule.WCAGLink !== '-' ? (
                      <Link
                        href={rule.WCAGLink}
                        rel="noopener noreferrer"
                        sx={{ fontSize: '0.75rem' }}
                        target="_blank"
                      >
                        WCAG Link
                      </Link>
                    ) : (
                      <Typography color="text.disabled" variant="caption">—</Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {filteredRules.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Typography color="text.secondary" variant="caption">
                      No rules match the current filter
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Raw audit files */}
      {runId && rawFilenames.length > 0 && (
        <Paper sx={{ p: 2 }} variant="outlined">
          <Typography fontWeight={600} sx={{ mb: 1.5 }} variant="subtitle2">
            Raw audit files (JSONL)
          </Typography>
          <Stack spacing={1}>
            {rawFilenames.map((filename) => (
              <Stack alignItems="center" direction="row" key={filename} spacing={1}>
                <InsertDriveFileIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                <Typography sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }} variant="body2">
                  {filename}
                </Typography>
                <Chip
                  clickable
                  disabled={rawFileLoading === filename}
                  label={rawFileLoading === filename ? 'Loading…' : 'View'}
                  onClick={() => handleViewRawFile(filename)}
                  size="small"
                  variant="outlined"
                />
              </Stack>
            ))}
            {rawFileContent && (
              <Box
                sx={{
                  bgcolor: 'grey.50',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  maxHeight: 360,
                  overflow: 'auto',
                  p: 1.5,
                  mt: 1,
                }}
              >
                <Typography fontWeight={600} sx={{ mb: 1 }} variant="caption">
                  {rawFileContent.filename} ({rawFileContent.lines.length} line
                  {rawFileContent.lines.length !== 1 ? 's' : ''})
                </Typography>
                <Stack spacing={0.5}>
                  {rawFileContent.lines.map((line, idx) => (
                    <Paper
                      key={idx}
                      component="pre"
                      sx={{
                        fontSize: '0.7rem',
                        m: 0,
                        p: 1,
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-all',
                      }}
                      variant="outlined"
                    >
                      {JSON.stringify(line)}
                    </Paper>
                  ))}
                  {rawFileContent.lines.length === 0 && (
                    <Typography color="text.secondary" variant="caption">
                      No audit entries in this file
                    </Typography>
                  )}
                </Stack>
              </Box>
            )}
          </Stack>
        </Paper>
      )}

      {/* Per-page accordions */}
      {filteredPageEntries.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }} variant="outlined">
          <Typography color="text.secondary">
            {pageEntries.length === 0
              ? 'No SDK audit data available for this run'
              : 'No pages match the current severity filter'}
          </Typography>
        </Paper>
      ) : (
        <>
          <Typography fontWeight={600} variant="subtitle2" sx={{ mt: 1 }}>
            Pages ({filteredPageEntries.length})
          </Typography>
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
              <Accordion
                expanded={expandedPage === pageUrl}
                key={pageUrl}
                onChange={(_, expanded) => setExpandedPage(expanded ? pageUrl : false)}
                variant="outlined"
                sx={{
                  borderLeft: 4,
                  borderLeftColor: SEVERITY_COLORS[dominantSeverity],
                  '&::before': { display: 'none' },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="space-between"
                    spacing={1}
                    sx={{ width: '100%', pr: 1 }}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'monospace',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        flex: 1,
                      }}
                    >
                      {pageUrl}
                    </Typography>
                    <Stack direction="row" gap={0.5} alignItems="center" sx={{ flexShrink: 0 }}>
                      {/* Mini severity distribution bar */}
                      {totalForPage > 0 && (
                        <Box sx={{ width: 80, height: 6, borderRadius: 1, overflow: 'hidden', display: 'flex' }}>
                          {(['extreme', 'high', 'medium', 'low'] as const).map(sev => {
                            const c = counts[sev] || 0;
                            if (c === 0) return null;
                            return (
                              <Box
                                key={sev}
                                sx={{
                                  width: `${(c / totalForPage) * 100}%`,
                                  bgcolor: SEVERITY_COLORS[sev],
                                  height: '100%',
                                }}
                              />
                            );
                          })}
                        </Box>
                      )}
                      {counts.extreme ? <SeverityChip severity="extreme" /> : null}
                      {counts.high ? <SeverityChip severity="high" /> : null}
                      {counts.medium ? <SeverityChip severity="medium" /> : null}
                      {counts.low ? <SeverityChip severity="low" /> : null}
                    </Stack>
                  </Stack>
                </AccordionSummary>

                <AccordionDetails sx={{ p: 0 }}>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 700 }}>Rule</TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>Severity</TableCell>
                          <TableCell sx={{ fontWeight: 700 }} align="center">Occurrences</TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>Engine Rules</TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>WCAG</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {violationEntries.map(([ruleId, rule]) => (
                          <RuleRow key={ruleId} rule={rule} ruleId={ruleId} />
                        ))}
                        {violationEntries.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5}>
                              <Typography color="text.secondary" variant="caption">
                                No rule violations found on this page
                              </Typography>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </>
      )}
    </Stack>
  );
}

function RuleRow({ rule, ruleId }: { rule: any; ruleId: string }) {
  const [expanded, setExpanded] = useState(false);
  const severity = rule.severity || 'medium';
  const selectorData = rule.selectorData || [];

  return (
    <>
      <TableRow
        hover
        onClick={() => selectorData.length > 0 && setExpanded(!expanded)}
        sx={{ cursor: selectorData.length > 0 ? 'pointer' : 'default' }}
      >
        <TableCell>
          <Box>
            <Typography fontWeight={600} variant="body2">
              {rule.name || 'Unknown Rule'}
            </Typography>
            {rule.description && (
              <Typography color="text.secondary" sx={{ fontSize: '0.7rem', mt: 0.25 }}>
                {rule.description}
              </Typography>
            )}
          </Box>
        </TableCell>
        <TableCell>
          <SeverityChip severity={severity} />
        </TableCell>
        <TableCell align="center">
          <Typography fontWeight={700} variant="body2">
            {(rule.numberOfOccurrences ?? 0).toLocaleString()}
          </Typography>
        </TableCell>
        <TableCell>
          <EngineRuleChips ruleId={ruleId} />
        </TableCell>
        <TableCell>
          {rule.WCAGLink && rule.WCAGLink !== '-' ? (
            <Link
              href={rule.WCAGLink}
              onClick={(e) => e.stopPropagation()}
              rel="noopener noreferrer"
              sx={{ fontSize: '0.75rem' }}
              target="_blank"
            >
              WCAG Link
            </Link>
          ) : (
            <Typography color="text.disabled" variant="caption">—</Typography>
          )}
        </TableCell>
      </TableRow>

      {expanded && selectorData.length > 0 && (
        <TableRow>
          <TableCell colSpan={5} sx={{ bgcolor: 'action.hover', py: 1.5 }}>
            <Typography fontWeight={600} sx={{ mb: 1, fontSize: '0.75rem' }}>
              Affected Elements ({selectorData.length})
            </Typography>
            <Stack spacing={1}>
              {selectorData.slice(0, 5).map((item: any, idx: number) => (
                <Paper key={idx} sx={{ p: 1.5 }} variant="outlined">
                  {item.HTML && (
                    <Box
                      component="pre"
                      sx={{
                        bgcolor: 'background.default',
                        borderRadius: 1,
                        fontSize: '0.7rem',
                        m: 0,
                        overflow: 'auto',
                        p: 1,
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-all',
                      }}
                    >
                      {item.HTML}
                    </Box>
                  )}
                  {item.suggestionLabel && (
                    <Typography color="primary" sx={{ mt: 0.5, fontSize: '0.7rem' }}>
                      Suggestion: {item.suggestionLabel}
                    </Typography>
                  )}
                </Paper>
              ))}
              {selectorData.length > 5 && (
                <Typography color="text.secondary" variant="caption">
                  …and {selectorData.length - 5} more
                </Typography>
              )}
            </Stack>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
