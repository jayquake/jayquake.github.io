import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ReplayIcon from '@mui/icons-material/Replay';
import SignalWifi4BarIcon from '@mui/icons-material/SignalWifi4Bar';
import SignalWifiOffIcon from '@mui/icons-material/SignalWifiOff';
import TableChartIcon from '@mui/icons-material/TableChart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import type { Project } from '../../../shared/types';

import ProjectBreadcrumbItem from '../../components/standalone/ProjectBreadcrumbItem';
import type { RunStatus } from './types';

interface ProgressAppBarProps {
  connected: boolean;
  onCancel: () => void;
  onNavigateBack: () => void;
  onProjectChange: (projectId: string) => void;
  onRetry: () => void;
  onTogglePlaywrightUI?: () => void;
  onViewResults: () => void;
  projectId: string;
  projectName: string;
  projects: Project[];
  runId: string;
  runStatus: RunStatus;
  showPlaywrightUIToggle?: boolean;
  showUIViewer?: boolean;
}

const STATUS_CHIP_COLOR: Record<RunStatus, 'default' | 'error' | 'info' | 'success' | 'warning'> =
  {
    cancelled: 'warning',
    completed: 'success',
    failed: 'error',
    running: 'info',
  };

export default function ProgressAppBar({
  connected,
  onCancel,
  onNavigateBack,
  onProjectChange,
  onRetry,
  onTogglePlaywrightUI,
  onViewResults,
  projectId,
  projectName,
  projects,
  runId,
  runStatus,
  showPlaywrightUIToggle = false,
  showUIViewer = false,
}: ProgressAppBarProps) {
  const shortRunId = runId.substring(0, 8);

  return (
    <AppBar
      color="default"
      elevation={1}
      position="sticky"
      sx={{ zIndex: theme => theme.zIndex.appBar }}
    >
      <Toolbar sx={{ gap: 1, flexWrap: 'wrap', py: 0.5 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{ flexGrow: 1, minWidth: 0 }}
        >
          <Link
            color="inherit"
            onClick={onNavigateBack}
            sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 0.5 }}
            underline="hover"
            variant="body2"
          >
            <HomeIcon sx={{ fontSize: 16 }} />
            Projects
          </Link>
          {projectName && (
            <ProjectBreadcrumbItem
              projectId={projectId}
              projectName={projectName}
              projects={projects}
              onProjectChange={onProjectChange}
            />
          )}
          {projectId && (
            <Link
              color="inherit"
              href={`/run?project=${projectId}`}
              underline="hover"
              variant="body2"
            >
              {projectName ? `${projectName} Test Configuration` : 'Test Configuration'}
            </Link>
          )}
          <Typography color="inherit" variant="body2">
            Test Execution
          </Typography>
          <Typography color="text.primary" variant="body2">
            {shortRunId}
          </Typography>
        </Breadcrumbs>

        {/* Status chips */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
          <Chip
            color={connected ? 'success' : 'error'}
            icon={connected ? <SignalWifi4BarIcon /> : <SignalWifiOffIcon />}
            label={connected ? 'Connected' : 'Disconnected'}
            size="small"
            variant="outlined"
          />
          <Chip
            color={STATUS_CHIP_COLOR[runStatus]}
            icon={
              runStatus === 'completed' ? (
                <CheckCircleIcon />
              ) : runStatus === 'failed' || runStatus === 'cancelled' ? (
                <CancelIcon />
              ) : undefined
            }
            label={runStatus.toUpperCase()}
            size="small"
          />
        </Box>

        {/* Action buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
          {runStatus === 'running' && (
            <Button
              color="error"
              onClick={onCancel}
              size="small"
              startIcon={<CancelIcon />}
              variant="contained"
            >
              Cancel
            </Button>
          )}

          {(runStatus === 'completed' || runStatus === 'failed') && (
            <>
              <Button
                color="primary"
                onClick={onViewResults}
                size="small"
                startIcon={<TableChartIcon />}
                variant="contained"
              >
                View Results
              </Button>
              <Button
                color="inherit"
                onClick={onRetry}
                size="small"
                startIcon={<ReplayIcon />}
                variant="outlined"
              >
                Retry
              </Button>
            </>
          )}

          {showPlaywrightUIToggle && (
            <IconButton
              onClick={onTogglePlaywrightUI}
              size="small"
              title={showUIViewer ? 'Hide Playwright UI' : 'Show Playwright UI'}
            >
              {showUIViewer ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
