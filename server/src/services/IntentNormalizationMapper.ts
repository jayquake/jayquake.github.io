import * as fs from 'fs';

import type {
  FlowStep,
  IntentModal,
  IntentObject,
  IntentPage,
  IntentTour,
  QaseTestCasePayload,
  SelectorEntry,
} from '../../../shared/types';

export type MCPContextData = {
  elementsSnapshot?: {
    role?: string;
    selector: string;
    testId?: string;
    text?: string;
    type: string;
  }[];
  screenshotHash?: string;
  sourceUrl?: string;
  timestamp?: string;
}

/**
 * Input sources for intent normalization
 */
export type PlaywrightObjectMetadata = {
  filePath: string; // Path to the .ts file
  locators?: {
    name: string;
    selector: string; // Raw selector string from code
    selectorType: 'css' | 'role' | 'testId' | 'text' | 'xpath';
  }[];
  methods?: {
    actions?: string[]; // Actions performed (click, fill, etc.)
    locators?: string[]; // Locator definitions used in the method
    name: string;
    verifications?: string[]; // Expectations/assertions
  }[];
  name: string; // e.g., "JourneysPage", "WelcomeToDashboardModal", "DashboardTour"
  type: 'modal' | 'page' | 'tour';
}

export type QaseTestCaseData = QaseTestCasePayload & {
  created?: string;
  // Extended with additional fields from Qase API
  suite?: {
    id: number;
    title: string;
  };
  updated?: string;
}

/**
 * IntentNormalizationMapper
 * 
 * Normalizes data from Playwright page objects, MCP context, and Qase test cases
 * into a canonical intent model. Ensures deterministic output for the same input.
 * 
 * Phase 1A: Skeleton implementation with core normalization logic
 */
export class IntentNormalizationMapper {
  /**
   * Ensure deterministic output by sorting and normalizing
   * 
   * @param intentObject - Intent object to normalize
   * @returns Normalized intent object with deterministic ordering
   */
  ensureDeterministicOutput(intentObject: IntentObject): IntentObject {
    // Sort steps by order
    const sortedSteps = [...intentObject.steps].sort((a, b) => a.order - b.order);

    // Sort fallback selectors by priority
    const normalizedSteps = sortedSteps.map((step) => ({
      ...step,
      fallbackSelectors: [...step.fallbackSelectors].sort((a, b) => a.priority - b.priority),
    }));

    return {
      ...intentObject,
      metadata: {
        ...intentObject.metadata,
        tags: intentObject.metadata?.tags?.sort() || [],
      },
      steps: normalizedSteps,
    };
  }

  /**
   * Normalize a Playwright Page/Modal/Tour object into canonical intent model
   * 
   * @param playwrightMeta - Metadata extracted from Playwright page object
   * @param mcpContext - Optional MCP context for enhanced selector data
   * @param qaseTestCase - Optional existing Qase test case for linkage
   * @returns Normalized IntentObject
   */
  normalizePlaywrightObject(
    playwrightMeta: PlaywrightObjectMetadata,
    mcpContext?: MCPContextData,
    qaseTestCase?: QaseTestCaseData,
  ): IntentObject {
    // Deterministic ordering: sort methods by name for consistent output
    const sortedMethods = playwrightMeta.methods?.sort((a, b) => a.name.localeCompare(b.name)) || [];

    // Extract steps from methods
    const steps = this.extractFlowSteps(playwrightMeta, mcpContext);

    // Build base intent object
    const baseIntent = {
      description: qaseTestCase?.description || this.generateDescriptionFromMethods(sortedMethods),
      filePath: playwrightMeta.filePath,
      metadata: {
        lastModified: this.getFileModificationTime(playwrightMeta.filePath),
        tags: qaseTestCase?.tags || [],
      },
      name: playwrightMeta.name,
      qaseId: qaseTestCase?.id,
      steps,
    };

    // Type-specific intent objects
    switch (playwrightMeta.type) {
      case 'modal':
        return {
          ...baseIntent,
          triggerAction: this.inferTriggerAction(sortedMethods),
          type: 'modal',
        } as IntentModal;

      case 'page':
        return {
          ...baseIntent,
          type: 'page',
          url: this.inferUrlFromMethods(sortedMethods),
        } as IntentPage;

      case 'tour':
        return {
          ...baseIntent,
          type: 'tour',
        } as IntentTour;

      default:
        throw new Error(`Unknown Playwright object type: ${playwrightMeta.type}`);
    }
  }

  /**
   * Normalize Qase test case into canonical payload format
   * 
   * @param qaseTestCase - Raw Qase test case data
   * @returns Normalized QaseTestCasePayload
   */
  normalizeQaseTestCase(qaseTestCase: QaseTestCaseData): QaseTestCasePayload {
    return {
      automation: qaseTestCase.automation,
      description: qaseTestCase.description,
      id: qaseTestCase.id,
      preconditions: qaseTestCase.preconditions,
      priority: qaseTestCase.priority,
      severity: qaseTestCase.severity,
      status: qaseTestCase.status,
      steps: qaseTestCase.steps?.map((step) => ({
        action: step.action,
        expected_result: step.expected_result,
      })),
      suite_id: qaseTestCase.suite_id,
      tags: qaseTestCase.tags,
      title: qaseTestCase.title,
    };
  }

  /**
   * Build fallback selectors from MCP context
   * 
   * Phase 1A: Placeholder implementation
   * Will be enhanced in future phases to match MCP elements and build alternative selectors
   * 
   * @returns Array of fallback selector entries (empty in Phase 1A)
   */
  private buildFallbacksFromMCP(): SelectorEntry[] {
    const fallbacks: SelectorEntry[] = [];
    
    // This is a placeholder - in real implementation, we'd match MCP elements
    // to the primary selector and build alternative selectors
    // For now, return empty array (will be enhanced in future phases)
    
    return fallbacks;
  }

  /**
   * Build selector chain with primary and fallback selectors
   * 
   * @param primaryLocatorName - Name of the primary locator
   * @param allLocators - All locators defined in the page object
   * @param mcpContext - Optional MCP context for additional selector data
   * @returns Object with primary selector and fallback chain
   */
  private buildSelectorChain(
    primaryLocatorName: null | string,
    allLocators?: PlaywrightObjectMetadata['locators'],
    mcpContext?: MCPContextData,
  ): { fallbacks: SelectorEntry[]; primary: SelectorEntry; } {
    // Default fallback if no locator found
    const defaultPrimary: SelectorEntry = {
      priority: 4, // Low priority fallback
      type: 'css',
      value: 'body',
    };

    if (!primaryLocatorName || !allLocators) {
      return { fallbacks: [], primary: defaultPrimary };
    }

    // Find the locator definition
    const locatorDef = allLocators.find((loc) => loc.name === primaryLocatorName);
    if (!locatorDef) {
      return { fallbacks: [], primary: defaultPrimary };
    }

    // Build primary selector
    const primary: SelectorEntry = {
      priority: this.getSelectorPriority(locatorDef.selectorType),
      type: locatorDef.selectorType,
      value: locatorDef.selector,
    };

    // Build fallback chain from MCP context if available
    const fallbacks: SelectorEntry[] = [];
    if (mcpContext?.elementsSnapshot) {
      // Match MCP elements to this locator and build alternatives
      const alternatives = this.buildFallbacksFromMCP();
      fallbacks.push(...alternatives);
    }

    return { fallbacks, primary };
  }

  /**
   * Calculate confidence score for a step
   * 
   * @param method - Method metadata
   * @param mcpContext - Optional MCP context
   * @returns Confidence score between 0 and 1
   */
  private calculateConfidence(
    method: PlaywrightObjectMetadata['methods'][0],
    mcpContext?: MCPContextData,
  ): number {
    if (!method) {
      return 0.5;
    }

    let confidence = 0.5; // Base confidence

    // Increase confidence if method has explicit verifications
    if (method.verifications && method.verifications.length > 0) {
      confidence += 0.2;
    }

    // Increase confidence if MCP context is available
    if (mcpContext?.sourceUrl) {
      confidence += 0.2;
    }

    // Increase confidence if locators use stable selector types
    if (method.locators && method.locators.length > 0) {
      confidence += 0.1;
    }

    return Math.min(confidence, 1.0);
  }

  /**
   * Extract flow steps from Playwright object metadata
   * 
   * @param playwrightMeta - Playwright object metadata
   * @param mcpContext - Optional MCP context for selector enrichment
   * @returns Array of normalized FlowStep objects
   */
  private extractFlowSteps(
    playwrightMeta: PlaywrightObjectMetadata,
    mcpContext?: MCPContextData,
  ): FlowStep[] {
    const methods = playwrightMeta.methods || [];
    const steps: FlowStep[] = [];

    // Filter methods that represent actions (exclude helpers, getters)
    const actionMethods = methods.filter(
      (m) => 
        m.name.startsWith('click') || 
        m.name.startsWith('fill') || 
        m.name.startsWith('navigate') ||
        m.name.startsWith('verify') ||
        m.name.startsWith('complete') ||
        m.name.startsWith('skip')
    );

    actionMethods.forEach((method, index) => {
      // Extract primary locator from method
      const primaryLocator = method.locators?.[0] || null;
      
      // Build selectors with fallback chain
      const selectors = this.buildSelectorChain(
        primaryLocator,
        playwrightMeta.locators,
        mcpContext,
      );

      // Infer action and expected result from method name and verifications
      const action = this.inferActionFromMethod(method);
      const expectedResult = this.inferExpectedResultFromMethod(method);

      steps.push({
        action,
        expectedResult,
        fallbackSelectors: selectors.fallbacks,
        metadata: {
          confidence: this.calculateConfidence(method, mcpContext),
          screenshot: mcpContext?.screenshotHash,
          sourceUrl: mcpContext?.sourceUrl,
        },
        order: index + 1,
        primarySelector: selectors.primary,
      });
    });

    return steps;
  }

  /**
   * Format method name to human-readable text
   */
  private formatMethodName(methodName: string): string {
    // Convert camelCase to Title Case with spaces
    return methodName
      .replace(/([A-Z])/g, ' $1')
      .trim()
      .replace(/^\w/, (c) => c.toUpperCase());
  }

  /**
   * Generate description from method names
   */
  private generateDescriptionFromMethods(methods: PlaywrightObjectMetadata['methods']): string {
    if (!methods || methods.length === 0) {
      return 'No description available';
    }

    const actionMethods = methods.filter((m) => 
      m.name.startsWith('click') || 
      m.name.startsWith('fill') || 
      m.name.startsWith('navigate') ||
      m.name.startsWith('complete')
    );

    if (actionMethods.length === 0) {
      return 'Page/Modal/Tour object with verification methods';
    }

    return `Supports actions: ${actionMethods.map((m) => this.formatMethodName(m.name)).join(', ')}`;
  }

  /**
   * Get file modification time
   */
  private getFileModificationTime(filePath: string): string | undefined {
    try {
      const stats = fs.statSync(filePath);
      return stats.mtime.toISOString();
    } catch {
      return undefined;
    }
  }

  /**
   * Get selector priority based on type
   * Lower number = higher priority (more stable)
   */
  private getSelectorPriority(type: string): number {
    const priorityMap: Record<string, number> = {
      css: 4,
      role: 1,
      testId: 3,
      text: 2,
      xpath: 5,
    };
    return priorityMap[type] || 6;
  }

  /**
   * Infer action description from method name and body
   */
  private inferActionFromMethod(method: PlaywrightObjectMetadata['methods'][0]): string {
    if (!method) {
      return 'Action';
    }

    // Simple inference based on method name
    const methodName = method.name;
    
    if (methodName.startsWith('click')) {
      return `Click ${this.formatMethodName(methodName.replace('click', ''))}`;
    }
    if (methodName.startsWith('fill')) {
      return `Fill ${this.formatMethodName(methodName.replace('fill', ''))}`;
    }
    if (methodName.startsWith('navigate')) {
      return `Navigate to ${this.formatMethodName(methodName.replace('navigateTo', ''))}`;
    }
    if (methodName.startsWith('verify')) {
      return `Verify ${this.formatMethodName(methodName.replace('verify', ''))}`;
    }
    
    return this.formatMethodName(methodName);
  }

  /**
   * Infer expected result from method verifications
   */
  private inferExpectedResultFromMethod(method: PlaywrightObjectMetadata['methods'][0]): string {
    if (!method) {
      return 'Action completes successfully';
    }

    // Check for explicit verifications in method
    if (method.verifications && method.verifications.length > 0) {
      return method.verifications[0]; // Use first verification as expected result
    }

    // Infer from method name
    const methodName = method.name;
    if (methodName.startsWith('verify') || methodName.includes('IsVisible')) {
      return `Element is visible and ${this.formatMethodName(methodName.replace(/verify|IsVisible/g, ''))}`;
    }
    
    return 'Action completes successfully';
  }

  /**
   * Infer trigger action for modals
   */
  private inferTriggerAction(methods: PlaywrightObjectMetadata['methods']): string | undefined {
    if (!methods || methods.length === 0) {
      return 'Triggered by user action';
    }

    // For modals, look for methods that suggest how it's triggered
    const openMethod = methods.find((m) => m.name.includes('open') || m.name.includes('show'));
    if (openMethod) {
      return this.formatMethodName(openMethod.name);
    }
    return 'Triggered by user action';
  }

  /**
   * Infer URL from navigation methods
   */
  private inferUrlFromMethods(methods: PlaywrightObjectMetadata['methods']): string | undefined {
    if (!methods || methods.length === 0) {
      return undefined;
    }

    const navMethod = methods.find((m) => m.name.startsWith('navigateTo') || m.name.includes('goto'));
    if (navMethod && navMethod.actions && navMethod.actions.length > 0) {
      // Extract URL from goto action (simplified)
      const gotoAction = navMethod.actions.find((a) => a.includes('goto'));
      if (gotoAction) {
        const match = gotoAction.match(/goto\(['"`](.+?)['"`]\)/);
        return match ? match[1] : undefined;
      }
    }
    return undefined;
  }
}

// Export singleton instance
export const intentMapper = new IntentNormalizationMapper();
