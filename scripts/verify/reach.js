// Usage: node reach.js <repoDir>
// Prints src files NOT reachable from entry points via static/dynamic relative imports.
// Fixture trees (engine-rules/, Criteria/**/rules/{Success,Failure,Failures}) are reported separately, never as candidates.
const fs = require("fs");
const path = require("path");
const repo = process.argv[2];
const SRC = path.join(repo, "src");
const EXTS = [".js", ".jsx", ".ts", ".tsx", ".json", ".css"];

function walk(d, out = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}
const all = walk(SRC);
const code = all.filter((f) => /\.(jsx?|tsx?)$/.test(f));

function resolve(from, spec) {
  if (!spec.startsWith(".")) return null;
  const base = path.resolve(path.dirname(from), spec);
  const cands = [base, ...EXTS.map((x) => base + x), ...EXTS.map((x) => path.join(base, "index" + x))];
  // exact-case check (macOS is case-insensitive)
  for (const c of cands) {
    if (!fs.existsSync(c) || !fs.statSync(c).isFile()) continue;
    const dir = path.dirname(c);
    if (fs.readdirSync(dir).includes(path.basename(c))) return c;
  }
  return null;
}

const dynamicDirs = new Set();
function deps(f) {
  const s = fs.readFileSync(f, "utf8");
  const out = [];
  const re = /(?:import|export)\s[^'"`]*?from\s*['"]([^'"]+)['"]|import\s*['"]([^'"]+)['"]|import\(\s*['"]([^'"]+)['"]\s*\)|require\(\s*['"]([^'"]+)['"]\s*\)/g;
  for (const m of s.matchAll(re)) {
    const spec = m[1] || m[2] || m[3] || m[4];
    const r = resolve(f, spec);
    if (r) out.push(r);
  }
  // template dynamic imports: import(`../x/${y}`) -> whole dir prefix reachable
  for (const m of s.matchAll(/import\(\s*`([^`$]*)\$\{/g)) {
    if (m[1].startsWith(".")) dynamicDirs.add(path.resolve(path.dirname(f), m[1]));
  }
  // require.context
  for (const m of s.matchAll(/require\.context\(\s*['"]([^'"]+)['"]/g)) {
    dynamicDirs.add(path.resolve(path.dirname(f), m[1]));
  }
  return out;
}

const entries = [
  path.join(SRC, "index.js"),
  path.join(SRC, "setupTests.js"),
  ...code.filter((f) => /\.(test|spec)\.(jsx?|tsx?)$/.test(f) && !f.includes("/engine-rules/")),
];
const seen = new Set();
const stack = entries.filter((e) => fs.existsSync(e));
while (stack.length) {
  const f = stack.pop();
  if (seen.has(f)) continue;
  seen.add(f);
  if (/\.(jsx?|tsx?)$/.test(f)) for (const d of deps(f)) stack.push(d);
  // expand dynamic dirs lazily
  for (const d of dynamicDirs) {
    for (const g of all) if (g.startsWith(d) && !seen.has(g) && /\.(jsx?|tsx?)$/.test(g)) stack.push(g);
  }
}

const isFixture = (f) =>
  f.includes("/pages/engine-rules/") || /\/Criteria\/[^/]+\/rules\/(Success|Failure|Failures)\//.test(f);
const unreachable = all.filter((f) => !seen.has(f) && /\.(jsx?|tsx?|css)$/.test(f) && !/\.d\.ts$/.test(f));
const rel = (f) => path.relative(repo, f);
console.log("== dynamic import dirs ==");
for (const d of dynamicDirs) console.log(rel(d));
console.log("\n== UNREACHABLE (non-fixture) ==");
for (const f of unreachable.filter((f) => !isFixture(f))) console.log(rel(f));
console.log("\n== unreachable fixtures (count only, not deleted) ==", unreachable.filter(isFixture).length);
