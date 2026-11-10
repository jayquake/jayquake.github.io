/** Shared accent + status (work on light and dark surfaces). */
const accent = {
  raidenCyan: '#00a38d',
  raidenCyanBright: '#0d8f7c',
  raidenCyanDim: '#007a68',
  raidenCyanGlow: 'rgba(0, 163, 141, 0.28)',
  alertRed: '#dc3d3d',
  cautionAmber: '#c97d00',
  passGreen: '#0d9668',
} as const;

/** Light surfaces — stepped contrast between shell zones (default). */
const lightSurfaces = {
  carbonBase: '#f3f4f6',
  carbonMain: '#f3f4f6',
  carbonPanel: '#ffffff',
  carbonElevated: '#ffffff',
  carbonSidebar: '#e8ebef',
  carbonInput: '#ffffff',
  border: '#d4d8de',
  borderBright: '#b8c0ca',
  borderCyan: 'rgba(0, 122, 104, 0.38)',
  textPrimary: '#14171a',
  textSecondary: '#3d4652',
  textMuted: '#6b7585',
  raidenSilver: '#3d4652',
  raidenWhite: '#14171a',
  selection: 'rgba(0, 163, 141, 0.1)',
  selectionStrong: 'rgba(0, 163, 141, 0.16)',
  /** Text on filled primary / status buttons */
  onAccent: '#ffffff',
} as const;

/** Dark carbon HUD — optional alternate palette. */
export const MGSDark = {
  ...accent,
  raidenCyanBright: '#4fd1ed',
  raidenCyanGlow: 'rgba(0, 163, 141, 0.35)',
  raidenSilver: '#d4dce4',
  raidenWhite: '#e8ecef',
  alertRed: '#ff5c5c',
  cautionAmber: '#ffc14d',
  passGreen: '#6ee7b7',
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
  onAccent: '#ffffff',
} as const;

/** Default app palette (light). */
export const MGS = {
  ...accent,
  ...lightSurfaces,
} as const;

/** Subtle weave — sidebar / HUD accents */
export const carbonWeave = `repeating-linear-gradient(
  -45deg,
  transparent,
  transparent 3px,
  rgba(0, 0, 0, 0.028) 3px,
  rgba(0, 0, 0, 0.028) 4px
)`;

export const carbonWeaveDark = `repeating-linear-gradient(
  -45deg,
  transparent,
  transparent 3px,
  rgba(255, 255, 255, 0.012) 3px,
  rgba(255, 255, 255, 0.012) 4px
)`;

export const MIN_TEXT_SIZE = '0.75rem';

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
    color: MGS.raidenCyanDim,
    lineHeight: 1.2,
  },
  tableHead: {
    fontFamily: mgsFonts.display,
    fontSize: MIN_TEXT_SIZE,
    fontWeight: 600,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: MGS.raidenCyanDim,
  },
  ruleId: {
    fontFamily: mgsFonts.hud,
    fontSize: MIN_TEXT_SIZE,
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
    fontSize: MIN_TEXT_SIZE,
    fontWeight: 600,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: MGS.raidenCyanDim,
  },
  navLabel: {
    fontFamily: mgsFonts.display,
    fontSize: MIN_TEXT_SIZE,
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
} as const;
