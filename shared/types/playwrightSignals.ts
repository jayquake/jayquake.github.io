/**
 * Playwright MCP Signal Schema
 * 
 * Normalized contract for ingesting Playwright-derived context
 * and mapping to Qase update intents with confidence scoring.
 */

/**
 * Playwright context signal from MCP interactions
 */
export type PlaywrightSignal = {
  context: PlaywrightContext;
  metadata: SignalMetadata;
  observations: PlaywrightObservation[];
  source: 'mcp-snapshot' | 'page-object' | 'test-execution';
  timestamp: string;
};

/**
 * Context from Playwright MCP session
 */
export type PlaywrightContext = {
  baseUrl: string;
  browser: string;
  flowName?: string; // e.g., "Journeys-Add-Recording"
  sessionId: string;
  viewport?: {
    height: number;
    width: number;
  };
};

/**
 * Signal metadata
 */
export type SignalMetadata = {
  capturedBy: string; // operator or agent name
  flowType: 'modal' | 'page' | 'tour'; // semantic category
  qaseReference?: {
    caseId?: number;
    suiteId?: number;
  };
};

/**
 * Observed interaction or outcome from Playwright
 */
export type PlaywrightObservation = {
  action?: PlaywrightAction;
  expectedOutcome?: string;
  order: number;
  screenshotHash?: string;
  selectorUsed?: string;
  timestamp: string;
  type: 'action' | 'assertion' | 'navigation' | 'wait';
};

/**
 * Playwright action details
 */
export type PlaywrightAction = {
  elementDescription?: string;
  inputValue?: string; // for fill/type actions
  method: 'click' | 'fill' | 'goto' | 'hover' | 'press' | 'select' | 'type' | 'wait';
  selector: {
    fallbacks?: string[];
    primary: string;
    stability: 'high' | 'low' | 'medium'; // from SelectorStabilityPolicy
  };
  targetUrl?: string; // for navigation
};

/**
 * Qase update intent derived from Playwright signals
 */
export type QaseUpdateIntent = {
  caseId?: number; // existing case to update (or null for create)
  confidence: ConfidenceScore;
  proposedChanges: QaseFieldChanges;
  rationale: string;
  sourceSignals: PlaywrightSignal[];
  suiteId?: number;
};

/**
 * Confidence scoring for automated updates
 */
export type ConfidenceScore = {
  breakdown: {
    selectorStability: number; // 0-1
    stepCoverage: number; // 0-1
    titleConvention: number; // 0-1
  };
  overall: number; // 0-1
  requiresApproval: boolean; // true if overall < threshold
  threshold: number; // configured approval threshold
};

/**
 * Proposed changes to Qase fields
 */
export type QaseFieldChanges = {
  automation?: {
    new: number;
    old?: number;
    reason: string;
  };
  description?: {
    new: string;
    old?: string;
    reason: string;
  };
  preconditions?: {
    new: string;
    old?: string;
    reason: string;
  };
  status?: {
    new: number;
    old?: number;
    reason: string;
  };
  steps?: {
    new: Array<{
      action: string;
      expected_result: string;
    }>;
    old?: Array<{
      action: string;
      expected_result: string;
    }>;
    reason: string;
  };
  title?: {
    new: string;
    old?: string;
    reason: string;
  };
};

/**
 * Mapping configuration for Playwright → Qase
 */
export type PlaywrightToQaseMapping = {
  confidenceThreshold: number; // 0-1, default 0.7
  conventions: TitleConvention[];
  defaultAutomation: number; // 0=manual, 1=automated
  selectorPolicy: {
    minStability: 'high' | 'low' | 'medium';
    requireFallbacks: boolean;
  };
  stepMapping: {
    actionPrefix?: string; // e.g., "**Step {order}:** "
    expectedResultPrefix?: string;
  };
  suiteMapping?: {
    flowTypeToSuiteId: Record<string, number>; // e.g., {"modal": 87, "page": 88}
  };
};

/**
 * Title naming conventions
 */
export type TitleConvention = {
  examples: string[];
  flowType: 'modal' | 'page' | 'tour';
  pattern: string; // regex or template
};

/**
 * Intent transformation result
 */
export type IntentTransformResult = {
  intents: QaseUpdateIntent[];
  metadata: {
    highConfidenceCount: number;
    lowConfidenceCount: number;
    requiresApprovalCount: number;
    signalsProcessed: number;
    timestamp: string;
  };
  signals: PlaywrightSignal[];
};
