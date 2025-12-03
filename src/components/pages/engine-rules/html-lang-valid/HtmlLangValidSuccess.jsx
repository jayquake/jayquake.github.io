import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const HtmlLangValidSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Html Lang Valid"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "page with language and region", content: `<!DOCTYPE html>
<html lang="en-US">
<head>
    <title>Page with language, script and region</title>
</head>
<body>
    <h1>Page with language, script and region</h1>

</body>
</html>` },
  { filename: "page with language and script and region and variant", content: `<!DOCTYPE html>
<html lang="de-Latn-DE-1996">
<head>
    <title>Page with language, script, region and variant</title>
</head>
<body>
    <h1>Page with language, script, region and variant</h1>

</body>
</html>` },
  { filename: "page with language and script and region", content: `<!DOCTYPE html>
<html lang="sr-Latn-RS">
<head>
    <title>Page with language, script and region</title>
</head>
<body>
    <h1>Page with language, script and region</h1>

</body>
</html>` },
  { filename: "page with language and script", content: `<!DOCTYPE html>
<html lang="zh-Hans">
<head>
    <title>Page with language and script</title>
</head>
<body>
    <h1>Page with language and script</h1>

</body>
</html>` },
  { filename: "page with language and variant", content: `<!DOCTYPE html>
<html lang="de-1901">
<head>
    <title>Page with language and variant</title>
</head>
<body>
    <h1>Page with language and variant</h1>

</body>
</html>` },
  { filename: "page with language only", content: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>Page with language only</title>
</head>
<body>
    <h1>Page with language only</h1>
</body>
</html>` }
      ]}
    />
  );
};

export default HtmlLangValidSuccess;
