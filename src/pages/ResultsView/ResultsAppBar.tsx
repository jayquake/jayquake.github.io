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
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SendIcon from '@mui/icons-material/Send';
import type { Project } from '../../../shared/types';

import ProjectBreadcrumbItem from '../../components/standalone/ProjectBreadcrumbItem';

interface ResultsAppBarProps {
  onNavigateBack: () => void;
  onNavigateToHistory: () => void;
  onProjectChange: (projectId: string) => void;
  onShareToSlack?: () => void;
  projectId?: string;
  projectName?: string;
  projects?: Project[];
  reportUrl?: null | string;
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
  onProjectChange,
  onShareToSlack,
  projectId,
  projectName,
  projects = [],
  reportUrl,
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
          <Typography color="inherit" variant="body2">
            Results
          </Typography>
          <Typography color="text.primary" variant="body2">
            {shortId}
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

          {reportUrl && (
            <Button
              component="a"
              href={reportUrl}
              rel="noopener noreferrer"
              size="small"
              startIcon={<OpenInNewIcon />}
              target="_blank"
              variant="contained"
            >
              View Report
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
