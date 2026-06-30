import { createTheme } from '@mui/material/styles';
import { MGS, carbonWeave, mgsFonts } from './theme/mgsTokens';

const carbonSurface = (base: string) => ({
  backgroundColor: base,
  backgroundImage: carbonWeave,
});

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: MGS.raidenCyan, dark: MGS.raidenCyanDim, light: MGS.raidenCyanBright },
    secondary: { main: MGS.raidenSilver, dark: '#a8b4be', light: MGS.raidenWhite },
    success: { main: MGS.passGreen },
    error: { main: MGS.alertRed },
    warning: { main: MGS.cautionAmber },
    info: { main: MGS.raidenCyanBright },
    background: { default: MGS.carbonBase, paper: MGS.carbonPanel },
    text: { primary: MGS.textPrimary, secondary: MGS.textSecondary },
    divider: MGS.border,
    action: {
      hover: 'rgba(94, 200, 232, 0.06)',
      selected: MGS.selection,
    },
  },
  shape: { borderRadius: 1 },
  typography: {
    fontFamily: mgsFonts.ui,
    h4: {
      fontFamily: mgsFonts.tactical,
      fontWeight: 600,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: MGS.raidenWhite,
    },
    h5: {
      fontFamily: mgsFonts.tactical,
      fontWeight: 600,
      letterSpacing: '0.04em',
      color: MGS.raidenSilver,
    },
    h6: { fontFamily: mgsFonts.tactical, fontWeight: 600 },
    subtitle2: {
      fontFamily: mgsFonts.tactical,
      fontSize: '0.7rem',
      fontWeight: 500,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: MGS.raidenCyanDim,
    },
    caption: { color: MGS.textMuted, fontFamily: mgsFonts.tactical },
    body2: { color: MGS.textSecondary },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          ...carbonSurface(MGS.carbonBase),
          color: MGS.textPrimary,
        },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0, color: 'transparent' },
      styleOverrides: {
        root: {
          ...carbonSurface(MGS.carbonElevated),
          borderBottom: `1px solid ${MGS.borderCyan}`,
          boxShadow: `inset 0 -1px 0 ${MGS.raidenCyanGlow}, inset 0 1px 0 rgba(255,255,255,0.04)`,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          ...carbonSurface(MGS.carbonSidebar),
          borderRight: `1px solid ${MGS.borderCyan}`,
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          fontFamily: mgsFonts.tactical,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          fontSize: '0.72rem',
        },
        containedPrimary: {
          backgroundColor: MGS.raidenCyanDim,
          color: MGS.carbonBase,
          border: `1px solid ${MGS.raidenCyan}`,
          '&:hover': {
            backgroundColor: MGS.raidenCyan,
            boxShadow: `0 0 12px ${MGS.raidenCyanGlow}`,
          },
        },
        outlined: {
          borderColor: MGS.borderBright,
          color: MGS.raidenSilver,
          '&:hover': {
            borderColor: MGS.raidenCyan,
            backgroundColor: MGS.selection,
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0, variant: 'outlined' },
      styleOverrides: {
        root: {
          ...carbonSurface(MGS.carbonPanel),
          borderColor: MGS.border,
        },
      },
    },
    MuiChip: {
      defaultProps: { size: 'small', variant: 'outlined' },
      styleOverrides: {
        root: { fontFamily: mgsFonts.tactical, fontSize: '0.7rem' },
        outlined: { borderColor: MGS.borderBright, color: MGS.textSecondary },
      },
    },
    MuiTextField: {
      defaultProps: { size: 'small' },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            fontFamily: mgsFonts.tactical,
            backgroundColor: MGS.carbonInput,
            backgroundImage: carbonWeave,
            '& fieldset': { borderColor: MGS.border },
            '&:hover fieldset': { borderColor: MGS.raidenCyanDim },
            '&.Mui-focused fieldset': {
              borderColor: MGS.raidenCyan,
              boxShadow: `0 0 0 1px ${MGS.raidenCyanGlow}`,
            },
          },
          '& .MuiInputLabel-root': { fontFamily: mgsFonts.tactical, color: MGS.textMuted },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderColor: MGS.border, fontFamily: mgsFonts.tactical, fontSize: '0.8rem' },
        head: { color: MGS.raidenCyanDim, fontWeight: 600, letterSpacing: '0.1em' },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: { backgroundColor: MGS.carbonInput },
        bar: {
          backgroundColor: MGS.raidenCyan,
          boxShadow: `0 0 8px ${MGS.raidenCyanGlow}`,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: MGS.selectionStrong,
            borderLeft: `2px solid ${MGS.raidenCyan}`,
            '&:hover': { backgroundColor: MGS.selectionStrong },
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: MGS.raidenCyan,
          height: 2,
          boxShadow: `0 0 6px ${MGS.raidenCyanGlow}`,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: mgsFonts.tactical,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          fontSize: '0.72rem',
          '&.Mui-selected': { color: MGS.raidenCyanBright },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: { color: MGS.textSecondary, '&:hover': { color: MGS.raidenCyan } },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: { fontFamily: mgsFonts.tactical },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { fontFamily: mgsFonts.tactical },
      },
    },
  },
});

export { MGS, mgsFonts, carbonWeave };
