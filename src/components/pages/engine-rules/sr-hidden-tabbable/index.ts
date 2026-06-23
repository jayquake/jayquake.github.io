import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";
import { PerceivableTraitTabbable, CompliantTraitVisible } from "@acsbe/core-engine-classifier";

export const SRHiddenTabbable: Rule = {
  id: "sr-hidden-tabbable",
  metadata: {
    category: "General",
    profile: ["Motor Impaired"],
    wcagVersion: "2.0",
    wcagLevel: "A",
  },
  impact: "serious",
  title: "Hidden elements should not be keyboard navigable",
  description: "Allowing hidden content to receive keyboard focus creates a confusing tab order, where keyboard users and screen reader users that navigate with the TAB key may encounter interactive controls that are unrelated to the current context.",
  advice: 'Use tabindex="-1" to remove elements from the tab order when they should not be exposed to assistive technology. Consider using CSS techniques, such as display:none or visibility:hidden when the content should be hidden from all users.',
  associatedDetectors: [PerceivableTraitTabbable, CompliantTraitVisible],
  refs: [
    {
      type: "WCAG",
      id: "2.4.3",
      level: "A",
      link: "https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html",
    },
    {
      type: "Non-Standard",
      link: "https://dequeuniversity.com/rules/axe/4.1/aria-hidden-focus",
    },
    {
      type: "Non-Standard",
      link: "https://www.accessibility-developer-guide.com/examples/sensible-aria-usage/hidden/#does-not-work-on-focusable-elements/",
    },
    {
      type: "Non-Standard",
      link: "https://accessibilityinsights.io/info-examples/web/aria-hidden-focus/",
    },
  ],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ response, classifier }) {
    const tabbables = classifier.getMatched([PerceivableTraitTabbable]);

    for (const tabbable of tabbables) {
      const isCompliantVisible = classifier.assert(tabbable, CompliantTraitVisible);

      if (isCompliantVisible) {
        response.passedNodes.push(tabbable);
      } else {
        response.failedNodes.push(tabbable);
      }
    }
  },
};
