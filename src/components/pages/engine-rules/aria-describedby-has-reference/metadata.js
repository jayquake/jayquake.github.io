// Generated metadata for aria-describedby-has-reference
// This file is auto-generated from index.ts to avoid module resolution issues

export const AriaDescribedByHasReference = {
  id: "aria-describedby-has-reference",
  title: `aria-describedby should reference a valid element id`,
  description: `If an element’s aria-describedby attribute points to an id that does not exist or is not valid, assistive technologies will not convey the intended description, causing users to miss important context.`,
  advice: `Ensure aria-describedby references an existing, unique id on the page. Remove or update the attribute if the target element is missing or no longer relevant.`,
  impact: "serious",
  refs: [
    { type: "WCAG Technique", link: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA1" },
    { type: "WCAG Technique", link: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA16" },
    { type: "ACT", link: "https://act-rules.github.io/rules/in6db8" }
  ]
};
