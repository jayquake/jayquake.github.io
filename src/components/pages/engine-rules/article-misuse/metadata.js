// Generated metadata for article-misuse
// This file is auto-generated from index.ts to avoid module resolution issues

export const ArticleMisuse = {
  id: "article-misuse",
  title: `Only elements that function as articles should be tagged as article regions`,
  description: `Using an <article> tag on content that is not self-contained and that cannot stand on its own outside the context of the page, such as a blog post, news story, or forum entry, causes screen readers to announce misleading information about the purpose the content in relation to the main subject of the page.`,
  advice: `Assign role="presentation" to the failing element or use a different HTML tag that is more appropriate for the function of the element.`,
  impact: "minor",
  refs: [
    { type: "WCAG", id: "1.3.1", level: "A", link: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html" },
    { type: "WAI", link: "https://www.w3.org/WAI/ARIA/apg/patterns/feed/examples/feed/" },
    { type: "WCAG Technique", link: "https://www.w3.org/WAI/GL/wiki/Using_HTML5_article_element" },
    { type: "Non-Standard", link: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article" },
    { type: "Non-Standard", link: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/article_role" }
  ]
};
