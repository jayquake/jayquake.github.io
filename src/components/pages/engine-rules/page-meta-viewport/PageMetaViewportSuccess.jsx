import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const PageMetaViewportSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Page Meta Viewport"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "page with meta", content: `<html>
<head>
    <!-- mobile viewport meta tab -->
    <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body>
</body>
</html>` }
      ]}
    />
  );
};

export default PageMetaViewportSuccess;
