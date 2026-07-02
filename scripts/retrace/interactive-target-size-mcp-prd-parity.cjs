#!/usr/bin/env node
/**
 * MCP PRD parity retrace for interactive-target-size failure page.
 * Captures UI screenshots and optional SDK audit when AF_NODE_PACKAGE_KEY is set.
 *
 * Usage:
 *   npm run build && node scripts/retrace/interactive-target-size-mcp-prd-parity.cjs
 *   BASE_URL=http://localhost:3003 node scripts/retrace/interactive-target-size-mcp-prd-parity.cjs
 */

const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const { chromium } = require("playwright");

const ROOT = path.resolve(__dirname, "../..");
const DATE = "2026-07-02";
const OUT_DIR = path.join(
  ROOT,
  "docs/test-plans/interactive-target-size/assets",
  `retrace-${DATE}`,
);
const BASE_URL = process.env.BASE_URL || "http://127.0.0.1:3456";
const SERVE_PORT = Number(process.env.SERVE_PORT || 3456);

const FAILURE_ROUTE = "/engine/interactive-target-size_failure";
const SUCCESS_ROUTE = "/engine/interactive-target-size_success";

const EXPECTED_FIXTURE_TITLES = [
  "16 by 16 css pixels button inside big button",
  "16 by 16 css pixels button next to big button",
  "16 by 16 css pixels button without enough space around it next to big button",
  "equivalent exception two red buttons with same functionality both dont meet the criterion",
  "links not in a sentence",
  "testimonials mantra",
  "text in the right links in the left",
  "two undersized interactive elements intersect",
  "undersized interactive element without enough space around it",
  "undersized interactive elements intersect",
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

async function assertFailurePageUi(page) {
  const checks = [];

  const assertVisible = async (name, locator) => {
    try {
      await locator.waitFor({ state: "visible", timeout: 10000 });
      checks.push({ name, status: "PASS" });
    } catch (error) {
      checks.push({ name, status: "FAIL", note: error.message });
    }
  };

  await assertVisible(
    "Rule heading",
    page.getByRole("heading", {
      name: /Targets for interactive elements should meet a minimum size/i,
    }),
  );
  await assertVisible(
    "Needs Fix chip",
    page.getByText("Needs Fix", { exact: true }),
  );
  await assertVisible(
    "10 examples chip",
    page.getByText("10 examples", { exact: true }),
  );
  await assertVisible(
    "Failure Examples heading",
    page.getByRole("heading", { name: "Failure Examples" }),
  );

  const region = page.getByRole("region", { name: "failure examples list" });
  await assertVisible("Failure examples region", region);

  const issueCount = await region.getByText("Accessibility Issue").count();
  checks.push({
    name: "10 Accessibility Issue cards",
    status: issueCount === 10 ? "PASS" : "FAIL",
    note: `count=${issueCount}`,
  });

  for (const title of EXPECTED_FIXTURE_TITLES) {
    const locator = page.getByText(title, { exact: true });
    const visible = await locator.first().isVisible().catch(() => false);
    checks.push({
      name: `Fixture: ${title}`,
      status: visible ? "PASS" : "FAIL",
    });
  }

  return checks;
}

async function runSdkAudit(page) {
  if (!process.env.AF_NODE_PACKAGE_KEY) {
    return {
      status: "BLOCKED",
      note: "AF_NODE_PACKAGE_KEY not set",
    };
  }

  try {
    const { AccessFlowSDK } = require("@acsbe/accessflow-sdk");
    AccessFlowSDK.init({ apiKey: process.env.AF_NODE_PACKAGE_KEY });
    const sdk = new AccessFlowSDK(page);
    const report = await sdk.audit();
    const keys = Object.keys(report?.ruleViolations || {});
    const targetKey = keys.find(
      (key) =>
        key.toLowerCase().includes("target") ||
        key.toLowerCase().includes("interactive-target-size"),
    );

    return {
      status: targetKey ? "PASS" : "NEEDS_RETRACE",
      ruleKeys: keys,
      targetKey,
      numberOfIssuesFound: report?.numberOfIssuesFound,
      targetRule: targetKey ? report.ruleViolations[targetKey] : null,
    };
  } catch (error) {
    return {
      status: "BLOCKED",
      note: error.message,
    };
  }
}

function startStaticServer() {
  return new Promise((resolve, reject) => {
    const buildDir = path.join(ROOT, "build");
    if (!fs.existsSync(buildDir)) {
      reject(new Error("Missing build/ — run npm run build first"));
      return;
    }

    const child = spawn(
      "npx",
      ["serve", "-s", "build", "-l", String(SERVE_PORT)],
      { cwd: ROOT, stdio: "pipe" },
    );

    let resolved = false;
    const timer = setTimeout(() => {
      if (!resolved) reject(new Error("Static server start timeout"));
    }, 120000);

    child.stdout.on("data", (chunk) => {
      if (!resolved && /Accepting connections/.test(chunk.toString())) {
        resolved = true;
        clearTimeout(timer);
        resolve(child);
      }
    });

    child.stderr.on("data", () => {});
    child.on("error", reject);
  });
}

async function main() {
  ensureDir(OUT_DIR);
  let server;
  const useOwnServer = !process.env.BASE_URL;

  if (useOwnServer) {
    server = await startStaticServer();
    await new Promise((r) => setTimeout(r, 1500));
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto(`${BASE_URL}${FAILURE_ROUTE}`, {
      waitUntil: "networkidle",
      timeout: 60000,
    });
    await page.waitForTimeout(500);

    const uiChecks = await assertFailurePageUi(page);
    const uiScreenshot = path.join(OUT_DIR, "prd-failure-page-ui.png");
    await page.screenshot({ path: uiScreenshot, fullPage: true });

    const sdkResult = await runSdkAudit(page);
    let sdkScreenshotRel = "—";
    if (sdkResult.status === "PASS" || sdkResult.status === "NEEDS_RETRACE") {
      const sdkScreenshot = path.join(OUT_DIR, "prd-sdk-audit-report.png");
      await page.screenshot({ path: sdkScreenshot, fullPage: false });
      sdkScreenshotRel = `assets/retrace-${DATE}/prd-sdk-audit-report.png`;
    }

    await page.goto(`${BASE_URL}${SUCCESS_ROUTE}`, {
      waitUntil: "networkidle",
      timeout: 60000,
    });
    await page.waitForTimeout(500);
    const successChipVisible = await page
      .getByText("Compliant", { exact: true })
      .isVisible();
    const successExamples = await page
      .getByText("13 examples", { exact: true })
      .isVisible();

    const reportPath = path.join(
      ROOT,
      "docs/test-plans/interactive-target-size",
      `retrace-report-mcp-prd-${DATE}.md`,
    );

    const lines = [
      `# MCP PRD parity — interactive-target-size — ${DATE}`,
      "",
      `**Base URL:** ${BASE_URL}`,
      "",
      "## PRD parity checks",
      "",
      "| Check | PRD ref | Status | Live observation | Screenshot |",
      "|-------|---------|--------|------------------|------------|",
    ];

    for (const check of uiChecks) {
      lines.push(
        `| ${check.name} | Qase 8921 Step 3 | ${check.status} | ${check.note || "Matches UnifiedExamplePage"} | [ui](assets/retrace-${DATE}/prd-failure-page-ui.png) |`,
      );
    }

    lines.push(
      `| Success page spot-check | Qase 8921 Step 2 | ${successChipVisible && successExamples ? "PASS" : "FAIL"} | Compliant chip + 13 examples on success route | — |`,
    );
    lines.push(
      `| SDK audit target-size violations | Qase 8921 Step 5 | ${sdkResult.status} | ${sdkResult.note || JSON.stringify({ ruleKeys: sdkResult.ruleKeys, targetKey: sdkResult.targetKey, numberOfIssuesFound: sdkResult.numberOfIssuesFound })} | ${sdkScreenshotRel === "—" ? "—" : `[sdk](${sdkScreenshotRel})`} |`,
    );

    lines.push("", "## PRD deltas", "");
    if (sdkResult.status === "BLOCKED") {
      lines.push(
        "1. SDK audit blocked locally — requires network access to AccessFlow API and valid `AF_NODE_PACKAGE_KEY`. Re-run in CI after secrets are configured.",
      );
    } else if (sdkResult.status === "NEEDS_RETRACE") {
      lines.push(
        `1. SDK returned violations but no target-size rule key matched. Keys: ${(sdkResult.ruleKeys || []).join(", ")}`,
      );
    } else {
      lines.push("1. No PRD deltas observed for failure page UI.");
    }

    lines.push("", "## Recommended Qase / param updates", "");
    lines.push(
      "- Link Playwright spec `sdk/tests/playwright/node/tests/interactive-target-size-failure.spec.js` to Qase 8921 Step 5 automation.",
    );
    lines.push(
      "- Pin SDK rule violation key once confirmed from CI audit output.",
    );

    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, lines.join("\n"));

    console.log(`Wrote ${reportPath}`);
    console.log(JSON.stringify({ uiChecks, sdkResult }, null, 2));
  } finally {
    await browser.close();
    if (server) server.kill("SIGTERM");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
