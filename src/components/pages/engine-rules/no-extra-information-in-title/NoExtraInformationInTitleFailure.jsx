import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const NoExtraInformationInTitleFailure = () => {
  const ruleId = "N/A";
  const title = `N/A`;
  const description = `N/A`;
  const helpText = `N/A`;
  const fixSteps = [
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
  ];
  const htmlExamples = [
  { filename: "h1 with srVisibleText does not contain title", content: `<h1 title="test attribute" class="test" aria-label="title 1">Title</h1>` },
  { filename: "img with title and alt", content: `<html>
  <head> </head>
  <body>
    <img alt="A beautiful beach with clear blue water" title="info" />
  </body>
</html>` },
  { filename: "input with title and aria label", content: `<html>
  <head> </head>
  <body>
    <input title="info" aria-label="Search" />
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

export default NoExtraInformationInTitleFailure;
