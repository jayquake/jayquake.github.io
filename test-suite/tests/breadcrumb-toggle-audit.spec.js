import { AccessFlowSDK } from "@acsbe/accessflow-sdk";
import { expect, test } from "@playwright/test";

// Initialize AccessFlow SDK with API key
AccessFlowSDK.init({ apiKey: "flow-1feqblr70T6lwaYnSpg000v0TC6BWCl6p9" });

test.describe("Breadcrumbs with Accessibility Audits", () => {
  test("should navigate from failure to success page using breadcrumb dropdown and audit both", async ({
    page,
  }) => {
    // Navigate to the failure page
    await page.goto("/#/graphics/background-images_failure");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    // Verify we're on the failure page
    await expect(page).toHaveURL(/.*background-images_failure/);

    // Initialize SDK for the failure page
    const sdk = new AccessFlowSDK(page);

    // Run accessibility audit on the FAILURE page
    console.log("🔍 Running audit on FAILURE page...");
    const failureReport = await sdk.audit();
    console.log(
      "✅ Failure page audit completed:",
      failureReport ? "Success" : "No report",
    );

    // Locate the breadcrumb dropdown (Select component with MenuItem values)
    // Based on CustomizedBreadCrumbs.jsx and ruleBreadcrumb.jsx
    const breadcrumbSelect = page
      .locator('[role="combobox"]')
      .filter({ hasText: /failure|success/i })
      .first();

    // Verify the dropdown is currently showing "failure"
    await expect(breadcrumbSelect).toBeVisible({ timeout: 10000 });
    await expect(breadcrumbSelect).toContainText(/failure/i);

    // Click the dropdown to open it
    console.log("🖱️  Opening breadcrumb dropdown...");
    await breadcrumbSelect.click();
    await page.waitForTimeout(500);

    // Select the "Success" option from the dropdown
    // The MenuItem has value="success" and text "Success"
    const successOption = page
      .locator('[role="option"]')
      .filter({ hasText: /^Success$/i });

    console.log("🖱️  Selecting SUCCESS option...");
    await expect(successOption).toBeVisible({ timeout: 5000 });
    await successOption.click();

    // Wait for navigation to complete
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    // Verify we navigated to the success page
    await expect(page).toHaveURL(/.*background-images_success/);
    console.log("✅ Successfully navigated to SUCCESS page");

    // Run accessibility audit on the SUCCESS page
    console.log("🔍 Running audit on SUCCESS page...");
    const successReport = await sdk.audit();
    console.log(
      "✅ Success page audit completed:",
      successReport ? "Success" : "No report",
    );

    // Verify both audits were completed
    expect(failureReport).toBeDefined();
    expect(successReport).toBeDefined();

    console.log("\n📊 Summary:");
    console.log("   • Failure page audit: ✅ Completed");
    console.log("   • Breadcrumb navigation: ✅ Working");
    console.log("   • Success page audit: ✅ Completed");
  });

  test("should navigate from success back to failure using breadcrumb", async ({
    page,
  }) => {
    // Start on the success page
    await page.goto("/#/graphics/background-images_success");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    // Verify we're on the success page
    await expect(page).toHaveURL(/.*background-images_success/);

    // Initialize SDK
    const sdk = new AccessFlowSDK(page);

    // Run audit on success page
    console.log("🔍 Auditing SUCCESS page...");
    const successAudit = await sdk.audit();
    console.log("✅ Success audit:", successAudit ? "Complete" : "No report");

    // Locate and click the breadcrumb dropdown
    const breadcrumbSelect = page
      .locator('[role="combobox"]')
      .filter({ hasText: /failure|success/i })
      .first();

    await expect(breadcrumbSelect).toBeVisible({ timeout: 10000 });
    await expect(breadcrumbSelect).toContainText(/success/i);

    console.log("🖱️  Opening breadcrumb dropdown...");
    await breadcrumbSelect.click();
    await page.waitForTimeout(500);

    // Select "Failure" option
    const failureOption = page
      .locator('[role="option"]')
      .filter({ hasText: /^Failure$/i });

    console.log("🖱️  Selecting FAILURE option...");
    await expect(failureOption).toBeVisible({ timeout: 5000 });
    await failureOption.click();

    // Wait for navigation
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    // Verify navigation to failure page
    await expect(page).toHaveURL(/.*background-images_failure/);
    console.log("✅ Successfully navigated to FAILURE page");

    // Run audit on failure page
    console.log("🔍 Auditing FAILURE page...");
    const failureAudit = await sdk.audit();
    console.log("✅ Failure audit:", failureAudit ? "Complete" : "No report");

    // Verify both audits completed
    expect(successAudit).toBeDefined();
    expect(failureAudit).toBeDefined();

    console.log("\n📊 Reverse navigation successful! Audits completed.");
  });

  test("should audit multiple rule pages via breadcrumb navigation", async ({
    page,
  }) => {
    const auditResults = [];

    // Test multiple rules
    const rules = [
      { name: "Background Images", path: "/graphics/background-images" },
      { name: "Alt Text", path: "/graphics/alt-text" },
      { name: "Decorative Content", path: "/graphics/decorative-content" },
    ];

    for (const rule of rules) {
      // Navigate to failure page
      await page.goto(`/#${rule.path}_failure`);
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(800);

      const sdk = new AccessFlowSDK(page);

      // Audit failure page
      console.log(`\n🔍 Auditing ${rule.name} - FAILURE...`);
      const failureAudit = await sdk.audit();

      // Navigate to success via breadcrumb
      const breadcrumbSelect = page
        .locator('[role="combobox"]')
        .filter({ hasText: /failure|success/i })
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

          // Audit success page
          console.log(`🔍 Auditing ${rule.name} - SUCCESS...`);
          const successAudit = await sdk.audit();

          auditResults.push({
            rule: rule.name,
            failureAudit: !!failureAudit,
            successAudit: !!successAudit,
          });

          console.log(`✅ ${rule.name}: Both audits completed`);
        }
      }
    }

    // Verify all audits completed
    console.log("\n📊 Audit Results Summary:");
    auditResults.forEach((result) => {
      console.log(
        `   • ${result.rule}: Failure ${
          result.failureAudit ? "✅" : "❌"
        }, Success ${result.successAudit ? "✅" : "❌"}`,
      );
    });

    expect(auditResults.length).toBeGreaterThan(0);
    expect(auditResults.every((r) => r.failureAudit && r.successAudit)).toBe(
      true,
    );
  });
});
