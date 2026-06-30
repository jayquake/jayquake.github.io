const fs = require("fs");
const path = require("path");

const metadataPath = path.join(__dirname, "../src/data/engine-rules-metadata.json");
const categoriesPath = path.join(__dirname, "../src/data/engine-rule-categories.js");
const catalogOut = path.join(__dirname, "../public/engine-rules.json");
const indexOut = path.join(__dirname, "../public/engine-rules-index.json");
const metadataOut = path.join(__dirname, "../public/engine-rules-metadata.json");

function stripHtml(html) {
  if (!html || typeof html !== "string") return "";
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

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

const rules = metadata.filter(isPopulated).map((rule) => {
  const id = getRuleSlug(rule);
  const wcagRefs = (rule.refs || []).filter((r) => r.type === "WCAG");
  const advice = stripHtml(rule.advice || "");
  return {
    id,
    title: rule.title || "",
    description: rule.description || "",
    advice,
    impact: rule.impact || "",
    category: categoryByRule[id] || "",
    wcag: wcagRefs.map((r) => ({ id: r.id, level: r.level || "", link: r.link || "" })),
    refs: wcagRefs.map((r) => ({
      type: "WCAG",
      id: r.id,
      level: r.level || "",
      link: r.link || "",
    })),
    /** Pre-joined search blob for client-side filter */
    search: [id, rule.title, rule.description, advice]
      .filter(Boolean)
      .join(" ")
      .toLowerCase(),
  };
});

const catalog = {
  version: 1,
  generatedAt: new Date().toISOString(),
  count: rules.length,
  rules,
};

const index = rules.map(({ id, title, impact, category, wcag }) => ({
  id,
  title,
  impact,
  category,
  wcag: wcag.map(({ id: wcagId, level }) => ({ id: wcagId, level })),
}));

fs.writeFileSync(catalogOut, JSON.stringify(catalog));
fs.writeFileSync(indexOut, JSON.stringify(index));
fs.copyFileSync(metadataPath, metadataOut);

const catalogKb = (fs.statSync(catalogOut).size / 1024).toFixed(1);
const indexKb = (fs.statSync(indexOut).size / 1024).toFixed(1);
const metaKb = (fs.statSync(metadataOut).size / 1024).toFixed(1);

console.log(
  `[generate-engine-rules-index] ${rules.length} rules → catalog ${catalogKb}KB, index ${indexKb}KB, metadata ${metaKb}KB (public/)`
);
