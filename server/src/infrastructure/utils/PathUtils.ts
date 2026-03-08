import { existsSync } from 'fs';
import { join, resolve } from 'path';

/**
 * PathUtils - Shared utilities for path resolution
 * Adapted for the audit-rules project structure:
 *   audit-rules/
 *     server/src/infrastructure/utils/PathUtils.ts  (this file)
 *     shared/
 *     mcp/
 *     build/            (CRA production build)
 *     test-suite/       (local Playwright tests)
 */
export class PathUtils {
  /**
   * Get the audit-rules repository root directory.
   * Reports are stored at: {projectRoot}/reports/html/{runId}/
   */
  static getProjectRoot(): string {
    if (process.env.PROJECT_ROOT) {
      if (existsSync(process.env.PROJECT_ROOT)) {
        return resolve(process.env.PROJECT_ROOT);
      }
      console.warn(`[PathUtils] PROJECT_ROOT set but invalid: ${process.env.PROJECT_ROOT}`);
    }

    // From server/src/infrastructure/utils/ -> repo root is 4 levels up
    const repoRoot = resolve(join(__dirname, '../../../..'));
    if (existsSync(join(repoRoot, 'package.json'))) {
      return repoRoot;
    }

    // Fallback: use cwd
    console.warn(`[PathUtils] Could not resolve repo root from __dirname, using cwd`);
    return process.cwd();
  }

  /**
   * Get the directory containing test suites (apps/accessFlow, etc.).
   * This may be a separate checkout (e.g., the AccessE2E project) or the repo root itself.
   */
  static getTestE2eDir(): string {
    if (process.env.TEST_E2E_DIR) {
      const testDir = resolve(process.env.TEST_E2E_DIR);
      if (existsSync(testDir)) {
        return testDir;
      }
      console.warn(`[PathUtils] TEST_E2E_DIR set but invalid: ${process.env.TEST_E2E_DIR}`);
    }

    // Default: use the project root (test-suite/ lives in the repo)
    return this.getProjectRoot();
  }

  static normalizeRelativePath(path: string): string {
    if (path.startsWith('./')) {
      return path.substring(2);
    }
    return path;
  }

  static resolveFromProjectRoot(relativePath: string): string {
    const projectRoot = this.getProjectRoot();
    return resolve(projectRoot, relativePath);
  }

  static resolveFromTestE2e(relativePath: string): string {
    const testE2eDir = this.getTestE2eDir();
    return resolve(testE2eDir, relativePath);
  }

  static validatePathExists(path: string, description: string): void {
    const absolutePath = path.startsWith('/') ? path : this.resolveFromTestE2e(path);
    if (!existsSync(absolutePath)) {
      throw new Error(
        `${description} does not exist\n\n` +
          `Path: ${path}\n` +
          `Resolved to: ${absolutePath}\n` +
          `Test E2E root: ${this.getTestE2eDir()}\n` +
          `Current directory: ${process.cwd()}\n\n` +
          `To fix:\n` +
          `1. Set TEST_E2E_DIR in server/.env to point to the project with test suites\n` +
          `2. Verify the path is correct\n` +
          `3. Check file/directory permissions`,
      );
    }
  }
}
