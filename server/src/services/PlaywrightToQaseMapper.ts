/**
 * Playwright to Qase Mapper
 * 
 * Transforms Playwright MCP signals into Qase update intents with confidence scoring.
 * Implements the normalized ingest contract for hybrid MCP integration.
 */

import type {
  ConfidenceScore,
  IntentTransformResult,
  PlaywrightObservation,
  PlaywrightSignal,
  PlaywrightToQaseMapping,
  QaseFieldChanges,
  QaseUpdateIntent,
} from '../../../shared/types/playwrightSignals';

const DEFAULT_MAPPING: PlaywrightToQaseMapping = {
  confidenceThreshold: 0.7,
  conventions: [
    {
      examples: ['Journeys-Page: Dashboard Navigation', 'Journeys-Page: Settings View'],
      flowType: 'page',
      pattern: '^([A-Z][a-z]+)-Page: (.+)$',
    },
    {
      examples: ['Journeys-Add-Recording: Setup Modal', 'Journeys-Edit: Confirmation Dialog'],
      flowType: 'modal',
      pattern: '^([A-Z][a-z]+)-(Add|Edit|Delete|Confirm): (.+)$',
    },
    {
      examples: ['Journeys-Tour: Onboarding Flow', 'Journeys-Tour: Feature Walkthrough'],
      flowType: 'tour',
      pattern: '^([A-Z][a-z]+)-Tour: (.+)$',
    },
  ],
  defaultAutomation: 1, // Assume automated for Playwright-captured flows
  selectorPolicy: {
    minStability: 'medium',
    requireFallbacks: true,
  },
  stepMapping: {
    actionPrefix: '',
    expectedResultPrefix: '',
  },
};

export class PlaywrightToQaseMapper {
  private mapping: PlaywrightToQaseMapping;

  constructor(mapping: Partial<PlaywrightToQaseMapping> = {}) {
    this.mapping = { ...DEFAULT_MAPPING, ...mapping };
  }

  /**
   * Transform Playwright signals into Qase update intents
   */
  transformSignals(signals: PlaywrightSignal[]): IntentTransformResult {
    const intents: QaseUpdateIntent[] = [];
    
    for (const signal of signals) {
      const intent = this.signalToIntent(signal);
      if (intent) {
        intents.push(intent);
      }
    }

    const highConfidenceCount = intents.filter((i) => i.confidence.overall >= this.mapping.confidenceThreshold).length;
    const lowConfidenceCount = intents.length - highConfidenceCount;
    const requiresApprovalCount = intents.filter((i) => i.confidence.requiresApproval).length;

    return {
      intents,
      metadata: {
        highConfidenceCount,
        lowConfidenceCount,
        requiresApprovalCount,
        signalsProcessed: signals.length,
        timestamp: new Date().toISOString(),
      },
      signals,
    };
  }

  /**
   * Convert single Playwright signal to Qase update intent
   */
  private signalToIntent(signal: PlaywrightSignal): QaseUpdateIntent | null {
    const { context, metadata, observations } = signal;

    // Generate title from flow name and convention
    const title = this.generateTitle(context.flowName, metadata.flowType);
    if (!title) {
      console.warn('[PlaywrightToQaseMapper] Could not generate title from signal');
      return null;
    }

    // Map observations to Qase steps
    const steps = this.mapObservationsToSteps(observations);

    // Calculate confidence score
    const confidence = this.calculateConfidence(signal, steps);

    // Build proposed changes
    const proposedChanges: QaseFieldChanges = {
      automation: {
        new: this.mapping.defaultAutomation,
        reason: 'Captured via Playwright MCP',
      },
      steps: {
        new: steps,
        reason: 'Derived from Playwright observations',
      },
      title: {
        new: title,
        reason: `Generated from flow name: ${context.flowName}`,
      },
    };

    // Add description if we have preconditions
    const preconditions = this.extractPreconditions(observations);
    if (preconditions) {
      proposedChanges.preconditions = {
        new: preconditions,
        reason: 'Extracted from navigation sequence',
      };
    }

    return {
      caseId: metadata.qaseReference?.caseId,
      confidence,
      proposedChanges,
      rationale: this.buildRationale(signal, confidence),
      sourceSignals: [signal],
      suiteId: metadata.qaseReference?.suiteId || this.mapFlowTypeToSuite(metadata.flowType),
    };
  }

  /**
   * Generate Qase title from flow name using conventions
   */
  private generateTitle(flowName: string | undefined, flowType: string): string | null {
    if (!flowName) return null;

    // Check if flowName already matches convention
    const matchingConvention = this.mapping.conventions.find((c) => c.flowType === flowType);
    if (matchingConvention) {
      const regex = new RegExp(matchingConvention.pattern);
      if (regex.test(flowName)) {
        return flowName; // Already follows convention
      }
    }

    // Generate from flow type
    const normalized = flowName.replace(/[_-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    
    switch (flowType) {
      case 'page':
        return `Journeys-Page: ${normalized}`;
      case 'modal':
        return `Journeys-Modal: ${normalized}`;
      case 'tour':
        return `Journeys-Tour: ${normalized}`;
      default:
        return normalized;
    }
  }

  /**
   * Map Playwright observations to Qase steps
   */
  private mapObservationsToSteps(observations: PlaywrightObservation[]): Array<{
    action: string;
    expected_result: string;
  }> {
    return observations
      .filter((obs) => obs.type === 'action' || obs.type === 'assertion')
      .map((obs, index) => {
        const action = this.observationToAction(obs, index + 1);
        const expectedResult = obs.expectedOutcome || this.inferExpectedResult(obs);

        return {
          action,
          expected_result: expectedResult,
        };
      });
  }

  /**
   * Convert observation to action description
   */
  private observationToAction(obs: PlaywrightObservation, stepNumber: number): string {
    const prefix = this.mapping.stepMapping.actionPrefix || '';
    
    if (obs.action) {
      const { method, selector, elementDescription } = obs.action;
      
      switch (method) {
        case 'click':
          return `${prefix}Click ${elementDescription || selector.primary}`;
        case 'fill':
        case 'type':
          return `${prefix}Enter "${obs.action.inputValue}" in ${elementDescription || selector.primary}`;
        case 'goto':
          return `${prefix}Navigate to ${obs.action.targetUrl}`;
        case 'hover':
          return `${prefix}Hover over ${elementDescription || selector.primary}`;
        case 'select':
          return `${prefix}Select option in ${elementDescription || selector.primary}`;
        default:
          return `${prefix}${method} ${elementDescription || selector.primary}`;
      }
    }

    return `${prefix}Step ${stepNumber}`;
  }

  /**
   * Infer expected result from observation
   */
  private inferExpectedResult(obs: PlaywrightObservation): string {
    if (obs.action) {
      switch (obs.action.method) {
        case 'click':
          return 'Element is clicked successfully';
        case 'fill':
        case 'type':
          return 'Text is entered successfully';
        case 'goto':
          return `Page loads: ${obs.action.targetUrl}`;
        default:
          return 'Action completes successfully';
      }
    }

    return 'Verification passes';
  }

  /**
   * Extract preconditions from navigation sequence
   */
  private extractPreconditions(observations: PlaywrightObservation[]): string | null {
    const navObs = observations.filter((obs) => obs.type === 'navigation');
    
    if (navObs.length === 0) return null;

    const steps = navObs.map((obs, i) => {
      if (obs.action?.targetUrl) {
        return `${i + 1}. Navigate to ${obs.action.targetUrl}`;
      }
      return null;
    }).filter(Boolean);

    return steps.length > 0 ? steps.join('\n') : null;
  }

  /**
   * Calculate confidence score for proposed update
   */
  private calculateConfidence(signal: PlaywrightSignal, steps: any[]): ConfidenceScore {
    const { observations } = signal;

    // Selector stability: average of all action selectors
    const actionObs = observations.filter((obs) => obs.action);
    const stabilityCounts = {
      high: actionObs.filter((obs) => obs.action?.selector.stability === 'high').length,
      low: actionObs.filter((obs) => obs.action?.selector.stability === 'low').length,
      medium: actionObs.filter((obs) => obs.action?.selector.stability === 'medium').length,
    };
    
    const selectorStability = actionObs.length > 0
      ? (stabilityCounts.high * 1.0 + stabilityCounts.medium * 0.6 + stabilityCounts.low * 0.3) / actionObs.length
      : 0.5;

    // Step coverage: do we have expected outcomes for all actions?
    const stepsWithOutcomes = observations.filter(
      (obs) => obs.expectedOutcome || (obs.type === 'action' && obs.action)
    ).length;
    const stepCoverage = observations.length > 0 ? stepsWithOutcomes / observations.length : 0;

    // Title convention match
    const titleConvention = signal.context.flowName && this.matchesConvention(signal.context.flowName, signal.metadata.flowType)
      ? 1.0
      : 0.5;

    // Overall: weighted average
    const overall = (selectorStability * 0.4) + (stepCoverage * 0.4) + (titleConvention * 0.2);

    const requiresApproval = overall < this.mapping.confidenceThreshold;

    return {
      breakdown: {
        selectorStability,
        stepCoverage,
        titleConvention,
      },
      overall,
      requiresApproval,
      threshold: this.mapping.confidenceThreshold,
    };
  }

  /**
   * Check if flow name matches title convention
   */
  private matchesConvention(flowName: string, flowType: string): boolean {
    const convention = this.mapping.conventions.find((c) => c.flowType === flowType);
    if (!convention) return false;

    const regex = new RegExp(convention.pattern);
    return regex.test(flowName);
  }

  /**
   * Map flow type to suite ID
   */
  private mapFlowTypeToSuite(flowType: string): number | undefined {
    return this.mapping.suiteMapping?.flowTypeToSuiteId[flowType];
  }

  /**
   * Build rationale for proposed changes
   */
  private buildRationale(signal: PlaywrightSignal, confidence: ConfidenceScore): string {
    const parts = [
      `Derived from ${signal.source} signal`,
      `${signal.observations.length} observations captured`,
      `Confidence: ${(confidence.overall * 100).toFixed(1)}%`,
    ];

    if (confidence.requiresApproval) {
      parts.push(`⚠️ Requires manual approval (< ${(confidence.threshold * 100).toFixed(0)}% threshold)`);
    }

    return parts.join(' | ');
  }

  /**
   * Update mapping configuration
   */
  updateMapping(mapping: Partial<PlaywrightToQaseMapping>): void {
    this.mapping = { ...this.mapping, ...mapping };
  }

  /**
   * Get current mapping configuration
   */
  getMapping(): PlaywrightToQaseMapping {
    return { ...this.mapping };
  }
}
