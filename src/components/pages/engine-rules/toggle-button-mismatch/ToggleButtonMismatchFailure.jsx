import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const ToggleButtonMismatchFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Toggle Button Mismatch"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "button toggle context  no aria pressed", content: `<button>Off</button>` },
  { filename: "toggle button without aria pressed attr", content: `<div role="button" style="cursor: pointer">On</div>` }
      ]}
    />
  );
};

export default ToggleButtonMismatchFailure;
