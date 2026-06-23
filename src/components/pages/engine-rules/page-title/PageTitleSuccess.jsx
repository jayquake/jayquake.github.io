import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const PageTitleSuccess = () => {
  const ruleId = "page-title";
  const title = `Page should have a title`;
  const description = `A missing page title makes it difficult for screen reader users and sighted users with multiple tabs open to identify the page, reducing orientation and usability.`;
  const helpText = `Make sure each page has a unique, descriptive <title> element inside the <head> that reflects the purpose of the page.`;
  const bestPractices = [
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
  ];
  const htmlExamples = [
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

export default PageTitleSuccess;
