// Usage: node fixtureparity.js <repo> <baseUrlOld> <baseUrlNew> <outJson> <routesJson>
// For every *_success / *_failure route, compares each example's fixture subtree
// (section[data-audit-example] > first child) between two builds:
//   - innerHTML (exact)
//   - audit-relevant computed styles of every element in the subtree
// The app chrome around fixtures may change; the fixtures must not.
const fs = require("fs");
const path = require("path");
const [repo, a, b, out, routesJson] = process.argv.slice(2);
const { chromium } = require(path.join(repo, "node_modules", "playwright"));

const routes = Object.keys(require(path.resolve(routesJson)))
  .filter((r) => /_(success|failure)$/.test(r))
  .sort();

const PROPS = [
  "color", "background-color", "font-size", "font-weight", "font-family", "line-height",
  "letter-spacing", "display", "visibility", "opacity", "box-sizing",
  "border-top-style", "border-top-width", "border-top-color", "outline-style",
  "text-decoration-line", "position",
];

async function grab(page, url) {
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 25000 });
    await page.waitForSelector("section[data-audit-example]", { timeout: 15000 });
    await page.waitForTimeout(500);
    return await page.evaluate((props) => {
      return [...document.querySelectorAll("section[data-audit-example]")].map((sec) => {
        const root = sec.firstElementChild;
        if (!root) return { html: "", styles: [] };
        const els = [...root.querySelectorAll("*")];
        const styles = els.map((el) => {
          const cs = getComputedStyle(el);
          return props.map((p) => cs.getPropertyValue(p)).join("|");
        });
        return { html: root.innerHTML, styles };
      });
    }, PROPS);
  } catch (e) {
    return { error: e.message.split("\n")[0] };
  }
}

function compare(x, y) {
  if (x.error || y.error) return `error: ${x.error || "-"} / ${y.error || "-"}`;
  if (x.length !== y.length) return `example count ${x.length} -> ${y.length}`;
  for (let i = 0; i < x.length; i++) {
    if (x[i].html !== y[i].html) return `example ${i}: html differs (${x[i].html.length} -> ${y[i].html.length})`;
    for (let j = 0; j < x[i].styles.length; j++) {
      if (x[i].styles[j] !== y[i].styles[j]) {
        const before = x[i].styles[j].split("|");
        const after = y[i].styles[j].split("|");
        const diff = PROPS.filter((_, k) => before[k] !== after[k]).map((p, k) => p);
        const detail = PROPS.map((p, k) => (before[k] !== after[k] ? `${p}: ${before[k]} -> ${after[k]}` : null)).filter(Boolean);
        return `example ${i} el ${j}: ${detail.join("; ")}` || diff.join(",");
      }
    }
  }
  return null;
}

(async () => {
  const browser = await chromium.launch();
  const result = {};
  let i = 0;
  async function worker() {
    const pa = await browser.newPage({ viewport: { width: 1400, height: 900 } });
    const pb = await browser.newPage({ viewport: { width: 1400, height: 900 } });
    while (i < routes.length) {
      const r = routes[i++];
      const [x, y] = [await grab(pa, a + r), await grab(pb, b + r)];
      const problem = compare(x, y);
      result[r] = problem ? { same: false, problem } : { same: true, examples: x.length };
    }
  }
  await Promise.all([worker(), worker(), worker()]);
  await browser.close();
  fs.writeFileSync(out, JSON.stringify(result, null, 2));
  const diff = Object.entries(result).filter(([, v]) => !v.same);
  for (const [r, v] of diff) console.log(`${r}\n   ${v.problem}`);
  const examples = Object.values(result).reduce((n, v) => n + (v.examples || 0), 0);
  console.log(`\n${routes.length} example routes (${examples} examples identical), ${diff.length} differ`);
})();
