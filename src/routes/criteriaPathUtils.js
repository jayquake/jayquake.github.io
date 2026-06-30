/** Path matching for legacy criteria routes — no route component imports. */

export const CRITERIA_PREFIXES = [
  "/graphics",
  "/forms",
  "/keyboard",
  "/navigation",
  "/headings",
  "/errors",
  "/carousels",
  "/clickables",
  "/context",
  "/document",
  "/readability",
  "/tables",
];

export function isCriteriaPath(pathname) {
  return CRITERIA_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}
