import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const NoRoleApplicationSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="No Role Application"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "no element with role application", content: `<html>
<head>
</head>
<body>
<div>...</div>
</body>
</html>` }
      ]}
    />
  );
};

export default NoRoleApplicationSuccess;
