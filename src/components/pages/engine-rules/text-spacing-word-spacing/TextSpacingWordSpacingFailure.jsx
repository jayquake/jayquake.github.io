import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const TextSpacingWordSpacingFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Text Spacing Word Spacing"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "font size to word spacing ratio of 0.1 nested element", content: `<div style="font-size:10px;" ><span style="word-spacing: 1px;">Some content</span></div>` },
  { filename: "font size to word spacing ratio of 0.1", content: `<div style="font-size:10px;word-spacing: 1px;" > Some content</div>` }
      ]}
    />
  );
};

export default TextSpacingWordSpacingFailure;
