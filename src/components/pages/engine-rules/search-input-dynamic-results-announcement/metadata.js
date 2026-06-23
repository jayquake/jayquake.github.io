// Generated metadata for search-input-dynamic-results-announcement
// This file is auto-generated from index.ts to avoid module resolution issues

export const SearchInputAnnouncement = {
  id: "search-input-announcement",
  title: `Search results should be announced when ready`,
  description: `Before a blind user types text in a search form and a select-option combobox appears with results, screen readers should announce that results will be ready. Without this announcement, users may not know if search results will be available and ready to navigate.`,
  advice: `Add an sr-only text that announces 'results are ready' or similar text when the user navigates to a search input element. The announcement should indicate that results will be available, not list the results themselves.`,
  impact: "serious",
  refs: [
    { type: "WCAG", id: "4.1.3", level: "AA", link: "https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#status-messages" }
  ]
};
