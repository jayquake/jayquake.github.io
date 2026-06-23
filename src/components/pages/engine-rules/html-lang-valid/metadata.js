// Generated metadata for html-lang-valid
// This file is auto-generated from index.ts to avoid module resolution issues

export const HtmlLangValid = {
  id: "html-lang-valid",
  title: `HTML lang attribute should have a valid value`,
  description: `Assigning a valid ISO language value to the <html> lang attribute ensures that screen readers use the correct pronunciation rules, browsers apply proper spell-checking and translation, and search engines index the content in the appropriate language.`,
  advice: `Make sure that the lang attribute on the <html> element is assigned a valid ISO language code that matches the default language of the page.`,
  impact: "serious",
  refs: [
    { type: "ACT", link: "https://act-rules.github.io/rules/bf051a" },
    { type: "Non-Standard", link: "https://en.wikipedia.org/wiki/IETF_language_tag" }
  ]
};
