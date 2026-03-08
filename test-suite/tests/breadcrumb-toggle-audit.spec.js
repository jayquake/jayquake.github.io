import { AccessFlowSDK } from "@acsbe/accessflow-sdk";
import { expect, test } from "@playwright/test";

// Initialize AccessFlow SDK with API key
AccessFlowSDK.init({ apiKey: process.env.AF_NODE_PACKAGE_KEY || process.env.AF_Node_Package_Key || "flow-1fTWLuAYJNS4eaa2lQg000i0M6IpSO6ZAW" });

test.describe("Breadcrumbs with Accessibility Audits", () => {
  test("should navigate from failure to success page using breadcrumb dropdown and audit both", async ({
    page,
  }) => {
    await page.goto("/graphics/background-images_failure");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    await expect(page).toHaveURL(/.*background-images_failure/);

    const sdk = new AccessFlowSDK(page);

    console.log("Running audit on FAILURE page...");
    const failureReport = await sdk.audit();
    console.log(
      "Failure page audit completed:",
      failureReport ? "Success" : "No report",
    );

    // The breadcrumb dropdown uses an MUI Select with aria-label
    const breadcrumbSelect = page
      .locator('[aria-label="Select variant type"]')
      .first();

    await expect(breadcrumbSelect).toBeVisible({ timeout: 10000 });

    // Click the dropdown to open it
    console.log("Opening breadcrumb dropdown...");
    await breadcrumbSelect.click();
    await page.waitForTimeout(500);

    // Select the "Success" option
    const successOption = page
      .locator('[role="option"]')
      .filter({ hasText: /^Success$/i });

    console.log("Selecting SUCCESS option...");
    await expect(successOption).toBeVisible({ timeout: 5000 });
    await successOption.click();

    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    await expect(page).toHaveURL(/.*background-images_success/);
    console.log("Successfully navigated to SUCCESS page");

    console.log("Running audit on SUCCESS page...");
    const successReport = await sdk.audit();
    console.log(
      "Success page audit completed:",
      successReport ? "Success" : "No report",
    );

    expect(failureReport).toBeDefined();
    expect(successReport).toBeDefined();
  });

  test("should navigate from success back to failure using breadcrumb", async ({
    page,
  }) => {
    await page.goto("/graphics/background-images_success");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    await expect(page).toHaveURL(/.*background-images_success/);

    const sdk = new AccessFlowSDK(page);

    console.log("Auditing SUCCESS page...");
    const successAudit = await sdk.audit();
    console.log("Success audit:", successAudit ? "Complete" : "No report");

    const breadcrumbSelect = page
      .locator('[aria-label="Select variant type"]')
      .first();

    await expect(breadcrumbSelect).toBeVisible({ timeout: 10000 });

    console.log("Opening breadcrumb dropdown...");
    await breadcrumbSelect.click();
    await page.waitForTimeout(500);

    const failureOption = page
      .locator('[role="option"]')
      .filter({ hasText: /^Failure$/i });

    console.log("Selecting FAILURE option...");
    await expect(failureOption).toBeVisible({ timeout: 5000 });
    await failureOption.click();

    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    await expect(page).toHaveURL(/.*background-images_failure/);
    console.log("Successfully navigated to FAILURE page");

    console.log("Auditing FAILURE page...");
    const failureAudit = await sdk.audit();
    console.log("Failure audit:", failureAudit ? "Complete" : "No report");

    expect(successAudit).toBeDefined();
    expect(failureAudit).toBeDefined();
  });

  test("should audit multiple rule pages via breadcrumb navigation", async ({
    page,
  }) => {
    const auditResults = [];

    const rules = [
      { name: "Background Images", path: "/graphics/background-images" },
      { name: "Alt Text", path: "/graphics/alt-text" },
      { name: "Decorative Content", path: "/graphics/decorative-content" },
    ];

    for (const rule of rules) {
      // Navigate directly to the failure page
      await page.goto(`${rule.path}_failure`);
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(800);

      const sdk = new AccessFlowSDK(page);

      console.log(`\nAuditing ${rule.name} - FAILURE...`);
      const failureAudit = await sdk.audit();

      // Navigate to success via breadcrumb dropdown
      const breadcrumbSelect = page
        .locator('[aria-label="Select variant type"]')
        .first();

      if (await breadcrumbSelect.isVisible()) {
        await breadcrumbSelect.click();
        await page.waitForTimeout(300);

        const successOption = page
          .locator('[role="option"]')
          .filter({ hasText: /^Success$/i });

        if (await successOption.isVisible()) {
          await successOption.click();
          await page.waitForLoadState("networkidle");
          await page.waitForTimeout(800);

          console.log(`Auditing ${rule.name} - SUCCESS...`);
          const successAudit = await sdk.audit();

          auditResults.push({
            rule: rule.name,
            failureAudit: !!failureAudit,
            successAudit: !!successAudit,
          });

          console.log(`${rule.name}: Both audits completed`);
        }
      }
    }

    console.log("\nAudit Results Summary:");
    auditResults.forEach((result) => {
      console.log(
        `   ${result.rule}: Failure ${
          result.failureAudit ? "pass" : "fail"
        }, Success ${result.successAudit ? "pass" : "fail"}`,
      );
    });

    expect(auditResults.length).toBeGreaterThan(0);
    expect(auditResults.every((r) => r.failureAudit && r.successAudit)).toBe(
      true,
    );
  });
});
