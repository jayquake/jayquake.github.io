import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";
import { CompliantComponentLink } from "@acsbe/core-engine-classifier";
import { textContainsWords } from "@acsbe/core-engine-dictionary";

export const LinkImageWarning: Rule = {
  id: "link-image-warning",
  metadata: {
    category: "Interactive Content",
    profile: ["Blind"],
    wcagVersion: "General Guidelines",
    wcagLevel: "N/A",
  },
  impact: "minor",
  title: "Warning a user when a link triggers an image to open is recommended",
  description: "It's good practice to warn users about the expected behavior when activating a link triggers an image to appear.",
  advice: "Add a visibly hidden text element that contains 'Opens image'. Assign a unique id attribute to the element and add aria-describedby to the link, referencing the text element's id. Alternatively, nest a visibly hidden element that contains additional context inside of the link.",
  associatedDetectors: [CompliantComponentLink],
  refs: [],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ classifier, response }) {
    const links = classifier.getMatched([CompliantComponentLink]);

    const imageExtensions = ["webp", "avif", "svg", "jpg", "jpeg", "png", "gif", "apng"];
    const imageRegex = new RegExp(`\\.(${imageExtensions.join("|")})$`, "i");

    for (const link of links) {
      if (!(link instanceof HTMLAnchorElement)) {
        continue;
      }

      const href = link.getAttribute("href");

      if (!RegExp(imageRegex).exec(href)) {
        continue;
      }

      const { contentInfo } = classifier.getOperations(link);
      const keywords: Parameters<typeof textContainsWords>[1] = ["opens_image"];

      if (textContainsWords(contentInfo.accessibleName.toLowerCase(), keywords)) {
        response.passedNodes.push(link);
        continue;
      }

      /**
       * The warning can also be conveyed through the accessible description (`aria-describedby`, or `title` when it is not the name),
       * which screen readers announce after the name.
       *
       * @see src/rules/link-image-warning/atomic-tests/pass/link-image-with-aria-describedby.html
       */
      if (textContainsWords(contentInfo.accessibleDescription.toLowerCase(), keywords)) {
        response.passedNodes.push(link);
        continue;
      }

      response.failedNodes.push(link);
    }
  },
};
