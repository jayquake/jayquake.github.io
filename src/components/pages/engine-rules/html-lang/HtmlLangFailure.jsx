import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const HtmlLangFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Html Lang"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "page no lang attribute", content: `<!DOCTYPE html>
<html>
<head>
    <title>Page with no lang attribute</title>
</head>
<body>
    <h1>Heading element</h1>
</body>
</html>` }
      ]}
    />
  );
};

export default HtmlLangFailure;
