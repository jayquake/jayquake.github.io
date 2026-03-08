import { describe, expect, it } from 'vitest';

import { SELECTOR_PRIORITY_MAP, SelectorStabilityPolicy } from '../SelectorStabilityPolicy';

describe('SelectorStabilityPolicy', () => {
  const policy = new SelectorStabilityPolicy();

  describe('parseLocator', () => {
    it('should parse role-based selector with name', () => {
      const locator = "getByRole('button', { name: 'Submit' })";
      const result = policy.parseLocator(locator);

      expect(result.type).toBe('role');
      expect(result.value).toBe('button[name="Submit"]');
      expect(result.priority).toBe(SELECTOR_PRIORITY_MAP.role);
    });

    it('should parse role-based selector without name', () => {
      const locator = "getByRole('button')";
      const result = policy.parseLocator(locator);

      expect(result.type).toBe('role');
      expect(result.value).toBe('button');
      expect(result.priority).toBe(SELECTOR_PRIORITY_MAP.role);
    });

    it('should parse text-based selector', () => {
      const locator = "getByText('Click here')";
      const result = policy.parseLocator(locator);

      expect(result.type).toBe('text');
      expect(result.value).toBe('Click here');
      expect(result.priority).toBe(SELECTOR_PRIORITY_MAP.text);
    });

    it('should parse testId selector', () => {
      const locator = "getByTestId('submit-button')";
      const result = policy.parseLocator(locator);

      expect(result.type).toBe('testId');
      expect(result.value).toBe('submit-button');
      expect(result.priority).toBe(SELECTOR_PRIORITY_MAP.testId);
    });

    it('should parse label selector as text', () => {
      const locator = "getByLabel('Email')";
      const result = policy.parseLocator(locator);

      expect(result.type).toBe('text');
      expect(result.value).toBe('label:Email');
      expect(result.priority).toBe(SELECTOR_PRIORITY_MAP.text);
    });

    it('should parse placeholder selector as text', () => {
      const locator = "getByPlaceholder('Enter your name')";
      const result = policy.parseLocator(locator);

      expect(result.type).toBe('text');
      expect(result.value).toBe('placeholder:Enter your name');
      expect(result.priority).toBe(SELECTOR_PRIORITY_MAP.text);
    });

    it('should parse CSS locator', () => {
      const locator = "locator('.submit-button')";
      const result = policy.parseLocator(locator);

      expect(result.type).toBe('css');
      expect(result.value).toBe('.submit-button');
      expect(result.priority).toBe(SELECTOR_PRIORITY_MAP.css);
    });

    it('should default to CSS for unknown pattern', () => {
      const locator = "unknown('selector')";
      const result = policy.parseLocator(locator);

      expect(result.type).toBe('css');
      expect(result.value).toBe(locator);
      expect(result.priority).toBe(SELECTOR_PRIORITY_MAP.css);
    });
  });

  describe('rankSelectors', () => {
    it('should rank selectors by priority (role > text > testId > css)', () => {
      const selectors = [
        { priority: SELECTOR_PRIORITY_MAP.css, type: 'css' as const, value: '.button' },
        { priority: SELECTOR_PRIORITY_MAP.role, type: 'role' as const, value: 'button' },
        { priority: SELECTOR_PRIORITY_MAP.testId, type: 'testId' as const, value: 'btn' },
        { priority: SELECTOR_PRIORITY_MAP.text, type: 'text' as const, value: 'Submit' },
      ];

      const ranked = policy.rankSelectors(selectors);

      expect(ranked[0].type).toBe('role'); // Highest priority
      expect(ranked[1].type).toBe('text');
      expect(ranked[2].type).toBe('testId');
      expect(ranked[3].type).toBe('css'); // Lowest priority
    });

    it('should sort alphabetically for same priority', () => {
      const selectors = [
        { priority: SELECTOR_PRIORITY_MAP.text, type: 'text' as const, value: 'Zebra' },
        { priority: SELECTOR_PRIORITY_MAP.text, type: 'text' as const, value: 'Apple' },
        { priority: SELECTOR_PRIORITY_MAP.text, type: 'text' as const, value: 'Banana' },
      ];

      const ranked = policy.rankSelectors(selectors);

      expect(ranked[0].value).toBe('Apple');
      expect(ranked[1].value).toBe('Banana');
      expect(ranked[2].value).toBe('Zebra');
    });
  });

  describe('generateFallbackChain', () => {
    it('should generate fallbacks for role-based selector with name', () => {
      const primary = {
        priority: SELECTOR_PRIORITY_MAP.role,
        type: 'role' as const,
        value: 'button[name="Submit"]',
      };

      const fallbacks = policy.generateFallbackChain(primary);

      expect(fallbacks.length).toBeGreaterThan(0);
      // Should include text-based fallback and generic role
      const textFallback = fallbacks.find((f) => f.type === 'text');
      expect(textFallback).toBeDefined();
      expect(textFallback?.value).toBe('Submit');
    });

    it('should generate CSS fallback for testId selector', () => {
      const primary = {
        priority: SELECTOR_PRIORITY_MAP.testId,
        type: 'testId' as const,
        value: 'submit-btn',
      };

      const fallbacks = policy.generateFallbackChain(primary);

      const cssFallback = fallbacks.find((f) => f.type === 'css');
      expect(cssFallback).toBeDefined();
      expect(cssFallback?.value).toBe('[data-testid="submit-btn"]');
    });

    it('should filter out lower-priority alternatives', () => {
      const primary = {
        priority: SELECTOR_PRIORITY_MAP.role,
        type: 'role' as const,
        value: 'button',
      };

      const alternatives = [
        { priority: SELECTOR_PRIORITY_MAP.css, type: 'css' as const, value: '.button' },
        { priority: SELECTOR_PRIORITY_MAP.text, type: 'text' as const, value: 'Submit' },
      ];

      const fallbacks = policy.generateFallbackChain(primary, alternatives);

      // Should not include CSS (lower priority than role)
      // But might include text (higher stability for different selector type)
      expect(fallbacks.some((f) => f.type === 'css')).toBe(false);
    });

    it('should remove duplicates', () => {
      const primary = {
        priority: SELECTOR_PRIORITY_MAP.role,
        type: 'role' as const,
        value: 'button',
      };

      const alternatives = [
        { priority: SELECTOR_PRIORITY_MAP.text, type: 'text' as const, value: 'Submit' },
        { priority: SELECTOR_PRIORITY_MAP.text, type: 'text' as const, value: 'Submit' }, // Duplicate
      ];

      const fallbacks = policy.generateFallbackChain(primary, alternatives);

      // Fallbacks should be deduplicated
      // Note: The provided alternatives are filtered by priority first (must be < primary priority)
      // Since role (priority 1) is highest, text (priority 2) alternatives won't be included
      // as "better alternatives". They're only added if priority < primary.priority.
      // So we test that synthetic fallbacks don't duplicate.
      const uniqueValues = new Set(fallbacks.map((f) => `${f.type}:${f.value}`));
      expect(uniqueValues.size).toBe(fallbacks.length); // No duplicates
    });
  });

  describe('calculateStabilityScore', () => {
    it('should give high score to role selector with fallbacks', () => {
      const primary = {
        priority: SELECTOR_PRIORITY_MAP.role,
        type: 'role' as const,
        value: 'button[name="Submit"]',
      };

      const fallbacks = [
        { priority: SELECTOR_PRIORITY_MAP.text, type: 'text' as const, value: 'Submit' },
        { priority: SELECTOR_PRIORITY_MAP.testId, type: 'testId' as const, value: 'submit-btn' },
      ];

      const score = policy.calculateStabilityScore(primary, fallbacks);

      expect(score).toBeGreaterThan(0.8); // High score for role + good fallbacks
    });

    it('should give lower score to CSS selector without fallbacks', () => {
      const primary = {
        priority: SELECTOR_PRIORITY_MAP.css,
        type: 'css' as const,
        value: '.button',
      };

      const fallbacks: any[] = [];

      const score = policy.calculateStabilityScore(primary, fallbacks);

      expect(score).toBeLessThan(0.6); // Lower score for CSS
    });

    it('should give medium score to testId selector', () => {
      const primary = {
        priority: SELECTOR_PRIORITY_MAP.testId,
        type: 'testId' as const,
        value: 'submit-btn',
      };

      const fallbacks = [
        { priority: SELECTOR_PRIORITY_MAP.css, type: 'css' as const, value: '[data-testid="submit-btn"]' },
      ];

      const score = policy.calculateStabilityScore(primary, fallbacks);

      expect(score).toBeGreaterThan(0.5);
      expect(score).toBeLessThan(0.9);
    });
  });

  describe('validateSelector', () => {
    it('should validate correct selector', () => {
      const selector = {
        priority: SELECTOR_PRIORITY_MAP.role,
        type: 'role' as const,
        value: 'button',
      };

      const result = policy.validateSelector(selector);

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject invalid selector type', () => {
      const selector = {
        priority: 99,
        type: 'invalid' as any,
        value: 'test',
      };

      const result = policy.validateSelector(selector);

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should reject empty selector value', () => {
      const selector = {
        priority: SELECTOR_PRIORITY_MAP.role,
        type: 'role' as const,
        value: '',
      };

      const result = policy.validateSelector(selector);

      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes('empty'))).toBe(true);
    });
  });

  describe('buildSelectorChain', () => {
    it('should build complete selector chain', () => {
      const primaryLocator = "getByRole('button', { name: 'Submit' })";
      const alternatives = ["getByText('Submit')", "getByTestId('submit-btn')"];

      const result = policy.buildSelectorChain(primaryLocator, alternatives);

      expect(result.primary.type).toBe('role');
      expect(result.fallbacks.length).toBeGreaterThan(0);
      expect(result.stabilityScore).toBeGreaterThan(0);
      expect(result.stabilityScore).toBeLessThanOrEqual(1);
    });

    it('should throw error for invalid primary locator', () => {
      const primaryLocator = ""; // Empty locator

      expect(() => {
        policy.buildSelectorChain(primaryLocator);
      }).toThrow();
    });
  });
});
