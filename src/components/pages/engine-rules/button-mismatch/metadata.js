// Generated metadata for button-mismatch
// This file is auto-generated from index.ts to avoid module resolution issues

export const ButtonMismatch = {
  id: "button-mismatch",
  title: `Buttons should be tagged for assistive technology`,
  description: `If interactive elements cannot be identified as buttons, screen reader users may not realize the element is actionable, which can stop them from submitting forms, opening dialogs, or performing other intended actions.`,
  advice: `Add role="button" to the custom interactive element, or use a HTML <button> element.`,
  impact: "critical",
  refs: [
    { type: "WCAG", id: "1.3.1", level: "A", link: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html" },
    { type: "WCAG", id: "4.1.2", level: "A", link: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html" },
    { type: "ACT", link: "https://act-rules.github.io/rules/97a4e1" },
    { type: "ACT", link: "https://act-rules.github.io/rules/59796f" }
  ]
};
