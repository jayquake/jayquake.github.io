import { existsSync } from 'fs';
import { join } from 'path';

/**
 * ReportPathResolver class handles resolving Playwright HTML report paths
 * with proper fallback logic and path validation.
 * Reports are stored in the project root at reports/html/{runId}/
 */
export class ReportPathResolver {
  private _projectRoot: string;

  constructor(projectRoot: string) {
    this._projectRoot = projectRoot;
  }

  /**
   * Get all possible report paths for debugging
   */
  getAllPossiblePaths(runId: string): string[] {
    return [
      join(this._projectRoot, 'apps', 'accessFlow', 'reports', runId), // accessFlow reports (PRIMARY)
      join(this._projectRoot, 'reports', 'json', 'test-results.json'), // New JSON report
      join(this._projectRoot, `reports/html/${runId}`), // New HTML report (runId has "run-" prefix)
      join(this._projectRoot, `playwright-html-report-${runId}`), // Legacy
      join(this._projectRoot, `playwright-html-report-run-${runId}`), // Legacy
      join(this._projectRoot, 'playwright-html-report'), // Legacy fallback
    ];
  }

  /**
   * Get the full path to JSON report (new organized structure)
   * For new runs: reports/json/test-results.json
   * For legacy HTML reports: {reportPath}/data/report.json
   */
  getReportJsonPath(runId: string, reportPath?: string): string {
    // First check for new JSON report location (in project root)
    const newJsonPath = join(this._projectRoot, 'reports', 'json', 'test-results.json');
    if (existsSync(newJsonPath)) {
      return newJsonPath;
    }

    // Fallback to legacy HTML report structure
    const resolvedPath = reportPath ? this.resolveReportPath(runId, reportPath) : this.resolveReportPath(runId);

    return join(this._projectRoot, resolvedPath, 'data', 'report.json');
  }

  /**
   * Check if report exists
   */
  reportExists(runId: string, reportPath?: string): boolean {
    const jsonPath = this.getReportJsonPath(runId, reportPath);
    return existsSync(jsonPath);
  }

  /**
   * Resolve the actual report path for a given runId
   * Tries multiple possible folder name patterns (new organized structure + legacy)
   * Note: runId already includes "run-" prefix (e.g., "run-1767821061607-8jdpw")
   */
  resolveReportPath(runId: string, defaultPath?: string): string {
    const possiblePaths = [
      `apps/accessFlow/reports/${runId}`, // accessFlow reports directory (PRIMARY)
      `reports/html/${runId}`, // New organized format - runId already has "run-" prefix
      `playwright-html-report-${runId}`, // Legacy format
      `playwright-html-report-run-${runId}`, // Legacy with "run-" prefix
      `reports/html`, // Default fallback (new)
      `playwright-html-report`, // Legacy default fallback
    ];

    // If defaultPath is provided, check it first
    // Reports are stored in project root, so resolve relative to project root
    if (defaultPath) {
      const defaultFullPath = join(this._projectRoot, defaultPath);
      if (existsSync(defaultFullPath)) {
        return defaultPath;
      }
    }

    // Try each possible path (relative to project root)
    for (const path of possiblePaths) {
      const fullPath = join(this._projectRoot, path);
      if (existsSync(fullPath)) {
        return path;
      }
    }

    // If none found, return the accessFlow reports format (will be checked by caller)
    return possiblePaths[0];
  }
}
