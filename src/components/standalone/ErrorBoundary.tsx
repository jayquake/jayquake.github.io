import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AlertCircleIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import ReloadIcon from '@mui/icons-material/RestartAlt';
import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

type State = {
  error: Error | null;
  hasError: boolean;
};

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null, hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { error, hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ error: null, hasError: false });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3 }}>
          <Card sx={{ maxWidth: 640, width: '100%' }} variant="outlined">
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <AlertCircleIcon color="error" sx={{ fontSize: 36, flexShrink: 0, mt: 0.5 }} />
                <Box flex={1}>
                  <Typography fontWeight={700} gutterBottom variant="h5">
                    Something went wrong
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    {this.state.error?.message || 'An unexpected error occurred'}
                  </Typography>

                  {process.env.NODE_ENV === 'development' && this.state.error && (
                    <Box
                      component="details"
                      sx={{ mb: 2, '& summary': { cursor: 'pointer', fontSize: '0.8rem', color: 'text.secondary', mb: 1 } }}
                    >
                      <summary>Error details</summary>
                      <Box
                        component="pre"
                        sx={{
                          p: 2,
                          bgcolor: 'grey.900',
                          borderRadius: 1,
                          fontSize: '0.72rem',
                          fontFamily: 'monospace',
                          color: 'error.main',
                          overflow: 'auto',
                        }}
                      >
                        {this.state.error.stack}
                      </Box>
                    </Box>
                  )}

                  <Stack direction="row" spacing={1.5}>
                    <Button onClick={this.handleReset} startIcon={<RefreshIcon />} variant="contained">
                      Try again
                    </Button>
                    <Button onClick={() => window.location.reload()} startIcon={<ReloadIcon />} variant="outlined">
                      Reload page
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      );
    }

    return this.props.children;
  }
}
