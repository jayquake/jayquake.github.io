// Generated metadata for tabbable-visible
// This file is auto-generated from index.ts to avoid module resolution issues

export const TabbableVisible = {
  id: "tabbable-visible",
  title: `Use the tabindex attribute correctly to manage focus for visible and hidden interactive elements`,
  description: `When interactive elements remain focusable while they are visually hidden, keyboard users may encounter controls that they cannot see and that should not be available in the current interface.`,
  advice: `Apply tabindex="0" to custom interactive elements so they follow the natural tab sequence, and tabindex="-1" when an element is offscreen or when it should only be reachable programmatically. Consider using CSS techniques, such as display:none or visibility:hidden when content should be hidden from all users.`,
  impact: "serious",
  refs: [
    { type: "WCAG", id: "2.4.3", level: "A", link: "https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html" },
    { type: "Non-Standard", link: "https://docs.deque.com/issue-help/1.0.0/en/focus-on-hidden-item" }
  ]
};
