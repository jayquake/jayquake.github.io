// Generated metadata for link-navigation-ambiguous
// This file is auto-generated from index.ts to avoid module resolution issues

export const LinkNavigationAmbiguous = {
  id: "link-navigation-ambiguous",
  title: `Link context should be exposed to assistive technology`,
  description: `Screen reader users may find it difficult to distinguish between links when the purpose of each link cannot be determined from its text alone or together with its immediate context.`,
  advice: `Assign a unique id to an existing element that contains additional context for the link, add aria-describedby to the link and reference the assigned id. Alternatively, nest a visibly hidden element that contains additional context inside of the link.`,
  impact: "serious",
  refs: [
    { type: "WCAG", id: "2.4.4", level: "A", link: "https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html" },
    { type: "ACT", link: "https://act-rules.github.io/rules/c487ae" },
    { type: "ACT", link: "https://act-rules.github.io/rules/aizyf1" },
    { type: "ACT", link: "https://act-rules.github.io/rules/5effbb" },
    { type: "ACT", link: "https://act-rules.github.io/rules/b20e66" },
    { type: "ACT", link: "https://act-rules.github.io/rules/fd3a94" }
  ]
};
