// Generated metadata for menu-trigger-correct-state
// This file is auto-generated from index.ts to avoid module resolution issues

export const MenuTriggerCorrectState = {
  id: "menu-trigger-correct-state",
  title: `Triggers that expand additional content should expose their state to assistive technology`,
  description: `When components such as accordions or navigation menus do not expose their state, screen reader users may not realize that additional content can be revealed or know whether it is currently visible.`,
  advice: `Assign aria-expanded to common triggers, such as <button> or custom select elements to indicate whether their associated content is collapsed (false) or expanded (true). Ensure the value is updated as the state changes.`,
  impact: "critical",
  refs: [
    { type: "WCAG", id: "4.1.2", level: "A", link: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html" },
    { type: "Non-Standard", link: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded" },
    { type: "Non-Standard", link: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-haspopup" },
    { type: "Non-Standard", link: "https://dequeuniversity.com/rules/axe/4.3/aria-required-attr" },
    { type: "Non-Standard", link: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls" }
  ]
};
