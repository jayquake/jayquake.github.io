// @ts-check
/**
 * Repo-root Playwright entry so the VS Code / Cursor Playwright extension can
 * discover config without `cd sdk/tests` or `-c playwright/node/playwright.config.js`.
 * SDK lane source of truth: sdk/tests/playwright/node/playwright.config.js
 */
const path = require("path");

const sdkConfigDir = path.join(__dirname, "sdk/tests/playwright/node");
const sdkConfig = require(path.join(sdkConfigDir, "playwright.config.js"));

module.exports = {
  ...sdkConfig,
  testDir: path.join(sdkConfigDir, "tests"),
};