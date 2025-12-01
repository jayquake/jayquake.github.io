import { AccessFlowSDK } from "@acsbe/accessflow-sdk";
import { expect, test } from "@playwright/test";

// Initialize AccessFlow SDK with API key
AccessFlowSDK.init({ apiKey: "flow-1OnrCkNQqmwEyaShAow001pAwp8osHaM" });

test.describe("Home Page Routes Validation with SDK Audits", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to home page
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
  });

  test("should validate home page and run initial audit", async ({ page }) => {
    // Verify we're on the home page
    await expect(page).toHaveURL("/");

    // Initialize SDK
    const sdk = new AccessFlowSDK(page);

    // Check for main heading
    const mainHeading = page.locator("text=AccessFlow").first();
    await expect(mainHeading).toBeVisible({ timeout: 10000 });

    // Run audit on home page
    console.log("🔍 Running audit on HOME page...");
    const homeAudit = await sdk.audit();
    console.log("✅ Home page audit:", homeAudit ? "Success" : "No report");

    // Verify platform overview exists
    const platformOverview = page.locator("text=Platform Overview");
    await expect(platformOverview).toBeVisible();

    // Verify core categories section
    const coreSection = page.locator("text=Core Testing Categories");
    await expect(coreSection).toBeVisible();

    // Verify advanced categories section
    const advancedSection = page.locator("text=Advanced Testing Categories");
    await expect(advancedSection).toBeVisible();

    expect(homeAudit).toBeTruthy();
  });

  test("should validate all core category headings are present", async ({
    page,
  }) => {
    const coreCategories = [
      "Graphics",
      "Forms",
      "Keyboard",
      "Navigation",
      "Headings",
      "Errors",
    ];

    console.log("🔍 Validating Core Category Headings...");

    for (const category of coreCategories) {
      const categoryHeading = page.locator(`text=${category}`).first();
      await expect(categoryHeading).toBeVisible({ timeout: 5000 });
      console.log(`✅ ${category} heading found`);
    }

    console.log("✅ All core category headings validated");
  });

  test("should validate all advanced category headings are present", async ({
    page,
  }) => {
    const advancedCategories = [
      "Carousels",
      "Clickables",
      "Context",
      "Document",
      "Readability",
      "Tables",
    ];

    console.log("🔍 Validating Advanced Category Headings...");

    for (const category of advancedCategories) {
      const categoryHeading = page.locator(`text=${category}`).first();
      await expect(categoryHeading).toBeVisible({ timeout: 5000 });
      console.log(`✅ ${category} heading found`);
    }

    console.log("✅ All advanced category headings validated");
  });

  test("should navigate to each core category and run SDK audits", async ({
    page,
  }) => {
    // Increase timeout for this test
    test.setTimeout(90000);

    const coreCategories = [
      { name: "Graphics", path: "/graphics" },
      { name: "Forms", path: "/forms" },
      { name: "Keyboard", path: "/keyboard" },
      { name: "Navigation", path: "/navigation" },
      { name: "Headings", path: "/headings" },
      { name: "Errors", path: "/errors" },
    ];

    const auditResults = [];
    const sdk = new AccessFlowSDK(page);

    console.log("\n📊 Testing Core Categories with SDK Audits...\n");

    for (const category of coreCategories) {
      // Find and click the category card
      const categoryCard = page
        .locator(`text=${category.name}`)
        .first();

      console.log(`🖱️  Clicking on ${category.name}...`);
      await expect(categoryCard).toBeVisible({ timeout: 10000 });
      
      // Navigate using goto for more reliable navigation
      await page.goto(`/#${category.path}`);
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(1000);

      // Verify we're on the category page
      await expect(page).toHaveURL(new RegExp(category.path));
      console.log(`✅ Navigated to ${category.name} page`);

      // Run SDK audit
      console.log(`🔍 Running SDK audit on ${category.name}...`);
      const audit = await sdk.audit();
      
      auditResults.push({
        category: category.name,
        path: category.path,
        auditSuccess: !!audit,
      });

      console.log(
        `✅ ${category.name} audit: ${audit ? "Success" : "Failed"}\n`
      );

      // Navigate back to home
      await page.goto("/");
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(800);
    }

    // Verify all audits completed
    console.log("\n📊 Core Categories Audit Summary:");
    auditResults.forEach((result) => {
      console.log(
        `   • ${result.category}: ${result.auditSuccess ? "✅" : "❌"}`
      );
    });

    expect(auditResults.length).toBe(6);
    expect(auditResults.every((r) => r.auditSuccess)).toBe(true);
  });

  test("should navigate to each advanced category and run SDK audits", async ({
    page,
  }) => {
    // Increase timeout for this test
    test.setTimeout(90000);

    const advancedCategories = [
      { name: "Carousels", path: "/carousels" },
      { name: "Clickables", path: "/clickables" },
      { name: "Context", path: "/context" },
      { name: "Document", path: "/document" },
      { name: "Readability", path: "/readability" },
      { name: "Tables", path: "/tables" },
    ];

    const auditResults = [];
    const sdk = new AccessFlowSDK(page);

    console.log("\n📊 Testing Advanced Categories with SDK Audits...\n");

    for (const category of advancedCategories) {
      // Navigate directly to category page
      await page.goto(`/#${category.path}`);
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(1000);

      // Verify we're on the category page
      await expect(page).toHaveURL(new RegExp(category.path));
      console.log(`✅ Navigated to ${category.name} page`);

      // Run SDK audit
      console.log(`🔍 Running SDK audit on ${category.name}...`);
      const audit = await sdk.audit();

      auditResults.push({
        category: category.name,
        path: category.path,
        auditSuccess: !!audit,
      });

      console.log(
        `✅ ${category.name} audit: ${audit ? "Success" : "Failed"}\n`
      );

      // Navigate back to home
      await page.goto("/");
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(800);
    }

    // Verify all audits completed
    console.log("\n📊 Advanced Categories Audit Summary:");
    auditResults.forEach((result) => {
      console.log(
        `   • ${result.category}: ${result.auditSuccess ? "✅" : "❌"}`
      );
    });

    expect(auditResults.length).toBe(6);
    expect(auditResults.every((r) => r.auditSuccess)).toBe(true);
  });

  test("should validate all category routes and audit in one comprehensive test", async ({
    page,
  }) => {
    // Increase timeout for comprehensive test
    test.setTimeout(120000);

    const allCategories = [
      // Core Categories
      { name: "Graphics", path: "/graphics", type: "core" },
      { name: "Forms", path: "/forms", type: "core" },
      { name: "Keyboard", path: "/keyboard", type: "core" },
      { name: "Navigation", path: "/navigation", type: "core" },
      { name: "Headings", path: "/headings", type: "core" },
      { name: "Errors", path: "/errors", type: "core" },
      // Advanced Categories
      { name: "Carousels", path: "/carousels", type: "advanced" },
      { name: "Clickables", path: "/clickables", type: "advanced" },
      { name: "Context", path: "/context", type: "advanced" },
      { name: "Document", path: "/document", type: "advanced" },
      { name: "Readability", path: "/readability", type: "advanced" },
      { name: "Tables", path: "/tables", type: "advanced" },
    ];

    const sdk = new AccessFlowSDK(page);
    const results = [];

    // First, verify all headings on home page
    console.log("\n🏠 Validating all category headings on home page...");
    for (const category of allCategories) {
      const heading = page.locator(`text=${category.name}`).first();
      const isVisible = await heading.isVisible();
      console.log(
        `   ${category.name}: ${isVisible ? "✅ Found" : "❌ Missing"}`
      );
    }

    // Audit home page
    console.log("\n🔍 Auditing HOME page...");
    const homeAudit = await sdk.audit();
    console.log(`✅ Home audit: ${homeAudit ? "Success" : "Failed"}`);

    // Navigate to each category and audit
    console.log("\n🔄 Navigating through all categories with audits...\n");

    for (const category of allCategories) {
      console.log(`📍 ${category.type.toUpperCase()}: ${category.name}`);

      // Navigate to category
      await page.goto(`/#${category.path}`);
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(1000);

      // Verify URL
      await expect(page).toHaveURL(new RegExp(category.path));

      // Run audit
      console.log(`   🔍 Running audit...`);
      const audit = await sdk.audit();

      results.push({
        ...category,
        auditSuccess: !!audit,
        url: page.url(),
      });

      console.log(
        `   ✅ Audit: ${audit ? "Success" : "Failed"}`
      );

      // Brief pause before next category
      await page.waitForTimeout(500);
    }

    // Print comprehensive summary
    console.log("\n" + "=".repeat(60));
    console.log("📊 COMPREHENSIVE ROUTE VALIDATION & AUDIT SUMMARY");
    console.log("=".repeat(60));
    console.log(`\n🏠 Home Page: ${homeAudit ? "✅" : "❌"}`);
    
    console.log("\n🎯 CORE CATEGORIES:");
    results
      .filter((r) => r.type === "core")
      .forEach((r) => {
        console.log(
          `   ${r.auditSuccess ? "✅" : "❌"} ${r.name.padEnd(15)} ${r.path}`
        );
      });

    console.log("\n🚀 ADVANCED CATEGORIES:");
    results
      .filter((r) => r.type === "advanced")
      .forEach((r) => {
        console.log(
          `   ${r.auditSuccess ? "✅" : "❌"} ${r.name.padEnd(15)} ${r.path}`
        );
      });

    const totalCategories = results.length;
    const successfulAudits = results.filter((r) => r.auditSuccess).length;
    const failedAudits = totalCategories - successfulAudits;

    console.log("\n" + "=".repeat(60));
    console.log(`📈 STATISTICS:`);
    console.log(`   Total Categories: ${totalCategories}`);
    console.log(`   Successful Audits: ${successfulAudits}`);
    console.log(`   Failed Audits: ${failedAudits}`);
    console.log(`   Success Rate: ${((successfulAudits / totalCategories) * 100).toFixed(1)}%`);
    console.log("=".repeat(60) + "\n");

    // Assertions
    expect(homeAudit).toBeTruthy();
    expect(results.length).toBe(12);
    expect(results.every((r) => r.auditSuccess)).toBe(true);
  });
});

