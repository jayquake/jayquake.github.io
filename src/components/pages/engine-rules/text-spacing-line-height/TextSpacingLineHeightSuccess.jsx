import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const TextSpacingLineHeightSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Text Spacing Line Height"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "font size to line height ratio of 1.5 nested element", content: `<div style="font-size:20px;" ><span style="line-height: 1.5;">Some content</span></div>` },
  { filename: "font size to line height ratio of 1.5", content: `<div style="font-size:20px;line-height: 1.5;" > Some content</div>` }
      ]}
    />
  );
};

export default TextSpacingLineHeightSuccess;
