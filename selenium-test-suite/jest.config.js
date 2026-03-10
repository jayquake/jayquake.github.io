module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  testTimeout: 60000,
  setupFiles: ['./jest.polyfill.js'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  globalSetup: './global-setup.js',
  globalTeardown: './global-teardown.js',
  verbose: true,
};
