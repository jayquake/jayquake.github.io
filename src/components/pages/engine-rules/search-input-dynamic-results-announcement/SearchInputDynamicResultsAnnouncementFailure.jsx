import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const SearchInputDynamicResultsAnnouncementFailure = () => {
  const ruleId = "search-input-announcement";
  const title = `Search results should be announced when ready`;
  const description = `Before a blind user types text in a search form and a select-option combobox appears with results, screen readers should announce that results will be ready. Without this announcement, users may not know if search results will be available and ready to navigate.`;
  const helpText = `Add an sr-only text that announces 'results are ready' or similar text when the user navigates to a search input element. The announcement should indicate that results will be available, not list the results themselves.`;
  const fixSteps = [
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
  ];
  const htmlExamples = [
  { filename: "shopify search with aria describedby no announcement", content: `<html>
  <head>
    <script>
      window.Shopify = {};
    </script>
    <script id="shopify-features">
      {"predictiveSearch": true}
    </script>
  </head>
  <body>
    <div class="search-container">
      <input type="search" aria-describedby="announcement" />
      <span id="announcement" class="sr-only">Loading...</span>
    </div>
  </body>
</html>` },
  { filename: "shopify search with wrong sr only", content: `<html>
  <head>
    <script>
      window.Shopify = {};
    </script>
    <script id="shopify-features">
      {"predictiveSearch": true}
    </script>
  </head>
  <body>
    <div class="search-container">
      <input type="search" />
      <div class="sr-only">Results are good...</div>
    </div>
  </body>
</html>` },
  { filename: "shopify search without announcement but shopify", content: `<html>
  <head>
    <script>
      window.Shopify = {};
    </script>
    <script id="shopify-features">
      {"predictiveSearch": true}
    </script>
  </head>
  <body>
    <div class="search-container">
      <input type="search" />
      <!-- No sr-only announcement element -->
    </div>
  </body>
</html>` }
  ];

  return (
    <EngineIssueFailure
      ruleId={ruleId}
      title={title}
      description={description}
      helpText={helpText}
      fixSteps={fixSteps}
      htmlExamples={htmlExamples}
    />
  );
};

export default SearchInputDynamicResultsAnnouncementFailure;
