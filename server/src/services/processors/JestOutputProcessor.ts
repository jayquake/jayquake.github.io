/**
 * JestOutputProcessor
 *
 * Parses Jest console output (stdout + stderr) to extract test results.
 * Used for Selenium/Jest test runs that don't produce Playwright JSON reports.
 */

import type { PlaywrightProcessorResult, ProcessedTest } from './PlaywrightReportProcessor';

import { DatabaseService } from '../../infrastructure/database/DatabaseService';
import { TestRunRepository } from '../../repositories/TestRunRepository';

export class JestOutputProcessor {
  private testRunRepository: TestRunRepository;

  constructor() {
    const prisma = DatabaseService.getInstance().getClient();
    this.testRunRepository = new TestRunRepository(prisma);
  }

  async process(runId: string): Promise<PlaywrightProcessorResult> {
    console.log(`[JestOutputProcessor] Processing Jest output for run: ${runId}`);

    try {
      const testRun = await this.testRunRepository.findByRunId(runId);
      if (!testRun) {
        return { duration: 0, errors: [`Test run not found: ${runId}`], success: false, tests: [] };
      }

      const output = (testRun.stderr || '') + '\n' + (testRun.stdout || '');
      const tests = this.parseJestOutput(output);
      const duration = this.parseDuration(output);

      console.log(`[JestOutputProcessor] Parsed ${tests.length} tests from Jest output`);

      return {
        duration,
        errors: [],
        success: true,
        tests,
      };
    } catch (error: any) {
      console.error(`[JestOutputProcessor] Processing failed:`, error.message);
      return { duration: 0, errors: [error.message], success: false, tests: [] };
    }
  }

  private parseJestOutput(output: string): ProcessedTest[] {
    const tests: ProcessedTest[] = [];
    const lines = output.split('\n');

    let currentSuite = '';

    for (const line of lines) {
      const trimmed = line.trim();

      // Match suite headers (indented group names without symbols)
      // e.g. "  SDK Initialization" or "  Audit — Home Page"
      const suiteMatch = trimmed.match(/^([A-Z][\w\s\u2014\u2013—–-]+)$/);
      if (suiteMatch && !trimmed.startsWith('✓') && !trimmed.startsWith('✗') && !trimmed.startsWith('×')) {
        currentSuite = suiteMatch[1].trim();
        continue;
      }

      // Match passed test: ✓ test name (Xms) or ✓ test name (X s)
      const passMatch = trimmed.match(/^[✓✔]\s+(.+?)\s+\((\d+(?:\.\d+)?)\s*(ms|s)\)$/);
      if (passMatch) {
        const name = passMatch[1];
        const durationVal = parseFloat(passMatch[2]);
        const unit = passMatch[3];
        const durationMs = unit === 's' ? durationVal * 1000 : durationVal;

        tests.push(this.buildProcessedTest(currentSuite, name, 'passed', durationMs));
        continue;
      }

      // Match failed test: ✗ test name (Xms) or × test name (Xms)
      const failMatch = trimmed.match(/^[✗×✕]\s+(.+?)\s+\((\d+(?:\.\d+)?)\s*(ms|s)\)$/);
      if (failMatch) {
        const name = failMatch[1];
        const durationVal = parseFloat(failMatch[2]);
        const unit = failMatch[3];
        const durationMs = unit === 's' ? durationVal * 1000 : durationVal;

        tests.push(this.buildProcessedTest(currentSuite, name, 'failed', durationMs));
        continue;
      }

      // Match skipped test: ○ skipped test name or ○ test name
      const skipMatch = trimmed.match(/^[○◯]\s+(?:skipped\s+)?(.+?)$/);
      if (skipMatch) {
        tests.push(this.buildProcessedTest(currentSuite, skipMatch[1], 'skipped', 0));
        continue;
      }
    }

    return tests;
  }

  private buildProcessedTest(
    suite: string,
    name: string,
    status: 'failed' | 'passed' | 'skipped',
    durationMs: number,
  ): ProcessedTest {
    const fullTitle = suite ? `${suite} › ${name}` : name;
    return {
      annotations: [],
      artifacts: [],
      duration: durationMs,
      fullTitle,
      startTime: new Date(),
      status,
      steps: [],
      testFile: '',
      title: name,
    };
  }

  private parseDuration(output: string): number {
    const match = output.match(/Time:\s+(\d+(?:\.\d+)?)\s*s/);
    if (match) {
      return parseFloat(match[1]) * 1000;
    }
    return 0;
  }
}
