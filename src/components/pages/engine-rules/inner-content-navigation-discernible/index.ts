import { CompliantComponentNavigation, CompliantComponentFooter, PerceivableComponentMainNavigation, CompliantComponentHeader, PerceivableComponentBreadcrumb } from "@acsbe/core-engine-classifier";
import type { Rule } from "../interfaces";
import { PassCondition } from "../interfaces";

export const InnerContentNavigationDiscernible: Rule = {
  id: "inner-content-navigation-discernible",
  metadata: {
    category: "Landmarks",
    profile: ["Blind"],
    wcagVersion: "2.0",
    wcagLevel: "A",
  },
  impact: "serious",
  title: "Inner content navigation should be labelled properly",
  description: "Navigation elements within the page content should have text available for screen readers explaining that it is inner-content navigation.",
  advice: "Add an aria-label to the inner-content navigation elements",
  associatedDetectors: [CompliantComponentNavigation, CompliantComponentFooter, CompliantComponentHeader, PerceivableComponentMainNavigation, PerceivableComponentBreadcrumb],
  refs: [
    {
      type: "WCAG",
      id: "1.3.1",
      level: "A",
      link: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html",
    },
    {
      type: "WAI",
      link: "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/",
    },
    {
      type: "W3C",
      link: "https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/navigation.html",
    },
  ],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ response, classifier }) {
    /** Get all footer nav elements */
    const footerElements = classifier.getMatched([CompliantComponentFooter]);
    const footerNavElements = footerElements.flatMap((footer) => {
      return classifier.getMatched([CompliantComponentNavigation], footer);
    });

    /** Get all header nav elements */
    const headerElements = classifier.getMatched([CompliantComponentHeader]);
    const headerNavElements = headerElements.flatMap((header) => {
      return classifier.getMatched([CompliantComponentNavigation], header);
    });

    /** Exclude any navs that are in footer or header */
    const headerAndFooterNavs = new Set([...footerNavElements, ...headerNavElements]);

    /** Get all nav elements */
    const navElements = classifier.getMatched([CompliantComponentNavigation]);

    for (const nav of navElements) {
      /** Skip navigation menus that are in footer or header. They are handled via HeaderNavigationDiscernible and FooterNavigationDiscernible */
      if (headerAndFooterNavs.has(nav)) {
        response.inapplicableNodes.push(nav);
        continue;
      }

      /** Main Navigation is handled via MainNavigationDiscernible */
      const isMainNavigation = await classifier.assert(nav, PerceivableComponentMainNavigation);
      if (isMainNavigation) {
        response.inapplicableNodes.push(nav);
        continue;
      }

      /** PerceivableComponentBreadcrumb is handled via BreadcrumbsMismatch */
      const isPerceivableBreadcrumb = classifier.assert(nav, PerceivableComponentBreadcrumb);
      if (isPerceivableBreadcrumb) {
        response.inapplicableNodes.push(nav);
        continue;
      }

      /** Fail any navs that lack an accessibleName */
      const { accessibleName } = classifier.getOperations(nav).contentInfo;
      if (!accessibleName) {
        response.failedNodes.push(nav);
        continue;
      }

      response.passedNodes.push(nav);
    }
  },
};
