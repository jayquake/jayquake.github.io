import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

interface PlaywrightUIPanelProps {
  onHide: () => void;
  proxyUrl: string;
  runId: string;
}

export default function PlaywrightUIPanel({ onHide, proxyUrl, runId }: PlaywrightUIPanelProps) {
  const handleOpenInNew = () => {
    fetch(`http://localhost:3000/api/playwright-ui/${runId}`)
      .then(res => res.json())
      .then(data => {
        if (data.url) {
          window.open(data.url, '_blank');
        }
      })
      .catch(() => {
        window.open('http://localhost:9323', '_blank');
      });
  };

  return (
    <Paper elevation={2} sx={{ overflow: 'hidden' }}>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        sx={{ px: 2, py: 1, borderBottom: 1, borderColor: 'divider' }}
      >
        <Box>
          <Typography fontWeight={600} variant="subtitle1">
            Playwright UI Mode
          </Typography>
          <Typography color="text.secondary" variant="caption">
            Interactive test inspector embedded in app
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button
            onClick={handleOpenInNew}
            size="small"
            startIcon={<OpenInNewIcon />}
            variant="outlined"
          >
            Open in New Window
          </Button>
          <IconButton onClick={onHide} size="small" title="Hide Playwright UI">
            <CloseIcon />
          </IconButton>
        </Stack>
      </Stack>

      <Box sx={{ height: 700, position: 'relative', bgcolor: 'background.default' }}>
        <iframe
          onError={() => {
            console.error('Failed to load Playwright UI in iframe');
          }}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
          src={proxyUrl}
          style={{ border: 'none', height: '100%', width: '100%' }}
          title="Playwright UI"
        />
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: 'background.paper',
            opacity: 0.9,
            borderRadius: 1,
            px: 1,
            py: 0.5,
          }}
        >
          <Typography
            component="button"
            onClick={handleOpenInNew}
            sx={{
              background: 'none',
              border: 'none',
              color: 'primary.main',
              cursor: 'pointer',
              fontSize: '0.75rem',
              '&:hover': { textDecoration: 'underline' },
            }}
            variant="caption"
          >
            Open Full Screen →
          </Typography>
        </Box>
      </Box>

      <Typography color="text.secondary" sx={{ px: 2, py: 1 }} variant="caption">
        💡 The Playwright UI is embedded via proxy. If it doesn't load, try "Open in New Window"
        above.
      </Typography>
    </Paper>
  );
}
