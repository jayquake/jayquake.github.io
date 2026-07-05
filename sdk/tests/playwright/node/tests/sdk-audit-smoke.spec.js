/**
 * AccessFlow SDK — smoke audit for wizard → CI integration
 *
 * Supports hosted fixture URL (accessE2E) or audit-rules engine route.
 */

const { AccessFlowSDK } = require("@acsbe/accessflow-sdk");
const { expect, test } = require("@playwright/test");

const apiKey = process.env.AF_NODE_PACKAGE_KEY;
if (!apiKey) {
  throw new Error(
    "AF_NODE_PACKAGE_KEY is required. Set it in .env or export it before running Playwright tests.",
  );
}

AccessFlowSDK.init({ apiKey });

const fixtureUrl = process.env.SDK_FIXTURE_URL;
const targetRoute =
  fixtureUrl || "/engine/interactive-target-size_failure";

test("SDK audit smoke — fixture page returns violations", async ({ page }) => {
  if (fixtureUrl) {
    await page.goto(fixtureUrl, { waitUntil: "networkidle" });
  } else {
    await page.goto(targetRoute);
    await page.waitForLoadState("networkidle");
  }
  await page.waitForTimeout(500);

  if (fixtureUrl) {
    await expect(
      page.locator('[data-fixture="sdk-audit-template"]'),
      `Expected sdk-audit-template fixture at ${fixtureUrl}. Deploy audit-rules/public/sdk-audit-template.html to jayquake.github.io.`,
    ).toBeVisible();
  }

  const sdk = new AccessFlowSDK(page);
  const report = await sdk.audit();
  expect(report).toBeTruthy();

  const issuesFound = report.numberOfIssuesFound || {};
  const totalIssues =
    (issuesFound.extreme || 0) +
    (issuesFound.high || 0) +
    (issuesFound.serious || 0) +
    (issuesFound.medium || 0) +
    (issuesFound.low || 0);

  const pageTitle = await page.title();
  expect(
    totalIssues,
    `sdk.audit() returned 0 issues for url=${page.url()} title="${pageTitle}". ` +
      `Deploy public/sdk-audit-template.html to jayquake.github.io or unset SDK_FIXTURE_URL to use engine route.`,
  ).toBeGreaterThan(0);
});
