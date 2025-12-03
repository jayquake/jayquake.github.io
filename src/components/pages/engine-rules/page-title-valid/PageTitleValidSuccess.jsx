import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const PageTitleValidSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Page Title Valid"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "page no title element", content: `<html>
<head>
</head>
<body>
</body>
</html>` },
  { filename: "page title element", content: `<html>
<head>
    <title>Descriptive Title</title>
</head>
<body>
</body>
</html>` }
      ]}
    />
  );
};

export default PageTitleValidSuccess;
