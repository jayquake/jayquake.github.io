import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";
import { CompliantComponentImage, PerceivableTraitDiscernibleText } from "@acsbe/core-engine-classifier";

/**
 * Because the backend resource doesnt support base64, svg etc. this rule will always fail in these cases.
 * TODO:
 * - copy-paste from remediator/image-resource, need to be shared.
 * - we set these images as inapplicable nodes, this will need to change once the backend supports these resources.
 */
export const isIrrelevantImage = (url: string) => url.match(/data:image\/.*;base64,/) || url.match(/data:image\/svg\+xml/) || url.match(/([<.])svg/) || url.match(/linear-gradient\(/);

export const ImageDiscernible: Rule = {
  id: "image-discernible",
  metadata: {
    category: "Graphics",
    profile: ["Blind"],
    wcagVersion: "2.0",
    wcagLevel: "A",
  },
  impact: "critical",
  title: "Functional images should have a text alternative",
  description: "Images require a text alternative when the image conveys meaningful content or serves a functional purpose. If the image is decorative, it must be hidden from assistive technology.",
  advice: 'If the image is meaningful, assign a text alternative with a description of the image content using the alt attribute for image elements, or aria-label for elements with role="img". If the image is decorative, provide an empty alt attribute for image elements, or role="presentation" for elements with role="img".',
  associatedDetectors: [PerceivableTraitDiscernibleText, CompliantComponentImage],
  refs: [
    {
      type: "WCAG",
      id: "1.1.1",
      level: "A",
      link: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html",
    },
    {
      type: "ACT",
      ruleId: "23a2a8",
      link: "https://act-rules.github.io/rules/23a2a8",
    },
    {
      type: "ACT",
      ruleId: "qt1vmo",
      link: "https://act-rules.github.io/rules/qt1vmo",
    },
  ],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ classifier, response }) {
    const images = classifier.getMatched([CompliantComponentImage]);

    for (const image of images) {
      if (classifier.assert(image, PerceivableTraitDiscernibleText)) {
        response.passedNodes.push(image);
      } else if (isIrrelevantImage(image.getAttribute("src") || "")) {
        response.inapplicableNodes.push(image);
      } else {
        response.failedNodes.push(image);
      }
    }
  },
};
