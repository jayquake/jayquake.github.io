import { CheckCircle2, CircleMinus, AlertCircle } from 'lucide-react';

import { Chip } from '../../components/ui/chip';
import { Progress } from '../../components/ui/progress';
import { cn } from '../../lib/utils';
import type { MonitorState } from './types';

interface RunSummaryBarProps {
  monitorState: MonitorState | null;
}

/* Track + indicator colour per run outcome (the Progress primitive's indicator carries data-slot). */
const PROGRESS_TONE = {
  fail: 'bg-status-fail/20 [&_[data-slot=progress-indicator]]:bg-status-fail',
  pass: 'bg-status-pass/20 [&_[data-slot=progress-indicator]]:bg-status-pass',
  primary: '',
} as const;

export default function RunSummaryBar({ monitorState }: RunSummaryBarProps) {
  if (!monitorState || monitorState.progress.total === 0) return null;

  const { progress, summary } = monitorState;

  const tone: keyof typeof PROGRESS_TONE =
    summary && summary.failed > 0 ? 'fail' : progress.percentage === 100 ? 'pass' : 'primary';

  return (
    <div className="border-b border-border bg-shell-panel px-6 py-3">
      <div className="flex flex-wrap items-center gap-4">
        {/* Progress bar */}
        <div className="min-w-[120px] flex-grow">
          <Progress aria-label="Test run progress" className={cn('rounded', PROGRESS_TONE[tone])} value={progress.percentage} />
        </div>

        {/* Percentage label */}
        <p className="m-0 whitespace-nowrap text-sm text-foreground-secondary">{progress.percentage}%</p>

        {/* Chips */}
        {summary && (
          <>
            <Chip
              className={summary.passed > 0 ? undefined : 'bg-transparent'}
              icon={<CheckCircle2 aria-hidden="true" className="size-3.5" />}
              tone="pass"
            >
              {`${summary.passed} passed`}
            </Chip>
            {summary.failed > 0 && (
              <Chip icon={<AlertCircle aria-hidden="true" className="size-3.5" />} tone="fail">
                {`${summary.failed} failed`}
              </Chip>
            )}
            {summary.skipped > 0 && (
              <Chip className="bg-transparent" icon={<CircleMinus aria-hidden="true" className="size-3.5" />} tone="warn">
                {`${summary.skipped} skipped`}
              </Chip>
            )}
          </>
        )}

        {/* Count */}
        <p className="m-0 whitespace-nowrap text-sm text-foreground-secondary">
          <strong>{progress.completed}</strong>/{progress.total} tests
        </p>
      </div>
    </div>
  );
}
