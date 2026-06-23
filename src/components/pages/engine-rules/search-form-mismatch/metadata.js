// Generated metadata for search-form-mismatch
// This file is auto-generated from index.ts to avoid module resolution issues

export const SearchFormMismatch = {
  id: "search-form-mismatch",
  title: `A search form should be tagged as a search landmark`,
  description: `Screen reader users rely on landmarks to quickly access important regions of a page. Defining a form as a search landmark ensures that users can quickly recognize and navigate to the search form.`,
  advice: `Enclose the search form in a <search> element or assign role="search" to the <form> element.`,
  impact: "moderate",
  refs: [
    { type: "WCAG", id: "1.3.1", level: "A", link: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html" },
    { type: "Non-Standard", link: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/search_role" },
    { type: "Non-Standard", link: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/search" }
  ]
};
