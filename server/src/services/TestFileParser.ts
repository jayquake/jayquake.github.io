import { readFileSync } from 'fs';
import { join } from 'path';

import { PathUtils } from '../infrastructure/utils/PathUtils';

/**
 * Individual test case information extracted from a test file
 */
export type TestCaseInfo = {
  fullTitle?: string; // Includes describe block title if available
  lineNumber: number;
  qaseId?: number;
  title: string;
}

/**
 * TestFileParser - Parses TypeScript test files to extract individual test cases
 * Uses regex-based parsing for simplicity and performance
 */
export class TestFileParser {
  /**
   * Parse test content and extract test cases
   */
  static parseTestContent(content: string): TestCaseInfo[] {
    const testCases: TestCaseInfo[] = [];
    const lines = content.split('\n');

    // Track describe blocks for full title construction
    const describeStack: string[] = [];
    const currentLine = 0;

    // Pattern to match: test('title', ...) or test("title", ...)
    // Also handles: test.describe('title', ...)
    const testPattern = /test\s*\.?\s*(?:describe|it)?\s*\(\s*['"`]([^'"`]+)['"`]/;
    const describePattern = /test\s*\.\s*describe\s*\(\s*['"`]([^'"`]+)['"`]/;
    const qaseIdPattern = /qase\s*\.\s*id\s*\(\s*(\d+)\s*\)/;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmedLine = line.trim();

      // Check for describe blocks
      const describeMatch = trimmedLine.match(describePattern);
      if (describeMatch) {
        describeStack.push(describeMatch[1]);
        continue;
      }

      // Check for closing describe blocks (simple heuristic: closing brace on its own line)
      if (trimmedLine === '}' && describeStack.length > 0) {
        // Check if this is likely closing a describe block
        // Look ahead a bit to see if we're still in a describe context
        const nextNonEmptyLine = lines.slice(i + 1).find((l) => l.trim().length > 0);
        if (nextNonEmptyLine && !nextNonEmptyLine.includes('test.describe')) {
          describeStack.pop();
        }
      }

      // Check for test cases
      const testMatch = trimmedLine.match(testPattern);
      if (testMatch && !describeMatch) {
        // This is a test case, not a describe block
        const title = testMatch[1];
        const lineNumber = i + 1; // 1-indexed

        // Look for Qase ID in the next few lines (usually right after test declaration)
        let qaseId: number | undefined;
        const searchLines = lines.slice(i, Math.min(i + 10, lines.length));
        for (const searchLine of searchLines) {
          const qaseMatch = searchLine.match(qaseIdPattern);
          if (qaseMatch) {
            qaseId = parseInt(qaseMatch[1], 10);
            break;
          }
        }

        // Build full title with describe blocks
        const fullTitle = describeStack.length > 0 ? `${describeStack.join(' › ')} › ${title}` : title;

        testCases.push({
          fullTitle,
          lineNumber,
          qaseId,
          title,
        });
      }
    }

    return testCases;
  }

  /**
   * Parse a test file and extract all test cases
   */
  static parseTestFile(filePath: string): TestCaseInfo[] {
    try {
      const content = readFileSync(filePath, 'utf-8');
      return this.parseTestContent(content);
    } catch (error) {
      console.warn(`[TestFileParser] Error reading file ${filePath}:`, error);
      return [];
    }
  }

  /**
   * Parse test file by relative path (resolves test dir via PathUtils.resolveTestDirectory)
   */
  static parseTestFileByRelativePath(relativePath: string, projectTestDirectory: string): TestCaseInfo[] {
    const testDirAbsolute =
      projectTestDirectory.startsWith('/')
        ? projectTestDirectory
        : PathUtils.resolveTestDirectory(projectTestDirectory);
    const filePath = join(testDirAbsolute, relativePath);
    return this.parseTestFile(filePath);
  }
}
