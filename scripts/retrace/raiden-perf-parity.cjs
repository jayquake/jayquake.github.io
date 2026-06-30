#!/usr/bin/env node
/**
 * Lightweight performance parity retrace for Raiden engine library routes.
 * Serves the production build locally, captures navigation timing + screenshots.
 *
 * Usage:
 *   npm run build && node scripts/retrace/raiden-perf-parity.cjs
 *   BASE_URL=http://localhost:3003 node scripts/retrace/raiden-perf-parity.cjs
 */

const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const { chromium } = require("playwright");

const ROOT = path.resolve(__dirname, "../..");
const DATE = new Date().toISOString().slice(0, 10);
const OUT_DIR = path.join(ROOT, "assets", `retrace-${DATE}`);
const BASE_URL = process.env.BASE_URL || "http://127.0.0.1:3456";
const SERVE_PORT = Number(process.env.SERVE_PORT || 3456);

const ROUTES = [
  { name: "home", path: "/" },
  { name: "library-detail", path: "/engine/alt-misuse" },
  { name: "example-success", path: "/engine/alt-misuse_success" },
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

async function readNavTiming(page) {
  return page.evaluate(() => {
    const [nav] = performance.getEntriesByType("navigation");
    if (!nav) return null;
    return {
      domContentLoaded: Math.round(nav.domContentLoadedEventEnd),
      loadEventEnd: Math.round(nav.loadEventEnd),
      transferSize: nav.transferSize,
      encodedBodySize: nav.encodedBodySize,
    };
  });
}

async function runChecks(browser) {
  ensureDir(OUT_DIR);
  const results = [];

  for (const route of ROUTES) {
    const page = await browser.newPage();
    const url = `${BASE_URL}${route.path}`;
    await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(500);

    const timing = await readNavTiming(page);
    const screenshotPath = path.join(OUT_DIR, `${route.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: false });

    results.push({
      route: route.path,
      name: route.name,
      timing,
      screenshot: path.relative(ROOT, screenshotPath),
      pass:
        timing &&
        timing.domContentLoaded < 2500 &&
        (route.path === "/" || timing.domContentLoaded < 4000),
    });

    await page.close();
  }

  return results;
}

function startStaticServer() {
  return new Promise((resolve, reject) => {
    const buildDir = path.join(ROOT, "build");
    if (!fs.existsSync(buildDir)) {
      reject(new Error("Missing build/ — run npm run build first"));
      return;
    }

    const proc = spawn(
      "npx",
      ["serve", "-s", buildDir, "-l", String(SERVE_PORT)],
      { cwd: ROOT, stdio: "pipe" }
    );

    const url = `http://127.0.0.1:${SERVE_PORT}`;
    let settled = false;

    const tryReady = async () => {
      try {
        const res = await fetch(url);
        if (res.ok && !settled) {
          settled = true;
          resolve(proc);
        }
      } catch {
        /* retry */
      }
    };

    const interval = setInterval(tryReady, 300);
    proc.on("error", (err) => {
      clearInterval(interval);
      reject(err);
    });
    setTimeout(() => {
      clearInterval(interval);
      if (!settled) reject(new Error("Timed out waiting for static server"));
    }, 20000);
  });
}

async function main() {
  let serverProc = null;
  const useExternal = Boolean(process.env.BASE_URL);

  if (!useExternal) {
    serverProc = await startStaticServer();
    await new Promise((r) => setTimeout(r, 800));
  }

  const browser = await chromium.launch({ headless: true });
  try {
    const results = await runChecks(browser);
    const reportPath = path.join(
      ROOT,
      "docs/test-plans/performance",
      `retrace-report-mcp-prd-${DATE}.md`
    );
    ensureDir(path.dirname(reportPath));

    const lines = [
      `# Performance retrace — ${DATE}`,
      "",
      `Base URL: ${BASE_URL}`,
      "",
      "| Check | Route | DCL (ms) | Load (ms) | Verdict |",
      "|-------|-------|----------|-----------|---------|",
    ];

    results.forEach((r) => {
      const dcl = r.timing?.domContentLoaded ?? "—";
      const load = r.timing?.loadEventEnd ?? "—";
      lines.push(
        `| ${r.name} | \`${r.route}\` | ${dcl} | ${load} | ${r.pass ? "Ship-ready" : "Needs work"} |`
      );
    });

    lines.push("", "## Screenshots", "");
    results.forEach((r) => {
      lines.push(`- **${r.name}**: \`${r.screenshot}\``);
    });

    fs.writeFileSync(reportPath, lines.join("\n"));
    console.log(`[raiden-perf-parity] Wrote ${path.relative(ROOT, reportPath)}`);
    console.log(JSON.stringify(results, null, 2));
  } finally {
    await browser.close();
    if (serverProc) serverProc.kill("SIGTERM");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
