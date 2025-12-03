// Generated metadata for menu-trigger-clickable
// This file is auto-generated from index.ts to avoid module resolution issues

export const MenuTriggerClickable = {
  id: "menu-trigger-clickable",
  title: "ARIA relationship and state attributes should only be applied to elements with appropriate roles",
  description: "Interactive elements that trigger additional content should only have relationship and state ARIA attributes, such as aria-expanded and aria-controls, if they have interactive roles, such as button, tab, combobox and in rarer cases, link.",
  advice: `Make sure relationship and state ARIA attributes are only applied to elements with interactive roles, such as button, tab, and combobox. In rare cases, aria-expanded can be applied to link elements or elements with role='link', however this should only be done when the link both navigates and expands content.`,
  impact: "serious",
  refs: [

  ]
};
