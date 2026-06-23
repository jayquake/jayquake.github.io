import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";
import { PerceivableTraitDiscernibleText, CompliantComponentHeading } from "@acsbe/core-engine-classifier";

export const HeadingDiscernible: Rule = {
  id: "heading-discernible",
  metadata: {
    category: "Text Content",
    profile: ["Blind"],
    wcagVersion: "General Guidelines",
    wcagLevel: "N/A",
  },
  impact: "moderate",
  title: "Headings should not be empty",
  description: "Empty heading elements break the document outline, making navigation by headings less effective for screen reader users and causing confusion due to the disrupted page hierarchy.",
  advice: 'Remove empty HTML heading elements or assign aria-hidden="true" to make sure that they are ignored by screen readers.',
  associatedDetectors: [PerceivableTraitDiscernibleText, CompliantComponentHeading],
  refs: [
    {
      type: "ACT",
      ruleId: "047fe0",
      link: "https://act-rules.github.io/rules/047fe0",
    },
    {
      type: "ACT",
      ruleId: "ffd0e9",
      link: "https://act-rules.github.io/rules/ffd0e9",
    },
  ],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ classifier, response }) {
    const headings = classifier.getMatched([CompliantComponentHeading]);

    for (const heading of headings) {
      const hasDiscernibleText = classifier.assert(heading, PerceivableTraitDiscernibleText);
      if (hasDiscernibleText) {
        response.passedNodes.push(heading);
      } else {
        response.failedNodes.push(heading);
      }
    }
  },
};
