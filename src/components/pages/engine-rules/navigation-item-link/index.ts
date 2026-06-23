import { CompliantComponentNavigation, CompliantComponentListItem, CompliantComponentLink } from "@acsbe/core-engine-classifier";
import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";

export const NavigationItemLink: Rule = {
  id: "navigation-item-link",
  metadata: {
    category: "Lists",
    profile: ["Blind"],
    wcagVersion: "2.0",
    wcagLevel: "A",
  },
  impact: "serious",
  title: "List items in a navigation region should not be interactive",
  description: "Adding interactive behavior to <li> elements within a navigation list may prevent screen reader users from identifying the element as actionable, since <li> elements are announced as list items and expected to be static.",
  advice: "In order to maintain the semantic structure of the list, a properly formed <a> element should be nested inside the <li>.",
  associatedDetectors: [CompliantComponentNavigation, CompliantComponentListItem, CompliantComponentLink],
  refs: [
    {
      type: "WCAG",
      id: "1.3.1",
      level: "A",
      link: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html",
    },
    {
      type: "W3C",
      link: "https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/navigation.html",
    },
    {
      type: "W3C",
      link: "https://www.w3.org/WAI/ARIA/apg/patterns/treeview/examples/treeview-navigation/",
    },
    {
      type: "Non-Standard",
      link: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/navigation_role",
    },
  ],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ response, classifier }) {
    const navigationElements = classifier.getMatched([CompliantComponentNavigation]);
    for (const navElement of navigationElements) {
      const innerListItems = classifier.getMatched([CompliantComponentListItem], navElement);
      for (const listItem of innerListItems) {
        const hasLinkChild = classifier.getMatched([CompliantComponentLink], listItem).length > 0;
        const { contentInfo } = classifier.getOperations(listItem);
        const hasVisibleText = contentInfo.visibleText !== "";
        if (!hasLinkChild && hasVisibleText) {
          response.failedNodes.push(listItem);
        } else {
          response.passedNodes.push(listItem);
        }
      }
    }
  },
};
