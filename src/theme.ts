import { createTheme } from '@mui/material/styles';
import { MGS, carbonWeave, mgsFonts } from './theme/mgsTokens';

const sidebarSurface = {
  backgroundColor: MGS.carbonSidebar,
  backgroundImage: carbonWeave,
};

const mainSurface = {
  backgroundColor: MGS.carbonMain,
};

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: MGS.raidenCyan, dark: MGS.raidenCyanDim, light: MGS.raidenCyanBright },
    secondary: { main: MGS.raidenSilver, dark: '#a8b4be', light: MGS.raidenWhite },
    success: { main: MGS.passGreen },
    error: { main: MGS.alertRed },
    warning: { main: MGS.cautionAmber },
    info: { main: MGS.raidenCyanBright },
    background: { default: MGS.carbonMain, paper: MGS.carbonSidebar },
    text: { primary: MGS.textPrimary, secondary: MGS.textSecondary },
    divider: MGS.border,
    action: {
      hover: 'rgba(0, 163, 141, 0.06)',
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
          ...mainSurface,
          color: MGS.textPrimary,
        },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0, color: 'transparent' },
      styleOverrides: {
        root: {
          backgroundColor: MGS.carbonElevated,
          borderBottom: `1px solid ${MGS.borderCyan}`,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          ...sidebarSurface,
          borderRight: `1px solid ${MGS.border}`,
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
          color: MGS.raidenWhite,
          border: `1px solid ${MGS.raidenCyan}`,
          '&:hover': {
            backgroundColor: MGS.raidenCyan,
            boxShadow: `0 0 10px ${MGS.raidenCyanGlow}`,
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
          backgroundColor: MGS.carbonPanel,
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
        root: {
          borderColor: MGS.border,
          fontFamily: mgsFonts.tactical,
          fontSize: '0.8rem',
        },
        head: { color: MGS.raidenCyanBright, fontWeight: 600, letterSpacing: '0.1em' },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: { backgroundColor: MGS.carbonInput },
        bar: { backgroundColor: MGS.raidenCyan },
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
        indicator: { backgroundColor: MGS.raidenCyan, height: 2 },
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
