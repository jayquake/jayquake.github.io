/**
 * Expected result with traceability
 */
export type ExpectedResult = {
  confidence?: number; // 0-1 confidence score
  description: string;
  verificationMethod?: 'assertion' | 'manual' | 'visual'; // How to verify this result
}

export type FlowConfig = {
  id: string;
  name: string;
  order: string[]; // Project IDs in execution order
  projects: TestRunConfig[];
}

/**
 * Represents a single step in a flow with selectors and expected results
 */
export type FlowStep = {
  action: string; // Human-readable action description
  expectedResult: string; // Expected outcome after this step
  fallbackSelectors: SelectorEntry[]; // Ordered fallback chain
  metadata?: {
    confidence?: number; // 0-1 confidence score for this step
    screenshot?: string; // Screenshot hash or URL
    sourceUrl?: string; // MCP context URL if available
  };
  order: number; // Step position in the flow
  primarySelector: SelectorEntry; // Most stable selector
}

/**
 * Normalized representation of a Playwright Modal Object
 */
export type IntentModal = {
  description?: string;
  filePath: string; // Source file path
  metadata?: {
    createdBy?: string;
    lastModified?: string;
    tags?: string[];
  };
  name: string; // e.g., "ConfirmationModal"
  qaseId?: number; // Link to Qase test case if exists
  steps: FlowStep[];
  triggerAction?: string; // How this modal is triggered
  type: 'modal';
}

/**
 * Union type for all intent objects
 */
export type IntentObject = IntentModal | IntentPage | IntentTour;

/**
 * Normalized representation of a Playwright Page Object
 */
export type IntentPage = {
  description?: string;
  filePath: string; // Source file path
  metadata?: {
    createdBy?: string;
    lastModified?: string;
    tags?: string[];
  };
  name: string; // e.g., "JourneysPage"
  qaseId?: number; // Link to Qase test case if exists
  steps: FlowStep[];
  type: 'page';
  url?: string; // Base URL or route pattern
}

import { type TestRunSummary } from '../domain/valueObjects/TestRunSummary';

/**
 * Normalized representation of a Playwright Tour Object
 */
export type IntentTour = {
  description?: string;
  filePath: string; // Source file path
  metadata?: {
    createdBy?: string;
    lastModified?: string;
    tags?: string[];
  };
  name: string; // e.g., "DashboardTour"
  qaseId?: number; // Link to Qase test case if exists
  steps: FlowStep[];
  type: 'tour';
}

export type NavigationOutcome = 'auth-redirect' | 'correct' | 'not-loaded' | 'wrong-page' | null;

export type NavProgressStep = {
  detail?: string;
  status: string;
  step: string;
  timestamp: string;
};

export interface TestNavResult {
  currentUrl?: string;
  error?: string;
  expectedUrl?: string;
  loading: boolean;
  navigationOutcome: NavigationOutcome;
  screenshot?: string;
  steps: NavProgressStep[];
}

export type ProgressUpdate = {
  // Present on nav-progress events to scope updates to the correct test card
  detail?: string;
  error?: string;
  output?: string;
  projectId?: string;
  runId: string;
  status?: 'failed' | 'passed' | 'skipped';
  step?: TestStep;
  // Navigation progress step fields (for type: 'nav-progress')
  stepLabel?: string;
  stepStatus?: 'done' | 'error' | 'running';
  testData?: {
    duration?: number;
    number: number;
    qaseId?: number;
  };
  testFile?: string;
  testName?: string;
  testResultId?: string;
  timestamp: string;
  type:
    | 'flow-complete'
    | 'flow-end'
    | 'flow-error'
    | 'flow-start'
    | 'nav-progress'
    | 'project-end'
    | 'project-start'
    | 'results-ready'
    | 'run-complete'
    | 'run-error'
    | 'step-end'
    | 'step-start'
    | 'test-end'
    | 'test-output'
    | 'test-start';
}

// ============================================================================
// CANONICAL INTENT MODEL - Phase 1A Types
// ============================================================================

export type Project = {
  apiKeyEnvVar?: string;
  configPath: string;
  defaultBaseUrl: string;
  description: string;
  envHubNames?: string[];
  globalSetupPath?: null | string;
  id: string;
  logo: string;
  name: string;
  outputDirectory?: string;
  qaseProjectCode?: string;
  sdkType?: 'java' | 'node' | 'python';
  testCommand?: string;
  testDirectory: string;
  testFramework?: 'maven' | 'playwright' | 'pytest';
  workingDirectory?: string;
}

/**
 * Apply operation request with approved hashes
 */
export type QaseApplyRequest = {
  approvedOperationHashes: string[]; // Only these operations will be applied
  metadata?: {
    approvalTimestamp?: string;
    approvedBy?: string;
  };
  runHash: string; // Must match dry-run runHash
}

/**
 * Apply operation result
 */
export type QaseApplyResult = {
  appliedOperations: {
    error?: string;
    operationHash: string;
    qaseId: number;
    status: 'failed' | 'skipped' | 'success';
  }[];
  rollbackArtifactPath?: string; // Path to rollback patches
  success: boolean;
  summary: {
    failed: number;
    skipped: number;
    succeeded: number;
    total: number;
  };
}

export type QaseConfig = {
  apiToken?: string;
  enabled: boolean;
  environment?: string;
  host?: string; // Qase API host (e.g., https://api.qase.io)
  projectCode?: string;
  runTitle?: string;
  uploadAttachments?: boolean;
}

/**
 * Represents a single diff operation with hash for idempotency
 */
export type QaseDiffOperation = {
  changes: {
    after: any;
    before: any;
    field: 'automation' | 'description' | 'preconditions' | 'status' | 'steps' | 'title';
    reason: string; // Why this change is being made
  }[];
  confidence: number; // 0-1 confidence score
  metadata?: {
    mcpContext?: {
      screenshotHash?: string;
      sourceUrl?: string;
    };
    sourceFile?: string;
  };
  operationHash: string; // SHA-256 hash of this operation for idempotency
  operationType: 'update'; // Phase 1A only supports updates
  qaseId: number; // Target Qase test case ID
  requiresApproval: boolean; // True if confidence is below threshold
}

/**
 * Dry-run result with operation hashes
 */
export type QaseDryRunResult = {
  artifactPath?: string; // Path to persisted dry-run artifact
  operations: QaseDiffOperation[];
  runHash: string; // SHA-256 hash of entire run for idempotency
  runId: string; // Unique run identifier
  summary: {
    requiresApproval: number; // Operations with low confidence
    skipped: number;
    totalCandidates: number;
    updates: number;
  };
  timestamp: string; // ISO timestamp
}

/**
 * Represents a candidate for Qase sync with confidence scoring
 */
export type QaseSyncCandidate = {
  confidence: number; // 0-1 confidence score for this operation
  intentObject: IntentObject;
  metadata?: {
    mcpContext?: {
      screenshotHash?: string;
      sourceUrl?: string;
      timestamp?: string;
    };
  };
  operation: 'create' | 'skip' | 'update';
  qaseTestCase?: QaseTestCasePayload; // Existing Qase case if found
  reason: string; // Human-readable reason for this operation
}

/**
 * Qase test case payload structure
 * Based on Qase API v1 test case schema
 */
export type QaseTestCasePayload = {
  automation?: number; // Qase automation enum (0=not automated, 1=automated, 2=to be automated)
  description?: string;
  id?: number; // Qase case ID (for updates)
  preconditions?: string;
  priority?: number;
  severity?: number;
  status?: number; // Qase status enum (e.g., 0=draft, 1=active, etc.)
  steps?: {
    action: string;
    expected_result: string;
  }[];
  suite_id?: number;
  tags?: string[];
  title: string;
}

/**
 * Query result with diagnostics
 */
export type QueryResult = {
  cases: QaseTestCasePayload[];
  diagnostics: {
    fetchedCount: number; // Total fetched from API before local filters
    filteredCount: number; // Final count after local filters
    pagesFetched: number; // Number of API requests made
    queryDuration: number; // Time taken in ms
    suiteFilterFallback: boolean; // Whether suite filter used local fallback
  };
  querySpec: QuerySpec;
  timestamp: string;
}

// Export Playwright signal types
export * from './playwrightSignals';

/**
 * Qase Query Specification
 * 
 * Defines query parameters for fetching test cases from Qase.
 * Based on validated API behavior where many filters must be applied locally.
 * 
 * Remote-supported params: search, limit, offset
 * Local-only filters: suiteIds, ids, automation, status, tagsAny
 */
export type QuerySpec = {
  automation?: number[]; // Local filter: automation levels (e.g. [0,1] for manual/automated)
  ids?: number[]; // Local filter: specific test case IDs
  limit?: number; // Remote: window size per request (default 100, max 100)
  maxRecords?: number; // Safety cap for full scan (default 5000)
  offset?: number; // Remote: pagination cursor (default 0)
  projectCode: string; // Required: Qase project code
  status?: number[]; // Local filter: status codes
  suiteIds?: number[]; // Local filter: suite IDs (API suite filter not working reliably)
  tagsAny?: string[]; // Local filter: match any of these tag titles
  titleContains?: string; // Remote: search param, then local: confirm exact contains
}

export type SelectorEntry = {
  priority: number; // Lower is higher priority (1 = highest)
  type: SelectorType;
  value: string;
}

/**
 * Selector types and priorities for stable element identification
 */
export type SelectorType = 'css' | 'role' | 'testId' | 'text' | 'xpath';

export type TestResult = {
  duration: number;
  error?: string;
  id: string;
  projectId: string;
  runId: string;
  screenshot?: string;
  status: 'failed' | 'passed' | 'skipped';
  testFile: string;
  testName: string;
  trace?: string;
  video?: string;
}

export type TestRun = {
  config: FlowConfig | TestRunConfig;
  duration?: number;
  endTime?: string;
  flowId?: string;
  id: string;
  projectId?: string; // For single project runs
  projects?: string[]; // For multi-project flows
  reportPath?: string; // Path to Playwright HTML report directory
  results: TestResult[];
  startTime: string;
  status: 'cancelled' | 'completed' | 'failed' | 'running';
  summary:
    | TestRunSummary
    | {
        exitCode?: number;
        failed: number;
        passed: number;
        skipped: number;
        stderr?: string;
        stdout?: string;
        total: number;
      };
}

export type TestRunConfig = {
  baseUrl: string;
  grepPattern?: string; // Playwright grep pattern for filtering specific tests
  headless?: boolean;
  httpAuth?: {
    password: string;
    username: string;
  };
  projectId: string;
  qaseConfig?: QaseConfig;
  slowMo?: number; // Slow motion delay in milliseconds
  testCases?: Record<string, string[]>; // Object mapping filePath -> array of test titles for individual test selection
  testFiles?: string[];
  timeout?: number;
  uiMode?: boolean; // Playwright UI mode (interactive inspector)
  workers?: number;
}

export type RuleLabEvent =
  | { type: 'analysis:start'; ruleId: string; ruleType: string }
  | { type: 'analysis:snapshot'; ruleId: string; accessibilityTree: string }
  | { type: 'analysis:complete'; ruleId: string; result: any }
  | { type: 'analysis:error'; ruleId: string; error: string }
  | { type: 'discovery:start'; ruleId: string; siteUrl: string }
  | { type: 'discovery:progress'; ruleId: string; siteUrl: string; found: number; total: number }
  | { type: 'discovery:site-complete'; ruleId: string; siteUrl: string; examples: number }
  | { type: 'discovery:complete'; ruleId: string; totalExamples: number }
  | { type: 'discovery:error'; ruleId: string; siteUrl: string; error: string };

export type TestStep = {
  duration?: number;
  error?: string;
  order: number;
  status: 'failed' | 'passed';
  title: string;
}

