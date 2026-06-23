// Generated metadata for region-main-content-mismatch
// This file is auto-generated from index.ts to avoid module resolution issues

export const RegionMainContentMismatch = {
  id: "region-main-content-mismatch",
  title: `All of the main content on the page is contained in the main landmark`,
  description: `The main landmark represents the primary content of a page. It should include only content unique to that page and must remain separate from repeated elements, such as navigation, header, or footer.`,
  advice: `Avoid nesting <main> or elements with role="main" and other landmark or sectioning elements such as <header>, <footer>, <nav>, <article>, or <aside> (including elements with respective ARIA roles). Ensure that the main landmark contains all of the main content, and it is not enclosing the entire HTML document or positioned outside the primary content area.`,
  impact: "serious",
  refs: [
    { type: "WCAG", id: "1.3.1", level: "A", link: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html" },
    { type: "Non-Standard", link: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/main_role" },
    { type: "WAI", link: "https://www.digitala11y.com/main-role/" }
  ]
};
