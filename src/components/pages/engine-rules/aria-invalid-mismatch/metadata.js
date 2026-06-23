// Generated metadata for aria-invalid-mismatch
// This file is auto-generated from index.ts to avoid module resolution issues

export const AriaInvalidMismatch = {
  id: "aria-invalid-mismatch",
  title: `Form fields should indicate validation errors to assistive technology`,
  description: `Validation errors in forms must be exposed in a way that assistive technologies can detect and announce them, ensuring users who rely on assistive technology can identify and correct mistakes.`,
  advice: `To make sure that screen reader users are aware of form fields with invalid input, set aria-invalid="true". Remove the attribute once the value becomes valid.`,
  impact: "serious",
  refs: [
    { type: "WAI", link: "https://www.w3.org/TR/wai-aria/#aria-invalid" },
    { type: "WCAG", id: "3.3.1", level: "A", link: "https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#error-identification" },
    { type: "WCAG", id: "3.3.3", level: "A", link: "https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#error-suggestion" },
    { type: "Non-Standard", link: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-invalid" }
  ]
};
