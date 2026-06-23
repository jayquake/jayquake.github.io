import { PerceivableComponentMenuTrigger, CompliantComponentMenuTrigger } from "@acsbe/core-engine-classifier";
import type { Rule } from "../interfaces";
import { PassCondition } from "../interfaces";

export const MenuTriggerMisuse: Rule = {
  id: "menu-trigger-misuse",
  metadata: {
    category: "Interactive Content",
    profile: ["Blind"],
    wcagVersion: "2.0",
    wcagLevel: "A",
  },
  impact: "serious",
  title: "Elements that do not expand additional content should not receive trigger attributes",
  description: "Only interactive elements that trigger additional content should have relationship and state ARIA attributes, such as aria-expanded and aria-controls, if they have interactive roles, such as button, tab, combobox and in rarer cases, link.",
  advice: "Remove ARIA relationship and state attributes that are reserved for triggers that expose additional content, such as aria-expanded or aria-controls, from the failing element",
  associatedDetectors: [PerceivableComponentMenuTrigger, CompliantComponentMenuTrigger],
  refs: [
    {
      type: "WCAG",
      id: "4.1.2",
      level: "A",
      link: "https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=211%2C412#name-role-value",
    },
    {
      type: "WAI",
      link: "https://www.w3.org/TR/wai-aria/states_and_properties#aria-haspopup",
    },
    {
      type: "WAI",
      link: "https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/examples/menu-button-links",
    },
    {
      type: "W3C",
      link: "https://w3c.github.io/aria/#aria-haspopup",
    },
    {
      type: "W3C",
      link: "https://w3c.github.io/aria/#aria-expanded",
    },
  ],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ response, classifier }) {
    const elements = classifier.getMatched([CompliantComponentMenuTrigger]);

    for (const element of elements) {
      if (classifier.assert(element, PerceivableComponentMenuTrigger)) {
        response.passedNodes.push(element);
      } else {
        response.failedNodes.push(element);
      }
    }
  },
};
