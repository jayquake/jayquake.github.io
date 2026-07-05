/**
 * Validates build-time prerender output for reference Accessflow snapshot routes.
 * Requires `npm run build` (postbuild prerender) before running with CI webServer.
 */

const fs = require("fs");
const path = require("path");
const { expect, test } = require("@playwright/test");

const repoRoot = path.resolve(__dirname, "..", "..", "..", "..", "..");

const ROUTES = [
  {
    path: "/engine/aria-describedby-has-reference_failure",
    output: path.join(
      repoRoot,
      "build",
      "engine",
      "aria-describedby-has-reference_failure",
      "index.html",
    ),
    markers: ["data-audit-example", "aria-describedby", "FAILURE EXAMPLE"],
    liveHeading: /aria-describedby should reference a valid element id/i,
    exampleCount: 3,
  },
  {
    path: "/engine/aria-controls-has-reference_failure",
    output: path.join(
      repoRoot,
      "build",
      "engine",
      "aria-controls-has-reference_failure",
      "index.html",
    ),
    markers: ['role="tab"', "aria-controls", "data-audit-example"],
    liveHeading: /aria-controls should reference a valid element id/i,
    exampleCount: null,
  },
];

test.describe("prerender example pages — Accessflow snapshot parity", () => {
  for (const route of ROUTES) {
    test.describe(route.path, () => {
      test.beforeAll(() => {
        test.skip(
          !fs.existsSync(route.output),
          "Prerendered HTML missing — run npm run build first",
        );
      });

      test("prerender file is full HTML, not redirect stub", () => {
        const html = fs.readFileSync(route.output, "utf8");
        expect(html.length).toBeGreaterThan(10_000);
        expect(html).not.toContain("Redirecting...");
        expect(html).toContain("#root");
        for (const marker of route.markers) {
          expect(html).toContain(marker);
        }
      });

      test("raw HTTP response matches prerender on disk", async ({ request }) => {
        const res = await request.get(route.path);
        expect(res.ok()).toBeTruthy();
        const html = await res.text();
        expect(html).not.toContain("Redirecting...");
        for (const marker of route.markers) {
          expect(html).toContain(marker);
        }
      });

      test("live UI renders interactive example page", async ({ page }) => {
        await page.goto(route.path);
        await page.waitForLoadState("networkidle");
        await expect(page.getByRole("heading", { name: route.liveHeading })).toBeVisible();
        await expect(page.locator("[data-audit-example]").first()).toBeVisible();
        if (route.exampleCount != null) {
          await expect(page.locator("[data-audit-example]")).toHaveCount(route.exampleCount);
        }
      });
    });
  }
});
