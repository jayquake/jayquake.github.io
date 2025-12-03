// Generated metadata for sr-hidden-tabbable
// This file is auto-generated from index.ts to avoid module resolution issues

export const SRHiddenTabbable = {
  id: "sr-hidden-tabbable",
  title: "Elements hidden from screen-reader must not contain tabbable elements.",
  description: "although the elements are hidden from assistive technologies, users can still navigate to any focusable child elements using the keyboard, but their content is inaccessible to people who use assistive technologies.",
  advice: `Remove the tabindex attribute from the non-interactive element or set it to -1. This will prevent the element from being focused on by keyboard users.`,
  impact: "serious",
  refs: [

  ]
};
