#!/usr/bin/env node
/**
 * Sync legacy AccessFlow rules into this repo.
 *
 * Source (in order):
 *   1. ACCESSFLOW_RULES_PATH — local dump file
 *   2. gh api raw file from acsbe/accessFlow@main
 *
 * The dump is concatenated Mongo JSON documents (not one array).
 *
 * Writes:
 *   public/data.json
 *   src/data/legacy-rules.json
 *   src/data/legacy-redirects.json   (old path → new path, incl. _success/_failure)
 *   src/data/legacy-criteria.json    (sorted criteria slugs for route matching)
 *
 * With --rewrite-routes: re-keys path="..." in Criteria *Routes.jsx files
 * (fixture components and folders are left untouched).
 *
 * Prints an engineRules ↔ legacy-engine-mapping.js conflict report (no merge).
 */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const REPO = path.join(__dirname, "..");
const OUT_PUBLIC = path.join(REPO, "public/data.json");
const OUT_SRC = path.join(REPO, "src/data/legacy-rules.json");
const OUT_REDIRECTS = path.join(REPO, "src/data/legacy-redirects.json");
const OUT_CRITERIA = path.join(REPO, "src/data/legacy-criteria.json");
const OUT_FIXTURES = path.join(REPO, "src/data/legacy-example-fixtures.json");
const MAPPING_PATH = path.join(REPO, "src/data/legacy-engine-mapping.js");
const CRITERIA_DIR = path.join(REPO, "src/components/pages/Criteria");
const DEFAULT_REMOTE =
  "repos/acsbe/accessFlow/contents/deps/mongodb/dump-json/accessFlow/rules.json?ref=main";

const RETIRED_ENGINE_IDS = new Set([
  "interactive-not-tabbable",
  "tabbable-non-interactive",
  "navigation-submenu-region",
  "icon-discernible",
]);

const REWRITE_ROUTES = process.argv.includes("--rewrite-routes");

function parseConcatenatedJson(raw) {
  const docs = [];
  let depth = 0;
  let start = null;
  let inStr = false;
  let esc = false;
  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];
    if (inStr) {
      if (esc) esc = false;
      else if (ch === "\\") esc = true;
      else if (ch === '"') inStr = false;
      continue;
    }
    if (ch === '"') {
      inStr = true;
      continue;
    }
    if (ch === "{") {
      if (depth === 0) start = i;
      depth += 1;
    } else if (ch === "}") {
      depth -= 1;
      if (depth === 0 && start !== null) {
        docs.push(JSON.parse(raw.slice(start, i + 1)));
        start = null;
      }
    }
  }
  return docs;
}

function loadSourceRaw() {
  const localPath = process.env.ACCESSFLOW_RULES_PATH;
  if (localPath) {
    if (!fs.existsSync(localPath)) {
      throw new Error(`ACCESSFLOW_RULES_PATH not found: ${localPath}`);
    }
    console.log(`Reading local dump: ${localPath}`);
    return fs.readFileSync(localPath, "utf8");
  }
  console.log(`Fetching via gh api: ${DEFAULT_REMOTE}`);
  return execFileSync(
    "gh",
    ["api", DEFAULT_REMOTE, "-H", "Accept: application/vnd.github.raw"],
    { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }
  );
}

function normalizeRule(doc) {
  const rule = { ...doc };
  const links = Array.isArray(rule.issueWCAGLinks) ? rule.issueWCAGLinks : [];
  if (!rule.issueWCAGLink && links.length) {
    rule.issueWCAGLink = links[0];
  }
  return rule;
}

function loadPreviousRules() {
  if (!fs.existsSync(OUT_PUBLIC)) return [];
  const prev = JSON.parse(fs.readFileSync(OUT_PUBLIC, "utf8"));
  return Array.isArray(prev) ? prev : Object.values(prev);
}

function rulePath(criteria, route, variant) {
  const base = `/${criteria}/${route}`;
  return variant ? `${base}_${variant}` : base;
}

function loadExistingRedirects() {
  if (!fs.existsSync(OUT_REDIRECTS)) return {};
  try {
    return JSON.parse(fs.readFileSync(OUT_REDIRECTS, "utf8"));
  } catch {
    return {};
  }
}

function buildRedirects(previous, next) {
  const byShort = new Map(next.map((r) => [r.shortCode, r]));
  /** @type {Record<string, string>} */
  // Keep previously recorded redirects so re-running after a sync does not
  // wipe the old→new map (previous data.json already matches AccessFlow).
  const redirects = { ...loadExistingRedirects() };
  for (const old of previous) {
    const neu = byShort.get(old.shortCode);
    if (!neu) continue;
    const oldCrit = (old.criteria || "").toLowerCase();
    const newCrit = (neu.criteria || "").toLowerCase();
    const oldRoute = old.route;
    const newRoute = neu.route;
    if (oldCrit === newCrit && oldRoute === newRoute) continue;
    for (const variant of [null, "success", "failure"]) {
      const from = rulePath(oldCrit, oldRoute, variant);
      const to = rulePath(newCrit, newRoute, variant);
      redirects[from] = to;
    }
  }
  return redirects;
}

function loadLocalMapping() {
  const src = fs.readFileSync(MAPPING_PATH, "utf8");
  const tmp = path.join(REPO, "scripts/.tmp-legacy-engine-mapping.cjs");
  fs.writeFileSync(
    tmp,
    src.replace(/export\s+default\s+legacyEngineMapping\s*;?\s*$/m, "module.exports = legacyEngineMapping;\n")
  );
  try {
    delete require.cache[require.resolve(tmp)];
    return require(tmp);
  } finally {
    fs.unlinkSync(tmp);
  }
}

function printConflictReport(rules, mapping) {
  const agree = [];
  const differ = [];
  const localOnly = [];
  const retiredHits = new Set();

  for (const rule of rules) {
    const af = Array.isArray(rule.engineRules) ? [...rule.engineRules] : [];
    const local = (mapping[rule.shortCode] || []).map((x) => x.id);
    for (const id of af) {
      if (RETIRED_ENGINE_IDS.has(id)) retiredHits.add(id);
    }
    if (!af.length) {
      if (local.length) localOnly.push(rule.shortCode);
      continue;
    }
    const a = new Set(af);
    const b = new Set(local);
    const eq = a.size === b.size && [...a].every((id) => b.has(id));
    if (eq) agree.push(rule.shortCode);
    else {
      differ.push({
        shortCode: rule.shortCode,
        accessFlow: af,
        local,
      });
    }
  }

  // mapping keys that exist only locally (no AF engineRules) already counted;
  // also count mapping keys absent from AF dump entirely
  for (const key of Object.keys(mapping)) {
    if (!rules.some((r) => r.shortCode === key) && (mapping[key] || []).length) {
      if (!localOnly.includes(key)) localOnly.push(key);
    }
  }

  console.log("\n== engineRules ↔ legacy-engine-mapping conflict report ==");
  console.log(`Agree:      ${agree.length}`);
  console.log(`Differ:     ${differ.length}`);
  console.log(`Local-only: ${localOnly.length}`);
  console.log(`Retired engine ids referenced by AccessFlow: ${[...retiredHits].sort().join(", ") || "(none)"}`);
  if (differ.length) {
    console.log("\nDiffer details:");
    for (const d of differ) {
      console.log(`  ${d.shortCode}`);
      console.log(`    AccessFlow: ${JSON.stringify(d.accessFlow)}`);
      console.log(`    local:      ${JSON.stringify(d.local)}`);
    }
  }
  return { agree, differ, localOnly, retiredHits: [...retiredHits] };
}

function collectRoutesFiles() {
  const files = [];
  for (const cat of fs.readdirSync(CRITERIA_DIR)) {
    const rulesDir = path.join(CRITERIA_DIR, cat, "rules");
    if (!fs.existsSync(rulesDir)) continue;
    for (const f of fs.readdirSync(rulesDir)) {
      if (/Routes\.jsx$/.test(f)) files.push(path.join(rulesDir, f));
    }
  }
  return files;
}

/**
 * Re-key path="oldCriteria/oldRoute_…" using redirects that change the
 * criteria and/or route segment. Fixture imports and folders stay put.
 */
function rewriteRoutesFiles(redirects) {
  // Map "criteria/route" (no leading slash, no variant) → new "criteria/route"
  const baseMap = new Map();
  for (const [from, to] of Object.entries(redirects)) {
    if (/_(success|failure)$/.test(from)) continue;
    const fromKey = from.replace(/^\//, "");
    const toKey = to.replace(/^\//, "");
    baseMap.set(fromKey, toKey);
  }

  let filesTouched = 0;
  let pathsRewritten = 0;
  for (const file of collectRoutesFiles()) {
    let src = fs.readFileSync(file, "utf8");
    let changed = false;
    src = src.replace(/path="([^"]+)"/g, (full, p) => {
      const trimmed = p.replace(/^\//, "");
      const variantMatch = trimmed.match(/^(.*)_(success|failure)$/);
      const base = variantMatch ? variantMatch[1] : trimmed;
      const variant = variantMatch ? `_${variantMatch[2]}` : "";
      const neu = baseMap.get(base);
      if (!neu) return full;
      changed = true;
      pathsRewritten += 1;
      // Preserve a leading slash if the original had one.
      const prefix = p.startsWith("/") ? "/" : "";
      return `path="${prefix}${neu}${variant}"`;
    });
    if (changed) {
      fs.writeFileSync(file, src);
      filesTouched += 1;
      console.log(`  rewrote paths in ${path.relative(REPO, file)}`);
    }
  }
  console.log(`Route rewrite: ${pathsRewritten} path attrs in ${filesTouched} files`);
}

/** Scan *Routes.jsx for example paths that have real fixtures. */
function writeFixtureIndex() {
  const paths = new Set();
  for (const file of collectRoutesFiles()) {
    const src = fs.readFileSync(file, "utf8");
    for (const m of src.matchAll(/path="([^"]+)"/g)) {
      const p = "/" + m[1].replace(/^\//, "");
      if (/_(success|failure)$/.test(p)) paths.add(p);
    }
  }
  const list = [...paths].sort();
  fs.writeFileSync(OUT_FIXTURES, `${JSON.stringify({ paths: list }, null, 2)}\n`);
  console.log(`Fixture index: ${list.length} example paths → ${path.relative(REPO, OUT_FIXTURES)}`);
}

function criteriaFromRules(rules) {
  return [...new Set(rules.map((r) => (r.criteria || "").toLowerCase()).filter(Boolean))].sort();
}

function main() {
  const previous = loadPreviousRules();
  const raw = loadSourceRaw();
  const docs = parseConcatenatedJson(raw);
  const rules = docs.map(normalizeRule);

  if (rules.length !== 96) {
    console.warn(`Expected 96 rules, got ${rules.length}`);
  }

  const criteria = criteriaFromRules(rules);
  const redirects = buildRedirects(previous, rules);
  const disabled = rules.filter((r) => r.enabled === false);
  const previousByCode = new Map(previous.map((r) => [r.shortCode, r]));
  const added = rules.filter((r) => !previousByCode.has(r.shortCode));
  const moved = rules.filter((r) => {
    const old = previousByCode.get(r.shortCode);
    if (!old) return false;
    return old.criteria !== r.criteria || old.route !== r.route;
  });

  const json = `${JSON.stringify(rules, null, 2)}\n`;
  fs.writeFileSync(OUT_PUBLIC, json);
  fs.writeFileSync(OUT_SRC, json);
  fs.writeFileSync(OUT_REDIRECTS, `${JSON.stringify(redirects, null, 2)}\n`);
  fs.writeFileSync(
    OUT_CRITERIA,
    `${JSON.stringify({ criteria, prefixes: criteria.map((c) => `/${c}`) }, null, 2)}\n`
  );

  console.log(`Wrote ${rules.length} rules → public/data.json + src/data/legacy-rules.json`);
  console.log(`Criteria (${criteria.length}): ${criteria.join(", ")}`);
  console.log(`Disabled: ${disabled.length}`);
  console.log(`New: ${added.length} (${added.map((r) => r.shortCode).join(", ") || "—"})`);
  console.log(`Moved criteria/route: ${moved.length}`);
  console.log(`Redirect entries: ${Object.keys(redirects).length}`);

  const mapping = loadLocalMapping();
  printConflictReport(rules, mapping);

  if (REWRITE_ROUTES) {
    console.log("\n== rewriting Criteria *Routes.jsx paths ==");
    rewriteRoutesFiles(redirects);
  } else {
    console.log("\n(Skip route rewrite — pass --rewrite-routes to re-key *Routes.jsx)");
  }

  // Always refresh the fixture index from whatever *Routes.jsx currently say.
  writeFixtureIndex();
}

main();
