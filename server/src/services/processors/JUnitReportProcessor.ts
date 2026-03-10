/**
 * JUnitReportProcessor
 *
 * Processes JUnit/Surefire XML test reports (pytest --junitxml, Maven surefire)
 * into the same ProcessedTest shape used by PlaywrightReportProcessor, so the
 * rest of the post-processing pipeline (DatabasePopulator, etc.) works unchanged.
 */

import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join, resolve } from 'path';

import type { PlaywrightProcessorResult, ProcessedTest } from './PlaywrightReportProcessor';

import { PathUtils } from '../../infrastructure/utils/PathUtils';

export class JUnitReportProcessor {
  async process(
    runId: string,
    outputDirectory: string,
    framework: 'maven' | 'pytest',
  ): Promise<PlaywrightProcessorResult> {
    console.log(`[JUnitReportProcessor] Processing ${framework} report for run: ${runId}`);

    const result: PlaywrightProcessorResult = {
      duration: 0,
      errors: [],
      success: false,
      tests: [],
    };

    try {
      const projectRoot = PathUtils.getProjectRoot();
      const reportPath = this.findReportFile(projectRoot, outputDirectory, framework);

      if (!reportPath) {
        result.errors.push(
          `JUnit XML report not found for run: ${runId} in ${outputDirectory}`,
        );
        console.warn(`[JUnitReportProcessor] No report found, skipping`);
        return result;
      }

      console.log(`[JUnitReportProcessor] Reading report: ${reportPath}`);
      const xmlContent = await readFile(reportPath, 'utf-8');
      result.tests = this.parseJUnitXml(xmlContent);
      result.duration = result.tests.reduce((sum, t) => sum + t.duration, 0);
      result.success = true;

      console.log(`[JUnitReportProcessor] Processed ${result.tests.length} tests`);
    } catch (error: any) {
      result.errors.push(error.message);
      console.error('[JUnitReportProcessor] Processing failed:', error);
    }

    return result;
  }

  private findReportFile(
    projectRoot: string,
    outputDirectory: string,
    framework: 'maven' | 'pytest',
  ): string | null {
    const possiblePaths: string[] = [];

    if (framework === 'pytest') {
      possiblePaths.push(
        join(projectRoot, outputDirectory, 'results.xml'),
        join(projectRoot, 'python-tests', 'test-results', 'results.xml'),
      );
    } else {
      const surefireDir = join(projectRoot, 'java-tests', 'target', 'surefire-reports');
      if (existsSync(surefireDir)) {
        const { readdirSync } = require('fs');
        try {
          const xmlFiles = readdirSync(surefireDir).filter(
            (f: string) => f.startsWith('TEST-') && f.endsWith('.xml'),
          );
          for (const f of xmlFiles) {
            possiblePaths.push(join(surefireDir, f));
          }
        } catch { /* ignore scan errors */ }
      }
      possiblePaths.push(join(projectRoot, outputDirectory, 'results.xml'));
    }

    for (const p of possiblePaths) {
      if (existsSync(p)) return p;
    }

    return null;
  }

  /**
   * Lightweight JUnit XML parser that handles the common subset produced by
   * pytest --junitxml and Maven Surefire without requiring an XML library.
   */
  private parseJUnitXml(xml: string): ProcessedTest[] {
    const tests: ProcessedTest[] = [];
    const testcaseRegex = /<testcase\s+([^>]*?)(?:\/>|>([\s\S]*?)<\/testcase>)/g;

    let match: RegExpExecArray | null;
    while ((match = testcaseRegex.exec(xml)) !== null) {
      const attrs = match[1];
      const body = match[2] || '';

      const name = this.extractAttr(attrs, 'name') || 'unknown';
      const classname = this.extractAttr(attrs, 'classname') || '';
      const time = parseFloat(this.extractAttr(attrs, 'time') || '0');
      const file = this.extractAttr(attrs, 'file') || classname;

      let status: 'failed' | 'passed' | 'skipped' = 'passed';
      let error: string | undefined;

      if (/<failure[\s>]/i.test(body) || /<error[\s>]/i.test(body)) {
        status = 'failed';
        const msgMatch = body.match(/<(?:failure|error)[^>]*?message="([^"]*?)"/);
        const bodyMatch = body.match(/<(?:failure|error)[^>]*?>([\s\S]*?)<\/(?:failure|error)>/);
        error = msgMatch?.[1] || bodyMatch?.[1]?.trim() || 'Test failed';
      } else if (/<skipped/i.test(body)) {
        status = 'skipped';
      }

      tests.push({
        annotations: [],
        artifacts: [],
        duration: Math.round(time * 1000),
        error,
        fullTitle: classname ? `${classname} > ${name}` : name,
        status,
        steps: [
          { category: 'test-start', title: `Test started: ${name}` },
          {
            category: 'test-end',
            duration: Math.round(time * 1000),
            error,
            title: `Test ${status}`,
          },
        ],
        testFile: file,
        title: name,
      });
    }

    return tests;
  }

  private extractAttr(attrs: string, name: string): string | null {
    const regex = new RegExp(`${name}="([^"]*)"`, 'i');
    const match = attrs.match(regex);
    return match ? match[1] : null;
  }
}
