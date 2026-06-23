// Generated metadata for link-image-warning
// This file is auto-generated from index.ts to avoid module resolution issues

export const LinkImageWarning = {
  id: "link-image-warning",
  title: `Warning a user when a link triggers an image to open is recommended`,
  description: `It's good practice to warn users about the expected behavior when activating a link triggers an image to appear.`,
  advice: `Add a visibly hidden text element that contains 'Opens image'. Assign a unique id attribute to the element and add aria-describedby to the link, referencing the text element's id. Alternatively, nest a visibly hidden element that contains additional context inside of the link.`,
  impact: "minor",
  refs: [

  ]
};
