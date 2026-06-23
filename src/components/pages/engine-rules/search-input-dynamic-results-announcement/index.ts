import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";
import { PerceivableComponentSearchInput } from "@acsbe/core-engine-classifier";
import { textContainsWord } from "@acsbe/core-engine-dictionary";

export const SearchInputAnnouncement: Rule = {
  id: "search-input-announcement",
  metadata: {
    category: "Forms",
    profile: ["Blind"],
    wcagVersion: "2.1",
    wcagLevel: "AA",
  },
  impact: "serious",
  title: "Search results should be announced when ready",
  description: "Before a blind user types text in a search form and a select-option combobox appears with results, screen readers should announce that results will be ready. Without this announcement, users may not know if search results will be available and ready to navigate.",
  advice: "Add an sr-only text that announces 'results are ready' or similar text when the user navigates to a search input element. The announcement should indicate that results will be available, not list the results themselves.",
  associatedDetectors: [PerceivableComponentSearchInput],
  refs: [
    {
      type: "WCAG",
      id: "4.1.3",
      level: "AA",
      link: "https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#status-messages",
    },
  ],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ classifier, response }) {
    const searchInputs = classifier.getMatched([PerceivableComponentSearchInput]);
    for (const searchInput of searchInputs) {
      const operations = classifier.getOperations(searchInput);

      const srVisibleText = operations.contentInfo.srVisibleText;
      if (!srVisibleText) {
        response.failedNodes.push(searchInput);
        continue;
      }

      const containsResult = textContainsWord(srVisibleText, "result");
      const containsAvailable = textContainsWord(srVisibleText, "available");

      if (containsResult && containsAvailable) {
        response.passedNodes.push(searchInput);
      } else {
        response.failedNodes.push(searchInput);
      }
    }
  },
};
