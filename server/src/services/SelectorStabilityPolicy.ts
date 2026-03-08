import type { SelectorEntry, SelectorType } from '../../../shared/types';

/**
 * Selector stability policy configuration
 * Defines the ranking and priority for different selector types
 */
export const SELECTOR_PRIORITY_MAP: Record<SelectorType, number> = {
  css: 4, // Low priority - implementation detail
  role: 1, // Highest priority - semantic and accessibility-friendly
  testId: 3, // Medium priority - explicit test identifiers
  text: 2, // High priority - user-visible content
  xpath: 5, // Lowest priority - brittle and verbose
};

/**
 * Selector pattern configuration
 */
export type SelectorPattern = {
  extractValue: (match: RegExpMatchArray) => string;
  pattern: RegExp;
  type: SelectorType;
}

/**
 * Selector patterns for parsing Playwright locators
 */
export const SELECTOR_PATTERNS: SelectorPattern[] = [
  // Role-based selectors
  {
    extractValue: (match) => {
      const [, role, name] = match;
      return name ? `${role}[name="${name}"]` : role;
    },
    pattern: /getByRole\(['"`](\w+)['"`](?:,\s*\{[^}]*name:\s*['"`]([^'"`]+)['"`][^}]*\})?/,
    type: 'role',
  },
  // Text-based selectors
  {
    extractValue: (match) => match[1],
    pattern: /getByText\(['"`]([^'"`]+)['"`]\)/,
    type: 'text',
  },
  // Test ID selectors
  {
    extractValue: (match) => match[1],
    pattern: /getByTestId\(['"`]([^'"`]+)['"`]\)/,
    type: 'testId',
  },
  // Label selectors (treated as text)
  {
    extractValue: (match) => `label:${match[1]}`,
    pattern: /getByLabel\(['"`]([^'"`]+)['"`]\)/,
    type: 'text',
  },
  // Placeholder selectors (treated as text)
  {
    extractValue: (match) => `placeholder:${match[1]}`,
    pattern: /getByPlaceholder\(['"`]([^'"`]+)['"`]\)/,
    type: 'text',
  },
  // CSS locator
  {
    extractValue: (match) => match[1],
    pattern: /locator\(['"`]([^'"`]+)['"`]\)/,
    type: 'css',
  },
];

/**
 * SelectorStabilityPolicy
 * 
 * Implements selector ranking, fallback chain generation, and stability scoring
 * for Playwright locators.
 * 
 * Key responsibilities:
 * - Parse Playwright locators and extract selector information
 * - Rank selectors by stability priority (role > text > testId > css > xpath)
 * - Generate fallback selector chains
 * - Score selectors for stability confidence
 */
export class SelectorStabilityPolicy {
  /**
   * Build a complete selector chain (primary + fallbacks) with validation
   * 
   * @param primaryLocator - Primary locator string to parse
   * @param alternativeLocators - Optional alternative locator strings
   * @returns Object with primary selector and validated fallback chain
   */
  buildSelectorChain(
    primaryLocator: string,
    alternativeLocators?: string[],
  ): { fallbacks: SelectorEntry[]; primary: SelectorEntry; stabilityScore: number } {
    // Parse primary selector
    const primary = this.parseLocator(primaryLocator);

    // Validate primary
    const primaryValidation = this.validateSelector(primary);
    if (!primaryValidation.valid) {
      throw new Error(`Invalid primary selector: ${primaryValidation.errors.join(', ')}`);
    }

    // Parse alternatives
    const alternatives: SelectorEntry[] = [];
    if (alternativeLocators) {
      for (const altLocator of alternativeLocators) {
        const altSelector = this.parseLocator(altLocator);
        const altValidation = this.validateSelector(altSelector);
        if (altValidation.valid) {
          alternatives.push(altSelector);
        }
      }
    }

    // Generate fallback chain
    const fallbacks = this.generateFallbackChain(primary, alternatives);

    // Calculate stability score
    const stabilityScore = this.calculateStabilityScore(primary, fallbacks);

    return { fallbacks, primary, stabilityScore };
  }

  /**
   * Calculate stability score for a selector
   * 
   * Score factors:
   * - Selector type (role > text > testId > css > xpath)
   * - Specificity (more specific = higher score)
   * - Presence of fallbacks (more fallbacks = higher confidence)
   * 
   * @param primary - Primary selector entry
   * @param fallbacks - Fallback selector entries
   * @returns Stability score between 0 and 1
   */
  calculateStabilityScore(primary: SelectorEntry, fallbacks: SelectorEntry[]): number {
    let score = 0;

    // Base score from selector type priority
    // Convert priority (1-5) to score (0.9-0.5)
    const priorityScore = 1.0 - (primary.priority - 1) * 0.1;
    score += priorityScore * 0.6; // 60% weight on selector type

    // Specificity score
    const specificityScore = this.calculateSpecificity(primary);
    score += specificityScore * 0.2; // 20% weight on specificity

    // Fallback coverage score
    const fallbackScore = Math.min(fallbacks.length / 3, 1.0); // Cap at 3 fallbacks
    score += fallbackScore * 0.2; // 20% weight on fallback coverage

    return Math.min(score, 1.0);
  }

  /**
   * Generate fallback selector chain from a primary selector
   * 
   * Strategy:
   * - If primary is role-based, add text-based alternatives
   * - If primary is text-based, add role-based alternatives
   * - Always include CSS/XPath as final fallbacks
   * 
   * @param primary - Primary selector entry
   * @param alternatives - Optional alternative selectors from MCP or other sources
   * @returns Array of fallback selectors in priority order
   */
  generateFallbackChain(
    primary: SelectorEntry,
    alternatives?: SelectorEntry[],
  ): SelectorEntry[] {
    const fallbacks: SelectorEntry[] = [];

    // Add provided alternatives first, ranked by stability
    if (alternatives && alternatives.length > 0) {
      const rankedAlternatives = this.rankSelectors(alternatives);
      // Filter out alternatives with same or lower priority than primary
      const betterAlternatives = rankedAlternatives.filter(
        (alt) => alt.priority < primary.priority && alt.value !== primary.value,
      );
      fallbacks.push(...betterAlternatives);
    }

    // Add synthetic fallbacks based on primary type
    const syntheticFallbacks = this.generateSyntheticFallbacks(primary);
    fallbacks.push(...syntheticFallbacks);

    // Remove duplicates (by value)
    const uniqueFallbacks = this.deduplicateSelectors(fallbacks);

    // Return sorted by priority
    return this.rankSelectors(uniqueFallbacks);
  }

  /**
   * Parse a Playwright locator string and extract selector information
   * 
   * @param locatorString - Raw Playwright locator code
   * @returns Parsed SelectorEntry with type, value, and priority
   */
  parseLocator(locatorString: string): SelectorEntry {
    // Try each pattern in order
    for (const pattern of SELECTOR_PATTERNS) {
      const match = locatorString.match(pattern.pattern);
      if (match) {
        return {
          priority: SELECTOR_PRIORITY_MAP[pattern.type],
          type: pattern.type,
          value: pattern.extractValue(match),
        };
      }
    }

    // Fallback: treat as CSS selector
    return {
      priority: SELECTOR_PRIORITY_MAP.css,
      type: 'css',
      value: locatorString,
    };
  }

  /**
   * Rank multiple selectors by stability priority
   * 
   * @param selectors - Array of selector entries
   * @returns Sorted array with most stable selector first
   */
  rankSelectors(selectors: SelectorEntry[]): SelectorEntry[] {
    return [...selectors].sort((a, b) => {
      // Lower priority number = higher stability
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }
      // If same priority, sort alphabetically for determinism
      return a.value.localeCompare(b.value);
    });
  }

  /**
   * Validate a selector entry for correctness
   * 
   * @param selector - Selector entry to validate
   * @returns Validation result with error messages if any
   */
  validateSelector(selector: SelectorEntry): { errors: string[]; valid: boolean; } {
    const errors: string[] = [];

    // Check type is valid
    if (!SELECTOR_PRIORITY_MAP[selector.type]) {
      errors.push(`Invalid selector type: ${selector.type}`);
    }

    // Check value is not empty
    if (!selector.value || selector.value.trim().length === 0) {
      errors.push('Selector value cannot be empty');
    }

    // Check priority matches type
    const expectedPriority = SELECTOR_PRIORITY_MAP[selector.type];
    if (selector.priority !== expectedPriority) {
      // Allow slight variations for synthetic fallbacks
      const diff = Math.abs(selector.priority - expectedPriority);
      if (diff > 1) {
        errors.push(
          `Selector priority ${selector.priority} does not match expected priority ${expectedPriority} for type ${selector.type}`,
        );
      }
    }

    return {
      errors,
      valid: errors.length === 0,
    };
  }

  /**
   * Calculate specificity score for a selector
   * 
   * @param selector - Selector entry
   * @returns Specificity score between 0 and 1
   */
  private calculateSpecificity(selector: SelectorEntry): number {
    const { type, value } = selector;

    // Role-based selectors with names are most specific
    if (type === 'role' && value.includes('[name=')) {
      return 1.0;
    }

    // Text-based selectors with exact text are highly specific
    if (type === 'text' && value.length > 5) {
      return 0.9;
    }

    // Test IDs are specific
    if (type === 'testId') {
      return 0.85;
    }

    // Generic roles without names are less specific
    if (type === 'role') {
      return 0.7;
    }

    // CSS selectors vary in specificity
    if (type === 'css') {
      // Count selectors/attributes as rough specificity measure
      const selectorCount = (value.match(/[.#[]/g) || []).length;
      return Math.min(0.3 + selectorCount * 0.1, 0.6);
    }

    // XPath is least specific (brittle)
    return 0.2;
  }

  /**
   * Deduplicate selectors by value
   * 
   * @param selectors - Array of selector entries
   * @returns Deduplicated array
   */
  private deduplicateSelectors(selectors: SelectorEntry[]): SelectorEntry[] {
    const seen = new Set<string>();
    return selectors.filter((selector) => {
      const key = `${selector.type}:${selector.value}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  /**
   * Generate synthetic fallback selectors based on primary selector type
   * 
   * @param primary - Primary selector entry
   * @returns Array of synthetic fallback selectors
   */
  private generateSyntheticFallbacks(primary: SelectorEntry): SelectorEntry[] {
    const fallbacks: SelectorEntry[] = [];

    // For role-based selectors, add generic role fallback
    if (primary.type === 'role' && primary.value.includes('[name=')) {
      const roleMatch = primary.value.match(/^(\w+)\[name="([^"]+)"\]$/);
      if (roleMatch) {
        const [, role, name] = roleMatch;
        // Add text-based fallback
        fallbacks.push({
          priority: SELECTOR_PRIORITY_MAP.text,
          type: 'text',
          value: name,
        });
        // Add generic role fallback (without name)
        fallbacks.push({
          priority: SELECTOR_PRIORITY_MAP.role + 0.5, // Slightly lower priority
          type: 'role',
          value: role,
        });
      }
    }

    // For text-based selectors, add CSS fallback with text()
    if (primary.type === 'text') {
      fallbacks.push({
        priority: SELECTOR_PRIORITY_MAP.css,
        type: 'css',
        value: `text="${primary.value}"`,
      });
    }

    // For testId selectors, add CSS fallback with data-testid
    if (primary.type === 'testId') {
      fallbacks.push({
        priority: SELECTOR_PRIORITY_MAP.css,
        type: 'css',
        value: `[data-testid="${primary.value}"]`,
      });
    }

    return fallbacks;
  }
}

// Export singleton instance
export const selectorPolicy = new SelectorStabilityPolicy();
