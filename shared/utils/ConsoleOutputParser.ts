/**
 * ConsoleOutputParser class filters and parses console output
 * to extract relevant test information and remove noise.
 */
export class ConsoleOutputParser {
  private static readonly FILTER_PATTERNS = [
    // Duplicate messages (exact duplicates)
    /^\[qase\]/i,
    /^\[global-setup\]/i,
    /^fatal: ambiguous argument 'HEAD'/i,
    /^Use '--' to separate paths/i,
    /^📊 Trend data saved:/i,
    /^📈 Updating trend history/i,
    /^📂 Trends directory:/i,
    /^🚀 Auto-generating unified report/i,
    /^🔍 Validating Playwright HTML report/i,
    /^✅ Playwright HTML report validated successfully/i,
    /^✅ Unified performance report generated successfully!/i,
    /^📊 Report location:/i,
    /^🌐 Open in browser:/i,
    /^✅ Unified report auto-generated successfully!/i,
    /^📊 Generating trend report/i,
    /^✅ History updated with/i,
    /^📈 Latest:/i,
    /^📊 Build local:/i,
    /^📊 Updating history with latest trend data/i,
    // Filter out Playwright messages that are already parsed and used for structured data
    /^Running\s+\d+\s+tests?\s+using\s+\d+\s+worker/i, // "Running X tests using Y worker" - parsed for test count
    /^\s*[✓✔·•×✗F○]\s+\d+\s+.*›.*\([\d.]+s\)/i, // Test result lines - parsed for test results
    /^Summary:\s+\d+\s+passed/i, // Summary lines - parsed for summary
    /^\s*\d+\s+(passed|failed|skipped)\s+\(/i, // "X passed (Y)" - parsed for summary
    /^\d+\/\d+\s+tests$/i, // "1/1 tests" - progress indicator
    /^\d+%$/i, // "100%" - progress indicator
    // Filter out environment info object (multi-line pattern)
    /^\s*description:/i,
    /^\s*host:/i,
    /^\s*slug:/i,
    /^\s*title:/i,
    /^\s*\}\s*$/,
  ];

  private static readonly TEST_PATTERNS = {
    // Summary patterns: 5 passed (1.8m)
    summary: /^\s*(\d+)\s+(passed|failed|skipped)\s+\((.+?)\)/i,
    // Test file pattern
    testFile: /(?:tests|apps)\/.+?\.spec\.ts/i,
    // Currently-running test: "  [1/3] apps/.../file.spec.ts:9:7 › Test Name"
    testRunning: /^\s*\[(\d+)\/(\d+)\]\s+(.+?)\s+›\s+(.+?)$/i,
    // Test result patterns: ✓/·/× 1 tests/Settings/... › Test Name (19.4s)
    // Also handles duration without decimal: (1s), (40s)
    // Group 1 = status symbol (captured so we match only the symbol, not the whole line)
    testResult: /^\s*([✓✔·•×✗○F])\s+(\d+)\s+(.+?)\s+›\s+(.+?)\s+\((\d+(?:\.\d+)?s)\)/i,
    // Test start patterns
    testStart: /Running\s+(\d+)\s+tests?\s+using\s+(\d+)\s+worker/i,
  };

  private seenLines: Set<string> = new Set();

  /**
   * Strip ANSI escape sequences and normalize line endings (\r\n, \r → \n).
   * Playwright uses \r to overwrite lines in-place; without normalizing, the
   * entire run output appears as a single line and no regex can match it.
   */
  private normalizeOutput(output: string): string {
    // eslint-disable-next-line no-control-regex
    return output
      .replace(/\x1B\[[0-9;]*[mGKHFABCDJsu]/g, '') // Strip ANSI CSI sequences
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n');
  }

  /**
   * Filter out irrelevant console output
   */
  filterOutput(output: string): string {
    const lines = this.normalizeOutput(output).split('\n');
    const filtered: string[] = [];
    let inEnvironmentInfoBlock = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      // Skip empty lines
      if (!trimmed) {
        continue;
      }

      // Detect start of environment info object block
      if (trimmed.match(/^\[qase\] Environment info:/i)) {
        inEnvironmentInfoBlock = true;
        continue;
      }

      // Detect end of environment info object block (closing brace)
      if (inEnvironmentInfoBlock && trimmed.match(/^\s*\}\s*$/)) {
        inEnvironmentInfoBlock = false;
        continue;
      }

      // Skip lines within environment info block
      if (inEnvironmentInfoBlock) {
        continue;
      }

      // Skip duplicate lines across all calls (use instance-level Set)
      if (this.seenLines.has(trimmed)) {
        continue;
      }

      // Skip filtered patterns (messages already parsed and used for structured data)
      const shouldFilter = ConsoleOutputParser.FILTER_PATTERNS.some((pattern) => pattern.test(trimmed));

      if (shouldFilter) {
        // Still add to seenLines to prevent duplicates even if filtered
        this.seenLines.add(trimmed);
        continue;
      }

      // Keep relevant lines
      filtered.push(line);
      this.seenLines.add(trimmed);
    }

    return filtered.join('\n');
  }

  /**
   * Get clean, filtered output for display
   */
  getCleanOutput(rawOutput: string): string {
    return this.filterOutput(rawOutput);
  }

  /**
   * Check if output contains errors
   */
  hasErrors(output: string): boolean {
    const errorPatterns = [/error:/i, /failed/i, /failure/i, /×/, /FAIL/i, /fatal:/i, /timeout/i];

    return errorPatterns.some((pattern) => pattern.test(output));
  }

  /**
   * Extract Qase environment information
   */
  parseQaseInfo(output: string): null | {
    branch?: string;
    environmentHost?: string;
    environmentId?: number;
    environmentSlug?: string;
    environmentTitle?: string;
  } {
    const envIdMatch = output.match(/Environment ID:\s+(\d+)/i);
    const envSlugMatch = output.match(/Environment slug:\s+([^\s]+)/i);
    const envTitleMatch = output.match(/Environment title:\s+([^\n]+)/i);
    const envHostMatch = output.match(/Environment host:\s+([^\s]+)/i);
    const branchMatch = output.match(/Branch:\s+([^\s]+)/i);

    if (!envIdMatch) {
      return null;
    }

    return {
      branch: branchMatch ? branchMatch[1] : undefined,
      environmentHost: envHostMatch ? envHostMatch[1] : undefined,
      environmentId: parseInt(envIdMatch[1], 10),
      environmentSlug: envSlugMatch ? envSlugMatch[1] : undefined,
      environmentTitle: envTitleMatch ? envTitleMatch[1].trim() : undefined,
    };
  }

  /**
   * Parse test execution information from console output
   */
  parseTestExecution(output: string): {
    runningTests: { file: string; name: string; number: number }[];
    summary?: {
      duration: string;
      failed: number;
      passed: number;
      skipped: number;
    };
    testCount?: number;
    tests: {
      duration: number;
      file: string;
      name: string;
      number: number;
      status: 'failed' | 'passed' | 'skipped';
    }[];
    workers?: number;
  } {
    const result: {
      runningTests: { file: string; name: string; number: number }[];
      summary?: {
        duration: string;
        failed: number;
        passed: number;
        skipped: number;
      };
      testCount?: number;
      tests: {
        duration: number;
        file: string;
        name: string;
        number: number;
        status: 'failed' | 'passed' | 'skipped';
      }[];
      workers?: number;
    } = {
      runningTests: [],
      tests: [],
    };

    // Track which test numbers are already completed so we don't re-add them as running
    const completedNumbers = new Set<number>();

    // Normalize before splitting — critical for Playwright's \r-based line updates
    const lines = this.normalizeOutput(output).split('\n');

    for (const line of lines) {
      // Parse "Running N tests using M workers"
      const startMatch = line.match(ConsoleOutputParser.TEST_PATTERNS.testStart);
      if (startMatch) {
        result.testCount = parseInt(startMatch[1], 10);
        result.workers = parseInt(startMatch[2], 10);
        continue;
      }

      // Parse completed test result: ✓/·/× N file › Name (Xs)
      const testMatch = line.match(ConsoleOutputParser.TEST_PATTERNS.testResult);
      if (testMatch) {
        // Group 1 is the captured symbol — check ONLY the symbol character, not the
        // whole line, to avoid false-positive "failed" when the test name contains "F".
        const symbol = testMatch[1];
        const passSymbols = new Set(['✓', '✔', '·', '•']);
        const failSymbols = new Set(['×', '✗', 'F']);
        const status: 'failed' | 'passed' | 'skipped' =
          passSymbols.has(symbol) ? 'passed'
          : failSymbols.has(symbol) ? 'failed'
          : 'skipped';

        // Groups shifted by 1 now that symbol is group 1
        const number = parseInt(testMatch[2], 10);
        const rawPath = testMatch[3];
        const fileMatch = rawPath.match(ConsoleOutputParser.TEST_PATTERNS.testFile);
        const name = testMatch[4].trim();

        // Parse duration — strip trailing 's' and convert to float seconds
        const durationStr = testMatch[5].replace(/s$/, '');
        const duration = parseFloat(durationStr);

        completedNumbers.add(number);
        result.tests.push({
          duration: isNaN(duration) ? 0 : duration,
          file: fileMatch ? fileMatch[0] : rawPath,
          name,
          number,
          status,
        });
        continue;
      }

      // Parse currently-running test: [N/M] file › Name
      const runningMatch = line.match(ConsoleOutputParser.TEST_PATTERNS.testRunning);
      if (runningMatch) {
        const number = parseInt(runningMatch[1], 10);
        const rawPath = runningMatch[3];
        const fileMatch = rawPath.match(ConsoleOutputParser.TEST_PATTERNS.testFile);

        if (!completedNumbers.has(number)) {
          result.runningTests.push({
            file: fileMatch ? fileMatch[0] : rawPath,
            name: runningMatch[4].trim(),
            number,
          });
        }
        continue;
      }

      // Parse summary line: "1 failed (40.3s)"
      const summaryMatch = line.match(ConsoleOutputParser.TEST_PATTERNS.summary);
      if (summaryMatch) {
        if (!result.summary) {
          result.summary = {
            duration: summaryMatch[3],
            failed: 0,
            passed: 0,
            skipped: 0,
          };
        }

        const count = parseInt(summaryMatch[1], 10);
        const type = summaryMatch[2].toLowerCase() as 'failed' | 'passed' | 'skipped';
        result.summary[type] = count;
      }
    }

    return result;
  }
}
