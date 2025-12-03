import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const PageMetaViewportFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Page Meta Viewport"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "page with no meta", content: `<html>
<head>
</head>
<body>
</body>
</html>` }
      ]}
    />
  );
};

export default PageMetaViewportFailure;
