import { CompliantComponentNavigation, CompliantComponentHeader, PerceivableComponentMainNavigation, PerceivableComponentBreadcrumb } from "@acsbe/core-engine-classifier";
import type { Rule } from "../interfaces";
import { PassCondition } from "../interfaces";

export const HeaderNavigationDiscernible: Rule = {
  id: "header-navigation-discernible",
  metadata: {
    category: "Landmarks",
    profile: ["Blind"],
    wcagVersion: "2.0",
    wcagLevel: "A",
  },
  impact: "serious",
  title: "Header navigation should be labelled properly",
  description: "Header navigation elements should have text available for screen readers explaining that it is header navigation.",
  advice: "Add an aria-label to the header navigation elements",
  associatedDetectors: [CompliantComponentHeader, CompliantComponentNavigation, PerceivableComponentMainNavigation, PerceivableComponentBreadcrumb],
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
    /** Get all header elements */
    const headerElements = classifier.getMatched([CompliantComponentHeader]);

    /** Get all nav elements inside the headers */
    const navElements = headerElements.flatMap((header) => {
      return classifier.getMatched([CompliantComponentNavigation], header);
    });

    for (const nav of navElements) {
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
