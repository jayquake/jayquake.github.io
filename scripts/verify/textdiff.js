// Usage: node textdiff.js <repo> <buildA> <buildB> <route>...
// Serves both builds, captures <main>/body innerText after settling, prints line diff.
const path = require("path");
const [repo, urlA, urlB, ...routes] = process.argv.slice(2);
const { chromium } = require(path.join(repo, "node_modules", "playwright"));


(async () => {
  const browser = await chromium.launch();
  const grab = async (base, route) => {
    const page = await browser.newPage();
    await page.goto(`${base}${route}`, { waitUntil: "networkidle", timeout: 30000 }).catch(() => {});
    await page.waitForTimeout(3000);
    const t = await page.evaluate(() => document.body.innerText);
    await page.close();
    return t.split("\n").map((s) => s.trim()).filter(Boolean);
  };
  for (const route of routes) {
    const [a, b] = [await grab(urlA, route), await grab(urlB, route)];
    const sa2 = new Set(a), sb2 = new Set(b);
    const onlyA = a.filter((l) => !sb2.has(l)), onlyB = b.filter((l) => !sa2.has(l));
    console.log(`\n== ${route}  (A ${a.join("").length} chars, B ${b.join("").length} chars)`);
    onlyA.slice(0, 15).forEach((l) => console.log("  - " + l.slice(0, 140)));
    onlyB.slice(0, 15).forEach((l) => console.log("  + " + l.slice(0, 140)));
    if (!onlyA.length && !onlyB.length) console.log("  identical lines");
  }
  await browser.close();
  process.exit(0);
})();
