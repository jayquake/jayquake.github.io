import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary:    { main: '#0066FF', dark: '#0052CC', light: '#3385FF' },
    success:    { main: '#10B981' },
    error:      { main: '#EF4444' },
    warning:    { main: '#F59E0B' },
    info:       { main: '#3B82F6' },
    background: { default: '#FAFAFA', paper: '#FFFFFF' },
    text:       { primary: '#1F2937', secondary: '#6B7280' },
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  components: {
    MuiButton:    { defaultProps: { disableElevation: true } },
    MuiPaper:     { defaultProps: { variant: 'outlined' } },
    MuiTextField: { defaultProps: { size: 'small' } },
    MuiChip:      { defaultProps: { size: 'small' } },
  },
});
