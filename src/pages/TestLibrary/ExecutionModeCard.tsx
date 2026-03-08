import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Slider from '@mui/material/Slider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import type { ExecutionMode } from './types';

interface ExecutionModeCardProps {
  mode: ExecutionMode;
  onModeChange: (mode: ExecutionMode) => void;
  onSlowMoChange: (value: number) => void;
  onWorkersChange: (value: number) => void;
  slowMo: number;
  workers: number;
}

const SLOW_MO_MARKS = [
  { label: '0', value: 0 },
  { label: '500ms', value: 500 },
  { label: '1s', value: 1000 },
  { label: '2s', value: 2000 },
];

const WORKER_MARKS = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '4', value: 4 },
  { label: '8', value: 8 },
];

export default function ExecutionModeCard({
  mode,
  onModeChange,
  onSlowMoChange,
  onWorkersChange,
  slowMo,
  workers,
}: ExecutionModeCardProps) {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Execution Mode
      </Typography>

      <ToggleButtonGroup
        exclusive
        value={mode}
        onChange={(_, val) => val && onModeChange(val as ExecutionMode)}
        size="small"
        fullWidth
        sx={{ mb: 2.5 }}
      >
        <ToggleButton value="headed" sx={{ gap: 0.75, fontSize: 12 }}>
          <DesktopWindowsIcon fontSize="small" />
          Headed
        </ToggleButton>
        <ToggleButton value="headless" sx={{ gap: 0.75, fontSize: 12 }}>
          <VisibilityOffIcon fontSize="small" />
          Headless
        </ToggleButton>
        <ToggleButton value="ui" sx={{ gap: 0.75, fontSize: 12 }}>
          <PlayCircleOutlineIcon fontSize="small" />
          UI Mode
        </ToggleButton>
      </ToggleButtonGroup>

      {/* Slow Motion */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="caption" color="text.secondary" gutterBottom display="block">
          Slow Motion — {slowMo === 0 ? 'off' : `${slowMo}ms`}
        </Typography>
        <Slider
          value={slowMo}
          onChange={(_, val) => onSlowMoChange(val as number)}
          min={0}
          max={2000}
          step={null}
          marks={SLOW_MO_MARKS}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => (v === 0 ? 'off' : `${v}ms`)}
          size="small"
        />
      </Box>

      {/* Workers */}
      <Box>
        <Typography variant="caption" color="text.secondary" gutterBottom display="block">
          Workers — {workers}
        </Typography>
        <Slider
          value={workers}
          onChange={(_, val) => onWorkersChange(val as number)}
          min={1}
          max={8}
          step={null}
          marks={WORKER_MARKS}
          valueLabelDisplay="auto"
          size="small"
        />
      </Box>
    </Paper>
  );
}
