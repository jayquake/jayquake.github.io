import { CheckCircle2, ChevronDown, Circle, SkipForward, XCircle } from 'lucide-react';
import type { ReactNode } from 'react';

import { Alert } from '../../components/ui/alert';
import { Chip, type ChipTone } from '../../components/ui/chip';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../components/ui/collapsible';
import { Separator } from '../../components/ui/separator';
import { Spinner } from '../../components/ui/spinner';
import { cn } from '../../lib/utils';
import type { MonitorState, ParsedTestResult, RunStatus, TestResultItem, TestStep } from './types';

interface TestExecutionListProps {
  consoleOutput?: string;
  monitorState: MonitorState | null;
  onSelectTest: (index: number | null) => void;
  runStatus: RunStatus;
  selectedTestIndex: number | null;
  testResults: ParsedTestResult[];
  testUpdates: unknown[];
}

function StatusIcon({
  isRunning,
  status,
}: {
  isRunning?: boolean;
  status: string;
}) {
  if (isRunning || status === 'running') {
    return <Spinner className="size-4 shrink-0" />;
  }
  if (status === 'passed') {
    return <CheckCircle2 aria-hidden="true" className="size-5 shrink-0 text-status-pass" />;
  }
  if (status === 'failed' || status === 'timedOut') {
    return <XCircle aria-hidden="true" className="size-5 shrink-0 text-status-fail" />;
  }
  if (status === 'skipped') {
    return <SkipForward aria-hidden="true" className="size-5 shrink-0 text-status-warn" />;
  }
  return <Circle aria-hidden="true" className="size-5 shrink-0 text-foreground-muted" />;
}

function StepTimeline({ steps }: { steps: TestStep[] }) {
  if (!steps || steps.length === 0) return null;

  return (
    <ul className="m-0 list-none p-0">
      {steps.map((step, i) => (
        <li className="flex items-center py-0.5" key={i}>
          <span className="flex w-7 shrink-0 items-center">
            <StatusIcon status={step.status ?? 'pending'} />
          </span>
          <span className="min-w-0 flex-1 py-1">
            <span
              className={cn(
                'block truncate text-xs',
                step.status === 'failed' ? 'text-status-fail' : 'text-foreground-secondary'
              )}
            >
              {step.title}
            </span>
            {step.duration ? (
              <span className="block text-xs text-foreground-secondary">{`${step.duration}ms`}</span>
            ) : null}
          </span>
        </li>
      ))}
    </ul>
  );
}

function TestRow({
  error,
  file,
  index,
  isExpanded,
  isRunning,
  name,
  onToggle,
  status,
  steps,
  subtitle,
}: {
  error?: string;
  file?: string;
  index: number;
  isExpanded: boolean;
  isRunning?: boolean;
  name: string;
  onToggle: (index: number) => void;
  status: string;
  steps?: TestStep[];
  subtitle?: string;
}) {
  const isFailed = status === 'failed' || status === 'timedOut';
  const chipTone: ChipTone =
    status === 'passed'
      ? 'pass'
      : isFailed
        ? 'fail'
        : isRunning || status === 'running'
          ? 'info'
          : status === 'skipped'
            ? 'warn'
            : 'default';

  return (
    <Collapsible
      className={cn(
        'mb-2 rounded border',
        isFailed ? 'border-status-fail/60 bg-status-fail/5' : 'border-border bg-shell-panel'
      )}
      onOpenChange={() => onToggle(index)}
      open={isExpanded}
    >
      <h3 className="m-0 text-base font-normal">
        <CollapsibleTrigger className="group flex w-full cursor-pointer items-center gap-3 border-0 bg-transparent px-4 py-2 text-left text-inherit hover:bg-hover/5">
          <span className="flex min-w-0 flex-1 items-center gap-3">
            <StatusIcon isRunning={isRunning} status={status} />
            <Chip className="shrink-0" tone={chipTone}>
              {isRunning ? 'Running' : status}
            </Chip>
            <span className="min-w-0 flex-1">
              <span
                className={cn('block truncate text-sm', isFailed ? 'text-status-fail' : 'text-foreground')}
              >
                {name}
              </span>
              {(file || subtitle) && (
                <span className="block truncate text-xs text-foreground-secondary">{file || subtitle}</span>
              )}
            </span>
          </span>
          <ChevronDown
            aria-hidden="true"
            className="size-5 shrink-0 text-foreground-secondary transition-transform group-data-[state=open]:rotate-180"
          />
        </CollapsibleTrigger>
      </h3>

      <CollapsibleContent className="px-4 pb-2">
        {steps && steps.length > 0 && (
          <>
            <StepTimeline steps={steps} />
            <Separator className="my-2" />
          </>
        )}
        {isFailed && error && (
          <Alert className="mt-1" variant="error">
            <pre
              style={{
                fontSize: '0.75rem',
                margin: 0,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
              }}
            >
              {error}
            </pre>
          </Alert>
        )}
        {!steps?.length && !error && (
          <span className="text-xs text-foreground-secondary">No step details available.</span>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}

function ListPanel({ children }: { children: ReactNode }) {
  return (
    <section className="bg-shell-panel p-4">
      <h6 className="m-0 mb-2 text-xl font-medium text-foreground">Test Execution</h6>
      {children}
    </section>
  );
}

export default function TestExecutionList({
  consoleOutput = '',
  monitorState,
  onSelectTest,
  runStatus,
  selectedTestIndex,
  testResults,
  testUpdates,
}: TestExecutionListProps) {
  const handleToggle = (index: number) => {
    onSelectTest(selectedTestIndex === index ? null : index);
  };

  const hasConsoleOutput = consoleOutput.trim().length > 0;

  // Prefer final report results over live data
  if (testResults.length > 0) {
    return (
      <ListPanel>
        <div className="max-h-[50vh] overflow-y-auto">
          {testResults.map((r, i) => (
            <TestRow
              error={r.error}
              file={r.file}
              index={i}
              isExpanded={selectedTestIndex === i}
              key={r.id || i}
              name={r.title ?? r.name ?? 'Unknown test'}
              onToggle={handleToggle}
              status={r.status}
              steps={r.steps}
              subtitle={r.duration ? `${(r.duration / 1000).toFixed(1)}s` : undefined}
            />
          ))}
        </div>
      </ListPanel>
    );
  }

  // Live updates from monitor
  if (monitorState && monitorState.tests.length > 0) {
    return (
      <ListPanel>
        <div className="max-h-[50vh] overflow-y-auto">
          {monitorState.tests.map((test: TestResultItem, i: number) => (
            <TestRow
              error={test.error}
              file={test.file}
              index={i}
              isExpanded={selectedTestIndex === i}
              isRunning={test.isRunning}
              key={i}
              name={test.name}
              onToggle={handleToggle}
              status={test.status}
              steps={test.steps}
              subtitle={test.formattedDuration}
            />
          ))}
        </div>
      </ListPanel>
    );
  }

  // Run finished but results not in DB yet — show a deterministic loading bar
  const isRunDone = runStatus === 'completed' || runStatus === 'failed' || runStatus === 'cancelled';
  if (isRunDone) {
    return (
      <ListPanel>
        <div className="py-2">
          <div
            aria-label="Finalising results"
            className="relative mb-3 h-1 w-full overflow-hidden rounded bg-primary/20"
            role="progressbar"
          >
            <div className="absolute inset-y-0 left-0 w-2/5 animate-progress-indeterminate bg-primary motion-reduce:animate-none" />
          </div>
          <p className="m-0 text-sm text-foreground-secondary">
            Finalising results — this takes a few seconds…
          </p>
        </div>
      </ListPanel>
    );
  }

  // Waiting / initialising state
  return (
    <ListPanel>
      {hasConsoleOutput ? (
        /* Console is streaming — show animated "in-progress" indicator */
        <div className="flex items-center gap-4 py-3">
          <Spinner className="size-[18px] shrink-0" />
          <div>
            <p className="m-0 text-sm text-foreground">Test run in progress — parsing output…</p>
            <span className="text-xs text-foreground-secondary">
              Individual test cards will appear as results are detected in the console.
            </span>
          </div>
        </div>
      ) : testUpdates.length > 0 ? (
        <div className="flex items-center gap-4 py-3">
          <Spinner className="size-[18px] shrink-0" />
          <p className="m-0 text-sm text-foreground-secondary">Processing test events…</p>
        </div>
      ) : (
        <div className="flex items-center gap-4 py-3">
          <Spinner className="size-[18px] shrink-0 text-current" />
          <p className="m-0 text-sm text-foreground-secondary">Waiting for tests to start…</p>
        </div>
      )}
    </ListPanel>
  );
}
