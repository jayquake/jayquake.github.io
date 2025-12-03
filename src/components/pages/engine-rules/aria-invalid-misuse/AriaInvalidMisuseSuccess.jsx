import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const AriaInvalidMisuseSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Aria Invalid Misuse"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "input aria invalid false", content: `<input aria-invalid="false" aria-describedby="description" />
<div id="description">Some description</div>` },
  { filename: "input no aria invalid attribute", content: `<input aria-describedby="description" />
<div id="description">Some description</div>` }
      ]}
    />
  );
};

export default AriaInvalidMisuseSuccess;
