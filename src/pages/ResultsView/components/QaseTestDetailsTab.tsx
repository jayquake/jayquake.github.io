import { type RefObject, useMemo } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import FileSearchIcon from '@mui/icons-material/ManageSearch';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import AutoIcon from '@mui/icons-material/SmartToy';
import ManualIcon from '@mui/icons-material/PersonOutline';
import StepsIcon from '@mui/icons-material/ListAlt';

import { QaseTestCaseCard } from '../../../components/standalone/QaseTestCaseCard';
import { type TestRunData } from '../models/TestRunData';

type QaseTestDetailsTabProps = {
  onFilterChange: (status: 'all' | 'automated' | 'manual') => void;
  onRefresh: () => void;
  onSearchChange: (term: string) => void;
  qaseDataSource?: 'cache' | 'database' | 'empty';
  qaseFilterStatus: 'all' | 'automated' | 'manual';
  qaseLastFetched?: null | string;
  qaseProjectCode: string;
  qaseResults?: any[];
  qaseSearchTerm: string;
  qaseTestCases: Map<number, any>;
  qaseTestCasesLoading: boolean;
  searchInputRef?: RefObject<HTMLInputElement>;
  testRun: null | TestRunData;
};

const SOURCE_COLOR: Record<string, 'default' | 'error' | 'info' | 'success' | 'warning'> = {
  cache: 'info',
  database: 'success',
  empty: 'warning',
};

const SOURCE_LABEL: Record<string, string> = {
  cache: 'Memory Cache',
  database: 'Database',
  empty: 'No Data',
};

function formatTimeAgo(ts: null | string): string {
  if (!ts) return '';
  const diff = Date.now() - new Date(ts).getTime();
  const m = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  if (h < 24) return `${h}h ago`;
  return `${d}d ago`;
}

export const QaseTestDetailsTab = ({
  onFilterChange,
  onRefresh,
  onSearchChange,
  qaseDataSource = 'empty',
  qaseFilterStatus,
  qaseLastFetched,
  qaseProjectCode,
  qaseResults,
  qaseSearchTerm,
  qaseTestCases,
  qaseTestCasesLoading,
  searchInputRef,
  testRun,
}: QaseTestDetailsTabProps) => {
  const filteredCases = useMemo(() => {
    let cases = Array.from(qaseTestCases.entries());
    if (qaseSearchTerm) {
      const q = qaseSearchTerm.toLowerCase();
      cases = cases.filter(([, tc]) =>
        tc.title?.toLowerCase().includes(q) ||
        tc.description?.toLowerCase().includes(q) ||
        tc.id.toString().includes(q) ||
        tc.suite?.title?.toLowerCase().includes(q)
      );
    }
    if (qaseFilterStatus === 'automated') cases = cases.filter(([, tc]) => tc.automation > 0);
    else if (qaseFilterStatus === 'manual') cases = cases.filter(([, tc]) => tc.automation === 0);
    return cases;
  }, [qaseTestCases, qaseSearchTerm, qaseFilterStatus]);

  const stats = useMemo(() => {
    const all = Array.from(qaseTestCases.values());
    return {
      automated: all.filter((tc: any) => tc.automation > 0).length,
      manual: all.filter((tc: any) => tc.automation === 0).length,
      total: all.length,
      withSteps: all.filter((tc: any) => tc.steps?.length > 0).length,
    };
  }, [qaseTestCases]);

  const getTestResultForQaseId = (qaseId: number) => {
    if (testRun?.results) return testRun.results.find((r: any) => r.qaseId === qaseId);
    if (qaseResults) {
      const item = qaseResults.find((i: any) => i.result?.qaseId === qaseId || i.qaseTestCase?.id === qaseId);
      return item?.result;
    }
    return null;
  };

  if (qaseTestCasesLoading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 8 }}>
        <Stack alignItems="center" spacing={2}>
          <CircularProgress />
          <Typography color="text.secondary">Fetching test cases from Qase…</Typography>
        </Stack>
      </Box>
    );
  }

  return (
    <Stack spacing={3}>
      {/* Header */}
      <Stack alignItems={{ sm: 'center' }} direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={1}>
        <Box>
          <Stack alignItems="center" direction="row" spacing={1} sx={{ mb: 0.5 }}>
            <FileSearchIcon color="action" />
            <Typography fontWeight={700} variant="h6">Qase Test Cases</Typography>
          </Stack>
          <Typography color="text.secondary" variant="body2">
            Test cases automatically loaded from test results
          </Typography>
        </Box>
        <Stack alignItems="center" direction="row" spacing={1} flexShrink={0} flexWrap="wrap">
          <Chip
            color={SOURCE_COLOR[qaseDataSource] ?? 'default'}
            label={SOURCE_LABEL[qaseDataSource] ?? 'Unknown'}
            size="small"
          />
          {qaseLastFetched && qaseDataSource === 'database' && (
            <Typography color="text.secondary" variant="caption">
              Last synced: {formatTimeAgo(qaseLastFetched)}
            </Typography>
          )}
          {qaseProjectCode && (
            <Chip label={`Project: ${qaseProjectCode}`} size="small" variant="outlined" />
          )}
          <Button
            disabled={qaseTestCasesLoading || !qaseProjectCode}
            onClick={onRefresh}
            size="small"
            startIcon={<RefreshIcon />}
            variant="outlined"
          >
            {qaseTestCasesLoading ? 'Fetching…' : 'Refresh'}
          </Button>
        </Stack>
      </Stack>

      {/* Stats strip */}
      {stats.total > 0 && (
        <Stack direction="row" flexWrap="wrap" spacing={2}>
          {[
            { icon: <FileSearchIcon />, label: 'Total', value: stats.total },
            { icon: <AutoIcon />, label: 'Automated', value: stats.automated },
            { icon: <ManualIcon />, label: 'Manual', value: stats.manual },
            { icon: <StepsIcon />, label: 'With Steps', value: stats.withSteps },
          ].map(stat => (
            <Card key={stat.label} sx={{ minWidth: 100 }} variant="outlined">
              <CardContent sx={{ p: '12px !important' }}>
                <Typography fontWeight={700} variant="h5">{stat.value}</Typography>
                <Typography color="text.secondary" variant="caption">{stat.label}</Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}

      {/* Search + filter */}
      {qaseTestCases.size > 0 && (
        <Stack alignItems="center" direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          <TextField
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
            inputRef={searchInputRef}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Search by title, description, or ID… (/ to focus)"
            size="small"
            sx={{ flex: 1 }}
            value={qaseSearchTerm}
          />
          <ToggleButtonGroup
            exclusive
            onChange={(_, v) => { if (v) onFilterChange(v); }}
            size="small"
            value={qaseFilterStatus}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="automated">Automated</ToggleButton>
            <ToggleButton value="manual">Manual</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      )}

      {/* Cases list */}
      {qaseTestCases.size === 0 ? (
        <Paper sx={{ p: 6, textAlign: 'center' }} variant="outlined">
          <FileSearchIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
          <Typography gutterBottom variant="h6">No Qase Test Cases Found</Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }} variant="body2">
            {!testRun || !testRun.hasResults()
              ? 'No test results available for this run.'
              : 'No test cases with Qase IDs were found in the test results.'}
          </Typography>
          <Box sx={{ mt: 2, p: 2, bgcolor: 'background.default', borderRadius: 1, textAlign: 'left' }}>
            <Typography fontWeight={600} gutterBottom variant="caption">Tips:</Typography>
            <Stack component="ul" spacing={0.5} sx={{ m: 0, pl: 2 }}>
              {(!qaseProjectCode
                ? ['Project code not available. Check Qase configuration.']
                : [
                    'Test cases are automatically loaded from test results',
                    'Make sure tests are annotated with Qase IDs',
                    'Check Qase API configuration if test cases are not loading',
                  ]
              ).map(tip => (
                <Typography component="li" key={tip} variant="caption">{tip}</Typography>
              ))}
            </Stack>
          </Box>
          {qaseProjectCode && (
            <Button onClick={onRefresh} size="small" sx={{ mt: 3 }} variant="contained">
              Try Fetching Again
            </Button>
          )}
        </Paper>
      ) : filteredCases.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }} variant="outlined">
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            No test cases match your search criteria
          </Typography>
          <Button onClick={() => { onSearchChange(''); onFilterChange('all'); }} size="small" variant="outlined">
            Clear Filters
          </Button>
        </Paper>
      ) : (
        <Stack spacing={2} sx={{ maxHeight: 600, overflowY: 'auto', pr: 0.5 }}>
          {filteredCases.map(([id, testCase]) => {
            const testResult = getTestResultForQaseId(id);
            return (
              <QaseTestCaseCard
                compact={false}
                key={id}
                testCase={testCase}
                testResult={testResult ? { duration: testResult.duration, error: testResult.error, status: testResult.status } : undefined}
              />
            );
          })}
          {filteredCases.length < qaseTestCases.size && (
            <Typography align="center" color="text.secondary" variant="caption">
              Showing {filteredCases.length} of {qaseTestCases.size} test cases
            </Typography>
          )}
        </Stack>
      )}
    </Stack>
  );
};
