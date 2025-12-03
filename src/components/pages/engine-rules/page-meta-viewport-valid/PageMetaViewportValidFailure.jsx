import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const PageMetaViewportValidFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Page Meta Viewport Valid"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "meta no content", content: `<html>
<head>
    <meta name="viewport" >
</head>
<body>
</body>
</html>` },
  { filename: "meta viewport content is empty string", content: `<html>
  <head>
    <!-- mobile viewport meta tab -->
    <meta name="viewport" content="" />
  </head>
  <body></body>
</html>` },
  { filename: "meta viewport content with maximum scale less than 2", content: `<html>
  <head>
    <!-- mobile viewport meta tab -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.5" />
  </head>
  <body></body>
</html>` },
  { filename: "meta viewport content with user scalable no", content: `<html>
  <head>
    <!-- mobile viewport meta tab -->
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
  </head>
  <body></body>
</html>` }
      ]}
    />
  );
};

export default PageMetaViewportValidFailure;
