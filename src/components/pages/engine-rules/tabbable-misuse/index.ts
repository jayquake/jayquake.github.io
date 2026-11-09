import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";
import { PerceivableTraitTabbable, CompliantTraitInteractable, PerceivableTraitImplicitTabbable } from "@acsbe/core-engine-classifier";

export const TabbableMisuse: Rule = {
  id: "tabbable-misuse",
  metadata: {
    category: "General",
    profile: ["Motor Impaired"],
    wcagVersion: "2.0",
    wcagLevel: "A",
  },
  impact: "serious",
  title: "Non-interactive elements should not be keyboard navigable",
  description: "Allowing static content to receive keyboard focus creates unnecessary stops in the tab order, forcing users to tab through elements that provide no action and making keyboard navigation less intuitive.",
  advice: "Remove the tabindex attribute from the static element.",
  associatedDetectors: [PerceivableTraitTabbable, CompliantTraitInteractable, PerceivableTraitImplicitTabbable],
  refs: [
    {
      type: "WCAG",
      id: "2.4.3",
      level: "A",
      link: "https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html",
    },
    {
      type: "Non-Standard",
      link: "https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex#accessibility_concerns",
    },
    {
      type: "Non-Standard",
      link: "https://www.a11yproject.com/posts/how-to-use-the-tabindex-attribute/",
    },
    {
      type: "Non-Standard",
      link: "https://dequeuniversity.com/rules/axe/4.4/tabindex",
    },
  ],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ response, classifier }) {
    const tabbables = classifier.getMatched([PerceivableTraitTabbable]);

    for (const tabbable of tabbables) {
      if (classifier.assert(tabbable, CompliantTraitInteractable)) {
        response.passedNodes.push(tabbable);
        continue;
      }

      /**
       * Implicitly interactive elements that are not currently classified as interactable (e.g. disabled) are inapplicable
       * because the suggested remediation of removing `tabindex` would not affect the
       * element being tabbable.
       * @see src/rules/tabbable-misuse/atomic-tests/pass/abboptical-aria-disabled-link.html
       */
      if (classifier.assert(tabbable, PerceivableTraitImplicitTabbable)) {
        response.inapplicableNodes.push(tabbable);
        continue;
      }

      response.failedNodes.push(tabbable);
    }
  },
};
