// Usage: node themecheck.js <repo> <baseUrl> <outDir> [baseUrlOld]
// Loads key app pages in light and dark, saves screenshots, and runs axe-core on
// the app UI only (fixture subtrees [data-fixture] excluded). Reports
// color-contrast and other serious/critical violations per page and theme.
// With baseUrlOld, the old build is scanned in light too, so new violations stand out.
const fs = require("fs");
const path = require("path");
const [repo, base, outDir, baseOld] = process.argv.slice(2);
const { chromium } = require(path.join(repo, "node_modules", "playwright"));
const AXE = fs.readFileSync(path.join(repo, "node_modules/axe-core/axe.min.js"), "utf8");

const PAGES = [
  "/",
  "/engine/alt-misuse",
  "/engine/alt-misuse_success",
  "/engine/alt-misuse_failure",
  "/forms/form-labels",
  "/rule-lab",
  "/rule-lab?ruleId=alt-misuse&type=engine",
  "/test-runner",
  "/test-runner/library",
  "/test-runner/history",
  "/test-runner/atomic-tests",
  "/test-runner/validation",
  "/login",
];

async function scan(browser, url, scheme, shot) {
  const ctx = await browser.newContext({ viewport: { width: 1400, height: 900 } });
  await ctx.addInitScript((s) => {
    try {
      localStorage.setItem("raiden-color-scheme", s);
    } catch {}
  }, scheme);
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  } catch (e) {
    await ctx.close();
    return { error: e.message.split("\n")[0] };
  }
  await page.waitForTimeout(600);
  const theme = await page.evaluate(() => document.documentElement.getAttribute("data-theme"));
  if (shot) await page.screenshot({ path: shot, fullPage: false });
  await page.addScriptTag({ content: AXE });
  const res = await page.evaluate(async () => {
    // eslint-disable-next-line no-undef
    const r = await axe.run(
      { include: [["body"]], exclude: [["[data-fixture]"], ["iframe"]] },
      { resultTypes: ["violations"], runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"] } }
    );
    return r.violations
      .filter((v) => v.impact === "serious" || v.impact === "critical")
      .map((v) => ({ id: v.id, impact: v.impact, count: v.nodes.length, sample: v.nodes.slice(0, 2).map((n) => n.target.join(" ")) }));
  });
  await ctx.close();
  return { theme, violations: res, pageErrors: errors.slice(0, 3) };
}

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  const report = {};
  for (const p of PAGES) {
    const slug = p.replace(/[^a-z0-9]+/gi, "_").replace(/^_|_$/g, "") || "home";
    report[p] = {};
    for (const scheme of ["light", "dark"]) {
      report[p][scheme] = await scan(browser, base + p, scheme, path.join(outDir, `${slug}.${scheme}.png`));
    }
    if (baseOld) report[p].oldLight = await scan(browser, baseOld + p, "light", null);
  }
  await browser.close();
  fs.writeFileSync(path.join(outDir, "report.json"), JSON.stringify(report, null, 2));
  const key = (v) => `${v.id}`;
  for (const [p, r] of Object.entries(report)) {
    const line = ["light", "dark"].map((s) => {
      const x = r[s];
      if (x.error) return `${s}: ERROR ${x.error}`;
      const v = x.violations.map((v) => `${v.id}(${v.count})`).join(",") || "ok";
      return `${s}[${x.theme}]: ${v}${x.pageErrors.length ? " pageerr" : ""}`;
    });
    let extra = "";
    if (r.oldLight && !r.oldLight.error) {
      const old = new Set(r.oldLight.violations.map(key));
      const added = (r.light.violations || []).filter((v) => !old.has(key(v))).map(key);
      const fixed = r.oldLight.violations.filter((v) => !(r.light.violations || []).some((n) => key(n) === key(v))).map(key);
      extra = `  | new vs old: ${added.join(",") || "-"}  fixed: ${fixed.join(",") || "-"}`;
    }
    console.log(`${p}\n   ${line.join("\n   ")}${extra}`);
  }
})();
