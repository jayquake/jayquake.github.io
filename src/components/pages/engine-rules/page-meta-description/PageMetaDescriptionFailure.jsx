import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const PageMetaDescriptionFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Page Meta Description"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "page no meta description", content: `<html>
<head>
</head>
<body>
</body>
</html>` }
      ]}
    />
  );
};

export default PageMetaDescriptionFailure;
