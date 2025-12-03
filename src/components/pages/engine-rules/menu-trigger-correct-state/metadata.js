// Generated metadata for menu-trigger-correct-state
// This file is auto-generated from index.ts to avoid module resolution issues

export const MenuTriggerCorrectState = {
  id: "menu-trigger-correct-state",
  title: "Menu open/close states should be indicated to assistive technology",
  description: "Screen readers require properly coded states for interactive elements. Menus can be expanded or collapsed, and their state should be indicated to screen readers. Otherwise, users will lose orientation and get confused while browsing the menu.",
  advice: `When a button is a menu trigger, you should connected it to the menu it toggles using the "aria-controls" attribute on the button, where the value is the "id" of the menu. Use the the "aria-expanded" attribute to indicate whether the menu controlled by a menu-trigger button is expanded or collapsed (if it is visible or not). Set the value to dynamically to "true" when the menu is visible and "false" when it is not. Note: the aria-expanded attribute must be placed on the link or button menu items only. Otherwise, they won't work.`,
  impact: "serious",
  refs: [

  ]
};
