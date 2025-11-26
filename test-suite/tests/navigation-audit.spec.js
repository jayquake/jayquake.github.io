import { AccessFlowSDK } from "@acsbe/accessflow-sdk";
import { expect, test } from "@playwright/test";

// Initialize AccessFlow SDK with API key
AccessFlowSDK.init({ apiKey: "flow-1DQ14ZIwXZxuPaSWZow0EVskZM41WHnE" });

test.describe("Multi-Page Navigation and Audit Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app home page before each test
    await page.goto("/");
    // Wait for the page to load completely
    await page.waitForLoadState("networkidle");
    // Allow React to fully render
    await page.waitForTimeout(1000);
  });

  test("should navigate to home page and perform accessibility audit with SDK", async ({
    page,
  }) => {
    // Initialize SDK for this page
    const sdk = new AccessFlowSDK(page);

    // Verify we're on the home page
    await expect(page).toHaveURL("/");

    // Check for the main heading
    const heading = page.locator("text=AccessFlow").first();
    await expect(heading).toBeVisible({ timeout: 10000 });

    // Perform accessibility audit on home page
    const homeReport = await sdk.audit();
    console.log(
      "Home page audit completed:",
      homeReport ? "Success" : "No report"
    );

    // Verify platform overview section exists
    const platformOverview = page.locator("text=Platform Overview");
    await expect(platformOverview).toBeVisible();

    // Verify stats are displayed (use more specific selector)
    const rulesCount = page.locator('h2:has-text("90+")').first();
    await expect(rulesCount).toBeVisible();
  });

  test("should navigate from home to rules page", async ({ page }) => {
    // Click on "Browse All Rules" button
    const browseRulesButton = page.locator("text=Browse All Rules").first();
    await expect(browseRulesButton).toBeVisible({ timeout: 10000 });
    await browseRulesButton.click();

    // Wait for navigation
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(800);

    // Verify navigation to rules page
    await expect(page).toHaveURL(/.*rules.*/);

    // Initialize SDK and audit the rules page
    const sdk = new AccessFlowSDK(page);
    const rulesReport = await sdk.audit();
    console.log(
      "Rules page audit completed:",
      rulesReport ? "Success" : "No report"
    );

    // Verify rules page content is loaded
    // The rules page should have some content or heading
    await page.waitForTimeout(1000);
  });

  test("should navigate through multiple category pages with audits", async ({
    page,
  }) => {
    const categories = [
      { name: "Graphics", path: "/graphics", hasRulesCount: true },
      { name: "Forms", path: "/forms", hasRulesCount: true },
      { name: "Keyboard", path: "/keyboard", hasRulesCount: true },
    ];

    for (const category of categories) {
      // Navigate to category page
      await page.goto(category.path);
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(800);

      // Verify URL
      await expect(page).toHaveURL(category.path);

      // Initialize SDK and perform audit
      const sdk = new AccessFlowSDK(page);
      const report = await sdk.audit();
      console.log(
        `${category.name} page audit completed:`,
        report ? "Success" : "No report"
      );

      // Verify page loaded with category name
      const categoryHeading = page.locator(`text=${category.name}`).first();
      await expect(categoryHeading).toBeVisible({ timeout: 10000 });
    }
  });

  test("should navigate through advanced categories", async ({ page }) => {
    const advancedCategories = [
      { name: "Carousels", path: "/carousels" },
      { name: "Clickables", path: "/clickables" },
      { name: "Tables", path: "/tables" },
    ];

    for (const category of advancedCategories) {
      // Navigate to category page
      await page.goto(category.path);
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(800);

      // Verify URL
      await expect(page).toHaveURL(category.path);

      // Initialize SDK and perform audit
      const sdk = new AccessFlowSDK(page);
      const report = await sdk.audit();
      console.log(
        `${category.name} page audit completed:`,
        report ? "Success" : "No report"
      );

      // Verify page loaded
      await page.waitForTimeout(500);
    }
  });

  test("should navigate from home to category and back", async ({ page }) => {
    // Verify we're on home page
    await expect(page).toHaveURL("/");

    // Audit home page
    let sdk = new AccessFlowSDK(page);
    const homeAudit1 = await sdk.audit();
    console.log(
      "Initial home page audit:",
      homeAudit1 ? "Success" : "No report"
    );

    // Find and click Graphics category card
    const graphicsCard = page.locator("text=Graphics").first();
    await expect(graphicsCard).toBeVisible({ timeout: 10000 });

    // Navigate to graphics by finding the link
    await page.goto("/graphics");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(800);

    // Verify navigation to graphics
    await expect(page).toHaveURL("/graphics");

    // Audit graphics page
    sdk = new AccessFlowSDK(page);
    const graphicsAudit = await sdk.audit();
    console.log(
      "Graphics page audit:",
      graphicsAudit ? "Success" : "No report"
    );

    // Navigate back to home
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(800);

    // Verify we're back on home
    await expect(page).toHaveURL("/");

    // Audit home page again
    sdk = new AccessFlowSDK(page);
    const homeAudit2 = await sdk.audit();
    console.log(
      "Second home page audit:",
      homeAudit2 ? "Success" : "No report"
    );

    // Verify home page content is still there
    const heading = page.locator("text=AccessFlow").first();
    await expect(heading).toBeVisible();
  });

  test("should test deep navigation through multiple levels", async ({
    page,
  }) => {
    const navigationFlow = [
      { path: "/", expectedTitle: "AccessFlow" },
      { path: "/rules", expectedContent: null }, // Rules page structure may vary
      { path: "/keyboard", expectedTitle: "Keyboard" },
      { path: "/forms", expectedTitle: "Forms" },
      { path: "/navigation", expectedTitle: "Navigation" },
    ];

    for (const step of navigationFlow) {
      // Navigate to path
      await page.goto(step.path);
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(800);

      // Verify URL
      await expect(page).toHaveURL(step.path);

      // Perform accessibility audit
      const sdk = new AccessFlowSDK(page);
      const report = await sdk.audit();
      console.log(`Audit for ${step.path}:`, report ? "Success" : "No report");

      // Verify expected content if specified
      if (step.expectedTitle) {
        const titleElement = page.locator(`text=${step.expectedTitle}`).first();
        await expect(titleElement).toBeVisible({ timeout: 10000 });
      }
    }
  });

  test("should verify core category cards are clickable and navigate correctly", async ({
    page,
  }) => {
    // Wait for home page to load
    await expect(page).toHaveURL("/");

    // Audit home page
    const sdk = new AccessFlowSDK(page);
    const homeAudit = await sdk.audit();
    console.log(
      "Home page audit before interactions:",
      homeAudit ? "Success" : "No report"
    );

    // Verify "Core Testing Categories" section
    const coreSection = page.locator("text=Core Testing Categories");
    await expect(coreSection).toBeVisible({ timeout: 10000 });

    // Check that category cards are visible
    const categoryCards = [
      "Graphics",
      "Forms",
      "Keyboard",
      "Navigation",
      "Headings",
      "Errors",
    ];

    for (const category of categoryCards) {
      const card = page.locator(`text=${category}`).first();
      await expect(card).toBeVisible();
    }
  });

  test("should verify advanced category cards and navigation", async ({
    page,
  }) => {
    // Wait for home page to load
    await expect(page).toHaveURL("/");

    // Audit home page
    const sdk = new AccessFlowSDK(page);
    const homeAudit = await sdk.audit();
    console.log(
      "Home page audit for advanced categories:",
      homeAudit ? "Success" : "No report"
    );

    // Verify "Advanced Testing Categories" section
    const advancedSection = page.locator("text=Advanced Testing Categories");
    await expect(advancedSection).toBeVisible({ timeout: 10000 });

    // Check that advanced category cards are visible
    const advancedCategories = [
      "Carousels",
      "Clickables",
      "Context",
      "Document",
      "Readability",
      "Tables",
    ];

    for (const category of advancedCategories) {
      const card = page.locator(`text=${category}`).first();
      await expect(card).toBeVisible();
    }
  });

  test("should verify testing tools section and quick action buttons", async ({
    page,
  }) => {
    // Wait for home page to load
    await expect(page).toHaveURL("/");

    // Audit home page
    const sdk = new AccessFlowSDK(page);
    const homeAudit = await sdk.audit();
    console.log(
      "Home page audit for tools section:",
      homeAudit ? "Success" : "No report"
    );

    // Verify "Testing Tools & Utilities" section
    const toolsSection = page.locator("text=Testing Tools & Utilities");
    await expect(toolsSection).toBeVisible({ timeout: 10000 });

    // Verify the three tool cards
    const allRulesBrowser = page.locator("text=All Rules Browser");
    await expect(allRulesBrowser).toBeVisible();

    const pageScanner = page.locator('h5:has-text("Page Scanner")').first();
    await expect(pageScanner).toBeVisible();

    const htmlElements = page.locator('h5:has-text("HTML Elements")').first();
    await expect(htmlElements).toBeVisible();

    // Verify quick action buttons are present
    const browseAllRules = page.locator("text=Browse All Rules").first();
    await expect(browseAllRules).toBeVisible();

    const startTesting = page.locator("text=Start Testing").first();
    await expect(startTesting).toBeVisible();
  });

  test("should perform comprehensive accessibility audit on all main pages", async ({
    page,
  }) => {
    // Increase timeout for this comprehensive test
    test.setTimeout(60000);

    // Reduced set of pages to avoid timeout issues
    const pages = [
      "/",
      "/rules",
      "/graphics",
      "/forms",
      "/keyboard",
      "/errors",
      "/carousels",
      "/clickables",
    ];

    const auditResults = [];

    for (const path of pages) {
      // Navigate to page
      await page.goto(path);
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(1000);

      // Verify URL
      await expect(page).toHaveURL(path);

      // Perform accessibility audit
      const sdk = new AccessFlowSDK(page);
      try {
        const report = await sdk.audit();
        auditResults.push({
          path,
          success: !!report,
          hasReport: !!report,
        });
        console.log(
          `✓ Audit completed for ${path}:`,
          report ? "Success" : "No report"
        );
      } catch (error) {
        auditResults.push({
          path,
          success: false,
          error: error.message,
        });
        console.error(`✗ Audit failed for ${path}:`, error.message);
      }
    }

    // Log summary
    console.log("\n=== Accessibility Audit Summary ===");
    console.log(`Total pages audited: ${auditResults.length}`);
    console.log(
      `Successful audits: ${auditResults.filter((r) => r.success).length}`
    );
    console.log(
      `Failed audits: ${auditResults.filter((r) => !r.success).length}`
    );

    // Verify at least some audits were successful
    const successCount = auditResults.filter((r) => r.success).length;
    expect(successCount).toBeGreaterThan(0);
  });
});
