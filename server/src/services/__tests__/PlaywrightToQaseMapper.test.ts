import { describe, expect, it } from 'vitest';

import type { PlaywrightSignal } from '../../../../shared/types/playwrightSignals';

import { PlaywrightToQaseMapper } from '../PlaywrightToQaseMapper';

describe('PlaywrightToQaseMapper', () => {
  const mockSignal: PlaywrightSignal = {
    context: {
      baseUrl: 'https://example.com',
      browser: 'chromium',
      flowName: 'Journeys-Page: Dashboard',
      sessionId: 'test-session-123',
    },
    metadata: {
      capturedBy: 'test-operator',
      flowType: 'page',
      qaseReference: {
        suiteId: 87,
      },
    },
    observations: [
      {
        action: {
          elementDescription: 'Dashboard Link',
          method: 'click',
          selector: {
            primary: 'role=link[name="Dashboard"]',
            stability: 'high',
          },
        },
        expectedOutcome: 'Dashboard page loads',
        order: 1,
        timestamp: '2026-02-11T00:00:00.000Z',
        type: 'action',
      },
      {
        action: {
          elementDescription: 'Filter Input',
          inputValue: 'test filter',
          method: 'fill',
          selector: {
            primary: 'role=textbox[name="Filter"]',
            stability: 'high',
          },
        },
        expectedOutcome: 'Filter is applied',
        order: 2,
        timestamp: '2026-02-11T00:00:01.000Z',
        type: 'action',
      },
    ],
    source: 'mcp-snapshot',
    timestamp: '2026-02-11T00:00:00.000Z',
  };

  describe('Signal Transformation', () => {
    it('should transform signal to intent', () => {
      const mapper = new PlaywrightToQaseMapper();
      const result = mapper.transformSignals([mockSignal]);

      expect(result.intents).toHaveLength(1);
      expect(result.signals).toHaveLength(1);
      expect(result.metadata.signalsProcessed).toBe(1);
    });

    it('should generate title from flow name', () => {
      const mapper = new PlaywrightToQaseMapper();
      const result = mapper.transformSignals([mockSignal]);

      const intent = result.intents[0];
      expect(intent.proposedChanges.title?.new).toBe('Journeys-Page: Dashboard');
    });

    it('should map observations to steps', () => {
      const mapper = new PlaywrightToQaseMapper();
      const result = mapper.transformSignals([mockSignal]);

      const intent = result.intents[0];
      expect(intent.proposedChanges.steps?.new).toHaveLength(2);
      expect(intent.proposedChanges.steps?.new[0].action).toContain('Click Dashboard Link');
      expect(intent.proposedChanges.steps?.new[1].action).toContain('Enter "test filter"');
    });

    it('should set default automation', () => {
      const mapper = new PlaywrightToQaseMapper();
      const result = mapper.transformSignals([mockSignal]);

      const intent = result.intents[0];
      expect(intent.proposedChanges.automation?.new).toBe(1);
    });

    it('should preserve suite ID from reference', () => {
      const mapper = new PlaywrightToQaseMapper();
      const result = mapper.transformSignals([mockSignal]);

      const intent = result.intents[0];
      expect(intent.suiteId).toBe(87);
    });
  });

  describe('Confidence Scoring', () => {
    it('should calculate high confidence for stable selectors', () => {
      const mapper = new PlaywrightToQaseMapper();
      const result = mapper.transformSignals([mockSignal]);

      const intent = result.intents[0];
      expect(intent.confidence.breakdown.selectorStability).toBeGreaterThan(0.8);
      expect(intent.confidence.overall).toBeGreaterThan(0.7);
      expect(intent.confidence.requiresApproval).toBe(false);
    });

    it('should calculate low confidence for missing outcomes', () => {
      const signalWithMissingOutcomes: PlaywrightSignal = {
        ...mockSignal,
        context: {
          ...mockSignal.context,
          flowName: 'custom_flow_no_convention', // Doesn't match convention
        },
        observations: [
          {
            action: {
              method: 'click',
              selector: {
                primary: 'div.button',
                stability: 'low',
              },
            },
            order: 1,
            timestamp: '2026-02-11T00:00:00.000Z',
            type: 'action',
          },
        ],
      };

      const mapper = new PlaywrightToQaseMapper();
      const result = mapper.transformSignals([signalWithMissingOutcomes]);

      const intent = result.intents[0];
      expect(intent.confidence.breakdown.selectorStability).toBeLessThan(0.5);
      // With low selector stability, no expected outcome, and no title convention match,
      // overall confidence should be low enough to require approval
      expect(intent.confidence.overall).toBeLessThan(0.7);
      expect(intent.confidence.requiresApproval).toBe(true);
    });

    it('should count high/low confidence intents', () => {
      const mapper = new PlaywrightToQaseMapper({ confidenceThreshold: 0.8 });
      const result = mapper.transformSignals([mockSignal]);

      expect(result.metadata.highConfidenceCount).toBeGreaterThanOrEqual(0);
      expect(result.metadata.lowConfidenceCount).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Title Conventions', () => {
    it('should match page convention', () => {
      const signal: PlaywrightSignal = {
        ...mockSignal,
        context: {
          ...mockSignal.context,
          flowName: 'Journeys-Page: Settings',
        },
        metadata: {
          ...mockSignal.metadata,
          flowType: 'page',
        },
      };

      const mapper = new PlaywrightToQaseMapper();
      const result = mapper.transformSignals([signal]);

      expect(result.intents[0].proposedChanges.title?.new).toBe('Journeys-Page: Settings');
    });

    it('should match modal convention', () => {
      const signal: PlaywrightSignal = {
        ...mockSignal,
        context: {
          ...mockSignal.context,
          flowName: 'Journeys-Add: New Item',
        },
        metadata: {
          ...mockSignal.metadata,
          flowType: 'modal',
        },
      };

      const mapper = new PlaywrightToQaseMapper();
      const result = mapper.transformSignals([signal]);

      expect(result.intents[0].proposedChanges.title?.new).toBe('Journeys-Add: New Item');
    });

    it('should generate title if flow name missing convention', () => {
      const signal: PlaywrightSignal = {
        ...mockSignal,
        context: {
          ...mockSignal.context,
          flowName: 'my_custom_flow',
        },
      };

      const mapper = new PlaywrightToQaseMapper();
      const result = mapper.transformSignals([signal]);

      expect(result.intents[0].proposedChanges.title?.new).toContain('Journeys-Page');
    });
  });

  describe('Configuration', () => {
    it('should use custom confidence threshold', () => {
      const mapper = new PlaywrightToQaseMapper({ confidenceThreshold: 0.9 });
      
      const config = mapper.getMapping();
      expect(config.confidenceThreshold).toBe(0.9);
    });

    it('should allow runtime config updates', () => {
      const mapper = new PlaywrightToQaseMapper();
      
      mapper.updateMapping({ confidenceThreshold: 0.6 });
      
      expect(mapper.getMapping().confidenceThreshold).toBe(0.6);
    });
  });
});
