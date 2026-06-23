// Generated metadata for navigation-item-link
// This file is auto-generated from index.ts to avoid module resolution issues

export const NavigationItemLink = {
  id: "navigation-item-link",
  title: `List items in a navigation region should not be interactive`,
  description: `Adding interactive behavior to <li> elements within a navigation list may prevent screen reader users from identifying the element as actionable, since <li> elements are announced as list items and expected to be static.`,
  advice: `In order to maintain the semantic structure of the list, a properly formed <a> element should be nested inside the <li>.`,
  impact: "serious",
  refs: [
    { type: "WCAG", id: "1.3.1", level: "A", link: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html" },
    { type: "W3C", link: "https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/navigation.html" },
    { type: "W3C", link: "https://www.w3.org/WAI/ARIA/apg/patterns/treeview/examples/treeview-navigation/" },
    { type: "Non-Standard", link: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/navigation_role" }
  ]
};
