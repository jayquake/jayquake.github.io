import { CompliantComponentList, CompliantComponentListItem } from "@acsbe/core-engine-classifier";
import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";

export const ListItemMisuse: Rule = {
  id: "list-item-missuse",
  metadata: {
    category: "Lists",
    profile: ["Blind"],
    wcagVersion: "2.0",
    wcagLevel: "A",
  },
  impact: "serious",
  title: "Orphaned list items with no direct list parent should not be tagged as list items",
  description: "Orphaned list items can be confusing for users of assistive technologies. If list items are used, they should be grouped within a list structure.",
  advice: 'Tag the element as a role="presentation" or remove the list item tag.',
  associatedDetectors: [CompliantComponentList, CompliantComponentListItem],
  refs: [
    {
      type: "Non-Standard",
      link: "https://dequeuniversity.com/rules/axe/4.1/listitem",
    },
    {
      type: "WCAG Technique",
      link: "https://www.w3.org/WAI/WCAG21/Techniques/html/H48.html",
    },
    {
      type: "W3C",
      link: "https://www.w3.org/TR/html401/struct/lists.html",
    },
  ],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ response, classifier }) {
    const listItems = classifier.getMatched([CompliantComponentListItem]);

    for (const listItem of listItems) {
      if (listItem.parentElement && classifier.assert(listItem.parentElement, CompliantComponentList)) {
        response.passedNodes.push(listItem);
      } else {
        response.failedNodes.push(listItem);
      }
    }
  },
};
