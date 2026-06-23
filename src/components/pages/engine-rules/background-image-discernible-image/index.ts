import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";
import { PerceivableComponentBackgroundImage, PerceivableTraitDiscernibleText, PerceivableTraitScreenReaderOnly, CompliantComponentImage, CompliantTraitVisible } from "@acsbe/core-engine-classifier";

export const BackgroundImageDiscernibleImage: Rule = {
  id: "background-image-discernible-image",
  metadata: {
    category: "Graphics",
    profile: ["Blind"],
    wcagVersion: "2.0",
    wcagLevel: "A",
  },
  impact: "serious",
  title: "Functional image displayed using CSS background properties should be tagged for assistive technology",
  description: 'Functional images presented using CSS background or background-image properties should be marked up using role="img" so that they can be identified as images by screen reader users.',
  advice: 'Add role="img" to elements that present functional images using CSS.',
  associatedDetectors: [PerceivableComponentBackgroundImage, PerceivableTraitDiscernibleText, PerceivableTraitScreenReaderOnly, CompliantComponentImage, CompliantTraitVisible],
  refs: [
    {
      type: "WCAG",
      id: "1.1.1",
      level: "A",
      link: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html",
    },
    {
      type: "W3C",
      link: "https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=211%2C412#non-text-content",
    },
    {
      type: "Non-Standard",
      link: "https://www.davidmacd.com/blog/alternate-text-for-css-background-images.html",
    },
    {
      type: "W3C",
      link: "https://www.w3.org/WAI/GL/wiki/ARIATechnique_usingImgRole_with_aria-label_forCSS-backgroundImage",
    },
  ],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ classifier, response }) {
    const backgroundImages = classifier.getMatched([PerceivableComponentBackgroundImage, CompliantTraitVisible]);

    for (const image of backgroundImages) {
      const discernibleElements = classifier.getMatched([PerceivableTraitDiscernibleText], image);
      if (discernibleElements.length === 0) {
        /**
         * Non-discernible background images are handled in a different rule (background-image-discernible)
         */
        continue;
      }
      const firstDiscernibleElement = discernibleElements[0];
      const isScreenReaderOnly = classifier.assert(firstDiscernibleElement, PerceivableTraitScreenReaderOnly);
      if (!isScreenReaderOnly) {
        /**
         * Non-discernible background images are handled in a different rule (background-image-discernible)
         */
        continue;
      }
      const isImage = classifier.assert(firstDiscernibleElement, CompliantComponentImage);
      if (!isImage) {
        response.failedNodes.push(firstDiscernibleElement);
      } else {
        response.passedNodes.push(firstDiscernibleElement);
      }
    }
  },
};
