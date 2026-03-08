import { type Project } from '../../../../shared/types';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import BiotechIcon from '@mui/icons-material/Biotech';
import BugReportIcon from '@mui/icons-material/BugReport';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import FilterListIcon from '@mui/icons-material/FilterList';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import WarningIcon from '@mui/icons-material/Warning';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { StepList } from '../../../components/standalone/StepList';
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

export const SummaryTab = ({
  allProjects = [],
  onDebugWithMCP,
  rawResults,
  summary,
  testRun,
}: SummaryTabProps) => {
  const navigate = useNavigate();
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
      <Paper sx={{ p: 6, textAlign: 'center' }} variant="outlined">
        <InsertDriveFileIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
        <Typography gutterBottom variant="h6">
          No Test Results
        </Typography>
        <Typography color="text.secondary" variant="body2">
          No test results are available for this run.
        </Typography>
        <Box
          sx={{ mt: 3, p: 2, bgcolor: 'background.default', borderRadius: 1, textAlign: 'left' }}
        >
          <Typography fontWeight={600} gutterBottom variant="caption">
            Tips:
          </Typography>
          <Stack component="ul" spacing={0.5} sx={{ m: 0, pl: 2 }}>
            {[
              'Check if the test execution completed successfully',
              'Verify that tests were selected and executed',
              'Review test execution logs for more details',
            ].map(tip => (
              <Typography component="li" key={tip} variant="caption">
                {tip}
              </Typography>
            ))}
          </Stack>
        </Box>
      </Paper>
    );
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h6">Test Run Summary</Typography>

      {/* Stats Cards */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Card variant="outlined">
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Typography fontWeight={700} variant="h4">
                {summary.total}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                <InsertDriveFileIcon color="action" fontSize="small" />
                <Typography color="text.secondary" variant="body2">
                  Total Tests
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Card sx={{ borderColor: 'success.light' }} variant="outlined">
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Typography color="success.main" fontWeight={700} variant="h4">
                {summary.passed}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                <CheckCircleIcon color="success" fontSize="small" />
                <Typography color="text.secondary" variant="body2">
                  Passed
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Card sx={{ borderColor: 'error.light' }} variant="outlined">
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Typography color="error.main" fontWeight={700} variant="h4">
                {summary.failed}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                <ErrorIcon color="error" fontSize="small" />
                <Typography color="text.secondary" variant="body2">
                  Failed
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Card sx={{ borderColor: 'warning.light' }} variant="outlined">
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Typography color="warning.main" fontWeight={700} variant="h4">
                {summary.skipped}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                <WarningIcon color="warning" fontSize="small" />
                <Typography color="text.secondary" variant="body2">
                  Skipped
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Pass Rate & Duration */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Paper sx={{ p: 2 }} variant="outlined">
            <Stack alignItems="center" direction="row" justifyContent="space-between">
              <Box>
                <Typography color="text.secondary" fontWeight={600} variant="body2">
                  Pass Rate
                </Typography>
                <Typography fontWeight={700} variant="h5">
                  {passRate}%
                </Typography>
              </Box>
              <Box sx={{ width: 120 }}>
                <LinearProgress
                  color={passRate >= 80 ? 'success' : passRate >= 50 ? 'warning' : 'error'}
                  sx={{ height: 8, borderRadius: 1 }}
                  value={passRate}
                  variant="determinate"
                />
              </Box>
            </Stack>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Paper sx={{ p: 2 }} variant="outlined">
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between">
                <Typography color="text.secondary" fontWeight={600} variant="body2">
                  Total Duration
                </Typography>
                <Typography fontWeight={700} variant="body1">
                  {totalDuration > 0 ? `${(totalDuration / 1000).toFixed(2)}s` : 'N/A'}
                </Typography>
              </Stack>
              {allResults.length > 0 && (
                <Stack direction="row" justifyContent="space-between">
                  <Typography color="text.secondary" variant="caption">
                    Average per test
                  </Typography>
                  <Typography variant="caption">
                    {avgDuration > 0 ? `${(avgDuration / 1000).toFixed(2)}s` : 'N/A'}
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Failed Tests Summary */}
      {failedTests.length > 0 && (
        <Paper
          sx={{ p: 2, borderLeft: 4, borderColor: 'error.main' }}
          variant="outlined"
        >
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <Stack alignItems="center" direction="row" spacing={1}>
              <ErrorIcon color="error" />
              <Typography color="error.main" fontWeight={700} variant="h6">
                {failedTests.length} Failed Test{failedTests.length !== 1 ? 's' : ''}
              </Typography>
            </Stack>
            {onDebugWithMCP && (
              <Button
                onClick={() => onDebugWithMCP(failedTests as TestResult[])}
                size="small"
                startIcon={<BugReportIcon />}
                variant="contained"
              >
                Debug with MCP
              </Button>
            )}
          </Stack>
          <Stack spacing={0.5}>
            {failedTests.slice(0, 5).map((test: any, idx: number) => {
              const project = getProjectForFile(test.file, allProjects);
              return (
                <Stack alignItems="center" direction="row" key={idx} spacing={1}>
                  {project?.logo && (
                    <Tooltip title={project.name}>
                      <Avatar
                        alt={project.name}
                        src={project.logo}
                        sx={{ width: 16, height: 16, flexShrink: 0 }}
                        variant="square"
                      />
                    </Tooltip>
                  )}
                  <Typography variant="body2">
                    <strong>{test.name}</strong>
                    {test.file && (
                      <Typography
                        color="text.secondary"
                        component="span"
                        sx={{ ml: 1 }}
                        variant="caption"
                      >
                        ({test.file.split('/').pop()})
                      </Typography>
                    )}
                  </Typography>
                </Stack>
              );
            })}
            {failedTests.length > 5 && (
              <Typography color="text.secondary" fontStyle="italic" variant="caption">
                … and {failedTests.length - 5} more failed test
                {failedTests.length - 5 !== 1 ? 's' : ''}
              </Typography>
            )}
          </Stack>
        </Paper>
      )}

      {/* Test Results List */}
      {hasResults ? (
        <Stack spacing={2}>
          {/* Filter Bar */}
          <Paper sx={{ p: 1.5 }} variant="outlined">
            <Stack spacing={1.5}>
              {/* Status Filters */}
              <Stack alignItems="center" direction="row" flexWrap="wrap" gap={1}>
                <Stack alignItems="center" direction="row" spacing={0.5} sx={{ mr: 0.5 }}>
                  <FilterListIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                  <Typography color="text.secondary" fontWeight={600} variant="caption">
                    Status
                  </Typography>
                </Stack>
                {(
                  [
                    { label: 'All', value: 'all', count: counts.all, color: undefined },
                    { label: 'Passed', value: 'passed', count: counts.passed, color: 'success' as const },
                    { label: 'Failed', value: 'failed', count: counts.failed, color: 'error' as const },
                    { label: 'Skipped', value: 'skipped', count: counts.skipped, color: 'warning' as const },
                  ] satisfies { color: 'error' | 'success' | 'warning' | undefined; count: number; label: string; value: StatusFilter }[]
                ).map(({ color, count, label, value }) => (
                  <Chip
                    clickable
                    color={statusFilter === value ? (color ?? 'primary') : undefined}
                    key={value}
                    label={`${label} (${count})`}
                    onClick={() => setStatusFilter(value)}
                    size="small"
                    variant={statusFilter === value ? 'filled' : 'outlined'}
                  />
                ))}
              </Stack>

              {/* Project Filters — only rendered when multiple projects are present */}
              {showProjectFilter && (
                <Stack alignItems="center" direction="row" flexWrap="wrap" gap={1}>
                  <Stack alignItems="center" direction="row" spacing={0.5} sx={{ mr: 0.5 }}>
                    <Typography color="text.secondary" fontWeight={600} variant="caption">
                      Project
                    </Typography>
                  </Stack>
                  <Chip
                    clickable
                    color={projectFilter === 'all' ? 'primary' : undefined}
                    label="All projects"
                    onClick={() => setProjectFilter('all')}
                    size="small"
                    variant={projectFilter === 'all' ? 'filled' : 'outlined'}
                  />
                  {activeProjects.map(project => {
                    const isActive = projectFilter === project.id;
                    return (
                      <Chip
                        avatar={
                          <Avatar
                            alt={project.name}
                            src={project.logo}
                            sx={{ bgcolor: 'transparent !important' }}
                          />
                        }
                        clickable
                        color={isActive ? 'primary' : undefined}
                        key={project.id}
                        label={project.name}
                        onClick={() => setProjectFilter(project.id)}
                        size="small"
                        variant={isActive ? 'filled' : 'outlined'}
                      />
                    );
                  })}
                </Stack>
              )}
            </Stack>
          </Paper>

          <Typography color="text.secondary" variant="body2">
            Showing {filteredResults.length} of {allResults.length} test
            {allResults.length !== 1 ? 's' : ''} — {passedTests.length} passed,{' '}
            {failedTests.length} failed, {summary.skipped} skipped
          </Typography>

          {filteredResults.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }} variant="outlined">
              <Typography color="text.secondary" variant="body2">
                No tests match the current filters.
              </Typography>
            </Paper>
          ) : (
            <Box sx={{ maxHeight: 600, overflowY: 'auto' }}>
              <Stack spacing={2}>
                {filteredResults.map((result: any, index: number) => {
                  const isFailed = result.status === 'failed';
                  const isPassed = result.status === 'passed';
                  const project = getProjectForFile(result.file, allProjects);

                  return (
                    <Paper
                      key={index}
                      sx={{
                        p: 2,
                        borderLeft: 4,
                        borderColor: isFailed
                          ? 'error.main'
                          : isPassed
                            ? 'success.main'
                            : 'warning.main',
                      }}
                      variant="outlined"
                    >
                      <Stack
                        alignItems="flex-start"
                        direction="row"
                        justifyContent="space-between"
                        sx={{ mb: 1 }}
                      >
                        <Stack alignItems="center" direction="row" spacing={1} sx={{ flex: 1, minWidth: 0 }}>
                          {/* Project logo */}
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
                          <Chip
                            color={isPassed ? 'success' : isFailed ? 'error' : 'warning'}
                            label={`${isPassed ? '✓' : isFailed ? '✗' : '⊘'} ${result.status}`}
                            size="small"
                            sx={{ flexShrink: 0 }}
                          />
                          <Typography fontWeight={600} noWrap variant="body2">
                            {result.name}
                          </Typography>
                        </Stack>
                        {result.duration && (
                          <Typography color="text.secondary" sx={{ flexShrink: 0, ml: 1 }} variant="caption">
                            ⏱️ {(result.duration / 1000).toFixed(2)}s
                          </Typography>
                        )}
                      </Stack>

                      <Stack alignItems="center" direction="row" spacing={1} sx={{ mb: 1 }}>
                        <Typography color="text.secondary" variant="caption">
                          <code>{result.file?.split('/').slice(-2).join('/') || ''}</code>
                        </Typography>
                        {project && (
                          <Typography color="text.secondary" variant="caption">
                            · {project.name}
                          </Typography>
                        )}
                      </Stack>

                      {isFailed && result.error && (
                        <Alert severity="error" sx={{ mt: 1, mb: 1 }}>
                          <Typography
                            sx={{
                              fontFamily: 'monospace',
                              whiteSpace: 'pre-wrap',
                              maxHeight: 128,
                              overflow: 'auto',
                            }}
                            variant="caption"
                          >
                            {result.error}
                          </Typography>
                          {result.error.length > 500 && (
                            <Typography
                              color="text.secondary"
                              fontStyle="italic"
                              sx={{ mt: 0.5 }}
                              variant="caption"
                            >
                              Error truncated. See Test Details tab for full error.
                            </Typography>
                          )}
                        </Alert>
                      )}

                      {result.steps && result.steps.length > 0 && (
                        <Box sx={{ mt: 1, pt: 1, borderTop: 1, borderColor: 'divider' }}>
                          <Typography color="text.secondary" gutterBottom variant="caption">
                            Test Steps ({result.steps.length})
                          </Typography>
                          <StepList enableFilter maxSteps={5} steps={result.steps} />
                        </Box>
                      )}

                      {isFailed && (
                        <Stack
                          alignItems="center"
                          direction="row"
                          justifyContent="space-between"
                          sx={{ mt: 1, pt: 1, borderTop: 1, borderColor: 'divider' }}
                        >
                          <Typography color="text.secondary" variant="caption">
                            💡 Check the <strong>Test Details</strong> tab for screenshots, videos,
                            and traces
                          </Typography>
                          {onDebugWithMCP && (
                            <Button
                              onClick={() => onDebugWithMCP([result as TestResult])}
                              size="small"
                              startIcon={<BugReportIcon />}
                              sx={{ flexShrink: 0 }}
                              variant="outlined"
                            >
                              Debug
                            </Button>
                          )}
                        </Stack>
                      )}

                      {/* Related engine rules for failed tests */}
                      {isFailed && (() => {
                        const related = getRelatedRules(result.name, result.error);
                        if (related.length === 0) return null;
                        return (
                          <Box sx={{ mt: 1, pt: 1, borderTop: 1, borderColor: 'divider' }}>
                            <Typography color="text.secondary" variant="caption" sx={{ display: 'block', mb: 0.5 }}>
                              Related engine rules:
                            </Typography>
                            <Stack direction="row" spacing={0.5} flexWrap="wrap">
                              {related.map(ruleId => (
                                <Chip
                                  key={ruleId}
                                  label={ruleId}
                                  size="small"
                                  icon={<BiotechIcon />}
                                  onClick={() => navigate(`/engine/${ruleId}`)}
                                  sx={{ fontFamily: 'monospace', fontSize: '0.7rem', cursor: 'pointer', mb: 0.5 }}
                                />
                              ))}
                            </Stack>
                          </Box>
                        );
                      })()}
                    </Paper>
                  );
                })}
              </Stack>
            </Box>
          )}
        </Stack>
      ) : (
        <Paper sx={{ p: 4, textAlign: 'center' }} variant="outlined">
          <InsertDriveFileIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
          <Typography gutterBottom variant="subtitle1">
            Detailed Test Results Not Available
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }} variant="body2">
            Test result details are not available in the database. Check the{' '}
            <strong>Test Details</strong> tab for the full Playwright HTML report with screenshots,
            videos, and traces.
          </Typography>
          <Stack spacing={0.5}>
            <Typography variant="caption">
              📊 <strong>Summary Stats:</strong> {summary.total} total, {summary.passed} passed,{' '}
              {summary.failed} failed, {summary.skipped} skipped
            </Typography>
            {summary.failed > 0 && (
              <Typography color="error" variant="caption">
                ⚠️ {summary.failed} test{summary.failed !== 1 ? 's' : ''} failed — review the Test
                Details tab for error information
              </Typography>
            )}
          </Stack>
        </Paper>
      )}
    </Stack>
  );
};
