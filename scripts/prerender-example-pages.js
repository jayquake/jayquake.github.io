/**
 * Post-build prerender: visit engine rule success/failure routes in headless
 * Chromium and write full HTML snapshots to build/engine/{slug}/index.html
 * so GitHub Pages serves fixture markup in the initial HTTP response.
 */
const fs = require("fs");
const net = require("net");
const path = require("path");
const { spawn } = require("child_process");
const { chromium } = require("playwright");

const REPO_ROOT = path.join(__dirname, "..");
const BUILD_DIR = path.join(REPO_ROOT, "build");
const METADATA_PATH = path.join(BUILD_DIR, "engine-rules-metadata.json");
const WORKERS = Number(process.env.PRERENDER_WORKERS || 6);

/** Prefer PRERENDER_PORT only when nothing is accepting there; else ephemeral. */
function isPortAccepting(port) {
  return new Promise((resolve) => {
    const socket = net.connect({ host: "127.0.0.1", port }, () => {
      socket.destroy();
      resolve(true);
    });
    socket.setTimeout(500);
    socket.on("timeout", () => {
      socket.destroy();
      resolve(false);
    });
    socket.on("error", () => resolve(false));
  });
}

function allocateEphemeralPort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      server.close((err) => (err ? reject(err) : resolve(port)));
    });
  });
}

async function resolveListenPort() {
  const preferred = Number(process.env.PRERENDER_PORT || 5055);
  if (process.env.PRERENDER_PORT) {
    if (await isPortAccepting(preferred)) {
      throw new Error(
        `PRERENDER_PORT ${preferred} is already in use. Free it or unset PRERENDER_PORT.`,
      );
    }
    return preferred;
  }
  if (!(await isPortAccepting(preferred))) {
    return preferred;
  }
  return allocateEphemeralPort();
}

async function assertSpaServer(baseUrl) {
  const response = await fetch(baseUrl, { redirect: "manual" });
  const text = await response.text();
  if (!response.ok || !text.includes('id="root"')) {
    throw new Error(
      `Prerender server at ${baseUrl} did not serve the SPA shell ` +
        `(HTTP ${response.status}). Another process may own the port.`,
    );
  }
}

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

function startStaticServer(port) {
  return new Promise((resolve, reject) => {
    const proc = spawn("npx", ["serve", "-s", "build", "-l", `tcp://127.0.0.1:${port}`], {
      cwd: REPO_ROOT,
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, CI: "true" },
    });

    waitForServerReady(proc)
      .then(() => resolve(proc))
      .catch(reject);
  });
}

async function prerenderRoute(page, baseUrl, urlPath) {
  const response = await page.goto(`${baseUrl}${urlPath}`, {
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

async function workerLoop(browser, baseUrl, queue, snapshots, failures) {
  const context = await browser.newContext();
  const page = await context.newPage();

  while (queue.length > 0) {
    const urlPath = queue.shift();
    if (!urlPath) break;
    try {
      const snapshot = await prerenderRoute(page, baseUrl, urlPath);
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
  if (process.env.SKIP_PRERENDER === "1" || process.env.SKIP_PRERENDER === "true") {
    console.log("SKIP_PRERENDER set — skipping example-page prerender");
    return;
  }

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

  const port = await resolveListenPort();
  const baseUrl = `http://127.0.0.1:${port}`;
  if (Number(process.env.PRERENDER_PORT || 5055) !== port) {
    console.log(`Port ${process.env.PRERENDER_PORT || 5055} busy — using ${port}`);
  }
  console.log(`Prerendering ${routes.length} routes (${WORKERS} workers) on ${baseUrl}…`);

  const server = await startStaticServer(port);
  try {
    await assertSpaServer(baseUrl);
  } catch (err) {
    server.kill("SIGTERM");
    throw err;
  }
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
  } catch (err) {
    server.kill("SIGTERM");
    const message = err instanceof Error ? err.message : String(err);
    if (/Executable doesn't exist|playwright install/i.test(message)) {
      console.warn(
        "Playwright browser missing — skipping prerender. " +
          "Run `npx playwright install chromium` or set SKIP_PRERENDER=1.",
      );
      return;
    }
    throw err;
  }

  const queue = [...routes];
  const snapshots = [];
  const failures = [];

  const workers = Array.from({ length: Math.min(WORKERS, routes.length) }, () =>
    workerLoop(browser, baseUrl, queue, snapshots, failures),
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
