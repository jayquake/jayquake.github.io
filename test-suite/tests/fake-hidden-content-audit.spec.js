import { AccessFlowSDK } from "@acsbe/accessflow-sdk";
import { expect, test } from "@playwright/test";

// Initialize AccessFlow SDK with API key
AccessFlowSDK.init({ apiKey: "flow-1OnrCkNQqmwEyaShAow001pAwp8osHaM" });

test.describe("Fake Hidden Content Audit Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app home page before each test
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    // Allow React to fully render
    await page.waitForTimeout(1000);
  });

  test("should perform audits across multiple states on fake hidden content page", async ({
    page,
  }) => {
    const auditResults = [];
    const sdk = new AccessFlowSDK(page);

    // Helper to perform audit and store result
    const performAudit = async (context) => {
      console.log(`Starting audit for context: ${context}`);
      const report = await sdk.audit();
      auditResults.push({ context, report });
      expect(report).toBeTruthy();
      console.log(`Audit completed for ${context}`);
    };

    // 1. Navigate to Errors page
    const errorsLink = page.locator('a[href="#/errors"]').first();
    await expect(errorsLink).toBeVisible();
    await errorsLink.click();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/.*errors/);

    // 2. Navigate to Fake Hidden Content details
    const detailsLink = page.locator('a[href="#/errors/fake-hidden-content"]');
    await expect(detailsLink).toBeVisible();
    await detailsLink.dispatchEvent("click");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/.*errors\/fake-hidden-content/);

    // 3. Navigate to Failure Examples
    const failureLink = page.locator(
      'a[href="#/errors/fake-hidden-content_failure"]'
    );
    await expect(failureLink).toBeVisible();
    await failureLink.dispatchEvent("click");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(/.*errors\/fake-hidden-content_failure/);

    // State 1: Initial Load (Failure Page)
    await performAudit("Initial Failure Page");

    // State 2: Open Modal (Notifications)
    // Finding the notification button by the icon.
    const notificationButton = page
      .locator("button")
      .filter({ has: page.locator('svg[data-testid="NotificationsIcon"]') })
      .first();
    if (await notificationButton.isVisible()) {
      await notificationButton.click();
      await page.waitForTimeout(500); // Wait for modal to appear
      await performAudit("Notifications Modal Open");

      // Close modal by pressing escape
      await page.keyboard.press("Escape");
      await page.waitForTimeout(500);
    } else {
      console.log("Notification button not found, skipping modal audit");
    }

    // State 3: Expand/Collapse Elements (Sidebar)
    const closeSidebarButton = page
      .locator("button")
      .filter({ has: page.locator('svg[data-testid="ChevronLeftIcon"]') })
      .first();

    if (await closeSidebarButton.isVisible()) {
      // Collapse Sidebar
      await closeSidebarButton.click();
      await page.waitForTimeout(500); // Wait for animation
      await performAudit("Sidebar Collapsed");

      // Re-expand Sidebar
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

    // State 4: Navigate Routes (Go to Success Page)
    // Navigate back to details page first to find the success link easily
    await page.goto("#/errors/fake-hidden-content");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);

    const successLink = page.locator(
      'a[href="#/errors/fake-hidden-content_success"]'
    );
    if (await successLink.isVisible()) {
      await successLink.dispatchEvent("click");
    } else {
      console.log("Success link not visible, trying direct navigation");
      await page.goto("#/errors/fake-hidden-content_success");
    }

    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(/.*errors\/fake-hidden-content_success/);

    await performAudit("Success Page");

    // Verification
    console.log("Total audits performed:", auditResults.length);
    expect(auditResults.length).toBeGreaterThan(1);

    // Comparison logic
    const violationCounts = auditResults.map((r) => ({
      context: r.context,
      violations: r.report.violations ? r.report.violations.length : 0,
    }));
    console.log(
      "Violation counts by context:",
      JSON.stringify(violationCounts, null, 2)
    );
  });
});
