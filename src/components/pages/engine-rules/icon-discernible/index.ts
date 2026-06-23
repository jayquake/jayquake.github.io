import { CompliantTraitExposed, PerceivableComponentIcon, PerceivableTraitDiscernibleText } from "@acsbe/core-engine-classifier";
import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";

export const IconDiscernible: Rule = {
  id: "icon-discernible",
  metadata: {
    category: "Graphics",
    profile: ["Blind"],
    wcagVersion: "2.0",
    wcagLevel: "A",
  },
  impact: "critical",
  title: "Meaningful icons should have a label, while decorative icons should be hidden",
  description: "Smaller graphics used as decorative or complementary elements, such as icons, and that do not provide additional information will often add unnecessary clutter to a screen reader user's browsing experience.",
  advice: 'If the image is meaningful, assign a text alternative with a description of the image content using the alt attribute for image elements, or aria-label for elements with role="img". If the image is decorative, provide an empty alt attribute for image elements, or role="presentation" for elements with role="img".',
  associatedDetectors: [CompliantTraitExposed, PerceivableComponentIcon, PerceivableTraitDiscernibleText],
  refs: [
    {
      type: "WCAG",
      id: "1.1.1",
      level: "A",
      link: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html",
    },
    {
      type: "ACT",
      ruleId: "46ca7f",
      link: "https://act-rules.github.io/rules/46ca7f",
    },
    {
      type: "ACT",
      ruleId: "e88epe",
      link: "https://act-rules.github.io/rules/e88epe",
    },
  ],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ classifier, response }) {
    const icons = classifier.getMatched([PerceivableComponentIcon]);

    for (const icon of icons) {
      const isCompliantVisible = classifier.assert(icon, CompliantTraitExposed);
      const hasDiscernibleText = classifier.assert(icon, PerceivableTraitDiscernibleText);

      if (!isCompliantVisible || hasDiscernibleText) {
        response.passedNodes.push(icon);
      } else {
        response.failedNodes.push(icon);
      }
    }
  },
};
