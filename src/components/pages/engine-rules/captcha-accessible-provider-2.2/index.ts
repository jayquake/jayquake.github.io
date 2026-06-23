import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";
import { PerceivableComponentCaptcha } from "@acsbe/core-engine-classifier";

export const CaptchaAccessibleProvider_v2_2: Rule = {
  id: "captcha-accessible-provider-v2.2",
  metadata: {
    category: "Forms",
    profile: ["Cognitive Disability"],
    wcagVersion: "2.2",
    wcagLevel: "AA",
  },
  impact: "critical",
  title: "CAPTCHA used in authentication should not involve cognitive function tests",
  description: "With the exception of challenges that require recognition of  objects that are generally familiar to users, CAPTCHA used during authentication should not require users to perform cognitive function tests, such as recalling site-specific passwords or solving a puzzle.",
  advice: "Provide an alternative authentication method that avoids cognitive tasks, such as a two-factor verification step. If CAPTCHA is required, use services that offer strong accessibility support, such as Google reCAPTCHA v3.",
  associatedDetectors: [PerceivableComponentCaptcha],
  refs: [
    {
      type: "WCAG",
      id: "3.3.8",
      level: "AA",
      link: "https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html",
    },
    {
      type: "WCAG Technique",
      link: "https://www.w3.org/WAI/WCAG22/Techniques/general/G218",
    },
  ],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ response, classifier }) {
    //TODO: Get type for accessibleCaptchaProviders from classifier
    const accessibleCaptchaProviders = ["recaptcha", "hCaptcha", "friendlyCaptcha"];
    const elements = classifier.getMatched([PerceivableComponentCaptcha]);
    for (const element of elements) {
      const { componentMatch } = classifier.getOperations(element);
      const elementType = componentMatch.element.type;
      if (!accessibleCaptchaProviders.includes(elementType)) {
        response.failedNodes.push(element);
      } else {
        response.passedNodes.push(element);
      }
    }
  },
};
