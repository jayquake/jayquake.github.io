/**
 * Simple SDK smoke — public/demo/subscribe.html
 * Report: sdk/tests/accessFlowReports/accessFlow-report.json (sdk-demo project)
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

test("new subscribe page", async ({ page }, testInfo) => {
  await page.goto("/demo/subscribe.html");

  await expect(
    page.getByRole("heading", { name: "Stay in the loop" }),
  ).toBeVisible();

  const sdk = new AccessFlowSDK(page, testInfo);
  const report = await sdk.generateReport(await sdk.audit(), "json");

  const reportJsonPath = path.join(
    testInfo.project.outputDir,
    "accessFlow-report.json",
  );
  expect(
    fs.existsSync(reportJsonPath),
    `Expected SDK report at ${reportJsonPath} (pass "json" to generateReport)`,
  ).toBe(true);

  console.log("Accessibility issues by severity:", report.numberOfIssuesFound);

  expect(report.numberOfIssuesFound.extreme ?? 0).toBe(0);
  expect(report.numberOfIssuesFound.high ?? 0).toBeLessThan(5);
});