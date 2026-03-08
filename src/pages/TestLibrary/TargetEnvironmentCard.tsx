import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import LockIcon from '@mui/icons-material/Lock';
import RefreshIcon from '@mui/icons-material/Refresh';

import type { DeployedEnv } from './types';

interface TargetEnvironmentCardProps {
  baseUrl: string;
  deployedEnvs: DeployedEnv[];
  envsLoading: boolean;
  httpAuthEnabled: boolean;
  httpAuthPassword: string;
  httpAuthUsername: string;
  isUrlValid: boolean;
  onBaseUrlChange: (url: string) => void;
  onHttpAuthPasswordChange: (v: string) => void;
  onHttpAuthUsernameChange: (v: string) => void;
  onRefreshEnvs: () => void;
  onSelectEnv: (domain: string) => void;
}

export default function TargetEnvironmentCard({
  baseUrl,
  deployedEnvs,
  envsLoading,
  httpAuthEnabled,
  httpAuthPassword,
  httpAuthUsername,
  isUrlValid,
  onBaseUrlChange,
  onHttpAuthPasswordChange,
  onHttpAuthUsernameChange,
  onRefreshEnvs,
  onSelectEnv,
}: TargetEnvironmentCardProps) {
  const hasUrl = baseUrl.trim().length > 0;

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Target Environment
      </Typography>

      {/* URL input */}
      <TextField
        fullWidth
        size="small"
        label="Base URL"
        placeholder="https://example.com"
        value={baseUrl}
        onChange={(e) => onBaseUrlChange(e.target.value)}
        error={hasUrl && !isUrlValid}
        helperText={hasUrl && !isUrlValid ? 'Enter a valid URL (e.g., https://example.com)' : undefined}
        InputProps={{
          endAdornment: hasUrl ? (
            <InputAdornment position="end">
              {isUrlValid ? (
                <CheckCircleOutlineIcon fontSize="small" color="success" />
              ) : (
                <ErrorOutlineIcon fontSize="small" color="error" />
              )}
            </InputAdornment>
          ) : null,
        }}
        sx={{ mb: 1.5 }}
      />

      {/* Deployed envs */}
      {deployedEnvs.length > 0 && (
        <Box sx={{ mb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <Typography variant="caption" color="text.secondary" sx={{ flex: 1 }}>
              Deployed environments ({deployedEnvs.length})
            </Typography>
            <Tooltip title="Refresh environments">
              <IconButton size="small" onClick={onRefreshEnvs} disabled={envsLoading}>
                {envsLoading ? <CircularProgress size={14} /> : <RefreshIcon fontSize="small" />}
              </IconButton>
            </Tooltip>
          </Box>
          <Stack direction="row" flexWrap="wrap" gap={0.5}>
            {deployedEnvs.map((env) => {
              const isActive = baseUrl === env.domain || baseUrl === `https://${env.domain}`;
              return (
                <Chip
                  key={env.domain}
                  label={env.branch || env.domain}
                  size="small"
                  variant={isActive ? 'filled' : 'outlined'}
                  color={isActive ? 'primary' : 'default'}
                  onClick={() => onSelectEnv(env.domain)}
                  title={env.domain}
                />
              );
            })}
          </Stack>
        </Box>
      )}

      {deployedEnvs.length === 0 && !envsLoading && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
          <Typography variant="caption" color="text.secondary">
            No deployed environments found
          </Typography>
          <Tooltip title="Refresh environments">
            <IconButton size="small" onClick={onRefreshEnvs}>
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      {/* HTTP auth (auto-reveal for acsb-test.com) */}
      <Collapse in={httpAuthEnabled}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
          <LockIcon fontSize="small" color="warning" />
          <Typography variant="caption" color="warning.main" fontWeight={500}>
            HTTP Basic Auth required
          </Typography>
        </Box>
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
      </Collapse>
    </Paper>
  );
}
