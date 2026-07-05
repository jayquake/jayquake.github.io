/**
 * Validates build-time prerender output for aria-controls-has-reference pages.
 * Requires `npm run build` (postbuild prerender) before running in CI/local static mode.
 */

const fs = require("fs");
const path = require("path");
const { AccessFlowSDK } = require("@acsbe/accessflow-sdk");
const { expect, test } = require("@playwright/test");

const repoRoot = path.resolve(__dirname, "..", "..", "..", "..", "..");
const prerenderedPath = path.join(
  repoRoot,
  "build",
  "engine",
  "aria-controls-has-reference_failure",
  "index.html",
);

const apiKey = process.env.AF_NODE_PACKAGE_KEY;
if (!apiKey) {
  throw new Error(
    "AF_NODE_PACKAGE_KEY is required. Set it in .env or export it before running Playwright tests.",
  );
}

AccessFlowSDK.init({ apiKey });

const FAILURE_ROUTE = "/engine/aria-controls-has-reference_failure";
const RULE_TITLE =
  /aria-controls should reference a valid element id/i;

test.describe("aria-controls-has-reference static prerender", () => {
  test.beforeAll(() => {
    test.skip(
      !fs.existsSync(prerenderedPath),
      "Prerendered HTML missing — run npm run build first",
    );
  });

  test("raw HTTP response contains fixture markup without 404 stub", async ({
    request,
  }) => {
    const res = await request.get(FAILURE_ROUTE);
    expect(res.ok()).toBeTruthy();

    const html = await res.text();
    expect(html).not.toContain("Redirecting...");
    expect(html).toContain("data-audit-example");
    expect(html).toContain('role="tab"');
    expect(html).toContain("aria-controls");
  });

  test("live UI shows full interactive example page", async ({ page }) => {
    await page.goto(FAILURE_ROUTE);
    await page.waitForLoadState("networkidle");

    await expect(
      page.getByRole("heading", { name: RULE_TITLE }),
    ).toBeVisible();
    await expect(page.getByText("Rendered Output:").first()).toBeVisible();
    await expect(page.locator("[data-audit-example]").first()).toBeVisible();
  });

  test("SDK audit runs on prerendered failure fixtures", async ({ page }) => {
    await page.goto(FAILURE_ROUTE);
    await page.waitForLoadState("networkidle");
    await expect(page.locator("[data-audit-example]").first()).toBeVisible();

    const sdk = new AccessFlowSDK(page);
    const report = await sdk.audit();
    expect(report).toBeTruthy();
  });
});
