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
  textPrimary: '#e0e0e0',
  textSecondary: '#a0a8b0',
  textMuted: '#7a828c',
  selection: 'rgba(0, 163, 141, 0.08)',
  selectionStrong: 'rgba(0, 163, 141, 0.14)',
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
  tactical: '"IBM Plex Mono", "SF Mono", Menlo, Consolas, monospace',
  hud: '"IBM Plex Mono", monospace',
  ui: '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, sans-serif',
} as const;
