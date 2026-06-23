// Generated metadata for control-field-visible-and-tabbable
// This file is auto-generated from index.ts to avoid module resolution issues

export const ControlFieldVisibleAndTabbable = {
  id: "control-field-visible-and-tabbable",
  title: `Custom checkboxes, radio buttons and file upload fields should be accessible to assistive technology`,
  description: `Screen readers have built-in mechanisms to handle checkboxes, radio buttons, and file upload fields. By default, assistive technology does not support custom checkboxes, radio buttons, and file upload fields, and using those may prevent screen reader users from interacting with the fields and keyboard users from tabbing to the fields.`,
  advice: `If using standard LABEL and INPUT fields with custom CSS styling, ensure the checkbox, radio button, or file input is fully visible to assistive technology but visually hidden using opacity, width, height, and positioning (never use display:none or visibility:hidden). Alternatively, create a standard checkbox, radio button, or file input field available only for screen readers using the screen reader only technique, and hide the custom checkbox, radio button, or file input from screen readers using aria-hidden="true".`,
  impact: "critical",
  refs: [
    { type: "WCAG", id: "4.1.2", level: "A", link: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html" },
    { type: "WCAG", id: "1.3.1", level: "A", link: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html" },
    { type: "Non-Standard", link: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/checkbox_role" },
    { type: "Non-Standard", link: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/radio_role" }
  ]
};
