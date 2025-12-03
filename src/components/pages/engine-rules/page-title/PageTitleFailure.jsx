import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const PageTitleFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Page Title"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "page no title element", content: `<html>
<head>
</head>
<body>
</body>
</html>` }
      ]}
    />
  );
};

export default PageTitleFailure;
