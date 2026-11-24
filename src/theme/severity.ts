/**
 * Severity family: impact -> label -> colour, defined once.
 * Colours are CSS variables (light/dark aware); `className` uses the Tailwind
 * `severity-*` colours from tailwind.config.js.
 */
export type Impact = 'critical' | 'serious' | 'moderate' | 'minor';

export const IMPACTS: Impact[] = ['critical', 'serious', 'moderate', 'minor'];

export const SEVERITY: Record<Impact, { label: string; color: string; className: string; badgeClassName: string }> = {
  critical: {
    label: 'Critical',
    color: 'hsl(var(--severity-critical))',
    className: 'text-severity-critical',
    badgeClassName: 'border-severity-critical/60 bg-severity-critical/10 text-severity-critical',
  },
  serious: {
    label: 'Serious',
    color: 'hsl(var(--severity-serious))',
    className: 'text-severity-serious',
    badgeClassName: 'border-severity-serious/60 bg-severity-serious/10 text-severity-serious',
  },
  moderate: {
    label: 'Moderate',
    color: 'hsl(var(--severity-moderate))',
    className: 'text-severity-moderate',
    badgeClassName: 'border-severity-moderate/60 bg-severity-moderate/10 text-severity-moderate',
  },
  minor: {
    label: 'Minor',
    color: 'hsl(var(--severity-minor))',
    className: 'text-severity-minor',
    badgeClassName: 'border-severity-minor/60 bg-severity-minor/10 text-severity-minor',
  },
};

/** Unknown impacts fall back to minor. */
export function severityOf(impact: string | null | undefined) {
  const key = String(impact || '').toLowerCase() as Impact;
  return SEVERITY[key] || SEVERITY.minor;
}
