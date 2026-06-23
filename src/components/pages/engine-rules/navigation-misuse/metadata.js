// Generated metadata for navigation-misuse
// This file is auto-generated from index.ts to avoid module resolution issues

export const NavigationMisuse = {
  id: "navigation-misuse",
  title: `Navigation landmark does not contain key site navigation links`,
  description: `A navigation landmark should identify a section that contains primary links for moving through the site or page. Using navigation landmarks for minor or secondary link groups makes it harder for screen reader users to locate the page’s key navigation areas.`,
  advice: `Use navigation landmarks only for key navigation sections, such as the main site menu, table of contents, breadcrumbs, or pagination. Avoid using them for general link lists, social links, related links, or other secondary link groups, and keep the number of navigation landmarks as limited as practical.`,
  impact: "serious",
  refs: [
    { type: "WCAG", id: "1.3.1", level: "A", link: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html" },
    { type: "WAI", link: "https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/" },
    { type: "WAI", link: "https://www.w3.org/WAI/ARIA/apg/patterns/menubar/examples/menubar-navigation/" },
    { type: "WAI", link: "https://www.w3.org/WAI/ARIA/apg/patterns/treeview/examples/treeview-navigation/" },
    { type: "WAI", link: "https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/navigation.html" }
  ]
};
