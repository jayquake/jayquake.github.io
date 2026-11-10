import { CompliantComponentNavigation, CompliantComponentListItem, CompliantComponentLink, CompliantComponentButton, PerceivableTraitClickable } from "@acsbe/core-engine-classifier";
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
  associatedDetectors: [CompliantComponentNavigation, CompliantComponentListItem, PerceivableTraitClickable, CompliantComponentLink, CompliantComponentButton],
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
        const clickables = classifier.getMatchedInclusive([PerceivableTraitClickable], listItem).filter((clickable) => {
          // Only clickables owned by this list item, nested sub-list items are evaluated on their own
          const owner = classifier.assert(clickable, CompliantComponentListItem) ? clickable : classifier.getParent(clickable, CompliantComponentListItem);
          if (owner !== listItem) {
            return false;
          }

          // A navigation link is labeled by text, icon-only clickables are controls (e.g. language, search, close)
          return classifier.getOperations(clickable).contentInfo.visibleText !== "";
        });

        // Static items (e.g. breadcrumb current page, group labels, separators) and icon-only controls are out of scope
        if (clickables.length === 0) {
          response.inapplicableNodes.push(listItem);
          continue;
        }

        // A clickable is accessible when it, an ancestor within the list item, or an owned descendant has link or button semantics
        const hasInaccessibleClickable = clickables.some((clickable) => {
          if (classifier.assert(clickable, CompliantComponentLink) || classifier.assert(clickable, CompliantComponentButton)) {
            return false;
          }
          const linkParent = classifier.getParent(clickable, CompliantComponentLink);
          const buttonParent = classifier.getParent(clickable, CompliantComponentButton);
          if ((linkParent && listItem.contains(linkParent)) || (buttonParent && listItem.contains(buttonParent))) {
            return false;
          }
          return ![CompliantComponentLink, CompliantComponentButton].some((detector) => {
            const descendants = classifier.getMatched([detector], clickable);
            /**
             * A clickable list item can contain nested list items; their links/buttons must not make the outer item pass.
             * related test: @see file://./atomic-tests/fail/nested-button-does-not-satisfy-parent.html.
             */
            return descendants.some((descendant) => classifier.getParent(descendant, CompliantComponentListItem) === listItem);
          });
        });

        if (hasInaccessibleClickable) {
          response.failedNodes.push(listItem);
        } else {
          response.passedNodes.push(listItem);
        }
      }
    }
  },
};
