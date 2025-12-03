import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const PageTitleValidFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Page Title Valid"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "page title one word", content: `<html>
<head>
    <title>ONEWORD</title>
</head>
<body>
</body>
</html>` }
      ]}
    />
  );
};

export default PageTitleValidFailure;
