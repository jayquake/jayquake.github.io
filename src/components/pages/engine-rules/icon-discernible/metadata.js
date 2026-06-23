// Generated metadata for icon-discernible
// This file is auto-generated from index.ts to avoid module resolution issues

export const IconDiscernible = {
  id: "icon-discernible",
  title: `Meaningful icons should have a label, while decorative icons should be hidden`,
  description: `Smaller graphics used as decorative or complementary elements, such as icons, and that do not provide additional information will often add unnecessary clutter to a screen reader user's browsing experience.`,
  advice: `If the image is meaningful, assign a text alternative with a description of the image content using the alt attribute for image elements, or aria-label for elements with role="img". If the image is decorative, provide an empty alt attribute for image elements, or role="presentation" for elements with role="img".`,
  impact: "critical",
  refs: [
    { type: "WCAG", id: "1.1.1", level: "A", link: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html" },
    { type: "ACT", link: "https://act-rules.github.io/rules/46ca7f" },
    { type: "ACT", link: "https://act-rules.github.io/rules/e88epe" }
  ]
};
