/**
 * AccessFlowAuditProcessor
 *
 * Finds and parses AccessFlow SDK audit summary files after a test run.
 * Falls back to building a summary from raw JSONL audit files when no
 * pre-generated summary exists (e.g. Selenium runs).
 */

import { existsSync, readdirSync, statSync } from 'fs';
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
  java: [/^accessFlow-raw-audits-.*\.jsonl$/],
  node: [/^accessFlow-raw-audits-.*\.jsonl$/],
  python: [/^aflow-state-local-.*\.jsonl$/, /^accessFlow-raw-audits-.*\.jsonl$/],
};

/**
 * Maps raw audit rule keys to human-readable metadata.
 * Severity levels sourced from the AccessFlow SDK classification engine.
 */
const RULE_META: Record<string, { description: string; name: string; severity: string; wcagLink?: string }> = {
  altText: { description: 'Images should have meaningful alt text', name: 'Alt Text', severity: 'extreme', wcagLink: 'https://www.w3.org/WAI/WCAG21/quickref/#non-text-content' },
  ambiguousLinks: { description: 'Links should have unique, descriptive text', name: 'Ambiguous Links', severity: 'medium' },
  ariaLabelMisuse: { description: 'ARIA labels should be correctly applied', name: 'ARIA Label Misuse', severity: 'high' },
  backgroundImages: { description: 'Background images with content should have text alternatives', name: 'Background Images', severity: 'high' },
  breadcrumbs: { description: 'Breadcrumb navigation should be properly structured', name: 'Breadcrumbs', severity: 'low' },
  brokenAriaLabels: { description: 'ARIA labels should reference existing elements', name: 'Broken ARIA Labels', severity: 'high' },
  brokenAriaReference: { description: 'ARIA references should point to valid IDs', name: 'Broken ARIA Reference', severity: 'high' },
  brokenList: { description: 'Lists should be properly structured', name: 'Broken List', severity: 'medium' },
  brokenNavItems: { description: 'Navigation items should be accessible', name: 'Broken Nav Items', severity: 'high' },
  colorContrast: { description: 'Text and background should have sufficient contrast', name: 'Color Contrast', severity: 'medium', wcagLink: 'https://www.w3.org/WAI/WCAG21/quickref/#contrast-minimum' },
  decorativeContent: { description: 'Decorative elements should be hidden from assistive technology', name: 'Decorative Content', severity: 'low' },
  emptyHeadings: { description: 'Headings should not be empty', name: 'Empty Headings', severity: 'medium' },
  fontSizes: { description: 'Font sizes should provide a readable experience', name: 'Font Sizes', severity: 'medium' },
  headingOrder: { description: 'Heading levels should follow a logical order', name: 'Heading Order', severity: 'medium' },
  pageTitle: { description: 'Pages should have a descriptive title', name: 'Page Title', severity: 'extreme', wcagLink: 'https://www.w3.org/WAI/WCAG21/quickref/#page-titled' },
  tabIndex: { description: 'Tab index values should be used correctly', name: 'Tab Index', severity: 'medium' },
  missingFormLabels: { description: 'Form inputs should have associated labels', name: 'Missing Form Labels', severity: 'extreme', wcagLink: 'https://www.w3.org/WAI/WCAG21/quickref/#labels-or-instructions' },
  languageAttribute: { description: 'The HTML element should have a valid lang attribute', name: 'Language Attribute', severity: 'extreme' },
};

export class AccessFlowAuditProcessor {
  async process(
    runId: string,
    sdkType: string,
    outputDirectory: string,
    stdout?: string,
    runStartTime?: Date,
    workingDirectory?: string,
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

      // Collect raw audit JSONL paths (needed regardless of summary source)
      result.rawAuditPaths = this.findRawAuditFiles(outputDir, sdkType, runStartTime);

      // Try the pre-generated summary file first
      const summaryPath = this.findSummaryFile(outputDir, sdkType);

      if (summaryPath) {
        console.log(`[AccessFlowAuditProcessor] Reading summary: ${summaryPath}`);
        const content = await readFile(summaryPath, 'utf-8');
        result.summaryData = JSON.parse(content);
      } else if (result.rawAuditPaths.length > 0) {
        console.log(
          `[AccessFlowAuditProcessor] No summary file found, building from ${result.rawAuditPaths.length} raw JSONL files`,
        );
        result.summaryData = await this.buildSummaryFromRawFiles(result.rawAuditPaths);
      } else {
        result.errors.push(`No AccessFlow summary or raw audit files found in ${outputDir}`);
        return result;
      }

      // Embed accessflow.config.json into summaryData for threshold display
      const sdkConfig = this.readSdkConfig(projectRoot, outputDirectory, workingDirectory, sdkType);
      if (sdkConfig) {
        result.summaryData.config = sdkConfig;
      }

      // Aggregate severity counts across all pages
      const pages = result.summaryData.pages || {};
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

      result.environment = this.extractEnvironment(stdout, pages);

      // Use config thresholds if available, otherwise fall back to zero-tolerance
      if (sdkConfig?.issuesFoundThreshold) {
        const t = sdkConfig.issuesFoundThreshold;
        result.thresholdPassed =
          result.severityCounts.extreme <= (t.extreme ?? 0) &&
          result.severityCounts.high <= (t.high ?? 0) &&
          result.severityCounts.medium <= (t.medium ?? 0) &&
          result.severityCounts.low <= (t.low ?? 0);
      } else {
        result.thresholdPassed =
          result.severityCounts.extreme === 0 && result.severityCounts.high === 0;
      }

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

  /**
   * Build a summary object (matching the report-summary.json structure) from
   * raw JSONL audit files.  Each line is `{ audit: Record<ruleKey, violations>, url: string }`.
   */
  private async buildSummaryFromRawFiles(
    rawPaths: string[],
  ): Promise<{ pages: Record<string, any> }> {
    const pages: Record<string, { numberOfIssuesFound: Record<string, number>; ruleViolations: Record<string, any> }> = {};

    for (const filePath of rawPaths) {
      try {
        const content = await readFile(filePath, 'utf-8');
        const lines = content.trim().split('\n').filter(Boolean);

        for (const line of lines) {
          let entry: any;
          try { entry = JSON.parse(line); } catch { continue; }

          const url: string = entry.url || 'unknown';
          const audit: Record<string, any> = entry.audit || {};

          if (!pages[url]) {
            pages[url] = {
              numberOfIssuesFound: { extreme: 0, high: 0, low: 0, medium: 0 },
              ruleViolations: {},
            };
          }

          const page = pages[url];

          for (const [ruleKey, violations] of Object.entries(audit)) {
            if (violations == null || typeof violations !== 'object') continue;
            const selectorEntries = Object.entries(violations as Record<string, any>);
            if (selectorEntries.length === 0) continue;

            const meta = RULE_META[ruleKey] || {
              description: '',
              name: this.camelToTitle(ruleKey),
              severity: 'medium',
            };

            if (!page.ruleViolations[ruleKey]) {
              page.ruleViolations[ruleKey] = {
                WCAGLink: meta.wcagLink || '-',
                description: meta.description,
                name: meta.name,
                numberOfOccurrences: 0,
                selectorData: [],
                severity: meta.severity,
              };
            }

            const rv = page.ruleViolations[ruleKey];

            for (const [_selector, detail] of selectorEntries) {
              if (typeof detail !== 'object' || detail == null) continue;
              rv.numberOfOccurrences += detail.occurrences || 1;
              rv.selectorData.push({
                HTML: detail.HTML || '',
                selector: detail.selector || _selector,
                suggestionLabel: detail.suggestionLabel || '',
                suggestionType: detail.suggestionType || '',
              });
            }
          }
        }
      } catch (err: any) {
        console.warn(`[AccessFlowAuditProcessor] Error reading ${filePath}: ${err.message}`);
      }
    }

    // Compute per-page severity counts from the rule violations
    for (const pageData of Object.values(pages)) {
      for (const rv of Object.values(pageData.ruleViolations) as any[]) {
        const sev: string = rv.severity || 'medium';
        if (sev in pageData.numberOfIssuesFound) {
          pageData.numberOfIssuesFound[sev] += rv.numberOfOccurrences;
        }
      }
    }

    return { pages };
  }

  private camelToTitle(key: string): string {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (c) => c.toUpperCase())
      .trim();
  }

  private findSummaryFile(outputDir: string, sdkType: string): string | null {
    const fileNames = SUMMARY_FILE_NAMES[sdkType] || SUMMARY_FILE_NAMES.node;

    for (const fileName of fileNames) {
      const filePath = join(outputDir, fileName);
      if (existsSync(filePath)) return filePath;
    }

    const parentDir = join(outputDir, '..');
    for (const fileName of fileNames) {
      const filePath = join(parentDir, fileName);
      if (existsSync(filePath)) return filePath;
    }

    return null;
  }

  private findRawAuditFiles(outputDir: string, sdkType: string, runStartTime?: Date): string[] {
    const patterns = RAW_AUDIT_PATTERNS[sdkType] || RAW_AUDIT_PATTERNS.node;
    if (patterns.length === 0) return [];

    try {
      const files = readdirSync(outputDir);
      let matched = files
        .filter((f) => patterns.some((p) => p.test(f)))
        .map((f) => join(outputDir, f));

      // When a run start time is available, only include files modified after
      // the run started (with a small buffer) to avoid stale data from prior runs.
      if (runStartTime) {
        const cutoff = new Date(runStartTime.getTime() - 5000);
        matched = matched.filter((f) => {
          try {
            return statSync(f).mtime >= cutoff;
          } catch {
            return false;
          }
        });
      }

      return matched;
    } catch {
      return [];
    }
  }

  /**
   * Locate and read the accessflow.config.json for the project.
   * Searches: working directory, output directory parent, and
   * Java resources path as a fallback.
   */
  private readSdkConfig(
    projectRoot: string,
    outputDirectory: string,
    workingDirectory?: string,
    sdkType?: string,
  ): Record<string, any> | null {
    const CONFIG_NAME = 'accessflow.config.json';
    const candidates: string[] = [];

    if (workingDirectory) {
      candidates.push(join(projectRoot, workingDirectory, CONFIG_NAME));
    }

    // Parent of output directory (e.g. selenium-test-suite/test-results -> selenium-test-suite)
    const outputParent = join(projectRoot, outputDirectory, '..');
    candidates.push(join(outputParent, CONFIG_NAME));

    // Java keeps config in src/test/resources/
    if (sdkType === 'java' && workingDirectory) {
      candidates.push(join(projectRoot, workingDirectory, 'src/test/resources', CONFIG_NAME));
    }

    for (const candidate of candidates) {
      try {
        if (existsSync(candidate)) {
          const { readFileSync } = require('fs');
          const content = readFileSync(candidate, 'utf-8');
          console.log(`[AccessFlowAuditProcessor] Found SDK config: ${candidate}`);
          return JSON.parse(content);
        }
      } catch {
        // continue to next candidate
      }
    }

    return null;
  }

  private extractEnvironment(stdout?: string, pages?: Record<string, any>): string {
    if (stdout) {
      const envMatch = stdout.match(
        /verify-sdk-api-key endpoint at https?:\/\/([^\s/]+)/i,
      );
      if (envMatch) return envMatch[1];
    }

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
