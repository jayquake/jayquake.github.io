// Generated metadata for user-rating-discernible
// This file is auto-generated from index.ts to avoid module resolution issues

export const UserRatingDiscernible = {
  id: "user-rating-discernible",
  title: `User ratings should be tagged and labeled for assistive technology`,
  description: `When a static star rating is presented using unlabeled icons, screen readers cannot interpret the symbols as meaningful content. Assigning a role and text alternative ensures the rating value is conveyed clearly, allowing non-visual users to understand the information.`,
  advice: `Assign role="img" with an aria-label, such as “4 out of 5 stars,” to the image element, or to an enclosing container if each star is presented as a separate element.`,
  impact: "serious",
  refs: [
    { type: "WCAG", id: "1.1.1", level: "A", link: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html" },
    { type: "WAI", link: "https://www.w3.org/WAI/ARIA/apg/patterns/radio/examples/radio-rating/" },
    { type: "WAI", link: "https://www.w3.org/WAI/tutorials/forms/custom-controls/" }
  ]
};
