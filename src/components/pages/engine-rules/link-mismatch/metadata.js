// Generated metadata for link-mismatch
// This file is auto-generated from index.ts to avoid module resolution issues

export const LinkMismatch = {
  id: "link-mismatch",
  title: `Links should be tagged properly`,
  description: `Custom links should be tagged with role='link' for assistive technologies to identify them correctly.`,
  advice: `Add role='link' to custom link elements or use a HTML <a> element to ensure they are recognized as links by assistive technologies.`,
  impact: "serious",
  refs: [
    { type: "WCAG", id: "4.1.2", level: "A", link: "https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=211%2C412#name-role-value" },
    { type: "WAI", link: "https://www.w3.org/WAI/ARIA/apg/patterns/link/examples/link/" },
    { type: "Non-Standard", link: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/link_role" },
    { type: "Non-Standard", link: "https://vispero.com/resources/link-vs-button-choosing-the-right-element-for-the-right-job/" }
  ]
};
