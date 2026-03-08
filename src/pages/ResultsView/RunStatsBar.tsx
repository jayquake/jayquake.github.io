import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import ListAltIcon from '@mui/icons-material/ListAlt';
import WarningIcon from '@mui/icons-material/Warning';

interface RunStatsBarProps {
  failed: number;
  passed: number;
  passRate: number;
  skipped: number;
  total: number;
}

export default function RunStatsBar({ failed, passed, passRate, skipped, total }: RunStatsBarProps) {
  const progressColor: 'error' | 'success' | 'warning' =
    passRate >= 80 ? 'success' : passRate >= 50 ? 'warning' : 'error';

  return (
    <Box sx={{ px: 2, py: 2 }}>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Card variant="outlined">
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Typography fontWeight={700} variant="h4">
                {total}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                <ListAltIcon color="action" fontSize="small" />
                <Typography color="text.secondary" variant="body2">
                  Total
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 6, sm: 3 }}>
          <Card sx={{ borderColor: 'success.light' }} variant="outlined">
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Typography color="success.main" fontWeight={700} variant="h4">
                {passed}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                <CheckCircleIcon color="success" fontSize="small" />
                <Typography color="text.secondary" variant="body2">
                  Passed
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 6, sm: 3 }}>
          <Card sx={{ borderColor: 'error.light' }} variant="outlined">
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Typography color="error.main" fontWeight={700} variant="h4">
                {failed}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                <ErrorIcon color="error" fontSize="small" />
                <Typography color="text.secondary" variant="body2">
                  Failed
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 6, sm: 3 }}>
          <Card sx={{ borderColor: 'warning.light' }} variant="outlined">
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Typography color="warning.main" fontWeight={700} variant="h4">
                {skipped}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                <WarningIcon color="warning" fontSize="small" />
                <Typography color="text.secondary" variant="body2">
                  Skipped
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography color="text.secondary" sx={{ whiteSpace: 'nowrap' }} variant="body2">
          Pass Rate
        </Typography>
        <LinearProgress
          color={progressColor}
          sx={{ flex: 1, height: 8, borderRadius: 1 }}
          value={passRate}
          variant="determinate"
        />
        <Chip color={progressColor} label={`${passRate}%`} size="small" />
      </Box>
    </Box>
  );
}
