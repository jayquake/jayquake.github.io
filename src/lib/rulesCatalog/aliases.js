/**
 * Engine `id` ≠ folder `kebabId` for these rules.
 * AccessFlow `engineRules` and some URLs use `id`; the app uses kebabId as the slug.
 */
const ID_TO_KEBAB = Object.freeze({
  "breadcrumbs-in-nav": "breadcrumbs-nav",
  "broken-aria-references": "broken-aria-reference",
  "captcha-accessible-provider-v2.0": "captcha-accessible-provider-2.0",
  "captcha-accessible-provider-v2.2": "captcha-accessible-provider-2.2",
  "had-meta-viewport": "page-meta-viewport",
  "list-item-missuse": "list-item-misuse",
  "region-main-navigation": "region-main-navigation-mismatch",
  "search-input-announcement": "search-input-dynamic-results-announcement",
});

const KEBAB_TO_ID = Object.freeze(
  Object.fromEntries(Object.entries(ID_TO_KEBAB).map(([id, kebab]) => [kebab, id]))
);

/** AccessFlow still references these retired engine ids; map to the current rule. */
const RETIRED_ID_TO_CURRENT = Object.freeze({
  "interactive-not-tabbable": "tabbable-mismatch",
  "tabbable-non-interactive": "tabbable-misuse",
  "navigation-submenu-region": "menu-trigger-mismatch",
  // stub still exists under this kebabId — no rename, listed for report parity
});

function toKebabId(idOrKebab) {
  if (!idOrKebab) return "";
  if (ID_TO_KEBAB[idOrKebab]) return ID_TO_KEBAB[idOrKebab];
  const retired = RETIRED_ID_TO_CURRENT[idOrKebab];
  if (retired && retired !== idOrKebab) {
    return toKebabId(retired);
  }
  return idOrKebab;
}

function toEngineId(idOrKebab) {
  if (!idOrKebab) return "";
  if (KEBAB_TO_ID[idOrKebab]) return KEBAB_TO_ID[idOrKebab];
  if (ID_TO_KEBAB[idOrKebab]) return idOrKebab;
  return idOrKebab;
}

module.exports = {
  ID_TO_KEBAB,
  KEBAB_TO_ID,
  RETIRED_ID_TO_CURRENT,
  toKebabId,
  toEngineId,
};
