/**
 * Post-build static route fallbacks for GitHub Pages.
 *
 * - Copies build/index.html to route folders (e.g. build/login/index.html)
 *   so deep links return 200 without query-param redirects.
 * - Copies build/index.html to build/404.html so unknown paths still boot
 *   the React app at the requested URL (no ?p= redirect dance).
 */
const fs = require("fs");
const path = require("path");

const BUILD_DIR = path.join(__dirname, "..", "build");
const INDEX_HTML = path.join(BUILD_DIR, "index.html");

const SPA_ROUTES = ["/login", "/login/success"];

function ensureSpaFallback(route) {
  const segments = route.split("/").filter(Boolean);
  const outDir = path.join(BUILD_DIR, ...segments);
  fs.mkdirSync(outDir, { recursive: true });
  fs.copyFileSync(INDEX_HTML, path.join(outDir, "index.html"));
}

function main() {
  if (!fs.existsSync(INDEX_HTML)) {
    console.error("build/index.html not found — run npm run build first");
    process.exit(1);
  }

  for (const route of SPA_ROUTES) {
    ensureSpaFallback(route);
    console.log(`✓ SPA fallback: ${route}`);
  }

  fs.copyFileSync(INDEX_HTML, path.join(BUILD_DIR, "404.html"));
  console.log("✓ SPA fallback: 404.html");
}

main();
