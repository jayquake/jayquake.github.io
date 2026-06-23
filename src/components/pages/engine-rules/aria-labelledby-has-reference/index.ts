import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";

export const AriaLabelledByHasReference: Rule = {
  id: "aria-labelledby-has-reference",
  metadata: {
    category: "General",
    profile: ["Blind"],
    wcagVersion: "General Guidelines",
    wcagLevel: "N/A",
  },
  impact: "serious",
  title: "aria-labelledby should reference a valid element id",
  description: "Since aria-labelledby relies on valid id references, screen readers can only announce the label if the target exists. If the id is missing or invalid, the label will not be conveyed, causing users to miss important context.",
  advice: "Ensure aria-labelledby references an existing, unique id on the page. Remove or update the attribute if the target element is missing or no longer relevant.",
  associatedDetectors: [],
  refs: [
    {
      type: "WCAG Technique",
      link: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA1",
    },
    {
      type: "WCAG Technique",
      link: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA16",
    },
    {
      type: "ACT",
      ruleId: "in6db8",
      link: "https://act-rules.github.io/rules/in6db8",
    },
  ],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ response, document }) {
    const elements = document.querySelectorAll<HTMLElement>("[aria-labelledby]");
    for (const element of elements) {
      const ariaLabelledBy = element.getAttribute("aria-labelledby").replaceAll(/\s+/g, " ");
      const hasBrokenReference = ariaLabelledBy
        .trim()
        .split(" ")
        .some((id) => !document.getElementById(id));

      if (hasBrokenReference) {
        response.failedNodes.push(element);
      } else {
        response.passedNodes.push(element);
      }
    }
  },
};
