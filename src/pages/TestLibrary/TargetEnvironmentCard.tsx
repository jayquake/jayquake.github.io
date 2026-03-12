import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import LockIcon from '@mui/icons-material/Lock';

interface TargetEnvironmentCardProps {
  baseUrl: string;
  httpAuthEnabled: boolean;
  httpAuthPassword: string;
  httpAuthUsername: string;
  isUrlValid: boolean;
  onBaseUrlChange: (url: string) => void;
  onHttpAuthPasswordChange: (v: string) => void;
  onHttpAuthUsernameChange: (v: string) => void;
}

export default function TargetEnvironmentCard({
  baseUrl,
  httpAuthEnabled,
  httpAuthPassword,
  httpAuthUsername,
  isUrlValid,
  onBaseUrlChange,
  onHttpAuthPasswordChange,
  onHttpAuthUsernameChange,
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
