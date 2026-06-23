// Generated metadata for captcha-accessible-provider-2.2
// This file is auto-generated from index.ts to avoid module resolution issues

export const CaptchaAccessibleProvider_v2_2 = {
  id: "captcha-accessible-provider-v2.2",
  title: `CAPTCHA used in authentication should not involve cognitive function tests`,
  description: `With the exception of challenges that require recognition of  objects that are generally familiar to users, CAPTCHA used during authentication should not require users to perform cognitive function tests, such as recalling site-specific passwords or solving a puzzle.`,
  advice: `Provide an alternative authentication method that avoids cognitive tasks, such as a two-factor verification step. If CAPTCHA is required, use services that offer strong accessibility support, such as Google reCAPTCHA v3.`,
  impact: "critical",
  refs: [
    { type: "WCAG", id: "3.3.8", level: "AA", link: "https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html" },
    { type: "WCAG Technique", link: "https://www.w3.org/WAI/WCAG22/Techniques/general/G218" }
  ]
};
