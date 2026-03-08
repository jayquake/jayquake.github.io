import { existsSync, mkdirSync, unlinkSync, writeFileSync } from 'fs';
import { join } from 'path';

import type { Project, TestRunConfig } from '../../../../shared/types';

import { PathUtils } from '../utils/PathUtils';

export class ConfigManager {
  private tempConfigDir: string;

  constructor(tempConfigDir: string = join(__dirname, '../../../.temp-configs')) {
    this.tempConfigDir = tempConfigDir;
  }

  buildConfigContent(project: Project, config: TestRunConfig, runId?: string): string {
    const headless = config.headless ?? false; // Default to showing browser
    const workers = config.workers ?? 1;
    const timeout = config.timeout ?? 120_000;
    const slowMo = config.slowMo ?? 0;

    // All paths are now relative to test-e2e root (standardized approach)
    // ProjectManager keeps paths relative, we use them directly
    const testE2eDir = PathUtils.getTestE2eDir();
    console.log(`[ConfigManager] testE2eDir: ${testE2eDir}`);
    console.log(`[ConfigManager] project.testDirectory: ${project.testDirectory}`);
    console.log(`[ConfigManager] project.globalSetupPath: ${project.globalSetupPath}`);

    // Validate and normalize testDir (must be relative to test-e2e root)
    let testDir: string;
    if (project.testDirectory.startsWith('/')) {
      // If absolute, this is a configuration error - paths should be relative
      throw new Error(
        `Invalid testDirectory: ${project.testDirectory} is absolute. ` +
          `Project paths must be relative to test-e2e root (e.g., "apps/accessFlow/tests").`,
      );
    } else {
      // Already relative - normalize and validate
      testDir = PathUtils.normalizeRelativePath(project.testDirectory);

      // Validate path exists
      PathUtils.validatePathExists(testDir, `Test directory for project ${project.id}`);
    }

    // Validate and normalize globalSetupPath (must be relative to test-e2e root)
    let globalSetupRelativePath: null | string = null;
    if (project.globalSetupPath) {
      if (project.globalSetupPath.startsWith('/')) {
        // If absolute, this is a configuration error
        throw new Error(
          `Invalid globalSetupPath: ${project.globalSetupPath} is absolute. ` +
            `Project paths must be relative to test-e2e root (e.g., "apps/accessFlow/global-setup.ts").`,
        );
      } else {
        // Already relative - normalize and validate
        globalSetupRelativePath = PathUtils.normalizeRelativePath(project.globalSetupPath);

        // Validate path exists
        PathUtils.validatePathExists(globalSetupRelativePath, `Global setup path for project ${project.id}`);
      }
    }

    console.log(`[ConfigManager] Final testDir: ${testDir}`);
    console.log(`[ConfigManager] Final globalSetupRelativePath: ${globalSetupRelativePath}`);

    // Build reporter configuration - use absolute paths for custom reporters to avoid resolution issues
    // Use organized reports folder structure in project root
    // Note: runId already includes "run-" prefix (e.g., "run-1767821061607-8jdpw")
    // Note: Trend reporter is excluded for standalone-app as it's primarily for CI analytics
    // The standalone-app has its own database storage and reporting system

    // IMPORTANT: HTML reports are stored in the project root at reports/html/{runId}/
    // This ensures reports are accessible from the project root location
    const projectRoot = PathUtils.getProjectRoot();
    const reportFolder = runId ? join(projectRoot, 'reports', 'html', runId) : join(projectRoot, 'reports', 'html');

    // IMPORTANT: HTML reporter is ALWAYS enabled by default for all test runs
    // This ensures every test run generates an interactive HTML report with screenshots, videos, and traces
    // Reports are stored in {projectRoot}/reports/html/{runId}/ and accessible via the ResultsView UI
    const reporters: string[] = [
      "['list']",
      `['html', { outputFolder: ${JSON.stringify(reportFolder)}, open: 'never' }]`,
      "['json', { outputFile: 'reports/json/test-results.json' }]",
      // Trend reporter removed - not needed for standalone-app (designed for CI analytics)
      "['junit', { outputFile: 'reports/junit/results.xml' }]",
    ];

    // Add Qase reporter if configured
    // Note: Environment will be set by global-setup before reporter initializes
    // The qase-reporter-wrapper reads from process.env.QASE_ENVIRONMENT_ID at runtime
    if (config.qaseConfig?.enabled && config.qaseConfig.apiToken && config.qaseConfig.projectCode) {
      // Use a simple config - the reporter wrapper will read environment from process.env
      // which is set by global-setup before the reporter initializes
      // Create Qase reporter config similar to main playwright.config.ts
      // Use a getter function to read environment from process.env at runtime
      // This ensures global-setup has already set QASE_ENVIRONMENT_ID
      const qaseReporterConfig = `(() => {
        const config = {
          debug: false,
          testops: {
            api: { token: ${JSON.stringify(config.qaseConfig.apiToken)} },
            project: ${JSON.stringify(config.qaseConfig.projectCode)},
            uploadAttachments: ${config.qaseConfig.uploadAttachments !== false},
            run: {
              complete: true,
              title: ${JSON.stringify(config.qaseConfig.runTitle || `Standalone App - ${project.name}`)},
            },
          },
        };
        Object.defineProperty(config, 'environment', {
          get() {
            return process.env.QASE_ENVIRONMENT_ID || process.env.QASE_ENVIRONMENT_NAME || process.env.QASE_ENVIRONMENT || ${JSON.stringify(config.qaseConfig.environment || 'default')};
          },
          enumerable: true,
          configurable: true,
        });
        return config;
      })()`;

      // Use absolute path for qase-reporter-wrapper to avoid resolution issues
      const qaseReporterWrapperPath = join(testE2eDir, 'reporters', 'qase-reporter-wrapper.ts');
      const qaseReporter =
        config.qaseConfig.uploadAttachments !== false ?
          `[${JSON.stringify(qaseReporterWrapperPath)}, ${qaseReporterConfig}]`
        : `['playwright-qase-reporter', ${qaseReporterConfig}]`;
      reporters.push(qaseReporter);
    }

    // Use relative path for globalSetup (consistent with testDir approach)
    // Playwright resolves globalSetup relative to the config file location (test-e2e root)
    // The globalSetupRelativePath is already calculated above and is relative to test-e2e root
    let globalSetup: string;
    if (globalSetupRelativePath) {
      // Use the relative path calculated above
      // Playwright will resolve it relative to the config file (test-e2e root)
      globalSetup = `globalSetup: ${JSON.stringify(globalSetupRelativePath)},`;
      console.log(`[ConfigManager] Using relative globalSetup path: ${globalSetupRelativePath}`);
    } else {
      globalSetup = '';
    }

    // Build test match pattern if specific tests are selected
    // Use **/ prefix for all patterns for consistency and reliability
    // Playwright testMatch patterns are relative to testDir
    const testMatch =
      config.testFiles?.length ?
        config.testFiles
          .map((f) => {
            // Ensure path uses forward slashes
            const normalizedPath = f.replace(/\\/g, '/');
            // Always use **/ prefix - Playwright will match correctly at any depth
            // This is more reliable than trying to determine if file is at root or in subdirectory
            return `**/${normalizedPath}`;
          })
          .join(',')
      : null;

    const testMatchConfig =
      testMatch ?
        `testMatch: [${testMatch
          .split(',')
          .map((t) => JSON.stringify(t.trim()))
          .join(', ')}],`
      : '';

    // HTTP Basic Auth configuration — explicit credentials take priority.
    // Auto-apply test/acsb123 for acsb-test.com environments to match the
    // behaviour of each project's own playwright.config.ts (accessFlow, accessScan, Dashboard
    // all use these credentials for test environments).
    const isAcsbTestEnv = (config.baseUrl || '').includes('acsb-test.com');
    const httpAuthUsername = config.httpAuth?.username || (isAcsbTestEnv ? 'test' : null);
    const httpAuthPassword = config.httpAuth?.password || (isAcsbTestEnv ? 'acsb123' : null);
    const httpAuthConfig =
      httpAuthUsername && httpAuthPassword ?
        `httpCredentials: {
      username: ${JSON.stringify(httpAuthUsername)},
      password: ${JSON.stringify(httpAuthPassword)},
    },`
      : '';

    return `import { defineConfig } from '@playwright/test';

export default defineConfig({
  ${globalSetup}
  testDir: ${JSON.stringify(testDir)},
  ${testMatchConfig}
  timeout: ${timeout},
  expect: { timeout: 10_000 },
  fullyParallel: false,
  retries: 0,
  workers: ${workers},
  
  use: {
    // baseURL comes from user input in the standalone app UI (the website/domain to test)
    // This is the target environment URL entered by the user
    baseURL: ${JSON.stringify(config.baseUrl)},
    ${httpAuthConfig}
    headless: ${headless},
    viewport: { width: 1366, height: 900 },
    trace: 'on-first-retry',
    video: 'retain-on-failure', // Videos will be shown in HTML report for failed tests
    screenshot: 'only-on-failure',
    navigationTimeout: 30_000,
    actionTimeout: 15_000,
    testIdAttribute: 'data-testid',
    contextOptions: {
      ignoreHTTPSErrors: true,
    },
    launchOptions: {
      slowMo: ${slowMo},
      args: [
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor',
      ],
    },
  },

  reporter: [
    ${reporters.join(',\n    ')}
  ],

  outputDir: 'test-results',
});
`;
  }

  cleanupConfig(runId: string, baseDir?: string): void {
    const targetDir = baseDir || this.tempConfigDir;
    const configPath = join(targetDir, `playwright.config.${runId}.ts`);
    if (existsSync(configPath)) {
      unlinkSync(configPath);
    }
  }

  generatePlaywrightConfig(project: Project, config: TestRunConfig, runId?: string): string {
    return this.buildConfigContent(project, config, runId);
  }

  saveTempConfig(runId: string, configContent: string, baseDir?: string): string {
    const targetDir = baseDir || this.tempConfigDir;
    const configPath = join(targetDir, `playwright.config.${runId}.ts`);

    // Ensure directory exists
    if (!existsSync(targetDir)) {
      mkdirSync(targetDir, { recursive: true });
    }

    try {
      writeFileSync(configPath, configContent, 'utf-8');
      console.log(`[ConfigManager] Saved config file: ${configPath} (${configContent.length} bytes)`);
      // Verify file was created
      if (!existsSync(configPath)) {
        throw new Error(`Config file was not created at ${configPath}`);
      }
      return configPath;
    } catch (error: any) {
      console.error(`[ConfigManager] Error saving config file to ${configPath}:`, error);
      throw error;
    }
  }
}
