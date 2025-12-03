import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const NoAutofocusSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="No Autofocus"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "button no auto focus", content: `<label for="my-button">Clickable Download Link</label>
<button id="my-button"></button>` },
  { filename: "div no auto focus", content: `<div id="my-div"></div>` },
  { filename: "svg with auto focus", content: `<svg autofocus></svg>` }
      ]}
    />
  );
};

export default NoAutofocusSuccess;
