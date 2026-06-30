/** MGS2 Raiden + Cursor IDE — carbon HUD with soft panel contrast. */
export const MGS = {
  /** Cursor-style teal accent */
  raidenCyan: '#00a38d',
  raidenCyanBright: '#4fd1ed',
  raidenCyanDim: '#007a68',
  raidenCyanGlow: 'rgba(0, 163, 141, 0.35)',
  raidenSilver: '#d4dce4',
  raidenWhite: '#e8ecef',
  /** WebStorm-esque surfaces — soft contrast between zones */
  carbonBase: '#0d0d0d',
  carbonMain: '#0d0d0d',
  carbonPanel: '#141414',
  carbonElevated: '#181818',
  carbonSidebar: '#1a1a1a',
  carbonInput: '#101010',
  border: '#2a2a2a',
  borderBright: '#333333',
  borderCyan: 'rgba(0, 163, 141, 0.22)',
  textPrimary: '#e8ecef',
  textSecondary: '#b8c2cc',
  textMuted: '#8f98a3',
  selection: 'rgba(0, 163, 141, 0.1)',
  selectionStrong: 'rgba(0, 163, 141, 0.2)',
  alertRed: '#ff5c5c',
  cautionAmber: '#ffc14d',
  passGreen: '#6ee7b7',
} as const;

/** Subtle carbon weave — sidebar / HUD accents only */
export const carbonWeave = `repeating-linear-gradient(
  -45deg,
  transparent,
  transparent 3px,
  rgba(255, 255, 255, 0.012) 3px,
  rgba(255, 255, 255, 0.012) 4px
)`;

export const mgsFonts = {
  display: '"Rajdhani", "IBM Plex Sans", sans-serif',
  tactical: '"IBM Plex Mono", "SF Mono", Menlo, Consolas, monospace',
  hud: '"IBM Plex Mono", monospace',
  ui: '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, sans-serif',
} as const;

/** Reusable sx presets for Raiden HUD typography */
export const raidenType = {
  pageTitle: {
    fontFamily: mgsFonts.display,
    fontSize: { xs: '0.95rem', sm: '1.05rem' },
    fontWeight: 700,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: MGS.raidenCyan,
    lineHeight: 1.2,
  },
  tableHead: {
    fontFamily: mgsFonts.display,
    fontSize: '0.68rem',
    fontWeight: 600,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: MGS.raidenCyanBright,
  },
  ruleId: {
    fontFamily: mgsFonts.hud,
    fontSize: '0.72rem',
    letterSpacing: '0.04em',
    color: MGS.raidenCyan,
  },
  bodyHud: {
    fontFamily: mgsFonts.ui,
    fontSize: '0.85rem',
    lineHeight: 1.55,
    color: MGS.raidenSilver,
  },
  sectionLabel: {
    fontFamily: mgsFonts.hud,
    fontSize: '0.65rem',
    fontWeight: 600,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: MGS.raidenCyanBright,
  },
  navLabel: {
    fontFamily: mgsFonts.display,
    fontSize: '0.72rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
} as const;
