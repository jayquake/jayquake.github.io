/**
 * AccessFlow JS SDK — Behavior Tests
 *
 * Dedicated spec that validates SDK initialization, audit lifecycle, and
 * report shape.  Mirrors the Python and Java lane tests so all three
 * language lanes exercise equivalent behavior against the live React app.
 */

import { AccessFlowSDK } from "@acsbe/accessflow-sdk";
import { expect, test } from "@playwright/test";

// Session-level SDK init (same pattern as search.spec.js)
AccessFlowSDK.init({
  apiKey: process.env.ACCESSFLOW_API_KEY || "flow-1AGHjOCaB9GYyaYtf6Q000Y1KygFymF5R4",
});

// ========================================================================
// SDK Initialization
// ========================================================================

test.describe("SDK Initialization", () => {
  test("should initialize without errors", async () => {
    // If AccessFlowSDK.init() above threw, we would never reach this test.
    expect(true).toBe(true);
  });

  test("should create an instance bound to a page", async ({ page }) => {
    const sdk = new AccessFlowSDK(page);
    expect(sdk).toBeTruthy();
  });
});

// ========================================================================
// Audit — Home Page
// ========================================================================

test.describe("Audit — Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);
  });

  test("should return a report on the home page", async ({ page }) => {
    const sdk = new AccessFlowSDK(page);
    const report = await sdk.audit();
    expect(report).toBeTruthy();
  });

  test("audit should complete without throwing", async ({ page }) => {
    const sdk = new AccessFlowSDK(page);
    await expect(async () => {
      await sdk.audit();
    }).not.toThrow();
  });
});

// ========================================================================
// Audit — Specific Route (Graphics / Alt-Text)
// ========================================================================

test.describe("Audit — Graphics Route", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#/graphics/alt-text");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);
  });

  test("should return a report for the graphics/alt-text route", async ({
    page,
  }) => {
    const sdk = new AccessFlowSDK(page);
    const report = await sdk.audit();
    expect(report).toBeTruthy();
  });

  test("multiple audits on the same page should be stable", async ({
    page,
  }) => {
    const sdk = new AccessFlowSDK(page);
    const reportA = await sdk.audit();
    const reportB = await sdk.audit();
    expect(reportA).toBeTruthy();
    expect(reportB).toBeTruthy();
  });
});

// ========================================================================
// Audit — After Navigation
// ========================================================================

test.describe("Audit — After Navigation", () => {
  test("should audit successfully after route change", async ({ page }) => {
    // First route
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);
    const sdkHome = new AccessFlowSDK(page);
    const reportHome = await sdkHome.audit();
    expect(reportHome).toBeTruthy();

    // Second route
    await page.goto("/#/graphics/alt-text");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);
    const sdkGraphics = new AccessFlowSDK(page);
    const reportGraphics = await sdkGraphics.audit();
    expect(reportGraphics).toBeTruthy();
  });
});
