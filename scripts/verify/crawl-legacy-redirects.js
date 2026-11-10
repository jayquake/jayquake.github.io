// Usage: node scripts/verify/crawl-legacy-redirects.js <repo> <baseUrl> [oldDataJson]
// Visits every OLD legacy rule URL (+ _success/_failure) and asserts each
// replace-redirects to the new path. Rule pages must show the rule name in
// an h1–h3 (UnifiedRulePage uses h3).
const fs = require("fs");
const path = require("path");

const repo = process.argv[2];
const base = process.argv[3];
const oldDataPath =
  process.argv[4] || path.join(repo, "scripts/verify/out/arch01-data.json");
const { chromium } = require(path.join(repo, "node_modules", "playwright"));

const oldRules = JSON.parse(fs.readFileSync(oldDataPath, "utf8"));
const redirects = require(path.join(repo, "src/data/legacy-redirects.json"));
const newRules = require(path.join(repo, "public/data.json"));
const byShort = new Map(newRules.map((r) => [r.shortCode, r]));

const NOISE_ERROR =
  /snipped is executed in unsupported environment|recaptcha is not defined/i;

const targets = [];
for (const old of oldRules) {
  const neu = byShort.get(old.shortCode);
  if (!neu) continue;
  for (const variant of [null, "success", "failure"]) {
    const from = `/${old.criteria}/${old.route}${variant ? `_${variant}` : ""}`;
    const expected =
      redirects[from] ||
      `/${neu.criteria}/${neu.route}${variant ? `_${variant}` : ""}`;
    targets.push({
      from,
      expectedPath: expected,
      h1: neu.name,
      shortCode: old.shortCode,
      variant,
    });
  }
}

(async () => {
  const browser = await chromium.launch();
  const results = [];
  let i = 0;
  async function worker() {
    const ctx = await browser.newContext();
    while (i < targets.length) {
      const t = targets[i++];
      const page = await ctx.newPage();
      const errors = [];
      page.on("pageerror", (e) => {
        const msg = String(e.message);
        if (!NOISE_ERROR.test(msg)) errors.push(msg.slice(0, 120));
      });
      try {
        await page.goto(base + t.from, { waitUntil: "networkidle", timeout: 20000 });
      } catch (e) {
        errors.push("goto: " + e.message.split("\n")[0]);
      }
      await page.waitForTimeout(800);
      const info = await page
        .evaluate(() => {
          const headings = [...document.querySelectorAll("h1, h2, h3")].map((el) =>
            (el.textContent || "").trim()
          );
          return {
            path: location.pathname,
            headings,
            body: (document.body?.innerText || "").slice(0, 500),
          };
        })
        .catch(() => ({}));
      const pathOk = info.path === t.expectedPath;
      const headingHit = (info.headings || []).some(
        (h) => h === t.h1 || h.includes(t.h1)
      );
      const bodyHit = (info.body || "").includes(t.h1);
      // Rule pages: require the rule name. Example pages: path match is enough
      // (fixture titles vary; No examples yet pages have no rule-name heading).
      const h1Ok = t.variant != null ? true : headingHit || bodyHit;
      const ok = pathOk && h1Ok && errors.length === 0;
      results.push({
        ...t,
        path: info.path,
        headings: info.headings,
        errors,
        ok,
        pathOk,
        h1Ok,
      });
      await page.close();
    }
    await ctx.close();
  }
  await Promise.all(Array.from({ length: 6 }, worker));
  await browser.close();

  const failed = results.filter((r) => !r.ok);
  const out = path.join(repo, "scripts/verify/out/legacy-redirects-crawl.json");
  fs.writeFileSync(
    out,
    JSON.stringify({ total: results.length, failed: failed.length, results }, null, 1)
  );
  console.log(`crawled ${results.length} old URLs; ${failed.length} failed → ${out}`);
  for (const f of failed.slice(0, 40)) {
    console.log(
      `FAIL ${f.from} → path=${f.path} (want ${f.expectedPath}) headings=${JSON.stringify(
        (f.headings || []).slice(0, 2)
      )} errors=${(f.errors || []).join(" | ")}`
    );
  }
  const pathFails = results.filter((r) => !r.pathOk).length;
  const nameFails = results.filter((r) => r.pathOk && !r.h1Ok).length;
  console.log(`path mismatches: ${pathFails}; rule-name mismatches: ${nameFails}`);
  process.exit(failed.length ? 1 : 0);
})();
