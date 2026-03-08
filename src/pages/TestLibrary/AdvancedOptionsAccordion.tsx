import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TuneIcon from '@mui/icons-material/Tune';

import type { QaseConfig } from '../../../shared/types';

interface AdvancedOptionsAccordionProps {
  httpAuthPassword: string;
  httpAuthUsername: string;
  onHttpAuthPasswordChange: (v: string) => void;
  onHttpAuthUsernameChange: (v: string) => void;
  onQaseConfigChange: (config: QaseConfig) => void;
  onQaseEnabledChange: (enabled: boolean) => void;
  qaseConfig: QaseConfig;
  qaseEnabled: boolean;
  showHttpAuth: boolean;
}

export default function AdvancedOptionsAccordion({
  httpAuthPassword,
  httpAuthUsername,
  onHttpAuthPasswordChange,
  onHttpAuthUsernameChange,
  onQaseConfigChange,
  onQaseEnabledChange,
  qaseConfig,
  qaseEnabled,
  showHttpAuth,
}: AdvancedOptionsAccordionProps) {
  return (
    <Accordion disableGutters elevation={0} sx={{ border: 1, borderColor: 'divider', borderRadius: 1, '&:before': { display: 'none' } }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TuneIcon fontSize="small" color="action" />
          <Typography variant="subtitle2">Advanced Options</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Stack gap={2}>
          {/* Qase section */}
          <Box>
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={qaseEnabled}
                  onChange={(e) => onQaseEnabledChange(e.target.checked)}
                />
              }
              label={<Typography variant="body2">Report to Qase</Typography>}
            />

            {qaseEnabled && (
              <Stack gap={1.5} sx={{ mt: 1.5 }}>
                <TextField
                  size="small"
                  fullWidth
                  label="Qase API Token"
                  type="password"
                  value={qaseConfig.apiToken}
                  onChange={(e) =>
                    onQaseConfigChange({ ...qaseConfig, apiToken: e.target.value })
                  }
                />
                <Stack direction="row" gap={1}>
                  <TextField
                    size="small"
                    label="Project Code"
                    value={qaseConfig.projectCode}
                    onChange={(e) =>
                      onQaseConfigChange({ ...qaseConfig, projectCode: e.target.value })
                    }
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    size="small"
                    label="Environment"
                    value={qaseConfig.environment || ''}
                    onChange={(e) =>
                      onQaseConfigChange({ ...qaseConfig, environment: e.target.value })
                    }
                    sx={{ flex: 1 }}
                  />
                </Stack>
              </Stack>
            )}
          </Box>

          {/* HTTP auth override (shown when not auto-detected) */}
          {showHttpAuth && (
            <Box>
              <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                HTTP Basic Auth Override
              </Typography>
              <Stack direction="row" gap={1}>
                <TextField
                  size="small"
                  label="Username"
                  value={httpAuthUsername}
                  onChange={(e) => onHttpAuthUsernameChange(e.target.value)}
                  sx={{ flex: 1 }}
                />
                <TextField
                  size="small"
                  label="Password"
                  type="password"
                  value={httpAuthPassword}
                  onChange={(e) => onHttpAuthPasswordChange(e.target.value)}
                  sx={{ flex: 1 }}
                />
              </Stack>
            </Box>
          )}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
