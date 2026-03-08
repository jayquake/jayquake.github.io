import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useEffect, useState } from 'react';

type PlaywrightReportTabProps = {
  reportLoading: boolean;
  reportUrl: null | string;
};

export const PlaywrightReportTab = ({ reportLoading, reportUrl }: PlaywrightReportTabProps) => {
  const [iframeLoading, setIframeLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);
  const [normalizedUrl, setNormalizedUrl] = useState<null | string>(null);

  useEffect(() => {
    if (reportUrl) {
      let url = reportUrl;
      if (!url.endsWith('/') && !url.endsWith('/index.html')) {
        url = `${url}/`;
      }
      setNormalizedUrl(url);
      setIframeLoading(true);
      setIframeError(false);
    } else {
      setNormalizedUrl(null);
    }
  }, [reportUrl]);

  const handleOpenInNewTab = () => {
    if (normalizedUrl) window.open(normalizedUrl, '_blank');
  };

  if (reportLoading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 8 }}>
        <Stack alignItems="center" spacing={2}>
          <CircularProgress />
          <Typography color="text.secondary">Loading Playwright HTML report…</Typography>
        </Stack>
      </Box>
    );
  }

  if (!reportUrl || !normalizedUrl) {
    return (
      <Paper sx={{ p: 6, textAlign: 'center' }} variant="outlined">
        <InsertDriveFileIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
        <Typography gutterBottom variant="h6">
          HTML Report Not Available
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }} variant="body2">
          The Playwright HTML report is not available for this test run. The report may not have
          been generated or has been cleaned up.
        </Typography>
        <Box
          sx={{ mt: 3, p: 2, bgcolor: 'background.default', borderRadius: 1, textAlign: 'left' }}
        >
          <Typography fontWeight={600} gutterBottom variant="caption">
            Tips:
          </Typography>
          <Stack component="ul" spacing={0.5} sx={{ m: 0, pl: 2 }}>
            {[
              'Reports are generated automatically after test execution',
              'Check if the test run completed successfully',
              'Reports may be cleaned up after a certain retention period',
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

  if (iframeError) {
    return (
      <Paper sx={{ p: 4 }} variant="outlined">
        <Stack alignItems="center" direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
          <Stack alignItems="center" direction="row" spacing={1}>
            <ErrorOutlineIcon color="error" />
            <Typography variant="h6">Failed to Load Report</Typography>
          </Stack>
          <Button onClick={handleOpenInNewTab} startIcon={<OpenInNewIcon />} variant="contained">
            Open in New Tab
          </Button>
        </Stack>
        <Typography color="text.secondary" variant="body2">
          The HTML report could not be loaded in the embedded viewer. Click "Open in New Tab" to
          view it directly.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={1} sx={{ overflow: 'hidden' }}>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        sx={{ px: 2, py: 1, borderBottom: 1, borderColor: 'divider' }}
      >
        <Typography fontWeight={600} variant="subtitle1">
          Playwright HTML Report
        </Typography>
        <Button
          onClick={handleOpenInNewTab}
          size="small"
          startIcon={<OpenInNewIcon />}
          variant="outlined"
        >
          Open in New Tab
        </Button>
      </Stack>

      <Box sx={{ position: 'relative' }}>
        {iframeLoading && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'background.paper',
              zIndex: 1,
            }}
          >
            <CircularProgress size={32} />
          </Box>
        )}
        <iframe
          onError={() => {
            setIframeLoading(false);
            setIframeError(true);
          }}
          onLoad={() => {
            setIframeLoading(false);
            setIframeError(false);
          }}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          src={normalizedUrl}
          style={{ border: 'none', width: '100%', height: '800px', display: 'block' }}
          title="Playwright HTML Report"
        />
      </Box>
    </Paper>
  );
};
