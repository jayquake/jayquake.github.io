import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";
import { PerceivableTraitDirectText, PerceivableTraitVisible } from "@acsbe/core-engine-classifier";

export const TextSpacingWordSpacing: Rule = {
  id: "text-spacing-word-spacing",
  metadata: {
    category: "Text Content",
    profile: ["Vision Impaired"],
    wcagVersion: "2.1",
    wcagLevel: "AA",
  },
  impact: "minor",
  title: "Word spacing should scale to at least 0.16 times the font size without loss of content or functionality",
  description: "When word spacing is increased to 0.16 times the font size, text may be clipped, overlap, or overflow its container if styles like fixed heights, fixed widths, hidden overflow, forced no-wrap, or absolute positioning prevent proper reflow.",
  advice: "Use flexible heights and widths, position elements in ways that allow text reflow, enable text wrapping, and avoid hidden overflow to ensure content remains readable when word spacing is scaled to 0.16 times the font size.",
  associatedDetectors: [PerceivableTraitDirectText, PerceivableTraitVisible],
  refs: [
    {
      type: "WCAG",
      id: "1.4.12",
      level: "AA",
      link: "https://www.w3.org/WAI/WCAG21/Understanding/text-spacing.html",
    },
    {
      type: "ACT",
      ruleId: "9e45ec",
      link: "https://act-rules.github.io/rules/9e45ec",
    },
  ],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ classifier, response }) {
    const candidates = classifier.getMatched([PerceivableTraitVisible, PerceivableTraitDirectText]);

    for (const candidate of candidates) {
      const { typographyInfo } = classifier.getOperations(candidate);
      if (typographyInfo.wordSpacing < 0.16 * typographyInfo.fontSize) {
        response.failedNodes.push(candidate);
      } else {
        response.passedNodes.push(candidate);
      }
    }
  },
};
