import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const LetterSpacingPositiveSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Letter Spacing Positive"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "negative letter spacing", content: `<div style="font-size:12px;letter-spacing: -1px;" > Some content</div>` },
  { filename: "normal letter spacing", content: `<div style="font-size:12px;" ><span style="letter-spacing: normal;">Some content</span></div>` },
  { filename: "positive letter spacing", content: `<div style="font-size:12px;" ><span style="letter-spacing: 2px;">Some content</span></div>` }
      ]}
    />
  );
};

export default LetterSpacingPositiveSuccess;
