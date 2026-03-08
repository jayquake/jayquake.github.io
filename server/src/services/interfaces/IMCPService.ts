import type { QaseConfig } from '../../../../shared/types';
import type { ElementAnalysis, MCPInteraction } from '../MCPService';
import type { QaseService } from '../QaseService';

/**
 * Interface for Microsoft Playwright MCP integration service
 * Provides intelligent browser automation and test failure analysis
 */
export type IMCPService = {
  /**
   * Analyze a specific element on the page
   * @param selector - Element selector to analyze
   * @returns Promise with element analysis including suggested selectors
   */
  analyzeElement: (selector: string) => Promise<ElementAnalysis>;

  /**
   * Analyze a test run for failures
   * Uses unified report data from ReportService (Playwright + Qase)
   * @param runId - Test run identifier
   * @param qaseService - Optional Qase service for test case context
   * @param qaseConfig - Optional Qase configuration
   * @returns Promise with array of element analyses
   */
  analyzeTestRun: (runId: string, qaseService?: QaseService, qaseConfig?: QaseConfig) => Promise<ElementAnalysis[]>;

  /**
   * Check if MCP server is available and running
   * @returns Promise with boolean indicating server availability
   */
  checkMCPServer: () => Promise<boolean>;

  /**
   * Get MCP analysis explanation from stored data
   * @param analysisId - Analysis identifier
   * @returns Promise with human-readable explanation
   */
  getAnalysisExplanation: (analysisId: string) => Promise<string>;

  /**
   * Get stored MCP analyses for a test run
   * @param runId - Test run identifier
   * @returns Promise with array of stored analyses
   */
  getStoredAnalysis: (runId: string) => Promise<ElementAnalysis[]>;

  /**
   * Interact with an element (click, fill, hover, etc.)
   * @param interaction - Interaction details (type, selector, value, etc.)
   * @returns Promise with interaction result
   */
  interact: (interaction: MCPInteraction) => Promise<any>;

  /**
   * List available tools from MCP server
   * @returns Promise with array of tool names
   */
  listTools: () => Promise<string[]>;

  /**
   * Navigate to a URL
   * @param url - URL to navigate to
   * @param openPlaywrightUI - Whether to open Playwright UI mode
   * @returns Promise with navigation result
   */
  navigate: (url: string, openPlaywrightUI?: boolean) => Promise<{ error?: string; success: boolean; }>;

  /**
   * Navigate to a test failure point
   * @param url - URL where the failure occurred
   * @param selector - Selector that failed
   * @param openPlaywrightUI - Whether to open Playwright UI mode
   * @returns Promise with navigation result
   */
  navigateToFailure: (
    url: string,
    selector: string,
    openPlaywrightUI?: boolean,
  ) => Promise<{ error?: string; success: boolean; }>;
}
