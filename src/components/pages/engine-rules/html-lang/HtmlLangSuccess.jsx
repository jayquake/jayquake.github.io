import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const HtmlLangSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Html Lang"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "page with lang attribute", content: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>Page with lang attribute</title>
</head>
<body>
    <h1>Heading element</h1>
</body>
</html>` },
  { filename: "page with lang set from js api", content: `<!DOCTYPE html>
<html>
<head>
    <title>Page with lang set from JS API</title>
    <script>
        document.documentElement.lang = 'en';
    </script>
</head>
<body>
    <h1>Page with lang set from JS API</h1>
</body>
</html>` }
      ]}
    />
  );
};

export default HtmlLangSuccess;
