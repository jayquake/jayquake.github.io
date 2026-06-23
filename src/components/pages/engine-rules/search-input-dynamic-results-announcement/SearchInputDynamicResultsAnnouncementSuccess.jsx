import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const SearchInputDynamicResultsAnnouncementSuccess = () => {
  const ruleId = "search-input-announcement";
  const title = `Search results should be announced when ready`;
  const description = `Before a blind user types text in a search form and a select-option combobox appears with results, screen readers should announce that results will be ready. Without this announcement, users may not know if search results will be available and ready to navigate.`;
  const helpText = `Add an sr-only text that announces 'results are ready' or similar text when the user navigates to a search input element. The announcement should indicate that results will be available, not list the results themselves.`;
  const bestPractices = [
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
  ];
  const htmlExamples = [
  { filename: "shopify search with aria describedby", content: `<html>
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
      <span id="announcement" class="sr-only">Result is available</span>
    </div>
  </body>
</html>` },
  { filename: "shopify search with meta token", content: `<html>
  <head>
    <!-- Another way to identify shopify sites is by this meta tag and specific name -->
    <meta name="shopify-checkout-api-token" content="test-token" />
    <script id="shopify-features">
      {"predictiveSearch": true}
    </script>
  </head>
  <body>
    <div class="search-container">
      <input type="search" aria-describedby="announcement" />
      <div id="announcement" class="sr-only">Search results are available</div>
    </div>
  </body>
</html>` }
  ];

  return (
    <EngineIssueSuccess
      ruleId={ruleId}
      title={title}
      description={description}
      helpText={helpText}
      bestPractices={bestPractices}
      htmlExamples={htmlExamples}
    />
  );
};

export default SearchInputDynamicResultsAnnouncementSuccess;
