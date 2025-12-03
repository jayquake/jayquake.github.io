import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const NoExtraInformationInTitleFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="No Extra Information In Title"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
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
</html>` },
  { filename: "title has content no children", content: `<html>
  <head> </head>
  <body>
    <div title="info"></div>
  </body>
</html>` },
  { filename: "title has content with children", content: `<html>
  <head> </head>
  <body>
    <div title="info">
      <div>Hi 1</div>
      <div>Hi 2</div>
    </div>
  </body>
</html>` }
      ]}
    />
  );
};

export default NoExtraInformationInTitleFailure;
