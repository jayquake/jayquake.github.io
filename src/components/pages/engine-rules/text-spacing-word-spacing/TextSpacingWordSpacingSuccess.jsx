import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const TextSpacingWordSpacingSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Text Spacing Word Spacing"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "font size to word spacing ratio of 0.2 nested element", content: `<div style="font-size:20px;" ><span style="word-spacing: 4px;">Some content</span></div>` },
  { filename: "font size to word spacing ratio of 0.2", content: `<div style="font-size:20px;word-spacing: 4px;" > Some content</div>` }
      ]}
    />
  );
};

export default TextSpacingWordSpacingSuccess;
