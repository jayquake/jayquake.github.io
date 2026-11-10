import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";
import { CompliantComponentLink } from "@acsbe/core-engine-classifier";
import { textContainsWords } from "@acsbe/core-engine-dictionary";

export const LinkTelephoneWarning: Rule = {
  id: "link-telephone-warning",
  metadata: {
    category: "Interactive Content",
    profile: ["Blind"],
    wcagVersion: "General Guidelines",
    wcagLevel: "N/A",
  },
  impact: "minor",
  title: "Warning a user when a link triggers a phone application is recommended",
  description: "It's good practice to warn users about the expected behavior when activating a link triggers a phone application.",
  advice: "Add a visibly hidden text element that contains 'Opens phone application'. Assign a unique id attribute to the element and add aria-describedby to the link, referencing the text element's id. Alternatively, nest a visibly hidden element that contains additional context inside of the link.",
  associatedDetectors: [CompliantComponentLink],
  refs: [],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ classifier, response }) {
    const anchors = classifier.getMatched([CompliantComponentLink]);

    for (const anchor of anchors) {
      if (!(anchor instanceof HTMLAnchorElement)) {
        continue;
      }
      const isTelephone = anchor.href.startsWith("tel:");

      if (!isTelephone) {
        continue;
      }

      const { contentInfo } = classifier.getOperations(anchor);
      const keywords: Parameters<typeof textContainsWords>[1] = ["opens_phone", "opens_dialer"];

      if (textContainsWords(contentInfo.accessibleName.toLowerCase(), keywords)) {
        response.passedNodes.push(anchor);
        continue;
      }

      /**
       * The warning can also be conveyed through the accessible description (`aria-describedby`, or `title` when it is not the name),
       * which screen readers announce after the name.
       *
       * @see src/rules/link-telephone-warning/atomic-tests/pass/link-tel-with-aria-describedby.html
       */
      if (textContainsWords(contentInfo.accessibleDescription.toLowerCase(), keywords)) {
        response.passedNodes.push(anchor);
        continue;
      }

      response.failedNodes.push(anchor);
    }
  },
};
