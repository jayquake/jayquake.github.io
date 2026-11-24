// Usage: node flows03.js <repo> <baseUrl>
// Behavioural checks for arch iteration #3 (rule tree model) against a served build.
const path = require("path");
const [repo, base] = process.argv.slice(2);
const { chromium } = require(path.join(repo, "node_modules", "playwright"));

const results = [];
const check = (name, ok, detail = "") => results.push(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? "  — " + detail : ""}`);

const catalog = require(path.join(repo, "public/engine-rules.json")).rules;
const populated = catalog.filter((r) => r.populated !== false);
const stubs = catalog.filter((r) => r.populated === false).map((r) => r.kebabId);
const legacyData = require(path.join(repo, "public/data.json"));
const legacyCriteria = require(path.join(repo, "src/data/legacy-criteria.json"));

// The tree lives in the rule-page sidebar (the "/" table layout has no tree).
const sidebar = (page) => page.locator('aside:has([aria-label="Filter rules in sidebar"])').first();

async function tierButton(page, label) {
  return page.getByRole("button", { name: new RegExp(`^${label}\\s*\\d+`) }).first();
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1400, height: 900 } });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));

  // 1. Engine tier count and category sums; no stub leaves.
  await page.goto(`${base}/engine/alt-misuse`, { waitUntil: "networkidle" });
  const tree = sidebar(page);
  const engineTier = await tierButton(page, "Engine Rules");
  const engineText = (await engineTier.innerText()).replace(/\s+/g, " ");
  check("engine tier shows populated count", engineText.includes(String(populated.length)), engineText);

  const catCounts = await page.evaluate(() => {
    const buttons = [...document.querySelectorAll("button")];
    const tierIdx = (label) => buttons.findIndex((b) => b.innerText.trim().startsWith(label));
    const e = tierIdx("Engine Rules");
    const l = tierIdx("Legacy Rules");
    return buttons
      .slice(e + 1, l)
      .filter((b) => b.className.includes("pl-8"))
      .map((b) => Number((b.innerText.match(/(\d+)\s*$/) || [])[1] || 0));
  });
  // Categories are only rendered when the engine tier is expanded (it is, by default / active rule).
  const sum = catCounts.reduce((a, b) => a + b, 0);
  check("engine category counts sum to tier count", sum === populated.length, `${sum} vs ${populated.length} over ${catCounts.length} categories`);

  // Expand every collapsed engine category, then look for stub ids among leaf links.
  await page.evaluate(() => {
    const buttons = [...document.querySelectorAll("button")];
    const e = buttons.findIndex((b) => b.innerText.trim().startsWith("Engine Rules"));
    const l = buttons.findIndex((b) => b.innerText.trim().startsWith("Legacy Rules"));
    buttons.slice(e + 1, l).filter((b) => b.className.includes("pl-8")).forEach((b) => {
      if (!b.nextElementSibling || b.nextElementSibling.tagName !== "DIV") b.click();
    });
  });
  await page.waitForTimeout(300);
  const leafHrefs = await page.evaluate(() => [...document.querySelectorAll('a[href^="/engine/"]')].map((a) => a.getAttribute("href")));
  const stubLeaf = stubs.find((id) => leafHrefs.some((h) => h.split("?")[0] === `/engine/${id}`));
  check("no stub rule linked in the tree", !stubLeaf, stubLeaf || `${stubs.length} stubs checked`);

  // 2. Active rule auto-expands and shows exactly 3 actions, one Rule Lab, no MCP Debug.
  // The aside also holds app nav ("Engine Library" is current there); match the rule link.
  const activeLink = tree.locator('a[aria-current="page"][href^="/engine/alt-misuse"]');
  check("active rule visible in tree", (await activeLink.count()) === 1, await activeLink.first().innerText().catch(() => "none"));
  const actionLabels = await page.evaluate(() =>
    [...document.querySelectorAll('a[aria-label]')]
      .map((a) => a.getAttribute("aria-label"))
      .filter((l) => /examples|Rule Lab|MCP Debug/.test(l))
  );
  check("active rule has success/failure/Rule Lab actions", ["Success examples", "Failure examples", "Rule Lab"].every((l) => actionLabels.includes(l)), actionLabels.join(","));
  check("no MCP Debug action in the tree", !actionLabels.includes("MCP Debug"));
  const paneMcp = await page.getByRole("link", { name: "MCP Debug" }).count();
  check("detail pane has no MCP Debug link", paneMcp === 0, String(paneMcp));

  // 3. Legacy tier: count = data length, categories in configured order.
  const legacyTier = await tierButton(page, "Legacy Rules");
  const legacyText = (await legacyTier.innerText()).replace(/\s+/g, " ");
  check("legacy tier shows data count", legacyText.includes(String(legacyData.length)), legacyText);
  if (!(await page.evaluate(() => [...document.querySelectorAll("button")].some((b) => b.innerText.trim().startsWith("Graphics"))))) {
    await legacyTier.click();
  }
  const legacyLabels = await page.evaluate(() => {
    const buttons = [...document.querySelectorAll("button")];
    const l = buttons.findIndex((b) => b.innerText.trim().startsWith("Legacy Rules"));
    return buttons
      .slice(l + 1)
      .filter((b) => b.className.includes("pl-8"))
      .map((b) => b.innerText.replace(/\d+\s*$/, "").trim());
  });
  const expectedOrder = [...legacyCriteria.entries].sort((a, b) => a.order - b.order).map((e) => e.label);
  check("legacy categories in configured order", JSON.stringify(legacyLabels) === JSON.stringify(expectedOrder), legacyLabels.join(" | "));

  // 4. Persistence: tier/category expansion survives reload; a manually opened rule bar does not.
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem("ruleTreeExpanded") || "{}"));
  check("only tier/cat keys persisted", Object.keys(stored).every((k) => /^(tier|cat)-/.test(k)), Object.keys(stored).join(","));
  check("legacy tier expansion persisted", stored["tier-legacy"] === true);

  await page.goto(`${base}/engine/alt-misuse`, { waitUntil: "networkidle" });
  const expandBtn = sidebar(page).getByRole("button", { name: "Expand rule actions" }).first();
  const hadExpand = (await expandBtn.count()) > 0;
  if (hadExpand) {
    await expandBtn.click();
    // The active rule's bar is always open; count bars beyond it.
    const openBars = await sidebar(page).getByRole("button", { name: "Collapse rule actions" }).count();
    check("rule bar opens on click", openBars >= 2, String(openBars));
    await page.reload({ waitUntil: "networkidle" });
    const afterReload = await sidebar(page).getByRole("button", { name: "Collapse rule actions" }).count();
    check("manually opened rule bar not persisted", afterReload === 1, `${afterReload} (active rule only)`);
  } else {
    check("rule bar opens on click", false, "no expandable rule visible");
  }
  const legacyAfter = await page.evaluate(() => [...document.querySelectorAll("button")].some((b) => b.innerText.trim().startsWith("Graphics")));
  check("legacy tier still expanded after reload", legacyAfter);

  // 5. Health dot refreshes when the analysis cache changes (no reload).
  const healthTitle = async (id) =>
    page.evaluate((rid) => {
      const a = [...document.querySelectorAll('a[href^="/engine/"]')].find((el) => el.getAttribute("href").split("?")[0] === `/engine/${rid}`);
      return a?.querySelector("span[title]")?.getAttribute("title") || null;
    }, id);
  await page.goto(`${base}/engine/alt-misuse`, { waitUntil: "networkidle" });
  const before = await healthTitle("alt-misuse");
  await page.evaluate(() => {
    const result = { audit: { summary: { critical: 1, serious: 0, moderate: 0, minor: 0 } } };
    localStorage.setItem("audit-analysis-alt-misuse-0-abc", JSON.stringify({ result, ts: Date.now() }));
    window.dispatchEvent(new CustomEvent("audit-analysis-cache-changed"));
  });
  await page.waitForTimeout(300);
  const after = await healthTitle("alt-misuse");
  check("health dot refreshes on cache change", before === "Not analyzed" && after === "Has critical/serious issues", `${before} → ${after}`);
  await page.evaluate(() => localStorage.removeItem("audit-analysis-alt-misuse-0-abc"));

  check("no page errors", errors.length === 0, errors.slice(0, 3).join(" | "));

  await browser.close();
  console.log(results.join("\n"));
  const failed = results.filter((r) => r.startsWith("FAIL")).length;
  console.log(`\n${results.length - failed}/${results.length} passed`);
  process.exit(failed ? 1 : 0);
})().catch((e) => {
  console.error(e);
  process.exit(2);
});
