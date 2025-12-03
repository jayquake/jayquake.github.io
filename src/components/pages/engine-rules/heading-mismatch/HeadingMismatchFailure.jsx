import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const HeadingMismatchFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Heading Mismatch"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "perceivable heading no role heading", content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Example Page</title>
  </head>
  <body>
    <style>
      body {
        font-size: 16px;
        font-weight: 400;
      }
      .text-xl {
        font-size: 20px;
        font-weight: 400;
      }
    </style>

    <div class="text-xl">Big Heading</div>
    <p>Regular body text</p>
  </body>
</html>` }
      ]}
    />
  );
};

export default HeadingMismatchFailure;
