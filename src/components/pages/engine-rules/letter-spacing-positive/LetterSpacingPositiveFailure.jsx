import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const LetterSpacingPositiveFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Letter Spacing Positive"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "lower than minus one", content: `<div style="font-size:13px;letter-spacing: -1.5px;" > Some content</div>` },
  { filename: "nested lower than minus one", content: `<div style="font-size:13px;" ><span style="letter-spacing: -1.1px;">Some content</span></div>` }
      ]}
    />
  );
};

export default LetterSpacingPositiveFailure;
