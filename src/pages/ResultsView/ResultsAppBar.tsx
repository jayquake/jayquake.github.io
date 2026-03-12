import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SendIcon from '@mui/icons-material/Send';
import type { Project } from '../../../shared/types';

import ProjectBreadcrumbItem from '../../components/standalone/ProjectBreadcrumbItem';

interface ResultsAppBarProps {
  onNavigateBack: () => void;
  onNavigateToHistory: () => void;
  onNavigateToLibrary?: () => void;
  onProjectChange: (projectId: string) => void;
  onShareToSlack?: () => void;
  projectId?: string;
  projectName?: string;
  projects?: Project[];
  runId: string;
  runStatus: string;
  sendingToSlack?: boolean;
  showSlack?: boolean;
}

const STATUS_COLOR: Record<string, 'default' | 'error' | 'info' | 'success' | 'warning'> = {
  cancelled: 'warning',
  completed: 'success',
  failed: 'error',
  running: 'info',
};

export default function ResultsAppBar({
  onNavigateBack,
  onNavigateToHistory,
  onNavigateToLibrary,
  onProjectChange,
  onShareToSlack,
  projectId,
  projectName,
  projects = [],
  runId,
  runStatus,
  sendingToSlack = false,
  showSlack = false,
}: ResultsAppBarProps) {
  const shortId = runId.substring(0, 8);

  return (
    <AppBar color="default" elevation={1} position="sticky" sx={{ zIndex: t => t.zIndex.appBar }}>
      <Toolbar sx={{ gap: 1, flexWrap: 'wrap', py: 0.5 }}>
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
          {projectId && projectName && (
            <ProjectBreadcrumbItem
              projectId={projectId}
              projectName={projectName}
              projects={projects}
              onProjectChange={onProjectChange}
            />
          )}
          {projectId && onNavigateToLibrary && (
            <Link
              color="inherit"
              onClick={onNavigateToLibrary}
              sx={{ cursor: 'pointer' }}
              underline="hover"
              variant="body2"
            >
              Test Configuration
            </Link>
          )}
          <Typography color="text.primary" fontWeight={600} variant="body2">
            Results &middot; {shortId}
          </Typography>
        </Breadcrumbs>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
          {runStatus && (
            <Chip
              color={STATUS_COLOR[runStatus] ?? 'default'}
              label={runStatus.toUpperCase()}
              size="small"
            />
          )}

          {showSlack && onShareToSlack && (
            <Button
              disabled={sendingToSlack}
              onClick={onShareToSlack}
              size="small"
              startIcon={<SendIcon />}
              variant="outlined"
            >
              {sendingToSlack ? 'Sending…' : 'Share to Slack'}
            </Button>
          )}

          <Button
            onClick={onNavigateToHistory}
            size="small"
            startIcon={<HistoryIcon />}
            variant="outlined"
          >
            History
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
