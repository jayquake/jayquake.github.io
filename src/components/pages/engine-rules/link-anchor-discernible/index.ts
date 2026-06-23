import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";
import { PerceivableTraitDiscernibleText, CompliantTraitVisible, PerceivableComponentLinkAnchor } from "@acsbe/core-engine-classifier";

export const LinkAnchorDiscernible: Rule = {
  id: "link-anchor-discernible",
  metadata: {
    category: "Interactive Content",
    profile: ["Blind"],
    wcagVersion: "2.0",
    wcagLevel: "A",
  },
  impact: "critical",
  title: "Anchor links should have a descriptive label",
  description: "Activating anchor links enables users to navigate to a different section within the same page by scrolling and moving keyboard focus. Anchor links that do not contain visible text or labeled images should be assigned labels that inform screen reader users of their destination.",
  associatedDetectors: [PerceivableTraitDiscernibleText, PerceivableComponentLinkAnchor, CompliantTraitVisible],
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
      type: "ACT",
      ruleId: "c487ae",
      link: "https://act-rules.github.io/rules/c487ae",
    },
  ],
  advice: "If an anchor link does not contain a labeled image or visible text, assign an aria-label that describes the destination of the link.",
  passCondition: PassCondition.NoFailedNodes,
  async validate({ response, classifier }) {
    const links = classifier.getMatched([PerceivableComponentLinkAnchor, CompliantTraitVisible]) as HTMLAnchorElement[];

    for (const link of links) {
      if (classifier.assert(link, PerceivableTraitDiscernibleText)) {
        response.passedNodes.push(link);
      } else {
        response.failedNodes.push(link);
      }
    }
  },
};
