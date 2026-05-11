module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  // 180s: each Selenium audit can take 30–60s in headless CI; a few suites
  // run multiple audits per test (breadcrumb, init-and-basic-reports), and
  // the previous 60s default was tripping the test-level timeout even when
  // individual driver scripts succeeded.
  testTimeout: 180000,
  setupFiles: ['./jest.polyfill.js'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  globalSetup: './global-setup.js',
  globalTeardown: './global-teardown.js',
  verbose: true,
};
