/**
 * Maps existing accessFlow-Engine suite (902) case IDs to canonical engine rule IDs.
 * Derived from legacy Qase titles + legacy-engine-mapping.js / CSV migration sheet.
 */
const LEGACY_QASE_TO_RULE = {
  2966: "heading-lengthy",
  2967: "carousel-slide-picker-discernible",
  2968: "skip-link-exists",
  2969: "article-misuse",
  2970: "page-title",
  2971: "aria-labelledby-has-reference",
  2972: "no-role-application",
  2976: "table-row-header",
  2977: "breadcrumbs-mismatch",
  2978: "table-column-header",
  2979: "region-footer",
  2997: "menu-trigger-correct-state",
  3025: "name-prohibited-no-aria-label",
  3027: "table-misuse",
  3028: "menu-trigger-clickable",
  3030: "carousel-aria-live",
  3031: "search-form-mismatch",
  3045: "navigation-item-link",
  3046: "page-meta-viewport-valid",
  3047: "navigation-misuse",
  3048: "heading-discernible",
  3073: "iframe-discernible",
  3074: "no-autofocus",
  3075: "required-form-field-aria-required",
  3076: "button-mismatch",
  3177: "navigation-discernible",
  3333: "visibility-misuse",
};

/** Legacy cases that covered multiple rules — create additional cases for siblings. */
const LEGACY_EXTRA_RULES = {
  2970: ["page-title-valid"],
  2971: ["aria-describedby-has-reference"],
  2977: ["breadcrumbs-nav"],
  3046: ["page-meta-viewport"],
  3177: ["navigation-mismatch"],
};

module.exports = { LEGACY_QASE_TO_RULE, LEGACY_EXTRA_RULES };
