// Generated metadata for link-homepage-warning
// This file is auto-generated from index.ts to avoid module resolution issues

export const LinkHomepageWarning = {
  id: "link-homepage-warning",
  title: `Warning a user that a link navigates to the homepage is recommended`,
  description: `It's good practice to ensure that users can always identify links to the homepage.`,
  advice: `Add a visibly hidden text element that contains 'Home'. Assign a unique id attribute to the element and add aria-describedby to the link, referencing the text element's id. Alternatively, nest a visibly hidden element that contains additional context inside of the link.`,
  impact: "minor",
  refs: [

  ]
};
