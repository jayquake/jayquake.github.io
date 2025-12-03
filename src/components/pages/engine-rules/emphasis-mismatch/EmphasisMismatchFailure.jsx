import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const EmphasisMismatchFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Emphasis Mismatch"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "has direct text no element children font style italic", content: `<p style="margin-left: 20px">His favorite book is <span style="font-style: italic">The Grapes of Wrath</span>.</p>` },
  { filename: "i has direct text no element children", content: `<p style="margin-left: 20px">His favorite book is <i>The Grapes of Wrath</i>.</p>` }
      ]}
    />
  );
};

export default EmphasisMismatchFailure;
