import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import type { MonitorState } from './types';

interface RunSummaryBarProps {
  monitorState: MonitorState | null;
}

export default function RunSummaryBar({ monitorState }: RunSummaryBarProps) {
  if (!monitorState || monitorState.progress.total === 0) return null;

  const { progress, summary } = monitorState;

  return (
    <Paper elevation={0} sx={{ px: 3, py: 1.5, borderRadius: 0, borderBottom: 1, borderColor: 'divider' }}>
      <Stack alignItems="center" direction="row" spacing={2} useFlexGap flexWrap="wrap">
        {/* Progress bar */}
        <Box sx={{ flexGrow: 1, minWidth: 120 }}>
          <LinearProgress
            color={
              summary && summary.failed > 0
                ? 'error'
                : progress.percentage === 100
                  ? 'success'
                  : 'primary'
            }
            sx={{ borderRadius: 1, height: 8 }}
            value={progress.percentage}
            variant="determinate"
          />
        </Box>

        {/* Percentage label */}
        <Typography color="text.secondary" noWrap variant="body2">
          {progress.percentage}%
        </Typography>

        {/* Chips */}
        {summary && (
          <>
            <Chip
              color="success"
              icon={<CheckCircleOutlineIcon />}
              label={`${summary.passed} passed`}
              size="small"
              variant={summary.passed > 0 ? 'filled' : 'outlined'}
            />
            {summary.failed > 0 && (
              <Chip
                color="error"
                icon={<ErrorOutlineIcon />}
                label={`${summary.failed} failed`}
                size="small"
              />
            )}
            {summary.skipped > 0 && (
              <Chip
                color="warning"
                icon={<DoNotDisturbOnIcon />}
                label={`${summary.skipped} skipped`}
                size="small"
                variant="outlined"
              />
            )}
          </>
        )}

        {/* Count */}
        <Typography color="text.secondary" noWrap variant="body2">
          <strong>{progress.completed}</strong>/{progress.total} tests
        </Typography>
      </Stack>
    </Paper>
  );
}
