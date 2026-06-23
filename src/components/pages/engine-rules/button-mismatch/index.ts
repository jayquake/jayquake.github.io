import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";
import { PerceivableComponentButton, CompliantComponentButton, CompliantComponentMenuItem, CompliantComponentTab, CompliantComponentHeading, CompliantComponentSwitch, CompliantTraitExposed } from "@acsbe/core-engine-classifier";

export const ButtonMismatch: Rule = {
  id: "button-mismatch",
  metadata: {
    category: "Interactive Content",
    profile: ["Blind"],
    wcagVersion: "2.0",
    wcagLevel: "A",
  },
  impact: "critical",
  title: "Buttons should be tagged for assistive technology",
  description: "If interactive elements cannot be identified as buttons, screen reader users may not realize the element is actionable, which can stop them from submitting forms, opening dialogs, or performing other intended actions.",
  advice: 'Add role="button" to the custom interactive element, or use a HTML <button> element.',
  associatedDetectors: [PerceivableComponentButton, CompliantComponentButton, CompliantComponentMenuItem, CompliantComponentTab, CompliantComponentSwitch, CompliantTraitExposed],
  refs: [
    {
      type: "WCAG",
      id: "1.3.1",
      level: "A",
      link: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html",
    },
    {
      type: "WCAG",
      id: "4.1.2",
      level: "A",
      link: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
    },
    {
      type: "ACT",
      ruleId: "97a4e1",
      link: "https://act-rules.github.io/rules/97a4e1",
    },
    {
      type: "ACT",
      ruleId: "59796f",
      link: "https://act-rules.github.io/rules/59796f",
    },
  ],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ classifier, response }) {
    const buttons = classifier.getMatched([PerceivableComponentButton, CompliantTraitExposed]);

    for (const button of buttons) {
      /**
       * If the perceived button is a heading then it does not need to be tagged as a button but as interactable (InteractiveNotTabbable).
       */
      if (classifier.assert(button, CompliantComponentHeading)) {
        continue;
      }

      const isCompliantButtonSubtype = classifier.assert(button, CompliantComponentMenuItem) || classifier.assert(button, CompliantComponentTab) || classifier.assert(button, CompliantComponentSwitch);
      if (isCompliantButtonSubtype) {
        continue;
      }

      const isValid = classifier.assert(button, CompliantComponentButton);

      if (isValid) {
        response.passedNodes.push(button);
      } else {
        response.failedNodes.push(button);
      }
    }
  },
};
