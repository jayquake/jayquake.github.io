import { AlertTriangle, CheckCircle2, List, XCircle } from 'lucide-react';

import { Chip } from '../../components/ui/chip';
import { Progress } from '../../components/ui/progress';
import { cn } from '../../lib/utils';

interface RunStatsBarProps {
  failed: number;
  passed: number;
  passRate: number;
  skipped: number;
  total: number;
}

type ProgressTone = 'fail' | 'pass' | 'warn';

const PROGRESS_CLASSES: Record<ProgressTone, string> = {
  fail: 'bg-status-fail/20 [&>[data-slot=progress-indicator]]:bg-status-fail',
  pass: 'bg-status-pass/20 [&>[data-slot=progress-indicator]]:bg-status-pass',
  warn: 'bg-status-warn/20 [&>[data-slot=progress-indicator]]:bg-status-warn',
};

const StatCard = ({
  borderClassName,
  icon,
  label,
  value,
  valueClassName,
}: {
  borderClassName: string;
  icon: React.ReactNode;
  label: string;
  value: number;
  valueClassName: string;
}) => (
  <div className={cn('border bg-shell-panel p-4', borderClassName)}>
    <h4 className={cn('m-0 text-[2.125rem] font-bold leading-tight', valueClassName)}>{value}</h4>
    <div className="mt-1 flex items-center gap-1">
      {icon}
      <p className="m-0 text-sm text-foreground-secondary">{label}</p>
    </div>
  </div>
);

export default function RunStatsBar({ failed, passed, passRate, skipped, total }: RunStatsBarProps) {
  const progressColor: ProgressTone =
    passRate >= 80 ? 'pass' : passRate >= 50 ? 'warn' : 'fail';

  return (
    <div className="p-4">
      <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard
          borderClassName="border-border"
          icon={<List aria-hidden="true" className="size-4 text-foreground-secondary" />}
          label="Total"
          value={total}
          valueClassName="text-foreground"
        />
        <StatCard
          borderClassName="border-status-pass/60"
          icon={<CheckCircle2 aria-hidden="true" className="size-4 text-status-pass" />}
          label="Passed"
          value={passed}
          valueClassName="text-status-pass"
        />
        <StatCard
          borderClassName="border-status-fail/60"
          icon={<XCircle aria-hidden="true" className="size-4 text-status-fail" />}
          label="Failed"
          value={failed}
          valueClassName="text-status-fail"
        />
        <StatCard
          borderClassName="border-status-warn/60"
          icon={<AlertTriangle aria-hidden="true" className="size-4 text-status-warn" />}
          label="Skipped"
          value={skipped}
          valueClassName="text-status-warn"
        />
      </div>

      <div className="flex items-center gap-4">
        <p className="m-0 whitespace-nowrap text-sm text-foreground-secondary">Pass Rate</p>
        <Progress
          aria-label="Pass Rate"
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={passRate}
          className={cn('h-2 flex-1 rounded', PROGRESS_CLASSES[progressColor])}
          value={passRate}
        />
        <Chip tone={progressColor}>{`${passRate}%`}</Chip>
      </div>
    </div>
  );
}
