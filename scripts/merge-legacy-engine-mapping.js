#!/usr/bin/env node
/**
 * Merge AccessFlow engineRules with local legacy-engine-mapping.js.
 * Resolves retired engine ids and id→kebabId aliases. Rewrites the mapping file.
 */
const fs = require("fs");
const path = require("path");
const { toKebabId, RETIRED_ID_TO_CURRENT } = require("../src/lib/rulesCatalog");

const REPO = path.join(__dirname, "..");
const MAPPING_PATH = path.join(REPO, "src/data/legacy-engine-mapping.js");
const LEGACY_RULES_PATH = path.join(REPO, "src/data/legacy-rules.json");

function loadLocalMapping() {
  const src = fs.readFileSync(MAPPING_PATH, "utf8");
  const tmp = path.join(REPO, "scripts/.tmp-legacy-engine-mapping.cjs");
  fs.writeFileSync(
    tmp,
    src.replace(
      /export\s+default\s+legacyEngineMapping\s*;?\s*$/m,
      "module.exports = legacyEngineMapping;\n"
    )
  );
  try {
    delete require.cache[require.resolve(tmp)];
    return require(tmp);
  } finally {
    fs.unlinkSync(tmp);
  }
}

function titleCaseFromKebab(kebabId) {
  return kebabId
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
}

function resolveEngineId(id) {
  if (RETIRED_ID_TO_CURRENT[id]) {
    return toKebabId(RETIRED_ID_TO_CURRENT[id]);
  }
  return toKebabId(id);
}

function entryFor(kebabId, existing) {
  if (existing) {
    return {
      id: kebabId,
      label: existing.label || `${titleCaseFromKebab(kebabId)} (Engine rule)`,
      path: `/engine/${kebabId}`,
    };
  }
  return {
    id: kebabId,
    label: `${titleCaseFromKebab(kebabId)} (Engine rule)`,
    path: `/engine/${kebabId}`,
  };
}

function main() {
  const local = loadLocalMapping();
  const rules = JSON.parse(fs.readFileSync(LEGACY_RULES_PATH, "utf8"));
  const byShort = Object.create(null);
  for (const rule of rules) {
    byShort[rule.shortCode] = rule;
  }

  const allKeys = new Set([...Object.keys(local), ...Object.keys(byShort)]);
  const merged = {};

  for (const shortCode of [...allKeys].sort()) {
    const localEntries = local[shortCode] || [];
    const localById = Object.create(null);
    for (const e of localEntries) {
      localById[resolveEngineId(e.id)] = e;
    }

    const afIds = Array.isArray(byShort[shortCode]?.engineRules)
      ? byShort[shortCode].engineRules
      : [];

    const ordered = [];
    const seen = new Set();

    const pushId = (rawId) => {
      const kebab = resolveEngineId(rawId);
      if (!kebab || seen.has(kebab)) return;
      // Drop retired stubs that resolve to themselves only when AF listed them
      // and there is a better local replacement already — handled by resolve.
      seen.add(kebab);
      ordered.push(entryFor(kebab, localById[kebab]));
    };

    for (const e of localEntries) pushId(e.id);
    for (const id of afIds) pushId(id);

    if (ordered.length) merged[shortCode] = ordered;
  }

  const lines = [];
  lines.push("// Mapping between legacy AccessFlow rules and their related engine rules.");
  lines.push("// Shape:");
  lines.push("// {");
  lines.push("//   [legacyShortCode]: [");
  lines.push("//     {");
  lines.push("//       id: string;    // engine kebabId (URL slug)");
  lines.push("//       label: string;");
  lines.push("//       path: string;  // /engine/<kebabId>");
  lines.push("//     }");
  lines.push("//   ]");
  lines.push("// }");
  lines.push("//");
  lines.push("// Merged in arch #2b from local mapping ∪ AccessFlow engineRules,");
  lines.push("// with retired ids and id≠kebabId aliases resolved.");
  lines.push("");
  lines.push("const legacyEngineMapping = {");

  for (const [shortCode, entries] of Object.entries(merged)) {
    lines.push(`  ${shortCode}: [`);
    for (const e of entries) {
      lines.push("    {");
      lines.push(`      id: ${JSON.stringify(e.id)},`);
      lines.push(`      label: ${JSON.stringify(e.label)},`);
      lines.push(`      path: ${JSON.stringify(e.path)},`);
      lines.push("    },");
    }
    lines.push("  ],");
    lines.push("");
  }

  lines.push("};");
  lines.push("");
  lines.push("export default legacyEngineMapping;");
  lines.push("");

  fs.writeFileSync(MAPPING_PATH, lines.join("\n"));
  console.log(
    `[merge-legacy-engine-mapping] wrote ${Object.keys(merged).length} shortCodes`
  );
}

main();
