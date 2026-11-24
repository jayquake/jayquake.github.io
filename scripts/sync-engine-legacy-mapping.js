#!/usr/bin/env node

/** Build engine → legacy rule links from the maintained AccessFlow mapping CSV. */
const fs = require("fs");
const path = require("path");

const source = process.argv[2];
if (!source) throw new Error("Usage: node scripts/sync-engine-legacy-mapping.js <mapping.csv>");

function parseLine(line) {
  const values = [];
  let value = "";
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"' && line[i + 1] === '"') { value += '"'; i += 1; }
    else if (char === '"') quoted = !quoted;
    else if (char === "," && !quoted) { values.push(value.trim()); value = ""; }
    else value += char;
  }
  values.push(value.trim());
  return values;
}

const root = path.resolve(__dirname, "..");
const legacyRules = JSON.parse(fs.readFileSync(path.join(root, "src/data/legacy-rules.json"), "utf8"));
const catalog = JSON.parse(fs.readFileSync(path.join(root, "public/engine-rules.json"), "utf8"));
const normalize = (value) => String(value || "").replace(/[^a-z0-9]/gi, "").toLowerCase();
const enginesByName = new Map(catalog.rules.map((rule) => [normalize(rule.id || rule.kebabId), rule.kebabId]));
const legacyByShortCode = new Map(legacyRules.map((rule) => [rule.shortCode, rule]));
const legacyAliases = { ariaLabelMissuse: "ariaLabelMisuse" };
const engineAliases = {
  breadcrumbsnav: ["breadcrumbs-nav"],
  listitemwithinlist: ["list-item-misuse"],
  captchaaccessibleprovider: ["captcha-accessible-provider-2.0", "captcha-accessible-provider-2.2"],
  pagemetaviewport: ["page-meta-viewport"],
};
const rows = fs.readFileSync(source, "utf8").trim().split(/\r?\n/).slice(1).map(parseLine);
const mapping = {};
const unresolved = [];

for (const row of rows) {
  const [, shortCode, engineNames, status] = row;
  if (status !== "Migrated" || !shortCode || !engineNames) continue;
  const legacy = legacyByShortCode.get(legacyAliases[shortCode] || shortCode);
  if (!legacy) { unresolved.push(`legacy:${shortCode}`); continue; }
  for (const name of engineNames.split(",").map((item) => item.trim()).filter(Boolean)) {
    const engineIds = engineAliases[normalize(name)] || [enginesByName.get(normalize(name))];
    if (!engineIds[0]) { unresolved.push(`engine:${name}`); continue; }
    for (const engineId of engineIds) {
      const entries = mapping[engineId] || (mapping[engineId] = []);
      entries.push({ label: `${legacy.name} (Legacy rule)`, path: `/${legacy.criteria}/${legacy.route}` });
    }
  }
}

for (const entries of Object.values(mapping)) entries.sort((a, b) => a.label.localeCompare(b.label));
const output = `// Generated from the maintained AccessFlow-to-engine mapping CSV.\n// Run: node scripts/sync-engine-legacy-mapping.js <mapping.csv>\n\nconst engineLegacyMapping = ${JSON.stringify(mapping, null, 2)};\n\nexport default engineLegacyMapping;\n`;
fs.writeFileSync(path.join(root, "src/data/engine-legacy-mapping.js"), output);
console.log(`Mapped ${Object.keys(mapping).length} engine rules; ${unresolved.length} unresolved entries.`);
if (unresolved.length) console.log(unresolved.join("\n"));
