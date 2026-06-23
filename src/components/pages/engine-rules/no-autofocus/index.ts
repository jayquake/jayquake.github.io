import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";

export const NoAutofocus: Rule = {
  id: "no-autofocus",
  metadata: {
    category: "General",
    profile: ["Blind", "Motor Impaired"],
    wcagVersion: "2.0",
    wcagLevel: "A",
  },
  impact: "serious",
  title: "Avoid using autofocus",
  description: "Make sure that no element has an autofocus attribute.",
  advice: "Remove the autofocus attribute from the failing element.",
  associatedDetectors: [],
  refs: [
    {
      type: "WCAG",
      id: "2.4.3",
      level: "A",
      link: "https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html",
    },
    {
      type: "WCAG",
      id: "1.3.2",
      level: "A",
      link: "https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html",
    },
  ],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ response, root }) {
    const candidates = root.querySelectorAll<HTMLElement>("[autofocus]");
    for (const candidate of candidates) {
      if (!(candidate instanceof HTMLElement)) {
        continue;
      }

      response.failedNodes.push(candidate);
    }
  },
};
