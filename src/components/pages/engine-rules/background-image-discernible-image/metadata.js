// Generated metadata for background-image-discernible-image
// This file is auto-generated from index.ts to avoid module resolution issues

export const BackgroundImageDiscernibleImage = {
  id: "background-image-discernible-image",
  title: `Functional image displayed using CSS background properties should be tagged for assistive technology`,
  description: `Functional images presented using CSS background or background-image properties should be marked up using role="img" so that they can be identified as images by screen reader users.`,
  advice: `Add role="img" to elements that present functional images using CSS.`,
  impact: "serious",
  refs: [
    { type: "WCAG", id: "1.1.1", level: "A", link: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html" },
    { type: "W3C", link: "https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=211%2C412#non-text-content" },
    { type: "Non-Standard", link: "https://www.davidmacd.com/blog/alternate-text-for-css-background-images.html" },
    { type: "W3C", link: "https://www.w3.org/WAI/GL/wiki/ARIATechnique_usingImgRole_with_aria-label_forCSS-backgroundImage" }
  ]
};
