/** MGS2 Raiden — carbon suit HUD + tactical network palette. */
export const MGS = {
  raidenCyan: '#5ec8e8',
  raidenCyanBright: '#8ee4ff',
  raidenCyanDim: '#3aa8c8',
  raidenCyanGlow: 'rgba(94, 200, 232, 0.45)',
  raidenSilver: '#d4dce4',
  raidenWhite: '#eef2f6',
  carbonBase: '#0a0a0c',
  carbonPanel: '#111114',
  carbonElevated: '#18181c',
  carbonSidebar: '#0d0d10',
  carbonInput: '#08080a',
  border: '#2a2a32',
  borderBright: '#3a3a44',
  borderCyan: 'rgba(94, 200, 232, 0.28)',
  textPrimary: '#dde3ea',
  textSecondary: '#8a929c',
  textMuted: '#5c636b',
  selection: 'rgba(94, 200, 232, 0.1)',
  selectionStrong: 'rgba(94, 200, 232, 0.18)',
  alertRed: '#ff5c5c',
  cautionAmber: '#ffc14d',
  passGreen: '#6ee7b7',
} as const;

/** Diagonal carbon weave overlay — stack on a solid carbon base color. */
export const carbonWeave = `repeating-linear-gradient(
  -45deg,
  transparent,
  transparent 2px,
  rgba(255, 255, 255, 0.02) 2px,
  rgba(255, 255, 255, 0.02) 3px
), repeating-linear-gradient(
  45deg,
  transparent,
  transparent 2px,
  rgba(255, 255, 255, 0.014) 2px,
  rgba(255, 255, 255, 0.014) 3px
)`;

export const mgsFonts = {
  tactical: '"IBM Plex Mono", "SF Mono", Menlo, Consolas, monospace',
  hud: '"IBM Plex Mono", monospace',
  ui: '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, sans-serif',
} as const;
