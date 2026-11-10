const { CATEGORY_BY_KEBAB_ID } = require("./categories");
const { toKebabId, toEngineId } = require("./aliases");

function stripHtml(html) {
  if (!html || typeof html !== "string") return "";
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Normalise one raw rule row (from a metadata.js parse or an older catalog).
 * kebabId is the slug for URLs, categories, example folders, and tree keys.
 */
function normalizeRule(raw) {
  const kebabId = toKebabId(raw.kebabId || raw.id || "");
  const id = raw.id ? toEngineId(raw.id) : toEngineId(kebabId) || kebabId;
  const title = raw.title || "";
  const description = raw.description || "";
  const adviceHtml =
    typeof raw.adviceHtml === "string"
      ? raw.adviceHtml
      : typeof raw.advice === "string" && /</.test(raw.advice)
        ? raw.advice
        : raw.adviceHtml || raw.advice || "";
  // Prefer explicit plain advice; otherwise strip HTML from advice/adviceHtml.
  const advicePlain =
    typeof raw.advicePlain === "string"
      ? raw.advicePlain
      : typeof raw.advice === "string" && !/</.test(raw.advice) && !raw.adviceHtml
        ? raw.advice
        : stripHtml(adviceHtml || raw.advice || "");

  const refs = Array.isArray(raw.refs)
    ? raw.refs.map((r) => ({
        type: r.type || "",
        id: r.id || "",
        level: r.level || "",
        link: r.link || "",
      }))
    : [];

  const wcag = refs
    .filter((r) => r.type === "WCAG")
    .map((r) => ({ id: r.id, level: r.level || "", link: r.link || "" }));

  const populated = Boolean(kebabId && (title || description));
  const category =
    raw.category || CATEGORY_BY_KEBAB_ID[kebabId] || "";

  const search = [kebabId, id, title, description, advicePlain]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return {
    id,
    kebabId,
    title,
    description,
    advice: advicePlain,
    adviceHtml,
    impact: raw.impact || "",
    category,
    refs,
    wcag,
    populated,
    search,
    detailUrl: `/engine/${kebabId}`,
    successUrl: `/engine/${kebabId}_success`,
    failureUrl: `/engine/${kebabId}_failure`,
  };
}

function isPopulated(rule) {
  if (typeof rule.populated === "boolean") return rule.populated;
  const slug = rule.kebabId || rule.id || "";
  return Boolean(slug && (rule.title || rule.description));
}

module.exports = {
  stripHtml,
  normalizeRule,
  isPopulated,
};
