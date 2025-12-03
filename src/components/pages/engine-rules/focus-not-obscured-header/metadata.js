// Generated metadata for focus-not-obscured-header
// This file is auto-generated from index.ts to avoid module resolution issues

export const FocusNotObscuredHeader = {
  id: "focus-not-obscured-header",
  title: "Focused elements should not be obscured by a sticky header",
  description: "A sticky header remains anchored to the top of the screen while the rest of the page content can be scrolled. If it is not offset from interactive elements, it can overlap and obscure the item in focus.",
  advice: `When a page has a sticky header, make sure that any element receiving focus is not fully covered by the header. One way to achieve this is by using the CSS property scroll-padding-top.`,
  impact: "serious",
  refs: [

  ]
};
