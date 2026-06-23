import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";
import { CompliantTraitExposed } from "@acsbe/core-engine-classifier";

export const HeadingSingleH1: Rule = {
  id: "heading-single-h1",
  metadata: {
    category: "Text Content",
    profile: ["Blind"],
    wcagVersion: "2.0",
    wcagLevel: "A",
  },
  impact: "moderate",
  title: "A page should not have more than one main heading",
  description: "Each web page should have only one h1 element so that screen reader users can identify the main topic or purpose of the page. Multiple h1s can confuse users by suggesting there are multiple primary topics, disrupting navigation by headings and making it harder to understand the overall page structure.",
  advice: "Make sure that each web page has exactly one h1 element so that screen reader users can identify the main subject of the page.",
  associatedDetectors: [CompliantTraitExposed],
  refs: [
    {
      type: "WCAG",
      id: "1.3.1",
      level: "A",
      link: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html",
    },
    {
      type: "WCAG Technique",
      link: "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#content-structure-separation-programmatic",
    },
  ],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ response, root, classifier }) {
    const h1Headings = Array.from(root.querySelectorAll<HTMLElement>("h1:not([aria-level='2'], [aria-level='3'], [aria-level='4'], [aria-level='5'], [aria-level='6']), [role=heading][aria-level='1']"));

    /** Only include headings that are exposed to the screen reader */
    const exposedH1Headings = h1Headings.filter((heading) => classifier.assert(heading, CompliantTraitExposed));
    if (exposedH1Headings.length === 0) return;

    /** First H1 is passed */
    response.passedNodes.push(exposedH1Headings[0]);

    /** Fail the rest of the H1s */
    response.failedNodes.push(...exposedH1Headings.slice(1));
  },
};
