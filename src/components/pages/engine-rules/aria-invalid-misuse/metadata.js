// Generated metadata for aria-invalid-misuse
// This file is auto-generated from index.ts to avoid module resolution issues

export const AriaInvalidMisuse = {
  id: "aria-invalid-misuse",
  title: `Only input fields with validation errors should be assigned aria-invalid="true"`,
  description: `Using aria-invalid="true" on an input field that does not have errors may cause confusion for users who rely on assistive technology, who may try to correct their already valid response.`,
  advice: `To make sure that screen reader users can accurately identify form fields with invalid input, set aria-invalid="true" only on input fields that have errors. Remove the attribute once the value becomes valid.`,
  impact: "serious",
  refs: [
    { type: "WAI", link: "https://www.w3.org/TR/wai-aria/#aria-invalid" },
    { type: "WCAG", id: "3.3.1", level: "A", link: "https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#error-identification" },
    { type: "WCAG", id: "3.3.3", level: "A", link: "https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#error-suggestion" },
    { type: "Non-Standard", link: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-invalid" }
  ]
};
