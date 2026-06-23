import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";
import { PerceivableComponentCheckbox, PerceivableComponentRadioButton, PerceivableComponentInputFile, CompliantComponentInputCheckbox, CompliantComponentInputRadio, CompliantComponentInputFile, CompliantTraitVisible, PerceivableTraitTabbable } from "@acsbe/core-engine-classifier";

export const ControlFieldVisibleAndTabbable: Rule = {
  id: "control-field-visible-and-tabbable",
  metadata: {
    category: "Forms",
    profile: ["Blind"],
    wcagVersion: "2.0",
    wcagLevel: "A",
  },
  impact: "critical",
  title: "Custom checkboxes, radio buttons and file upload fields should be accessible to assistive technology",
  description:
    "Screen readers have built-in mechanisms to handle checkboxes, radio buttons, and file upload fields. By default, assistive technology does not support custom checkboxes, radio buttons, and file upload fields, and using those may prevent screen reader users from interacting with the fields and keyboard users from tabbing to the fields.",
  advice:
    'If using standard LABEL and INPUT fields with custom CSS styling, ensure the checkbox, radio button, or file input is fully visible to assistive technology but visually hidden using opacity, width, height, and positioning (never use display:none or visibility:hidden). Alternatively, create a standard checkbox, radio button, or file input field available only for screen readers using the screen reader only technique, and hide the custom checkbox, radio button, or file input from screen readers using aria-hidden="true".',
  associatedDetectors: [PerceivableComponentCheckbox, PerceivableComponentRadioButton, PerceivableComponentInputFile, CompliantComponentInputCheckbox, CompliantComponentInputRadio, CompliantComponentInputFile, CompliantTraitVisible, PerceivableTraitTabbable],
  refs: [
    {
      type: "WCAG",
      id: "4.1.2",
      level: "A",
      link: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
    },
    {
      type: "WCAG",
      id: "1.3.1",
      level: "A",
      link: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html",
    },
    {
      type: "Non-Standard",
      link: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/checkbox_role",
    },
    {
      type: "Non-Standard",
      link: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/radio_role",
    },
  ],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ response, classifier }) {
    const customCheckboxes = classifier.getMatched([PerceivableComponentCheckbox]);
    const customRadios = classifier.getMatched([PerceivableComponentRadioButton]);
    const customInputFiles = classifier.getMatched([PerceivableComponentInputFile]);
    const customControls = [...customCheckboxes, ...customRadios, ...customInputFiles];

    for (const customControl of customControls) {
      if (classifier.assert(customControl, CompliantComponentInputCheckbox) || classifier.assert(customControl, CompliantComponentInputRadio) || classifier.assert(customControl, CompliantComponentInputFile)) {
        // The input is visible
        response.passedNodes.push(customControl);
        continue;
      }
      const inputField = classifier.getMatched([CompliantComponentInputCheckbox], customControl)[0] || classifier.getMatched([CompliantComponentInputRadio], customControl)[0] || classifier.getMatched([CompliantComponentInputFile], customControl)[0];
      if (!inputField) {
        continue;
      }
      // For screen reader users, the input field must be CompliantTraitVisible\CompliantTraitExposed
      // For keyboard users, the input field must be PerceivableTraitTabbable
      if (classifier.assert(inputField, CompliantTraitVisible) && classifier.assert(inputField, PerceivableTraitTabbable)) {
        response.passedNodes.push(customControl);
      } else {
        response.failedNodes.push(customControl);
      }
    }
  },
};
