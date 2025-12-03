// Generated metadata for focus-not-obscured-footer
// This file is auto-generated from index.ts to avoid module resolution issues

export const FocusNotObscuredFooter = {
  id: "focus-not-obscured-footer",
  title: "Focused elements should not be obscured by a sticky footer",
  description: "A sticky footer remains anchored to the bottom of the screen while the rest of the page content can be scrolled. If it is not offset from interactive elements, it can overlap and obscure the item in focus.",
  advice: `When a page has a sticky footer, make sure that any element receiving focus is not fully covered by the footer. One way to achieve this is by using the CSS property scroll-padding-bottom.`,
  impact: "serious",
  refs: [

  ]
};
