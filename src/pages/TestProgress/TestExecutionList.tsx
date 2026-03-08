import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import SkipNextIcon from '@mui/icons-material/SkipNext';

import type { MonitorState, ParsedTestResult, RunStatus, TestResultItem, TestStep } from './types';

interface TestExecutionListProps {
  consoleOutput?: string;
  monitorState: MonitorState | null;
  onSelectTest: (index: number | null) => void;
  runStatus: RunStatus;
  selectedTestIndex: number | null;
  testResults: ParsedTestResult[];
  testUpdates: unknown[];
}

function StatusIcon({
  isRunning,
  status,
}: {
  isRunning?: boolean;
  status: string;
}) {
  if (isRunning || status === 'running') {
    return <CircularProgress size={16} />;
  }
  if (status === 'passed') {
    return <CheckCircleIcon color="success" fontSize="small" />;
  }
  if (status === 'failed' || status === 'timedOut') {
    return <CancelIcon color="error" fontSize="small" />;
  }
  if (status === 'skipped') {
    return <SkipNextIcon color="warning" fontSize="small" />;
  }
  return <RadioButtonUncheckedIcon color="disabled" fontSize="small" />;
}

function StepTimeline({ steps }: { steps: TestStep[] }) {
  if (!steps || steps.length === 0) return null;

  return (
    <List dense disablePadding>
      {steps.map((step, i) => (
        <ListItem disablePadding key={i} sx={{ py: 0.25 }}>
          <ListItemIcon sx={{ minWidth: 28 }}>
            <StatusIcon status={step.status ?? 'pending'} />
          </ListItemIcon>
          <ListItemText
            primary={step.title}
            primaryTypographyProps={{
              variant: 'caption',
              color: step.status === 'failed' ? 'error.main' : 'text.secondary',
              noWrap: true,
            }}
            secondary={step.duration ? `${step.duration}ms` : undefined}
            secondaryTypographyProps={{ variant: 'caption' }}
          />
        </ListItem>
      ))}
    </List>
  );
}

function TestRow({
  error,
  file,
  index,
  isExpanded,
  isRunning,
  name,
  onToggle,
  status,
  steps,
  subtitle,
}: {
  error?: string;
  file?: string;
  index: number;
  isExpanded: boolean;
  isRunning?: boolean;
  name: string;
  onToggle: (index: number) => void;
  status: string;
  steps?: TestStep[];
  subtitle?: string;
}) {
  const isFailed = status === 'failed' || status === 'timedOut';
  const chipColor: 'default' | 'error' | 'info' | 'success' | 'warning' =
    status === 'passed'
      ? 'success'
      : isFailed
        ? 'error'
        : isRunning || status === 'running'
          ? 'info'
          : status === 'skipped'
            ? 'warning'
            : 'default';

  return (
    <Accordion
      disableGutters
      elevation={0}
      expanded={isExpanded}
      onChange={() => onToggle(index)}
      sx={{
        border: 1,
        borderColor: isFailed ? 'error.light' : 'divider',
        borderRadius: 1,
        mb: 1,
        '&:before': { display: 'none' },
        bgcolor: isFailed ? 'error.50' : 'background.paper',
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 2, py: 0.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1, minWidth: 0 }}>
          <StatusIcon isRunning={isRunning} status={status} />
          <Chip
            color={chipColor}
            label={isRunning ? 'Running' : status}
            size="small"
            sx={{ flexShrink: 0 }}
          />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              color={isFailed ? 'error.main' : 'text.primary'}
              noWrap
              variant="body2"
            >
              {name}
            </Typography>
            {(file || subtitle) && (
              <Typography color="text.secondary" noWrap variant="caption">
                {file || subtitle}
              </Typography>
            )}
          </Box>
        </Box>
      </AccordionSummary>

      <AccordionDetails sx={{ pt: 0, pb: 1, px: 2 }}>
        {steps && steps.length > 0 && (
          <>
            <StepTimeline steps={steps} />
            <Divider sx={{ my: 1 }} />
          </>
        )}
        {isFailed && error && (
          <Alert severity="error" sx={{ mt: 0.5 }}>
            <pre
              style={{
                fontSize: '0.75rem',
                margin: 0,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
              }}
            >
              {error}
            </pre>
          </Alert>
        )}
        {!steps?.length && !error && (
          <Typography color="text.secondary" variant="caption">
            No step details available.
          </Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
}

export default function TestExecutionList({
  consoleOutput = '',
  monitorState,
  onSelectTest,
  runStatus,
  selectedTestIndex,
  testResults,
  testUpdates,
}: TestExecutionListProps) {
  const handleToggle = (index: number) => {
    onSelectTest(selectedTestIndex === index ? null : index);
  };

  const hasConsoleOutput = consoleOutput.trim().length > 0;

  // Prefer final report results over live data
  if (testResults.length > 0) {
    return (
      <Paper elevation={0} sx={{ p: 2 }}>
        <Typography gutterBottom variant="h6">
          Test Execution
        </Typography>
        <Box sx={{ maxHeight: '50vh', overflowY: 'auto' }}>
          {testResults.map((r, i) => (
            <TestRow
              error={r.error}
              file={r.file}
              index={i}
              isExpanded={selectedTestIndex === i}
              key={r.id || i}
              name={r.title ?? r.name ?? 'Unknown test'}
              onToggle={handleToggle}
              status={r.status}
              steps={r.steps}
              subtitle={r.duration ? `${(r.duration / 1000).toFixed(1)}s` : undefined}
            />
          ))}
        </Box>
      </Paper>
    );
  }

  // Live updates from monitor
  if (monitorState && monitorState.tests.length > 0) {
    return (
      <Paper elevation={0} sx={{ p: 2 }}>
        <Typography gutterBottom variant="h6">
          Test Execution
        </Typography>
        <Box sx={{ maxHeight: '50vh', overflowY: 'auto' }}>
          {monitorState.tests.map((test: TestResultItem, i: number) => (
            <TestRow
              error={test.error}
              file={test.file}
              index={i}
              isExpanded={selectedTestIndex === i}
              isRunning={test.isRunning}
              key={i}
              name={test.name}
              onToggle={handleToggle}
              status={test.status}
              steps={test.steps}
              subtitle={test.formattedDuration}
            />
          ))}
        </Box>
      </Paper>
    );
  }

  // Run finished but results not in DB yet — show a deterministic loading bar
  const isRunDone = runStatus === 'completed' || runStatus === 'failed' || runStatus === 'cancelled';
  if (isRunDone) {
    return (
      <Paper elevation={0} sx={{ p: 2 }}>
        <Typography gutterBottom variant="h6">
          Test Execution
        </Typography>
        <Box sx={{ py: 1 }}>
          <LinearProgress sx={{ borderRadius: 1, mb: 1.5 }} />
          <Typography color="text.secondary" variant="body2">
            Finalising results — this takes a few seconds…
          </Typography>
        </Box>
      </Paper>
    );
  }

  // Waiting / initialising state
  return (
    <Paper elevation={0} sx={{ p: 2 }}>
      <Typography gutterBottom variant="h6">
        Test Execution
      </Typography>

      {hasConsoleOutput ? (
        /* Console is streaming — show animated "in-progress" indicator */
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5 }}>
          <CircularProgress size={18} thickness={5} />
          <Box>
            <Typography color="text.primary" variant="body2">
              Test run in progress — parsing output…
            </Typography>
            <Typography color="text.secondary" variant="caption">
              Individual test cards will appear as results are detected in the console.
            </Typography>
          </Box>
        </Box>
      ) : testUpdates.length > 0 ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5 }}>
          <CircularProgress size={18} thickness={5} />
          <Typography color="text.secondary" variant="body2">
            Processing test events…
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5 }}>
          <CircularProgress size={18} thickness={5} color="inherit" />
          <Typography color="text.secondary" variant="body2">
            Waiting for tests to start…
          </Typography>
        </Box>
      )}
    </Paper>
  );
}
