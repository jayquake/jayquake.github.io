// Generated metadata for radio-discernible
// This file is auto-generated from index.ts to avoid module resolution issues

export const RadioDiscernible = {
  id: "radio-discernible",
  title: `Radio controls should have a label`,
  description: `Screen readers rely on properly coded and associated labels to announce the purpose of a form field. A radio control without an identifiable label may prevent screen reader users from completing the form.`,
  advice: `Assign a label to each radio control using <label for> with a matching id (or wrapping the <label> around the control), or ARIA attributes such as aria-label or aria-labelledby.`,
  impact: "critical",
  refs: [
    { type: "WCAG", id: "1.3.1", level: "A", link: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html" },
    { type: "WCAG", id: "4.1.2", level: "A", link: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html" },
    { type: "WAI", link: "https://www.w3.org/WAI/ARIA/apg/patterns/radio" },
    { type: "Non-Standard", link: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/radio_role" }
  ]
};
