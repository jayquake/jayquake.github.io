// Generated metadata for captcha-accessible-provider-2.0
// This file is auto-generated from index.ts to avoid module resolution issues

export const CaptchaAccessibleProvider_v2_0 = {
  id: "captcha-accessible-provider-v2.0",
  title: `An alternative modality should be provided for CAPTCHA challenges`,
  description: `Visual-only or audio-only CAPTCHA can block users who cannot perceive certain formats. Providing a text alternative and another equivalent modality ensures that people with different sensory needs can complete the challenge.`,
  advice: `Ensure that both a text alternative and a second modality are available for CAPTCHA challenges. Use CAPTCHA services that offer strong accessibility support, such as Google reCaptcha v2 or v3.`,
  impact: "critical",
  refs: [
    { type: "WCAG", id: "1.1.1", level: "A", link: "https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=211%2C412#non-text-content" },
    { type: "Non-Standard", link: "https://www.w3.org/TR/turingtest" },
    { type: "Non-Standard", link: "https://support.google.com/recaptcha/answer/6175971?hl=en" },
    { type: "Non-Standard", link: "https://www.hcaptcha.com/accessibility" },
    { type: "Non-Standard", link: "https://developers.cloudflare.com/turnstile/frequently-asked-questions" },
    { type: "Non-Standard", link: "https://friendlycaptcha.com/insights/create-an-accessible-website-how-it-works" }
  ]
};
