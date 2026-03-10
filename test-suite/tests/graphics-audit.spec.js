import { AccessFlowSDK } from "@acsbe/accessflow-sdk";
import { expect, test } from "@playwright/test";

// Initialize AccessFlow SDK with API key
AccessFlowSDK.init({ apiKey: process.env.AF_NODE_PACKAGE_KEY || process.env.AF_Node_Package_Key || "flow-1TmAHDBGjDGX4aadlA0000VdvvxVnhZfP2" });

test.describe("Graphics Audit Tests with SDK", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
  });

  test("should perform audits across multiple states on background images page", async ({
    page,
  }) => {
    const auditResults = [];
    const sdk = new AccessFlowSDK(page);

    const performAudit = async (context) => {
      console.log(`Starting audit for context: ${context}`);
      const report = await sdk.audit();
      auditResults.push({ context, report });
      expect(report).toBeTruthy();
      console.log(`Audit completed for ${context}`);
    };

    // Navigate directly to the failure page (sidebar is now a tree view, not anchor links)
    await page.goto("/graphics/background-images_failure");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(/.*graphics\/background-images_failure/);

    // State 1: Initial Load (Failure Page)
    await performAudit("Initial Failure Page");

    // State 2: Open Modal (Notifications)
    const notificationButton = page
      .locator("button")
      .filter({ has: page.locator('svg[data-testid="NotificationsIcon"]') })
      .first();
    if (await notificationButton.isVisible()) {
      await notificationButton.click();
      await page.waitForTimeout(500);
      await performAudit("Notifications Modal Open");

      await page.keyboard.press("Escape");
      await page.waitForTimeout(500);
    } else {
      console.log("Notification button not found, skipping modal audit");
    }

    // State 3: Expand/Collapse Sidebar
    const closeSidebarButton = page
      .locator("button")
      .filter({ has: page.locator('svg[data-testid="ChevronLeftIcon"]') })
      .first();

    if (await closeSidebarButton.isVisible()) {
      await closeSidebarButton.click();
      await page.waitForTimeout(500);
      await performAudit("Sidebar Collapsed");

      const openSidebarButton = page
        .locator("button")
        .filter({ has: page.locator('svg[data-testid="MenuIcon"]') })
        .first();
      if (await openSidebarButton.isVisible()) {
        await openSidebarButton.click();
        await page.waitForTimeout(500);
        await performAudit("Sidebar Expanded");
      }
    } else {
      console.log("Sidebar toggle not found, skipping sidebar audit");
    }

    // State 4: Navigate to Success Page
    await page.goto("/graphics/background-images_success");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(/.*graphics\/background-images_success/);

    await performAudit("Success Page");

    // Verification
    console.log("Total audits performed:", auditResults.length);
    expect(auditResults.length).toBeGreaterThan(1);

    const violationCounts = auditResults.map((r) => ({
      context: r.context,
      violations: r.report?.violations ? r.report.violations.length : 0,
    }));
    console.log(
      "Violation counts by context:",
      JSON.stringify(violationCounts, null, 2),
    );
  });
});
