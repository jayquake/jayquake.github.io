import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";
import { CompliantComponentLink } from "@acsbe/core-engine-classifier";
import { textContainsWords } from "@acsbe/core-engine-dictionary";

export const LinkNewWindowWarning: Rule = {
  id: "link-new-window-warning",
  metadata: {
    category: "Interactive Content",
    profile: ["Blind"],
    wcagVersion: "General Guidelines",
    wcagLevel: "N/A",
  },
  impact: "minor",
  title: "Warning a user when a link triggers a new browser window is recommended",
  description: "It's good practice to warn users about the expected behavior when activating a link triggers a new window.",
  advice: "Add a visibly hidden text element that contains 'Opens new window'. Assign a unique id attribute to the element and add aria-describedby to the link, referencing the text element's id. Alternatively, nest a visibly hidden element that contains additional context inside of the link.",
  associatedDetectors: [CompliantComponentLink],
  refs: [],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ classifier, response }) {
    const links = classifier.getMatched([CompliantComponentLink]);

    for (const link of links) {
      const isTargetBlank = link.getAttribute("target") === "_blank";

      if (!isTargetBlank) {
        continue;
      }

      const { contentInfo } = classifier.getOperations(link);
      const keywords: Parameters<typeof textContainsWords>[1] = ["new_window", "separate_window", "new_tab", "separate_tab"];

      if (textContainsWords(contentInfo.accessibleName.toLowerCase(), keywords)) {
        response.passedNodes.push(link);
        continue;
      }

      /**
       * The warning can also be conveyed through the accessible description (`aria-describedby`, or `title` when it is not the name),
       * which screen readers announce after the name.
       *
       * @see src/rules/link-new-window-warning/atomic-tests/pass/link-with-target-blank-aria-describedby-with-new-window.html
       */
      if (textContainsWords(contentInfo.accessibleDescription.toLowerCase(), keywords)) {
        response.passedNodes.push(link);
        continue;
      }

      response.failedNodes.push(link);
    }
  },
};
