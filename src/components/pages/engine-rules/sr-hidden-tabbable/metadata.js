// Generated metadata for sr-hidden-tabbable
// This file is auto-generated from index.ts to avoid module resolution issues

export const SRHiddenTabbable = {
  id: "sr-hidden-tabbable",
  title: `Hidden elements should not be keyboard navigable`,
  description: `Allowing hidden content to receive keyboard focus creates a confusing tab order, where keyboard users and screen reader users that navigate with the TAB key may encounter interactive controls that are unrelated to the current context.`,
  advice: `Use tabindex="-1" to remove elements from the tab order when they should not be exposed to assistive technology. Consider using CSS techniques, such as display:none or visibility:hidden when the content should be hidden from all users.`,
  impact: "serious",
  refs: [
    { type: "WCAG", id: "2.4.3", level: "A", link: "https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html" },
    { type: "Non-Standard", link: "https://dequeuniversity.com/rules/axe/4.1/aria-hidden-focus" },
    { type: "Non-Standard", link: "https://www.accessibility-developer-guide.com/examples/sensible-aria-usage/hidden/#does-not-work-on-focusable-elements/" },
    { type: "Non-Standard", link: "https://accessibilityinsights.io/info-examples/web/aria-hidden-focus/" }
  ]
};
