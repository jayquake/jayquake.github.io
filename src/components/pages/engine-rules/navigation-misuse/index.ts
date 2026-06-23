import { CompliantComponentNavigation, PerceivableComponentNavigation, PerceivableComponentBreadcrumb, PerceivableComponentMainNavigation } from "@acsbe/core-engine-classifier";
import type { Rule } from "../interfaces";
import { PassCondition } from "../interfaces";

export const NavigationMisuse: Rule = {
  id: "navigation-misuse",
  metadata: {
    category: "Landmarks",
    profile: ["Blind"],
    wcagVersion: "2.0",
    wcagLevel: "A",
  },
  associatedDetectors: [CompliantComponentNavigation, PerceivableComponentNavigation, PerceivableComponentBreadcrumb, PerceivableComponentMainNavigation],
  impact: "serious",
  title: "Navigation landmark does not contain key site navigation links",
  description: "A navigation landmark should identify a section that contains primary links for moving through the site or page. Using navigation landmarks for minor or secondary link groups makes it harder for screen reader users to locate the page’s key navigation areas.",
  advice: "Use navigation landmarks only for key navigation sections, such as the main site menu, table of contents, breadcrumbs, or pagination. Avoid using them for general link lists, social links, related links, or other secondary link groups, and keep the number of navigation landmarks as limited as practical.",
  refs: [
    {
      type: "WCAG",
      id: "1.3.1",
      level: "A",
      link: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html",
    },
    {
      type: "WAI",
      link: "https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/",
    },
    {
      type: "WAI",
      link: "https://www.w3.org/WAI/ARIA/apg/patterns/menubar/examples/menubar-navigation/",
    },
    {
      type: "WAI",
      link: "https://www.w3.org/WAI/ARIA/apg/patterns/treeview/examples/treeview-navigation/",
    },
    {
      type: "WAI",
      link: "https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/navigation.html",
    },
  ],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ classifier, response }) {
    // Getting all compliant navigation elements (<nav> tag and [role=navigation] and whatever else is considered a nav compliant element)
    const elements = classifier.getMatched([CompliantComponentNavigation]);
    const mainNavigation = (await classifier.getMatched([PerceivableComponentMainNavigation]))[0];
    for (const element of elements) {
      const isElementPerceivedAsNavigation = classifier.assert(element, PerceivableComponentNavigation);
      if (!isElementPerceivedAsNavigation) {
        /**  To avoid conflicts with the BreadcrumbsNav rule, we will not mark it as failed
         * If the element is a perceivable breadcrumb, we put it as inapplicable
         * @see src/rules/navigation-misuse/atomic-tests/pass/breadcrumb-nav-list-items-mixed-inline-displays.html
         * If the element has a direct child that is a perceivable breadcrumb, we put it as inapplicable
         * @see src/rules/navigation-misuse/atomic-tests/pass/shop.qorpak.com-nav-has-direct-child-breadcrumb.html
         * */
        const isBreadcrumbOrHasDirectChildBreadcrumb = classifier.assert(element, PerceivableComponentBreadcrumb) || classifier.getMatchedDirect([PerceivableComponentBreadcrumb], element).length > 0;
        if (isBreadcrumbOrHasDirectChildBreadcrumb) {
          response.inapplicableNodes.push(element);
          /** To avoid conflicts with the MainNavigationMismatch rule, we will not mark it as failed */
        } else if ((mainNavigation && mainNavigation.parentElement === element) || mainNavigation === element) {
          response.inapplicableNodes.push(element);
        } else {
          response.failedNodes.push(element);
        }
      } else {
        response.passedNodes.push(element);
      }
    }
  },
};
