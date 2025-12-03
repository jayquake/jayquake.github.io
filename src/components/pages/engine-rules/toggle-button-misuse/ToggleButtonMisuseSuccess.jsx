import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const ToggleButtonMisuseSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Toggle Button Misuse"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "button toggle class context  aria pressed", content: `<button class="active" aria-pressed="true">ksmdfsd</button>` },
  { filename: "button toggle context  aria pressed", content: `<button aria-pressed="false">Off</button>` }
      ]}
    />
  );
};

export default ToggleButtonMisuseSuccess;
