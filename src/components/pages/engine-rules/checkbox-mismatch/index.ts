import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";
import { CompliantComponentCheckbox, PerceivableComponentCheckbox } from "@acsbe/core-engine-classifier";

export const CheckboxMismatch: Rule = {
  id: "checkbox-mismatch",
  metadata: {
    category: "Forms",
    profile: ["Blind"],
    wcagVersion: "2.0",
    wcagLevel: "A",
  },
  impact: "critical",
  title: "Custom checkbox controls should be tagged for assistive technology",
  description: "Screen readers have built-in mechanisms to handle checkbox components. By default, screen readers don't support custom checkboxes and using them without exposing the appropriate role may prevent screen reader users from interacting as expected with the component.",
  advice: 'Assign role="checkbox" to the custom checkbox element.',
  associatedDetectors: [CompliantComponentCheckbox, PerceivableComponentCheckbox],
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
  ],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ response, classifier }) {
    const checkboxes = classifier.getMatched([PerceivableComponentCheckbox]);

    for (const checkbox of checkboxes) {
      // If the perceivable checkbox has a compliant checkbox as a child, screen readers will already announce it as a checkbox, making the parent inapplicable for this rule (adding role="checkbox" to the parent would be redundant).
      const compliantCheckboxChildren = classifier.getMatched([CompliantComponentCheckbox], checkbox);
      if (compliantCheckboxChildren.length > 0) {
        response.inapplicableNodes.push(checkbox);
        continue;
      }

      const isCompliant = classifier.assert(checkbox, CompliantComponentCheckbox);

      if (isCompliant) {
        response.passedNodes.push(checkbox);
      } else {
        response.failedNodes.push(checkbox);
      }
    }
  },
};
