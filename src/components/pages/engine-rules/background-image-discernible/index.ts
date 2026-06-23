import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";
import { CompliantTraitVisible, PerceivableComponentBackgroundImage, PerceivableTraitDiscernibleText, PerceivableTraitScreenReaderOnly } from "@acsbe/core-engine-classifier";
import { isIrrelevantImage } from "~/rules/image-discernible";

export const BackgroundImageDiscernible: Rule = {
  id: "background-image-discernible",
  metadata: {
    category: "Graphics",
    profile: ["Blind"],
    wcagVersion: "2.0",
    wcagLevel: "A",
  },
  impact: "serious",
  title: "Functional image displayed using CSS background properties should have a text alternative",
  description: "Images require a text alternative when the image conveys meaningful content or serves a functional purpose. Rendering an image using CSS background or background-image properties is acceptable only if the image is decorative.",
  advice: "Assign a text alternative with a description of the functional image's content using aria-label or use aria-labelledby if related text exists on the page.",
  associatedDetectors: [PerceivableComponentBackgroundImage, PerceivableTraitDiscernibleText, PerceivableTraitScreenReaderOnly, CompliantTraitVisible],
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
    {
      type: "W3C",
      link: "https://www.w3.org/WAI/alt/",
    },
    {
      type: "W3C",
      link: "https://www.w3.org/WAI/tutorials/images/decorative/",
    },
  ],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ classifier, response }) {
    const backgroundImages = classifier.getMatched([PerceivableComponentBackgroundImage, CompliantTraitVisible]);

    for (const image of backgroundImages) {
      const { visibilityInfo } = classifier.getOperations(image);
      if (visibilityInfo.isExplicitlyHiddenFromScreenReader) {
        continue;
      }

      // Extract the URL from CSS url() function: url("image.png") → image.png, url('data:...') → data:..., linear-gradient(...) → linear-gradient(...)
      const bgImage = (classifier.getOperations(image).colorInfo.backgroundImage || "").replace(/url\((['"])?(.*?)\1\)/gi, "$2");
      if (isIrrelevantImage(bgImage)) {
        response.inapplicableNodes.push(image);
        continue;
      }

      const discernibleElements = classifier.getMatchedDirect([PerceivableTraitDiscernibleText], image);

      if (discernibleElements.length === 0) {
        response.failedNodes.push(image);
        continue;
      }

      const firstDiscernibleElement = discernibleElements[0];
      const isScreenReaderOnly = classifier.assert(firstDiscernibleElement, PerceivableTraitScreenReaderOnly);

      if (!isScreenReaderOnly) {
        response.failedNodes.push(image);
      } else {
        response.passedNodes.push(image);
      }
    }
  },
};
