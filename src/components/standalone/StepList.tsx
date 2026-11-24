import type { TestStep } from '../../../shared/types';

import { AlertCircle, CheckCircle2, ChevronDown, ChevronUp, XCircle } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Button } from '../ui/button';
import { Chip } from '../ui/chip';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { cn } from '../../lib/utils';

type FilterType = 'all' | 'failed' | 'passed';

type StepListProps = {
  enableFilter?: boolean;
  maxSteps?: number;
  steps: TestStep[];
};

export const StepList = ({ enableFilter = false, maxSteps, steps }: StepListProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredSteps = useMemo(() => {
    if (filter === 'all') return steps;
    return steps.filter(step => step.status === filter);
  }, [steps, filter]);

  const displayedSteps = useMemo(() => {
    if (!maxSteps || isExpanded) return filteredSteps;
    return filteredSteps.slice(0, maxSteps);
  }, [filteredSteps, maxSteps, isExpanded]);

  const remainingCount = maxSteps ? filteredSteps.length - maxSteps : 0;

  if (steps.length === 0) {
    return <p className="m-0 py-6 text-center text-sm text-foreground-secondary">No steps available</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Chip className="bg-transparent" tone="info">{`${filteredSteps.length} steps`}</Chip>
          {filter !== 'all' && (
            <span className="text-xs text-foreground-secondary">(filtered from {steps.length} total)</span>
          )}
        </div>

        {enableFilter && (
          <ToggleGroup
            onValueChange={v => { if (v) setFilter(v as FilterType); }}
            type="single"
            value={filter}
          >
            <ToggleGroupItem value="all">All</ToggleGroupItem>
            <ToggleGroupItem className="text-status-pass data-[state=on]:text-status-pass" value="passed">Passed</ToggleGroupItem>
            <ToggleGroupItem className="text-status-fail data-[state=on]:text-status-fail" value="failed">Failed</ToggleGroupItem>
          </ToggleGroup>
        )}
      </div>

      {/* Steps */}
      <ul className="m-0 flex list-none flex-col gap-2 p-0">
        {displayedSteps.map((step, index) => {
          const isPassed = step.status === 'passed';
          const isFailed = step.status === 'failed';

          return (
            <li
              className={cn(
                'rounded border p-3',
                isFailed ? 'border-status-fail bg-status-fail/5' : 'border-border bg-shell-panel'
              )}
              key={index}
            >
              <div className="flex items-start gap-3">
                {isPassed ? (
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 size-[18px] shrink-0 text-status-pass" />
                ) : (
                  <XCircle aria-hidden="true" className="mt-0.5 size-[18px] shrink-0 text-status-fail" />
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className={cn('m-0 text-sm font-medium', isFailed ? 'text-status-fail' : 'text-foreground')}>
                      {step.title}
                    </p>
                    {step.duration !== undefined && step.duration > 0 && (
                      <span className="whitespace-nowrap text-xs text-foreground-secondary">
                        {(step.duration / 1000).toFixed(2)}s
                      </span>
                    )}
                  </div>

                  {isFailed && step.error && (
                    <div className="mt-2 flex items-start gap-1 rounded border border-status-fail/60 bg-status-fail/5 p-2">
                      <AlertCircle aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-status-fail" />
                      <span className="font-mono text-xs text-status-fail">{step.error}</span>
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Expand / collapse */}
      {maxSteps && filteredSteps.length > maxSteps && (
        <div className="flex justify-center">
          <Button onClick={() => setIsExpanded(!isExpanded)} size="sm" variant="ghost">
            {isExpanded ? (
              <ChevronUp aria-hidden="true" className="size-4" />
            ) : (
              <ChevronDown aria-hidden="true" className="size-4" />
            )}
            {isExpanded ? 'Show Less' : `Show All (${remainingCount} more steps)`}
          </Button>
        </div>
      )}
    </div>
  );
};
