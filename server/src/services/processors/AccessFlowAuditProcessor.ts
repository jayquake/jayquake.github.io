/**
 * AccessFlowAuditProcessor
 *
 * Finds and parses AccessFlow SDK audit summary files after a test run.
 * Handles Node, Python, and Java lanes with their respective file patterns.
 */

import { existsSync, readdirSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';

import { PathUtils } from '../../infrastructure/utils/PathUtils';

export type AccessFlowAuditResult = {
  environment: string;
  errors: string[];
  rawAuditPaths: string[];
  sdkType: string;
  severityCounts: { extreme: number; high: number; low: number; medium: number };
  success: boolean;
  summaryData: any;
  thresholdPassed: boolean;
  totalIssues: number;
  totalPages: number;
};

const SUMMARY_FILE_NAMES: Record<string, string[]> = {
  java: ['accessflow-report-summary.json', 'accessFlow-report-summary.json'],
  node: ['accessFlow-report-summary.json', 'accessflow-report-summary.json'],
  python: ['accessflow-local-report.json', 'accessFlow-report-summary.json', 'accessflow-report-summary.json'],
};

const RAW_AUDIT_PATTERNS: Record<string, RegExp[]> = {
  java: [],
  node: [/^accessFlow-raw-audits-.*\.jsonl$/],
  python: [/^aflow-state-local-.*\.jsonl$/, /^accessFlow-raw-audits-.*\.jsonl$/],
};

export class AccessFlowAuditProcessor {
  async process(
    runId: string,
    sdkType: string,
    outputDirectory: string,
    stdout?: string,
  ): Promise<AccessFlowAuditResult> {
    const result: AccessFlowAuditResult = {
      environment: '',
      errors: [],
      rawAuditPaths: [],
      sdkType,
      severityCounts: { extreme: 0, high: 0, low: 0, medium: 0 },
      success: false,
      summaryData: null,
      thresholdPassed: true,
      totalIssues: 0,
      totalPages: 0,
    };

    try {
      const projectRoot = PathUtils.getProjectRoot();
      const outputDir = join(projectRoot, outputDirectory);

      if (!existsSync(outputDir)) {
        result.errors.push(`Output directory not found: ${outputDir}`);
        return result;
      }

      // Find summary file
      const summaryPath = this.findSummaryFile(outputDir, sdkType);
      if (!summaryPath) {
        result.errors.push(`No AccessFlow summary file found in ${outputDir}`);
        return result;
      }

      console.log(`[AccessFlowAuditProcessor] Reading summary: ${summaryPath}`);
      const content = await readFile(summaryPath, 'utf-8');
      const summaryData = JSON.parse(content);
      result.summaryData = summaryData;

      // Aggregate severity counts across all pages
      const pages = summaryData.pages || {};
      result.totalPages = Object.keys(pages).length;

      for (const pageData of Object.values(pages) as any[]) {
        const counts = pageData.numberOfIssuesFound || {};
        result.severityCounts.extreme += counts.extreme || 0;
        result.severityCounts.high += counts.high || 0;
        result.severityCounts.medium += counts.medium || 0;
        result.severityCounts.low += counts.low || 0;
      }

      result.totalIssues =
        result.severityCounts.extreme +
        result.severityCounts.high +
        result.severityCounts.medium +
        result.severityCounts.low;

      // Extract environment from stdout or page URLs
      result.environment = this.extractEnvironment(stdout, pages);

      // Collect raw audit JSONL paths
      result.rawAuditPaths = this.findRawAuditFiles(outputDir, sdkType);

      // Check threshold (extreme or high > 0 means threshold failed)
      result.thresholdPassed =
        result.severityCounts.extreme === 0 && result.severityCounts.high === 0;

      result.success = true;
      console.log(
        `[AccessFlowAuditProcessor] Processed: ${result.totalPages} pages, ${result.totalIssues} issues, ${result.rawAuditPaths.length} raw files`,
      );
    } catch (error: any) {
      result.errors.push(error.message);
      console.error('[AccessFlowAuditProcessor] Processing failed:', error);
    }

    return result;
  }

  private findSummaryFile(outputDir: string, sdkType: string): string | null {
    const fileNames = SUMMARY_FILE_NAMES[sdkType] || SUMMARY_FILE_NAMES.node;

    for (const fileName of fileNames) {
      const filePath = join(outputDir, fileName);
      if (existsSync(filePath)) return filePath;
    }

    // Also check parent directory (some SDKs write to the working dir, not the output dir)
    const parentDir = join(outputDir, '..');
    for (const fileName of fileNames) {
      const filePath = join(parentDir, fileName);
      if (existsSync(filePath)) return filePath;
    }

    return null;
  }

  private findRawAuditFiles(outputDir: string, sdkType: string): string[] {
    const patterns = RAW_AUDIT_PATTERNS[sdkType] || [];
    if (patterns.length === 0) return [];

    try {
      const files = readdirSync(outputDir);
      return files
        .filter((f) => patterns.some((p) => p.test(f)))
        .map((f) => join(outputDir, f));
    } catch {
      return [];
    }
  }

  private extractEnvironment(stdout?: string, pages?: Record<string, any>): string {
    // Try extracting from stdout (SDK logs the verification endpoint)
    if (stdout) {
      const envMatch = stdout.match(
        /verify-sdk-api-key endpoint at https?:\/\/([^\s/]+)/i,
      );
      if (envMatch) return envMatch[1];
    }

    // Fall back to page URLs
    if (pages) {
      const urls = Object.keys(pages);
      if (urls.length > 0) {
        try {
          return new URL(urls[0]).hostname;
        } catch { /* ignore */ }
      }
    }

    return 'local';
  }
}
