// Generated metadata for tab-mismatch
// This file is auto-generated from index.ts to avoid module resolution issues

export const TabMismatch = {
  id: "tab-mismatch",
  title: `Tab controls should be tagged for assistive technology`,
  description: `Custom tabs must be explicitly defined for screen readers since there are no native HTML tab elements. Without assigning role="tab" to the interactive elements, assistive technology will not identify them as tabs, preventing users from understanding their function or navigating them as part of a tab interface.`,
  advice: `Apply role="tab" to each tab control.`,
  impact: "critical",
  refs: [
    { type: "WCAG", id: "4.1.2", level: "A", link: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html" },
    { type: "WCAG", id: "1.3.1", level: "A", link: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html" },
    { type: "Non-Standard", link: "https://www.digitala11y.com/tab-role/" },
    { type: "Non-Standard", link: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tab_role" },
    { type: "W3C", link: "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-automatic/" }
  ]
};
