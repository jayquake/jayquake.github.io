import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const PageNoMetaHttpEquivRefreshSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Page No Meta Http Equiv Refresh"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "page with no meta with http equiv refresh", content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Test Page</title>
  </head>
  <body>
    <p>Content of the page</p>
  </body>
</html>` },
  { filename: "page with no meta", content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Test Page</title>
  </head>
  <body>
    <p>Content of the page</p>
  </body>
</html>` }
      ]}
    />
  );
};

export default PageNoMetaHttpEquivRefreshSuccess;
