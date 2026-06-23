import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";
import { ISO_639_1_ALPHA2 } from "@acsbe/core-engine-dictionary";

export const HtmlLangValid: Rule = {
  id: "html-lang-valid",
  metadata: {
    category: "Metadata",
    profile: ["Blind"],
    wcagVersion: "General Guidelines",
    wcagLevel: "N/A",
  },
  impact: "serious",
  title: "HTML lang attribute should have a valid value",
  description: "Assigning a valid ISO language value to the <html> lang attribute ensures that screen readers use the correct pronunciation rules, browsers apply proper spell-checking and translation, and search engines index the content in the appropriate language.",
  advice: "Make sure that the lang attribute on the <html> element is assigned a valid ISO language code that matches the default language of the page.",
  associatedDetectors: [],
  refs: [
    {
      type: "ACT",
      ruleId: "bf051a",
      link: "https://act-rules.github.io/rules/bf051a",
    },
    {
      type: "Non-Standard",
      link: "https://en.wikipedia.org/wiki/IETF_language_tag",
    },
  ],
  passCondition: PassCondition.PassedNodesAndNoFailedNodes,
  async validate({ response, document }) {
    const root = document.documentElement;
    const langValue = root.lang.trim();

    if (!langValue) {
      response.inapplicableNodes.push(root);
      return;
    }

    if (hasKnownPrimaryLanguageTag(langValue)) {
      response.passedNodes.push(root);
    } else {
      response.failedNodes.push(root);
    }
  },
};

/**
 * - Requires the first subtag to be a known ISO 639-1 alpha-2 code (case-insensitive).
 * - Rejects empty sub-tags and non-alphanumeric characters (e.g. "#1", "de--1901").
 *
 * Subtags are not validated beyond the primary language tag.
 * This allows for valid tags with unknown subtags (e.g. "en-unknownsubtag") to pass, while still enforcing a valid primary language tag.
 * This approach is consistent with the IETF BCP 47 standard, which allows for private-use subtags that may not be registered in any registry, while still requiring a valid primary language tag.
 *
 * Assumes langValue is not empty and is trimmed of whitespace.
 */
export function hasKnownPrimaryLanguageTag(langValue: string): boolean {
  const tags = langValue.split("-");

  /** Reject empty sub-tags and non-alphanumeric characters (e.g. "#1", "de--1901") */
  for (const tag of tags) {
    if (tag.length === 0) return false;
    if (!/^[A-Za-z0-9]+$/.test(tag)) return false;
  }

  /** The primary language tag must be a known ISO 639-1 alpha-2 code (case-insensitive) */
  const primaryLanguageTag = tags[0].toLowerCase();
  if (!/^[a-z]{2}$/.test(primaryLanguageTag)) return false;
  return ISO_639_1_ALPHA2.has(primaryLanguageTag);
}
