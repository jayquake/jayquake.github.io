import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const PageMetaViewportValidSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Page Meta Viewport Valid"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "meta viewport content with maximum scale equal to 2", content: `<html>
  <head>
    <!-- mobile viewport meta tab -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=2" />
  </head>
  <body></body>
</html>` },
  { filename: "meta viewport content with maximum scale greater than 2", content: `<html>
  <head>
    <!-- mobile viewport meta tab -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=3" />
  </head>
  <body></body>
</html>` },
  { filename: "meta with valid value", content: `<html>
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

export default PageMetaViewportValidSuccess;
