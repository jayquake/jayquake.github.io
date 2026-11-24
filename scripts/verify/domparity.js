// Usage: node domparity.js <repo> <baseUrlA> <baseUrlB> <outJson> [routesJson]
// Compares the example-page <main> DOM between two served builds for every
// *_success / *_failure route (taken from a crawl json, or engine-rules + data.json).
// Volatile bits are normalised away: inline style (motion), emotion class hashes,
// React useId values.
const fs = require("fs");
const path = require("path");
const [repo, a, b, out, routesJson] = process.argv.slice(2);
const { chromium } = require(path.join(repo, "node_modules", "playwright"));

function routes() {
  const keys = routesJson ? Object.keys(require(path.resolve(routesJson))) : [];
  return keys.filter((r) => /_(success|failure)$/.test(r)).sort();
}

const normalise = (html) =>
  html
    .replace(/\sstyle="[^"]*"/g, "")
    .replace(/\bcss-[a-z0-9]+(-[A-Za-z0-9]+)?/g, "css-X")
    .replace(/:r[0-9a-z]+:/g, ":rX:")
    .replace(/\s+/g, " ");

async function grab(page, url) {
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 25000 });
    await page.waitForSelector('main[data-scan-ready="true"]', { timeout: 15000 });
    await page.waitForTimeout(400);
    return await page.evaluate(() => {
      const m = document.querySelector('main[data-scan-ready="true"]');
      return { ruleId: m.getAttribute("data-rule-id"), variant: m.getAttribute("data-variant"), html: m.outerHTML };
    });
  } catch (e) {
    return { error: e.message.split("\n")[0] };
  }
}

(async () => {
  const list = routes();
  const browser = await chromium.launch();
  const result = {};
  let i = 0;
  async function worker() {
    const pa = await browser.newPage();
    const pb = await browser.newPage();
    while (i < list.length) {
      const r = list[i++];
      const [x, y] = [await grab(pa, a + r), await grab(pb, b + r)];
      const same =
        !x.error && !y.error && x.ruleId === y.ruleId && x.variant === y.variant && normalise(x.html) === normalise(y.html);
      result[r] = same
        ? { same: true }
        : {
            same: false,
            a: x.error || `${x.ruleId}/${x.variant} len=${x.html.length}`,
            b: y.error || `${y.ruleId}/${y.variant} len=${y.html.length}`,
          };
    }
  }
  await Promise.all([worker(), worker(), worker()]);
  await browser.close();
  fs.writeFileSync(out, JSON.stringify(result, null, 2));
  const diff = Object.entries(result).filter(([, v]) => !v.same);
  for (const [r, v] of diff) console.log(`${r}\n   A: ${v.a}\n   B: ${v.b}`);
  console.log(`\n${list.length} example routes, ${diff.length} differ`);
})();
