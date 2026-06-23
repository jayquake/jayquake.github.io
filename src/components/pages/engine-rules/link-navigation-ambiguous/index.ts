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
        contentInfo: { srVisibleText },
        contextInfo: { isAmbiguous },
      } = classifier.getOperations(link);

      if (!srVisibleText) {
        response.inapplicableNodes.push(link);
        continue;
      }

      if (isAmbiguous) {
        const {
          contentInfo: { ariaText, visibleText },
        } = classifier.getOperations(link);
        /**
         * this is done due to a logical conflict with 'visible-text-part-of-accessible-name' rule, which requires that the entire visible text is part of the accessible name.
         * if the 'link-navigation-discernible' remediation occurs, and if the generated description is ambigous, this will fail the current rule.
         * to avoid this, we are checking if the element was previously remediatiated with the visible text being included to the aria-label as a flag for inapplicability.
         */
        if (visibleText && ariaText.includes(visibleText)) {
          response.inapplicableNodes.push(link);
          continue;
        }

        response.failedNodes.push(link);
      } else {
        response.passedNodes.push(link);
      }
    }
  },
};
