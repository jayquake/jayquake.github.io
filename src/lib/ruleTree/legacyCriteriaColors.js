/**
 * Presentation colours for legacy criteria in the rule tree.
 * Membership, labels and order come from src/data/legacy-criteria.json (written by
 * the legacy sync). Arch #6 replaces these hex values with design tokens.
 */
export const LEGACY_CRITERIA_COLORS = {
  graphics: "#00a38d",
  forms: "#2196f3",
  keyboard: "#ff9800",
  navigation: "#9c27b0",
  landmarks: "#00838f",
  errors: "#607d8b",
  context: "#00bcd4",
  clickables: "#e91e63",
  "interactive-content": "#c2185b",
  document: "#795548",
  "text-content": "#8bc34a",
  tables: "#3f51b5",
  carousels: "#ff5722",
  "moving-content": "#ef6c00",
  dialogs: "#7b1fa2",
  lists: "#6d4c41",
  general: "#546e7a",
};

export const DEFAULT_LEGACY_CRITERIA_COLOR = "#667eea";

export function legacyCriteriaColor(id) {
  return LEGACY_CRITERIA_COLORS[id] || DEFAULT_LEGACY_CRITERIA_COLOR;
}
