import { spawnSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

import { PathUtils } from './PathUtils';

const SDK_CONFIG_PATH_IN_TAR = 'package/dist/sdk.config.js';

/**
 * Extract the default base URL from the AccessFlow Node SDK's sdk.config.js
 * inside the published tarball. Used so the test runner can default to the
 * same URL the SDK uses in development (e.g. sdk-export--accessflow--test.acsb-test.com).
 */
export function getNodeSdkDefaultBaseUrl(tgzPath: string): string | null {
  if (!existsSync(tgzPath)) {
    return null;
  }

  try {
    const result = spawnSync('tar', ['-xzf', tgzPath, '-O', SDK_CONFIG_PATH_IN_TAR], {
      encoding: 'utf-8',
      maxBuffer: 64 * 1024,
    });
    if (result.error || result.status !== 0) return null;
    const out = result.stdout || '';

    // RAW_URL is set to either production or dev URL. We want the dev/test one
    // (contains acsb-test.com). Match single-quoted https URLs and pick the test one.
    const urlMatch = out.match(/'https:\/\/[^']+acsb-test\.com[^']*'/);
    if (urlMatch) {
      return urlMatch[0].slice(1, -1).trim();
    }
    // Fallback: any single-quoted https URL (take last one, usually non-prod)
    const allUrls = out.match(/'https:\/\/[^']+'/g);
    if (allUrls && allUrls.length > 0) {
      return allUrls[allUrls.length - 1].slice(1, -1).trim();
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Resolve the Node SDK tarball path for the audit-rules repo.
 * Uses project root so it works regardless of TEST_E2E_DIR.
 */
export function getNodeSdkTarballPath(): string {
  const projectRoot = PathUtils.getProjectRoot();
  return join(projectRoot, 'nodeSDK', 'acsbe-accessflow-sdk.tgz');
}
