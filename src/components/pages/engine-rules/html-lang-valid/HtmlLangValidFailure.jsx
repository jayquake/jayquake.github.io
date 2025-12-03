import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const HtmlLangValidFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Html Lang Valid"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "page no lang attribute", content: `<!DOCTYPE html>
<html>
<head>
    <title>Page with no lang attribute</title>
</head>
<body>
    <h1>Heading element</h1>
</body>
</html>` },
  { filename: "page with invalid value 1", content: `<!DOCTYPE html>
<html lang="de--1901">
<head>
    <title>Page with language and variant</title>
</head>
<body>
    <h1>Page with language and variant</h1>

</body>
</html>` },
  { filename: "page with invalid value 2", content: `<!DOCTYPE html>
<html lang="deasd-1901">
<head>
    <title>Page with language and variant</title>
</head>
<body>
    <h1>Page with language and variant</h1>

</body>
</html>` },
  { filename: "page with invalid value 3", content: `<!DOCTYPE html>
<html lang="de-uk-gb">
<head>
    <title>Page with language and variant</title>
</head>
<body>
    <h1>Page with language and variant</h1>

</body>
</html>` }
      ]}
    />
  );
};

export default HtmlLangValidFailure;
