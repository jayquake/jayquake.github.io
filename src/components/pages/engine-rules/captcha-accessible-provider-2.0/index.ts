import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";
import { PerceivableComponentCaptcha } from "@acsbe/core-engine-classifier";

export const CaptchaAccessibleProvider_v2_0: Rule = {
  id: "captcha-accessible-provider-v2.0",
  metadata: {
    category: "Forms",
    profile: ["Cognitive Disability"],
    wcagVersion: "2.0",
    wcagLevel: "A",
  },
  impact: "critical",
  title: "An alternative modality should be provided for CAPTCHA challenges",
  description: "Visual-only or audio-only CAPTCHA can block users who cannot perceive certain formats. Providing a text alternative and another equivalent modality ensures that people with different sensory needs can complete the challenge.",
  advice: "Ensure that both a text alternative and a second modality are available for CAPTCHA challenges. Use CAPTCHA services that offer strong accessibility support, such as Google reCaptcha v2 or v3.",
  associatedDetectors: [PerceivableComponentCaptcha],
  refs: [
    {
      type: "WCAG",
      id: "1.1.1",
      level: "A",
      link: "https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=211%2C412#non-text-content",
    },
    {
      type: "Non-Standard",
      link: "https://www.w3.org/TR/turingtest",
    },
    {
      type: "Non-Standard",
      link: "https://support.google.com/recaptcha/answer/6175971?hl=en",
    },
    {
      type: "Non-Standard",
      link: "https://www.hcaptcha.com/accessibility",
    },
    {
      type: "Non-Standard",
      link: "https://developers.cloudflare.com/turnstile/frequently-asked-questions",
    },
    {
      type: "Non-Standard",
      link: "https://friendlycaptcha.com/insights/create-an-accessible-website-how-it-works",
    },
  ],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ response, classifier }) {
    //TODO: Get type for accessibleCaptchaProviders from classifier
    const accessibleCaptchaProviders = ["recaptcha", "hCaptcha", "cfTurnstile", "friendlyCaptcha"];
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
