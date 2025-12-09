// TODO: Temporarily commented out SDK
// import { AccessFlowSDK } from "@acsbe/accessflow-sdk";
import { expect, test } from "@playwright/test";

// Toggle this to run with or without SDK audits
// TODO: Temporarily disabled SDK
const ENABLE_SDK_AUDIT = false;

// Initialize AccessFlow SDK with API key (only if enabled)
// TODO: Temporarily commented out SDK
// if (ENABLE_SDK_AUDIT) {
//   AccessFlowSDK.init({ apiKey: "flow-1OnrCkNQqmwEyaShAow001pAwp8osHaM" });
// }

// Helper function to format time
const formatTime = (ms) => {
  if (ms < 1000) return `${ms.toFixed(0)}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
};

// Store timing results
const timingResults = {
  testName: "",
  sdkEnabled: ENABLE_SDK_AUDIT,
  pages: [],
  totalTime: 0,
  totalAuditTime: 0,
  totalNavigationTime: 0,
};

test.describe(`Navigation Timing Tests (SDK ${ENABLE_SDK_AUDIT ? "ENABLED" : "DISABLED"})`, () => {
  test.beforeEach(async ({ page }) => {
    const startTime = performance.now();

    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);

    const duration = performance.now() - startTime;
    console.log(`\n⏱️  Initial page load: ${formatTime(duration)}`);
  });

  test.afterAll(() => {
    // Print comprehensive timing summary
    console.log("\n" + "=".repeat(70));
    console.log("📊 TIMING SUMMARY");
    console.log("=".repeat(70));
    console.log(`SDK Audits: ${timingResults.sdkEnabled ? "✅ ENABLED" : "❌ DISABLED"}`);
    console.log(`Total Navigation Time: ${formatTime(timingResults.totalNavigationTime)}`);
    console.log(`Total Audit Time: ${formatTime(timingResults.totalAuditTime)}`);
    console.log(`Total Combined Time: ${formatTime(timingResults.totalTime)}`);
    console.log("=".repeat(70));

    if (timingResults.pages.length > 0) {
      console.log("\n📋 Per-Page Breakdown:");
      console.log("-".repeat(70));
      console.log(
        "Page".padEnd(20) +
        "Navigation".padEnd(15) +
        "Audit".padEnd(15) +
        "Total".padEnd(15)
      );
      console.log("-".repeat(70));

      timingResults.pages.forEach((p) => {
        console.log(
          p.path.padEnd(20) +
          formatTime(p.navigationTime).padEnd(15) +
          formatTime(p.auditTime).padEnd(15) +
          formatTime(p.totalTime).padEnd(15)
        );
      });
      console.log("-".repeat(70));
    }
    console.log("\n");
  });

  test("should measure home page load and audit time", async ({ page }) => {
    const pageMetrics = { path: "/", navigationTime: 0, auditTime: 0, totalTime: 0 };
    const testStart = performance.now();

    // Measure navigation
    const navStart = performance.now();
    await expect(page).toHaveURL("/");
    const heading = page.locator("text=AccessFlow").first();
    await expect(heading).toBeVisible({ timeout: 10000 });
    pageMetrics.navigationTime = performance.now() - navStart;

    // Measure audit (if enabled)
    if (ENABLE_SDK_AUDIT) {
      const auditStart = performance.now();
      const sdk = new AccessFlowSDK(page);
      const report = await sdk.audit();
      pageMetrics.auditTime = performance.now() - auditStart;
      console.log(`📝 Audit result: ${report ? "Success" : "No report"}`);
    }

    pageMetrics.totalTime = performance.now() - testStart;
    timingResults.pages.push(pageMetrics);
    timingResults.totalNavigationTime += pageMetrics.navigationTime;
    timingResults.totalAuditTime += pageMetrics.auditTime;
    timingResults.totalTime += pageMetrics.totalTime;

    console.log(`\n⏱️  HOME PAGE TIMING:`);
    console.log(`   Navigation: ${formatTime(pageMetrics.navigationTime)}`);
    console.log(`   Audit: ${formatTime(pageMetrics.auditTime)}`);
    console.log(`   Total: ${formatTime(pageMetrics.totalTime)}`);
  });

  test("should measure navigation through core categories with timing", async ({ page }) => {
    const categories = [
      { name: "Graphics", path: "/graphics" },
      { name: "Forms", path: "/forms" },
      { name: "Keyboard", path: "/keyboard" },
      { name: "Navigation", path: "/navigation" },
      { name: "Headings", path: "/headings" },
      { name: "Errors", path: "/errors" },
    ];

    console.log(`\n📊 CORE CATEGORIES TIMING (SDK ${ENABLE_SDK_AUDIT ? "ON" : "OFF"}):\n`);

    for (const category of categories) {
      const pageMetrics = {
        path: category.path,
        navigationTime: 0,
        auditTime: 0,
        totalTime: 0
      };
      const testStart = performance.now();

      // Measure navigation
      const navStart = performance.now();
      await page.goto(category.path);
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(300);
      await expect(page).toHaveURL(category.path);
      pageMetrics.navigationTime = performance.now() - navStart;

      // Measure audit (if enabled)
      if (ENABLE_SDK_AUDIT) {
        const auditStart = performance.now();
        const sdk = new AccessFlowSDK(page);
        await sdk.audit();
        pageMetrics.auditTime = performance.now() - auditStart;
      }

      pageMetrics.totalTime = performance.now() - testStart;
      timingResults.pages.push(pageMetrics);
      timingResults.totalNavigationTime += pageMetrics.navigationTime;
      timingResults.totalAuditTime += pageMetrics.auditTime;
      timingResults.totalTime += pageMetrics.totalTime;

      console.log(
        `   ${category.name.padEnd(12)} | ` +
        `Nav: ${formatTime(pageMetrics.navigationTime).padEnd(8)} | ` +
        `Audit: ${formatTime(pageMetrics.auditTime).padEnd(8)} | ` +
        `Total: ${formatTime(pageMetrics.totalTime)}`
      );
    }
  });

  test("should measure navigation through advanced categories with timing", async ({ page }) => {
    const advancedCategories = [
      { name: "Carousels", path: "/carousels" },
      { name: "Clickables", path: "/clickables" },
      { name: "Context", path: "/context" },
      { name: "Document", path: "/document" },
      { name: "Readability", path: "/readability" },
      { name: "Tables", path: "/tables" },
    ];

    console.log(`\n📊 ADVANCED CATEGORIES TIMING (SDK ${ENABLE_SDK_AUDIT ? "ON" : "OFF"}):\n`);

    for (const category of advancedCategories) {
      const pageMetrics = {
        path: category.path,
        navigationTime: 0,
        auditTime: 0,
        totalTime: 0
      };
      const testStart = performance.now();

      // Measure navigation
      const navStart = performance.now();
      await page.goto(category.path);
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(300);
      await expect(page).toHaveURL(category.path);
      pageMetrics.navigationTime = performance.now() - navStart;

      // Measure audit (if enabled)
      if (ENABLE_SDK_AUDIT) {
        const auditStart = performance.now();
        const sdk = new AccessFlowSDK(page);
        await sdk.audit();
        pageMetrics.auditTime = performance.now() - auditStart;
      }

      pageMetrics.totalTime = performance.now() - testStart;
      timingResults.pages.push(pageMetrics);
      timingResults.totalNavigationTime += pageMetrics.navigationTime;
      timingResults.totalAuditTime += pageMetrics.auditTime;
      timingResults.totalTime += pageMetrics.totalTime;

      console.log(
        `   ${category.name.padEnd(12)} | ` +
        `Nav: ${formatTime(pageMetrics.navigationTime).padEnd(8)} | ` +
        `Audit: ${formatTime(pageMetrics.auditTime).padEnd(8)} | ` +
        `Total: ${formatTime(pageMetrics.totalTime)}`
      );
    }
  });

  test("should measure comprehensive navigation timing", async ({ page }) => {
    test.setTimeout(120000);

    const allPages = [
      "/",
      "/rules",
      "/graphics",
      "/forms",
      "/keyboard",
      "/navigation",
      "/headings",
      "/errors",
      "/carousels",
      "/clickables",
      "/context",
      "/document",
      "/readability",
      "/tables",
    ];

    console.log(`\n📊 COMPREHENSIVE TIMING TEST (SDK ${ENABLE_SDK_AUDIT ? "ON" : "OFF"}):`);
    console.log("=".repeat(60));

    const comprehensiveResults = {
      totalNavTime: 0,
      totalAuditTime: 0,
      pageCount: 0,
      avgNavTime: 0,
      avgAuditTime: 0,
    };

    for (const path of allPages) {
      const navStart = performance.now();
      await page.goto(path);
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(300);
      const navTime = performance.now() - navStart;

      let auditTime = 0;
      if (ENABLE_SDK_AUDIT) {
        const auditStart = performance.now();
        const sdk = new AccessFlowSDK(page);
        await sdk.audit();
        auditTime = performance.now() - auditStart;
      }

      comprehensiveResults.totalNavTime += navTime;
      comprehensiveResults.totalAuditTime += auditTime;
      comprehensiveResults.pageCount++;

      console.log(
        `   ${path.padEnd(15)} | Nav: ${formatTime(navTime).padEnd(8)} | Audit: ${formatTime(auditTime)}`
      );
    }

    comprehensiveResults.avgNavTime = comprehensiveResults.totalNavTime / comprehensiveResults.pageCount;
    comprehensiveResults.avgAuditTime = comprehensiveResults.totalAuditTime / comprehensiveResults.pageCount;

    console.log("=".repeat(60));
    console.log(`\n📈 COMPREHENSIVE RESULTS:`);
    console.log(`   Pages Tested: ${comprehensiveResults.pageCount}`);
    console.log(`   SDK Audits: ${ENABLE_SDK_AUDIT ? "ENABLED" : "DISABLED"}`);
    console.log(`   Total Navigation Time: ${formatTime(comprehensiveResults.totalNavTime)}`);
    console.log(`   Total Audit Time: ${formatTime(comprehensiveResults.totalAuditTime)}`);
    console.log(`   Average Nav Time/Page: ${formatTime(comprehensiveResults.avgNavTime)}`);
    console.log(`   Average Audit Time/Page: ${formatTime(comprehensiveResults.avgAuditTime)}`);
    console.log(`   Total Time: ${formatTime(comprehensiveResults.totalNavTime + comprehensiveResults.totalAuditTime)}`);
    console.log("=".repeat(60));

    // Assertions
    expect(comprehensiveResults.pageCount).toBe(14);
  });
});

