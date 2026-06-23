// Generated metadata for form-submit-button-mismatch
// This file is auto-generated from index.ts to avoid module resolution issues

export const FormSubmitButtonMismatch = {
  id: "form-submit-button-mismatch",
  title: `Form submission controls should have type="submit"`,
  description: `Adding type="submit" to a control that submits a form ensures that screen readers users expect a change of context when they activate the control.`,
  advice: `Assign type="submit" to <button> or <input> elements when they submit a form.`,
  impact: "minor",
  refs: [
    { type: "WCAG", id: "3.2.2", level: "A", link: "https://www.w3.org/WAI/WCAG22/Understanding/on-input.html" },
    { type: "WCAG Technique", link: "https://www.w3.org/TR/2008/WD-WCAG20-TECHS-20080430/H32.html" }
  ]
};
