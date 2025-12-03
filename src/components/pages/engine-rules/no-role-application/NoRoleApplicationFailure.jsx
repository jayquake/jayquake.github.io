import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const NoRoleApplicationFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="No Role Application"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "element with role application", content: `<html>
<head>
</head>
<body>
<div role="application">...</div>
</body>
</html>` }
      ]}
    />
  );
};

export default NoRoleApplicationFailure;
