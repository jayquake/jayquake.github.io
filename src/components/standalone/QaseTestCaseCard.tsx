import type React from 'react';

import { Copy, ExternalLink, FileText, Folder, Paperclip } from 'lucide-react';
import { useState } from 'react';

import { Button, buttonClass } from '../ui/button';
import { Chip, type ChipTone } from '../ui/chip';
import { Separator } from '../ui/separator';
import { cn } from '../../lib/utils';
import { useToast } from './ToastContainer';

type QaseStep = {
  action: string;
  data?: string;
  expected_result?: string;
  position?: number;
};

type QaseTestCaseCardProps = {
  compact?: boolean;
  testCase: QaseTestCaseEnhanced;
  testResult?: {
    duration?: number;
    error?: string;
    status: 'failed' | 'passed' | 'skipped';
  };
};

type QaseTestCaseEnhanced = {
  attachments?: { filename: string; id: string; url: string }[];
  automation?: number;
  created_at?: string;
  custom_fields?: unknown[];
  description?: string;
  id: number;
  postconditions?: string;
  preconditions?: string;
  priority?: number;
  qaseUrl?: string;
  severity?: number;
  status?: number;
  steps?: QaseStep[];
  suite?: { id: number; title: string };
  tags?: string[];
  title: string;
  type?: number;
  updated_at?: string;
};

const SEVERITY_MAP: Record<number, { color: ChipTone; label: string }> = {
  1: { color: 'fail',    label: 'Blocker' },
  2: { color: 'fail',    label: 'Critical' },
  3: { color: 'warn',    label: 'Major' },
  4: { color: 'info',    label: 'Normal' },
  5: { color: 'pass',    label: 'Minor' },
  6: { color: 'pass',    label: 'Trivial' },
};

const PRIORITY_MAP: Record<number, { color: ChipTone; label: string }> = {
  1: { color: 'fail',    label: 'High' },
  2: { color: 'warn',    label: 'Medium' },
  3: { color: 'info',    label: 'Low' },
};

const AUTOMATION_LABEL: Record<number, string> = {
  0: 'Manual',
  1: 'To be automated',
  2: 'Automated',
};

const resultColor = (status: string): ChipTone =>
  status === 'passed' ? 'pass' : status === 'failed' ? 'fail' : 'warn';

/** Outlined chips (MUI variant="outlined") keep the tone's border and text but drop the fill. */
const OUTLINED = 'bg-transparent';

const sectionHeading = 'm-0 mb-1 text-sm font-semibold text-foreground';
const calloutClass = 'rounded-r border-l-4 bg-hover/5 py-2 pl-4 pr-2';

export const QaseTestCaseCard: React.FC<QaseTestCaseCardProps> = ({ compact = false, testCase, testResult }) => {
  const [isExpanded, setIsExpanded] = useState(!compact);
  const { showToast } = useToast();

  const severity = SEVERITY_MAP[testCase.severity ?? 0] ?? { color: 'default' as const, label: 'Unknown' };
  const priority = PRIORITY_MAP[testCase.priority ?? 0] ?? { color: 'default' as const, label: 'Not set' };
  const automationLabel = AUTOMATION_LABEL[testCase.automation ?? 0] ?? 'Unknown';

  const copyId = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const id = `ACCESSFLOW-${testCase.id}`;
    try {
      await navigator.clipboard.writeText(id);
      showToast(`Test case ID: ${id}`, 'success');
    } catch {
      showToast('Could not copy to clipboard', 'error');
    }
  };

  const copySteps = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!testCase.steps?.length) {
      showToast('This test case has no steps to copy', 'warning');
      return;
    }
    let md = `# ${testCase.title}\n\n`;
    if (testCase.description) md += `**Description:** ${testCase.description}\n\n`;
    if (testCase.preconditions) md += `**Preconditions:**\n${testCase.preconditions}\n\n`;
    md += `## Steps:\n\n`;
    testCase.steps.forEach((s, i) => {
      md += `${i + 1}. **Action:** ${s.action}\n`;
      if (s.expected_result) md += `   **Expected:** ${s.expected_result}\n`;
      if (s.data) md += `   **Data:** ${s.data}\n`;
      md += `\n`;
    });
    if (testCase.postconditions) md += `**Postconditions:**\n${testCase.postconditions}\n`;
    try {
      await navigator.clipboard.writeText(md);
      showToast(`${testCase.steps.length} steps copied as Markdown`, 'success');
    } catch {
      showToast('Could not copy to clipboard', 'error');
    }
  };

  /* ─── Compact collapsed view ─── */
  if (compact && !isExpanded) {
    return (
      <div
        className="cursor-pointer rounded border border-border bg-shell-panel px-4 pb-3 pt-4 text-foreground transition-shadow hover:shadow-md"
        onClick={() => setIsExpanded(true)}
      >
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center gap-2">
              <p className="m-0 truncate text-base font-semibold">{testCase.title}</p>
              {testResult && <Chip tone={resultColor(testResult.status)}>{testResult.status}</Chip>}
            </div>
            {testCase.description && (
              <p className="m-0 line-clamp-2 text-sm text-foreground-secondary">{testCase.description}</p>
            )}
            <div className="mt-2 flex gap-1">
              <Chip className={OUTLINED} tone={severity.color}>{severity.label}</Chip>
              <Chip className={OUTLINED} tone={priority.color}>{priority.label}</Chip>
              {testCase.steps?.length ? <span className="self-center text-xs text-foreground-secondary">{testCase.steps.length} steps</span> : null}
            </div>
          </div>
          <Button className="ml-2 shrink-0" onClick={() => setIsExpanded(true)} size="sm" variant="ghost">Expand</Button>
        </div>
      </div>
    );
  }

  /* ─── Full expanded view ─── */
  return (
    <div className="rounded border border-border bg-shell-panel p-4 text-foreground">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h6 className="m-0 text-xl font-bold">{testCase.title}</h6>
            {testResult && <Chip tone={resultColor(testResult.status)}>{testResult.status}</Chip>}
          </div>
          <div className="flex flex-wrap gap-1.5">
            <Chip className={OUTLINED} tone={severity.color}>{severity.label}</Chip>
            <Chip className={OUTLINED} tone={priority.color}>{priority.label}</Chip>
            <Chip className={OUTLINED}>{automationLabel}</Chip>
            {testCase.tags?.slice(0, 3).map(tag => <Chip key={tag}>{tag}</Chip>)}
            {(testCase.tags?.length ?? 0) > 3 && <span className="self-center text-xs text-foreground-secondary">+{(testCase.tags?.length ?? 0) - 3}</span>}
          </div>
        </div>
        {compact && <Button onClick={() => setIsExpanded(false)} size="sm" variant="ghost">Collapse</Button>}
      </div>

      {/* Suite */}
      {testCase.suite && (
        <div className="mb-4 flex items-center gap-1">
          <Folder aria-hidden="true" className="size-4 text-foreground-muted" />
          <p className="m-0 text-sm text-foreground-secondary">Suite: {testCase.suite.title}</p>
        </div>
      )}

      {/* Description */}
      {testCase.description && (
        <div className="mb-4">
          <h6 className={sectionHeading}>Description</h6>
          <p className="m-0 whitespace-pre-wrap text-sm text-foreground-secondary">{testCase.description}</p>
        </div>
      )}

      {/* Preconditions */}
      {testCase.preconditions && (
        <div className="mb-4">
          <h6 className={sectionHeading}>Preconditions</h6>
          <div className={cn(calloutClass, 'border-status-info')}>
            <p className="m-0 whitespace-pre-wrap text-sm text-foreground-secondary">{testCase.preconditions}</p>
          </div>
        </div>
      )}

      {/* Steps */}
      {testCase.steps && testCase.steps.length > 0 && (
        <div className="mb-4">
          <h6 className={sectionHeading}>Test Steps ({testCase.steps.length})</h6>
          <div className="flex flex-col gap-2">
            {testCase.steps.map((step, idx) => (
              <div className={cn(calloutClass, 'border-primary')} key={idx}>
                <div className="mb-1 flex items-center gap-2">
                  <div className="flex size-[22px] shrink-0 items-center justify-center rounded-full bg-primary text-[0.75rem] font-bold text-primary-foreground">
                    {step.position ?? idx + 1}
                  </div>
                  <p className="m-0 text-sm font-medium">{step.action}</p>
                </div>
                {step.expected_result && (
                  <span className="ml-8 text-xs text-foreground-secondary">
                    <span className="mr-1 text-status-pass">✓</span>
                    <strong>Expected:</strong> {step.expected_result}
                  </span>
                )}
                {step.data && (
                  <span className="ml-8 block text-xs text-foreground-secondary">
                    <strong>Data:</strong> {step.data}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Postconditions */}
      {testCase.postconditions && (
        <div className="mb-4">
          <h6 className={sectionHeading}>Postconditions</h6>
          <div className={cn(calloutClass, 'border-status-pass')}>
            <p className="m-0 whitespace-pre-wrap text-sm text-foreground-secondary">{testCase.postconditions}</p>
          </div>
        </div>
      )}

      {/* Attachments */}
      {testCase.attachments && testCase.attachments.length > 0 && (
        <div className="mb-4">
          <h6 className={sectionHeading}>Attachments ({testCase.attachments.length})</h6>
          <div className="flex flex-wrap gap-2">
            {testCase.attachments.map(a => (
              <a className="text-primary no-underline hover:underline" href={a.url} key={a.id} rel="noopener noreferrer" target="_blank">
                <span className="flex items-center gap-1 rounded bg-hover/5 px-3 py-1.5 text-[0.8rem]">
                  <Paperclip aria-hidden="true" className="size-3.5" />
                  <span>{a.filename}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Test result details */}
      {testResult && (
        <div className="mb-4 rounded bg-hover/5 p-3">
          <h6 className={sectionHeading}>Test Execution Result</h6>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <p className="m-0 text-sm text-foreground-secondary">Status:</p>
              <Chip tone={resultColor(testResult.status)}>{testResult.status}</Chip>
            </div>
            {testResult.duration != null && (
              <div className="flex items-center gap-2">
                <p className="m-0 text-sm text-foreground-secondary">Duration:</p>
                <p className="m-0 font-mono text-sm">{(testResult.duration / 1000).toFixed(2)}s</p>
              </div>
            )}
            {testResult.error && (
              <div>
                <p className="m-0 mb-1 text-sm text-foreground-secondary">Error:</p>
                <pre className="m-0 overflow-x-auto rounded bg-status-fail/5 p-2 text-[0.75rem] text-status-fail">
                  {testResult.error}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      <Separator className="mb-3" />

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex gap-4">
          <span className="text-xs text-foreground-muted">QASE-{testCase.id}</span>
          {testCase.updated_at && (
            <span className="text-xs text-foreground-muted">
              Updated: {new Date(testCase.updated_at).toLocaleDateString()}
            </span>
          )}
        </div>
        <div className="flex gap-1">
          <Button onClick={copyId} size="sm" variant="ghost">
            <Copy aria-hidden="true" className="size-4" />
            Copy ID
          </Button>
          {testCase.steps && testCase.steps.length > 0 && (
            <Button onClick={copySteps} size="sm" variant="ghost">
              <FileText aria-hidden="true" className="size-4" />
              Copy Steps
            </Button>
          )}
          {testCase.qaseUrl && (
            <a
              className={buttonClass({ size: 'sm', variant: 'ghost', className: 'no-underline' })}
              href={testCase.qaseUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <ExternalLink aria-hidden="true" className="size-4" />
              View in Qase
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
