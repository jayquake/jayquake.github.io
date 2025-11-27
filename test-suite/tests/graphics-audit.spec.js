import { AccessFlowSDK } from "@acsbe/accessflow-sdk";
import { expect, test } from "@playwright/test";

// Initialize AccessFlow SDK with API key
AccessFlowSDK.init({ apiKey: "flow-1OnrCkNQqmwEyaShAow001pAwp8osHaM" });

test.describe("Graphics Audit Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app home page before each test
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    // Allow React to fully render
    await page.waitForTimeout(1000);
  });

  test("should navigate from home to graphics to background images failure and audit", async ({
    page,
  }) => {
    // 1. Navigate to Graphics page
    // Using the specific text from the home page link or href
    const graphicsLink = page.locator('a[href="#/graphics"]').first();
    await expect(graphicsLink).toBeVisible();
    await graphicsLink.click();

    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/.*graphics/);

    // 2. Navigate to Background Images details
    // Using the specific href for Background Images details
    const backgroundImagesLink = page.locator(
      'a[href="#/graphics/background-images"]'
    );
    await expect(backgroundImagesLink).toBeVisible();
    // Programmatically click to avoid overlay issues
    await backgroundImagesLink.dispatchEvent("click");

    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/.*graphics\/background-images/);

    // 3. Navigate to Failure Examples
    // Using the specific href for Failure Examples
    const failureLink = page.locator(
      'a[href="#/graphics/background-images_failure"]'
    );
    await expect(failureLink).toBeVisible();
    await failureLink.dispatchEvent("click");

    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000); // Wait for page content to settle
    await expect(page).toHaveURL(/.*graphics\/background-images_failure/);

    // 4. Perform accessibility audit
    console.log("Starting audit on Background Images Failure page...");
    const sdk = new AccessFlowSDK(page);
    const report = await sdk.audit();

    console.log(
      "Audit completed:",
      report ? "Report generated" : "No report generated"
    );

    // Expect a report to be generated (even if it contains violations, the report object should exist)
    expect(report).toBeTruthy();
  });
});
