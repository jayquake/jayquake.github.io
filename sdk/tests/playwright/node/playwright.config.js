// @ts-check
const path = require('path');
const dotenv = require('dotenv');
const { defineConfig, devices } = require('@playwright/test');

// This config lives in sdk/tests/playwright/node/, so the repo root (where
// `build/` and `package.json` live) is four levels up. Previously this was
// `path.join(__dirname, '..')` which pointed at sdk/tests/playwright/ — so
// `npx serve -s build` ran from a directory with no build/ folder, never
// bound a port, and the webServer block silently timed out.
const repoRoot = path.resolve(__dirname, '..', '..', '..', '..');
dotenv.config({ path: path.join(repoRoot, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  /* Global teardown to generate and upload audit summaries */
  globalTeardown: require.resolve('./global-teardown'),
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:3003',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'chromium-custom-output',
      use: { ...devices['Desktop Chrome'] },
      outputDir: './custom-test-output',
      testMatch: /custom-output-dir\.spec\.js/,
    },


    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Dev server runs from repo root (this config lives in sdk/tests/playwright/node/). CI serves the production build. */
  webServer: process.env.CI
    ? {
        // No -s flag: prerendered build/engine/*/index.html must be served as static files
        // (GitHub Pages behavior). SPA -s mode always returns root index.html.
        command: 'npx serve build -l 3003',
        url: 'http://localhost:3003',
        cwd: repoRoot,
        reuseExistingServer: false,
        // 180s: `npx serve` cold-installs serve@14 on the runner before
        // binding the port; default 60s timed out every CI run.
        timeout: 180_000,
      }
    : {
        command: 'npm start',
        url: 'http://localhost:3003',
        cwd: repoRoot,
        reuseExistingServer: true,
        timeout: 120_000,
      },
});


