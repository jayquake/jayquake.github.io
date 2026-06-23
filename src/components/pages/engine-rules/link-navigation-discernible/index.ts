import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";
import { PerceivableTraitDiscernibleText, PerceivableComponentLinkNavigation, CompliantTraitExposed } from "@acsbe/core-engine-classifier";

export const LinkNavigationDiscernible: Rule = {
  id: "link-navigation-discernible",
  metadata: {
    category: "Interactive Content",
    profile: ["Blind"],
    wcagVersion: "2.0",
    wcagLevel: "A",
  },
  impact: "critical",
  title: "Navigation links should have a descriptive label",
  description: "Activating navigation links enables users to navigate to a different page within the site. Links that do not contain visible text or labeled images should be assigned labels that inform screen reader users of their destination.",
  associatedDetectors: [PerceivableTraitDiscernibleText, PerceivableComponentLinkNavigation, CompliantTraitExposed],
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
      ruleId: "c487ae",
      link: "https://act-rules.github.io/rules/c487ae",
    },
  ],
  advice: "If a navigation link does not contain a labeled image or visible text, assign an aria-label that describes the destination of the link.",
  passCondition: PassCondition.NoFailedNodes,
  async validate({ response, classifier }) {
    // CompliantTraitExposed filters out non-visible links (e.g., hover-only) to prevent false failures
    const links = classifier.getMatched([PerceivableComponentLinkNavigation, CompliantTraitExposed]);

    for (const link of links) {
      if (classifier.assert(link, PerceivableTraitDiscernibleText)) {
        response.passedNodes.push(link);
      } else {
        response.failedNodes.push(link);
      }
    }
  },
};
