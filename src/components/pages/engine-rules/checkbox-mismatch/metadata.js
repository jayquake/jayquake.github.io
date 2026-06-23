// Generated metadata for checkbox-mismatch
// This file is auto-generated from index.ts to avoid module resolution issues

export const CheckboxMismatch = {
  id: "checkbox-mismatch",
  title: `Custom checkbox controls should be tagged for assistive technology`,
  description: `Screen readers have built-in mechanisms to handle checkbox components. By default, screen readers don't support custom checkboxes and using them without exposing the appropriate role may prevent screen reader users from interacting as expected with the component.`,
  advice: `Assign role="checkbox" to the custom checkbox element.`,
  impact: "critical",
  refs: [
    { type: "WCAG", id: "4.1.2", level: "A", link: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html" },
    { type: "WCAG", id: "1.3.1", level: "A", link: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html" },
    { type: "Non-Standard", link: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/checkbox_role" }
  ]
};
