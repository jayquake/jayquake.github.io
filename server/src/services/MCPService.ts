import { generateStagingSetupScript, PREFILLED_SETUP_PARAMS, type StagingSetupParams } from '../../../shared/utils/stagingSetupScript';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import { PlaywrightCLIExecutor } from '../infrastructure/cli/PlaywrightCLIExecutor';
import { DatabaseService } from '../infrastructure/database/DatabaseService';
import { PlaywrightMCPClient } from '../infrastructure/mcp/PlaywrightMCPClient';
import { MCPAnalysisRepository } from '../repositories/MCPAnalysisRepository';
import { MCPArtifactRepository } from '../repositories/MCPArtifactRepository';
import { TestResultRepository } from '../repositories/TestResultRepository';
import { FailureContext, NavigationContext, ReportService, type UnifiedTestResult } from './ReportService';

export type ElementAnalysis = {
  confidence: number;
  elementInfo: {
    attributes: Record<string, string>;
    position: { height: number; width: number; x: number; y: number; };
    tag: string;
    text?: string;
  };
  error?: string;
  navigationContext?: {
    failureStep?: any;
    stepBeforeFailure?: any;
    url: string;
  };
  qaseId?: number;
  qaseTestCase?: {
    description?: string;
    id: number;
    steps?: { action: string; expected_result: string }[];
    title: string;
  };
  selector: string;
  suggestedSelectors: string[];
  testFile?: string;
  testName?: string;
  testResult?: any;
  testResultId?: string;
}

export type MCPInteraction = {
  result?: any;
  selector?: string;
  type: 'click' | 'fill' | 'hover' | 'navigate' | 'screenshot';
  url?: string;
  value?: string;
}

export type NavigationProgressStep = {
  detail?: string;
  status: 'done' | 'error' | 'running';
  step: string;
  timestamp: string;
};

type MCPResponse = {
  content?: { [key: string]: any; text?: string; type: string; }[];
  isError?: boolean;
}

type MCPToolCall = {
  arguments: Record<string, any>;
  name: string;
}

export class MCPService {
  /**
   * Known page-object navigation methods → in-app URL paths.
   * Used by extractDeepNavigationPath() to determine where a test navigates to.
   */
  private static readonly NAV_METHOD_TO_PATH: Record<string, string> = {
    navigateToAuditsPage: '/pages',
    navigateToDashboardPage: '/dashboard',
    navigateToExplorePage: '/explore',
    navigateToJourneysPage: '/journeys',
    navigateToSiteSettingsPage: '/settings/site-settings',
    navigateToStagingSetupPage: '/staging-setup',
    navigateToWebsiteAvailabilityPage: '/website-availability',
    navigateToWebsiteConfigurationPage: '/website-configuration',
  };
  /**
   * Qase step action keywords → in-app URL paths.
   * Used by extractDeepNavigationPath() to determine where a test navigates to
   * based on Qase test case step descriptions.
   */
  private static readonly QASE_STEP_TO_PATH: { keywords: RegExp; path: string }[] = [
    { keywords: /navigate\s+to\s+journeys?\s+page/i, path: '/journeys' },
    { keywords: /navigate\s+to\s+dashboard/i, path: '/dashboard' },
    { keywords: /navigate\s+to\s+explore\s+page/i, path: '/explore' },
    { keywords: /navigate\s+to\s+site\s+settings/i, path: '/settings/site-settings' },
    { keywords: /navigate\s+to\s+audits?\s+page/i, path: '/pages' },
    { keywords: /navigate\s+to\s+staging[\s-]?setup/i, path: '/staging-setup' },
    { keywords: /navigate\s+to\s+website\s+availability/i, path: '/website-availability' },
    { keywords: /navigate\s+to\s+website\s+configuration/i, path: '/website-configuration' },
    { keywords: /go\s+to\s+journeys?\s+page/i, path: '/journeys' },
    { keywords: /go\s+to\s+dashboard/i, path: '/dashboard' },
    { keywords: /go\s+to\s+explore\s+page/i, path: '/explore' },
    { keywords: /go\s+to\s+site\s+settings/i, path: '/settings/site-settings' },
    { keywords: /go\s+to\s+audits?\s+page/i, path: '/pages' },
    { keywords: /open\s+journeys?\s+page/i, path: '/journeys' },
    { keywords: /open\s+explore\s+page/i, path: '/explore' },
    { keywords: /open\s+audits?\s+page/i, path: '/pages' },
    { keywords: /open\s+dashboard/i, path: '/dashboard' },
    { keywords: /open\s+site\s+settings/i, path: '/settings/site-settings' },
  ];
  /**
   * Map from legacy playwright_* tool names to the actual @playwright/mcp browser_* tool names.
   */
  private static readonly TOOL_NAME_MAP: Record<string, string> = {
    browser_click: 'browser_click',           // identity — already correct name
    browser_fill_form: 'browser_fill_form',   // identity — step-by-step fallback
    browser_run_code: 'browser_run_code',     // identity — already uses correct name
    browser_snapshot: 'browser_snapshot',     // identity — post-auth verification
    playwright_click: 'browser_click',
    playwright_evaluate: 'browser_evaluate',
    playwright_fill: 'browser_type',
    playwright_goto: 'browser_navigate',
    playwright_hover: 'browser_hover',
    playwright_screenshot: 'browser_take_screenshot',
  };
  private broadcastFn?: (data: any) => void;
  private mcpAnalysisRepository: MCPAnalysisRepository;
  private mcpArtifactRepository: MCPArtifactRepository;
  private mcpClient: PlaywrightMCPClient;

  private reportService: ReportService;

  private testE2eDir: string;

  private testResultRepository: TestResultRepository;

  /**
   * When true, `navigateToFailurePoint` uses the Playwright CLI executor
   * instead of the MCP SSE client. Controlled by `USE_CLI_FOR_NAV` env var.
   * All other MCPService methods continue to use MCP.
   */
  private readonly useCLIForNav: boolean;

  constructor(mcpServerUrl = 'http://localhost:3002', reportService?: ReportService) {
    this.mcpClient = new PlaywrightMCPClient(mcpServerUrl);
    this.testE2eDir = join(__dirname, '../../../..');
    const prisma = DatabaseService.getInstance().getClient();
    this.mcpAnalysisRepository = new MCPAnalysisRepository(prisma);
    this.mcpArtifactRepository = new MCPArtifactRepository(prisma);
    this.testResultRepository = new TestResultRepository(prisma);
    this.reportService = reportService || new ReportService();
    this.useCLIForNav = process.env.USE_CLI_FOR_NAV === 'true';

    if (this.useCLIForNav) {
      console.log('[MCPService] CLI mode enabled for navigateToFailurePoint (USE_CLI_FOR_NAV=true)');
    }
  }

  /**
   * Inject HTTP basic auth credentials into acsb-test.com URLs.
   *
   * **IMPORTANT**: This should ONLY be used for the initial "phase 1" navigation
   * that caches the browser's auth response. After that, always navigate to clean
   * URLs (without credentials) to avoid breaking in-page fetch/tRPC calls.
   *
   * @see authenticateViaStagingSetup — two-phase approach
   */
  private static injectAuthIfNeeded(url: string): string {
    try {
      const parsed = new URL(url);
      // Only inject for acsb-test.com domains that require HTTP basic auth
      if (parsed.hostname.endsWith('acsb-test.com') && !parsed.username) {
        const username = process.env.AUTH_USERNAME || 'test';
        const password = process.env.AUTH_PASSWORD || 'acsb123';
        parsed.username = username;
        parsed.password = password;
        console.log(`[MCPService] Injected HTTP auth for ${parsed.hostname}`);
        return parsed.toString();
      }
    } catch {
      // If URL parsing fails, return as-is
    }
    return url;
  }

  /**
   * Check if a URL's domain requires HTTP Basic Auth.
   * Currently only acsb-test.com domains require this.
   */
  private static needsHttpAuth(url: string): boolean {
    try {
      const parsed = new URL(url);
      return parsed.hostname.endsWith('acsb-test.com');
    } catch {
      return false;
    }
  }

  /**
   * Analyze a single element (public method for API)
   */
  async analyzeElement(url: string, selector: string, context?: string): Promise<ElementAnalysis> {
    return this.analyzeElementWithMCP(url, selector, context);
  }

  /**
   * Analyze a test run's failing elements using unified report data from ReportService
   * This integrates with ReportService to get combined Playwright + Qase data
   */
  async analyzeTestRun(runId: string): Promise<ElementAnalysis[]> {
    // Get unified report from ReportService (combines Playwright + Qase data)
    const unifiedReport = await this.reportService.getUnifiedReport(runId);

    // Filter to only failed tests
    const failedTests = unifiedReport.filter(
      (test) => test.playwright.status === 'failed' || test.playwright.status === 'timedOut',
    );

    if (failedTests.length === 0) {
      console.log('[MCPService] No failed tests found in unified report');
      return [];
    }

    const analyses: ElementAnalysis[] = [];

    // Analyze each failed test using unified context
    for (const unifiedResult of failedTests) {
      const {navigationContext} = unifiedResult.unified;
      const {failureContext} = unifiedResult.unified;
      const initialSelector = navigationContext.selector;

      // Log with Qase ID if available
      if (unifiedResult.qase.id) {
        console.log(
          `[MCPService] Analyzing test: ${unifiedResult.playwright.name} (Qase ID: ${unifiedResult.qase.id})`,
        );
      } else {
        console.log(`[MCPService] Analyzing test: ${unifiedResult.playwright.name} (No Qase ID found)`);
      }

      if (!initialSelector) {
        // Try to extract selectors from the error message directly
        const extracted = this.extractSelectorsFromFailure({
          error: unifiedResult.playwright.error,
          steps: unifiedResult.playwright.steps,
        });

        const effectiveSelector = extracted.primary || 'unknown';
        const effectiveSuggestions = extracted.suggestions.length > 0
          ? extracted.suggestions
          : this.generateBasicSelectors(effectiveSelector);
        const confidence = extracted.primary ? 0.6 : 0.1;

        if (extracted.primary) {
          console.log(
            `[MCPService] Extracted locator from error: "${extracted.primary}" with ${extracted.suggestions.length} suggestion(s)`,
          );
        } else {
          console.log(
            `[MCPService] No locator found in error for test: ${unifiedResult.playwright.name}`,
          );
        }

        const analysis: ElementAnalysis = {
          confidence,
          elementInfo: {
            attributes: {},
            position: { height: 0, width: 0, x: 0, y: 0 },
            tag: extracted.primary ? 'locator' : 'unknown',
          },
          error: unifiedResult.playwright.error,
          navigationContext: {
            failureStep: navigationContext.failureStep,
            stepBeforeFailure: navigationContext.stepBeforeFailure,
            url: navigationContext.url,
          },
          qaseId: unifiedResult.qase.id,
          qaseTestCase:
            unifiedResult.qase.id ?
              {
                description: unifiedResult.qase.description,
                id: unifiedResult.qase.id,
                steps: unifiedResult.qase.steps,
                title: unifiedResult.qase.title || '',
              }
            : undefined,
          selector: effectiveSelector,
          suggestedSelectors: effectiveSuggestions,
          testFile: unifiedResult.playwright.file,
          testName: unifiedResult.playwright.name,
          testResultId: unifiedResult.playwright.id,
        };

        await this.saveAnalysisToDatabase(runId, unifiedResult.playwright.id, analysis);
        analyses.push(analysis);
        continue;
      }

      // Analyze with MCP using unified context
      try {
        const analysis = await this.analyzeWithUnifiedContext(unifiedResult);
        analysis.testResultId = unifiedResult.playwright.id;

        // Use Qase test case steps to improve selector suggestions if available
        if (unifiedResult.qase.steps && unifiedResult.qase.steps.length > 0) {
          const stepSelectors = this.extractSelectorsFromQaseSteps(unifiedResult.qase.steps);
          if (stepSelectors.length > 0) {
            analysis.suggestedSelectors = [...stepSelectors, ...analysis.suggestedSelectors];
          }
        }

        await this.saveAnalysisToDatabase(runId, unifiedResult.playwright.id, analysis);
        analyses.push(analysis);
      } catch (error: any) {
        console.error(`[MCPService] Error analyzing test ${unifiedResult.playwright.name}:`, error);

        // Try extracting from error as a fallback
        const extracted = this.extractSelectorsFromFailure({
          error: unifiedResult.playwright.error,
          steps: unifiedResult.playwright.steps,
        });
        const fallbackSelector = initialSelector || extracted.primary || 'unknown';
        const fallbackSuggestions = extracted.suggestions.length > 0
          ? extracted.suggestions
          : this.generateBasicSelectors(fallbackSelector);

        // Create fallback analysis
        const fallbackAnalysis: ElementAnalysis = {
          confidence: extracted.primary ? 0.5 : 0.2,
          elementInfo: {
            attributes: {},
            position: { height: 0, width: 0, x: 0, y: 0 },
            tag: extracted.primary ? 'locator' : 'unknown',
          },
          error: unifiedResult.playwright.error || error.message,
          navigationContext: {
            failureStep: navigationContext.failureStep,
            stepBeforeFailure: navigationContext.stepBeforeFailure,
            url: navigationContext.url,
          },
          qaseId: unifiedResult.qase.id,
          qaseTestCase:
            unifiedResult.qase.id ?
              {
                description: unifiedResult.qase.description,
                id: unifiedResult.qase.id,
                steps: unifiedResult.qase.steps,
                title: unifiedResult.qase.title || '',
              }
            : undefined,
          selector: fallbackSelector,
          suggestedSelectors: fallbackSuggestions,
          testFile: unifiedResult.playwright.file,
          testName: unifiedResult.playwright.name,
          testResultId: unifiedResult.playwright.id,
        };

        await this.saveAnalysisToDatabase(runId, unifiedResult.playwright.id, fallbackAnalysis);
        analyses.push(fallbackAnalysis);
      }
    }

    return analyses;
  }

  /**
   * Check if MCP server is available
   */
  async checkMCPServer(): Promise<boolean> {
    return await this.mcpClient.checkMCPServer();
  }

  /**
   * Cleanup (no-op for MCP, browser is managed by MCP server)
   */
  async cleanup(): Promise<void> {
    // MCP server manages its own browser instance
    // No cleanup needed
  }

  /**
   * Generate human-readable explanation from stored MCP analysis data
   */
  async getAnalysisExplanation(analysisId: string): Promise<string> {
    const analysis = await this.mcpAnalysisRepository.findById(analysisId);
    if (!analysis) {
      return 'Analysis not found.';
    }

    let explanation = `**MCP Analysis for Test Failure**\n\n`;
    explanation += `**Test:** ${analysis.testRunId} (Result: ${analysis.testResultId || 'N/A'})\n`;
    explanation += `**Failing Selector:** \`${analysis.selector}\` (Confidence: ${analysis.confidence.toFixed(2)})\n\n`;

    const navContext = analysis.navigationContext ? JSON.parse(analysis.navigationContext) : {};
    if (navContext.url) {
      explanation += `**Page URL:** ${navContext.url}\n`;
    }
    if (navContext.failureStep?.title) {
      explanation += `**Failure Step:** ${navContext.failureStep.title}\n`;
    }
    if (navContext.stepBeforeFailure?.title) {
      explanation += `**Step Before Failure:** ${navContext.stepBeforeFailure.title}\n`;
    }
    if (analysis.error) {
      explanation += `**Error Message:** \`${analysis.error}\`\n\n`;
    }

    const elementInfo = analysis.elementInfo ? JSON.parse(analysis.elementInfo) : {};
    if (elementInfo.tag) {
      explanation += `**Element Details:**\n`;
      explanation += `- Tag: \`${elementInfo.tag}\`\n`;
      if (elementInfo.text) {
        explanation += `- Text: "${elementInfo.text}"\n`;
      }
      if (elementInfo.attributes) {
        for (const [key, value] of Object.entries(elementInfo.attributes)) {
          explanation += `- Attribute \`${key}\`: "${value}"\n`;
        }
      }
      explanation += `\n`;
    }

    const suggestedSelectors = analysis.suggestedSelectors ? JSON.parse(analysis.suggestedSelectors) : [];
    if (suggestedSelectors.length > 0) {
      explanation += `**Suggested Alternative Locators:**\n`;
      suggestedSelectors.forEach((s: string) => {
        explanation += `- \`${s}\`\n`;
      });
      explanation += `\n`;
    }

    if (analysis.screenshotPath) {
      explanation += `**Screenshot:** [View Screenshot](${analysis.screenshotPath})\n`;
    }
    if (analysis.tracePath) {
      explanation += `**Trace:** [View Trace](${analysis.tracePath})\n`;
    }

    const artifacts = await this.mcpArtifactRepository.findAll({ analysisId: analysis.id });
    if (artifacts.length > 0) {
      explanation += `**Associated Artifacts:**\n`;
      artifacts.forEach((artifact) => {
        explanation += `- ${artifact.type}: [${artifact.path}](${artifact.path})\n`;
      });
    }

    return explanation;
  }

  /**
   * Get element at position (for clicking to select)
   */
  async getElementAtPosition(
    x: number,
    y: number,
  ): Promise<{
    element?: any;
    selector?: string;
    success: boolean;
  }> {
    try {
      const script = `
        (() => {
          const element = document.elementFromPoint(${x}, ${y});
          if (!element) return { found: false };
          
          // Generate selector
          const getSelector = (el) => {
            if (el.id) return '#' + el.id;
            if (el.getAttribute('data-testid')) return '[data-testid="' + el.getAttribute('data-testid') + '"]';
            if (el.className) {
              const classes = el.className.split(' ').filter(c => c).join('.');
              if (classes) return el.tagName.toLowerCase() + '.' + classes;
            }
            return el.tagName.toLowerCase();
          };
          
          return {
            attributes: Array.from(element.attributes).reduce((acc, attr) => {
              acc[attr.name] = attr.value;
              return acc;
            }, {}),
            found: true,
            selector: getSelector(element),
            tag: element.tagName,
            text: element.textContent?.substring(0, 100),
          };
        })();
      `;

      const result = await this.callMCPTool('playwright_evaluate', { expression: script });
      const data = result.content?.[0]?.text;

      if (data) {
        try {
          const parsed = JSON.parse(data);
          return {
            element: parsed,
            selector: parsed.selector,
            success: parsed.found || false,
          };
        } catch {
          return { success: false };
        }
      }

      return { success: false };
    } catch (error: any) {
      console.error('[MCPService] Error getting element at position:', error);
      return { success: false };
    }
  }

  /**
   * Validate a selector against the current live MCP page.
   * Handles both standard CSS selectors and Playwright-specific pseudo-selectors
   * like :has-text(), text="...", getByRole(), etc.
   *
   * Returns match count and a sample of the first matching elements.
   */
  async validateSelector(selector: string): Promise<{
    count: number;
    error?: string;
    matches: Array<{ id?: string; tag: string; text: string }>;
  }> {
    const script = this.buildSelectorValidationScript(selector);
    try {
      const result = await this.callMCPTool('playwright_evaluate', { expression: script });
      const raw = result?.content?.[0]?.text ?? result?.result ?? '{}';
      const data = typeof raw === 'string' ? JSON.parse(raw) : raw;
      return { count: data.count ?? 0, matches: data.matches ?? [], error: data.error };
    } catch (e: any) {
      return { count: 0, matches: [], error: e.message };
    }
  }

  /**
   * Build a browser-evaluate script that handles Playwright pseudo-selectors.
   * :has-text("X")   → querySelectorAll(base) + textContent filter
   * text="X"         → walk all elements and filter by textContent
   * text/X           → same
   * Standard CSS     → querySelectorAll directly
   */
  private buildSelectorValidationScript(selector: string): string {
    const mapEls = `els.slice(0, 5).map(function(el) { return { tag: el.tagName.toLowerCase(), text: (el.textContent || '').trim().slice(0, 60), id: el.id || undefined }; })`;

    // :has-text("...") or :has-text('...')
    const hasTextMatch = selector.match(/^(.*?):has-text\(["'](.+?)["']\)\s*$/i);
    if (hasTextMatch) {
      const base = (hasTextMatch[1].trim() || '*').replace(/'/g, "\\'");
      const needle = hasTextMatch[2].toLowerCase().replace(/'/g, "\\'");
      return `(function(){try{var base=Array.from(document.querySelectorAll('${base}'));var els=base.filter(function(el){return(el.textContent||'').toLowerCase().includes('${needle}');});return{count:els.length,matches:${mapEls}};}catch(e){return{count:0,matches:[],error:e.message};}})()`;
    }

    // text="X" or text='X' (Playwright text selector)
    const textEqMatch = selector.match(/^text=["']?(.+?)["']?\s*$/i);
    if (textEqMatch) {
      const needle = textEqMatch[1].toLowerCase().replace(/'/g, "\\'");
      return `(function(){try{var all=Array.from(document.querySelectorAll('*'));var els=all.filter(function(el){return el.children.length===0&&(el.textContent||'').toLowerCase().includes('${needle}');});return{count:els.length,matches:${mapEls}};}catch(e){return{count:0,matches:[],error:e.message};}})()`;
    }

    // getByRole('role', { name: 'X' }) — Playwright locator, not testable via querySelectorAll
    if (/^getBy(Role|Text|Label|Placeholder|AltText|Title)\(/.test(selector)) {
      return `(function(){return{count:-1,matches:[],error:'Playwright locator — cannot validate via DOM. Use it directly in your test.'};})()`;
    }

    // Standard CSS selector
    const safeSel = selector.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    return `(function(){try{var els=Array.from(document.querySelectorAll('${safeSel}'));return{count:els.length,matches:${mapEls}};}catch(e){return{count:0,matches:[],error:e.message};}})()`;
  }

  /**
   * Interact with page via MCP
   */
  async interact(action: MCPInteraction): Promise<MCPInteraction> {
    try {
      switch (action.type) {
        case 'click':
          if (action.selector) {
            const result = await this.callMCPTool('playwright_click', { selector: action.selector });
            action.result = { message: 'Element clicked', success: !result.isError };
          }
          break;

        case 'fill':
          if (action.selector && action.value) {
            const result = await this.callMCPTool('playwright_fill', {
              selector: action.selector,
              text: action.value,
            });
            action.result = { message: 'Element filled', success: !result.isError };
          }
          break;

        case 'hover':
          if (action.selector) {
            const result = await this.callMCPTool('playwright_hover', { selector: action.selector });
            action.result = { message: 'Element hovered', success: !result.isError };
          }
          break;

        case 'navigate':
          if (action.url) {
            // Two-phase HTTP Basic Auth: cache credentials first, then navigate clean
            if (MCPService.needsHttpAuth(action.url)) {
              const authUrl = MCPService.injectAuthIfNeeded(action.url);
              await this.callMCPTool('playwright_goto', { url: authUrl });
            }
            const result = await this.callMCPTool('playwright_goto', { url: action.url });
            action.result = { message: 'Navigated successfully', success: !result.isError };
          }
          break;

        case 'screenshot':
          const screenshotResult = await this.callMCPTool('playwright_screenshot', {
            fullPage: true,
          });
          action.result = {
            message: 'Screenshot taken',
            screenshot: screenshotResult.content?.[0]?.text,
            success: !screenshotResult.isError,
          };
          break;
      }

      return action;
    } catch (error: any) {
      action.result = { error: error.message, success: false };
      return action;
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // CLI-backed navigateToFailurePoint
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * List available tools from MCP server
   */
  async listTools(): Promise<string[]> {
    return await this.mcpClient.listTools();
  }

  /**
   * Navigate to a URL using MCP
   */
  async navigate(url: string): Promise<void> {
    await this.interact({ type: 'navigate', url });
  }

  // ── CLI helper: build JavaScript snippets for eval ───────────────────────

  /**
   * Navigate to failure point and highlight element.
   * Handles both CSS selectors and Playwright locator expressions
   * (e.g. "getByRole('button', { name: 'Save' })").
   *
   * When `testResultId` is provided, the method first authenticates the MCP browser
   * by replaying the staging-setup login flow using stored auth parameters from
   * the test result's annotations. This ensures the MCP browser reaches the same
   * authenticated state the original test had when it failed.
   *
   * When `USE_CLI_FOR_NAV=true`, the browser automation is routed through the
   * Playwright CLI executor instead of the MCP SSE client.
   */
  async navigateToFailurePoint(
    url: string,
    selector?: string,
    highlight = true,
    testResultId?: string,
    suggestedSelectors?: string[],
    pageSnapshotContent?: string,
  ): Promise<{
    currentUrl?: string;
    error?: string;
    expectedUrl?: string;
    navigationOutcome?: 'auth-redirect' | 'correct' | 'not-loaded' | 'wrong-page';
    playwrightSteps?: { duration?: number; error?: string; status: string; step_number: number; title: string }[];
    qaseSteps?: { action: string; expected_result?: string; step_number: number }[];
    refreshedSelectors?: string[];
    reportScreenshotUrl?: string;
    screenshot?: string;
    steps?: NavigationProgressStep[];
    success: boolean;
    validatedSelectors?: { count: number; selector: string; status: 'fail' | 'pass'; tag?: string }[];
  }> {
    // Route to CLI-backed implementation when the feature flag is active
    if (this.useCLIForNav) {
      return this.navigateToFailurePointCLI(url, selector, highlight, testResultId, suggestedSelectors);
    }

    const steps: NavigationProgressStep[] = [];
    const emit = (step: string, status: NavigationProgressStep['status'], detail?: string) => {
      this.emitNavProgress(step, status, detail, testResultId);
      steps.push({ detail, status, step, timestamp: new Date().toISOString() });
    };

    // If a page snapshot was provided, log it for context (MCP analysis uses current live page,
    // but the snapshot helps orient the model before navigation)
    if (pageSnapshotContent) {
      console.log(`[MCPService] Page snapshot context provided (${pageSnapshotContent.length} chars) — will use for pre-navigation context`);
      emit('Page snapshot context', 'done', `Captured snapshot: ${pageSnapshotContent.length} chars of accessibility tree`);
    }

    try {
      // Track whether staging-setup authentication succeeded.
      // When true, the browser already has cached HTTP Basic Auth credentials
      // and a valid app session, so we should NOT inject credentials into the
      // failure URL (which would break in-page tRPC/fetch calls).
      let authSucceeded = false;

      // Authenticate via staging setup if we have a test result reference
      if (testResultId) {
        emit('Reading auth parameters', 'running', `testResultId=${testResultId}`);
        try {
          const params = await this.getAuthSetupParams(testResultId);
          if (params) {
            emit('Reading auth parameters', 'done', `fixture=${params.fixture ?? 'unknown'} domain=${params.domain} email=${params.email}`);

            const baseUrl = new URL(url).origin;

            authSucceeded = await this.authenticateViaStagingSetup(baseUrl, params, emit);
            if (authSucceeded) {
              emit('Authentication complete', 'done', 'Session established via staging-setup');
            } else {
              emit('Authentication complete', 'error', 'Staging setup failed — proceeding with fallback auth');
            }
          } else {
            emit('Reading auth parameters', 'done', 'No auth params found — skipping authentication');
          }
        } catch (authError: any) {
          emit('Authentication complete', 'error', `Auth setup threw: ${authError.message}`);
          console.warn('[MCPService] Auth setup failed, proceeding unauthenticated:', authError.message);
        }
      }

      // Navigate to the failure URL.
      // If staging-setup auth succeeded, the browser already has:
      //   - Cached HTTP Basic Auth credentials (from two-phase flow)
      //   - A valid app session (JWT cookie from staging-setup login)
      // So we navigate to the CLEAN URL to avoid breaking tRPC/fetch calls.
      //
      // If auth did NOT succeed and the domain needs HTTP auth, we use the
      // two-phase approach here as well: navigate WITH credentials first to
      // cache them, then navigate to the clean URL.
      const needsAuth = MCPService.needsHttpAuth(url);

      if (!authSucceeded && needsAuth) {
        // Two-phase auth for the failure URL itself
        emit('HTTP Basic Auth for failure URL', 'running', 'Caching credentials');
        const authUrl = MCPService.injectAuthIfNeeded(url);
        await this.callMCPTool('playwright_goto', { url: authUrl });
        emit('HTTP Basic Auth for failure URL', 'done', 'Credentials cached');
      }

      // Navigate to the clean failure URL
      emit('Navigating to failure URL', 'running', url);
      const gotoResult = await this.callMCPTool('playwright_goto', { url });
      if (gotoResult.isError) {
        const errorDetail = gotoResult.content?.[0]?.text || 'Unknown MCP error';
        emit('Navigating to failure URL', 'error', errorDetail);
        return { currentUrl: undefined, error: `Failed to navigate: ${errorDetail}`, expectedUrl: url, navigationOutcome: 'not-loaded', steps, success: false };
      }
      emit('Navigating to failure URL', 'done', 'Page loaded');

      // Verify we landed on the expected URL (detect auth redirects and wrong pages)
      const urlVerification = await this.verifyCurrentUrl(url);
      if (urlVerification.outcome === 'auth-redirect') {
        emit('URL verification', 'error', `Redirected to login/staging-setup — expected ${url}, got ${urlVerification.currentUrl}`);
        return { currentUrl: urlVerification.currentUrl, error: `Navigation was redirected to authentication page (${urlVerification.currentUrl}). The session may have expired.`, expectedUrl: url, navigationOutcome: 'auth-redirect', steps, success: false };
      }
      if (urlVerification.outcome === 'not-loaded') {
        emit('URL verification', 'error', `Page did not load — current URL: ${urlVerification.currentUrl}`);
        return { currentUrl: urlVerification.currentUrl, error: `Page did not load. Current URL: ${urlVerification.currentUrl || 'unknown'}`, expectedUrl: url, navigationOutcome: 'not-loaded', steps, success: false };
      }
      if (urlVerification.outcome === 'wrong-page') {
        emit('URL verification', 'done', `Landed on different page (${urlVerification.currentUrl}) — continuing with screenshot`);
      } else {
        emit('URL verification', 'done', `Confirmed on expected page: ${urlVerification.currentUrl}`);
      }

      // --- Deep navigation: if we landed on base URL / Dashboard, try to navigate
      //     to the actual in-app page where the test failure occurred.
      //     Extract the target path from the test spec file.
      if (testResultId) {
        try {
          const deepPath = await this.extractDeepNavigationPath(testResultId, url);
          if (deepPath) {
            // Build the full deep URL
            const parsedBase = new URL(url);
            const deepUrl = `${parsedBase.origin}${deepPath.startsWith('/') ? '' : '/'}${deepPath}`;
            if (deepUrl !== url && deepUrl !== `${parsedBase.origin}/` && deepUrl !== parsedBase.origin) {
              emit('Navigating to failure page', 'running', `Deep navigation to ${deepPath}`);
              const deepResult = await this.callMCPTool('playwright_goto', { url: deepUrl });
              if (!deepResult.isError) {
                emit('Navigating to failure page', 'done', `Landed on ${deepPath}`);
                // Wait for page to stabilize
                await new Promise(resolve => setTimeout(resolve, 2000));
              } else {
                emit('Navigating to failure page', 'error', `Failed to reach ${deepPath}, staying on current page`);
              }
            }
          }
        } catch (deepNavError: any) {
          console.warn('[MCPService] Deep navigation extraction failed:', deepNavError.message);
          // Non-fatal — continue with current page
        }
      }

      // --- Extract Qase test case steps for the response ---
      //     These provide the "Expected Test Flow" context to the frontend.
      let qaseSteps: undefined | { action: string; expected_result?: string; step_number: number }[];
      if (testResultId) {
        try {
          const mcpAnalyses = await this.mcpAnalysisRepository.getByTestResult(testResultId);
          if (mcpAnalyses.length > 0 && mcpAnalyses[0].analysisData) {
            const analysisData = typeof mcpAnalyses[0].analysisData === 'string'
              ? JSON.parse(mcpAnalyses[0].analysisData)
              : mcpAnalyses[0].analysisData;

            const rawSteps: { action: string; expected_result?: string }[] =
              analysisData?.qaseTestCase?.steps || [];

            if (rawSteps.length > 0) {
              qaseSteps = rawSteps.map((step, idx) => ({
                action: step.action,
                expected_result: step.expected_result || undefined,
                step_number: idx + 1,
              }));
              console.log(`[MCPService] Found ${qaseSteps.length} Qase test steps for testResultId=${testResultId}`);
            }
          }
        } catch (qaseStepsError: any) {
          console.warn('[MCPService] Failed to extract Qase steps (non-fatal):', qaseStepsError.message);
        }
      }

      // --- Extract Playwright test steps from the DB ---
      //     These provide the "Actual Test Flow" — what the test did and where it stopped.
      let playwrightSteps: undefined | { duration?: number; error?: string; status: string; step_number: number; title: string }[];
      if (testResultId) {
        try {
          const testResultWithSteps = await this.testResultRepository.findById(testResultId);
          if (testResultWithSteps?.steps && testResultWithSteps.steps.length > 0) {
            playwrightSteps = testResultWithSteps.steps.map((step: any) => ({
              duration: step.duration ?? undefined,
              error: step.error ?? undefined,
              status: step.status || (step.error ? 'failed' : 'passed'),
              step_number: step.order ?? 0,
              title: step.title,
            }));
            console.log(`[MCPService] Found ${playwrightSteps.length} Playwright test steps for testResultId=${testResultId}`);
          }
        } catch (pwStepsError: any) {
          console.warn('[MCPService] Failed to extract Playwright steps (non-fatal):', pwStepsError.message);
        }
      }

      // If selector provided and highlight requested, highlight the element
      if (selector && selector !== 'unknown' && highlight) {
        emit('Highlighting failing element', 'running', selector);
        try {
          const isPlaywrightLocator = /^(?:getBy\w+|locator)\s*\(/.test(selector);

          if (isPlaywrightLocator) {
            // Use Playwright's page.locator() API via evaluate to resolve and highlight
            const highlightScript = `
              (async () => {
                try {
                  // Convert Playwright locator call to an element reference
                  // Supported: getByRole, getByText, getByLabel, getByPlaceholder, getByTestId, locator
                  const locatorStr = ${JSON.stringify(selector)};
                  let element = null;

                  // Parse the locator expression
                  const roleMatch = locatorStr.match(/getByRole\\(['"]([^'"]+)['"](?:,\\s*\\{\\s*name:\\s*['"]([^'"]+)['"](?:,\\s*exact:\\s*(true|false))?\\s*\\})?\\)/);
                  if (roleMatch) {
                    const role = roleMatch[1];
                    const name = roleMatch[2];
                    const exact = roleMatch[3] === 'true';
                    const elements = document.querySelectorAll('[role="' + role + '"], ' + role);
                    for (const el of elements) {
                      const text = el.textContent?.trim() || el.getAttribute('aria-label') || '';
                      if (name) {
                        if (exact ? text === name : text.includes(name)) {
                          element = el;
                          break;
                        }
                      } else {
                        element = el;
                        break;
                      }
                    }
                  }

                  if (!element) {
                    const textMatch = locatorStr.match(/getByText\\(['"]([^'"]+)['"]\\)/);
                    if (textMatch) {
                      const xpath = "//\*[contains(text(), '" + textMatch[1] + "')]";
                      const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
                      element = result.singleNodeValue;
                    }
                  }

                  if (!element) {
                    const testIdMatch = locatorStr.match(/getByTestId\\(['"]([^'"]+)['"]\\)/);
                    if (testIdMatch) {
                      element = document.querySelector('[data-testid="' + testIdMatch[1] + '"]');
                    }
                  }

                  if (!element) {
                    const cssMatch = locatorStr.match(/locator\\(['"]([^'"]+)['"]\\)/);
                    if (cssMatch) {
                      element = document.querySelector(cssMatch[1]);
                    }
                  }

                  if (element) {
                    element.style.outline = '3px solid red';
                    element.style.outlineOffset = '2px';
                    element.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)';
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    return { found: true, locator: locatorStr, tag: element.tagName, text: element.textContent?.substring(0, 100) };
                  }
                  return { found: false, locator: locatorStr };
                } catch (e) {
                  return { error: e.message, found: false };
                }
              })();
            `;

            const evalResult = await this.callMCPTool('playwright_evaluate', {
              expression: highlightScript,
            });

            const resultData = evalResult.content?.[0]?.text;
            if (resultData) {
              try {
                const parsed = JSON.parse(resultData);
                if (parsed.found) {
                  console.log(`[MCPService] Highlighted Playwright locator element: ${parsed.tag} "${parsed.text?.substring(0, 50)}"`);
                } else {
                  console.warn(`[MCPService] Could not find element for locator: ${selector}`);
                }
              } catch {
                // Result may not be JSON
              }
            }
          } else {
            // Standard CSS selector — use document.querySelector
            const highlightScript = `
              (() => {
                try {
                  const element = document.querySelector('${selector.replace(/'/g, "\\'")}');
                  if (element) {
                    element.style.outline = '3px solid red';
                    element.style.outlineOffset = '2px';
                    element.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)';
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    return { found: true, tag: element.tagName, text: element.textContent?.substring(0, 100) };
                  }
                  return { found: false };
                } catch (e) {
                  return { error: e.message, found: false };
                }
              })();
            `;

            await this.callMCPTool('playwright_evaluate', {
              expression: highlightScript,
            });
          }

          emit('Highlighting failing element', 'done', 'Element highlight applied');

          // Take screenshot and save to disk
          emit('Taking screenshot', 'running');
          const screenshotResult = await this.callMCPTool('playwright_screenshot', {});

          // Save MCP screenshot to disk and build a URL for the frontend
          let screenshotUrl: string | undefined;
          try {
            const screenshotDir = join(__dirname, '../../../../mcp/mcp-output');
            if (!existsSync(screenshotDir)) mkdirSync(screenshotDir, { recursive: true });
            const filename = `failure-${Date.now()}.png`;
            const filepath = join(screenshotDir, filename);

            // The MCP SDK returns image content as { type: 'image', mimeType: '...', data: '<base64>' }
            const contentBlock = screenshotResult.content?.[0];
            if (contentBlock?.data) {
              writeFileSync(filepath, Buffer.from(contentBlock.data, 'base64'));
              screenshotUrl = `/mcp-output/${filename}`;
              emit('Taking screenshot', 'done', `Screenshot saved: ${filename}`);
            } else if (contentBlock?.text && contentBlock.text.includes('.png')) {
              // The MCP might return a file path — extract just the filename
              const match = contentBlock.text.match(/([\w-]+\.(?:png|jpg|jpeg))/i);
              if (match) {
                screenshotUrl = `/mcp-output/${match[1]}`;
              }
              emit('Taking screenshot', 'done', 'Screenshot reference captured');
            } else {
              emit('Taking screenshot', 'done', 'Screenshot captured (format unknown)');
            }
          } catch (saveError: any) {
            console.warn('[MCPService] Failed to save MCP screenshot to disk:', saveError.message);
            emit('Taking screenshot', 'done', 'Screenshot captured but could not save');
          }

          // Also look up the Playwright report screenshot for this test result
          let reportScreenshotUrl: string | undefined;
          if (testResultId) {
            try {
              const prisma = DatabaseService.getInstance().getClient();
              const { TestArtifactRepository } = await import('../repositories/TestArtifactRepository');
              const artifactRepo = new TestArtifactRepository(prisma);
              const artifacts = await artifactRepo.findByTestResult(testResultId);
              const screenshotArtifact = artifacts.find(a => a.type === 'screenshot');
              if (screenshotArtifact) {
                reportScreenshotUrl = `/api/artifacts/file/${screenshotArtifact.id}`;
                emit('Report screenshot found', 'done', `Artifact: ${screenshotArtifact.filename}`);
              }
            } catch (dbError: any) {
              console.warn('[MCPService] Could not look up report screenshot:', dbError.message);
            }
          }

          // --- Phase 5: Refresh selectors from live DOM ---
          let refreshedSelectors: string[] = [];
          try {
            emit('Refreshing selectors from live DOM', 'running');
            const domAnalysisScript = `
              (() => {
                try {
                  // Collect interactive elements near the viewport center or the highlighted element
                  const highlighted = document.querySelector('[style*="outline: 3px solid red"]');
                  const root = highlighted ? highlighted.parentElement || document.body : document.body;

                  const elements = [];
                  const interactiveSelectors = 'button, a, input, select, textarea, [role="button"], [role="link"], [role="checkbox"], [role="tab"], [role="menuitem"], [data-testid], img[alt]';
                  const candidates = root.querySelectorAll(interactiveSelectors);

                  // Also include the highlighted element itself if found
                  if (highlighted && !Array.from(candidates).includes(highlighted)) {
                    candidates.length; // force evaluation
                  }

                  const seen = new Set();
                  const collect = (el) => {
                    if (seen.has(el) || elements.length >= 15) return;
                    seen.add(el);
                    elements.push({
                      ariaLabel: el.getAttribute('aria-label') || '',
                      classes: el.className || '',
                      id: el.id || '',
                      role: el.getAttribute('role') || '',
                      tag: el.tagName.toLowerCase(),
                      testId: el.getAttribute('data-testid') || '',
                      text: (el.textContent || '').trim().substring(0, 80),
                    });
                  };

                  // Prioritize the highlighted element
                  if (highlighted) collect(highlighted);
                  // Then nearby interactive elements
                  candidates.forEach(el => collect(el));

                  return JSON.stringify({ elements, found: elements.length });
                } catch (e) {
                  return JSON.stringify({ elements: [], error: e.message, found: 0 });
                }
              })();
            `;

            const domResult = await this.callMCPTool('playwright_evaluate', { expression: domAnalysisScript });
            const domText = domResult.content?.[0]?.text || '';
            let domData: { elements: any[]; found: number } = { elements: [], found: 0 };
            try {
              domData = JSON.parse(domText);
            } catch {
              // Try extracting JSON from markdown-wrapped response
              const jsonMatch = domText.match(/\{[\s\S]*\}/);
              if (jsonMatch) domData = JSON.parse(jsonMatch[0]);
            }

            if (domData.elements && domData.elements.length > 0) {
              // Generate selectors for each discovered element
              const selectorSet = new Set<string>();
              for (const el of domData.elements) {
                const generated = this.generateSelectorsFromElement(el);
                generated.forEach(s => selectorSet.add(s));
              }
              // Also add Playwright-style locators
              for (const el of domData.elements) {
                if (el.testId) selectorSet.add(`getByTestId('${el.testId}')`);
                if (el.role && el.text && el.text.length < 50) {
                  selectorSet.add(`getByRole('${el.role}', { name: '${el.text.replace(/'/g, "\\'")}' })`);
                }
                if (el.ariaLabel) selectorSet.add(`getByLabel('${el.ariaLabel.replace(/'/g, "\\'")}')`);
                if (el.text && el.text.length > 0 && el.text.length < 40) {
                  selectorSet.add(`getByText('${el.text.replace(/'/g, "\\'")}')`);
                }
              }
              refreshedSelectors = Array.from(selectorSet).slice(0, 10);
              emit('Refreshing selectors from live DOM', 'done', `Found ${refreshedSelectors.length} selectors from ${domData.elements.length} elements`);
            } else {
              emit('Refreshing selectors from live DOM', 'done', 'No interactive elements found near failure point');
            }
          } catch (refreshError: any) {
            emit('Refreshing selectors from live DOM', 'error', refreshError.message);
          }

          // --- Phase 6: Validate selectors against live DOM ---
          type ValidatedSelector = { count: number; selector: string; status: 'fail' | 'pass'; tag?: string };
          const validatedSelectors: ValidatedSelector[] = [];
          try {
            // Combine refreshed + original suggested + the failing selector (deduplicated)
            const allSelectors = Array.from(new Set([
              ...(selector ? [selector] : []),
              ...(suggestedSelectors || []),
              ...refreshedSelectors,
            ]));
            if (allSelectors.length > 0) {
              emit('Validating selectors', 'running', `Testing ${allSelectors.length} selectors against live page`);

              // Build a single evaluate script that tests ALL selectors at once (1 MCP call)
              const validationScript = `
                (() => {
                  const selectors = ${JSON.stringify(allSelectors)};
                  const results = [];
                  for (const sel of selectors) {
                    try {
                      let count = 0;
                      let tag = '';
                      // CSS selectors
                      if (sel.startsWith('[') || sel.startsWith('#') || sel.startsWith('.') || /^[a-z]+[.#\\[]/.test(sel) || /^[a-z]+$/.test(sel)) {
                        const els = document.querySelectorAll(sel);
                        count = els.length;
                        if (els.length > 0) tag = els[0].tagName.toLowerCase();
                      }
                      // text= selector
                      else if (sel.startsWith('text=')) {
                        const textVal = sel.replace(/^text=["']?/, '').replace(/["']?$/, '');
                        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
                        while (walker.nextNode()) {
                          if (walker.currentNode.textContent && walker.currentNode.textContent.includes(textVal)) {
                            count++;
                            if (!tag && walker.currentNode.parentElement) tag = walker.currentNode.parentElement.tagName.toLowerCase();
                          }
                        }
                      }
                      // getByTestId('...')
                      else if (sel.startsWith("getByTestId(")) {
                        const id = sel.match(/getByTestId\\(['"](.+?)['"]\\)/);
                        if (id) {
                          const els = document.querySelectorAll('[data-testid="' + id[1] + '"]');
                          count = els.length;
                          if (els.length > 0) tag = els[0].tagName.toLowerCase();
                        }
                      }
                      // getByRole('...', { name: '...' })
                      else if (sel.startsWith("getByRole(")) {
                        const match = sel.match(/getByRole\\(['"](.+?)['"](?:,\\s*\\{\\s*name:\\s*['"](.+?)['"])?/);
                        if (match) {
                          const role = match[1];
                          const name = match[2];
                          const els = document.querySelectorAll('[role="' + role + '"]');
                          for (const el of els) {
                            if (!name || (el.textContent && el.textContent.trim().includes(name)) || el.getAttribute('aria-label') === name) {
                              count++;
                              if (!tag) tag = el.tagName.toLowerCase();
                            }
                          }
                          // Also check implicit roles
                          if (count === 0 && role === 'button') {
                            const buttons = document.querySelectorAll('button');
                            for (const el of buttons) {
                              if (!name || (el.textContent && el.textContent.trim().includes(name))) {
                                count++;
                                if (!tag) tag = 'button';
                              }
                            }
                          }
                          if (count === 0 && role === 'link') {
                            const links = document.querySelectorAll('a');
                            for (const el of links) {
                              if (!name || (el.textContent && el.textContent.trim().includes(name))) {
                                count++;
                                if (!tag) tag = 'a';
                              }
                            }
                          }
                        }
                      }
                      // getByText / getByLabel
                      else if (sel.startsWith("getByText(") || sel.startsWith("getByLabel(")) {
                        const match = sel.match(/getBy(?:Text|Label)\\(['"](.+?)['"]\\)/);
                        if (match) {
                          const text = match[1];
                          if (sel.startsWith("getByLabel(")) {
                            const labels = document.querySelectorAll('label');
                            for (const label of labels) {
                              if (label.textContent && label.textContent.trim().includes(text)) {
                                count++;
                                if (!tag) tag = 'label';
                              }
                            }
                          } else {
                            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
                            while (walker.nextNode()) {
                              if (walker.currentNode.textContent && walker.currentNode.textContent.includes(text)) {
                                count++;
                                if (!tag && walker.currentNode.parentElement) tag = walker.currentNode.parentElement.tagName.toLowerCase();
                              }
                            }
                          }
                        }
                      }
                      results.push({ count, selector: sel, status: count > 0 ? 'pass' : 'fail', tag: tag || undefined });
                    } catch (e) {
                      results.push({ count: 0, selector: sel, status: 'fail', tag: undefined });
                    }
                  }
                  return JSON.stringify(results);
                })();
              `;

              const validationResult = await this.callMCPTool('playwright_evaluate', { expression: validationScript });
              const validationText = validationResult.content?.[0]?.text || '';
              try {
                const parsed = JSON.parse(validationText);
                if (Array.isArray(parsed)) {
                  validatedSelectors.push(...parsed);
                }
              } catch {
                const jsonMatch = validationText.match(/\[[\s\S]*\]/);
                if (jsonMatch) {
                  const parsed = JSON.parse(jsonMatch[0]);
                  if (Array.isArray(parsed)) validatedSelectors.push(...parsed);
                }
              }

              const passing = validatedSelectors.filter(v => v.status === 'pass').length;
              const failing = validatedSelectors.filter(v => v.status === 'fail').length;
              emit('Validating selectors', 'done', `${passing} pass, ${failing} fail out of ${validatedSelectors.length} tested`);
            }
          } catch (validateError: any) {
            emit('Validating selectors', 'error', validateError.message);
          }

          emit('Navigate to failure complete', 'done');
          return {
            currentUrl: urlVerification.currentUrl,
            expectedUrl: url,
            navigationOutcome: urlVerification.outcome,
            playwrightSteps,
            qaseSteps,
            refreshedSelectors: refreshedSelectors.length > 0 ? refreshedSelectors : undefined,
            reportScreenshotUrl,
            screenshot: screenshotUrl,
            steps,
            success: true,
            validatedSelectors: validatedSelectors.length > 0 ? validatedSelectors : undefined,
          };
        } catch (error: any) {
          emit('Highlighting failing element', 'error', error.message);
          console.warn('[MCPService] Failed to highlight element:', error);
          return { currentUrl: urlVerification.currentUrl, expectedUrl: url, navigationOutcome: urlVerification.outcome, playwrightSteps, qaseSteps, steps, success: true };
        }
      }

      emit('Navigate to failure complete', 'done', 'No selector to highlight');
      return { currentUrl: urlVerification.currentUrl, expectedUrl: url, navigationOutcome: urlVerification.outcome, playwrightSteps, qaseSteps, steps, success: true };
    } catch (error: any) {
      emit('Navigate to failure complete', 'error', error.message);
      console.error('[MCPService] Error navigating to failure point:', error);
      return { error: error.message, steps, success: false };
    }
  }

  /**
   * Set the broadcast function for sending real-time progress to the frontend via WebSocket.
   */
  setBroadcast(fn: (data: any) => void): void {
    this.broadcastFn = fn;
  }

  /**
   * Use MCP to analyze an element and get better selectors
   * Falls back to basic analysis if MCP is not available
   */
  private async analyzeElementWithMCP(url: string, selector: string, testName?: string): Promise<ElementAnalysis> {
    // Check if MCP server is available
    const mcpAvailable = await this.checkMCPServer();

    if (!mcpAvailable) {
      console.warn('[MCPService] MCP server not available, using fallback analysis');
      return this.fallbackAnalysis(selector, testName);
    }

    try {
      // Navigate to the page using MCP with two-phase auth for acsb-test.com
      if (MCPService.needsHttpAuth(url)) {
        // Phase 1: cache credentials
        const authUrl = MCPService.injectAuthIfNeeded(url);
        await this.callMCPTool('playwright_goto', { url: authUrl });
      }
      // Phase 2 (or direct): navigate to clean URL
      const gotoResult = await this.callMCPTool('playwright_goto', { url });
      if (gotoResult.isError) {
        console.warn('[MCPService] Failed to navigate with MCP, using fallback');
        return this.fallbackAnalysis(selector, testName);
      }

      // Use MCP's evaluate tool to analyze the page
      const analysisScript = `
        (() => {
          try {
            const elements = document.querySelectorAll('${selector.replace(/'/g, "\\'")}');
            if (elements.length > 0) {
              const el = elements[0];
              const rect = el.getBoundingClientRect();
              return {
                found: true,
                element: {
                  tag: el.tagName.toLowerCase(),
                  text: el.textContent?.trim().substring(0, 50) || '',
                  id: el.id || '',
                  testId: el.getAttribute('data-testid') || '',
                  classes: el.className || '',
                  role: el.getAttribute('role') || '',
                  position: {
                    x: rect.x,
                    y: rect.y,
                    width: rect.width,
                    height: rect.height,
                  }
                }
              };
            }
            
            // Try to find similar elements
            const allInteractive = Array.from(document.querySelectorAll('button, a, input, [role="button"], [role="link"], [data-testid]'));
            return {
              found: false,
              similar: allInteractive.slice(0, 10).map(el => {
                const rect = el.getBoundingClientRect();
                return {
                  tag: el.tagName.toLowerCase(),
                  text: el.textContent?.trim().substring(0, 50) || '',
                  id: el.id || '',
                  testId: el.getAttribute('data-testid') || '',
                  classes: el.className || '',
                  role: el.getAttribute('role') || '',
                  position: {
                    x: rect.x,
                    y: rect.y,
                    width: rect.width,
                    height: rect.height,
                  }
                };
              })
            };
          } catch (e) {
            return { found: false, error: e.message };
          }
        })()
      `;

      const analysisResult = await this.callMCPTool('playwright_evaluate', {
        expression: analysisScript,
      });

      if (analysisResult.isError || !analysisResult.content) {
        return this.fallbackAnalysis(selector, testName);
      }

      const resultText = analysisResult.content[0]?.text;
      if (!resultText) {
        return this.fallbackAnalysis(selector, testName);
      }

      const data = JSON.parse(resultText);

      if (data.found && data.element) {
        const suggestedSelectors = this.generateSelectorsFromElement(data.element);

        return {
          confidence: 0.9,
          elementInfo: {
            attributes: {
              class: data.element.classes || '',
              'data-testid': data.element.testId || '',
              id: data.element.id || '',
              role: data.element.role || '',
            },
            position: data.element.position || { height: 0, width: 0, x: 0, y: 0 },
            tag: data.element.tag,
            text: data.element.text,
          },
          selector,
          suggestedSelectors,
          testName,
        };
      } else if (data.similar && data.similar.length > 0) {
        const bestMatch = data.similar[0];
        const suggestedSelectors = this.generateSelectorsFromElement(bestMatch);

        return {
          confidence: 0.6,
          elementInfo: {
            attributes: {
              class: bestMatch.classes || '',
              'data-testid': bestMatch.testId || '',
              id: bestMatch.id || '',
              role: bestMatch.role || '',
            },
            position: bestMatch.position || { height: 0, width: 0, x: 0, y: 0 },
            tag: bestMatch.tag,
            text: bestMatch.text,
          },
          selector,
          suggestedSelectors,
          testName,
        };
      }

      return this.fallbackAnalysis(selector, testName);
    } catch (error: any) {
      console.error('[MCPService] Error analyzing element with MCP:', error);
      return this.fallbackAnalysis(selector, testName);
    }
  }

  /**
   * Analyze a single failed test using unified context from ReportService
   */
  private async analyzeWithUnifiedContext(unifiedResult: UnifiedTestResult): Promise<ElementAnalysis> {
    const {navigationContext} = unifiedResult.unified;
    const initialSelector = navigationContext.selector || 'unknown';
    const analysisUrl = navigationContext.url;

    if (!analysisUrl) {
      throw new Error('Cannot perform MCP analysis: missing navigation URL');
    }

    // Perform MCP analysis
    const analysis = await this.analyzeElementWithMCP(analysisUrl, initialSelector, unifiedResult.playwright.name);

    // Enrich with unified context
    analysis.testName = unifiedResult.playwright.name;
    analysis.testFile = unifiedResult.playwright.file;
    analysis.error = unifiedResult.playwright.error;
    analysis.qaseId = unifiedResult.qase.id;
    analysis.qaseTestCase =
      unifiedResult.qase.id ?
        {
          description: unifiedResult.qase.description,
          id: unifiedResult.qase.id,
          steps: unifiedResult.qase.steps,
          title: unifiedResult.qase.title || '',
        }
      : undefined;
    analysis.navigationContext = {
      failureStep: navigationContext.failureStep,
      stepBeforeFailure: navigationContext.stepBeforeFailure,
      url: navigationContext.url,
    };

    return analysis;
  }

  /**
   * Authenticate the MCP browser by replaying the staging-setup login flow.
   *
   * Uses a **two-phase HTTP Basic Auth** approach for acsb-test.com domains:
   *   Phase 1: Navigate WITH credentials in the URL to cache the auth response
   *            in the browser's credential store.
   *   Phase 2: Immediately navigate to the CLEAN URL (no credentials) so that
   *            in-page fetch/tRPC calls don't inherit embedded credentials,
   *            which would cause `TRPCClientError: Request cannot be constructed
   *            from a URL that includes credentials`.
   *
   * After the clean page loads, it runs the staging-setup automation script
   * (fill form → submit → click Login link → wait for /dashboard).
   *
   * @returns true if authentication succeeded, false otherwise
   */
  private async authenticateViaStagingSetup(
    baseUrl: string,
    params: StagingSetupParams,
    emit?: (step: string, status: NavigationProgressStep['status'], detail?: string) => void,
  ): Promise<boolean> {
    const log = (step: string, status: NavigationProgressStep['status'], detail?: string) => {
      if (emit) emit(step, status, detail);
      else console.log(`[MCPService] auth: [${status}] ${step}${detail ? ` — ${detail}` : ''}`);
    };

    const cleanSetupUrl = `${baseUrl}/staging-setup`;
    const needsBasicAuth = MCPService.needsHttpAuth(baseUrl);

    try {
      // Phase 1: If domain needs HTTP Basic Auth, navigate WITH credentials first
      // to cache the browser's auth response. This MUST happen before the clean
      // navigation, otherwise the browser will show a 401 challenge.
      if (needsBasicAuth) {
        const authUrl = MCPService.injectAuthIfNeeded(cleanSetupUrl);
        log('HTTP Basic Auth (phase 1)', 'running', `Caching credentials for ${  new URL(baseUrl).hostname}`);
        const phase1Result = await this.callMCPTool('playwright_goto', { url: authUrl });
        if (phase1Result.isError) {
          const errorMsg = phase1Result.content?.[0]?.text || 'Unknown error';
          log('HTTP Basic Auth (phase 1)', 'error', `Auth cache failed: ${errorMsg}`);
          // Don't bail out — try clean URL anyway, the server might not require auth
        } else {
          log('HTTP Basic Auth (phase 1)', 'done', 'Browser cached credentials');
        }

        // Phase 2: Navigate to the CLEAN URL (no credentials in URL).
        // The browser will automatically send the cached Authorization header.
        // This prevents tRPC/fetch errors caused by embedded credentials.
        log('HTTP Basic Auth (phase 2)', 'running', 'Navigating to clean URL');
        const phase2Result = await this.callMCPTool('playwright_goto', { url: cleanSetupUrl });
        if (phase2Result.isError) {
          const errorMsg = phase2Result.content?.[0]?.text || 'Unknown error';
          log('HTTP Basic Auth (phase 2)', 'error', `Clean navigation failed: ${errorMsg}`);
          return false;
        }
        log('HTTP Basic Auth (phase 2)', 'done', 'Clean staging-setup page loaded');
      } else {
        // No HTTP Basic Auth needed — navigate directly
        log('Navigating to staging-setup', 'running', cleanSetupUrl);
        const navResult = await this.callMCPTool('playwright_goto', { url: cleanSetupUrl });
        if (navResult.isError) {
          const errorMsg = navResult.content?.[0]?.text || 'Unknown error';
          log('Navigating to staging-setup', 'error', errorMsg);
          return false;
        }
        log('Navigating to staging-setup', 'done', 'Page loaded');
      }

      // 2. Try the staging-setup automation via browser_run_code first.
      //    If that fails (e.g. MCP echoes back the code without executing it),
      //    fall back to step-by-step MCP tool calls.
      log('Filling staging-setup form', 'running', `domain=${params.domain} email=${params.email} plan=${params.plan}`);

      let scriptSucceeded = false;

      // --- Attempt 1: browser_run_code (single atomic script) ---
      try {
        const script = generateStagingSetupScript(params, cleanSetupUrl);
        console.log(`[MCPService] browser_run_code script (first 300 chars): ${script.substring(0, 300)}...`);

        const runResult = await this.callMCPTool('browser_run_code', { code: script });
        console.log('[MCPService] browser_run_code full response:', JSON.stringify(runResult, null, 2));

        if (!runResult.isError) {
          // Parse the result text. The Playwright MCP `browser_run_code` wraps
          // the response in markdown: "### Ran Playwright code\n```js\n...\n```\n\nResult: <value>"
          const rawResultText = runResult.content?.[0]?.text || '';
          console.log(`[MCPService] browser_run_code raw result (first 500 chars): "${rawResultText.substring(0, 500)}"`);

          // Extract the actual return value from the markdown wrapper
          let resultText = rawResultText;
          const resultMatch = rawResultText.match(/(?:Result|Return value|Output):\s*(.+?)$/ms);
          if (resultMatch) {
            resultText = resultMatch[1].trim();
          } else if (rawResultText.includes('```')) {
            const afterFence = rawResultText.split('```').pop()?.trim() || '';
            if (afterFence) resultText = afterFence;
          }

          // Search anywhere in the full response for our known markers
          const hasAuthenticated = rawResultText.includes('authenticated') && rawResultText.includes('| steps:');
          const hasError = rawResultText.includes('error:') && rawResultText.includes('| steps:');

          // Extract and log script-level steps
          const stepsMatch = rawResultText.match(/\| steps: (.+)/);
          if (stepsMatch) {
            stepsMatch[1].split(' >> ').forEach(s => log('Script step', 'done', s.trim()));
          }

          if (resultText.startsWith('authenticated') || hasAuthenticated) {
            log('Filling staging-setup form', 'done', 'Form submitted → Login link clicked → Dashboard reached');
            scriptSucceeded = true;
          } else if (resultText.startsWith('error:') || hasError) {
            const errorMatch = rawResultText.match(/error:\s*(.+?)(?:\s*\|\s*steps:|$)/);
            const errorPart = errorMatch ? errorMatch[1].trim() : resultText.split(' | steps:')[0];
            log('Filling staging-setup form', 'error', `Script error: ${errorPart}`);
          } else {
            log('Filling staging-setup form', 'error', `Script returned unexpected result — will try step-by-step fallback`);
          }
        } else {
          const errorMsg = runResult.content?.[0]?.text || 'Script execution failed';
          log('Filling staging-setup form', 'error', `browser_run_code failed: ${errorMsg}`);
        }
      } catch (scriptError: any) {
        log('Filling staging-setup form', 'error', `browser_run_code threw: ${scriptError.message}`);
      }

      // 3. Post-auth verification: check if we're actually on /dashboard.
      //    This catches cases where the script "succeeded" but the form wasn't filled.
      if (scriptSucceeded) {
        try {
          const snapshotResult = await this.callMCPTool('browser_snapshot', {});
          const snapshotText = snapshotResult.content?.[0]?.text || '';
          // The Playwright MCP snapshot includes "- Page URL: https://..."
          const urlMatch = snapshotText.match(/Page URL:\s*(https?:\/\/[^\s\n]+)/i) ||
                           snapshotText.match(/url:\s*(https?:\/\/[^\s\n]+)/i) ||
                           snapshotText.match(/(https?:\/\/[^\s\n]+)/i);
          const currentUrl = urlMatch ? urlMatch[1] : '';
          console.log(`[MCPService] Post-auth URL check: "${currentUrl}"`);
          if (currentUrl.includes('/dashboard')) {
            log('Post-auth verification', 'done', `Confirmed on dashboard: ${currentUrl}`);
            return true;
          } else if (currentUrl.includes('/staging-setup')) {
            log('Post-auth verification', 'error', `Still on staging-setup — script did not complete. Trying step-by-step fallback.`);
            scriptSucceeded = false;
          } else {
            // On some other page — might still be authenticated
            log('Post-auth verification', 'done', `On ${currentUrl} — may be authenticated`);
            return true;
          }
        } catch {
          // Snapshot failed — optimistically assume script worked
          log('Post-auth verification', 'done', 'Snapshot unavailable — assuming auth succeeded');
          return true;
        }
      }

      // --- Attempt 2: Step-by-step MCP tool calls (robust fallback) ---
      // If browser_run_code failed or form wasn't filled, do it the hard way
      // using individual MCP tool calls for each interaction.
      // Each step takes a fresh snapshot to discover element refs.
      if (!scriptSucceeded) {
        log('Step-by-step auth fallback', 'running', 'Filling form via individual MCP calls');
        try {
          // Take a snapshot to discover form element refs
          const formSnapshot = await this.callMCPTool('browser_snapshot', {});
          const formText = formSnapshot.content?.[0]?.text || '';

          // Ensure we're on staging-setup
          if (!formText.includes('Staging Setup') && !formText.includes('staging-setup')) {
            await this.callMCPTool('playwright_goto', { url: cleanSetupUrl });
            await new Promise(resolve => setTimeout(resolve, 1000));
          }

          // Re-snapshot to get fresh refs
          const snap1 = await this.callMCPTool('browser_snapshot', {});
          const snap1Text = snap1.content?.[0]?.text || '';
          console.log(`[MCPService] Fallback snapshot (first 1000 chars): ${snap1Text.substring(0, 1000)}`);

          // Find refs for form fields from the snapshot
          const emailRef = this.extractRefByNameFromSnapshot(snap1Text, 'User Email');
          const domainRef = this.extractRefByNameFromSnapshot(snap1Text, 'Domain');
          const pageCountRef = this.extractRefByNameFromSnapshot(snap1Text, 'Page Count');

          if (!emailRef || !domainRef || !pageCountRef) {
            log('Step-by-step auth fallback', 'error',
              `Could not find form field refs: email=${emailRef} domain=${domainRef} pageCount=${pageCountRef}`);
            return false;
          }

          // Fill email using browser_type (fields are empty on fresh staging-setup)
          const emailFill = await this.callMCPTool('browser_type', {
            element: 'User Email input',
            ref: emailRef,
            text: params.email,
          });
          if (emailFill.isError) {
            log('Step-by-step auth fallback', 'error', `Fill email failed: ${emailFill.content?.[0]?.text}`);
            return false;
          }
          log('Step-by-step auth fallback', 'done', `Filled email: ${params.email}`);

          // Fill domain
          await this.callMCPTool('browser_type', {
            element: 'Domain input',
            ref: domainRef,
            text: params.domain,
          });
          log('Step-by-step auth fallback', 'done', `Filled domain: ${params.domain}`);

          // Fill page count — clear first since it has default value "5"
          await this.callMCPTool('browser_click', { element: 'Page Count input', ref: pageCountRef });
          // Select all and replace
          await this.callMCPTool('browser_type', {
            element: 'Page Count input',
            ref: pageCountRef,
            text: String(params.pageCount),
          });
          log('Step-by-step auth fallback', 'done', `Filled page count: ${params.pageCount}`);

          // Open plan dropdown — take fresh snapshot to find the plan dropdown ref
          const snap2 = await this.callMCPTool('browser_snapshot', {});
          const snap2Text = snap2.content?.[0]?.text || '';
          const planRef = this.extractRefByNameFromSnapshot(snap2Text, 'standard');
          if (planRef) {
            await this.callMCPTool('browser_click', { element: 'plan dropdown', ref: planRef });
            log('Step-by-step auth fallback', 'done', 'Plan dropdown opened');

            // Wait for dropdown options to appear
            await new Promise(resolve => setTimeout(resolve, 500));
            const snap3 = await this.callMCPTool('browser_snapshot', {});
            const snap3Text = snap3.content?.[0]?.text || '';
            const optionRef = this.extractRefByNameFromSnapshot(snap3Text, params.plan);
            if (optionRef && optionRef !== planRef) {
              await this.callMCPTool('browser_click', { element: `plan option: ${params.plan}`, ref: optionRef });
              log('Step-by-step auth fallback', 'done', `Plan selected: ${params.plan}`);
            }
          }

          // Click "Upsert Domain and User" — fresh snapshot
          const snap4 = await this.callMCPTool('browser_snapshot', {});
          const snap4Text = snap4.content?.[0]?.text || '';
          const upsertRef = this.extractRefByNameFromSnapshot(snap4Text, 'Upsert Domain and User');
          if (upsertRef) {
            await this.callMCPTool('browser_click', { element: 'Upsert Domain and User button', ref: upsertRef });
            log('Step-by-step auth fallback', 'done', 'Form submitted');
          } else {
            log('Step-by-step auth fallback', 'error', 'Could not find Upsert button');
            return false;
          }

          // Wait for Login link to appear (poll with snapshots)
          log('Step-by-step auth fallback', 'running', 'Waiting for Login link');
          let loginClicked = false;
          for (let attempt = 0; attempt < 6; attempt++) {
            await new Promise(resolve => setTimeout(resolve, 2500));
            const snap = await this.callMCPTool('browser_snapshot', {});
            const snapText = snap.content?.[0]?.text || '';

            // Look for a link with name "Login"
            const loginRef = this.extractRefByRoleAndName(snapText, 'link', 'Login');
            if (loginRef) {
              await this.callMCPTool('browser_click', { element: 'Login link', ref: loginRef });
              log('Step-by-step auth fallback', 'done', 'Login link clicked');
              loginClicked = true;
              break;
            }
          }

          if (!loginClicked) {
            log('Step-by-step auth fallback', 'error', 'Login link did not appear after 15s');
            return false;
          }

          // Wait for redirect to dashboard (poll with snapshots)
          log('Step-by-step auth fallback', 'running', 'Waiting for dashboard redirect');
          for (let attempt = 0; attempt < 6; attempt++) {
            await new Promise(resolve => setTimeout(resolve, 2500));
            const snap = await this.callMCPTool('browser_snapshot', {});
            const snapText = snap.content?.[0]?.text || '';
            if (snapText.includes('/dashboard') || snapText.includes('Dashboard')) {
              log('Step-by-step auth fallback', 'done', 'Reached dashboard — authenticated!');

              // Dismiss Flow Intro modal if present
              const closeRef = this.extractRefByRoleAndName(snapText, 'button', 'Close');
              if (closeRef && (snapText.includes('flow-intro') || snapText.includes('welcome'))) {
                await this.callMCPTool('browser_click', { element: 'Close flow intro modal', ref: closeRef });
                log('Step-by-step auth fallback', 'done', 'Flow Intro modal dismissed');
              }

              return true;
            }
          }

          log('Step-by-step auth fallback', 'error', 'Did not reach dashboard after 15s');
          return false;
        } catch (fallbackError: any) {
          log('Step-by-step auth fallback', 'error', `Fallback threw: ${fallbackError.message}`);
          return false;
        }
      }

      return scriptSucceeded;
    } catch (error: any) {
      log('Authentication', 'error', error.message);
      return false;
    }
  }

  /**
   * CLI-backed staging-setup authentication.
   * Uses the Playwright CLI executor to replay the staging-setup login flow.
   */
  private async authenticateViaStagingSetupCLI(
    cli: PlaywrightCLIExecutor,
    targetUrl: string,
    testResultId: string,
    emit: (step: string, status: NavigationProgressStep['status'], detail?: string) => void,
  ): Promise<boolean> {
    try {
      // Get auth params from test result annotations
      const params = await this.getAuthSetupParams(testResultId);
      if (!params) {
        emit('Reading auth parameters', 'done', 'No auth params found — skipping');
        return false;
      }
      emit('Reading auth parameters', 'done',
        `fixture=${params.fixture ?? 'unknown'} domain=${params.domain} email=${params.email}`);

      const baseUrl = new URL(targetUrl).origin;
      const cleanSetupUrl = `${baseUrl}/staging-setup`;

      // Navigate to staging-setup (httpCredentials handled by config)
      emit('Navigating to staging-setup', 'running', cleanSetupUrl);
      const navResult = await cli.goto(cleanSetupUrl);
      if (!navResult.ok) {
        emit('Navigating to staging-setup', 'error', navResult.error || 'Navigation failed');
        return false;
      }
      emit('Navigating to staging-setup', 'done', 'Page loaded');

      // Use run-code to execute the full staging-setup script atomically
      emit('Filling staging-setup form', 'running',
        `domain=${params.domain} email=${params.email} plan=${params.plan}`);

      const script = generateStagingSetupScript(params, cleanSetupUrl);
      const runResult = await cli.runCode(script);
      const rawText = runResult.rawText || '';

      // Check for success markers
      if (rawText.includes('authenticated') && rawText.includes('steps:')) {
        // Extract and log script-level steps
        const stepsMatch = rawText.match(/\| steps: (.+)/);
        if (stepsMatch) {
          stepsMatch[1].split(' >> ').forEach(s =>
            emit('Script step', 'done', s.trim()));
        }
        emit('Filling staging-setup form', 'done', 'Form submitted → Login link clicked → Dashboard reached');
        return true;
      }

      // Check for error markers
      if (rawText.includes('error:') && rawText.includes('steps:')) {
        const errorMatch = rawText.match(/error:\s*(.+?)(?:\s*\|\s*steps:|$)/);
        const errorPart = errorMatch ? errorMatch[1].trim() : 'Unknown script error';
        emit('Filling staging-setup form', 'error', `Script error: ${errorPart}`);
      } else {
        emit('Filling staging-setup form', 'error', 'Script returned unexpected result');
      }

      // ── Fallback: Step-by-step CLI calls ─────────────────────────────────
      emit('Step-by-step auth fallback', 'running', 'Filling form via CLI commands');

      // Take snapshot to discover element refs
      const snap1 = await cli.snapshot();
      if (!snap1.ok || !snap1.snapshotPath) {
        emit('Step-by-step auth fallback', 'error', 'Could not take snapshot');
        return false;
      }
      const snap1Text = cli.readSnapshotFile(snap1.snapshotPath) || '';

      // Find refs for form fields
      const emailRef = this.extractRefByNameFromSnapshot(snap1Text, 'User Email');
      const domainRef = this.extractRefByNameFromSnapshot(snap1Text, 'Domain');

      if (!emailRef || !domainRef) {
        emit('Step-by-step auth fallback', 'error',
          `Could not find form field refs: email=${emailRef} domain=${domainRef}`);
        return false;
      }

      // Fill form fields
      await cli.fill(emailRef, params.email);
      emit('Step-by-step auth fallback', 'done', `Filled email: ${params.email}`);

      await cli.fill(domainRef, params.domain);
      emit('Step-by-step auth fallback', 'done', `Filled domain: ${params.domain}`);

      // Find and click Upsert button
      const snap2 = await cli.snapshot();
      const snap2Text = snap2.snapshotPath ? (cli.readSnapshotFile(snap2.snapshotPath) || '') : '';
      const upsertRef = this.extractRefByNameFromSnapshot(snap2Text, 'Upsert Domain and User');
      if (upsertRef) {
        await cli.click(upsertRef);
        emit('Step-by-step auth fallback', 'done', 'Form submitted');
      } else {
        emit('Step-by-step auth fallback', 'error', 'Could not find Upsert button');
        return false;
      }

      // Wait for Login link to appear (poll with snapshots)
      emit('Step-by-step auth fallback', 'running', 'Waiting for Login link');
      let loginClicked = false;
      for (let attempt = 0; attempt < 6; attempt++) {
        await new Promise(resolve => setTimeout(resolve, 2500));
        const snap = await cli.snapshot();
        const snapText = snap.snapshotPath ? (cli.readSnapshotFile(snap.snapshotPath) || '') : '';
        const loginRef = this.extractRefByRoleAndName(snapText, 'link', 'Login');
        if (loginRef) {
          await cli.click(loginRef);
          emit('Step-by-step auth fallback', 'done', 'Login link clicked');
          loginClicked = true;
          break;
        }
      }

      if (!loginClicked) {
        emit('Step-by-step auth fallback', 'error', 'Login link did not appear after 15s');
        return false;
      }

      // Wait for dashboard redirect
      emit('Step-by-step auth fallback', 'running', 'Waiting for dashboard redirect');
      for (let attempt = 0; attempt < 6; attempt++) {
        await new Promise(resolve => setTimeout(resolve, 2500));
        const snap = await cli.snapshot();
        if (snap.pageUrl?.includes('/dashboard') || snap.pageTitle?.includes('Dashboard')) {
          emit('Step-by-step auth fallback', 'done', 'Reached dashboard — authenticated!');
          return true;
        }
      }

      emit('Step-by-step auth fallback', 'error', 'Did not reach dashboard after 15s');
      return false;
    } catch (error: any) {
      emit('Authentication error', 'error', error.message);
      return false;
    }
  }

  /**
   * Build a DOM analysis script that discovers interactive elements near the
   * highlighted element. Used for selector refresh in the CLI-backed flow.
   */
  private buildDOMAnalysisScript(): string {
    return `(() => {
  try {
    const highlighted = document.querySelector('[style*="outline: 3px solid red"]');
    const root = highlighted ? highlighted.parentElement || document.body : document.body;
    const elements = [];
    const interactiveSelectors = 'button, a, input, select, textarea, [role="button"], [role="link"], [role="checkbox"], [role="tab"], [role="menuitem"], [data-testid], img[alt]';
    const candidates = root.querySelectorAll(interactiveSelectors);
    const seen = new Set();
    const collect = (el) => {
      if (seen.has(el) || elements.length >= 15) return;
      seen.add(el);
      elements.push({
        ariaLabel: el.getAttribute('aria-label') || '',
        classes: el.className || '',
        id: el.id || '',
        role: el.getAttribute('role') || '',
        tag: el.tagName.toLowerCase(),
        testId: el.getAttribute('data-testid') || '',
        text: (el.textContent || '').trim().substring(0, 80),
      });
    };
    if (highlighted) collect(highlighted);
    candidates.forEach(el => collect(el));
    return JSON.stringify({ elements, found: elements.length });
  } catch (e) { return JSON.stringify({ elements: [], error: e.message, found: 0 }); }
})()`;
  }

  /**
   * Build a highlight script for a CSS selector or Playwright locator expression.
   * Used by the CLI-backed navigate-to-failure flow.
   */
  private buildHighlightScript(selector: string): string {
    const isPlaywrightLocator = /^(?:getBy\w+|locator)\s*\(/.test(selector);

    if (isPlaywrightLocator) {
      return `(async () => {
  try {
    const locatorStr = ${JSON.stringify(selector)};
    let element = null;
    const roleMatch = locatorStr.match(/getByRole\\(['"]([^'"]+)['"](?:,\\s*\\{\\s*name:\\s*['"]([^'"]+)['"])?/);
    if (roleMatch) {
      const role = roleMatch[1]; const name = roleMatch[2];
      const els = document.querySelectorAll('[role="'+role+'"], '+role);
      for (const el of els) {
        const text = el.textContent?.trim() || el.getAttribute('aria-label') || '';
        if (name ? text.includes(name) : true) { element = el; break; }
      }
    }
    if (!element) {
      const textMatch = locatorStr.match(/getByText\\(['"]([^'"]+)['"]\\)/);
      if (textMatch) { const xpath = "//*[contains(text(), '"+textMatch[1]+"')]"; const r = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null); element = r.singleNodeValue; }
    }
    if (!element) {
      const tidMatch = locatorStr.match(/getByTestId\\(['"]([^'"]+)['"]\\)/);
      if (tidMatch) element = document.querySelector('[data-testid="'+tidMatch[1]+'"]');
    }
    if (!element) {
      const cssMatch = locatorStr.match(/locator\\(['"]([^'"]+)['"]\\)/);
      if (cssMatch) element = document.querySelector(cssMatch[1]);
    }
    if (element) {
      element.style.outline = '3px solid red'; element.style.outlineOffset = '2px';
      element.style.boxShadow = '0 0 10px rgba(255,0,0,0.5)';
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return JSON.stringify({ found: true, tag: element.tagName, text: element.textContent?.substring(0,100) });
    }
    return JSON.stringify({ found: false });
  } catch (e) { return JSON.stringify({ error: e.message, found: false }); }
})()`;
    }

    // Standard CSS selector
    return `(() => {
  try {
    const el = document.querySelector('${selector.replace(/'/g, "\\'")}');
    if (el) {
      el.style.outline = '3px solid red'; el.style.outlineOffset = '2px';
      el.style.boxShadow = '0 0 10px rgba(255,0,0,0.5)';
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return JSON.stringify({ found: true, tag: el.tagName, text: el.textContent?.substring(0,100) });
    }
    return JSON.stringify({ found: false });
  } catch (e) { return JSON.stringify({ error: e.message, found: false }); }
})()`;
  }

  /**
   * Build a selector validation script that tests multiple selectors against the
   * live DOM in a single eval call. Used by both MCP and CLI paths.
   */
  private buildSelectorValidationScript(selectors: string[]): string {
    return `(() => {
  const selectors = ${JSON.stringify(selectors)};
  const results = [];
  for (const sel of selectors) {
    try {
      let count = 0; let tag = '';
      if (sel.startsWith('[') || sel.startsWith('#') || sel.startsWith('.') || /^[a-z]+[.#\\\\[]/.test(sel) || /^[a-z]+$/.test(sel)) {
        const els = document.querySelectorAll(sel); count = els.length;
        if (els.length > 0) tag = els[0].tagName.toLowerCase();
      } else if (sel.startsWith('text=')) {
        const textVal = sel.replace(/^text=["']?/, '').replace(/["']?$/, '');
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) { if (walker.currentNode.textContent?.includes(textVal)) { count++; if (!tag && walker.currentNode.parentElement) tag = walker.currentNode.parentElement.tagName.toLowerCase(); } }
      } else if (sel.startsWith("getByTestId(")) {
        const id = sel.match(/getByTestId\\\\(['"](.+?)['"]\\\\)/);
        if (id) { const els = document.querySelectorAll('[data-testid="'+id[1]+'"]'); count = els.length; if (els.length > 0) tag = els[0].tagName.toLowerCase(); }
      } else if (sel.startsWith("getByRole(")) {
        const match = sel.match(/getByRole\\\\(['"](.+?)['"](?:,\\\\s*\\\\{\\\\s*name:\\\\s*['"](.+?)['"])?/);
        if (match) {
          const role = match[1]; const name = match[2];
          const els = document.querySelectorAll('[role="'+role+'"]');
          for (const el of els) { if (!name || (el.textContent?.trim().includes(name)) || el.getAttribute('aria-label')===name) { count++; if (!tag) tag = el.tagName.toLowerCase(); } }
          if (count === 0 && role === 'button') { const btns = document.querySelectorAll('button'); for (const el of btns) { if (!name || el.textContent?.trim().includes(name)) { count++; if (!tag) tag = 'button'; } } }
          if (count === 0 && role === 'link') { const links = document.querySelectorAll('a'); for (const el of links) { if (!name || el.textContent?.trim().includes(name)) { count++; if (!tag) tag = 'a'; } } }
        }
      } else if (sel.startsWith("getByText(") || sel.startsWith("getByLabel(")) {
        const match = sel.match(/getBy(?:Text|Label)\\\\(['"](.+?)['"]\\\\)/);
        if (match) {
          const text = match[1];
          if (sel.startsWith("getByLabel(")) { const labels = document.querySelectorAll('label'); for (const label of labels) { if (label.textContent?.trim().includes(text)) { count++; if (!tag) tag = 'label'; } } }
          else { const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); while (walker.nextNode()) { if (walker.currentNode.textContent?.includes(text)) { count++; if (!tag && walker.currentNode.parentElement) tag = walker.currentNode.parentElement.tagName.toLowerCase(); } } }
        }
      }
      results.push({ count, selector: sel, status: count > 0 ? 'pass' : 'fail', tag: tag || undefined });
    } catch (e) { results.push({ count: 0, selector: sel, status: 'fail', tag: undefined }); }
  }
  return JSON.stringify(results);
})()`;
  }

  /**
   * Call an MCP tool via HTTP.
   * Transparently maps legacy playwright_* names to the actual browser_* names
   * expected by the @playwright/mcp server and translates argument keys.
   */
  private async callMCPTool(toolName: string, args: Record<string, any>): Promise<MCPResponse> {
    const mappedName = MCPService.TOOL_NAME_MAP[toolName] || toolName;
    const mappedArgs = { ...args };

    // browser_evaluate expects `function` not `expression`
    if (mappedName === 'browser_evaluate' && mappedArgs.expression !== undefined) {
      let fn: string = mappedArgs.expression;
      // Convert IIFE `(async () => { ... })()` or `(() => { ... })()` to plain arrow fn
      fn = fn.trim();
      const iifeMatch = fn.match(
        /^\(?(async\s+)?\(\s*\)\s*=>\s*\{([\s\S]*)\}\)?(?:\(\))?;?\s*$/,
      );
      if (iifeMatch) {
        const asyncPrefix = iifeMatch[1] ? 'async ' : '';
        fn = `${asyncPrefix}() => {${iifeMatch[2]}}`;
      }
      mappedArgs.function = fn;
      delete mappedArgs.expression;
    }

    // browser_click / browser_hover expect `ref` + `element`, not `selector`
    if ((mappedName === 'browser_click' || mappedName === 'browser_hover') && mappedArgs.selector && !mappedArgs.ref) {
      mappedArgs.element = mappedArgs.selector;
      mappedArgs.ref = mappedArgs.selector;
      delete mappedArgs.selector;
    }

    // browser_type expects `ref` + `text`, not `selector` + `text`
    if (mappedName === 'browser_type' && mappedArgs.selector && !mappedArgs.ref) {
      mappedArgs.element = mappedArgs.selector;
      mappedArgs.ref = mappedArgs.selector;
      delete mappedArgs.selector;
    }

    console.log(`[MCPService] callMCPTool: ${toolName} → ${mappedName}`, Object.keys(mappedArgs));
    return await this.mcpClient.callTool(mappedName, mappedArgs);
  }

  /**
   * Emit a navigation progress step via WebSocket and console log.
   * When `testResultId` is provided it is included in the broadcast payload so
   * the frontend can route the update to the correct per-test card.
   */
  private emitNavProgress(step: string, status: NavigationProgressStep['status'], detail?: string, testResultId?: string): void {
    const payload: NavigationProgressStep & { testResultId?: string; type: string } = {
      detail,
      status,
      step,
      testResultId,
      timestamp: new Date().toISOString(),
      type: 'nav-progress',
    };
    console.log(`[MCPService] nav-progress: [${status}] ${step}${detail ? ` — ${detail}` : ''}${testResultId ? ` (testResultId=${testResultId})` : ''}`);
    if (this.broadcastFn) {
      this.broadcastFn(payload);
    }
  }

  /**
   * Verify the current browser URL after navigation.
   * Returns an outcome classification:
   *   - 'correct'       — current URL matches expected URL
   *   - 'wrong-page'    — landed on a different in-app page (not auth-related)
   *   - 'auth-redirect' — redirected to login / staging-setup
   *   - 'not-loaded'    — URL is blank or about:blank
   */
  private async verifyCurrentUrl(expectedUrl: string): Promise<{
    currentUrl: string;
    outcome: 'auth-redirect' | 'correct' | 'not-loaded' | 'wrong-page';
  }> {
    try {
      const evalResult = await this.callMCPTool('playwright_evaluate', {
        expression: 'window.location.href',
      });
      const currentUrl = evalResult.content?.[0]?.text?.trim() ?? '';
      if (!currentUrl || currentUrl === 'about:blank' || currentUrl === 'about:newtab') {
        return { currentUrl, outcome: 'not-loaded' };
      }
      const authPaths = ['/staging-setup', '/login', '/auth', '/sign-in', '/signin'];
      if (authPaths.some(p => currentUrl.includes(p))) {
        return { currentUrl, outcome: 'auth-redirect' };
      }
      // Compare ignoring trailing slash
      const normalize = (u: string) => u.replace(/\/$/, '');
      if (normalize(currentUrl) === normalize(expectedUrl)) {
        return { currentUrl, outcome: 'correct' };
      }
      // Same origin but different path → wrong-page (still useful, take screenshot)
      return { currentUrl, outcome: 'wrong-page' };
    } catch {
      return { currentUrl: '', outcome: 'not-loaded' };
    }
  }

  /** Escape special regex characters in a string */
  private escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * Extract "aka" suggested selectors from Playwright strict mode violation errors.
   * These are the alternative locators Playwright suggests when a selector matches multiple elements.
   */
  private extractAkaSuggestions(error: string): string[] {
    if (!error) return [];

    // Strip ANSI escape codes
    const clean = error.replace(/\x1b\[[0-9;]*m/g, '');
    const suggestions: string[] = [];

    // Pattern: "aka getByRole('button', { name: 'Save', exact: true })"
    const akaPattern = /aka\s+((?:getBy\w+|locator)\s*\([^)]*(?:\([^)]*\))?[^)]*\))/g;
    let match;
    while ((match = akaPattern.exec(clean)) !== null) {
      suggestions.push(match[1].trim());
    }

    return [...new Set(suggestions)];
  }

  /**
   * Extract the in-app page path a test navigates to before the failure occurs.
   * Uses multiple strategies in priority order:
   *   0. Qase test case steps (highest confidence — human-readable navigation actions)
   *   1. Direct `page.goto('/path')` calls from the test spec file
   *   2. Page-object `navigateTo*Page()` calls (mapped via NAV_METHOD_TO_PATH)
   *   3. Directory structure heuristics from the test file path
   * Returns the first navigation path found, or null if no signal is available.
   */
  private async extractDeepNavigationPath(testResultId: string, baseUrl: string): Promise<null | string> {
    try {
      const prisma = DatabaseService.getInstance().getClient();
      const testResult = await prisma.testResult.findUnique({
        where: { id: testResultId },
      });
      if (!testResult?.file) return null;

      // --- Strategy 0: Parse Qase test case steps from analysisData ---
      //     Qase steps like "Navigate to Journeys page" are the most reliable
      //     signal because they are human-authored and describe the intended flow.
      try {
        const mcpAnalyses = await this.mcpAnalysisRepository.getByTestResult(testResultId);
        if (mcpAnalyses.length > 0) {
          const analysis = mcpAnalyses[0];
          if (analysis.analysisData) {
            const analysisData = typeof analysis.analysisData === 'string'
              ? JSON.parse(analysis.analysisData)
              : analysis.analysisData;

            const qaseSteps: { action: string; expected_result?: string }[] =
              analysisData?.qaseTestCase?.steps || [];

            if (qaseSteps.length > 0) {
              // Scan steps for navigation keywords, taking the LAST navigation step
              // (tests often navigate to dashboard first, then to target page)
              let lastNavPath: null | string = null;
              for (const step of qaseSteps) {
                const action = step.action || '';
                for (const mapping of MCPService.QASE_STEP_TO_PATH) {
                  if (mapping.keywords.test(action)) {
                    lastNavPath = mapping.path;
                    break; // found match for this step, continue to next step
                  }
                }
              }
              if (lastNavPath) {
                console.log(`[MCPService] Extracted deep path from Qase steps: ${lastNavPath}`);
                return lastNavPath;
              }
            }
          }
        }
      } catch (qaseError: any) {
        console.warn(`[MCPService] Qase step parsing failed (non-fatal): ${qaseError.message}`);
      }

      // Resolve the test file — search in common locations
      const projectRoot = join(__dirname, '../../../../');
      const possiblePaths = [
        join(projectRoot, 'apps/accessFlow/tests', testResult.file),
        join(projectRoot, 'apps/accessFlow/tests', '**', testResult.file),
      ];

      // Also try to find it recursively
      let testFileContent: null | string = null;
      for (const candidate of possiblePaths) {
        if (existsSync(candidate)) {
          testFileContent = readFileSync(candidate, 'utf-8');
          break;
        }
      }

      // If direct path didn't work, try a recursive search
      if (!testFileContent) {
        const { execSync } = await import('child_process');
        try {
          const found = execSync(
            `find "${join(projectRoot, 'apps')}" -name "${testResult.file}" -type f 2>/dev/null | head -1`,
            { encoding: 'utf-8' },
          ).trim();
          if (found && existsSync(found)) {
            testFileContent = readFileSync(found, 'utf-8');
          }
        } catch {
          // find command failed — skip
        }
      }

      if (!testFileContent) {
        console.log(`[MCPService] Could not find test file: ${testResult.file}`);
        return null;
      }

      // Strategy 1: Look for direct page.goto('/path') calls
      const gotoMatches = testFileContent.match(/page\.goto\s*\(\s*['"`]([^'"`]+)['"`]\s*\)/g);
      if (gotoMatches) {
        for (const match of gotoMatches) {
          const pathMatch = match.match(/page\.goto\s*\(\s*['"`]([^'"`]+)['"`]\s*\)/);
          if (pathMatch?.[1]) {
            const path = pathMatch[1];
            // Only use relative paths or paths that start with /
            if (path.startsWith('/')) {
              console.log(`[MCPService] Extracted deep path from page.goto: ${path}`);
              return path;
            }
          }
        }
      }

      // Strategy 2: Look for navigateTo*Page() calls and map them
      for (const [methodName, path] of Object.entries(MCPService.NAV_METHOD_TO_PATH)) {
        if (testFileContent.includes(methodName)) {
          console.log(`[MCPService] Extracted deep path from ${methodName}: ${path}`);
          return path;
        }
      }

      // Strategy 3: Infer from test file directory structure
      //   tests/Journeys/... → /journeys
      //   tests/Onboarding/... → depends on specific test
      const filePath = testResult.file.toLowerCase();
      if (filePath.includes('journeys') || filePath.includes('journey')) {
        return '/journeys';
      }
      if (filePath.includes('audit') || filePath.includes('pages')) {
        return '/pages';
      }
      if (filePath.includes('explore')) {
        return '/explore';
      }
      if (filePath.includes('settings') || filePath.includes('site-settings')) {
        return '/settings/site-settings';
      }

      return null;
    } catch (error: any) {
      console.warn(`[MCPService] extractDeepNavigationPath error: ${error.message}`);
      return null;
    }
  }

  /**
   * Extract the primary failing locator from a Playwright error message.
   * Returns the full Playwright locator expression (e.g. "getByRole('button', { name: 'Save' })").
   */
  private extractPrimaryLocatorFromError(error: string): null | string {
    if (!error) return null;

    // Strip ANSI escape codes for clean matching
    const clean = error.replace(/\x1b\[[0-9;]*m/g, '');

    // Pattern 1: "Locator: getByRole('button', { name: 'Save' })" — Playwright error format
    const locatorLineMatch = clean.match(/Locator:\s*((?:getBy\w+|locator)\s*\([^)]*(?:\([^)]*\))?[^)]*\))/);
    if (locatorLineMatch) {
      return locatorLineMatch[1].trim();
    }

    // Pattern 2: "waiting for getByRole('button', { name: 'Save' })" — call log format
    const waitingMatch = clean.match(/waiting for\s+((?:getBy\w+|locator)\s*\([^)]*(?:\([^)]*\))?[^)]*\))/);
    if (waitingMatch) {
      return waitingMatch[1].trim();
    }

    // Pattern 3: standalone locator('css-selector') format
    const cssLocatorMatch = clean.match(/locator\(\s*['"]([^'"]+)['"]\s*\)/);
    if (cssLocatorMatch) {
      return `locator('${cssLocatorMatch[1]}')`;
    }

    return null;
  }

  /**
   * Extract a ref from a Playwright MCP snapshot by searching for an element name.
   *
   * The Playwright MCP `browser_snapshot` returns a compact format like:
   *   - textbox "User Email" [ref=e16]:
   *   - button "Upsert Domain and User" [ref=e36]:
   *   - text: standard
   *
   * This parser handles both:
   *   1. Inline format: `role "name" [ref=refId]`
   *   2. YAML-like format: `name: X` / `ref: Y` on separate lines (Cursor IDE browser)
   */
  private extractRefByNameFromSnapshot(snapshotText: string, elementName: string): null | string {
    // Strategy 1: Inline Playwright MCP format — `"elementName" [ref=refId]`
    // Match: textbox "User Email" [ref=e16]  OR  button "Upsert Domain and User" [ref=e36]
    const inlinePattern = new RegExp(`"${this.escapeRegex(elementName)}"\\s*\\[ref=(\\w+)\\]`, 'i');
    const inlineMatch = snapshotText.match(inlinePattern);
    if (inlineMatch) return inlineMatch[1];

    // Strategy 2: Text content match — `text: elementName` near a `[ref=refId]`
    // For elements like "standard" text or plain text nodes
    const lines = snapshotText.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.includes(`text: ${elementName}`) || line.includes(`text:${elementName}`)) {
        // Look for [ref=...] on the same line or parent line
        const refOnLine = line.match(/\[ref=(\w+)\]/);
        if (refOnLine) return refOnLine[1];
        // Check parent lines (up to 3 above)
        for (let j = Math.max(0, i - 3); j < i; j++) {
          const parentRef = lines[j].match(/\[ref=(\w+)\]/);
          if (parentRef) return parentRef[1];
        }
      }
    }

    // Strategy 3: Cursor IDE YAML-like format — `name: elementName` / `ref: refId`
    for (let i = 0; i < lines.length; i++) {
      const trimmed = lines[i].trim();
      if (trimmed === `name: ${elementName}` || trimmed === `name: "${elementName}"`) {
        for (let j = Math.max(0, i - 5); j < Math.min(lines.length, i + 5); j++) {
          const refMatch = lines[j].trim().match(/^ref:\s*(\S+)/);
          if (refMatch) return refMatch[1];
        }
      }
    }

    return null;
  }

  /**
   * Extract a ref from a snapshot by searching for an element with a specific role AND name.
   * Handles both Playwright MCP inline format and Cursor IDE YAML format.
   */
  private extractRefByRoleAndName(snapshotText: string, role: string, name: string): null | string {
    // Strategy 1: Inline format — `role "name" [ref=refId]`
    // e.g., `link "Login" [ref=e42]` or `button "Close" [ref=e10]`
    const inlinePattern = new RegExp(
      `${this.escapeRegex(role)}\\s+"${this.escapeRegex(name)}"\\s*\\[ref=(\\w+)\\]`,
      'i',
    );
    const inlineMatch = snapshotText.match(inlinePattern);
    if (inlineMatch) return inlineMatch[1];

    // Strategy 2: YAML-like format
    const lines = snapshotText.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const trimmed = lines[i].trim();
      if (trimmed === `role: ${role}` || trimmed === `role: "${role}"`) {
        let foundName = false;
        let ref: null | string = null;
        for (let j = i; j < Math.min(lines.length, i + 8); j++) {
          const t = lines[j].trim();
          if (t === `name: ${name}` || t === `name: "${name}"`) foundName = true;
          const refMatch = t.match(/^ref:\s*(\S+)/);
          if (refMatch) ref = refMatch[1];
          if (j > i && t.startsWith('- role:')) break;
        }
        if (foundName && ref) return ref;
      }
    }

    return null;
  }

  /**
   * Extract selector from error message or test steps.
   * Returns { primary, suggestions } with the failing locator and any alternatives.
   */
  private extractSelectorsFromFailure(failure: any): { primary: null | string; suggestions: string[] } {
    const suggestions: string[] = [];
    let primary: null | string = null;

    // Extract from error message
    if (failure.error) {
      // Get the primary failing locator
      primary = this.extractPrimaryLocatorFromError(failure.error);

      // Get "aka" suggestions from strict mode violation errors
      const akaSuggestions = this.extractAkaSuggestions(failure.error);
      suggestions.push(...akaSuggestions);

      // Also extract any explicit { exact: true } variants
      const cleanError = failure.error.replace(/\x1b\[[0-9;]*m/g, '');

      // Pattern: getByRole('role', { name: 'text', exact: true })
      const exactPattern = /getBy\w+\([^)]*exact:\s*true[^)]*\)/g;
      let exactMatch;
      while ((exactMatch = exactPattern.exec(cleanError)) !== null) {
        const suggestion = exactMatch[0].trim();
        if (!suggestions.includes(suggestion)) {
          suggestions.push(suggestion);
        }
      }
    }

    // Extract from test steps — look for full Playwright locator calls
    if (failure.steps) {
      for (const step of failure.steps) {
        if (step.title) {
          const stepLocator = this.extractPrimaryLocatorFromError(step.title);
          if (stepLocator && !suggestions.includes(stepLocator)) {
            suggestions.push(stepLocator);
          }
        }
      }
    }

    return { primary, suggestions: [...new Set(suggestions)] };
  }

  /**
   * Extract potential selectors from Qase test case steps
   */
  private extractSelectorsFromQaseSteps(steps: { action: string; expected_result: string }[]): string[] {
    const selectors: string[] = [];

    for (const step of steps) {
      const action = step.action.toLowerCase();
      const expected = step.expected_result.toLowerCase();

      // Look for common patterns in test steps
      // Pattern: "click on [element]" or "click [element]"
      const clickMatch = action.match(/click\s+(?:on\s+)?(?:the\s+)?([a-z\s-]+)/);
      if (clickMatch) {
        const elementName = clickMatch[1].trim();
        // Try to create a selector from the element name
        if (elementName.includes('button')) {
          selectors.push('button');
        }
        if (elementName.includes('link')) {
          selectors.push('a');
        }
        if (elementName.includes('input') || elementName.includes('field')) {
          selectors.push('input');
        }
      }

      // Pattern: "verify [element] is visible"
      const verifyMatch = action.match(/verify\s+(?:that\s+)?([a-z\s-]+)/);
      if (verifyMatch) {
        const elementName = verifyMatch[1].trim();
        if (elementName.includes('modal')) {
          selectors.push('[role="dialog"]');
        }
      }
    }

    return [...new Set(selectors)]; // Remove duplicates
  }

  /**
   * Fallback analysis when MCP is not available
   */
  private fallbackAnalysis(selector: string, testName?: string): ElementAnalysis {
    return {
      confidence: 0.3,
      elementInfo: {
        attributes: {},
        position: { height: 0, width: 0, x: 0, y: 0 },
        tag: 'unknown',
      },
      selector,
      suggestedSelectors: this.generateBasicSelectors(selector),
      testName,
    };
  }

  /**
   * Generate basic selector suggestions from a failing selector
   */
  private generateBasicSelectors(selector: string): string[] {
    const suggestions: string[] = [];

    // If selector has quotes, try without them
    if (selector.includes('"') || selector.includes("'")) {
      const cleanSelector = selector.replace(/['"]/g, '');
      if (cleanSelector !== selector) {
        suggestions.push(cleanSelector);
      }
    }

    // Extract text from text= selector
    const textMatch = selector.match(/text=["']([^"']+)["']/);
    if (textMatch) {
      suggestions.push(`text="${textMatch[1]}"`);
      suggestions.push(`text=/.*${textMatch[1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}.*/i`);
    }

    // Extract role from role= selector
    const roleMatch = selector.match(/role=["']([^"']+)["']/);
    if (roleMatch) {
      suggestions.push(`[role="${roleMatch[1]}"]`);
    }

    // Do NOT add generic bare tag names or bare attributes — they are useless suggestions
    // that match hundreds of elements and provide no diagnostic value.

    return [...new Set(suggestions)].filter((s) => s.length > 0);
  }

  /**
   * Generate selector suggestions from element data
   */
  private generateSelectorsFromElement(element: any): string[] {
    const selectors: string[] = [];

    if (element.testId) {
      selectors.push(`[data-testid="${element.testId}"]`);
    }

    if (element.id) {
      selectors.push(`#${element.id}`);
    }

    if (element.text && element.text.length < 50) {
      selectors.push(`text="${element.text}"`);
      selectors.push(`text=/.*${element.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}.*/i`);
    }

    if (element.role) {
      selectors.push(`[role="${element.role}"]`);
    }

    if (element.classes) {
      const firstClass = element.classes.split(/\s+/)[0];
      if (firstClass) {
        selectors.push(`${element.tag}.${firstClass}`);
      }
    }

    // Do NOT push bare element.tag — a tag without any qualifier (e.g. "button", "a")
    // is always ambiguous and adds no diagnostic value.

    return selectors.filter((s) => s.length > 0);
  }

  /**
   * Extract auth-setup parameters from a test result's playwrightData annotations.
   * Falls back to PREFILLED_SETUP_PARAMS defaults if no annotation is found.
   *
   * @returns StagingSetupParams or null if test result not found
   */
  private async getAuthSetupParams(testResultId: string): Promise<null | StagingSetupParams> {
    try {
      const testResult = await this.testResultRepository.findById(testResultId);
      if (!testResult) {
        console.warn(`[MCPService] Test result ${testResultId} not found, using default auth params`);
        return PREFILLED_SETUP_PARAMS;
      }

      // Parse playwrightData to find auth-setup annotation
      if (testResult.playwrightData) {
        try {
          const playwrightData = typeof testResult.playwrightData === 'string'
            ? JSON.parse(testResult.playwrightData)
            : testResult.playwrightData;

          // Annotations are stored in playwrightData.annotations
          const annotations = playwrightData.annotations || [];
          const authAnnotation = annotations.find(
            (a: { description?: string; type: string }) => a.type === 'auth-setup',
          );

          if (authAnnotation?.description) {
            const parsed = JSON.parse(authAnnotation.description);
            console.log(`[MCPService] Found auth-setup annotation: fixture=${parsed.fixture} domain=${parsed.domain}`);
            return {
              domain: parsed.domain,
              email: parsed.email,
              fixture: parsed.fixture,
              pageCount: parsed.pageCount ?? 5,
              plan: parsed.plan ?? 'standard',
            };
          }
        } catch (parseError: any) {
          console.warn('[MCPService] Failed to parse playwrightData:', parseError.message);
        }
      }

      // Fallback: no annotation found, use prefilled defaults
      console.log('[MCPService] No auth-setup annotation found, using prefilled defaults');
      return PREFILLED_SETUP_PARAMS;
    } catch (error: any) {
      console.error('[MCPService] getAuthSetupParams error:', error.message);
      return PREFILLED_SETUP_PARAMS;
    }
  }

  /**
   * CLI-backed implementation of navigateToFailurePoint.
   *
   * Uses `PlaywrightCLIExecutor` subprocess calls instead of the MCP SSE client.
   * The response shape, WebSocket progress events, Qase step enrichment, and
   * selector validation logic are identical to the MCP-backed version.
   */
  private async navigateToFailurePointCLI(
    url: string,
    selector?: string,
    highlight = true,
    testResultId?: string,
    suggestedSelectors?: string[],
  ): Promise<{
    error?: string;
    playwrightSteps?: { duration?: number; error?: string; status: string; step_number: number; title: string }[];
    qaseSteps?: { action: string; expected_result?: string; step_number: number }[];
    refreshedSelectors?: string[];
    reportScreenshotUrl?: string;
    screenshot?: string;
    steps?: NavigationProgressStep[];
    success: boolean;
    validatedSelectors?: { count: number; selector: string; status: 'fail' | 'pass'; tag?: string }[];
  }> {
    const steps: NavigationProgressStep[] = [];
    const emit = (step: string, status: NavigationProgressStep['status'], detail?: string) => {
      this.emitNavProgress(step, status, detail);
      steps.push({ detail, status, step, timestamp: new Date().toISOString() });
    };

    const sessionName = `failure-${testResultId || Date.now()}`;
    const cli = new PlaywrightCLIExecutor({
      cwd: this.testE2eDir,
      sessionName,
    });

    try {
      // ── Phase 1: Open browser + authenticate ─────────────────────────────
      emit('Opening browser session', 'running', `session=${sessionName}`);

      const needsAuth = MCPService.needsHttpAuth(url);
      const stagingSetupUrl = needsAuth
        ? `${new URL(url).origin}/staging-setup`
        : undefined;

      // Open with config (supplies httpCredentials for acsb-test.com)
      const openResult = await cli.open(stagingSetupUrl || undefined, true);
      if (!openResult.ok) {
        emit('Opening browser session', 'error', openResult.error || 'Failed to open browser');
        return { error: openResult.error, steps, success: false };
      }
      emit('Opening browser session', 'done', 'Browser ready');

      // Try to load saved auth state for fast path
      let authSucceeded = false;
      const authStatePath = join(this.testE2eDir, 'auth-state.json');

      if (testResultId && needsAuth) {
        emit('Authenticating', 'running', 'Attempting saved auth state');

        if (existsSync(authStatePath)) {
          const loadResult = await cli.stateLoad(authStatePath);
          if (loadResult.ok) {
            // Verify the state is still valid by navigating to the target
            const verifyResult = await cli.goto(url);
            if (verifyResult.ok && verifyResult.pageUrl && !verifyResult.pageUrl.includes('/staging-setup')) {
              emit('Authenticating', 'done', 'Restored saved session');
              authSucceeded = true;
            } else {
              emit('Authenticating', 'running', 'Saved state expired — replaying staging-setup');
            }
          }
        }

        // Fallback: replay staging-setup flow
        if (!authSucceeded) {
          authSucceeded = await this.authenticateViaStagingSetupCLI(cli, url, testResultId, emit);
          if (authSucceeded) {
            emit('Authentication complete', 'done', 'Session established via staging-setup');
            // Persist for future use
            await cli.stateSave(authStatePath);
          } else {
            emit('Authentication complete', 'error', 'Staging setup failed — proceeding without auth');
          }
        }
      }

      // ── Phase 2: Navigate to failure URL ─────────────────────────────────
      if (!authSucceeded || !MCPService.needsHttpAuth(url)) {
        // Direct navigation (no auth needed or auth already handled)
        emit('Navigating to failure URL', 'running', url);
        const gotoResult = await cli.goto(url);
        if (!gotoResult.ok) {
          emit('Navigating to failure URL', 'error', gotoResult.error || 'Navigation failed');
          return { error: gotoResult.error, steps, success: false };
        }
        emit('Navigating to failure URL', 'done', 'Page loaded');
      } else {
        // Auth succeeded — navigate to the actual failure URL (may differ from staging-setup origin)
        emit('Navigating to failure URL', 'running', url);
        const gotoResult = await cli.goto(url);
        if (!gotoResult.ok) {
          emit('Navigating to failure URL', 'error', gotoResult.error || 'Navigation failed');
          return { error: gotoResult.error, steps, success: false };
        }
        emit('Navigating to failure URL', 'done', 'Page loaded');
      }

      // ── Phase 3: Deep navigation ────────────────────────────────────────
      if (testResultId) {
        try {
          const deepPath = await this.extractDeepNavigationPath(testResultId, url);
          if (deepPath) {
            const parsedBase = new URL(url);
            const deepUrl = `${parsedBase.origin}${deepPath.startsWith('/') ? '' : '/'}${deepPath}`;
            if (deepUrl !== url && deepUrl !== `${parsedBase.origin}/` && deepUrl !== parsedBase.origin) {
              emit('Navigating to failure page', 'running', `Deep navigation to ${deepPath}`);
              const deepResult = await cli.goto(deepUrl);
              if (deepResult.ok) {
                emit('Navigating to failure page', 'done', `Landed on ${deepPath}`);
                // Wait for page to stabilize
                await new Promise(resolve => setTimeout(resolve, 2000));
              } else {
                emit('Navigating to failure page', 'error', `Failed to reach ${deepPath}, staying on current page`);
              }
            }
          }
        } catch (deepNavError: any) {
          console.warn('[MCPService/CLI] Deep navigation extraction failed:', deepNavError.message);
        }
      }

      // ── Phase 4: Extract Qase + Playwright test steps (DB only, no browser) ──
      let qaseSteps: undefined | { action: string; expected_result?: string; step_number: number }[];
      if (testResultId) {
        try {
          const mcpAnalyses = await this.mcpAnalysisRepository.getByTestResult(testResultId);
          if (mcpAnalyses.length > 0 && mcpAnalyses[0].analysisData) {
            const analysisData = typeof mcpAnalyses[0].analysisData === 'string'
              ? JSON.parse(mcpAnalyses[0].analysisData)
              : mcpAnalyses[0].analysisData;

            const rawSteps: { action: string; expected_result?: string }[] =
              analysisData?.qaseTestCase?.steps || [];

            if (rawSteps.length > 0) {
              qaseSteps = rawSteps.map((step, idx) => ({
                action: step.action,
                expected_result: step.expected_result || undefined,
                step_number: idx + 1,
              }));
            }
          }
        } catch (qaseStepsError: any) {
          console.warn('[MCPService/CLI] Failed to extract Qase steps:', qaseStepsError.message);
        }
      }

      let playwrightSteps: undefined | { duration?: number; error?: string; status: string; step_number: number; title: string }[];
      if (testResultId) {
        try {
          const testResultWithSteps = await this.testResultRepository.findById(testResultId);
          if (testResultWithSteps?.steps && testResultWithSteps.steps.length > 0) {
            playwrightSteps = testResultWithSteps.steps.map((step: any) => ({
              duration: step.duration ?? undefined,
              error: step.error ?? undefined,
              status: step.status || (step.error ? 'failed' : 'passed'),
              step_number: step.order ?? 0,
              title: step.title,
            }));
          }
        } catch (pwStepsError: any) {
          console.warn('[MCPService/CLI] Failed to extract Playwright steps:', pwStepsError.message);
        }
      }

      // ── Phase 5: Highlight element + screenshot ──────────────────────────
      if (selector && selector !== 'unknown' && highlight) {
        emit('Highlighting failing element', 'running', selector);
        try {
          const highlightScript = this.buildHighlightScript(selector);
          const evalResult = await cli.evaluate(highlightScript);
          if (evalResult.ok) {
            emit('Highlighting failing element', 'done', 'Element highlight applied');
          } else {
            emit('Highlighting failing element', 'error', evalResult.error || 'Eval failed');
          }

          // Take screenshot
          emit('Taking screenshot', 'running');
          const screenshotFilename = `failure-${Date.now()}.png`;
          const screenshotResult = await cli.screenshot(`mcp/mcp-output/${screenshotFilename}`);
          let screenshotUrl: string | undefined;
          if (screenshotResult.ok && screenshotResult.screenshotPath) {
            screenshotUrl = `/mcp-output/${screenshotFilename}`;
            emit('Taking screenshot', 'done', `Screenshot saved: ${screenshotFilename}`);
          } else {
            emit('Taking screenshot', 'done', 'Screenshot captured (may not have saved)');
          }

          // Report screenshot from DB
          let reportScreenshotUrl: string | undefined;
          if (testResultId) {
            try {
              const prisma = DatabaseService.getInstance().getClient();
              const { TestArtifactRepository } = await import('../repositories/TestArtifactRepository');
              const artifactRepo = new TestArtifactRepository(prisma);
              const artifacts = await artifactRepo.findByTestResult(testResultId);
              const screenshotArtifact = artifacts.find(a => a.type === 'screenshot');
              if (screenshotArtifact) {
                reportScreenshotUrl = `/api/artifacts/file/${screenshotArtifact.id}`;
                emit('Report screenshot found', 'done', `Artifact: ${screenshotArtifact.filename}`);
              }
            } catch (dbError: any) {
              console.warn('[MCPService/CLI] Could not look up report screenshot:', dbError.message);
            }
          }

          // ── Phase 6: Refresh selectors from live DOM ─────────────────────
          let refreshedSelectors: string[] = [];
          try {
            emit('Refreshing selectors from live DOM', 'running');
            const domAnalysisScript = this.buildDOMAnalysisScript();
            const domResult = await cli.evaluate(domAnalysisScript);
            const domText = domResult.rawText || '';

            // Extract JSON from the eval result
            let domData: { elements: any[]; found: number } = { elements: [], found: 0 };
            try {
              const jsonMatch = domText.match(/\{[\s\S]*"elements"[\s\S]*\}/);
              if (jsonMatch) domData = JSON.parse(jsonMatch[0]);
            } catch {
              // parse failed
            }

            if (domData.elements && domData.elements.length > 0) {
              const selectorSet = new Set<string>();
              for (const el of domData.elements) {
                const generated = this.generateSelectorsFromElement(el);
                generated.forEach(s => selectorSet.add(s));
              }
              for (const el of domData.elements) {
                if (el.testId) selectorSet.add(`getByTestId('${el.testId}')`);
                if (el.role && el.text && el.text.length < 50) {
                  selectorSet.add(`getByRole('${el.role}', { name: '${el.text.replace(/'/g, "\\'")}' })`);
                }
                if (el.ariaLabel) selectorSet.add(`getByLabel('${el.ariaLabel.replace(/'/g, "\\'")}')`);
                if (el.text && el.text.length > 0 && el.text.length < 40) {
                  selectorSet.add(`getByText('${el.text.replace(/'/g, "\\'")}')`);
                }
              }
              refreshedSelectors = Array.from(selectorSet).slice(0, 10);
              emit('Refreshing selectors from live DOM', 'done',
                `Found ${refreshedSelectors.length} selectors from ${domData.elements.length} elements`);
            } else {
              emit('Refreshing selectors from live DOM', 'done', 'No interactive elements found near failure point');
            }
          } catch (refreshError: any) {
            emit('Refreshing selectors from live DOM', 'error', refreshError.message);
          }

          // ── Phase 7: Validate selectors against live DOM ─────────────────
          type ValidatedSelector = { count: number; selector: string; status: 'fail' | 'pass'; tag?: string };
          const validatedSelectors: ValidatedSelector[] = [];
          try {
            const allSelectors = Array.from(new Set([
              ...(selector ? [selector] : []),
              ...(suggestedSelectors || []),
              ...refreshedSelectors,
            ]));
            if (allSelectors.length > 0) {
              emit('Validating selectors', 'running', `Testing ${allSelectors.length} selectors against live page`);
              const validationScript = this.buildSelectorValidationScript(allSelectors);
              const validationResult = await cli.evaluate(validationScript);
              const validationText = validationResult.rawText || '';

              try {
                const jsonMatch = validationText.match(/\[[\s\S]*\]/);
                if (jsonMatch) {
                  const parsed = JSON.parse(jsonMatch[0]);
                  if (Array.isArray(parsed)) validatedSelectors.push(...parsed);
                }
              } catch {
                // parse failed
              }

              const passing = validatedSelectors.filter(v => v.status === 'pass').length;
              const failing = validatedSelectors.filter(v => v.status === 'fail').length;
              emit('Validating selectors', 'done', `${passing} pass, ${failing} fail out of ${validatedSelectors.length} tested`);
            }
          } catch (validateError: any) {
            emit('Validating selectors', 'error', validateError.message);
          }

          emit('Navigate to failure complete', 'done');

          // Cleanup CLI session
          await cli.close().catch(() => { /* non-fatal */ });

          return {
            playwrightSteps,
            qaseSteps,
            refreshedSelectors: refreshedSelectors.length > 0 ? refreshedSelectors : undefined,
            reportScreenshotUrl,
            screenshot: screenshotUrl,
            steps,
            success: true,
            validatedSelectors: validatedSelectors.length > 0 ? validatedSelectors : undefined,
          };
        } catch (error: any) {
          emit('Highlighting failing element', 'error', error.message);
          console.warn('[MCPService/CLI] Failed to highlight element:', error);
          await cli.close().catch(() => { /* non-fatal */ });
          return { playwrightSteps, qaseSteps, steps, success: true };
        }
      }

      emit('Navigate to failure complete', 'done', 'No selector to highlight');
      await cli.close().catch(() => { /* non-fatal */ });
      return { playwrightSteps, qaseSteps, steps, success: true };
    } catch (error: any) {
      emit('Navigate to failure complete', 'error', error.message);
      console.error('[MCPService/CLI] Error navigating to failure point:', error);
      await cli.close().catch(() => { /* non-fatal */ });
      return { error: error.message, steps, success: false };
    }
  }

  /**
   * Parse HTML report data to extract test failures
   */
  private parseHTMLReportData(reportPath: string): any[] {
    const dataPath = join(this.testE2eDir, reportPath, 'data', 'report.json');

    if (!existsSync(dataPath)) {
      console.warn(`[MCPService] Report data not found at ${dataPath}`);
      return [];
    }

    try {
      const reportData = JSON.parse(readFileSync(dataPath, 'utf-8'));
      const failures: any[] = [];

      // Navigate through the report structure
      if (reportData.files) {
        for (const file of reportData.files) {
          if (file.tests) {
            for (const test of file.tests) {
              if (test.results && test.results.length > 0) {
                const lastResult = test.results[test.results.length - 1];
                if (lastResult.status === 'failed' || lastResult.status === 'timedOut') {
                  // Extract Qase ID from test title or annotations
                  let qaseId: null | number = null;

                  // Check test title for qase.id(XXXX)
                  const qaseIdMatch = test.title.match(/qase\.id\((\d+)\)/);
                  if (qaseIdMatch) {
                    qaseId = parseInt(qaseIdMatch[1], 10);
                  }

                  // Also check annotations if available
                  if (!qaseId && test.annotations) {
                    for (const annotation of test.annotations) {
                      if (annotation.type === 'qase' && annotation.description) {
                        const annotationMatch = annotation.description.match(/qase\.id\((\d+)\)/);
                        if (annotationMatch) {
                          qaseId = parseInt(annotationMatch[1], 10);
                          break;
                        }
                      }
                    }
                  }

                  failures.push({
                    attachments: lastResult.attachments || [],
                    duration: lastResult.duration,
                    error: lastResult.error?.message || lastResult.error?.value || '',
                    file: file.fileName,
                    qaseId,
                    status: lastResult.status,
                    steps: lastResult.steps || [],
                    testName: test.title,
                  });
                }
              }
            }
          }
        }
      }

      return failures;
    } catch (error: any) {
      console.error('[MCPService] Error parsing HTML report:', error);
      return [];
    }
  }

  /**
   * Save analysis to database
   */
  private async saveAnalysisToDatabase(
    runId: string,
    testResultId: string | undefined,
    analysis: ElementAnalysis,
  ): Promise<void> {
    try {
      // Get test run ID from runId
      const { TestRunRepository } = await import('../repositories/TestRunRepository');
      const prisma = DatabaseService.getInstance().getClient();
      const testRunRepository = new TestRunRepository(prisma);
      const run = await testRunRepository.findByRunId(runId);

      if (!run) {
        console.warn(`[MCPService] Cannot save analysis: Test run ${runId} not found`);
        return;
      }

      await this.mcpAnalysisRepository.create({
        analysisData: JSON.stringify(analysis),
        confidence: analysis.confidence,
        elementInfo: JSON.stringify(analysis.elementInfo),
        error: analysis.error,
        navigationContext: JSON.stringify(analysis.navigationContext),
        qaseId: analysis.qaseId,
        screenshotPath: analysis.navigationContext?.url, // Store URL as screenshot path placeholder
        selector: analysis.selector,
        suggestedSelectors: JSON.stringify(analysis.suggestedSelectors),
        testResultId,
        testRunId: run.id,
      });
    } catch (error: any) {
      console.error('[MCPService] Error saving analysis to database:', error);
    }
  }
}
