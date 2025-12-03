import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const AriaInvalidMismatchSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Aria Invalid Mismatch"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "textarea required has value", content: `<!-- Only interacted elements are audited, we can't test it using atomic tests currently. unit tests cover it -->
<textarea required>filled</textarea>` }
      ]}
    />
  );
};

export default AriaInvalidMismatchSuccess;
