import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const TabbableNonInteractiveFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Tabbable Non Interactive"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "non interactive element with tabindex", content: `<div tabindex="0">
  <span>Not Interactive</span>
</div>` }
      ]}
    />
  );
};

export default TabbableNonInteractiveFailure;
