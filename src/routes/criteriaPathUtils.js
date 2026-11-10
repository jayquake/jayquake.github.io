/** Path matching for legacy criteria routes — no route component imports. */
import legacyCriteria from "../data/legacy-criteria.json";

/** @type {string[]} */
export const CRITERIA_PREFIXES = legacyCriteria.prefixes;

export function isCriteriaPath(pathname) {
  return CRITERIA_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}
