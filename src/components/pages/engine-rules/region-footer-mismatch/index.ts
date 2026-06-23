import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";
import { PerceivableComponentFooter, CompliantComponentFooter } from "@acsbe/core-engine-classifier";

export const RegionFooterMismatch: Rule = {
  id: "region-footer-mismatch",
  metadata: {
    category: "Landmarks",
    profile: ["Blind"],
    wcagVersion: "General Guidelines",
    wcagLevel: "N/A",
  },
  impact: "moderate",
  title: "Global site information that appears at the end of each page is contained in a contentinfo landmark (footer)",
  description: "The contentinfo region, typically represented by the <footer> element, is found at the end of each page and provides screen reader users with information about the website, such as copyright, contact details, legal information, and navigation links.",
  advice: 'Use a <footer> element or assign role="contentinfo" to the section that provides global information and consistently appears at the end of each page.',
  associatedDetectors: [PerceivableComponentFooter, CompliantComponentFooter],
  refs: [
    {
      type: "W3C",
      link: "https://www.w3.org/WAI/tutorials/page-structure/regions/",
    },
  ],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ response, classifier }) {
    const footers = await classifier.getMatched([PerceivableComponentFooter]);

    for (const footer of footers) {
      if (classifier.assert(footer, CompliantComponentFooter)) {
        response.passedNodes.push(footer);
      } else {
        response.failedNodes.push(footer);
      }
    }
  },
};
