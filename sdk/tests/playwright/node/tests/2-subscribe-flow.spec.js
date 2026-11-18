/**
 * Subscribe modal flow — audits after open and after validation error.
 * Report: sdk/tests/accessFlowReports/accessFlow-report.json
 */

const fs = require("fs");
const path = require("path");
const { AccessFlowSDK } = require("@acsbe/accessflow-sdk");
const { expect, test } = require("@playwright/test");

const apiKey =
  process.env.AF_NODE_PACKAGE_KEY || process.env.ACCESSFLOW_SDK_API_KEY;
if (!apiKey) {
  throw new Error(
    "Set AF_NODE_PACKAGE_KEY or ACCESSFLOW_SDK_API_KEY in the repo root .env.",
  );
}

AccessFlowSDK.init({ apiKey });

async function audit(page, testInfo) {
  const sdk = new AccessFlowSDK(page, testInfo);
  return sdk.generateReport(await sdk.audit(), "json");
}

test("subscribe flow", async ({ page }, testInfo) => {
  await page.goto("/demo/subscribe.html");

  await page.locator("#subscribe-open").click();
  await expect(page.locator("#subscribe-modal.open")).toBeVisible();

  const modalReport = await audit(page, testInfo);
  expect(modalReport.numberOfIssuesFound.extreme ?? 0).toBeGreaterThan(0);

  await page.locator("#name").fill("Jane");
  await page.locator("#email").fill("not-an-email");
  await page.locator("#subscribe-submit").click();
  await expect(page.locator("#subscribe-error.shown")).toBeVisible();

  const errorReport = await audit(page, testInfo);
  expect(
    (errorReport.numberOfIssuesFound.extreme ?? 0) +
      (errorReport.numberOfIssuesFound.high ?? 0),
  ).toBeGreaterThan(0);

  const reportJsonPath = path.join(
    testInfo.project.outputDir,
    "accessFlow-report.json",
  );
  expect(fs.existsSync(reportJsonPath)).toBe(true);
});