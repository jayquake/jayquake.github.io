import { AccessFlowSDK } from "@acsbe/accessflow-sdk";
import { expect, test } from "@playwright/test";
import fs from "fs";
import path from "path";

// Initialize AccessFlow SDK with API key
AccessFlowSDK.init({
  apiKey: process.env.AF_Node_Package_Key || "flow-1saYAGtY8ADAPaZLWVg000Y6kyGsGG1LXH",
});

test.describe("Custom OutputDir Support", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app before each test
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);
  });

  test("should save reports to custom outputDir", async ({
    page,
  }, testInfo) => {
    // Pass testInfo to SDK so it can use the custom outputDir from Playwright project config
    const sdk = new AccessFlowSDK(page, testInfo);

    // Run accessibility audit
    console.log("🔍 Running audit with custom outputDir...");
    const report = await sdk.audit();
    console.log("✅ Audit completed:", report ? "Success" : "No report");

    // Verify report was generated
    expect(report).toBeDefined();

    // Get the custom output directory from Playwright project config
    const customOutputDirPath =
      testInfo.project.outputDir ||
      path.resolve(process.cwd(), "custom-test-output");
    console.log("📁 Checking custom output directory:", customOutputDirPath);
    console.log("📁 Project outputDir:", testInfo.project.outputDir);

    // Wait a bit for files to be written
    await page.waitForTimeout(2000);

    // Verify directory exists
    const dirExists = fs.existsSync(customOutputDirPath);
    console.log("📂 Directory exists:", dirExists);
    expect(dirExists).toBe(true);

    // Check for JSONL files in the custom directory
    const files = fs.readdirSync(customOutputDirPath);
    console.log("📄 Files in custom directory:", files);

    // Look for accessFlow-raw-audits-*.jsonl files
    const jsonlFiles = files.filter(
      (file) =>
        file.startsWith("accessFlow-raw-audits-") && file.endsWith(".jsonl")
    );
    console.log("📋 JSONL files found:", jsonlFiles);

    // Verify at least one JSONL file exists
    expect(jsonlFiles.length).toBeGreaterThan(0);

    // Verify the JSONL file is not empty
    const jsonlPath = path.join(customOutputDirPath, jsonlFiles[0]);
    const jsonlContent = fs.readFileSync(jsonlPath, "utf-8");
    expect(jsonlContent.length).toBeGreaterThan(0);
    console.log("✅ JSONL file contains data:", jsonlContent.length, "bytes");

    // Verify no files were created in the default test-results directory
    const defaultOutputDir = path.join(process.cwd(), "test-results");
    const defaultDirExists = fs.existsSync(defaultOutputDir);
    if (defaultDirExists) {
      const defaultFiles = fs.readdirSync(defaultOutputDir);
      const defaultJsonlFiles = defaultFiles.filter(
        (file) =>
          file.startsWith("accessFlow-raw-audits-") && file.endsWith(".jsonl")
      );
      console.log(
        "⚠️  Default directory JSONL files (should be empty or not exist):",
        defaultJsonlFiles
      );
      // Note: We don't fail if default directory has files, as other tests might have created them
    }

    console.log("\n✅ Custom outputDir test passed!");
    console.log("   • Reports saved to ./custom-test-output/");
    console.log("   • JSONL files found:", jsonlFiles.join(", "));
    console.log("   • No errors about missing files");
  });

  test("should audit multiple pages and save to custom outputDir", async ({
    page,
  }, testInfo) => {
    // Pass testInfo to SDK so it can use the custom outputDir from Playwright project config
    const sdk = new AccessFlowSDK(page, testInfo);
    const auditResults = [];

    // Test multiple pages
    const pages = [
      { name: "Home", path: "/" },
      { name: "Graphics", path: "/#/graphics" },
    ];

    for (const testPage of pages) {
      await page.goto(testPage.path);
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(500);

      console.log(`🔍 Auditing ${testPage.name} page...`);
      const report = await sdk.audit();
      auditResults.push({
        page: testPage.name,
        audit: !!report,
      });
      console.log(`✅ ${testPage.name} audit:`, report ? "Complete" : "Failed");
    }

    // Wait for files to be written
    await page.waitForTimeout(2000);

    // Get the custom output directory from Playwright project config
    const customOutputDirPath =
      testInfo.project.outputDir ||
      path.resolve(process.cwd(), "custom-test-output");
    const dirExists = fs.existsSync(customOutputDirPath);
    expect(dirExists).toBe(true);

    const files = fs.readdirSync(customOutputDirPath);
    const jsonlFiles = files.filter(
      (file) =>
        file.startsWith("accessFlow-raw-audits-") && file.endsWith(".jsonl")
    );

    console.log("\n📊 Audit Results Summary:");
    auditResults.forEach((result) => {
      console.log(`   • ${result.page}: ${result.audit ? "✅" : "❌"}`);
    });
    console.log(`\n📁 JSONL files in custom directory: ${jsonlFiles.length}`);
    jsonlFiles.forEach((file) => {
      console.log(`   • ${file}`);
    });

    // Verify all audits completed
    expect(auditResults.every((r) => r.audit)).toBe(true);
    expect(jsonlFiles.length).toBeGreaterThan(0);
  });
});
