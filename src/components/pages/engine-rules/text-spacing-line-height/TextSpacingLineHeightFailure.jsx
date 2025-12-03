import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const TextSpacingLineHeightFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Text Spacing Line Height"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "font size to line height ratio of 1 nested element", content: `<div style="font-size:13px;" ><span style="line-height: 1;">Some content</span></div>` },
  { filename: "font size to line height ratio of 1", content: `<div style="font-size:13px;line-height: 1;" > Some content</div>` }
      ]}
    />
  );
};

export default TextSpacingLineHeightFailure;
