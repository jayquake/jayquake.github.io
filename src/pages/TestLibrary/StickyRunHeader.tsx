import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Link from '@mui/material/Link';
import type { Project } from '../../../shared/types';
import ProjectBreadcrumbItem from '../../components/standalone/ProjectBreadcrumbItem';

interface StickyRunHeaderProps {
  isSubmitting: boolean;
  onBack: () => void;
  onProjectChange: (projectId: string) => void;
  onRun: () => void;
  projectId: string;
  projectName: string;
  projects: Project[];
  selectedCount: number;
  validUrl: boolean;
}

const STEPS = ['Project', 'Configure', 'Execute', 'Results'];

export default function StickyRunHeader({
  isSubmitting,
  onBack,
  onProjectChange,
  onRun,
  projectId,
  projectName,
  projects,
  selectedCount,
  validUrl,
}: StickyRunHeaderProps) {
  const canRun = selectedCount > 0 && validUrl && !isSubmitting;

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={1}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: 'background.paper' }}
    >
      <Toolbar sx={{ gap: 2, minHeight: { xs: 56, sm: 64 } }}>
        {/* Breadcrumbs */}
        <Breadcrumbs aria-label="breadcrumb" sx={{ flexShrink: 0, mr: 1 }}>
          <Link
            component="button"
            variant="body2"
            underline="hover"
            color="inherit"
            onClick={onBack}
            sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }}
          >
            <HomeIcon sx={{ fontSize: 16 }} />
            Projects
          </Link>

          {/* Project dropdown */}
          <ProjectBreadcrumbItem
            projectId={projectId}
            projectName={projectName}
            projects={projects}
            onProjectChange={onProjectChange}
          />

          <Typography variant="body2" color="text.primary" fontWeight={500}>
            Configure Tests
          </Typography>
        </Breadcrumbs>

        {/* Stepper — centred */}
        <Box sx={{ flex: 1, display: { xs: 'none', md: 'block' } }}>
          <Stepper activeStep={1} alternativeLabel sx={{ '& .MuiStepLabel-label': { fontSize: 11 } }}>
            {STEPS.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Run button */}
        <Button
          variant="contained"
          size="large"
          disabled={!canRun}
          onClick={onRun}
          startIcon={
            isSubmitting ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              <PlayArrowIcon />
            )
          }
          sx={{ flexShrink: 0, fontWeight: 700, minWidth: 160 }}
        >
          {isSubmitting ? 'Starting…' : `Run ${selectedCount} Test${selectedCount !== 1 ? 's' : ''}`}
        </Button>
      </Toolbar>
    </AppBar>
  );
}
