import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import FormControlLabel from '@mui/material/FormControlLabel';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import WarningIcon from '@mui/icons-material/Warning';

import { api } from '../api/client';

type ValidationStatus = 'completed' | 'error' | 'idle' | 'running';

const STATUS_CHIP_COLOR: Record<string, 'default' | 'error' | 'success' | 'warning'> = {
  accurate: 'success',
  mismatch: 'error',
  needs_update: 'warning',
};

const SEVERITY_CHIP_COLOR: Record<string, 'default' | 'error' | 'info' | 'warning'> = {
  critical: 'error',
  major: 'warning',
  minor: 'info',
};

export const ValidationView: React.FC = () => {
  const [suiteId, setSuiteId]           = useState('');
  const [baseUrl, setBaseUrl]           = useState('');
  const [applyApproved, setApplyApproved] = useState(false);
  const [status, setStatus]             = useState<ValidationStatus>('idle');
  const [error, setError]               = useState('');
  const [report, setReport]             = useState<any>(null);

  const running = status === 'running';

  const handleRun = async () => {
    if (!suiteId || !baseUrl) {
      setError('Please provide both Suite ID and Base URL');
      return;
    }
    setStatus('running');
    setError('');
    setReport(null);
    try {
      const result = await api.qase.validationPilot({
        applyApproved,
        baseUrl,
        qaseConfig: { apiToken: process.env.REACT_APP_QASE_API_TOKEN || '', enabled: true, projectCode: 'ACCESSFLOW' },
        suiteId: parseInt(suiteId, 10),
      });
      setReport(result);
      setStatus('completed');
    } catch (err: any) {
      setError(err.message || 'Validation failed');
      setStatus('error');
    }
  };

  const metadata     = report?.validationReport?.metadata;
  const accuracyRate = report?.validationReport?.summary?.accuracyRate ?? 0;
  const cases        = report?.validationReport?.cases ?? [];

  return (
    <Stack spacing={3}>
      {/* Page header */}
      <Box>
        <Typography fontWeight={700} variant="h5">
          UI vs Qase <Box component="span" sx={{ color: 'primary.main' }}>Validation Pilot</Box>
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 0.5 }} variant="body2">
          Validate Qase test cases against live AccessFlow UI using Playwright MCP
        </Typography>
      </Box>

      {/* Config form */}
      <Card variant="outlined">
        <CardContent>
          <Stack spacing={2}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                disabled={running}
                label="Suite ID"
                onChange={e => setSuiteId(e.target.value)}
                placeholder="e.g., 856"
                size="small"
                sx={{ minWidth: 120, flex: '0 0 auto' }}
                value={suiteId}
              />
              <TextField
                disabled={running}
                fullWidth
                label="Base URL"
                onChange={e => setBaseUrl(e.target.value)}
                placeholder="https://mix-p-sdk--accessflow--test.acsb-test.com"
                size="small"
                value={baseUrl}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={applyApproved}
                    disabled={running}
                    onChange={e => setApplyApproved(e.target.checked)}
                    size="small"
                  />
                }
                label={<Typography variant="body2">Auto-apply approved</Typography>}
                sx={{ flexShrink: 0 }}
              />
            </Stack>

            <Button
              disabled={running || !suiteId || !baseUrl}
              fullWidth
              loading={running}
              onClick={handleRun}
              startIcon={<PlayArrowIcon />}
              variant="contained"
            >
              {running ? 'Running Validation…' : 'Run Validation Pilot'}
            </Button>

            {running && <LinearProgress />}
          </Stack>
        </CardContent>
      </Card>

      {/* Error */}
      {error && (
        <Alert onClose={() => setError('')} severity="error">{error}</Alert>
      )}

      {/* Results */}
      {report && (
        <Stack spacing={2}>
          {/* Summary stats */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            {[
              { color: 'text.primary',  icon: <InfoIcon color="info" />,         label: 'Total Cases',   value: metadata?.totalCases ?? 0 },
              { color: 'success.main',  icon: <CheckCircleIcon color="success" />, label: 'Accurate',      value: metadata?.accurateCount ?? 0 },
              { color: 'warning.main',  icon: <WarningIcon color="warning" />,    label: 'Needs Update',  value: metadata?.needsUpdateCount ?? 0 },
              { color: 'error.main',    icon: <ErrorIcon color="error" />,        label: 'Mismatches',    value: metadata?.mismatchCount ?? 0 },
            ].map(s => (
              <Card key={s.label} sx={{ flex: 1 }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: '10px !important' }}>
                  {s.icon}
                  <Box>
                    <Typography color={s.color} fontWeight={700} lineHeight={1} variant="h5">{s.value}</Typography>
                    <Typography color="text.secondary" variant="caption">{s.label}</Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>

          {/* Accuracy bar */}
          <Card variant="outlined">
            <CardContent>
              <Stack alignItems="center" direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography fontWeight={600} variant="subtitle1">Accuracy Rate</Typography>
                <Typography fontWeight={700} variant="subtitle1">{accuracyRate.toFixed(1)}%</Typography>
              </Stack>
              <LinearProgress
                color={accuracyRate >= 80 ? 'success' : accuracyRate >= 50 ? 'warning' : 'error'}
                sx={{ height: 10, borderRadius: 1 }}
                value={accuracyRate}
                variant="determinate"
              />
            </CardContent>
          </Card>

          {/* Details table */}
          {cases.length > 0 && (
            <Paper variant="outlined">
              <Box sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: 'divider' }}>
                <Typography fontWeight={600} variant="subtitle1">Validation Details</Typography>
              </Box>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Case ID</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Evidence</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Confidence</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cases.map((c: any) => (
                      <TableRow hover key={c.caseId}>
                        <TableCell>
                          <Typography fontFamily="monospace" variant="body2">{c.caseId}</Typography>
                        </TableCell>
                        <TableCell>{c.title}</TableCell>
                        <TableCell>
                          <Chip
                            color={STATUS_CHIP_COLOR[c.status] ?? 'default'}
                            label={c.status}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {c.evidence?.length > 0 ? (
                            <Stack direction="row" flexWrap="wrap" spacing={0.5}>
                              {c.evidence.map((ev: any, i: number) => (
                                <Chip
                                  color={SEVERITY_CHIP_COLOR[ev.severity] ?? 'default'}
                                  key={i}
                                  label={`${ev.type} (${ev.severity})`}
                                  size="small"
                                  variant="outlined"
                                />
                              ))}
                            </Stack>
                          ) : (
                            <Typography color="text.secondary" variant="caption">No issues</Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {c.proposedChanges?.confidence
                              ? `${(c.proposedChanges.confidence * 100).toFixed(0)}%`
                              : '—'}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}

          {/* Apply result */}
          {report.applyResult && (
            <Alert severity="success">
              Successfully applied {report.applyResult.appliedOperations?.length ?? 0} updates to Qase
            </Alert>
          )}

          {/* Approval required */}
          {report.approvalRequest && (
            <Alert severity="info">
              {report.approvalRequest.metadata?.lowConfidenceCount ?? 0} low-confidence updates require manual approval.{' '}
              Approval hash: <Box component="code" sx={{ fontFamily: 'monospace', bgcolor: 'action.hover', px: 0.75, borderRadius: 0.5 }}>{report.approvalRequest.hash}</Box>
            </Alert>
          )}
        </Stack>
      )}
    </Stack>
  );
};
