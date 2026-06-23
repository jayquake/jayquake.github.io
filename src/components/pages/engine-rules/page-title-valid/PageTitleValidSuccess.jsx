import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const PageTitleValidSuccess = () => {
  const ruleId = "page-title-valid";
  const title = `Page title should be descriptive`;
  const description = `Screen readers rely heavily on page titles to announce the purpose of a page. If titles aren’t descriptive, users with low or no vision may not understand the context until they start navigating the page.`;
  const helpText = `Make sure the title element inside the <head> is unique and describes the purpose of the page.`;
  const bestPractices = [
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
  ];
  const htmlExamples = [
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
  ];

  return (
    <EngineIssueSuccess
      ruleId={ruleId}
      title={title}
      description={description}
      helpText={helpText}
      bestPractices={bestPractices}
      htmlExamples={htmlExamples}
    />
  );
};

export default PageTitleValidSuccess;
