import { PerceivableComponentLinkCheckout, CompliantComponentLink } from "@acsbe/core-engine-classifier";
import type { Rule } from "../interfaces";
import { PassCondition } from "../interfaces";

export const LinkMismatch: Rule = {
  id: "link-mismatch",
  metadata: {
    category: "Interactive Content",
    profile: ["Blind"],
    wcagVersion: "2.0",
    wcagLevel: "A",
  },
  impact: "serious",
  title: "Links should be tagged properly",
  description: "Custom links should be tagged with role='link' for assistive technologies to identify them correctly.",
  advice: "Add role='link' to custom link elements or use a HTML <a> element to ensure they are recognized as links by assistive technologies.",
  associatedDetectors: [PerceivableComponentLinkCheckout, CompliantComponentLink],
  refs: [
    {
      type: "WCAG",
      id: "4.1.2",
      level: "A",
      link: "https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=211%2C412#name-role-value",
    },
    {
      type: "WAI",
      link: "https://www.w3.org/WAI/ARIA/apg/patterns/link/examples/link/",
    },
    {
      type: "Non-Standard",
      link: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/link_role",
    },
    {
      type: "Non-Standard",
      link: "https://vispero.com/resources/link-vs-button-choosing-the-right-element-for-the-right-job/",
    },
  ],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ response, classifier }) {
    const elements = classifier.getMatched([PerceivableComponentLinkCheckout]);

    for (const element of elements) {
      if (classifier.assert(element, CompliantComponentLink)) {
        response.passedNodes.push(element);
      } else {
        response.failedNodes.push(element);
      }
    }
  },
};
