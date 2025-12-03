// Generated metadata for menu-trigger-mismatch
// This file is auto-generated from index.ts to avoid module resolution issues

export const MenuTriggerMismatch = {
  id: "menu-trigger-mismatch",
  title: "Menu trigger buttons/links should be tagged properly",
  description: "Menu trigger buttons/links should have \`aria-haspopup=true\` or \`aria-haspopup=menu\` attribute",
  advice: `Use the \`aria-haspopup\` attribute with value \`true\` or \`menu\` to indicate a menu trigger, and the \`aria-expanded=true\` to indicate expanded menus and \`aria-expanded=false\` to indicate collapsed menus. Make sure to switch between true and false dynamically as users interact, open and close menus.\\nNote: the aria-expanded attribute must be placed on the link or button menu items only. Otherwise, they won't work.`,
  impact: "serious",
  refs: [

  ]
};
