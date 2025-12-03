import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const HeadingDiscernibleFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Heading Discernible"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "empty heading", content: `<h4 class="f-agent__info-subtitle"></h4>` },
  { filename: "heading wtih image content and no aria label", content: `<h1><img src="path/to/graphic/cotnent" /></h1>` },
  { filename: "link no content", content: `<h1 style="width:100px;height:100px;"></h1>` }
      ]}
    />
  );
};

export default HeadingDiscernibleFailure;
