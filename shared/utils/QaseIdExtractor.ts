/**
 * QaseIdExtractor - Centralized utility for extracting Qase test case IDs
 *
 * This utility provides a consistent way to extract Qase IDs from test names,
 * titles, error messages, and other text sources across the application.
 *
 * Pattern: qase.id(XXXX) where XXXX is a numeric ID
 * Example: "Test login functionality qase.id(2133)" → 2133
 */
export class QaseIdExtractor {
  /**
   * Regular expression pattern for matching qase.id(XXXX)
   * Case-insensitive to handle various formatting
   */
  private static readonly PATTERN = /qase\.id\((\d+)\)/i;

  /**
   * Extract Qase ID from any text string
   * @param text - Text to search for Qase ID
   * @returns Extracted ID as number, or null if not found
   */
  static extract(text: string): null | number {
    if (!text || typeof text !== 'string') {
      return null;
    }

    const match = text.match(QaseIdExtractor.PATTERN);
    if (match && match[1]) {
      const id = parseInt(match[1], 10);
      return QaseIdExtractor.validate(id) ? id : null;
    }

    return null;
  }

  /**
   * Extract all Qase IDs from text (if multiple exist)
   * @param text - Text to search
   * @returns Array of all found IDs
   */
  static extractAll(text: string): number[] {
    if (!text || typeof text !== 'string') {
      return [];
    }

    const ids: number[] = [];
    const globalPattern = /qase\.id\((\d+)\)/gi;
    let match;

    while ((match = globalPattern.exec(text)) !== null) {
      const id = parseInt(match[1], 10);
      if (QaseIdExtractor.validate(id)) {
        ids.push(id);
      }
    }

    return ids;
  }

  /**
   * Extract and validate Qase ID from text
   * Convenience method that combines extract() and validate()
   * @param text - Text to search for Qase ID
   * @returns Validated ID or null
   */
  static extractAndValidate(text: string): null | number {
    const id = QaseIdExtractor.extract(text);
    return QaseIdExtractor.validate(id) ? id : null;
  }

  /**
   * Extract Qase ID from error message
   * Alias for extract() for semantic clarity
   * @param error - Error message to search
   * @returns Extracted ID as number, or null if not found
   */
  static extractFromError(error: string): null | number {
    return QaseIdExtractor.extract(error);
  }

  /**
   * Extract Qase ID from multiple text sources
   * Returns the first valid ID found, checking sources in order
   * @param texts - Variable number of text strings to search
   * @returns First extracted ID found, or null if none found
   */
  static extractFromMultiple(...texts: string[]): null | number {
    for (const text of texts) {
      if (text) {
        const id = QaseIdExtractor.extract(text);
        if (id !== null) {
          return id;
        }
      }
    }
    return null;
  }

  /**
   * Extract Qase ID from test title
   * Alias for extract() for semantic clarity
   * @param title - Test title to search
   * @returns Extracted ID as number, or null if not found
   */
  static extractFromTitle(title: string): null | number {
    return QaseIdExtractor.extract(title);
  }

  /**
   * Get the Qase ID pattern for use in other contexts
   * @returns The RegExp pattern used for matching
   */
  static getPattern(): RegExp {
    return QaseIdExtractor.PATTERN;
  }

  /**
   * Check if text contains a Qase ID
   * @param text - Text to check
   * @returns true if Qase ID pattern is found
   */
  static hasQaseId(text: string): boolean {
    if (!text || typeof text !== 'string') {
      return false;
    }
    return QaseIdExtractor.PATTERN.test(text);
  }

  /**
   * Validate if a number is a valid Qase ID
   * Valid IDs are positive integers within a reasonable range (1-999999)
   * @param id - ID to validate
   * @returns true if valid, false otherwise
   */
  static validate(id: null | number | undefined): boolean {
    if (id === null || id === undefined) {
      return false;
    }

    if (!Number.isInteger(id)) {
      return false;
    }

    // Valid Qase IDs are positive and within reasonable range
    return id > 0 && id <= 999999;
  }
}
