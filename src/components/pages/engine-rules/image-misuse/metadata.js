// Generated metadata for image-misuse
// This file is auto-generated from index.ts to avoid module resolution issues

export const ImageMisuse = {
  id: "image-misuse",
  title: `Only elements that function as images should be tagged as image`,
  description: `When non-graphical elements are marked up as images, screen reader users may misunderstand the intended purpose of the content.`,
  advice: `Remove role="img" from the failing element.`,
  impact: "serious",
  refs: [
    { type: "WCAG", id: "1.3.1", level: "A", link: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html" },
    { type: "Non-Standard", link: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/img_role" },
    { type: "WAI", link: "https://www.w3.org/WAI/tutorials/images/" }
  ]
};
