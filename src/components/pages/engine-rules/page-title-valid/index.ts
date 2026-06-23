import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";

export const PageTitleValid: Rule = {
  id: "page-title-valid",
  metadata: {
    category: "Metadata",
    profile: ["Blind"],
    wcagVersion: "2.0",
    wcagLevel: "A",
  },
  impact: "moderate",
  title: "Page title should be descriptive",
  description: "Screen readers rely heavily on page titles to announce the purpose of a page. If titles aren’t descriptive, users with low or no vision may not understand the context until they start navigating the page.",
  advice: "Make sure the title element inside the <head> is unique and describes the purpose of the page.",
  associatedDetectors: [],
  refs: [
    {
      type: "WCAG",
      id: "2.4.2",
      level: "A",
      link: "https://www.w3.org/WAI/WCAG22/Understanding/page-titled.html",
    },
    {
      type: "ACT",
      ruleId: "2779a5",
      link: "https://act-rules.github.io/rules/2779a5",
    },
    {
      type: "ACT",
      ruleId: "c4a8a4",
      link: "https://act-rules.github.io/rules/c4a8a4",
    },
  ],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ response, document }) {
    const title = document.querySelector<HTMLElement>("head > title");
    if (title) {
      const wordCount = countWords(title.textContent);

      if (wordCount > 1) {
        response.passedNodes.push(title);
      } else {
        response.failedNodes.push(title);
      }
    }
  },
};

/**
 * Count the number of words in a given input string while ignoring numbers.
 * @param input
 */
function countWords(input: string): number {
  const withoutNumbers = input.replace(/\d+/g, "");

  const normalized = withoutNumbers.replace(/\s+/g, " ").trim();

  const words = normalized.split(" ").filter((word) => word.length > 0);

  // Step 4: Return the word count
  return words.length;
}
