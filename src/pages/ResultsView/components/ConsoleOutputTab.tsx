import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import { AnsiConsole } from '../../../components/standalone/AnsiConsole';
import { type ConsoleOutput } from '../models/ConsoleOutput';

type ConsoleOutputTabProps = {
  output: ConsoleOutput;
};

export const ConsoleOutputTab = ({ output }: ConsoleOutputTabProps) => {
  const outputText = output.getCombinedOutput();
  const errorLines = output.getErrorLines();
  const hasErrors = errorLines.length > 0;

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
  };

  if (!output.hasOutput()) {
    return (
      <Paper sx={{ p: 6, textAlign: 'center' }} variant="outlined">
        <InsertDriveFileIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
        <Typography gutterBottom variant="h6">
          No Console Output
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }} variant="body2">
          No output available for this test run. Output may not have been captured.
        </Typography>
        <Box
          sx={{ mt: 3, p: 2, bgcolor: 'background.default', borderRadius: 1, textAlign: 'left' }}
        >
          <Typography fontWeight={600} gutterBottom variant="caption">
            Tips:
          </Typography>
          <Stack component="ul" spacing={0.5} sx={{ m: 0, pl: 2 }}>
            {[
              'Check if the test execution completed successfully',
              'Verify that stdout/stderr capture is enabled',
              'Review test execution logs for more details',
            ].map(tip => (
              <Typography component="li" key={tip} variant="caption">
                {tip}
              </Typography>
            ))}
          </Stack>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper elevation={1} sx={{ overflow: 'hidden' }}>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        sx={{ px: 2, py: 1, borderBottom: 1, borderColor: 'divider', flexWrap: 'wrap', gap: 1 }}
      >
        <Typography fontWeight={600} variant="subtitle1">
          Console Output
        </Typography>
        <Stack alignItems="center" direction="row" spacing={1}>
          {hasErrors && <Chip color="error" label="Contains Errors" size="small" />}
          {output.stdout && <Chip color="info" label="Stdout Available" size="small" />}
          <Typography color="text.secondary" variant="caption">
            {output.getCharacterCount()} chars, {output.getLineCount()} lines
          </Typography>
          <Button
            onClick={handleCopy}
            size="small"
            startIcon={<ContentCopyIcon />}
            variant="outlined"
          >
            Copy
          </Button>
        </Stack>
      </Stack>

      <Box sx={{ bgcolor: '#1e1e1e', maxHeight: '60vh', overflowY: 'auto' }}>
        <AnsiConsole output={outputText} />
      </Box>

      {hasErrors && (
        <Alert severity="error" sx={{ m: 1 }}>
          {errorLines.length} error line{errorLines.length !== 1 ? 's' : ''} detected
        </Alert>
      )}
    </Paper>
  );
};
