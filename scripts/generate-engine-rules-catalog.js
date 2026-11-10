#!/usr/bin/env node
/**
 * One generator for public/engine-rules.json.
 * Reads each engine-rules rule folder metadata.js, normalises via src/lib/rulesCatalog,
 * and keeps generatedAt stable when rule content is unchanged.
 *
 * Also writes src/data/engine-id-redirects.json for id → kebabId URL redirects.
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const {
  normalizeRule,
  ID_TO_KEBAB,
} = require("../src/lib/rulesCatalog");

const REPO = path.join(__dirname, "..");
const ENGINE_RULES_DIR = path.join(REPO, "src/components/pages/engine-rules");
const CATALOG_OUT = path.join(REPO, "public/engine-rules.json");
const REDIRECTS_OUT = path.join(REPO, "src/data/engine-id-redirects.json");

function parseMetadataFile(filePath, kebabId) {
  const content = fs.readFileSync(filePath, "utf8");
  const match = content.match(
    /export const (\w+) = \{([^}]+(?:\{[^}]+\}[^}]*)*)\};/s
  );
  if (!match) {
    throw new Error(`Could not parse metadata for: ${kebabId}`);
  }
  const objectContent = match[2];

  const id = (objectContent.match(/id:\s*"([^"]+)"/) || ["", ""])[1];

  const titleTemplateMatch = objectContent.match(/title:\s*`([\s\S]*?)`/);
  const titleQuoteMatch = objectContent.match(/title:\s*"([^"]+)"/);
  const title = titleTemplateMatch
    ? titleTemplateMatch[1]
    : titleQuoteMatch
      ? titleQuoteMatch[1].replace(/\\"/g, '"')
      : "";

  const descriptionTemplateMatch = objectContent.match(
    /description:\s*`([\s\S]*?)`/
  );
  const descriptionQuoteMatch = objectContent.match(
    /description:\s*"([^"]+)"/
  );
  const description = descriptionTemplateMatch
    ? descriptionTemplateMatch[1]
    : descriptionQuoteMatch
      ? descriptionQuoteMatch[1].replace(/\\"/g, '"')
      : "";

  const adviceMatch = objectContent.match(/advice:\s*`([\s\S]*?)`/);
  const adviceHtml = adviceMatch
    ? adviceMatch[1]
        .replace(/\\`/g, "`")
        .replace(/\\\$/g, "$")
        .replace(/\\"/g, '"')
    : "";

  const impact = (objectContent.match(/impact:\s*"([^"]+)"/) || ["", ""])[1];

  const refsMatch = objectContent.match(/refs:\s*\[([^\]]*)\]/s);
  let refs = [];
  if (refsMatch && refsMatch[1].trim()) {
    const refObjects = refsMatch[1].match(/\{[^}]+\}/g) || [];
    refs = refObjects.map((refStr) => {
      const type = (refStr.match(/type:\s*"([^"]+)"/) || ["", ""])[1];
      const refId = (refStr.match(/id:\s*"([^"]+)"/) || ["", ""])[1];
      const level = (refStr.match(/level:\s*"([^"]+)"/) || ["", ""])[1];
      const link = (refStr.match(/link:\s*"([^"]+)"/) || ["", ""])[1];
      return { type, id: refId, level, link };
    });
  }

  return {
    id,
    kebabId,
    title,
    description,
    adviceHtml,
    impact,
    refs,
  };
}

function collectRawRules() {
  const ruleDirs = fs
    .readdirSync(ENGINE_RULES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((name) => !["interfaces.ts", "index.ts"].includes(name));

  const rules = [];
  for (const kebabId of ruleDirs) {
    const metadataPath = path.join(ENGINE_RULES_DIR, kebabId, "metadata.js");
    if (!fs.existsSync(metadataPath)) {
      console.log(`⊘ Skipping ${kebabId} - no metadata.js`);
      continue;
    }
    try {
      rules.push(parseMetadataFile(metadataPath, kebabId));
      console.log(`✓ ${kebabId}`);
    } catch (err) {
      console.error(`✗ ${kebabId}: ${err.message}`);
    }
  }
  return rules;
}

function contentFingerprint(rules) {
  // Exclude generatedAt; hash stable rule payload only.
  const payload = JSON.stringify(rules);
  return crypto.createHash("sha256").update(payload).digest("hex");
}

function buildIdRedirects(rules) {
  const redirects = {};
  for (const rule of rules) {
    if (!rule.id || rule.id === rule.kebabId) continue;
    for (const variant of ["", "_success", "_failure"]) {
      redirects[`/engine/${rule.id}${variant}`] = `/engine/${rule.kebabId}${variant}`;
    }
  }
  // Ensure the known 8 pairs are present even if a folder is missing.
  for (const [id, kebab] of Object.entries(ID_TO_KEBAB)) {
    for (const variant of ["", "_success", "_failure"]) {
      const from = `/engine/${id}${variant}`;
      const to = `/engine/${kebab}${variant}`;
      if (!redirects[from]) redirects[from] = to;
    }
  }
  return redirects;
}

function main() {
  const raw = collectRawRules();
  const rules = raw
    .map((row) => normalizeRule(row))
    .sort((a, b) => a.kebabId.localeCompare(b.kebabId));

  let previousGeneratedAt = null;
  let previousFingerprint = null;
  if (fs.existsSync(CATALOG_OUT)) {
    try {
      const prev = JSON.parse(fs.readFileSync(CATALOG_OUT, "utf8"));
      previousGeneratedAt = prev.generatedAt || null;
      previousFingerprint = contentFingerprint(prev.rules || []);
    } catch {
      // ignore corrupt previous catalog
    }
  }

  const fingerprint = contentFingerprint(rules);
  const generatedAt =
    previousFingerprint === fingerprint && previousGeneratedAt
      ? previousGeneratedAt
      : new Date().toISOString();

  const catalog = {
    version: 1,
    generatedAt,
    count: rules.length,
    rules,
  };

  fs.writeFileSync(CATALOG_OUT, JSON.stringify(catalog));
  const redirects = buildIdRedirects(rules);
  fs.writeFileSync(REDIRECTS_OUT, JSON.stringify(redirects, null, 2) + "\n");

  // Remove obsolete artifacts if present.
  for (const obsolete of [
    path.join(REPO, "public/engine-rules-index.json"),
    path.join(REPO, "public/engine-rules-metadata.json"),
    path.join(REPO, "src/data/engine-rules-metadata.json"),
  ]) {
    if (fs.existsSync(obsolete)) {
      fs.unlinkSync(obsolete);
      console.log(`removed ${path.relative(REPO, obsolete)}`);
    }
  }

  const kb = (fs.statSync(CATALOG_OUT).size / 1024).toFixed(1);
  const populated = rules.filter((r) => r.populated).length;
  const stubs = rules.length - populated;
  console.log(
    `\n[generate-engine-rules-catalog] ${rules.length} rules (${populated} populated, ${stubs} stubs) → ${kb}KB`
  );
  console.log(`generatedAt: ${generatedAt}${previousFingerprint === fingerprint ? " (unchanged)" : " (updated)"}`);
  console.log(`id redirects: ${Object.keys(redirects).length / 3} rules`);
}

main();
