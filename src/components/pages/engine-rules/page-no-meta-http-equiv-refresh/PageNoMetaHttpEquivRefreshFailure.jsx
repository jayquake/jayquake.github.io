import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const PageNoMetaHttpEquivRefreshFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Page No Meta Http Equiv Refresh"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "page with meta with http equiv refresh with url", content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="refresh" content="5;url=https://www.example.com" />
    <title>Test Page</title>
  </head>
  <body>
    <p>Content of the page</p>
  </body>
</html>` },
  { filename: "page with meta with http equiv refresh without url", content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="refresh" content="5" />
    <title>Test Page</title>
  </head>
  <body>
    <p>Content of the page</p>
    <p1>This is a sentence, hello world, hello world, 123</p1>
  </body>
</html>` },
  { filename: "page with multiple meta with http equiv refresh", content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="refresh" content="5; url=https://www.example.com" />
    <meta http-equiv="refresh" content="10" />
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

export default PageNoMetaHttpEquivRefreshFailure;
