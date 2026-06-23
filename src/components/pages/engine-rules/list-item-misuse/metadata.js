// Generated metadata for list-item-misuse
// This file is auto-generated from index.ts to avoid module resolution issues

export const ListItemMisuse = {
  id: "list-item-missuse",
  title: `Orphaned list items with no direct list parent should not be tagged as list items`,
  description: `Orphaned list items can be confusing for users of assistive technologies. If list items are used, they should be grouped within a list structure.`,
  advice: `Tag the element as a role="presentation" or remove the list item tag.`,
  impact: "serious",
  refs: [
    { type: "Non-Standard", link: "https://dequeuniversity.com/rules/axe/4.1/listitem" },
    { type: "WCAG Technique", link: "https://www.w3.org/WAI/WCAG21/Techniques/html/H48.html" },
    { type: "W3C", link: "https://www.w3.org/TR/html401/struct/lists.html" }
  ]
};
