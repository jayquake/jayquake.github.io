import { useEffect, useMemo, useRef, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import MovieIcon from '@mui/icons-material/Movie';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BugReportIcon from '@mui/icons-material/BugReport';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DescriptionIcon from '@mui/icons-material/Description';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ScienceIcon from '@mui/icons-material/Science';
import VisibilityIcon from '@mui/icons-material/Visibility';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import { api } from '../../../api/client';
import { StepList } from '../../../components/standalone/StepList';
import { type MCPAnalysis } from '../models/MCPAnalysis';
import { type TestResult } from '../models/TestRunData';
import { MCPAnalysisFilter } from '../services/MCPAnalysisFilter';
import { type TestNavResult } from '../../../../shared/types';

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
    icon={<WarningAmberIcon />}
    severity={classification.category === 'assertion' ? 'info' : 'warning'}
  >
    <AlertTitle>{classification.headline}</AlertTitle>
    {classification.detail}
    <Typography display="block" sx={{ mt: 0.5 }} variant="caption">
      Hint: {classification.hint}
    </Typography>
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
    if (s === 'running') return <CircularProgress size={12} />;
    if (s === 'done') return <CheckCircleIcon color="success" sx={{ fontSize: 14 }} />;
    return <CancelIcon color="error" sx={{ fontSize: 14 }} />;
  };

  return (
    <Paper sx={{ mb: 2, overflow: 'hidden' }} variant="outlined">
      <Stack
        alignItems="center"
        direction="row"
        spacing={1}
        sx={{ px: 2, py: 1, borderBottom: 1, borderColor: 'divider', bgcolor: 'background.default' }}
      >
        <AccessTimeIcon fontSize="small" color="action" />
        <Typography color="text.secondary" variant="caption" fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
          Navigation Progress
        </Typography>
        {isActive && (
          <Stack alignItems="center" direction="row" spacing={0.5} sx={{ ml: 'auto !important' }}>
            <CircularProgress size={10} />
            <Typography color="primary" variant="caption">In progress…</Typography>
          </Stack>
        )}
      </Stack>
      <Box sx={{ maxHeight: 256, overflowY: 'auto', p: 1 }}>
        <List dense disablePadding>
          {steps.map((s, i) => (
            <ListItem
              key={i}
              sx={{
                borderRadius: 1,
                mb: 0.25,
                bgcolor: s.status === 'error' ? 'error.50' : s.status === 'running' ? 'info.50' : 'transparent',
                gap: 1,
                alignItems: 'flex-start',
                py: 0.5,
              }}
            >
              <Box sx={{ mt: 0.25, flexShrink: 0 }}>{statusIcon(s.status)}</Box>
              <ListItemText
                primary={s.step}
                primaryTypographyProps={{ variant: 'caption', fontWeight: 500 }}
                secondary={s.detail}
                secondaryTypographyProps={{ variant: 'caption', sx: { wordBreak: 'break-all' } }}
              />
              <Typography color="text.disabled" variant="caption" sx={{ flexShrink: 0, fontSize: '0.65rem' }}>
                {new Date(s.timestamp).toLocaleTimeString()}
              </Typography>
            </ListItem>
          ))}
          {isActive && steps.length === 0 && (
            <ListItem sx={{ gap: 1 }}>
              <CircularProgress size={12} />
              <Typography color="text.secondary" variant="caption">Starting navigation…</Typography>
            </ListItem>
          )}
        </List>
        <div ref={bottomRef} />
      </Box>
    </Paper>
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
      <Accordion expanded={expanded} onChange={() => setExpanded(v => !v)} sx={{ mb: 2 }} variant="outlined">
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Stack alignItems="center" direction="row" spacing={1}>
            <VisibilityIcon color="primary" fontSize="small" />
            <Typography variant="caption" fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
              Failure Point Screenshot
            </Typography>
            <Chip label="Captured" size="small" color="info" />
          </Stack>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 0 }}>
          <Box
            alt="Failure point"
            component="img"
            onClick={() => setDialogOpen(true)}
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.style.display = 'none';
            }}
            src={src}
            sx={{ width: '100%', borderRadius: 1, border: 1, borderColor: 'divider', cursor: 'pointer', '&:hover': { opacity: 0.9 } }}
          />
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            <Button onClick={() => setDialogOpen(true)} size="small" startIcon={<VisibilityIcon />} variant="outlined">
              View Full Size
            </Button>
            <Button
              onClick={() => {
                const link = document.createElement('a');
                link.download = `failure-screenshot-${Date.now()}.png`;
                link.href = src;
                link.click();
              }}
              size="small"
              startIcon={<ContentCopyIcon />}
              variant="outlined"
            >
              Download
            </Button>
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Dialog maxWidth="xl" onClose={() => setDialogOpen(false)} open={dialogOpen}>
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          <IconButton
            onClick={() => setDialogOpen(false)}
            sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(0,0,0,0.6)', color: 'white', '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' } }}
          >
            <CloseIcon />
          </IconButton>
          <Box alt="Failure point — full size" component="img" src={src} sx={{ maxWidth: '90vw', maxHeight: '90vh', display: 'block' }} />
        </DialogContent>
      </Dialog>
    </>
  );
};

/* ─── SelectorValidationBadge ────────────────────────────── */
const SelectorValidationBadge = ({ validation }: { validation: ValidatedSelector }) => {
  if (validation.status === 'pass' && validation.count === 1) {
    return (
      <Chip
        color="success"
        icon={<CheckCircleIcon />}
        label={`1 match${validation.tag ? ` (${validation.tag})` : ''}`}
        size="small"
      />
    );
  }
  if (validation.status === 'pass' && validation.count > 1) {
    return (
      <Chip
        color="warning"
        icon={<WarningAmberIcon />}
        label={`${validation.count} matches — ambiguous`}
        size="small"
      />
    );
  }
  return <Chip color="error" icon={<CancelIcon />} label="No match" size="small" />;
};


/* ─── NavigationOutcomeBanner ────────────────────────────── */
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
      <Alert severity="success" sx={{ mb: 2 }}>
        Navigation succeeded — confirmed on the expected page
        {currentUrl && (
          <Typography component="div" variant="caption" sx={{ mt: 0.5, fontFamily: 'monospace', wordBreak: 'break-all' }}>
            {currentUrl}
          </Typography>
        )}
      </Alert>
    );
  }

  if (outcome === 'auth-redirect') {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        <strong>Authentication Required</strong> — Redirected to login page instead of the failure URL.
        {currentUrl && (
          <Typography component="div" variant="caption" sx={{ mt: 0.5, fontFamily: 'monospace', wordBreak: 'break-all' }}>
            Landed on: {currentUrl}
          </Typography>
        )}
        {expectedUrl && (
          <Typography component="div" variant="caption" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
            Expected: {expectedUrl}
          </Typography>
        )}
        {error && (
          <Typography component="div" variant="caption" sx={{ mt: 0.5, color: 'error.dark' }}>
            {error}
          </Typography>
        )}
      </Alert>
    );
  }

  if (outcome === 'not-loaded') {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        <strong>Page Did Not Load</strong> — The browser could not reach the failure URL.
        {error && (
          <Typography component="div" variant="caption" sx={{ mt: 0.5 }}>{error}</Typography>
        )}
      </Alert>
    );
  }

  if (outcome === 'wrong-page') {
    return (
      <Alert severity="warning" sx={{ mb: 2 }}>
        <strong>Wrong Page</strong> — Navigation landed on a different page than expected. Screenshot was taken from the actual location.
        {currentUrl && (
          <Typography component="div" variant="caption" sx={{ mt: 0.5, fontFamily: 'monospace', wordBreak: 'break-all' }}>
            Actual: {currentUrl}
          </Typography>
        )}
        {expectedUrl && (
          <Typography component="div" variant="caption" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
            Expected: {expectedUrl}
          </Typography>
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
      <Box sx={{ py: 2 }}>
        <LinearProgress />
        <Typography color="text.secondary" sx={{ mt: 1 }} variant="caption">
          Loading test artifacts…
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="warning" sx={{ mt: 1 }}>
        Could not load artifacts: {error}
      </Alert>
    );
  }

  if (!artifacts) return null;

  const hasArtifacts = artifacts.screenshotUrl || artifacts.videoUrl || artifacts.pageSnapshotContent;
  if (!hasArtifacts) {
    return (
      <Typography color="text.secondary" variant="caption">
        No artifacts found for this test result.
      </Typography>
    );
  }

  const fullScreenshotSrc = artifacts.screenshotUrl
    ? `${API_BASE_URL}${artifacts.screenshotUrl.startsWith('/') ? '' : '/'}${artifacts.screenshotUrl}`
    : null;

  const fullVideoSrc = artifacts.videoUrl
    ? `${API_BASE_URL}${artifacts.videoUrl.startsWith('/') ? '' : '/'}${artifacts.videoUrl}`
    : null;

  return (
    <Stack spacing={2}>
      {/* Screenshot */}
      {fullScreenshotSrc && (
        <Box>
          <Stack alignItems="center" direction="row" spacing={1} sx={{ mb: 1 }}>
            <PhotoCameraIcon color="error" fontSize="small" />
            <Typography fontWeight={600} variant="caption">Failure Screenshot</Typography>
            <Chip color="error" label="At failure" size="small" />
          </Stack>
          <Box
            alt="Test failure screenshot"
            component="img"
            onClick={() => setScreenshotDialogOpen(true)}
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.style.display = 'none'; }}
            src={fullScreenshotSrc}
            sx={{ width: '100%', maxHeight: 320, objectFit: 'contain', border: 1, borderColor: 'divider', borderRadius: 1, cursor: 'zoom-in', bgcolor: 'background.default' }}
          />
          <Button
            onClick={() => setScreenshotDialogOpen(true)}
            size="small"
            startIcon={<VisibilityIcon />}
            sx={{ mt: 0.5 }}
            variant="text"
          >
            View Full Size
          </Button>
          <Dialog maxWidth="xl" onClose={() => setScreenshotDialogOpen(false)} open={screenshotDialogOpen}>
            <DialogContent sx={{ p: 0, position: 'relative' }}>
              <IconButton
                onClick={() => setScreenshotDialogOpen(false)}
                sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(0,0,0,0.6)', color: 'white' }}
              >
                <CloseIcon />
              </IconButton>
              <Box alt="Full size failure screenshot" component="img" src={fullScreenshotSrc} sx={{ maxWidth: '90vw', maxHeight: '90vh', display: 'block' }} />
            </DialogContent>
          </Dialog>
        </Box>
      )}

      {/* Video */}
      {fullVideoSrc && (
        <Box>
          <Stack alignItems="center" direction="row" spacing={1} sx={{ mb: 1 }}>
            <MovieIcon color="secondary" fontSize="small" />
            <Typography fontWeight={600} variant="caption">Test Recording</Typography>
          </Stack>
          <Box
            component="video"
            controls
            src={fullVideoSrc}
            sx={{ width: '100%', maxHeight: 360, borderRadius: 1, border: 1, borderColor: 'divider', display: 'block' }}
          />
        </Box>
      )}

      {/* Page Snapshot */}
      {artifacts.pageSnapshotContent && (
        <Box>
          <Stack alignItems="center" direction="row" spacing={1} sx={{ mb: 0.5 }}>
            <TextSnippetIcon color="info" fontSize="small" />
            <Typography fontWeight={600} variant="caption">Page Snapshot at Failure</Typography>
            <Chip color="info" label="Accessibility tree" size="small" />
          </Stack>
          <Accordion
            expanded={snapshotExpanded}
            onChange={() => setSnapshotExpanded(v => !v)}
            sx={{ border: 1, borderColor: 'divider' }}
            variant="outlined"
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="caption" fontWeight={600}>
                {snapshotExpanded ? 'Hide' : 'Show'} page accessibility tree YAML ({(artifacts.pageSnapshotContent.length / 1024).toFixed(1)} KB)
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <Box
                component="pre"
                sx={{
                  m: 0, p: 2, maxHeight: 400, overflowY: 'auto',
                  fontSize: '0.7rem', fontFamily: 'monospace', lineHeight: 1.5,
                  wordBreak: 'break-all', whiteSpace: 'pre-wrap',
                  bgcolor: 'background.default',
                }}
              >
                {artifacts.pageSnapshotContent}
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      )}
    </Stack>
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
    <Card
      sx={{ borderLeft: 4, borderColor: hasMcpData ? 'primary.main' : 'error.main' }}
      variant="outlined"
    >
      {/* ── Header (always visible) ── */}
      <CardContent
        onClick={() => setExpanded(v => !v)}
        sx={{ cursor: 'pointer', pb: expanded ? undefined : '16px !important' }}
      >
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={1}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack alignItems="center" direction="row" spacing={1} sx={{ mb: 0.5 }} flexWrap="wrap">
              <Chip color="error" label="FAILED" size="small" />
              {hasMcpData && <Chip color="primary" label="Analyzed" size="small" />}
              <Typography fontWeight={600} noWrap variant="body2">{test.name}</Typography>
            </Stack>
            <Stack alignItems="center" direction="row" spacing={1}>
              <DescriptionIcon sx={{ fontSize: 12, color: 'text.secondary' }} />
              <Typography color="text.secondary" component="code" noWrap variant="caption">
                {test.file.split('/').slice(-2).join('/')}
              </Typography>
              {test.duration && (
                <Typography color="text.secondary" variant="caption">
                  ⏱ {(test.duration / 1000).toFixed(2)}s
                </Typography>
              )}
              {test.qaseId && <Chip label={`Qase #${test.qaseId}`} size="small" />}
            </Stack>
          </Box>
          {expanded ? <ExpandMoreIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
        </Stack>
      </CardContent>

      {/* ── Expanded content ── */}
      {expanded && (
        <Box onClick={e => e.stopPropagation()} sx={{ borderTop: 1, borderColor: 'divider' }}>
          <Tabs
            onChange={(_, v) => setActiveTab(v)}
            sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}
            value={activeTab}
            variant="scrollable"
          >
            <Tab label="Error" value="error" />
            <Tab label="Artifacts" value="artifacts" />
            <Tab
              label={
                navLoading ? (
                  <Stack alignItems="center" direction="row" spacing={0.5}>
                    <CircularProgress size={10} />
                    <span>MCP Analysis</span>
                  </Stack>
                ) : 'MCP Analysis'
              }
              value="mcp"
            />
          </Tabs>

          <Box sx={{ p: 2 }}>
            {/* ── Error tab ── */}
            {activeTab === 'error' && (
              <Stack spacing={2}>
                {test.error && (
                  <Alert icon={<ErrorOutlineIcon />} severity="error">
                    <Box
                      component="pre"
                      sx={{ m: 0, fontSize: '0.75rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-all', maxHeight: 200, overflowY: 'auto' }}
                    >
                      {test.error}
                    </Box>
                  </Alert>
                )}
                {test.steps && test.steps.length > 0 && (
                  <Box>
                    <Typography color="text.secondary" fontWeight={600} gutterBottom variant="caption">
                      Test Steps ({test.steps.length}):
                    </Typography>
                    <StepList
                      enableFilter
                      maxSteps={15}
                      steps={test.steps.map((s, i) => ({ ...s, order: i + 1 }))}
                    />
                  </Box>
                )}
                {!test.error && !test.steps?.length && (
                  <Typography color="text.secondary" variant="caption">No error details available.</Typography>
                )}
              </Stack>
            )}

            {/* ── Artifacts tab ── */}
            {activeTab === 'artifacts' && (
              <TestArtifactsViewer
                onSnapshotLoaded={setPageSnapshotContent}
                testResultId={test.id}
              />
            )}

            {/* ── MCP Analysis tab ── */}
            {activeTab === 'mcp' && (() => {
              const errorClass = test.error ? classifyError(test.error) : null;
              const isNonElementError = errorClass !== null
                && errorClass.category !== 'element'
                && errorClass.category !== 'unknown';

              return (
              <Stack spacing={2}>
                {/* Navigate buttons — hidden entirely for config/network/auth errors */}
                {isNonElementError ? (
                  <Alert
                    severity={
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
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    <Tooltip title={mcpStatus.available ? 'Navigate the MCP browser to this failure point' : 'MCP server unavailable'}>
                      <span>
                        <Button
                          disabled={mcpInteracting || !mcpStatus.available}
                          onClick={() => onNavigateToFailureFromTest(test, pageSnapshotContent)}
                          size="small"
                          startIcon={navLoading ? <CircularProgress size={14} /> : <LocationOnIcon />}
                          variant="contained"
                        >
                          {navLoading ? 'Navigating…' : 'Navigate to Failure Point'}
                        </Button>
                      </span>
                    </Tooltip>
                    {matchingAnalysis && (
                      <Tooltip title="Navigate using MCP analysis context (better selector targeting)">
                        <span>
                          <Button
                            disabled={mcpInteracting || !mcpStatus.available}
                            onClick={() => onNavigateToFailure(matchingAnalysis)}
                            size="small"
                            startIcon={<AutoAwesomeIcon />}
                            variant="outlined"
                          >
                            Navigate via Analysis
                          </Button>
                        </span>
                      </Tooltip>
                    )}
                  </Stack>
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
                      <Box>
                        <Typography fontWeight={600} gutterBottom variant="caption">
                          MCP Screenshot (Live Navigation)
                        </Typography>
                        <FailureScreenshotCard screenshot={testNavResult.screenshot} />
                      </Box>
                    )}
                  </>
                )}

                {/* ── Full MCP analysis content (merged from analysis card) ── */}
                {matchingAnalysis && (
                  <>
                    <Divider />

                    {/* Confidence — hidden for non-element errors where it is meaningless */}
                    {!isNonElementError && (
                      <Stack alignItems="center" direction="row" spacing={1}>
                        <CheckCircleIcon color="success" sx={{ fontSize: 14 }} />
                        <Typography color="text.secondary" variant="caption">
                          MCP analysis —{' '}
                          <Chip
                            color={matchingAnalysis.hasHighConfidence() ? 'success' : 'warning'}
                            label={`${matchingAnalysis.getConfidencePercentage()}% confidence`}
                            size="small"
                          />
                        </Typography>
                      </Stack>
                    )}

                    {/* Test context */}
                    {matchingAnalysis.navigationContext && (
                      <Paper sx={{ p: 1.5, bgcolor: 'primary.50', borderColor: 'primary.light' }} variant="outlined">
                        <Typography color="primary" fontWeight={600} gutterBottom variant="caption">
                          Test Context:
                        </Typography>
                        {matchingAnalysis.navigationContext.stepBeforeFailure && (
                          <Typography color="text.secondary" display="block" variant="caption">
                            <strong>Step before failure:</strong>{' '}
                            {matchingAnalysis.navigationContext.stepBeforeFailure.title}
                          </Typography>
                        )}
                        {matchingAnalysis.navigationContext.failureStep && (
                          <Typography color="error" display="block" variant="caption">
                            <strong>Failure step:</strong>{' '}
                            {matchingAnalysis.navigationContext.failureStep.title}
                          </Typography>
                        )}
                        <Typography color="text.secondary" display="block" variant="caption">
                          <strong>URL:</strong> {matchingAnalysis.getNavigationUrl()}
                        </Typography>
                      </Paper>
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
                        <Box>
                          <Stack alignItems="center" direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                            <Typography color="text.secondary" variant="caption">Failing Selector:</Typography>
                            {!isUnknown && (
                              <Tooltip title="Copy selector">
                                <IconButton onClick={() => navigator.clipboard.writeText(matchingAnalysis.selector)} size="small">
                                  <ContentCopyIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            )}
                          </Stack>
                          {isUnknown ? (
                            <Alert severity="info" icon={<AutoAwesomeIcon />} sx={{ mb: derived.length > 0 ? 1 : 0 }}>
                              Selector not detected from analysis — derived candidates from error message
                              {derived.length === 0 && ' (none found)'}
                            </Alert>
                          ) : (
                            <Paper
                              component="code"
                              sx={{ display: 'block', p: 1.5, fontSize: '0.8rem', fontFamily: 'monospace', wordBreak: 'break-all', bgcolor: 'background.default' }}
                              variant="outlined"
                            >
                              {matchingAnalysis.selector}
                            </Paper>
                          )}
                          {/* Derived selectors from error — only for genuine element-not-found errors */}
                          {derived.length > 0 && (
                            <Stack spacing={1} sx={{ mt: 1 }}>
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
                            </Stack>
                          )}
                        </Box>
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
                          <Alert severity="warning">
                            No specific selectors found — navigate to the failure point and re-analyze to generate targeted suggestions.
                          </Alert>
                        );
                      }

                      return (
                        <Box>
                          <Typography fontWeight={700} gutterBottom variant="subtitle2">
                            Suggested Selectors ({meaningful.length}):
                          </Typography>
                          <Stack spacing={1}>
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
                          </Stack>
                        </Box>
                      );
                    })()}

                    {/* Selected locator editor */}
                    {localSelectedLocator && (
                      <Box sx={{ p: 2, bgcolor: 'primary.50', borderRadius: 1, border: 1, borderColor: 'primary.light' }}>
                        <Typography color="primary" fontWeight={600} gutterBottom variant="caption">
                          Selected Locator:
                        </Typography>
                        <Stack direction="row" spacing={1}>
                          <TextField
                            fullWidth
                            onChange={e => setLocalSelectedLocator(e.target.value)}
                            placeholder="Enter or modify locator…"
                            size="small"
                            value={localSelectedLocator}
                          />
                          {onTabChange && matchingAnalysis.testFile && (
                            <Button
                              onClick={() => {
                                onTabChange('details');
                                // eslint-disable-next-line no-alert
                                alert(`Locator selected: ${localSelectedLocator}\n\nNavigate to the test file to update:\n${matchingAnalysis.testFile}`);
                              }}
                              size="small"
                              variant="contained"
                            >
                              Go to Test
                            </Button>
                          )}
                        </Stack>
                        {matchingAnalysis.testFile && (
                          <Typography color="text.secondary" sx={{ mt: 1 }} variant="caption">
                            Update the locator in: <code>{matchingAnalysis.testFile}</code>
                          </Typography>
                        )}
                      </Box>
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
                            <Divider />
                            <Typography color="text.secondary" gutterBottom variant="caption">
                              Element Info:
                            </Typography>
                            <Stack spacing={0.25}>
                              {tag && tag !== 'unknown' && (
                                <Typography variant="caption">Tag: <code>{tag}</code></Typography>
                              )}
                              {text && (
                                <Typography variant="caption">
                                  Text: {text.substring(0, 60)}
                                </Typography>
                              )}
                              {attributes?.['data-testid'] && (
                                <Typography variant="caption">
                                  Test ID: <code>{attributes['data-testid']}</code>
                                </Typography>
                              )}
                            </Stack>
                          </>
                        );
                      })()
                    )}
                  </>
                )}

                {!testNavResult && !matchingAnalysis && (
                  <Typography color="text.secondary" variant="caption">
                    Click "Navigate to Failure Point" to start MCP analysis, or "Analyze Failing Elements" for selector recommendations.
                  </Typography>
                )}
              </Stack>
              );
            })()}
          </Box>
        </Box>
      )}
    </Card>
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
    ? 'primary.main'
    : liveValidation && !liveValidation.loading && !liveValidation.error
      ? liveValidation.count === -1 ? 'info.light'
        : liveValidation.count === 1 ? 'success.main'
        : liveValidation.count === 0 ? 'error.main'
        : 'warning.main'
      : validation?.status === 'pass' ? 'success.light'
        : validation?.status === 'fail' ? 'error.light'
        : 'divider';

  const bgColor = highlighted
    ? 'primary.50'
    : liveValidation && !liveValidation.loading && !liveValidation.error
      ? liveValidation.count === -1 ? 'background.paper'
        : liveValidation.count === 1 ? 'success.50'
        : liveValidation.count === 0 ? 'error.50'
        : 'warning.50'
      : 'background.paper';

  return (
    <Stack
      direction="column"
      spacing={0.75}
      sx={{ p: 1.5, borderRadius: 1, border: 1, borderColor, bgcolor: bgColor }}
    >
      {/* Badge row */}
      <Stack alignItems="center" direction="row" spacing={0.5} flexWrap="wrap">
        {isLive && <Chip icon={<AutoAwesomeIcon />} label="Derived" size="small" color="info" />}
        {quality === 'generic' && (
          <Chip label="Ambiguous" size="small" color="warning" variant="outlined" />
        )}
        {quality === 'specific' && !liveValidation && (
          <Chip label="Specific" size="small" color="success" variant="outlined" />
        )}
        {validation && <SelectorValidationBadge validation={validation} />}
        {/* Live MCP validation result */}
        {liveValidation?.loading && (
          <Stack alignItems="center" direction="row" spacing={0.5}>
            <CircularProgress size={10} />
            <Typography color="text.secondary" variant="caption">Checking…</Typography>
          </Stack>
        )}
        {liveValidation && !liveValidation.loading && liveValidation.count !== -1 && !liveValidation.error && (
          <Chip
            color={liveValidation.count === 1 ? 'success' : liveValidation.count === 0 ? 'error' : 'warning'}
            icon={liveValidation.count === 1 ? <CheckCircleIcon /> : liveValidation.count === 0 ? <CancelIcon /> : <WarningAmberIcon />}
            label={
              liveValidation.count === 0 ? 'No match'
              : liveValidation.count === 1 ? '1 match'
              : `${liveValidation.count} matches — ambiguous`
            }
            size="small"
          />
        )}
        {liveValidation && !liveValidation.loading && liveValidation.count === -1 && (
          <Chip color="info" label="Playwright locator — use in test code" size="small" variant="outlined" />
        )}
        {liveValidation?.error && liveValidation.count !== -1 && (
          <Chip color="error" label={`Error: ${liveValidation.error.slice(0, 40)}`} size="small" variant="outlined" />
        )}
      </Stack>

      {/* Selector code + actions */}
      <Stack alignItems="flex-start" direction="row" spacing={1}>
        <Typography
          component="code"
          sx={{ flex: 1, fontSize: '0.8rem', fontFamily: 'monospace', wordBreak: 'break-all' }}
        >
          {selector}
        </Typography>
        <Stack direction="row" spacing={0.5} sx={{ flexShrink: 0 }}>
          <Tooltip title="Copy">
            <IconButton onClick={onCopy} size="small"><ContentCopyIcon fontSize="small" /></IconButton>
          </Tooltip>
          <Button disabled={disabled} onClick={onSelect} size="small" variant="outlined">
            Select
          </Button>
          <Tooltip title={liveValidation?.loading ? 'Validating…' : 'Test against live MCP page'}>
            <span>
              <Button
                disabled={disabled || liveValidation?.loading}
                onClick={onTest}
                size="small"
                startIcon={liveValidation?.loading ? <CircularProgress size={12} /> : <ScienceIcon />}
                variant="contained"
              >
                Test
              </Button>
            </span>
          </Tooltip>
        </Stack>
      </Stack>

      {/* First-match sample */}
      {liveValidation && !liveValidation.loading && (liveValidation.matches?.length ?? 0) > 0 && (
        <Box sx={{ pl: 0.5 }}>
          {liveValidation.matches!.slice(0, 3).map((m, i) => (
            <Typography color="text.secondary" key={i} variant="caption" sx={{ display: 'block', fontFamily: 'monospace' }}>
              &lt;{m.tag}{m.id ? ` id="${m.id}"` : ''}&gt; {m.text || '(no text)'}
            </Typography>
          ))}
          {(liveValidation.matches!.length > 3) && (
            <Typography color="text.disabled" variant="caption">…and {liveValidation.matches!.length - 3} more</Typography>
          )}
        </Box>
      )}
    </Stack>
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
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 8 }}>
        <Stack alignItems="center" spacing={2}>
          <CircularProgress />
          <Typography color="text.secondary">Analyzing failing elements with MCP…</Typography>
        </Stack>
      </Box>
    );
  }

  return (
    <Box>
      {/* ── Header ── */}
      <Stack
        alignItems={{ sm: 'flex-start' }}
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Stack alignItems="center" direction="row" spacing={1} sx={{ mb: 0.5 }}>
            <BugReportIcon color="action" />
            <Typography fontWeight={700} variant="h6">MCP Debug</Typography>
            <Chip color="error" label="Failed Tests Only" size="small" />
            <Chip
              color={mcpStatus.available ? 'success' : 'error'}
              label={mcpStatus.cliMode ? 'CLI Mode' : mcpStatus.available ? 'MCP Available' : 'MCP Unavailable'}
              size="small"
            />
          </Stack>
          <Typography color="text.secondary" variant="body2">
            {mcpStatus.cliMode
              ? 'Analyze failing elements and get better selectors using Playwright CLI'
              : 'Analyze failing elements and get better selectors using Playwright MCP'}
          </Typography>
        </Box>
        <Button
          disabled={mcpLoading || !mcpStatus.available}
          onClick={onAnalyze}
          size="small"
          startIcon={<BugReportIcon />}
          sx={{ flexShrink: 0 }}
          variant="contained"
        >
          {mcpLoading ? 'Analyzing…' : 'Analyze Failing Elements'}
        </Button>
      </Stack>

      {/* ── Filter info ── */}
      {filterStats.total > 0 && (
        <Alert severity="info" sx={{ mb: 2 }}>
          {failedAnalyses.length > 0
            ? `${failedAnalyses.length} MCP ${failedAnalyses.length === 1 ? 'analysis' : 'analyses'} loaded — selector suggestions are shown inside each failed test card`
            : `${filterStats.total} total analyses, none matched failed tests`}
          {filterStats.excluded > 0 && ` — ${filterStats.excluded} excluded (passed tests)`}
        </Alert>
      )}

      {/* ── Failed test results (per-test tabbed cards) ── */}
      {failedTests.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Stack alignItems="center" direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
            <Stack alignItems="center" direction="row" spacing={1}>
              <ErrorOutlineIcon color="error" fontSize="small" />
              <Typography fontWeight={700} variant="subtitle1">
                Failed Test Results ({failedTests.length})
              </Typography>
            </Stack>
            <Chip color="error" label={`${failedTests.length} failure${failedTests.length !== 1 ? 's' : ''}`} size="small" />
          </Stack>

          <Stack spacing={2}>
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
          </Stack>
        </Box>
      )}

      {/* ── Orphaned MCP Analyses (no matching failed test card) ── */}
      {orphanedAnalyses.length > 0 ? (
        <Stack spacing={3}>
          {orphanedAnalyses.map((analysis, index) => {
            const isSelected = selectedAnalysis === index;
            const currentSelectedLocator = isSelected && selectedLocator ? selectedLocator : localSelectedLocator;

            return (
              <Card
                key={analysis.id}
                sx={{ borderColor: isSelected ? 'primary.main' : undefined, borderWidth: isSelected ? 2 : 1 }}
                variant="outlined"
              >
                <CardContent>
                  {/* Analysis header */}
                  <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={1} sx={{ mb: 2 }}>
                    <Stack alignItems="center" direction="row" flexWrap="wrap" spacing={1}>
                      <Typography fontWeight={700} variant="subtitle1">
                        {analysis.testName || 'Failing Test'}
                      </Typography>
                      {analysis.qaseId && <Chip label={`Qase ID: ${analysis.qaseId}`} size="small" />}
                      {analysis.testFile && (
                        <Chip
                          icon={<DescriptionIcon />}
                          label={analysis.testFile.split('/').pop()}
                          size="small"
                          variant="outlined"
                        />
                      )}
                    </Stack>
                    <Chip
                      color={analysis.hasHighConfidence() ? 'success' : 'warning'}
                      label={`${analysis.getConfidencePercentage()}% confidence`}
                      size="small"
                      sx={{ flexShrink: 0 }}
                    />
                  </Stack>

                  {/* Test context */}
                  {analysis.navigationContext && (
                    <Paper sx={{ p: 1.5, mb: 2, bgcolor: 'primary.50', borderColor: 'primary.light' }} variant="outlined">
                      <Typography color="primary" fontWeight={600} gutterBottom variant="caption">
                        Test Context:
                      </Typography>
                      {analysis.navigationContext.stepBeforeFailure && (
                        <Typography color="text.secondary" variant="caption" display="block">
                          <strong>Step before failure:</strong>{' '}
                          {analysis.navigationContext.stepBeforeFailure.title}
                        </Typography>
                      )}
                      {analysis.navigationContext.failureStep && (
                        <Typography color="error" variant="caption" display="block">
                          <strong>Failure step:</strong>{' '}
                          {analysis.navigationContext.failureStep.title}
                        </Typography>
                      )}
                      <Typography color="text.secondary" variant="caption" display="block">
                        <strong>URL:</strong> {analysis.getNavigationUrl()}
                      </Typography>
                    </Paper>
                  )}

                  {/* Failing selector */}
                  <Box sx={{ mb: 2 }}>
                    <Stack alignItems="center" direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                      <Typography color="text.secondary" variant="caption">Failing Selector:</Typography>
                      <Tooltip title="Copy">
                        <IconButton onClick={() => navigator.clipboard.writeText(analysis.selector)} size="small">
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                    <Paper
                      component="code"
                      sx={{ display: 'block', p: 1.5, fontSize: '0.85rem', fontFamily: 'monospace', wordBreak: 'break-all', bgcolor: 'background.default' }}
                      variant="outlined"
                    >
                      {analysis.selector}
                    </Paper>
                  </Box>

                  {/* Navigate to failure — always shown when MCP is available */}
                  <Tooltip title={!mcpStatus.available ? 'MCP server unavailable' : analysis.hasNavigationContext() ? 'Navigate to the failure URL' : 'Navigate to the test base URL (no specific URL detected)'}>
                    <span>
                      <Button
                        disabled={mcpInteracting || !mcpStatus.available}
                        onClick={() => onNavigateToFailure(analysis)}
                        size="small"
                        startIcon={<LocationOnIcon />}
                        sx={{ mb: 2 }}
                        variant="outlined"
                      >
                        {mcpInteracting ? 'Navigating…' : 'Navigate to Failure Point'}
                      </Button>
                    </span>
                  </Tooltip>

                  {/* Suggested selectors */}
                  {analysis.suggestedSelectors && analysis.suggestedSelectors.length > 0 && (
                    <Box>
                      {false ? (
                        <Accordion elevation={0} sx={{ border: 1, borderColor: 'divider', borderRadius: '8px !important', '&:before': { display: 'none' } }}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            onClick={() => setShowOriginalSelectors(v => !v)}
                          >
                            <Typography variant="body2" fontWeight={600}>
                              Original Suggested Selectors ({analysis.suggestedSelectors.length})
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Stack spacing={1} sx={{ opacity: 0.8 }}>
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
                            </Stack>
                          </AccordionDetails>
                        </Accordion>
                      ) : (
                        <>
                          <Typography fontWeight={700} gutterBottom variant="subtitle2">
                            Suggested Selectors ({analysis.suggestedSelectors.length}):
                          </Typography>
                          <Stack spacing={1}>
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
                          </Stack>
                        </>
                      )}
                    </Box>
                  )}

                  {/* Selected locator editor */}
                  {isSelected && currentSelectedLocator && (
                    <Box sx={{ mt: 2, p: 2, bgcolor: 'primary.50', borderRadius: 1, border: 1, borderColor: 'primary.light' }}>
                      <Typography color="primary" fontWeight={600} gutterBottom variant="caption">
                        Selected Locator:
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        <TextField
                          fullWidth
                          onChange={e => setLocalSelectedLocator(e.target.value)}
                          placeholder="Enter or modify locator…"
                          size="small"
                          value={currentSelectedLocator}
                        />
                        {onTabChange && analysis.testFile && (
                          <Button
                            onClick={() => {
                              onTabChange('details');
                              // eslint-disable-next-line no-alert
                              alert(`Locator selected: ${currentSelectedLocator}\n\nNavigate to the test file to update:\n${analysis.testFile}`);
                            }}
                            size="small"
                            variant="contained"
                          >
                            Go to Test
                          </Button>
                        )}
                      </Stack>
                      {analysis.testFile && (
                        <Typography color="text.secondary" sx={{ mt: 1 }} variant="caption">
                          Update the locator in: <code>{analysis.testFile}</code>
                        </Typography>
                      )}
                    </Box>
                  )}

                  {/* Element info */}
                  {analysis.elementInfo && (
                    <>
                      <Divider sx={{ my: 2 }} />
                      <Typography color="text.secondary" gutterBottom variant="caption">
                        Element Info:
                      </Typography>
                      <Stack spacing={0.25}>
                        {analysis.elementInfo.tag && (
                          <Typography variant="caption">
                            Tag: <code>{analysis.elementInfo.tag}</code>
                          </Typography>
                        )}
                        {analysis.elementInfo.text && (
                          <Typography variant="caption">
                            Text: {analysis.elementInfo.text.substring(0, 50)}
                          </Typography>
                        )}
                        {analysis.elementInfo.attributes?.['data-testid'] && (
                          <Typography variant="caption">
                            Test ID: <code>{analysis.elementInfo.attributes['data-testid']}</code>
                          </Typography>
                        )}
                      </Stack>
                    </>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      ) : failedTests.length === 0 ? (
        /* ── Empty state — no failed tests at all ── */
        <Paper sx={{ p: 6, textAlign: 'center' }} variant="outlined">
          <BugReportIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
          <Typography gutterBottom variant="h6">No Failed Test Analyses Available</Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }} variant="body2">
            {analyses.length > 0
              ? `Found ${analyses.length} analyses, but none match failed tests here.`
              : mcpStatus.cliMode
                ? 'Click "Analyze Failing Elements" to use Playwright CLI to find better selectors for failing tests.'
                : 'Click "Analyze Failing Elements" to use MCP to find better selectors for failing tests.'}
          </Typography>
          <Paper sx={{ p: 2, bgcolor: 'background.default', textAlign: 'left', mb: 3 }} variant="outlined">
            <Typography fontWeight={600} gutterBottom variant="caption">Tips:</Typography>
            <Stack component="ul" spacing={0.5} sx={{ m: 0, pl: 2 }}>
              {(mcpStatus.cliMode
                ? ['MCP Debug only shows analyses for tests that failed', 'Playwright CLI mode is active — no MCP server required', 'Analyses help identify better selectors for failing elements']
                : ['MCP Debug only shows analyses for tests that failed', 'Make sure the Playwright MCP server is running: npm run mcp:start', 'Analyses help identify better selectors for failing elements']
              ).map(tip => (
                <Typography component="li" key={tip} variant="caption">{tip}</Typography>
              ))}
            </Stack>
          </Paper>
          {mcpStatus.available && (
            <Button onClick={onAnalyze} startIcon={<BugReportIcon />} variant="contained">
              Analyze Failing Elements
            </Button>
          )}
        </Paper>
      ) : null}
    </Box>
  );
};
