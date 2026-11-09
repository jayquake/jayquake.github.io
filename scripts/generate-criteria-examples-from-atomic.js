/**
 * Regenerate Criteria Success/Failure example pages from engine atomic-tests.
 *
 * Uses `legacy-engine-mapping.js` (shortCode → engine rule id/path) and
 * `public/data.json` (shortCode → criteria/route) to locate Criteria JSX files
 * via each category's *Routes.jsx imports.
 *
 * Atomic HTML is injected with dangerouslySetInnerHTML so class/for attributes
 * stay valid HTML (Criteria live preview uses those nodes).
 */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const ENGINE_RULES_DIR = path.join(ROOT, "src/components/pages/engine-rules");
const CRITERIA_DIR = path.join(ROOT, "src/components/pages/Criteria");
const DATA_JSON = path.join(ROOT, "public/data.json");
const MAPPING_JS = path.join(ROOT, "src/data/legacy-engine-mapping.js");

const MAX_FIXTURES_PER_PAGE = 80;

function loadLegacyMapping() {
  const src = fs.readFileSync(MAPPING_JS, "utf-8");
  const wrapped = src.replace(
    /export\s+default\s+legacyEngineMapping\s*;?\s*$/,
    "module.exports = legacyEngineMapping;"
  );
  const sandbox = { module: { exports: {} }, exports: {} };
  vm.runInNewContext(wrapped, sandbox, { filename: MAPPING_JS });
  return sandbox.module.exports;
}

function escapeTemplateLiteral(str) {
  return String(str)
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$/g, "\\$");
}

function extractHTMLContent(filePath) {
  return fs
    .readFileSync(filePath, "utf-8")
    .replace(/<!--testconfig[\s\S]*?-->\n?/g, "")
    .trim();
}

function listHtmlFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".html"))
    .sort()
    .map((f) => path.join(dir, f));
}

function walk(dir, pred, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, pred, acc);
    else if (pred(entry.name, full)) acc.push(full);
  }
  return acc;
}

/** Map route path (criteria/route_success) → absolute JSX file path */
function buildRouteFileMap() {
  const routeFiles = walk(CRITERIA_DIR, (name) => /Routes\.jsx$/i.test(name));
  const map = {};

  for (const routeFile of routeFiles) {
    const content = fs.readFileSync(routeFile, "utf-8");
    const imports = {};
    for (const m of content.matchAll(
      /import\s+(\w+)\s+from\s+"\.\/(Success|Failures?|Failure)\/([^"]+)"/g
    )) {
      imports[m[1]] = {
        folder: m[2],
        file: m[3].replace(/\.jsx?$/, "") + ".jsx",
      };
    }

    for (const m of content.matchAll(
      /path="\/?([^"]+_(?:success|failure))"\s+element=\{<(\w+)/g
    )) {
      const routePath = m[1].replace(/^\//, "");
      const comp = m[2];
      const info = imports[comp];
      if (!info) continue;
      map[routePath] = path.join(path.dirname(routeFile), info.folder, info.file);
    }
  }

  return map;
}

function resolveEngineDir(engineEntry) {
  const fromPath = (engineEntry.path || "").replace(/^\/engine\//, "");
  const candidates = [fromPath, engineEntry.id].filter(Boolean);
  for (const name of candidates) {
    const dir = path.join(ENGINE_RULES_DIR, name);
    if (fs.existsSync(dir)) return { dir, folderName: name };
  }
  // Folder may use dots without "v" while id has v2.0
  if (engineEntry.id && engineEntry.id.includes("-v")) {
    const alt = engineEntry.id.replace(/-v(\d)/g, "-$1");
    const dir = path.join(ENGINE_RULES_DIR, alt);
    if (fs.existsSync(dir)) return { dir, folderName: alt };
  }
  return null;
}

function collectFixtures(engineEntries, kind) {
  const fixtures = [];
  const seen = new Set();

  for (const entry of engineEntries) {
    const resolved = resolveEngineDir(entry);
    if (!resolved) {
      console.warn(`  ⚠ Engine folder missing for ${entry.id || entry.path}`);
      continue;
    }
    const files = listHtmlFiles(
      path.join(resolved.dir, "atomic-tests", kind)
    );
    for (const file of files) {
      const key = `${resolved.folderName}:${path.basename(file)}`;
      if (seen.has(key)) continue;
      seen.add(key);
      fixtures.push({
        engineId: resolved.folderName,
        filename: path.basename(file, ".html"),
        html: extractHTMLContent(file),
      });
    }
  }

  return fixtures;
}

function toComponentName(filePath) {
  return path.basename(filePath, ".jsx").replace(/[^a-zA-Z0-9]/g, "");
}

function generateCriteriaComponent({
  componentName,
  description,
  variant,
  fixtures,
  sourceEngineIds,
}) {
  const layout =
    variant === "success"
      ? "../../../../../layout/issueSuccess"
      : "../../../../../layout/issueFailure";
  const LayoutName = variant === "success" ? "IssueSuccess" : "IssueFailure";
  const idPrefix = `${description
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}-${variant}`;

  const items = fixtures
    .slice(0, MAX_FIXTURES_PER_PAGE)
    .map((fx, i) => {
      const id = `${idPrefix}-${i + 1}`;
      const label = `${fx.engineId}/${fx.filename}`;
      return `        <div
          className="list-item"
          id="${id}"
          data-atomic-source="${escapeTemplateLiteral(label)}"
          dangerouslySetInnerHTML={{
            __html: \`${escapeTemplateLiteral(fx.html)}\`,
          }}
        />`;
    })
    .join("\n");

  const truncatedNote =
    fixtures.length > MAX_FIXTURES_PER_PAGE
      ? `\n// Truncated to ${MAX_FIXTURES_PER_PAGE} of ${fixtures.length} atomic fixtures`
      : "";

  return `/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): ${sourceEngineIds.join(", ")}
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import ${LayoutName} from "${layout}";
${truncatedNote}
const itemDescription = ${JSON.stringify(description)};

const ${componentName} = () => (
  <${LayoutName}
    itemContent={
      <>
${items}
      </>
    }
    itemDescription={itemDescription}
  />
);

export default ${componentName};
`;
}

/** Empty Criteria page when there is no engine atomic coverage. */
function generateEmptyCriteriaComponent({
  componentName,
  description,
  variant,
  reason,
}) {
  const layout =
    variant === "success"
      ? "../../../../../layout/issueSuccess"
      : "../../../../../layout/issueFailure";
  const LayoutName = variant === "success" ? "IssueSuccess" : "IssueFailure";

  return `/**
 * AUTO-GENERATED — no engine atomic-tests mapped for this Criteria rule.
 * ${reason}
 * Re-run: node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import ${LayoutName} from "${layout}";

const itemDescription = ${JSON.stringify(description)};

const ${componentName} = () => (
  <${LayoutName}
    itemContent={<></>}
    itemDescription={itemDescription}
  />
);

export default ${componentName};
`;
}

function writeEmptyPage(filePath, description, variant, reason, stats) {
  if (!filePath) return;
  const name = toComponentName(filePath) || "GeneratedEmpty";
  const content = generateEmptyCriteriaComponent({
    componentName: name,
    description,
    variant,
    reason,
  });
  fs.writeFileSync(filePath, content);
  stats.emptied += 1;
}

function main() {
  const mapping = loadLegacyMapping();
  const data = JSON.parse(fs.readFileSync(DATA_JSON, "utf-8"));
  const routeFileMap = buildRouteFileMap();
  const byShortCode = Object.fromEntries(data.map((r) => [r.shortCode, r]));

  const stats = {
    updated: 0,
    emptied: 0,
    skippedNoFile: 0,
    errors: 0,
  };

  console.log("Generating Criteria examples from atomic-tests…\n");

  for (const [shortCode, engineEntries] of Object.entries(mapping)) {
    const rule = byShortCode[shortCode];
    if (!rule) {
      console.warn(`⚠ shortCode not in data.json: ${shortCode}`);
      stats.errors += 1;
      continue;
    }

    const base = `${rule.criteria}/${rule.route}`;
    const successPath = routeFileMap[`${base}_success`];
    const failurePath = routeFileMap[`${base}_failure`];

    if (!successPath && !failurePath) {
      console.warn(`⚠ No Criteria Success/Failure route file for ${base} (${shortCode})`);
      stats.skippedNoFile += 1;
      continue;
    }

    const passFixtures = collectFixtures(engineEntries, "pass");
    const failFixtures = collectFixtures(engineEntries, "fail");
    const sourceIds = engineEntries.map((e) => e.id);

    const descriptionBase = `${capitalize(rule.criteria)}: ${rule.name}`;

    if (successPath && passFixtures.length) {
      const name = toComponentName(successPath);
      const content = generateCriteriaComponent({
        componentName: name || "GeneratedSuccess",
        description: `${descriptionBase} - Success`,
        variant: "success",
        fixtures: passFixtures,
        sourceEngineIds: sourceIds,
      });
      fs.writeFileSync(successPath, content);
      console.log(
        `✓ ${base}_success ← ${passFixtures.length} pass fixture(s) [${sourceIds.join(", ")}]`
      );
      stats.updated += 1;
    } else if (successPath) {
      writeEmptyPage(
        successPath,
        `${descriptionBase} - Success (none)`,
        "success",
        `Mapped engine rule(s) [${sourceIds.join(", ")}] have no pass atomic fixtures.`,
        stats
      );
      console.log(`○ ${base}_success ← none (no pass fixtures)`);
    }

    if (failurePath && failFixtures.length) {
      const name = toComponentName(failurePath);
      const content = generateCriteriaComponent({
        componentName: name || "GeneratedFailure",
        description: `${descriptionBase} - Failure`,
        variant: "failure",
        fixtures: failFixtures,
        sourceEngineIds: sourceIds,
      });
      fs.writeFileSync(failurePath, content);
      console.log(
        `✓ ${base}_failure ← ${failFixtures.length} fail fixture(s) [${sourceIds.join(", ")}]`
      );
      stats.updated += 1;
    } else if (failurePath) {
      writeEmptyPage(
        failurePath,
        `${descriptionBase} - Failure (none)`,
        "failure",
        `Mapped engine rule(s) [${sourceIds.join(", ")}] have no fail atomic fixtures.`,
        stats
      );
      console.log(`○ ${base}_failure ← none (no fail fixtures)`);
    }
  }

  // Unmapped Criteria: no engine counterpart → empty examples (none)
  for (const rule of data) {
    if (mapping[rule.shortCode]) continue;
    const base = `${rule.criteria}/${rule.route}`;
    const descriptionBase = `${capitalize(rule.criteria)}: ${rule.name}`;
    const reason =
      "No engine rule mapping in legacy-engine-mapping.js — intentional none.";
    const successPath = routeFileMap[`${base}_success`];
    const failurePath = routeFileMap[`${base}_failure`];
    if (!successPath && !failurePath) {
      console.warn(`⚠ Unmapped ${base} (${rule.shortCode}): no route files`);
      stats.skippedNoFile += 1;
      continue;
    }
    writeEmptyPage(
      successPath,
      `${descriptionBase} - Success (none)`,
      "success",
      reason,
      stats
    );
    writeEmptyPage(
      failurePath,
      `${descriptionBase} - Failure (none)`,
      "failure",
      reason,
      stats
    );
    console.log(`○ ${base} ← none (unmapped Criteria: ${rule.shortCode})`);
  }

  console.log("\n=== Summary ===");
  console.log(`Updated with atomic fixtures: ${stats.updated}`);
  console.log(`Emptied (none): ${stats.emptied}`);
  console.log(`Missing route file: ${stats.skippedNoFile}`);
  console.log(`Errors: ${stats.errors}`);
}

function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

main();
