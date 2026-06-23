import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";
import { CompliantComponentIframe, PerceivableTraitDiscernibleText } from "@acsbe/core-engine-classifier";

export const IframeDiscernible: Rule = {
  id: "iframe-discernible",
  metadata: {
    category: "General",
    profile: ["Blind"],
    wcagVersion: "2.0",
    wcagLevel: "A",
  },
  impact: "critical",
  title: "Iframes should have a descriptive label",
  description: "An iframe needs a label that describes its purpose to screen reader users.",
  advice: "Assign an aria-label to the iframe element.",
  associatedDetectors: [CompliantComponentIframe, PerceivableTraitDiscernibleText],
  refs: [
    {
      type: "WCAG",
      id: "4.1.2",
      level: "A",
      link: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
    },
    {
      type: "ACT",
      ruleId: "cae760",
      link: "https://act-rules.github.io/rules/cae760",
    },
  ],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ classifier, response }) {
    const iframes = classifier.getMatched([CompliantComponentIframe]);

    for (const iframe of iframes) {
      if (classifier.assert(iframe, PerceivableTraitDiscernibleText)) {
        response.passedNodes.push(iframe);
      } else {
        response.failedNodes.push(iframe);
      }
    }
  },
};
