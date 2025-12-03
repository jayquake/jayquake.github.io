import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const ToggleButtonMismatchSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Toggle Button Mismatch"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "native toggle button with aria pressed attribute", content: `<button aria-pressed="false">Off</button>` },
  { filename: "toggle button with aria pressed attribute", content: `<div aria-pressed="false" role="button" style="cursor: pointer">On</div>` }
      ]}
    />
  );
};

export default ToggleButtonMismatchSuccess;
