import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";
import { CompliantComponentLink } from "@acsbe/core-engine-classifier";
import { textContainsWords } from "@acsbe/core-engine-dictionary";

export const LinkHomepageWarning: Rule = {
  id: "link-homepage-warning",
  metadata: {
    category: "Interactive Content",
    profile: ["Blind"],
    wcagVersion: "General Guidelines",
    wcagLevel: "N/A",
  },
  impact: "minor",
  title: "Warning a user that a link navigates to the homepage is recommended",
  description: "It's good practice to ensure that users can always identify links to the homepage.",
  advice: "Add a visibly hidden text element that contains 'Home'. Assign a unique id attribute to the element and add aria-describedby to the link, referencing the text element's id. Alternatively, nest a visibly hidden element that contains additional context inside of the link.",
  associatedDetectors: [CompliantComponentLink],
  refs: [],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ classifier, response }) {
    const links = classifier.getMatched([CompliantComponentLink]);

    for (const link of links) {
      if (!(link instanceof HTMLAnchorElement)) {
        continue;
      }

      const href = link.getAttribute("href");

      if (!href) {
        continue;
      }

      const isHomePage = href === "/" || href === document.location.origin || href.substring(0, href.length - 1) === document.location.origin;
      if (!isHomePage) {
        continue;
      }

      const { contentInfo } = classifier.getOperations(link);
      const linkText = contentInfo.srVisibleText.toLowerCase();
      const containsKeywords = textContainsWords(linkText, ["home", "homepage"]);

      if (containsKeywords) {
        response.passedNodes.push(link);
      } else {
        response.failedNodes.push(link);
      }
    }
  },
};
