import { CompliantComponentImage, PerceivableComponentImage, PerceivableTraitScreenReaderOnly } from "@acsbe/core-engine-classifier";
import type { Rule } from "../interfaces";
import { PassCondition } from "../interfaces";

export const ImageMisuse: Rule = {
  id: "image-misuse",
  metadata: {
    category: "Graphics",
    profile: ["Blind"],
    wcagVersion: "2.0",
    wcagLevel: "A",
  },
  associatedDetectors: [PerceivableComponentImage, CompliantComponentImage, PerceivableTraitScreenReaderOnly],
  impact: "serious",
  title: "Only elements that function as images should be tagged as image",
  description: "When non-graphical elements are marked up as images, screen reader users may misunderstand the intended purpose of the content.",
  advice: 'Remove role="img" from the failing element.',
  refs: [
    {
      type: "WCAG",
      id: "1.3.1",
      level: "A",
      link: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html",
    },
    {
      type: "Non-Standard",
      link: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/img_role",
    },
    {
      type: "WAI",
      link: "https://www.w3.org/WAI/tutorials/images/",
    },
  ],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ classifier, response }) {
    const elements = classifier.getMatched([CompliantComponentImage]);

    for (const element of elements) {
      if (classifier.assert(element, PerceivableTraitScreenReaderOnly)) {
        response.inapplicableNodes.push(element);
        continue;
      }

      if (classifier.assert(element, PerceivableComponentImage)) {
        response.passedNodes.push(element);
      } else {
        response.failedNodes.push(element);
      }
    }
  },
};
