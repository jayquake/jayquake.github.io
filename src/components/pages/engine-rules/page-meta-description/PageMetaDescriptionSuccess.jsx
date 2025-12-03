import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const PageMetaDescriptionSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Page Meta Description"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "page with meta description", content: `<html>
<head>
    <!-- mobile viewport meta tab -->
    <meta name="description" content="some description here" />
</head>
<body>
</body>
</html>` }
      ]}
    />
  );
};

export default PageMetaDescriptionSuccess;
