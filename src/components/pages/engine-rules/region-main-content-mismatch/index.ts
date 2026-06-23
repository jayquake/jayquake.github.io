import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";
import { CompliantComponentMainContent, PerceivableComponentMainContent } from "@acsbe/core-engine-classifier";

export const RegionMainContentMismatch: Rule = {
  id: "region-main-content-mismatch",
  metadata: {
    category: "Landmarks",
    profile: ["Blind"],
    wcagVersion: "2.0",
    wcagLevel: "A",
  },
  impact: "serious",
  title: "All of the main content on the page is contained in the main landmark",
  description: "The main landmark represents the primary content of a page. It should include only content unique to that page and must remain separate from repeated elements, such as navigation, header, or footer.",
  advice:
    'Avoid nesting <main> or elements with role="main" and other landmark or sectioning elements such as <header>, <footer>, <nav>, <article>, or <aside> (including elements with respective ARIA roles). Ensure that the main landmark contains all of the main content, and it is not enclosing the entire HTML document or positioned outside the primary content area.',
  associatedDetectors: [PerceivableComponentMainContent, CompliantComponentMainContent],
  refs: [
    {
      type: "WCAG",
      id: "1.3.1",
      level: "A",
      link: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html",
    },
    {
      type: "Non-Standard",
      link: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/main_role",
    },
    {
      type: "WAI",
      link: "https://www.digitala11y.com/main-role/",
    },
  ],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ response, classifier }) {
    const mainLandmarks = await classifier.getMatched([PerceivableComponentMainContent]);

    for (const mainLandmark of mainLandmarks) {
      if (classifier.assert(mainLandmark, CompliantComponentMainContent)) {
        response.passedNodes.push(mainLandmark);
      } else {
        response.failedNodes.push(mainLandmark);
      }
    }
  },
};
