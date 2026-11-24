import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, Info, Play, X, XCircle } from 'lucide-react';

import { api } from '../api/client';
import { Alert } from '../components/ui/alert';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Checkbox } from '../components/ui/checkbox';
import { Chip, type ChipTone } from '../components/ui/chip';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Progress } from '../components/ui/progress';
import { Spinner } from '../components/ui/spinner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { cn } from '../lib/utils';

type ValidationStatus = 'completed' | 'error' | 'idle' | 'running';

interface ValidationEvidence {
  type: string;
  severity: string;
}

interface ValidationCase {
  caseId: string | number;
  title: string;
  status: string;
  evidence?: ValidationEvidence[];
  proposedChanges?: { confidence?: number };
}

interface ValidationPilotReport {
  validationReport?: {
    metadata?: {
      totalCases?: number;
      accurateCount?: number;
      needsUpdateCount?: number;
      mismatchCount?: number;
    };
    summary?: { accuracyRate?: number };
    cases?: ValidationCase[];
  };
  applyResult?: { appliedOperations?: unknown[] };
  approvalRequest?: { hash: string; metadata?: { lowConfidenceCount?: number } };
}

const STATUS_CHIP_TONE: Record<string, ChipTone> = {
  accurate: 'pass',
  mismatch: 'fail',
  needs_update: 'warn',
};

const SEVERITY_CHIP_TONE: Record<string, ChipTone> = {
  critical: 'fail',
  major: 'warn',
  minor: 'info',
};

const INPUT_CLASS =
  'h-8 border border-border-strong bg-shell-input px-2.5 focus-visible:border-primary disabled:opacity-50';

export const ValidationView: React.FC = () => {
  const [suiteId, setSuiteId]           = useState('');
  const [baseUrl, setBaseUrl]           = useState('');
  const [applyApproved, setApplyApproved] = useState(false);
  const [status, setStatus]             = useState<ValidationStatus>('idle');
  const [error, setError]               = useState('');
  const [report, setReport]             = useState<ValidationPilotReport | null>(null);

  const running = status === 'running';

  const handleRun = async () => {
    if (!suiteId || !baseUrl) {
      setError('Please provide both Suite ID and Base URL');
      return;
    }
    setStatus('running');
    setError('');
    setReport(null);
    try {
      const result: ValidationPilotReport = await api.qase.validationPilot({
        applyApproved,
        baseUrl,
        qaseConfig: { apiToken: process.env.REACT_APP_QASE_API_TOKEN || '', enabled: true, projectCode: 'ACCESSFLOW' },
        suiteId: parseInt(suiteId, 10),
      });
      setReport(result);
      setStatus('completed');
    } catch (err: unknown) {
      setError((err instanceof Error && err.message) || 'Validation failed');
      setStatus('error');
    }
  };

  const metadata     = report?.validationReport?.metadata;
  const accuracyRate = report?.validationReport?.summary?.accuracyRate ?? 0;
  const cases        = report?.validationReport?.cases ?? [];

  const accuracyIndicator =
    accuracyRate >= 80
      ? '[&>[data-slot=progress-indicator]]:bg-status-pass'
      : accuracyRate >= 50
        ? '[&>[data-slot=progress-indicator]]:bg-status-warn'
        : '[&>[data-slot=progress-indicator]]:bg-status-fail';

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div>
        <h5 className="m-0 text-2xl font-bold text-foreground">
          UI vs Qase <span className="text-primary">Validation Pilot</span>
        </h5>
        <p className="m-0 mt-1 text-sm text-foreground-secondary">
          Validate Qase test cases against live AccessFlow UI using Playwright MCP
        </p>
      </div>

      {/* Config form */}
      <Card className="p-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex min-w-[120px] flex-none flex-col gap-1">
              <Label htmlFor="validation-suite-id">Suite ID</Label>
              <Input
                id="validation-suite-id"
                disabled={running}
                onChange={e => setSuiteId(e.target.value)}
                placeholder="e.g., 856"
                className={INPUT_CLASS}
                value={suiteId}
              />
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <Label htmlFor="validation-base-url">Base URL</Label>
              <Input
                id="validation-base-url"
                disabled={running}
                onChange={e => setBaseUrl(e.target.value)}
                placeholder="https://mix-p-sdk--accessflow--test.acsb-test.com"
                className={INPUT_CLASS}
                value={baseUrl}
              />
            </div>
            <div className="flex h-8 shrink-0 items-center gap-2">
              <Checkbox
                id="validation-apply-approved"
                checked={applyApproved}
                disabled={running}
                onCheckedChange={checked => setApplyApproved(checked === true)}
              />
              <Label htmlFor="validation-apply-approved" className="text-sm normal-case tracking-normal">
                Auto-apply approved
              </Label>
            </div>
          </div>

          <Button
            disabled={running || !suiteId || !baseUrl}
            onClick={handleRun}
            variant="default"
            className="w-full"
          >
            {running ? <Spinner className="size-4" /> : <Play aria-hidden="true" className="size-4" />}
            {running ? 'Running Validation…' : 'Run Validation Pilot'}
          </Button>

          {running && (
            <div className="relative h-1 w-full overflow-hidden bg-primary/20" role="progressbar" aria-label="Running validation">
              <div className="h-full w-2/5 animate-progress-indeterminate bg-primary" />
            </div>
          )}
        </div>
      </Card>

      {/* Error */}
      {error && (
        <Alert
          variant="error"
          action={
            <Button aria-label="Close" size="icon" variant="ghost" className="size-6" onClick={() => setError('')}>
              <X aria-hidden="true" className="size-4" />
            </Button>
          }
        >
          {error}
        </Alert>
      )}

      {/* Results */}
      {report && (
        <div className="flex flex-col gap-4">
          {/* Summary stats */}
          <div className="flex flex-col gap-4 sm:flex-row">
            {[
              { color: 'text-foreground',   icon: <Info aria-hidden="true" className="size-6 text-status-info" />,          label: 'Total Cases',  value: metadata?.totalCases ?? 0 },
              { color: 'text-status-pass',  icon: <CheckCircle2 aria-hidden="true" className="size-6 text-status-pass" />,  label: 'Accurate',     value: metadata?.accurateCount ?? 0 },
              { color: 'text-status-warn',  icon: <AlertTriangle aria-hidden="true" className="size-6 text-status-warn" />, label: 'Needs Update', value: metadata?.needsUpdateCount ?? 0 },
              { color: 'text-status-fail',  icon: <XCircle aria-hidden="true" className="size-6 text-status-fail" />,       label: 'Mismatches',   value: metadata?.mismatchCount ?? 0 },
            ].map(s => (
              <Card key={s.label} className="flex-1 flex-row items-center gap-4 px-4 py-2.5">
                {s.icon}
                <div>
                  <h5 className={cn('m-0 text-2xl font-bold leading-none', s.color)}>{s.value}</h5>
                  <span className="text-[0.75rem] text-foreground-secondary">{s.label}</span>
                </div>
              </Card>
            ))}
          </div>

          {/* Accuracy bar */}
          <Card className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <h6 className="m-0 text-base font-semibold text-foreground">Accuracy Rate</h6>
              <h6 className="m-0 text-base font-bold text-foreground">{accuracyRate.toFixed(1)}%</h6>
            </div>
            <Progress
              aria-label="Accuracy rate"
              className={cn('h-2.5 rounded', accuracyIndicator)}
              value={accuracyRate}
            />
          </Card>

          {/* Details table */}
          {cases.length > 0 && (
            <div className="border border-border bg-shell-panel">
              <div className="border-b border-border px-4 py-3">
                <h6 className="m-0 text-base font-semibold text-foreground">Validation Details</h6>
              </div>
              <div className="overflow-x-auto">
                <Table className="text-sm">
                  <TableHeader className="bg-shell-panel">
                    <TableRow>
                      <TableHead className="font-bold">Case ID</TableHead>
                      <TableHead className="font-bold">Title</TableHead>
                      <TableHead className="font-bold">Status</TableHead>
                      <TableHead className="font-bold">Evidence</TableHead>
                      <TableHead className="font-bold">Confidence</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cases.map(c => (
                      <TableRow key={c.caseId}>
                        <TableCell>
                          <span className="font-mono text-sm">{c.caseId}</span>
                        </TableCell>
                        <TableCell>{c.title}</TableCell>
                        <TableCell>
                          <Chip tone={STATUS_CHIP_TONE[c.status] ?? 'default'}>{c.status}</Chip>
                        </TableCell>
                        <TableCell>
                          {c.evidence && c.evidence.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {c.evidence.map((ev, i) => (
                                <Chip key={i} tone={SEVERITY_CHIP_TONE[ev.severity] ?? 'default'}>
                                  {`${ev.type} (${ev.severity})`}
                                </Chip>
                              ))}
                            </div>
                          ) : (
                            <span className="text-[0.75rem] text-foreground-secondary">No issues</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">
                            {c.proposedChanges?.confidence
                              ? `${(c.proposedChanges.confidence * 100).toFixed(0)}%`
                              : '—'}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* Apply result */}
          {report.applyResult && (
            <Alert variant="success">
              Successfully applied {report.applyResult.appliedOperations?.length ?? 0} updates to Qase
            </Alert>
          )}

          {/* Approval required */}
          {report.approvalRequest && (
            <Alert variant="info">
              {report.approvalRequest.metadata?.lowConfidenceCount ?? 0} low-confidence updates require manual approval.{' '}
              Approval hash: <code className="rounded-sm bg-hover/5 px-1.5 font-mono">{report.approvalRequest.hash}</code>
            </Alert>
          )}
        </div>
      )}
    </div>
  );
};
