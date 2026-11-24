/**
 * App palette as CSS variable references, so every consumer follows the
 * light/dark theme (tokens live in src/index.css under :root / [data-theme]).
 * Do not append hex alpha to these values; use `hsl(var(--x) / a)` or Tailwind `/a`.
 */
const v = (name: string, alpha?: number) => (alpha === undefined ? `hsl(var(--${name}))` : `hsl(var(--${name}) / ${alpha})`);

export const MGS = {
  raidenCyan: v('primary'),
  raidenCyanBright: v('primary-bright'),
  raidenCyanDim: v('primary-dim'),
  raidenCyanGlow: v('primary', 0.28),
  alertRed: v('status-fail'),
  cautionAmber: v('status-warn'),
  passGreen: v('status-pass'),
  carbonBase: v('shell-main'),
  carbonMain: v('shell-main'),
  carbonPanel: v('shell-panel'),
  carbonElevated: v('shell-elevated'),
  carbonSidebar: v('shell-sidebar'),
  carbonInput: v('shell-input'),
  border: v('border-default'),
  borderBright: v('border-strong'),
  borderCyan: v('primary-dim', 0.38),
  textPrimary: v('text-primary'),
  textSecondary: v('text-secondary'),
  textMuted: v('text-muted'),
  raidenSilver: v('text-secondary'),
  raidenWhite: v('text-primary'),
  selection: v('primary', 0.1),
  selectionStrong: v('primary', 0.16),
  /** Text on filled primary / status buttons */
  onAccent: v('on-accent'),
} as const;

/** Subtle weave — sidebar / HUD accents */
export const carbonWeave = `repeating-linear-gradient(
  -45deg,
  transparent,
  transparent 3px,
  rgba(0, 0, 0, 0.028) 3px,
  rgba(0, 0, 0, 0.028) 4px
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
