// Usage: node crawl.js <repoDir> <baseUrl> <outJson>
const fs = require("fs");
const path = require("path");
const repo = process.argv[2];
const base = process.argv[3];
const out = process.argv[4];
const { chromium } = require(path.join(repo, "node_modules", "playwright"));

function routes() {
  const r = new Set([
    "/", "/login", "/test-runner", "/test-runner/validation", "/test-runner/history",
    "/test-runner/library", "/test-runner/run", "/test-runner/atomic-tests", "/rule-lab",
    "/engine", "/rules", "/graphics",
  ]);
  const eng = require(path.join(repo, "public/engine-rules.json")).rules;
  for (const x of eng) {
    // kebabId is the canonical slug; also crawl engine `id` when it differs (redirects).
    const slugs = new Set([x.kebabId || x.id, x.id || x.kebabId].filter(Boolean));
    for (const slug of slugs) {
      // Library/tree hide stubs; still crawl populated example pages only.
      if (x.populated === false && slug === (x.kebabId || x.id)) {
        r.add(`/engine/${slug}`);
        continue;
      }
      r.add(`/engine/${slug}`);
      r.add(`/engine/${slug}_success`);
      r.add(`/engine/${slug}_failure`);
    }
  }
  const critDir = path.join(repo, "src/components/pages/Criteria");
  for (const cat of fs.readdirSync(critDir)) {
    const rd = path.join(critDir, cat, "rules");
    if (!fs.existsSync(rd)) continue;
    for (const f of fs.readdirSync(rd)) {
      if (!/Routes\.jsx$/.test(f)) continue;
      const src = fs.readFileSync(path.join(rd, f), "utf8");
      for (const m of src.matchAll(/path="([^"]+)"/g)) r.add("/" + m[1].replace(/^\//, ""));
    }
  }
  const data = require(path.join(repo, "public/data.json"));
  for (const x of (Array.isArray(data) ? data : Object.values(data))) {
    if (x.criteria && x.route) r.add(`/${x.criteria}/${x.route}`);
  }
  return [...r].sort();
}

(async () => {
  const list = routes();
  const browser = await chromium.launch();
  const results = {};
  let i = 0;
  async function worker() {
    const ctx = await browser.newContext();
    while (i < list.length) {
      const route = list[i++];
      const page = await ctx.newPage();
      const errors = [];
      page.on("pageerror", (e) => errors.push("pageerror: " + String(e.message).slice(0, 200)));
      // Only same-origin failures are comparable across runs; external/network noise is ignored.
      page.on("response", (res) => {
        if (res.status() >= 400 && res.url().startsWith(base)) {
          errors.push(`http ${res.status()}: ${res.url().slice(base.length)}`);
        }
      });
      try {
        await page.goto(base + route, { waitUntil: "networkidle", timeout: 20000 });
      } catch (e) {
        errors.push("goto: " + e.message.split("\n")[0]);
      }
      await page.waitForTimeout(400);
      const info = await page.evaluate(() => ({
        path: location.pathname,
        h1: (document.querySelector("h1")?.textContent || "").trim().slice(0, 120),
        textLen: document.body.innerText.length,
      })).catch(() => ({}));
      results[route] = { ...info, errors: [...new Set(errors)] };
      await page.close();
    }
    await ctx.close();
  }
  await Promise.all(Array.from({ length: 6 }, worker));
  await browser.close();
  fs.writeFileSync(out, JSON.stringify(results, null, 1));
  console.log(`crawled ${list.length} routes -> ${out}`);
})();
