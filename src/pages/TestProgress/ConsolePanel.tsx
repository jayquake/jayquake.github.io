import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { AnsiConsole } from '../../components/standalone';
import type { RunStatus } from './types';

interface ConsolePanelProps {
  consoleExpanded: boolean;
  consoleOutput: string;
  onToggleExpanded: () => void;
  runStatus: RunStatus;
}

export default function ConsolePanel({
  consoleExpanded,
  consoleOutput,
  onToggleExpanded,
  runStatus,
}: ConsolePanelProps) {
  return (
    <Paper elevation={1} sx={{ overflow: 'hidden' }}>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        sx={{ px: 2, py: 1, borderBottom: consoleExpanded ? 1 : 0, borderColor: 'divider' }}
      >
        <Typography fontWeight={600} variant="subtitle1">
          Console Output
        </Typography>
        <IconButton onClick={onToggleExpanded} size="small" title={consoleExpanded ? 'Collapse' : 'Expand'}>
          {consoleExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Stack>

      <Collapse in={consoleExpanded}>
        <Box sx={{ bgcolor: '#1e1e1e', maxHeight: '40vh', overflowY: 'auto' }}>
          {consoleOutput ? (
            <AnsiConsole output={consoleOutput} />
          ) : (
            <Typography
              color="text.disabled"
              sx={{ p: 2, fontFamily: 'monospace' }}
              variant="body2"
            >
              No output yet…
            </Typography>
          )}
        </Box>

        {runStatus === 'failed' && (
          <Alert severity="warning" sx={{ m: 1 }}>
            Test run failed. Review the console output above for error details.
          </Alert>
        )}
      </Collapse>
    </Paper>
  );
}
