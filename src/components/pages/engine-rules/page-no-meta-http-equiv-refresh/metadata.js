// Generated metadata for page-no-meta-http-equiv-refresh
// This file is auto-generated from index.ts to avoid module resolution issues

export const PageNoMetaHttpEquivRefresh = {
  id: "page-no-meta-http-equiv-refresh",
  title: `Pages should not use <meta http-equiv="refresh"> for automatic redirection or reloading`,
  description: `A <meta> element with http-equiv="refresh" is sometimes used to automatically redirect users after a time delay. These timed changes can interrupt and disorient users who rely on assistive technology`,
  advice: `Remove <meta> elements with http-equiv="refresh". If timed user sessions are necessary, ensure users can extend the session time limit.`,
  impact: "critical",
  refs: [
    { type: "WCAG", id: "2.2.1", level: "A", link: "https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html" },
    { type: "W3C", link: "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#consistent-behavior-no-extreme-changes-context" },
    { type: "W3C", link: "https://www.w3.org/TR/2012/WD-html-markup-20121025/meta.http-equiv.refresh.html" },
    { type: "ACT", link: "https://act-rules.github.io/rules/bc659a" },
    { type: "ACT", link: "https://act-rules.github.io/rules/bisz58" },
    { type: "W3C", link: "https://www.w3.org/TR/WCAG20-TECHS/H76.html" },
    { type: "WAI", link: "https://www.w3.org/WAI/WCAG21/Understanding/timing-adjustable.html" }
  ]
};
