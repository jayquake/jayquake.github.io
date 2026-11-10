// Usage: node flows01.js <repo> <baseUrl>
// Behavioural checks for arch iteration #1 (library location) against a served build.
const path = require("path");
const [repo, base] = process.argv.slice(2);
const { chromium } = require(path.join(repo, "node_modules", "playwright"));

const results = [];
const check = (name, ok, detail = "") => results.push(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? "  — " + detail : ""}`);
const url = (page) => { const u = new URL(page.url()); return u.pathname + u.search; };

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));

  // 0. flaky route from crawl
  const t0 = Date.now();
  await page.goto(`${base}/engine/image-discernible_success`, { waitUntil: "load", timeout: 30000 });
  check("image-discernible_success loads", (await page.locator("body").innerText()).length > 200, `${Date.now() - t0}ms`);

  // 1. multi-word search survives typing, debounced into ?q=
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  const search = page.getByRole("searchbox", { name: "Search rules" });
  await search.pressSequentially("color contrast", { delay: 30 });
  await page.waitForTimeout(600);
  check("multi-word search keeps the space", (await search.inputValue()) === "color contrast", await search.inputValue());
  check("search writes q to URL", url(page) === "/?q=color+contrast", url(page));

  // 2. filters live in URL and survive opening a rule
  await search.fill("");
  await page.waitForTimeout(400);
  await page.getByRole("combobox", { name: "Filter by impact" }).selectOption("minor");
  check("filter writes to URL", url(page) === "/?impact=minor", url(page));
  const firstRule = page.locator("tbody tr").first().getByRole("link").first();
  const href = await firstRule.getAttribute("href");
  check("row link carries filters", /impact=minor/.test(href) && !/detail=/.test(href), href);
  await firstRule.click();
  await page.waitForURL(/\/engine\//);
  check("filters survive opening a rule", /impact=minor/.test(url(page)), url(page));
  check("compact layout shows impact filter set", (await page.getByRole("combobox", { name: "Filter by impact" }).inputValue()) === "minor");
  check("detail panel open by default", await page.getByRole("button", { name: "Close description panel" }).isVisible());

  // 3. close panel → detail=closed; reopen removes it
  await page.getByRole("button", { name: "Close description panel" }).click();
  check("closing panel writes detail=closed", /detail=closed/.test(url(page)), url(page));
  await page.getByRole("button", { name: /show description/i }).click();
  check("reopening removes detail param", !/detail=/.test(url(page)), url(page));

  // 4. example page Back returns to the rule with state
  const ruleUrl = url(page);
  await page.goto(`${base}${ruleUrl.replace(/(\/engine\/[^?]+)/, "$1_success")}`, { waitUntil: "networkidle" });
  const back = page.getByRole("link", { name: /back to rule/i });
  check("example Back link targets rule + filters", (await back.getAttribute("href")) === ruleUrl, `${await back.getAttribute("href")} vs ${ruleUrl}`);

  // 5. legacy tree hrefs
  const legacyData = require(path.join(repo, "public/data.json"));
  const lr = (Array.isArray(legacyData) ? legacyData : Object.values(legacyData)).find((r) => r.criteria && r.route);
  const legacyPath = `/${lr.criteria.toLowerCase()}/${lr.route}`;
  await page.goto(`${base}${legacyPath}`, { waitUntil: "networkidle" }).catch(() => {});
  await page.waitForTimeout(1500);
  // The active legacy rule auto-expands in the tree; its action bar must use legacy paths.
  const legacyAction = await page.locator(`a[aria-label="Success examples"][href="${legacyPath}_success"]`).count();
  const engineMisroute = await page.locator(`a[href="/engine/${lr.route}_success"]`).count();
  check("legacy tree action uses legacy example path", legacyAction > 0 && engineMisroute === 0,
    `legacy=${legacyAction} engineMisroute=${engineMisroute} (${legacyPath}_success)`);

  // 6. mobile: tapping a rule opens the sheet
  const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await m.goto(`${base}/`, { waitUntil: "networkidle" });
  await m.locator("tbody tr").first().getByRole("link").first().click();
  await m.waitForURL(/\/engine\//);
  check("mobile sheet opens on rule tap", await m.getByRole("button", { name: "Close rule detail" }).isVisible());
  await m.getByRole("button", { name: "Close rule detail" }).click({ position: { x: 20, y: 20 } });
  check("mobile sheet closes and writes detail=closed", /detail=closed/.test(url(m)), url(m));

  check("no page errors", errors.length === 0, errors.slice(0, 3).join(" | "));
  await browser.close();
  console.log(results.join("\n"));
})().catch((e) => { console.log(results.join("\n")); console.error("ABORT", e.message); process.exit(1); });
