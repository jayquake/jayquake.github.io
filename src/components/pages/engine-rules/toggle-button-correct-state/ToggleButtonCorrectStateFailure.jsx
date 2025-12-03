import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const ToggleButtonCorrectStateFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Toggle Button Correct State"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "button toggle context  no aria pressed", content: `<button aria-pressed="">Off</button>` },
  { filename: "button toggle context  wrong aria pressed", content: `<button aria-pressed="true">Off</button>` }
      ]}
    />
  );
};

export default ToggleButtonCorrectStateFailure;
