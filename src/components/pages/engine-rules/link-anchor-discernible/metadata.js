// Generated metadata for link-anchor-discernible
// This file is auto-generated from index.ts to avoid module resolution issues

export const LinkAnchorDiscernible = {
  id: "link-anchor-discernible",
  title: `Anchor links should have a descriptive label`,
  description: `Activating anchor links enables users to navigate to a different section within the same page by scrolling and moving keyboard focus. Anchor links that do not contain visible text or labeled images should be assigned labels that inform screen reader users of their destination.`,
  advice: `If an anchor link does not contain a labeled image or visible text, assign an aria-label that describes the destination of the link.`,
  impact: "critical",
  refs: [
    { type: "WCAG", id: "4.1.2", level: "A", link: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html" },
    { type: "WCAG", id: "1.3.1", level: "A", link: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html" },
    { type: "ACT", link: "https://act-rules.github.io/rules/c487ae" }
  ]
};
