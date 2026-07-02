/**
 * AccessFlow SDK — interactive-target-size failure page
 *
 * Single spec validating the UnifiedExamplePage UI and SDK audit alignment
 * for WCAG 2.5.8 Target Size (Minimum) failure examples.
 */

const path = require("path");
const { AccessFlowSDK } = require("@acsbe/accessflow-sdk");
const { expect, test } = require("@playwright/test");

const apiKey = process.env.AF_NODE_PACKAGE_KEY;
if (!apiKey) {
  throw new Error(
    "AF_NODE_PACKAGE_KEY is required. Set it in .env or export it before running Playwright tests.",
  );
}

AccessFlowSDK.init({ apiKey });

const FAILURE_ROUTE = "/engine/interactive-target-size_failure";
const RULE_TITLE =
  /Targets for interactive elements should meet a minimum size/i;

const EXPECTED_FIXTURE_TITLES = [
  "16 by 16 css pixels button inside big button",
  "16 by 16 css pixels button next to big button",
  "links not in a sentence",
];

/** Rule violation keys observed from live SDK audit (includes aliases). */
const TARGET_SIZE_RULE_KEYS = [
  "INTERACTIVE_TARGET_SIZE",
  "interactive-target-size",
  "TARGET_SIZE_MINIMUM",
];

function findTargetSizeViolation(ruleViolations = {}) {
  return Object.entries(ruleViolations).find(([key]) =>
    TARGET_SIZE_RULE_KEYS.some(
      (candidate) =>
        key === candidate ||
        key.toLowerCase().includes("target") ||
        key.toLowerCase().includes("interactive-target-size"),
    ),
  );
}

test("interactive-target-size failure page UI and SDK audit", async ({
  page,
}) => {
  await page.goto(FAILURE_ROUTE);
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(500);

  await expect(
    page.getByRole("heading", { name: RULE_TITLE }),
  ).toBeVisible();
  await expect(page.getByText("Needs Fix", { exact: true })).toBeVisible();
  await expect(page.getByText("10 examples", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Failure Examples" }),
  ).toBeVisible();

  const examplesRegion = page.getByRole("region", {
    name: "failure examples list",
  });
  await expect(examplesRegion).toBeVisible();

  const issueLabels = examplesRegion.getByText("Accessibility Issue");
  await expect(issueLabels).toHaveCount(10);

  for (const title of EXPECTED_FIXTURE_TITLES) {
    await expect(page.getByText(title, { exact: true }).first()).toBeVisible();
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
  expect(totalIssues).toBeGreaterThan(0);

  const ruleViolations = report.ruleViolations || {};
  const [, targetRule] = findTargetSizeViolation(ruleViolations) || [];

  expect(
    targetRule,
    `Expected target-size rule in violations; got keys: ${Object.keys(ruleViolations).join(", ")}`,
  ).toBeTruthy();

  const occurrences =
    targetRule?.numberOfOccurrences ??
    targetRule?.selectors?.length ??
    0;

  expect(occurrences).toBeGreaterThanOrEqual(1);
});
