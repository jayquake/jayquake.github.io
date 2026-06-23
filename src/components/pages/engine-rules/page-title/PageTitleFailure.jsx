import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const PageTitleFailure = () => {
  const ruleId = "page-title";
  const title = `Page should have a title`;
  const description = `A missing page title makes it difficult for screen reader users and sighted users with multiple tabs open to identify the page, reducing orientation and usability.`;
  const helpText = `Make sure each page has a unique, descriptive <title> element inside the <head> that reflects the purpose of the page.`;
  const fixSteps = [
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
  ];
  const htmlExamples = [
  { filename: "page no title element", content: `<html>
<head>
</head>
<body>
</body>
</html>` }
  ];

  return (
    <EngineIssueFailure
      ruleId={ruleId}
      title={title}
      description={description}
      helpText={helpText}
      fixSteps={fixSteps}
      htmlExamples={htmlExamples}
    />
  );
};

export default PageTitleFailure;
