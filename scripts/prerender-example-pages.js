/**
 * Post-build prerender: visit engine rule success/failure routes in headless
 * Chromium and write full HTML snapshots to build/engine/{slug}/index.html
 * so GitHub Pages serves fixture markup in the initial HTTP response.
 */
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const { chromium } = require("playwright");

const REPO_ROOT = path.join(__dirname, "..");
const BUILD_DIR = path.join(REPO_ROOT, "build");
const METADATA_PATH = path.join(BUILD_DIR, "engine-rules-metadata.json");
const PORT = Number(process.env.PRERENDER_PORT || 5055);
const WORKERS = Number(process.env.PRERENDER_WORKERS || 6);
const BASE_URL = `http://127.0.0.1:${PORT}`;

function isPopulated(rule) {
  const slug = rule.id || rule.kebabId || "";
  return Boolean(slug && (rule.title || rule.description));
}

function collectRoutes(metadata) {
  const routes = new Set();
  for (const rule of metadata) {
    if (!isPopulated(rule)) continue;
    if (rule.successUrl) routes.add(rule.successUrl);
    if (rule.failureUrl) routes.add(rule.failureUrl);
  }
  return [...routes].sort();
}

function urlToOutputPath(urlPath) {
  const trimmed = urlPath.replace(/^\//, "");
  return path.join(BUILD_DIR, trimmed, "index.html");
}

function waitForServerReady(proc, timeoutMs = 60_000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`serve did not start within ${timeoutMs}ms`));
    }, timeoutMs);

    const onData = (chunk) => {
      const text = chunk.toString();
      if (/Accepting connections|Serving!|http:\/\/127\.0\.0\.1/i.test(text)) {
        clearTimeout(timer);
        proc.stdout?.off("data", onData);
        proc.stderr?.off("data", onData);
        resolve();
      }
    };

    proc.stdout?.on("data", onData);
    proc.stderr?.on("data", onData);
    proc.on("error", (err) => {
      clearTimeout(timer);
      reject(err);
    });
    proc.on("exit", (code) => {
      if (code !== null && code !== 0) {
        clearTimeout(timer);
        reject(new Error(`serve exited with code ${code}`));
      }
    });
  });
}

function startStaticServer() {
  return new Promise((resolve, reject) => {
    const proc = spawn("npx", ["serve", "-s", "build", "-l", String(PORT)], {
      cwd: REPO_ROOT,
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, CI: "true" },
    });

    waitForServerReady(proc)
      .then(() => resolve(proc))
      .catch(reject);
  });
}

async function prerenderRoute(page, urlPath) {
  const response = await page.goto(`${BASE_URL}${urlPath}`, {
    waitUntil: "networkidle",
    timeout: 90_000,
  });

  if (!response || !response.ok()) {
    throw new Error(`HTTP ${response?.status() ?? "unknown"} for ${urlPath}`);
  }

  await page.waitForSelector("[data-scan-ready]", {
    state: "attached",
    timeout: 30_000,
  });

  const exampleCount = await page.locator("[data-audit-example]").count();
  if (exampleCount === 0) {
    console.warn(`⚠ ${urlPath} — no [data-audit-example] fixtures; saving page shell only`);
  }

  const content = await page.content();
  return { urlPath, content };
}

async function workerLoop(browser, queue, snapshots, failures) {
  const context = await browser.newContext();
  const page = await context.newPage();

  while (queue.length > 0) {
    const urlPath = queue.shift();
    if (!urlPath) break;
    try {
      const snapshot = await prerenderRoute(page, urlPath);
      snapshots.push(snapshot);
      process.stdout.write(`✓ ${urlPath}\n`);
    } catch (err) {
      failures.push({ url: urlPath, error: err.message || String(err) });
      process.stderr.write(`✗ ${urlPath}: ${err.message || err}\n`);
    }
  }

  await context.close();
}

function writeSnapshots(snapshots) {
  for (const { urlPath, content } of snapshots) {
    const outPath = urlToOutputPath(urlPath);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, content, "utf8");
  }
}

async function main() {
  if (!fs.existsSync(BUILD_DIR)) {
    console.error("build/ not found — run npm run build first");
    process.exit(1);
  }

  if (!fs.existsSync(METADATA_PATH)) {
    console.error("build/engine-rules-metadata.json not found — run prebuild");
    process.exit(1);
  }

  const metadata = JSON.parse(fs.readFileSync(METADATA_PATH, "utf8"));
  const routes = collectRoutes(metadata);

  if (routes.length === 0) {
    console.error("No populated rule routes found in metadata");
    process.exit(1);
  }

  console.log(`Prerendering ${routes.length} routes (${WORKERS} workers)…`);

  const server = await startStaticServer();
  const browser = await chromium.launch({ headless: true });
  const queue = [...routes];
  const snapshots = [];
  const failures = [];

  const workers = Array.from({ length: Math.min(WORKERS, routes.length) }, () =>
    workerLoop(browser, queue, snapshots, failures),
  );

  try {
    await Promise.all(workers);
  } finally {
    await browser.close();
    server.kill("SIGTERM");
  }

  if (snapshots.length > 0) {
    writeSnapshots(snapshots);
  }

  if (failures.length > 0) {
    console.error(`\n${failures.length} route(s) failed:`);
    failures.forEach(({ url, error }) => console.error(`  ${url}: ${error}`));
    if (snapshots.length === 0) {
      process.exit(1);
    }
    console.warn(`\nWrote ${snapshots.length} pages; ${failures.length} routes skipped.`);
    process.exit(0);
  }

  console.log(`\nPrerender complete — ${routes.length} pages written under build/engine/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
