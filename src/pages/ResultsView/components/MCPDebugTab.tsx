import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  Bug,
  Camera,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Copy,
  Eye,
  FileText,
  Film,
  FlaskConical,
  MapPin,
  Sparkles,
  X,
  XCircle,
} from 'lucide-react';

import { api } from '../../../api/client';
import { StepList } from '../../../components/standalone/StepList';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../../components/ui/accordion';
import { Alert, AlertTitle } from '../../../components/ui/alert';
import { Button } from '../../../components/ui/button';
import { Chip } from '../../../components/ui/chip';
import { Dialog, DialogClose, DialogContent, DialogTitle } from '../../../components/ui/dialog';
import { Input } from '../../../components/ui/input';
import { Separator } from '../../../components/ui/separator';
import { Spinner } from '../../../components/ui/spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../../components/ui/tooltip';
import { cn } from '../../../lib/utils';
import { type MCPAnalysis } from '../models/MCPAnalysis';
import { type TestResult } from '../models/TestRunData';
import { MCPAnalysisFilter } from '../services/MCPAnalysisFilter';
import { type TestNavResult } from '../../../../shared/types';

/* ─── Presentation helpers ───────────────────────────────── */
const CHIP_ICON = 'size-3';
/** MUI "outlined" chip variant: same tone, no fill. */
const OUTLINED_CHIP = 'bg-transparent';
/** MUI caption typography. */
const CAPTION = 'text-xs';
/** Monospace block used for selectors and code snippets. */
const CODE_BLOCK = 'block border border-border bg-shell-main p-3 font-mono text-[0.8rem] [word-break:break-all]';

/** Simple text tooltip, replacing MUI <Tooltip title>. */
const Hint = ({ children, title }: { children: React.ReactElement; title: string }) => (
  <Tooltip>
    <TooltipTrigger asChild>{children}</TooltipTrigger>
    <TooltipContent>{title}</TooltipContent>
  </Tooltip>
);

/** Full-size screenshot viewer (replaces the MUI Dialog + close IconButton). */
const FullSizeImageDialog = ({
  alt,
  onClose,
  open,
  src,
}: {
  alt: string;
  onClose: () => void;
  open: boolean;
  src: string;
}) => (
  <Dialog onOpenChange={next => { if (!next) onClose(); }} open={open}>
    <DialogContent aria-describedby={undefined} className="w-auto max-w-[90vw] p-0" hideClose>
      <DialogTitle className="sr-only">{alt}</DialogTitle>
      <DialogClose asChild>
        <Button
          aria-label="Close"
          className="absolute right-2 top-2 bg-shell-elevated/80 text-foreground hover:bg-shell-elevated"
          size="icon"
          variant="ghost"
        >
          <X aria-hidden="true" className="size-5" />
        </Button>
      </DialogClose>
      <img alt={alt} className="block max-h-[90vh] max-w-[90vw]" src={src} />
    </DialogContent>
  </Dialog>
);

/** Indeterminate linear progress (replaces MUI <LinearProgress />). */
const IndeterminateBar = ({ label }: { label: string }) => (
  <div aria-label={label} className="relative h-1 w-full overflow-hidden bg-primary/20" role="progressbar">
    <div className="absolute inset-y-0 left-0 w-2/5 animate-progress-indeterminate bg-primary" />
  </div>
);

type NavProgressStep = {
  detail?: string;
  status: string;
  step: string;
  timestamp: string;
};

type ValidatedSelector = {
  count: number;
  selector: string;
  status: 'pass' | 'fail';
  tag?: string;
};

type LiveValidation = {
  count: number;
  error?: string;
  loading: boolean;
  matches?: Array<{ id?: string; tag: string; text: string }>;
};

/* ─── Selector quality helpers ───────────────────────────── */
const GENERIC_TAGS = new Set([
  'a', 'button', 'div', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'header', 'input', 'li', 'main', 'nav', 'ol', 'p', 'section', 'select', 'span',
  'textarea', 'ul',
]);

const getSelectorQuality = (sel: string): 'generic' | 'moderate' | 'specific' => {
  const s = sel.trim();
  if (GENERIC_TAGS.has(s.toLowerCase())) return 'generic';
  // Bare attribute without value e.g. [data-testid]
  if (/^\[[\w-]+\]$/.test(s)) return 'generic';
  // Strong specificity markers
  if (/\[data-testid=|data-cy=|data-e2e=|\[aria-label=|#[a-zA-Z]|getByRole\(|getByText\(|getByLabel\(|:has-text\(/.test(s)) return 'specific';
  // Attribute with value or compound selector
  if (/\[[^\]]+=[^\]]+\]/.test(s) || (s.includes('.') && s.split('.').length > 2)) return 'moderate';
  return 'moderate';
};

const QUALITY_ORDER = { specific: 0, moderate: 1, generic: 2 };

const sortSelectorsByQuality = (selectors: string[]) =>
  [...selectors].sort((a, b) => QUALITY_ORDER[getSelectorQuality(a)] - QUALITY_ORDER[getSelectorQuality(b)]);

/** Derive candidate selectors from a Playwright error message */
const deriveSelectorsFromError = (error: string): string[] => {
  const derived: string[] = [];

  // "'Manage your Journeys' heading not found"
  const headingMatch = error.match(/'([^']+)'\s+heading/i);
  if (headingMatch) {
    derived.push(`[role="heading"]:has-text("${headingMatch[1]}")`);
    derived.push(`h1:has-text("${headingMatch[1]}")`);
  }

  // "'Button Label' button not found"
  const buttonMatch = error.match(/'([^']+)'\s+button/i);
  if (buttonMatch) derived.push(`button:has-text("${buttonMatch[1]}")`);

  // Playwright getByRole with name
  const getByRoleMatch = error.match(/getByRole\(['"](\w+)['"][^)]*name:\s*['"]([^'"]+)['"]/);
  if (getByRoleMatch) derived.push(`[role="${getByRoleMatch[1]}"][aria-label*="${getByRoleMatch[2]}"]`);

  // waiting for selector '...'
  const waitMatch = error.match(/waiting for[^'"]*['"]([^'"]{4,})['"]/i);
  if (waitMatch) derived.push(waitMatch[1]);

  // Extract all quoted strings of meaningful length as text selectors
  const quotes = Array.from(error.matchAll(/'([^']{4,50})'/g)).map(m => m[1]);
  quotes.slice(0, 2).forEach(text => {
    if (!derived.some(d => d.includes(text))) derived.push(`text="${text}"`);
  });

  return [...new Set(derived)];
};

/* ─── Error classification ───────────────────────────────── */
type ErrorCategory = 'assertion' | 'auth' | 'config' | 'element' | 'network' | 'unknown';

interface ErrorClassification {
  category: ErrorCategory;
  detail: string;
  headline: string;
  hint: string;
}

const classifyError = (error: string): ErrorClassification => {
  if (/must be set|is required|is not defined|missing.*key|api.?key/i.test(error)) {
    const valueMatch = error.match(/'([^']{1,60})'/);
    const valueName = valueMatch ? `\`${valueMatch[1]}\`` : 'a required value';
    return {
      category: 'config',
      detail: `The test could not run because ${valueName} is not set. This is a configuration error, not a UI element issue.`,
      headline: 'Configuration Error — missing required value',
      hint: 'Check your .env file or ensure the environment variable is exported before running tests.',
    };
  }

  if (/ERR_CONNECTION_REFUSED|ECONNREFUSED|net::ERR_|ETIMEDOUT|Failed to fetch|getaddrinfo/i.test(error)) {
    return {
      category: 'network',
      detail: 'The browser could not connect to the target URL. The server may be unreachable or the URL may be incorrect.',
      headline: 'Network Error — connection failed',
      hint: 'Verify the base URL is reachable and the server is running. Check for typos in the environment URL.',
    };
  }

  if (/Expected|toBe\(|toEqual\(|toHaveText|toBeVisible|received:/i.test(error)) {
    return {
      category: 'assertion',
      detail: 'An assertion in the test failed — the page content or state did not match what the test expected.',
      headline: 'Assertion Failure — unexpected page state',
      hint: 'Compare the expected and received values in the error. The UI may have changed since the test was written.',
    };
  }

  if (/401|403|Unauthorized|Forbidden|authentication failed/i.test(error)) {
    return {
      category: 'auth',
      detail: 'The test was blocked by an authentication or authorization error.',
      headline: 'Authentication Error — access denied',
      hint: 'The session may have expired or credentials are invalid. Re-run via staging-setup to refresh the session.',
    };
  }

  if (/waiting for|not found|strict mode|locator\(|No element/i.test(error)) {
    return {
      category: 'element',
      detail: 'Playwright could not find the expected element on the page.',
      headline: 'Element Not Found — selector may be stale',
      hint: 'Use "Navigate to Failure Point" and re-analyze to generate fresh selector suggestions.',
    };
  }

  return {
    category: 'unknown',
    detail: 'The test failed with an unrecognized error. See the ERROR tab for the full message.',
    headline: 'Test Failure — unclassified error',
    hint: 'Review the full error in the ERROR tab and check recent changes to the page or test code.',
  };
};

const ErrorDiagnosticBanner = ({ classification }: { classification: ErrorClassification }) => (
  <Alert
    icon={
      <AlertTriangle
        aria-hidden="true"
        className={cn(
          'mt-0.5 size-4 shrink-0',
          classification.category === 'assertion' ? 'text-status-info' : 'text-status-warn'
        )}
      />
    }
    variant={classification.category === 'assertion' ? 'info' : 'warning'}
  >
    <AlertTitle>{classification.headline}</AlertTitle>
    {classification.detail}
    <span className={cn(CAPTION, 'mt-1 block')}>
      Hint: {classification.hint}
    </span>
  </Alert>
);

type MCPDebugTabProps = {
  analyses: MCPAnalysis[];
  baseUrl?: string;
  failedTestResults?: TestResult[];
  mcpInteracting: boolean;
  mcpLoading: boolean;
  mcpStatus: {
    available: boolean;
    cliMode?: boolean;
    message: string;
    tools: string[];
  };
  onAnalyze: () => void;
  onNavigateToFailure: (analysis: MCPAnalysis) => void;
  onNavigateToFailureFromTest: (test: TestResult, pageSnapshotContent?: string) => void;
  onSelectLocator?: (locator: string, analysisIndex: number) => void;
  onTabChange?: (tab: string) => void;
  onTestSelector: (selector: string) => void;
  selectedAnalysis?: null | number;
  selectedLocator?: string;
  testNavResults: Map<string, TestNavResult>;
  testResults: TestResult[];
};

/* ─── NavigationProgressLog ─────────────────────────────── */
const NavigationProgressLog = ({ isActive, steps }: { isActive: boolean; steps: NavProgressStep[] }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [steps.length]);

  if (steps.length === 0 && !isActive) return null;

  const statusIcon = (s: string) => {
    if (s === 'running') return <Spinner className="size-3" />;
    if (s === 'done') return <CheckCircle2 aria-hidden="true" className="size-3.5 text-status-pass" />;
    return <XCircle aria-hidden="true" className="size-3.5 text-status-fail" />;
  };

  return (
    <div className="mb-4 overflow-hidden border border-border bg-shell-panel text-foreground">
      <div className="flex flex-row items-center gap-2 border-b border-border bg-shell-main px-4 py-2">
        <Clock aria-hidden="true" className="size-4 text-foreground-secondary" />
        <span className={cn(CAPTION, 'font-semibold uppercase tracking-[0.08em] text-foreground-secondary')}>
          Navigation Progress
        </span>
        {isActive && (
          <div className="ml-auto flex flex-row items-center gap-1">
            <Spinner className="size-2.5" />
            <span className={cn(CAPTION, 'text-primary')}>In progress…</span>
          </div>
        )}
      </div>
      <div className="max-h-64 overflow-y-auto p-2">
        <ul className="m-0 list-none p-0">
          {steps.map((s, i) => (
            <li
              className={cn(
                'mb-0.5 flex items-start gap-2 rounded px-4 py-1',
                s.status === 'error' ? 'bg-status-fail/10' : s.status === 'running' ? 'bg-status-info/10' : 'bg-transparent'
              )}
              key={i}
            >
              <div className="mt-0.5 shrink-0">{statusIcon(s.status)}</div>
              <div className="min-w-0 flex-1">
                <span className={cn(CAPTION, 'block font-medium')}>{s.step}</span>
                {s.detail && (
                  <span className={cn(CAPTION, 'block text-foreground-secondary [word-break:break-all]')}>{s.detail}</span>
                )}
              </div>
              <span className="shrink-0 text-[0.75rem] text-foreground-muted">
                {new Date(s.timestamp).toLocaleTimeString()}
              </span>
            </li>
          ))}
          {isActive && steps.length === 0 && (
            <li className="flex items-center gap-2 px-4 py-1">
              <Spinner className="size-3" />
              <span className={cn(CAPTION, 'text-foreground-secondary')}>Starting navigation…</span>
            </li>
          )}
        </ul>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

/* ─── FailureScreenshotCard ──────────────────────────────── */
const FailureScreenshotCard = ({ screenshot }: { screenshot: string }) => {
  const [expanded, setExpanded] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const API_BASE = process.env.REACT_APP_API_URL || '';

  const src = screenshot.startsWith('data:')
    ? screenshot
    : screenshot.startsWith('http')
      ? screenshot
      : `${API_BASE}${screenshot.startsWith('/') ? '' : '/'}${screenshot}`;

  return (
    <>
      <Accordion
        className="mb-4"
        collapsible
        onValueChange={() => setExpanded(v => !v)}
        type="single"
        value={expanded ? 'screenshot' : ''}
      >
        <AccordionItem value="screenshot">
          <AccordionTrigger>
            <span className="flex flex-row items-center gap-2">
              <Eye aria-hidden="true" className="size-4 text-primary" />
              <span className={cn(CAPTION, 'font-semibold uppercase tracking-[0.08em]')}>
                Failure Point Screenshot
              </span>
              <Chip tone="info">Captured</Chip>
            </span>
          </AccordionTrigger>
          <AccordionContent className="border-t-0 pt-0">
            <img
              alt="Failure point"
              className="block w-full cursor-pointer rounded border border-border hover:opacity-90"
              onClick={() => setDialogOpen(true)}
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                e.currentTarget.style.display = 'none';
              }}
              src={src}
            />
            <div className="mt-2 flex flex-row gap-2">
              <Button onClick={() => setDialogOpen(true)} size="sm" variant="outline">
                <Eye aria-hidden="true" className="size-4" />
                View Full Size
              </Button>
              <Button
                onClick={() => {
                  const link = document.createElement('a');
                  link.download = `failure-screenshot-${Date.now()}.png`;
                  link.href = src;
                  link.click();
                }}
                size="sm"
                variant="outline"
              >
                <Copy aria-hidden="true" className="size-4" />
                Download
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <FullSizeImageDialog
        alt="Failure point — full size"
        onClose={() => setDialogOpen(false)}
        open={dialogOpen}
        src={src}
      />
    </>
  );
};

/* ─── SelectorValidationBadge ────────────────────────────── */
const SelectorValidationBadge = ({ validation }: { validation: ValidatedSelector }) => {
  if (validation.status === 'pass' && validation.count === 1) {
    return (
      <Chip icon={<CheckCircle2 aria-hidden="true" className={CHIP_ICON} />} tone="pass">
        {`1 match${validation.tag ? ` (${validation.tag})` : ''}`}
      </Chip>
    );
  }
  if (validation.status === 'pass' && validation.count > 1) {
    return (
      <Chip icon={<AlertTriangle aria-hidden="true" className={CHIP_ICON} />} tone="warn">
        {`${validation.count} matches — ambiguous`}
      </Chip>
    );
  }
  return (
    <Chip icon={<XCircle aria-hidden="true" className={CHIP_ICON} />} tone="fail">
      No match
    </Chip>
  );
};


/* ─── NavigationOutcomeBanner ────────────────────────────── */
const URL_LINE = cn(CAPTION, 'block font-mono [word-break:break-all]');

const NavigationOutcomeBanner = ({
  currentUrl,
  error,
  expectedUrl,
  outcome,
}: {
  currentUrl?: string;
  error?: string;
  expectedUrl?: string;
  outcome: TestNavResult['navigationOutcome'];
}) => {
  if (!outcome) return null;

  if (outcome === 'correct') {
    return (
      <Alert className="mb-4" variant="success">
        Navigation succeeded — confirmed on the expected page
        {currentUrl && (
          <div className={cn(URL_LINE, 'mt-1')}>
            {currentUrl}
          </div>
        )}
      </Alert>
    );
  }

  if (outcome === 'auth-redirect') {
    return (
      <Alert className="mb-4" variant="error">
        <strong>Authentication Required</strong> — Redirected to login page instead of the failure URL.
        {currentUrl && (
          <div className={cn(URL_LINE, 'mt-1')}>
            Landed on: {currentUrl}
          </div>
        )}
        {expectedUrl && (
          <div className={URL_LINE}>
            Expected: {expectedUrl}
          </div>
        )}
        {error && (
          <div className={cn(CAPTION, 'mt-1 text-status-fail')}>
            {error}
          </div>
        )}
      </Alert>
    );
  }

  if (outcome === 'not-loaded') {
    return (
      <Alert className="mb-4" variant="error">
        <strong>Page Did Not Load</strong> — The browser could not reach the failure URL.
        {error && (
          <div className={cn(CAPTION, 'mt-1')}>{error}</div>
        )}
      </Alert>
    );
  }

  if (outcome === 'wrong-page') {
    return (
      <Alert className="mb-4" variant="warning">
        <strong>Wrong Page</strong> — Navigation landed on a different page than expected. Screenshot was taken from the actual location.
        {currentUrl && (
          <div className={cn(URL_LINE, 'mt-1')}>
            Actual: {currentUrl}
          </div>
        )}
        {expectedUrl && (
          <div className={URL_LINE}>
            Expected: {expectedUrl}
          </div>
        )}
      </Alert>
    );
  }

  return null;
};

/* ─── TestArtifactsViewer ────────────────────────────────── */
type TestArtifacts = {
  pageSnapshotContent: null | string;
  screenshotUrl: null | string;
  videoUrl: null | string;
};

const API_BASE_URL =
  (typeof window !== 'undefined' ? (window as any).__VITE_API_URL__ : undefined) ||
  process.env.REACT_APP_API_URL ||
  '';

const TestArtifactsViewer = ({
  onSnapshotLoaded,
  testResultId,
}: {
  onSnapshotLoaded?: (content: string) => void;
  testResultId: string;
}) => {
  const [artifacts, setArtifacts] = useState<null | TestArtifacts>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [screenshotDialogOpen, setScreenshotDialogOpen] = useState(false);
  const [snapshotExpanded, setSnapshotExpanded] = useState(false);

  useEffect(() => {
    if (!testResultId) return;
    setLoading(true);
    api.artifacts
      .getTestResultArtifacts(testResultId)
      .then(data => {
        const screenshot = data.artifacts.screenshots[0];
        const video = data.artifacts.videos[0];
        const snapshot = data.artifacts.logs.find(l => l.filename === 'error-context.md');

        const resolveUrl = (artifact: { id: string; resolvedUrl: null | string } | undefined) => {
          if (!artifact) return null;
          if (artifact.resolvedUrl) return artifact.resolvedUrl;
          return `/api/artifacts/file/${artifact.id}`;
        };

        const result: TestArtifacts = {
          pageSnapshotContent: snapshot?.pageSnapshotContent ?? null,
          screenshotUrl: resolveUrl(screenshot),
          videoUrl: resolveUrl(video),
        };
        setArtifacts(result);
        if (result.pageSnapshotContent) {
          onSnapshotLoaded?.(result.pageSnapshotContent);
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [testResultId]);

  if (loading) {
    return (
      <div className="py-4">
        <IndeterminateBar label="Loading test artifacts" />
        <span className={cn(CAPTION, 'mt-2 block text-foreground-secondary')}>
          Loading test artifacts…
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert className="mt-2" variant="warning">
        Could not load artifacts: {error}
      </Alert>
    );
  }

  if (!artifacts) return null;

  const hasArtifacts = artifacts.screenshotUrl || artifacts.videoUrl || artifacts.pageSnapshotContent;
  if (!hasArtifacts) {
    return (
      <span className={cn(CAPTION, 'text-foreground-secondary')}>
        No artifacts found for this test result.
      </span>
    );
  }

  const fullScreenshotSrc = artifacts.screenshotUrl
    ? `${API_BASE_URL}${artifacts.screenshotUrl.startsWith('/') ? '' : '/'}${artifacts.screenshotUrl}`
    : null;

  const fullVideoSrc = artifacts.videoUrl
    ? `${API_BASE_URL}${artifacts.videoUrl.startsWith('/') ? '' : '/'}${artifacts.videoUrl}`
    : null;

  return (
    <div className="flex flex-col gap-4">
      {/* Screenshot */}
      {fullScreenshotSrc && (
        <div>
          <div className="mb-2 flex flex-row items-center gap-2">
            <Camera aria-hidden="true" className="size-4 text-status-fail" />
            <span className={cn(CAPTION, 'font-semibold')}>Failure Screenshot</span>
            <Chip tone="fail">At failure</Chip>
          </div>
          <img
            alt="Test failure screenshot"
            className="block max-h-80 w-full cursor-zoom-in rounded border border-border bg-shell-main object-contain"
            onClick={() => setScreenshotDialogOpen(true)}
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.style.display = 'none'; }}
            src={fullScreenshotSrc}
          />
          <Button
            className="mt-1"
            onClick={() => setScreenshotDialogOpen(true)}
            size="sm"
            variant="ghost"
          >
            <Eye aria-hidden="true" className="size-4" />
            View Full Size
          </Button>
          <FullSizeImageDialog
            alt="Full size failure screenshot"
            onClose={() => setScreenshotDialogOpen(false)}
            open={screenshotDialogOpen}
            src={fullScreenshotSrc}
          />
        </div>
      )}

      {/* Video */}
      {fullVideoSrc && (
        <div>
          <div className="mb-2 flex flex-row items-center gap-2">
            <Film aria-hidden="true" className="size-4 text-foreground-accent" />
            <span className={cn(CAPTION, 'font-semibold')}>Test Recording</span>
          </div>
          <video
            className="block max-h-[360px] w-full rounded border border-border"
            controls
            src={fullVideoSrc}
          />
        </div>
      )}

      {/* Page Snapshot */}
      {artifacts.pageSnapshotContent && (
        <div>
          <div className="mb-1 flex flex-row items-center gap-2">
            <FileText aria-hidden="true" className="size-4 text-status-info" />
            <span className={cn(CAPTION, 'font-semibold')}>Page Snapshot at Failure</span>
            <Chip tone="info">Accessibility tree</Chip>
          </div>
          <Accordion
            collapsible
            onValueChange={() => setSnapshotExpanded(v => !v)}
            type="single"
            value={snapshotExpanded ? 'snapshot' : ''}
          >
            <AccordionItem value="snapshot">
              <AccordionTrigger>
                <span className={cn(CAPTION, 'font-semibold')}>
                  {snapshotExpanded ? 'Hide' : 'Show'} page accessibility tree YAML ({(artifacts.pageSnapshotContent.length / 1024).toFixed(1)} KB)
                </span>
              </AccordionTrigger>
              <AccordionContent className="p-0">
                <pre className="m-0 max-h-[400px] overflow-y-auto whitespace-pre-wrap bg-shell-main p-4 font-mono text-[0.75rem] leading-normal [word-break:break-all]">
                  {artifacts.pageSnapshotContent}
                </pre>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </div>
  );
};

/* ─── FailedTestCard ─────────────────────────────────────── */
const FailedTestCard = ({
  matchingAnalysis,
  mcpInteracting,
  mcpStatus,
  onNavigateToFailure,
  onNavigateToFailureFromTest,
  onSelectLocator,
  onTabChange,
  testNavResult,
  test,
}: {
  matchingAnalysis?: MCPAnalysis;
  mcpInteracting: boolean;
  mcpStatus: MCPDebugTabProps['mcpStatus'];
  onNavigateToFailure: (a: MCPAnalysis) => void;
  onNavigateToFailureFromTest: (t: TestResult, snapshot?: string) => void;
  onSelectLocator?: (selector: string) => void;
  onTabChange?: (tab: string) => void;
  test: TestResult;
  testNavResult?: TestNavResult;
}) => {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'artifacts' | 'error' | 'mcp'>('error');
  const [pageSnapshotContent, setPageSnapshotContent] = useState<string | undefined>(undefined);
  const [localSelectedLocator, setLocalSelectedLocator] = useState('');
  const [selectorValidations, setSelectorValidations] = useState<Map<string, LiveValidation>>(new Map());

  const navLoading = testNavResult?.loading ?? false;
  const hasMcpData = testNavResult && (testNavResult.steps.length > 0 || testNavResult.screenshot || testNavResult.navigationOutcome);

  const handleValidateSelector = async (selector: string) => {
    setSelectorValidations(prev => new Map(prev).set(selector, { count: 0, loading: true }));
    try {
      const result = await api.mcp.validateSelector(selector);
      setSelectorValidations(prev => new Map(prev).set(selector, { ...result, loading: false }));
    } catch (e: any) {
      setSelectorValidations(prev => new Map(prev).set(selector, { count: 0, error: e.message, loading: false }));
    }
  };

  return (
    <div
      className={cn(
        'border border-l-4 border-border bg-shell-panel text-foreground',
        hasMcpData ? 'border-l-primary' : 'border-l-status-fail'
      )}
    >
      {/* ── Header (always visible) ── */}
      <button
        aria-expanded={expanded}
        className="block w-full cursor-pointer border-0 bg-transparent p-4 text-left text-inherit hover:bg-hover/5"
        onClick={() => setExpanded(v => !v)}
        type="button"
      >
        <span className="flex flex-row items-start justify-between gap-2">
          <span className="block min-w-0 flex-1">
            <span className="mb-1 flex flex-row flex-wrap items-center gap-2">
              <Chip tone="fail">FAILED</Chip>
              {hasMcpData && <Chip tone="primary">Analyzed</Chip>}
              <span className="truncate text-sm font-semibold">{test.name}</span>
            </span>
            <span className="flex flex-row items-center gap-2">
              <FileText aria-hidden="true" className="size-3 shrink-0 text-foreground-secondary" />
              <code className={cn(CAPTION, 'truncate text-foreground-secondary')}>
                {test.file.split('/').slice(-2).join('/')}
              </code>
              {test.duration && (
                <span className={cn(CAPTION, 'text-foreground-secondary')}>
                  ⏱ {(test.duration / 1000).toFixed(2)}s
                </span>
              )}
              {test.qaseId && <Chip>{`Qase #${test.qaseId}`}</Chip>}
            </span>
          </span>
          {expanded
            ? <ChevronDown aria-hidden="true" className="size-4 shrink-0" />
            : <ChevronRight aria-hidden="true" className="size-4 shrink-0" />}
        </span>
      </button>

      {/* ── Expanded content ── */}
      {expanded && (
        <div className="border-t border-border" onClick={e => e.stopPropagation()}>
          <Tabs onValueChange={v => setActiveTab(v as 'artifacts' | 'error' | 'mcp')} value={activeTab}>
            <TabsList className="px-4">
              <TabsTrigger value="error">Error</TabsTrigger>
              <TabsTrigger value="artifacts">Artifacts</TabsTrigger>
              <TabsTrigger value="mcp">
                {navLoading ? (
                  <span className="flex flex-row items-center gap-1">
                    <Spinner aria-hidden="true" className="size-2.5" />
                    <span>MCP Analysis</span>
                  </span>
                ) : 'MCP Analysis'}
              </TabsTrigger>
            </TabsList>

            <div className="p-4">
              {/* ── Error tab ── */}
              <TabsContent value="error">
                <div className="flex flex-col gap-4">
                  {test.error && (
                    <Alert icon={<AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-status-fail" />} variant="error">
                      <pre className="m-0 max-h-[200px] overflow-y-auto whitespace-pre-wrap font-mono text-[0.75rem] [word-break:break-all]">
                        {test.error}
                      </pre>
                    </Alert>
                  )}
                  {test.steps && test.steps.length > 0 && (
                    <div>
                      <span className={cn(CAPTION, 'mb-1 block font-semibold text-foreground-secondary')}>
                        Test Steps ({test.steps.length}):
                      </span>
                      <StepList
                        enableFilter
                        maxSteps={15}
                        steps={test.steps.map((s, i) => ({ ...s, order: i + 1 }))}
                      />
                    </div>
                  )}
                  {!test.error && !test.steps?.length && (
                    <span className={cn(CAPTION, 'text-foreground-secondary')}>No error details available.</span>
                  )}
                </div>
              </TabsContent>

              {/* ── Artifacts tab ── */}
              <TabsContent value="artifacts">
                <TestArtifactsViewer
                  onSnapshotLoaded={setPageSnapshotContent}
                  testResultId={test.id}
                />
              </TabsContent>

              {/* ── MCP Analysis tab ── */}
              <TabsContent value="mcp">
              {(() => {
                const errorClass = test.error ? classifyError(test.error) : null;
                const isNonElementError = errorClass !== null
                  && errorClass.category !== 'element'
                  && errorClass.category !== 'unknown';

                return (
                <div className="flex flex-col gap-4">
                  {/* Navigate buttons — hidden entirely for config/network/auth errors */}
                  {isNonElementError ? (
                    <Alert
                      variant={
                        errorClass?.category === 'config' ? 'warning'
                        : errorClass?.category === 'network' ? 'error'
                        : 'info'
                      }
                    >
                      <strong>Navigation not applicable</strong> — this is a{' '}
                      <strong>{errorClass?.category}</strong> error, not a UI element issue.
                      Fix the underlying problem and re-run the test.
                    </Alert>
                  ) : (
                    <div className="flex flex-row flex-wrap gap-2">
                      <Hint title={mcpStatus.available ? 'Navigate the MCP browser to this failure point' : 'MCP server unavailable'}>
                        <span className="inline-flex">
                          <Button
                            disabled={mcpInteracting || !mcpStatus.available}
                            onClick={() => onNavigateToFailureFromTest(test, pageSnapshotContent)}
                            size="sm"
                            variant="default"
                          >
                            {navLoading
                              ? <Spinner aria-hidden="true" className="size-3.5" />
                              : <MapPin aria-hidden="true" className="size-4" />}
                            {navLoading ? 'Navigating…' : 'Navigate to Failure Point'}
                          </Button>
                        </span>
                      </Hint>
                      {matchingAnalysis && (
                        <Hint title="Navigate using MCP analysis context (better selector targeting)">
                          <span className="inline-flex">
                            <Button
                              disabled={mcpInteracting || !mcpStatus.available}
                              onClick={() => onNavigateToFailure(matchingAnalysis)}
                              size="sm"
                              variant="outline"
                            >
                              <Sparkles aria-hidden="true" className="size-4" />
                              Navigate via Analysis
                            </Button>
                          </span>
                        </Hint>
                      )}
                    </div>
                  )}

                  {/* Navigation progress and outcome */}
                  {testNavResult && (
                    <>
                      <NavigationOutcomeBanner
                        currentUrl={testNavResult.currentUrl}
                        error={testNavResult.error}
                        expectedUrl={testNavResult.expectedUrl}
                        outcome={testNavResult.navigationOutcome}
                      />
                      <NavigationProgressLog
                        isActive={testNavResult.loading}
                        steps={testNavResult.steps}
                      />
                      {testNavResult.screenshot && (
                        <div>
                          <span className={cn(CAPTION, 'mb-1 block font-semibold')}>
                            MCP Screenshot (Live Navigation)
                          </span>
                          <FailureScreenshotCard screenshot={testNavResult.screenshot} />
                        </div>
                      )}
                    </>
                  )}

                  {/* ── Full MCP analysis content (merged from analysis card) ── */}
                  {matchingAnalysis && (
                    <>
                      <Separator />

                      {/* Confidence — hidden for non-element errors where it is meaningless */}
                      {!isNonElementError && (
                        <div className="flex flex-row items-center gap-2">
                          <CheckCircle2 aria-hidden="true" className="size-3.5 text-status-pass" />
                          <span className={cn(CAPTION, 'text-foreground-secondary')}>
                            MCP analysis —{' '}
                            <Chip tone={matchingAnalysis.hasHighConfidence() ? 'pass' : 'warn'}>
                              {`${matchingAnalysis.getConfidencePercentage()}% confidence`}
                            </Chip>
                          </span>
                        </div>
                      )}

                      {/* Test context */}
                      {matchingAnalysis.navigationContext && (
                        <div className="border border-primary/60 bg-primary/10 p-3">
                          <span className={cn(CAPTION, 'mb-1 block font-semibold text-primary')}>
                            Test Context:
                          </span>
                          {matchingAnalysis.navigationContext.stepBeforeFailure && (
                            <span className={cn(CAPTION, 'block text-foreground-secondary')}>
                              <strong>Step before failure:</strong>{' '}
                              {matchingAnalysis.navigationContext.stepBeforeFailure.title}
                            </span>
                          )}
                          {matchingAnalysis.navigationContext.failureStep && (
                            <span className={cn(CAPTION, 'block text-status-fail')}>
                              <strong>Failure step:</strong>{' '}
                              {matchingAnalysis.navigationContext.failureStep.title}
                            </span>
                          )}
                          <span className={cn(CAPTION, 'block text-foreground-secondary')}>
                            <strong>URL:</strong> {matchingAnalysis.getNavigationUrl()}
                          </span>
                        </div>
                      )}

                      {/* Failing selector */}
                      {(() => {
                        const isUnknown = !matchingAnalysis.selector || matchingAnalysis.selector === 'unknown';
                        const isElementError = !isNonElementError;
                        const derived = isUnknown && isElementError && test.error
                          ? deriveSelectorsFromError(test.error)
                          : [];

                        // For non-element errors, show a diagnostic banner — no selector label, no suggestions
                        if (isUnknown && isNonElementError && errorClass) {
                          return <ErrorDiagnosticBanner classification={errorClass} />;
                        }

                        return (
                          <div>
                            <div className="mb-1 flex flex-row items-center justify-between">
                              <span className={cn(CAPTION, 'text-foreground-secondary')}>Failing Selector:</span>
                              {!isUnknown && (
                                <Hint title="Copy selector">
                                  <Button
                                    aria-label="Copy selector"
                                    onClick={() => navigator.clipboard.writeText(matchingAnalysis.selector)}
                                    size="icon"
                                    variant="ghost"
                                  >
                                    <Copy aria-hidden="true" className="size-4" />
                                  </Button>
                                </Hint>
                              )}
                            </div>
                            {isUnknown ? (
                              <Alert
                                className={derived.length > 0 ? 'mb-2' : 'mb-0'}
                                icon={<Sparkles aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-status-info" />}
                                variant="info"
                              >
                                Selector not detected from analysis — derived candidates from error message
                                {derived.length === 0 && ' (none found)'}
                              </Alert>
                            ) : (
                              <code className={CODE_BLOCK}>
                                {matchingAnalysis.selector}
                              </code>
                            )}
                            {/* Derived selectors from error — only for genuine element-not-found errors */}
                            {derived.length > 0 && (
                              <div className="mt-2 flex flex-col gap-2">
                                {derived.map((sel, idx) => (
                                  <SelectorRow
                                    disabled={mcpInteracting || !mcpStatus.available}
                                    highlighted={localSelectedLocator === sel}
                                    isLive
                                    key={`derived-${idx}`}
                                    liveValidation={selectorValidations.get(sel)}
                                    onCopy={() => navigator.clipboard.writeText(sel)}
                                    onSelect={() => { setLocalSelectedLocator(sel); onSelectLocator?.(sel); }}
                                    onTest={() => handleValidateSelector(sel)}
                                    selector={sel}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })()}

                      {/* Suggested selectors — specific/moderate only, generic suppressed.
                          Hidden entirely for non-element errors. */}
                      {(() => {
                        if (isNonElementError) return null;

                        const meaningful = sortSelectorsByQuality(
                          (matchingAnalysis.suggestedSelectors ?? []).filter(
                            s => getSelectorQuality(s) !== 'generic'
                          )
                        );

                        if (meaningful.length === 0) {
                          return (
                            <Alert variant="warning">
                              No specific selectors found — navigate to the failure point and re-analyze to generate targeted suggestions.
                            </Alert>
                          );
                        }

                        return (
                          <div>
                            <h6 className="mb-2 mt-0 text-sm font-bold">
                              Suggested Selectors ({meaningful.length}):
                            </h6>
                            <div className="flex flex-col gap-2">
                              {meaningful.map((sel, idx) => (
                                <SelectorRow
                                  disabled={mcpInteracting || !mcpStatus.available}
                                  highlighted={localSelectedLocator === sel}
                                  key={idx}
                                  liveValidation={selectorValidations.get(sel)}
                                  onCopy={() => navigator.clipboard.writeText(sel)}
                                  onSelect={() => { setLocalSelectedLocator(sel); onSelectLocator?.(sel); }}
                                  onTest={() => handleValidateSelector(sel)}
                                  selector={sel}
                                />
                              ))}
                            </div>
                          </div>
                        );
                      })()}

                      {/* Selected locator editor */}
                      {localSelectedLocator && (
                        <div className="rounded border border-primary/60 bg-primary/10 p-4">
                          <span className={cn(CAPTION, 'mb-1 block font-semibold text-primary')}>
                            Selected Locator:
                          </span>
                          <div className="flex flex-row gap-2">
                            <div className="flex-1 border border-border bg-shell-input px-2">
                              <Input
                                aria-label="Selected locator"
                                onChange={e => setLocalSelectedLocator(e.target.value)}
                                placeholder="Enter or modify locator…"
                                value={localSelectedLocator}
                              />
                            </div>
                            {onTabChange && matchingAnalysis.testFile && (
                              <Button
                                onClick={() => {
                                  onTabChange('details');
                                  // eslint-disable-next-line no-alert
                                  alert(`Locator selected: ${localSelectedLocator}\n\nNavigate to the test file to update:\n${matchingAnalysis.testFile}`);
                                }}
                                size="sm"
                                variant="default"
                              >
                                Go to Test
                              </Button>
                            )}
                          </div>
                          {matchingAnalysis.testFile && (
                            <span className={cn(CAPTION, 'mt-2 block text-foreground-secondary')}>
                              Update the locator in: <code>{matchingAnalysis.testFile}</code>
                            </span>
                          )}
                        </div>
                      )}

                      {/* Element info — hidden for non-element errors or when the only info is "unknown" tag */}
                      {matchingAnalysis.elementInfo && !isNonElementError && (
                        (() => {
                          const { tag, text, attributes } = matchingAnalysis.elementInfo as {
                            tag?: string;
                            text?: string;
                            attributes?: Record<string, string>;
                          };
                          const hasUsefulInfo = (tag && tag !== 'unknown') || text || attributes?.['data-testid'];
                          if (!hasUsefulInfo) return null;
                          return (
                            <>
                              <Separator />
                              <span className={cn(CAPTION, 'block text-foreground-secondary')}>
                                Element Info:
                              </span>
                              <div className="flex flex-col gap-0.5">
                                {tag && tag !== 'unknown' && (
                                  <span className={CAPTION}>Tag: <code>{tag}</code></span>
                                )}
                                {text && (
                                  <span className={CAPTION}>
                                    Text: {text.substring(0, 60)}
                                  </span>
                                )}
                                {attributes?.['data-testid'] && (
                                  <span className={CAPTION}>
                                    Test ID: <code>{attributes['data-testid']}</code>
                                  </span>
                                )}
                              </div>
                            </>
                          );
                        })()
                      )}
                    </>
                  )}

                  {!testNavResult && !matchingAnalysis && (
                    <span className={cn(CAPTION, 'text-foreground-secondary')}>
                      Click "Navigate to Failure Point" to start MCP analysis, or "Analyze Failing Elements" for selector recommendations.
                    </span>
                  )}
                </div>
                );
              })()}
              </TabsContent>
            </div>
          </Tabs>
        </div>
      )}
    </div>
  );
};

/* ─── SelectorRow ────────────────────────────────────────── */
const SelectorRow = ({
  disabled,
  highlighted,
  isLive,
  liveValidation,
  onCopy,
  onSelect,
  onTest,
  selector,
  validation,
}: {
  disabled?: boolean;
  highlighted?: boolean;
  isLive?: boolean;
  liveValidation?: LiveValidation;
  onCopy: () => void;
  onSelect: () => void;
  onTest: () => void;
  selector: string;
  validation?: ValidatedSelector;
}) => {
  const quality = getSelectorQuality(selector);
  const borderColor = highlighted
    ? 'border-primary'
    : liveValidation && !liveValidation.loading && !liveValidation.error
      ? liveValidation.count === -1 ? 'border-status-info/60'
        : liveValidation.count === 1 ? 'border-status-pass'
        : liveValidation.count === 0 ? 'border-status-fail'
        : 'border-status-warn'
      : validation?.status === 'pass' ? 'border-status-pass/60'
        : validation?.status === 'fail' ? 'border-status-fail/60'
        : 'border-border';

  const bgColor = highlighted
    ? 'bg-primary/10'
    : liveValidation && !liveValidation.loading && !liveValidation.error
      ? liveValidation.count === -1 ? 'bg-shell-panel'
        : liveValidation.count === 1 ? 'bg-status-pass/10'
        : liveValidation.count === 0 ? 'bg-status-fail/10'
        : 'bg-status-warn/10'
      : 'bg-shell-panel';

  return (
    <div className={cn('flex flex-col gap-1.5 rounded border p-3', borderColor, bgColor)}>
      {/* Badge row */}
      <div className="flex flex-row flex-wrap items-center gap-1">
        {isLive && (
          <Chip icon={<Sparkles aria-hidden="true" className={CHIP_ICON} />} tone="info">Derived</Chip>
        )}
        {quality === 'generic' && (
          <Chip className={OUTLINED_CHIP} tone="warn">Ambiguous</Chip>
        )}
        {quality === 'specific' && !liveValidation && (
          <Chip className={OUTLINED_CHIP} tone="pass">Specific</Chip>
        )}
        {validation && <SelectorValidationBadge validation={validation} />}
        {/* Live MCP validation result */}
        {liveValidation?.loading && (
          <div className="flex flex-row items-center gap-1">
            <Spinner className="size-2.5" />
            <span className={cn(CAPTION, 'text-foreground-secondary')}>Checking…</span>
          </div>
        )}
        {liveValidation && !liveValidation.loading && liveValidation.count !== -1 && !liveValidation.error && (
          <Chip
            icon={
              liveValidation.count === 1 ? <CheckCircle2 aria-hidden="true" className={CHIP_ICON} />
              : liveValidation.count === 0 ? <XCircle aria-hidden="true" className={CHIP_ICON} />
              : <AlertTriangle aria-hidden="true" className={CHIP_ICON} />
            }
            tone={liveValidation.count === 1 ? 'pass' : liveValidation.count === 0 ? 'fail' : 'warn'}
          >
            {
              liveValidation.count === 0 ? 'No match'
              : liveValidation.count === 1 ? '1 match'
              : `${liveValidation.count} matches — ambiguous`
            }
          </Chip>
        )}
        {liveValidation && !liveValidation.loading && liveValidation.count === -1 && (
          <Chip className={OUTLINED_CHIP} tone="info">Playwright locator — use in test code</Chip>
        )}
        {liveValidation?.error && liveValidation.count !== -1 && (
          <Chip className={OUTLINED_CHIP} tone="fail">{`Error: ${liveValidation.error.slice(0, 40)}`}</Chip>
        )}
      </div>

      {/* Selector code + actions */}
      <div className="flex flex-row items-start gap-2">
        <code className="flex-1 font-mono text-[0.8rem] [word-break:break-all]">
          {selector}
        </code>
        <div className="flex shrink-0 flex-row gap-1">
          <Hint title="Copy">
            <Button aria-label="Copy" onClick={onCopy} size="icon" variant="ghost">
              <Copy aria-hidden="true" className="size-4" />
            </Button>
          </Hint>
          <Button disabled={disabled} onClick={onSelect} size="sm" variant="outline">
            Select
          </Button>
          <Hint title={liveValidation?.loading ? 'Validating…' : 'Test against live MCP page'}>
            <span className="inline-flex">
              <Button
                disabled={disabled || liveValidation?.loading}
                onClick={onTest}
                size="sm"
                variant="default"
              >
                {liveValidation?.loading
                  ? <Spinner aria-hidden="true" className="size-3" />
                  : <FlaskConical aria-hidden="true" className="size-4" />}
                Test
              </Button>
            </span>
          </Hint>
        </div>
      </div>

      {/* First-match sample */}
      {liveValidation && !liveValidation.loading && (liveValidation.matches?.length ?? 0) > 0 && (
        <div className="pl-1">
          {liveValidation.matches!.slice(0, 3).map((m, i) => (
            <span className={cn(CAPTION, 'block font-mono text-foreground-secondary')} key={i}>
              &lt;{m.tag}{m.id ? ` id="${m.id}"` : ''}&gt; {m.text || '(no text)'}
            </span>
          ))}
          {(liveValidation.matches!.length > 3) && (
            <span className={cn(CAPTION, 'text-foreground-muted')}>…and {liveValidation.matches!.length - 3} more</span>
          )}
        </div>
      )}
    </div>
  );
};

/* ─── MCPDebugTab ────────────────────────────────────────── */
export const MCPDebugTab = ({
  analyses,
  failedTestResults,
  mcpInteracting,
  mcpLoading,
  mcpStatus,
  onAnalyze,
  onNavigateToFailure,
  onNavigateToFailureFromTest,
  onSelectLocator,
  onTabChange,
  onTestSelector,
  selectedAnalysis,
  selectedLocator,
  testNavResults,
  testResults,
}: MCPDebugTabProps) => {
  const [localSelectedLocator, setLocalSelectedLocator] = useState(selectedLocator || '');
  const [, setShowOriginalSelectors] = useState(false);

  const failedTests = useMemo(() => {
    if (failedTestResults && failedTestResults.length > 0) return failedTestResults;
    return testResults.filter(r => r.status === 'failed');
  }, [failedTestResults, testResults]);

  const failedAnalyses = useMemo(
    () => MCPAnalysisFilter.filterFailedTests(analyses, testResults),
    [analyses, testResults]
  );

  const filterStats = useMemo(
    () => MCPAnalysisFilter.getFilterStats(analyses, failedAnalyses),
    [analyses, failedAnalyses]
  );

  // Analyses that have no matching failed test result — rendered in old-style cards below
  const orphanedAnalyses = useMemo(
    () => failedAnalyses.filter(
      a => !failedTests.some(
        t => t.id === a.testResultId || t.name === a.testName || t.file === a.testFile
      )
    ),
    [failedAnalyses, failedTests]
  );

  const handleSelectLocator = (selector: string, index: number) => {
    setLocalSelectedLocator(selector);
    onSelectLocator?.(selector, index);
  };

  /* ── Loading ── */
  if (mcpLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="flex flex-col items-center gap-4">
          <Spinner className="size-10" />
          <p className="m-0 text-foreground-secondary">Analyzing failing elements with MCP…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-foreground">
      {/* ── Header ── */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <div className="mb-1 flex flex-row items-center gap-2">
            <Bug aria-hidden="true" className="size-6 text-foreground-secondary" />
            <h6 className="m-0 text-lg font-bold">MCP Debug</h6>
            <Chip tone="fail">Failed Tests Only</Chip>
            <Chip tone={mcpStatus.available ? 'pass' : 'fail'}>
              {mcpStatus.cliMode ? 'CLI Mode' : mcpStatus.available ? 'MCP Available' : 'MCP Unavailable'}
            </Chip>
          </div>
          <p className="m-0 text-sm text-foreground-secondary">
            {mcpStatus.cliMode
              ? 'Analyze failing elements and get better selectors using Playwright CLI'
              : 'Analyze failing elements and get better selectors using Playwright MCP'}
          </p>
        </div>
        <Button
          className="shrink-0"
          disabled={mcpLoading || !mcpStatus.available}
          onClick={onAnalyze}
          size="sm"
          variant="default"
        >
          <Bug aria-hidden="true" className="size-4" />
          {mcpLoading ? 'Analyzing…' : 'Analyze Failing Elements'}
        </Button>
      </div>

      {/* ── Filter info ── */}
      {filterStats.total > 0 && (
        <Alert className="mb-4" variant="info">
          {failedAnalyses.length > 0
            ? `${failedAnalyses.length} MCP ${failedAnalyses.length === 1 ? 'analysis' : 'analyses'} loaded — selector suggestions are shown inside each failed test card`
            : `${filterStats.total} total analyses, none matched failed tests`}
          {filterStats.excluded > 0 && ` — ${filterStats.excluded} excluded (passed tests)`}
        </Alert>
      )}

      {/* ── Failed test results (per-test tabbed cards) ── */}
      {failedTests.length > 0 && (
        <div className="mb-8">
          <div className="mb-4 flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <AlertCircle aria-hidden="true" className="size-4 text-status-fail" />
              <h6 className="m-0 text-base font-bold">
                Failed Test Results ({failedTests.length})
              </h6>
            </div>
            <Chip tone="fail">{`${failedTests.length} failure${failedTests.length !== 1 ? 's' : ''}`}</Chip>
          </div>

          <div className="flex flex-col gap-4">
            {failedTests.map((test, idx) => {
              const testKey = test.id || `test-${idx}`;
              const matchingAnalysis = failedAnalyses.find(
                a => a.testResultId === test.id || a.testName === test.name || a.testFile === test.file
              );
              return (
                <FailedTestCard
                  key={testKey}
                  matchingAnalysis={matchingAnalysis}
                  mcpInteracting={mcpInteracting}
                  mcpStatus={mcpStatus}
                  onNavigateToFailure={onNavigateToFailure}
                  onNavigateToFailureFromTest={onNavigateToFailureFromTest}
                  onSelectLocator={selector => onSelectLocator?.(selector, idx)}
                  onTabChange={onTabChange}
                  test={test}
                  testNavResult={test.id ? testNavResults.get(test.id) : undefined}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* ── Orphaned MCP Analyses (no matching failed test card) ── */}
      {orphanedAnalyses.length > 0 ? (
        <div className="flex flex-col gap-6">
          {orphanedAnalyses.map((analysis, index) => {
            const isSelected = selectedAnalysis === index;
            const currentSelectedLocator = isSelected && selectedLocator ? selectedLocator : localSelectedLocator;

            return (
              <div
                className={cn('bg-shell-panel p-4', isSelected ? 'border-2 border-primary' : 'border border-border')}
                key={analysis.id}
              >
                {/* Analysis header */}
                <div className="mb-4 flex flex-row items-start justify-between gap-2">
                  <div className="flex flex-row flex-wrap items-center gap-2">
                    <h6 className="m-0 text-base font-bold">
                      {analysis.testName || 'Failing Test'}
                    </h6>
                    {analysis.qaseId && <Chip>{`Qase ID: ${analysis.qaseId}`}</Chip>}
                    {analysis.testFile && (
                      <Chip className={OUTLINED_CHIP} icon={<FileText aria-hidden="true" className={CHIP_ICON} />}>
                        {analysis.testFile.split('/').pop()}
                      </Chip>
                    )}
                  </div>
                  <Chip className="shrink-0" tone={analysis.hasHighConfidence() ? 'pass' : 'warn'}>
                    {`${analysis.getConfidencePercentage()}% confidence`}
                  </Chip>
                </div>

                {/* Test context */}
                {analysis.navigationContext && (
                  <div className="mb-4 border border-primary/60 bg-primary/10 p-3">
                    <span className={cn(CAPTION, 'mb-1 block font-semibold text-primary')}>
                      Test Context:
                    </span>
                    {analysis.navigationContext.stepBeforeFailure && (
                      <span className={cn(CAPTION, 'block text-foreground-secondary')}>
                        <strong>Step before failure:</strong>{' '}
                        {analysis.navigationContext.stepBeforeFailure.title}
                      </span>
                    )}
                    {analysis.navigationContext.failureStep && (
                      <span className={cn(CAPTION, 'block text-status-fail')}>
                        <strong>Failure step:</strong>{' '}
                        {analysis.navigationContext.failureStep.title}
                      </span>
                    )}
                    <span className={cn(CAPTION, 'block text-foreground-secondary')}>
                      <strong>URL:</strong> {analysis.getNavigationUrl()}
                    </span>
                  </div>
                )}

                {/* Failing selector */}
                <div className="mb-4">
                  <div className="mb-1 flex flex-row items-center justify-between">
                    <span className={cn(CAPTION, 'text-foreground-secondary')}>Failing Selector:</span>
                    <Hint title="Copy">
                      <Button
                        aria-label="Copy"
                        onClick={() => navigator.clipboard.writeText(analysis.selector)}
                        size="icon"
                        variant="ghost"
                      >
                        <Copy aria-hidden="true" className="size-4" />
                      </Button>
                    </Hint>
                  </div>
                  <code className={cn(CODE_BLOCK, 'text-[0.85rem]')}>
                    {analysis.selector}
                  </code>
                </div>

                {/* Navigate to failure — always shown when MCP is available */}
                <Hint title={!mcpStatus.available ? 'MCP server unavailable' : analysis.hasNavigationContext() ? 'Navigate to the failure URL' : 'Navigate to the test base URL (no specific URL detected)'}>
                  <span className="mb-4 inline-flex">
                    <Button
                      disabled={mcpInteracting || !mcpStatus.available}
                      onClick={() => onNavigateToFailure(analysis)}
                      size="sm"
                      variant="outline"
                    >
                      <MapPin aria-hidden="true" className="size-4" />
                      {mcpInteracting ? 'Navigating…' : 'Navigate to Failure Point'}
                    </Button>
                  </span>
                </Hint>

                {/* Suggested selectors */}
                {analysis.suggestedSelectors && analysis.suggestedSelectors.length > 0 && (
                  <div>
                    {false ? (
                      <Accordion collapsible type="single">
                        <AccordionItem className="rounded-lg" value="original">
                          <AccordionTrigger onClick={() => setShowOriginalSelectors(v => !v)}>
                            <span className="text-sm font-semibold">
                              Original Suggested Selectors ({analysis.suggestedSelectors.length})
                            </span>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="flex flex-col gap-2 opacity-80">
                              {analysis.suggestedSelectors.map((selector, idx) => (
                                <SelectorRow
                                  disabled={mcpInteracting}
                                  highlighted={isSelected && currentSelectedLocator === selector}
                                  key={idx}
                                  onCopy={() => navigator.clipboard.writeText(selector)}
                                  onSelect={() => handleSelectLocator(selector, index)}
                                  onTest={() => onTestSelector(selector)}
                                  selector={selector}
                                />
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ) : (
                      <>
                        <h6 className="mb-2 mt-0 text-sm font-bold">
                          Suggested Selectors ({analysis.suggestedSelectors.length}):
                        </h6>
                        <div className="flex flex-col gap-2">
                          {analysis.suggestedSelectors.map((selector, idx) => (
                            <SelectorRow
                              disabled={mcpInteracting}
                              highlighted={isSelected && currentSelectedLocator === selector}
                              key={idx}
                              onCopy={() => navigator.clipboard.writeText(selector)}
                              onSelect={() => handleSelectLocator(selector, index)}
                              onTest={() => onTestSelector(selector)}
                              selector={selector}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Selected locator editor */}
                {isSelected && currentSelectedLocator && (
                  <div className="mt-4 rounded border border-primary/60 bg-primary/10 p-4">
                    <span className={cn(CAPTION, 'mb-1 block font-semibold text-primary')}>
                      Selected Locator:
                    </span>
                    <div className="flex flex-row gap-2">
                      <div className="flex-1 border border-border bg-shell-input px-2">
                        <Input
                          aria-label="Selected locator"
                          onChange={e => setLocalSelectedLocator(e.target.value)}
                          placeholder="Enter or modify locator…"
                          value={currentSelectedLocator}
                        />
                      </div>
                      {onTabChange && analysis.testFile && (
                        <Button
                          onClick={() => {
                            onTabChange('details');
                            // eslint-disable-next-line no-alert
                            alert(`Locator selected: ${currentSelectedLocator}\n\nNavigate to the test file to update:\n${analysis.testFile}`);
                          }}
                          size="sm"
                          variant="default"
                        >
                          Go to Test
                        </Button>
                      )}
                    </div>
                    {analysis.testFile && (
                      <span className={cn(CAPTION, 'mt-2 block text-foreground-secondary')}>
                        Update the locator in: <code>{analysis.testFile}</code>
                      </span>
                    )}
                  </div>
                )}

                {/* Element info */}
                {analysis.elementInfo && (
                  <>
                    <Separator className="my-4" />
                    <span className={cn(CAPTION, 'mb-1 block text-foreground-secondary')}>
                      Element Info:
                    </span>
                    <div className="flex flex-col gap-0.5">
                      {analysis.elementInfo.tag && (
                        <span className={CAPTION}>
                          Tag: <code>{analysis.elementInfo.tag}</code>
                        </span>
                      )}
                      {analysis.elementInfo.text && (
                        <span className={CAPTION}>
                          Text: {analysis.elementInfo.text.substring(0, 50)}
                        </span>
                      )}
                      {analysis.elementInfo.attributes?.['data-testid'] && (
                        <span className={CAPTION}>
                          Test ID: <code>{analysis.elementInfo.attributes['data-testid']}</code>
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      ) : failedTests.length === 0 ? (
        /* ── Empty state — no failed tests at all ── */
        <div className="border border-border bg-shell-panel p-12 text-center">
          <Bug aria-hidden="true" className="mx-auto mb-4 block size-12 text-foreground-muted" />
          <h6 className="mb-2 mt-0 text-lg font-medium">No Failed Test Analyses Available</h6>
          <p className="mb-4 mt-0 text-sm text-foreground-secondary">
            {analyses.length > 0
              ? `Found ${analyses.length} analyses, but none match failed tests here.`
              : mcpStatus.cliMode
                ? 'Click "Analyze Failing Elements" to use Playwright CLI to find better selectors for failing tests.'
                : 'Click "Analyze Failing Elements" to use MCP to find better selectors for failing tests.'}
          </p>
          <div className="mb-6 border border-border bg-shell-main p-4 text-left">
            <span className={cn(CAPTION, 'mb-1 block font-semibold')}>Tips:</span>
            <ul className="m-0 flex list-disc flex-col gap-1 pl-4">
              {(mcpStatus.cliMode
                ? ['MCP Debug only shows analyses for tests that failed', 'Playwright CLI mode is active — no MCP server required', 'Analyses help identify better selectors for failing elements']
                : ['MCP Debug only shows analyses for tests that failed', 'Make sure the Playwright MCP server is running: npm run mcp:start', 'Analyses help identify better selectors for failing elements']
              ).map(tip => (
                <li className={CAPTION} key={tip}>{tip}</li>
              ))}
            </ul>
          </div>
          {mcpStatus.available && (
            <Button className="mx-auto" onClick={onAnalyze} variant="default">
              <Bug aria-hidden="true" className="size-4" />
              Analyze Failing Elements
            </Button>
          )}
        </div>
      ) : null}
    </div>
  );
};
