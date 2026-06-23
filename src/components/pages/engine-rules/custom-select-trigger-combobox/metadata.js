// Generated metadata for custom-select-trigger-combobox
// This file is auto-generated from index.ts to avoid module resolution issues

export const CustomSelectTriggerCombobox = {
  id: "custom-select-trigger-combobox",
  title: `Custom select triggers should be tagged for assistive technology`,
  description: `Screen readers provide built-in support for native select triggers, but custom triggers are not automatically recognized. Without assigning the appropriate ARIA role and ensuring the element is structured in accordance with accessibility standards, assistive technology may fail to announce or activate the trigger, preventing screen reader users from opening and interacting with the select component.`,
  advice: `Assign role="combobox" to the custom select trigger.`,
  impact: "critical",
  refs: [
    { type: "WCAG", id: "4.1.2", level: "A", link: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html" },
    { type: "Non-Standard", link: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/combobox_role" }
  ]
};
