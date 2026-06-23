import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";

export const AriaDescribedByHasReference: Rule = {
  id: "aria-describedby-has-reference",
  metadata: {
    category: "General",
    profile: ["Blind"],
    wcagVersion: "General Guidelines",
    wcagLevel: "N/A",
  },
  impact: "serious",
  title: "aria-describedby should reference a valid element id",
  description: "If an element’s aria-describedby attribute points to an id that does not exist or is not valid, assistive technologies will not convey the intended description, causing users to miss important context.",
  advice: "Ensure aria-describedby references an existing, unique id on the page. Remove or update the attribute if the target element is missing or no longer relevant.",
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
    const elements = document.querySelectorAll<HTMLElement>("[aria-describedby]");
    for (const element of elements) {
      const ariaDescribedBy = element.getAttribute("aria-describedby").replaceAll(/\s+/g, " ");
      const hasBrokenReference = ariaDescribedBy
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
