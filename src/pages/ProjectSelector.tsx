import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BiotechIcon from '@mui/icons-material/Biotech';
import ChecklistIcon from '@mui/icons-material/Checklist';
import HistoryIcon from '@mui/icons-material/History';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SpeedIcon from '@mui/icons-material/Speed';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const TOOLS = [
  {
    icon: <RocketLaunchIcon sx={{ fontSize: 36, color: '#667eea' }} />,
    title: 'SDK Test Suites',
    description:
      'Select an AccessFlow SDK project (Node, Python, Java) and run E2E tests with environment targeting, test selection, and audit reporting.',
    badge: 'Node · Python · Java',
    accent: '#667eea',
    cta: 'Run SDK Tests',
    to: '/test-runner/library',
  },
  {
    icon: <BiotechIcon sx={{ fontSize: 36, color: '#5c6bc0' }} />,
    title: 'Engine Rule Atomic Tests',
    description:
      'Browse and run pass/fail HTML fixture tests for all 158 engine rules. Filter by impact level, search by rule ID, and deep-link to Rule Lab analysis.',
    badge: '158 rules · 1,288 fixtures',
    accent: '#5c6bc0',
    cta: 'Browse Tests',
    to: '/test-runner/atomic-tests',
  },
  {
    icon: <ChecklistIcon sx={{ fontSize: 36, color: '#00897b' }} />,
    title: 'Validation',
    description:
      'Run rule validation checks and see structured pass/fail output. Cross-reference results with Qase test cases and export reports.',
    badge: 'Qase integration',
    accent: '#00897b',
    cta: 'Open Validation',
    to: '/test-runner/validation',
  },
  {
    icon: <HistoryIcon sx={{ fontSize: 36, color: '#f57c00' }} />,
    title: 'Test History',
    description:
      'Browse previous test runs, filter by status, and review detailed results including screenshots, step traces, and error logs.',
    badge: 'All past runs',
    accent: '#f57c00',
    cta: 'View History',
    to: '/test-runner/history',
  },
];

export default function ProjectSelector() {
  const navigate = useNavigate();

  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 6 }, py: 4, maxWidth: 1100, mx: 'auto' }}>
      {/* Header */}
      <Stack spacing={1} sx={{ mb: 5 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <SpeedIcon sx={{ fontSize: 40, color: 'primary.main' }} />
          <Box>
            <Typography fontWeight={800} variant="h3" sx={{ lineHeight: 1.1 }}>
              Test Runner{' '}
              <Box component="span" sx={{ color: 'primary.main' }}>
                Hub
              </Box>
            </Typography>
            <Typography color="text.secondary" variant="body1" sx={{ mt: 0.5 }}>
              Engine rule testing tools — atomic fixtures, validation, and run history
            </Typography>
          </Box>
        </Stack>
        <Divider sx={{ mt: 2 }} />
      </Stack>

      {/* Tool cards */}
      <Grid container spacing={3}>
        {TOOLS.map(tool => (
          <Grid size={{ xs: 12, md: 4 }} key={tool.to}>
            <Card
              onClick={() => navigate(tool.to)}
              elevation={0}
              sx={{
                height: '100%',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                border: '2px solid',
                borderColor: 'rgba(0,0,0,0.06)',
                transition: 'all 0.2s ease',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  borderColor: tool.accent,
                  boxShadow: `0 8px 28px ${tool.accent}28`,
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: tool.accent,
                },
              }}
            >
              <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>{tool.icon}</Box>

                <Box>
                  <Typography fontWeight={700} variant="h6" sx={{ mb: 0.5 }}>
                    {tool.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'inline-block',
                      mb: 1.5,
                      px: 1,
                      py: 0.25,
                      borderRadius: 1,
                      background: `${tool.accent}18`,
                      color: tool.accent,
                      fontWeight: 600,
                    }}
                  >
                    {tool.badge}
                  </Typography>
                  <Typography color="text.secondary" variant="body2" sx={{ lineHeight: 1.6 }}>
                    {tool.description}
                  </Typography>
                </Box>

                <Button
                  endIcon={<ArrowForwardIcon />}
                  onClick={e => { e.stopPropagation(); navigate(tool.to); }}
                  sx={{
                    mt: 'auto',
                    alignSelf: 'flex-start',
                    textTransform: 'none',
                    fontWeight: 600,
                    color: tool.accent,
                    borderColor: tool.accent,
                    '&:hover': { borderColor: tool.accent, background: `${tool.accent}10` },
                  }}
                  variant="outlined"
                >
                  {tool.cta}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
