import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";
import { PerceivableTraitTabbable, CompliantTraitVisible } from "@acsbe/core-engine-classifier";

export const TabbableExposed: Rule = {
  /**
   * TODO: consider renaming the rule to "aria-hidden-not-tabbable" to better reflect the rule's intent and avoid confusion.
   */
  id: "tabbable-exposed",
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
  associatedDetectors: [PerceivableTraitTabbable],
  refs: [
    {
      type: "ACT",
      ruleId: "6cfa84",
      link: "https://www.w3.org/WAI/standards-guidelines/act/rules/6cfa84/",
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
    /**
     * TODO: consider using CompliantTraitAriaHidden (not integrated yet https://github.com/acsbe/core-engine-auditor/pull/518) as the candidate instead, as the rule defines "This rule applies to any element with an aria-hidden attribute value of true."
     * @see https://www.w3.org/WAI/standards-guidelines/act/rules/6cfa84/#applicability
     *
     * the "passing" check would be against PerceivableTraitTabbable.
     */
    const tabbables = classifier.getMatched([PerceivableTraitTabbable]);

    for (const tabbable of tabbables) {
      /**
       * TODO: replace with CompliantTraitAriaHidden (for performance reasons) when it is implemented (unless we determine the initial candidate should be CompliantTraitAriaHidden instead of PerceivableTraitTabbable).
       */
      const isCompliantVisible = classifier.assert(tabbable, CompliantTraitVisible);

      if (isCompliantVisible) {
        response.passedNodes.push(tabbable);
      } else {
        response.failedNodes.push(tabbable);
      }
    }
  },
};
