import type { ReactNode } from 'react';
import { ArrowRight, Gauge, History, ListChecks, Microscope, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { buttonClass } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { cn } from '../lib/utils';

interface ToolAccent {
  icon: string;
  bar: string;
  badge: string;
  hoverBorder: string;
  cta: string;
}

/** Literal class strings so Tailwind can see them. */
const ACCENTS = {
  primary: {
    icon: 'text-primary',
    bar: 'bg-primary',
    badge: 'bg-primary/10 text-primary',
    hoverBorder: 'hover:border-primary focus-within:border-primary',
    cta: 'border-primary text-primary hover:bg-primary/10 hover:text-primary',
  },
  info: {
    icon: 'text-status-info',
    bar: 'bg-status-info',
    badge: 'bg-status-info/10 text-status-info',
    hoverBorder: 'hover:border-status-info focus-within:border-status-info',
    cta: 'border-status-info text-status-info hover:bg-status-info/10 hover:text-status-info',
  },
  pass: {
    icon: 'text-status-pass',
    bar: 'bg-status-pass',
    badge: 'bg-status-pass/10 text-status-pass',
    hoverBorder: 'hover:border-status-pass focus-within:border-status-pass',
    cta: 'border-status-pass text-status-pass hover:bg-status-pass/10 hover:text-status-pass',
  },
  warn: {
    icon: 'text-status-warn',
    bar: 'bg-status-warn',
    badge: 'bg-status-warn/10 text-status-warn',
    hoverBorder: 'hover:border-status-warn focus-within:border-status-warn',
    cta: 'border-status-warn text-status-warn hover:bg-status-warn/10 hover:text-status-warn',
  },
} satisfies Record<string, ToolAccent>;

interface Tool {
  icon: (className: string) => ReactNode;
  title: string;
  description: string;
  badge: string;
  accent: ToolAccent;
  cta: string;
  to: string;
}

const TOOLS: Tool[] = [
  {
    icon: c => <Rocket aria-hidden="true" className={c} />,
    title: 'SDK Test Suites',
    description:
      'Select an AccessFlow SDK project (Node, Python, Java) and run E2E tests with environment targeting, test selection, and audit reporting.',
    badge: 'Node · Python · Java',
    accent: ACCENTS.primary,
    cta: 'Run SDK Tests',
    to: '/test-runner/library',
  },
  {
    icon: c => <Microscope aria-hidden="true" className={c} />,
    title: 'Engine Rule Atomic Tests',
    description:
      'Browse and run pass/fail HTML fixture tests for all 158 engine rules. Filter by impact level, search by rule ID, and deep-link to Rule Lab analysis.',
    badge: '158 rules · 1,288 fixtures',
    accent: ACCENTS.info,
    cta: 'Browse Tests',
    to: '/test-runner/atomic-tests',
  },
  {
    icon: c => <ListChecks aria-hidden="true" className={c} />,
    title: 'Validation',
    description:
      'Run rule validation checks and see structured pass/fail output. Cross-reference results with Qase test cases and export reports.',
    badge: 'Qase integration',
    accent: ACCENTS.pass,
    cta: 'Open Validation',
    to: '/test-runner/validation',
  },
  {
    icon: c => <History aria-hidden="true" className={c} />,
    title: 'Test History',
    description:
      'Browse previous test runs, filter by status, and review detailed results including screenshots, step traces, and error logs.',
    badge: 'All past runs',
    accent: ACCENTS.warn,
    cta: 'View History',
    to: '/test-runner/history',
  },
];

export default function ProjectSelector() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-8 sm:px-8 md:px-12">
      {/* Header */}
      <div className="mb-10 flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <Gauge aria-hidden="true" className="size-10 shrink-0 text-primary" />
          <div>
            <h3 className="m-0 text-5xl font-extrabold leading-[1.1] text-foreground">
              Test Runner <span className="text-primary">Hub</span>
            </h3>
            <p className="m-0 mt-1 text-base text-foreground-secondary">
              Engine rule testing tools — atomic fixtures, validation, and run history
            </p>
          </div>
        </div>
        <Separator className="mt-4" />
      </div>

      {/* Tool cards: the CTA link stretches over the whole card so the card stays clickable. */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {TOOLS.map(tool => (
          <div
            key={tool.to}
            className={cn(
              'relative flex h-full flex-col overflow-hidden rounded-xl border-2 border-border bg-shell-panel transition-all duration-200 hover:-translate-y-1 hover:shadow-lg',
              tool.accent.hoverBorder,
            )}
          >
            <div aria-hidden="true" className={cn('absolute inset-x-0 top-0 h-1', tool.accent.bar)} />
            <div className="flex flex-1 flex-col gap-4 p-6">
              <div>{tool.icon(cn('size-9', tool.accent.icon))}</div>

              <div>
                <h6 className="m-0 mb-1 text-xl font-bold text-foreground">{tool.title}</h6>
                <span
                  className={cn(
                    'mb-3 inline-block rounded px-2 py-0.5 text-[0.75rem] font-semibold',
                    tool.accent.badge,
                  )}
                >
                  {tool.badge}
                </span>
                <p className="m-0 text-sm leading-relaxed text-foreground-secondary">{tool.description}</p>
              </div>

              <Link
                to={tool.to}
                className={buttonClass({
                  variant: 'outline',
                  className: cn(
                    'mt-auto self-start normal-case tracking-normal font-semibold no-underline after:absolute after:inset-0 after:content-[""]',
                    tool.accent.cta,
                  ),
                })}
              >
                {tool.cta}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
