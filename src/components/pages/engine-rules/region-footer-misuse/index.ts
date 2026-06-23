import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";
import { PerceivableComponentFooter, CompliantComponentFooter } from "@acsbe/core-engine-classifier";

export const RegionFooterMisuse: Rule = {
  id: "region-footer-misuse",
  metadata: {
    category: "Landmarks",
    profile: ["Blind"],
    wcagVersion: "General Guidelines",
    wcagLevel: "N/A",
  },
  impact: "serious",
  title: "An element without global site information is tagged as a contentinfo landmark",
  description: "When a region without global site information is tagged as a contentinfo landmark, screen reader users may be misled about its purpose and expect website-level details, such as copyright or contact information.",
  advice: 'If the failing element is a custom contentinfo region, remove role="contentinfo". If the failing element is coded using a HTML <footer> tag, change the tag to a <div> or an element with a suitable role.',
  associatedDetectors: [PerceivableComponentFooter, CompliantComponentFooter],
  refs: [
    {
      type: "W3C",
      link: "https://www.w3.org/WAI/tutorials/page-structure/regions/",
    },
  ],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ response, classifier }) {
    const footers = classifier.getMatched([CompliantComponentFooter]);

    for (const footer of footers) {
      if (await classifier.assert(footer, PerceivableComponentFooter)) {
        response.passedNodes.push(footer);
      } else {
        response.failedNodes.push(footer);
      }
    }
  },
};
