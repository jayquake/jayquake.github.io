import { PerceivableComponentLinkNavigation } from "@acsbe/core-engine-classifier";
import type { Rule } from "../interfaces";
import { PassCondition } from "../interfaces";

export const LinkNavigationAmbiguous: Rule = {
  id: "link-navigation-ambiguous",
  metadata: {
    category: "Interactive Content",
    profile: ["Blind"],
    wcagVersion: "2.0",
    wcagLevel: "A",
  },
  impact: "serious",
  title: "Link context should be exposed to assistive technology",
  description: "Screen reader users may find it difficult to distinguish between links when the purpose of each link cannot be determined from its text alone or together with its immediate context.",
  advice: "Assign a unique id to an existing element that contains additional context for the link, add aria-describedby to the link and reference the assigned id. Alternatively, nest a visibly hidden element that contains additional context inside of the link.",
  associatedDetectors: [PerceivableComponentLinkNavigation],
  refs: [
    {
      type: "WCAG",
      id: "2.4.4",
      level: "A",
      link: "https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html",
    },
    {
      type: "ACT",
      ruleId: "c487ae",
      link: "https://act-rules.github.io/rules/c487ae",
    },
    {
      type: "ACT",
      ruleId: "aizyf1",
      link: "https://act-rules.github.io/rules/aizyf1",
    },
    {
      type: "ACT",
      ruleId: "5effbb",
      link: "https://act-rules.github.io/rules/5effbb",
    },
    {
      type: "ACT",
      ruleId: "b20e66",
      link: "https://act-rules.github.io/rules/b20e66",
    },
    {
      type: "ACT",
      ruleId: "fd3a94",
      link: "https://act-rules.github.io/rules/fd3a94",
    },
  ],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ classifier, response }) {
    const links = classifier.getMatched([PerceivableComponentLinkNavigation]); // PerceivableComponentLinkNavigation contains within it logic to negate application links such as "tel:", "mailto:", etc.
    for (const link of links) {
      const {
        contentInfo: { srVisibleText, accessibleName, visibleText },
        contextInfo: { isAmbiguous },
      } = classifier.getOperations(link);

      if (!srVisibleText) {
        response.inapplicableNodes.push(link);
        continue;
      }

      if (!isAmbiguous) {
        response.passedNodes.push(link);
        continue;
      }

      /**
       * If the accessible name contains the visible text and more, then the link is not ambiguous.
       * NOTE: The visible text must stay in the name because 'visible-text-part-of-accessible-name' requires it.
       *
       * @see src/rules/link-navigation-ambiguous/atomic-tests/pass/remediated-link-with-context-appended-to-short-aria-label.html
       * @see src/rules/link-navigation-ambiguous/atomic-tests/fail/link-with-ambiguous-content.html
       */
      if (visibleText && accessibleNameExtendsVisibleText(accessibleName, visibleText)) {
        response.passedNodes.push(link);
        continue;
      }

      response.failedNodes.push(link);
    }
  },
};

/**
 * Context appended to a name attribute such as `aria-label`. Nothing in the DOM marks the addition,
 * so the only evidence is a name that contains the visible text and more. The visible text must stay in the name
 * because 'visible-text-part-of-accessible-name' requires it.
 *
 * @see src/rules/link-navigation-ambiguous/atomic-tests/pass/remediated-link-with-context-appended-to-short-aria-label.html
 * @see src/rules/link-navigation-ambiguous/atomic-tests/fail/link-with-ambiguous-content.html
 */
function accessibleNameExtendsVisibleText(accessibleName: string, visibleText: string): boolean {
  const lowerCaseAccessibleName = accessibleName.toLowerCase();
  const lowerCaseVisibleText = visibleText.toLowerCase();

  /** When accessibleName extends visible text it is expected to contain and to have more information on top of it, hence the length check */
  return lowerCaseAccessibleName.includes(lowerCaseVisibleText) && lowerCaseAccessibleName.length > lowerCaseVisibleText.length;
}
