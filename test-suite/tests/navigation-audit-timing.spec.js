import { AccessFlowSDK } from "@acsbe/accessflow-sdk";
import { expect, test } from "@playwright/test";

// Toggle this to run with or without SDK audits
const ENABLE_SDK_AUDIT = true;

// Initialize AccessFlow SDK with API key (only if enabled)
if (ENABLE_SDK_AUDIT) {
  AccessFlowSDK.init({
    apiKey:
      process.env.AF_NODE_PACKAGE_KEY ||
      process.env.AF_Node_Package_Key ||
      "flow-1Rne8TWPwxRONacpdjA000gvFjBP5bY8fv",
  });
}

const formatTime = (ms) => {
  if (ms < 1000) return `${ms.toFixed(0)}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
};

const timingResults = {
  testName: "",
  sdkEnabled: ENABLE_SDK_AUDIT,
  pages: [],
  totalTime: 0,
  totalAuditTime: 0,
  totalNavigationTime: 0,
};

test.describe(`Navigation Timing Tests (SDK ${
  ENABLE_SDK_AUDIT ? "ENABLED" : "DISABLED"
})`, () => {
  test.beforeEach(async ({ page }) => {
    const startTime = performance.now();

    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);

    const duration = performance.now() - startTime;
    console.log(`\n  Initial page load: ${formatTime(duration)}`);
  });

  test.afterAll(() => {
    console.log("\n" + "=".repeat(70));
    console.log("TIMING SUMMARY");
    console.log("=".repeat(70));
    console.log(
      `SDK Audits: ${timingResults.sdkEnabled ? "ENABLED" : "DISABLED"}`
    );
    console.log(
      `Total Navigation Time: ${formatTime(timingResults.totalNavigationTime)}`
    );
    console.log(
      `Total Audit Time: ${formatTime(timingResults.totalAuditTime)}`
    );
    console.log(`Total Combined Time: ${formatTime(timingResults.totalTime)}`);
    console.log("=".repeat(70));

    if (timingResults.pages.length > 0) {
      console.log("\nPer-Page Breakdown:");
      console.log("-".repeat(70));
      console.log(
        "Page".padEnd(40) +
          "Navigation".padEnd(15) +
          "Audit".padEnd(15) +
          "Total".padEnd(15)
      );
      console.log("-".repeat(70));

      timingResults.pages.forEach((p) => {
        console.log(
          p.path.padEnd(40) +
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
    const pageMetrics = {
      path: "/",
      navigationTime: 0,
      auditTime: 0,
      totalTime: 0,
    };
    const testStart = performance.now();

    const navStart = performance.now();
    await expect(page).toHaveURL("/");
    const heading = page.locator("text=Rule Library").first();
    await expect(heading).toBeVisible({ timeout: 10000 });
    pageMetrics.navigationTime = performance.now() - navStart;

    if (ENABLE_SDK_AUDIT) {
      const auditStart = performance.now();
      const sdk = new AccessFlowSDK(page);
      const report = await sdk.audit();
      pageMetrics.auditTime = performance.now() - auditStart;
      console.log(`Audit result: ${report ? "Success" : "No report"}`);
    }

    pageMetrics.totalTime = performance.now() - testStart;
    timingResults.pages.push(pageMetrics);
    timingResults.totalNavigationTime += pageMetrics.navigationTime;
    timingResults.totalAuditTime += pageMetrics.auditTime;
    timingResults.totalTime += pageMetrics.totalTime;

    console.log(`\nHOME PAGE TIMING:`);
    console.log(`   Navigation: ${formatTime(pageMetrics.navigationTime)}`);
    console.log(`   Audit: ${formatTime(pageMetrics.auditTime)}`);
    console.log(`   Total: ${formatTime(pageMetrics.totalTime)}`);
  });

  test("should measure navigation through legacy rule pages with timing", async ({
    page,
  }) => {
    test.setTimeout(90000);

    // Category listing routes now redirect to / -- test actual rule pages instead
    const rulePages = [
      { name: "Background Images", path: "/graphics/background-images_success" },
      { name: "Form Labels", path: "/forms/form-labels_success" },
      { name: "Keyboard Traps", path: "/keyboard/keyboard-traps_success" },
      { name: "Skip Links", path: "/navigation/skip-links_success" },
      { name: "Heading Order", path: "/headings/heading-order_success" },
      { name: "Error Identification", path: "/errors/error-identification_success" },
    ];

    console.log(
      `\nLEGACY RULE PAGES TIMING (SDK ${ENABLE_SDK_AUDIT ? "ON" : "OFF"}):\n`
    );

    for (const rulePage of rulePages) {
      const pageMetrics = {
        path: rulePage.path,
        navigationTime: 0,
        auditTime: 0,
        totalTime: 0,
      };
      const testStart = performance.now();

      const navStart = performance.now();
      await page.goto(rulePage.path);
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(300);
      pageMetrics.navigationTime = performance.now() - navStart;

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
        `   ${rulePage.name.padEnd(20)} | ` +
          `Nav: ${formatTime(pageMetrics.navigationTime).padEnd(8)} | ` +
          `Audit: ${formatTime(pageMetrics.auditTime).padEnd(8)} | ` +
          `Total: ${formatTime(pageMetrics.totalTime)}`
      );
    }
  });

  test("should measure navigation through engine rule pages with timing", async ({
    page,
  }) => {
    test.setTimeout(90000);

    const enginePages = [
      { name: "Page Title", path: "/engine/page-title_success" },
      { name: "Alt Misuse", path: "/engine/alt-misuse_success" },
      { name: "Link Discernible", path: "/engine/link-anchor-discernible_success" },
      { name: "Button Discernible", path: "/engine/button-discernible_success" },
      { name: "Color Contrast", path: "/engine/color-contrast_success" },
      { name: "Heading Order", path: "/engine/heading-order_success" },
    ];

    console.log(
      `\nENGINE RULE PAGES TIMING (SDK ${ENABLE_SDK_AUDIT ? "ON" : "OFF"}):\n`
    );

    for (const enginePage of enginePages) {
      const pageMetrics = {
        path: enginePage.path,
        navigationTime: 0,
        auditTime: 0,
        totalTime: 0,
      };
      const testStart = performance.now();

      const navStart = performance.now();
      await page.goto(enginePage.path);
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(300);
      pageMetrics.navigationTime = performance.now() - navStart;

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
        `   ${enginePage.name.padEnd(20)} | ` +
          `Nav: ${formatTime(pageMetrics.navigationTime).padEnd(8)} | ` +
          `Audit: ${formatTime(pageMetrics.auditTime).padEnd(8)} | ` +
          `Total: ${formatTime(pageMetrics.totalTime)}`
      );
    }
  });

  test("should measure comprehensive navigation timing across key pages", async ({ page }) => {
    test.setTimeout(120000);

    const allPages = [
      "/",
      "/rule-lab",
      "/graphics/background-images_success",
      "/graphics/alt-text_success",
      "/forms/form-labels_success",
      "/keyboard/keyboard-traps_success",
      "/navigation/skip-links_success",
      "/headings/heading-order_success",
      "/errors/error-identification_success",
      "/errors/fake-hidden-content_failure",
      "/engine/page-title_success",
      "/engine/alt-misuse_success",
      "/engine/button-discernible_success",
      "/engine/heading-order_success",
    ];

    console.log(
      `\nCOMPREHENSIVE TIMING TEST (SDK ${ENABLE_SDK_AUDIT ? "ON" : "OFF"}):`
    );
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
        `   ${path.padEnd(45)} | Nav: ${formatTime(navTime).padEnd(
          8
        )} | Audit: ${formatTime(auditTime)}`
      );
    }

    comprehensiveResults.avgNavTime =
      comprehensiveResults.totalNavTime / comprehensiveResults.pageCount;
    comprehensiveResults.avgAuditTime =
      comprehensiveResults.totalAuditTime / comprehensiveResults.pageCount;

    console.log("=".repeat(60));
    console.log(`\nCOMPREHENSIVE RESULTS:`);
    console.log(`   Pages Tested: ${comprehensiveResults.pageCount}`);
    console.log(`   SDK Audits: ${ENABLE_SDK_AUDIT ? "ENABLED" : "DISABLED"}`);
    console.log(
      `   Total Navigation Time: ${formatTime(
        comprehensiveResults.totalNavTime
      )}`
    );
    console.log(
      `   Total Audit Time: ${formatTime(comprehensiveResults.totalAuditTime)}`
    );
    console.log(
      `   Average Nav Time/Page: ${formatTime(comprehensiveResults.avgNavTime)}`
    );
    console.log(
      `   Average Audit Time/Page: ${formatTime(
        comprehensiveResults.avgAuditTime
      )}`
    );
    console.log(
      `   Total Time: ${formatTime(
        comprehensiveResults.totalNavTime + comprehensiveResults.totalAuditTime
      )}`
    );
    console.log("=".repeat(60));

    expect(comprehensiveResults.pageCount).toBe(allPages.length);
  });
});
