import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const PageTitleSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Page Title"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "page empty title", content: `<html>
<head>
    <title></title>
</head>
<body>
</body>
</html>` },
  { filename: "page title element", content: `<html>
<head>
    <title>Page Title</title>
</head>
<body>
</body>
</html>` }
      ]}
    />
  );
};

export default PageTitleSuccess;
