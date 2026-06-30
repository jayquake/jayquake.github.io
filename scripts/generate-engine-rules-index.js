const fs = require("fs");
const path = require("path");

const metadataPath = path.join(__dirname, "../src/data/engine-rules-metadata.json");
const categoriesPath = path.join(__dirname, "../src/data/engine-rule-categories.js");
const indexOut = path.join(__dirname, "../public/engine-rules-index.json");
const metadataOut = path.join(__dirname, "../public/engine-rules-metadata.json");

function getRuleSlug(rule) {
  return rule.id || rule.kebabId || "";
}

function isPopulated(rule) {
  const slug = getRuleSlug(rule);
  return Boolean(slug && (rule.title || rule.description));
}

function buildCategoryMap() {
  const src = fs.readFileSync(categoriesPath, "utf-8");
  const map = {};
  const blockRegex = /id:\s*"([^"]+)"[\s\S]*?rules:\s*\[([\s\S]*?)\]/g;
  let m;
  while ((m = blockRegex.exec(src)) !== null) {
    const catId = m[1];
    const rules = [...m[2].matchAll(/"([^"]+)"/g)].map((r) => r[1]);
    rules.forEach((ruleId) => {
      map[ruleId] = catId;
    });
  }
  return map;
}

const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf-8"));
const categoryByRule = buildCategoryMap();

const index = metadata
  .filter(isPopulated)
  .map((rule) => {
    const id = getRuleSlug(rule);
    const wcagRefs = (rule.refs || []).filter((r) => r.type === "WCAG");
    return {
      id,
      title: rule.title,
      impact: rule.impact || "",
      category: categoryByRule[id] || "",
      wcag: wcagRefs.map((r) => ({ id: r.id, level: r.level || "" })),
    };
  });

fs.writeFileSync(indexOut, JSON.stringify(index));
fs.copyFileSync(metadataPath, metadataOut);

const rawKb = (fs.statSync(metadataPath).size / 1024).toFixed(1);
const indexKb = (fs.statSync(indexOut).size / 1024).toFixed(1);
console.log(
  `[generate-engine-rules-index] ${index.length} rules → index ${indexKb}KB (metadata ${rawKb}KB copied to public/)`
);
