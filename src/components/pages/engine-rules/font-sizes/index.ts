import { PerceivableTraitVisible, PerceivableTraitDirectText, CompliantComponentSuperscript, PerceivableComponentSuperscript, CompliantComponentSubscript, PerceivableComponentSubscript } from "@acsbe/core-engine-classifier";
import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";

export const FontSizes: Rule = {
  id: "font-sizes",
  metadata: {
    category: "Text Content",
    profile: ["Vision Impaired"],
    wcagVersion: "2.0",
    wcagLevel: "AA",
  },
  impact: "minor",
  title: "Using a minimum font size of at least 12px is recommended",
  description: "A minimum font size of 12px helps keep text readable for users with low vision, older users, and people viewing content on small or high-density screens.",
  advice: "Avoid using font sizes below 12px; ideally, use 14px or larger for better readability.",
  associatedDetectors: [PerceivableTraitVisible, PerceivableTraitDirectText, CompliantComponentSuperscript, PerceivableComponentSuperscript, CompliantComponentSubscript, PerceivableComponentSubscript],
  refs: [
    {
      type: "WCAG",
      id: "2.4.11",
      level: "AA",
      link: "https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html",
    },
    {
      type: "Non-Standard",
      link: "https://www.section508.gov/develop/fonts-typography/",
    },
  ],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ response, classifier }) {
    const elements = classifier.getMatched([PerceivableTraitVisible, PerceivableTraitDirectText]);

    /** TODO: When something like getMatchedAny() is available, replace this spread with that method */
    const subscriptAndSuperscriptElements = new Set([...classifier.getMatched([CompliantComponentSuperscript]), ...classifier.getMatched([PerceivableComponentSuperscript]), ...classifier.getMatched([CompliantComponentSubscript]), ...classifier.getMatched([PerceivableComponentSubscript])]);

    for (const element of elements) {
      /*
        Superscript and subscript elements (for example <sup>®</sup>) are valid semantic HTML and are
        expected to render smaller by design. WCAG does not require a minimum font size for <sup> or
        <sub> content, as long as text scales with zoom.

        Flagging these as “too small” is a false positive and remediating them can override
        intentional typography. So we exempt <sup> and <sub> from font size checks.
      */
      if (subscriptAndSuperscriptElements.has(element)) {
        response.passedNodes.push(element);
        continue;
      }

      const {
        typographyInfo: { fontSize },
      } = classifier.getOperations(element);
      /**
       * History about font-size <= 1:
       * Original code contained a check for font-size <= 1 as well.
       * After researching, we found there are cases where font size is 1px, and then developers use em as 1px = 1em (so that for 16px they would use 16em).
       * This is bad practice on the developers side, but doesn't break the rule.
       * TODO: Consider creating another rule for the font-sizes unit. It is recommended to use rem/em for font-sizes for easier scaling.
       */
      if (fontSize > 11) {
        response.passedNodes.push(element);
      } else {
        response.failedNodes.push(element);
      }
    }
  },
};
