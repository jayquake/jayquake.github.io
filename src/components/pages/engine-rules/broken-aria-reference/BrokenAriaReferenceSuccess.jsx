import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const BrokenAriaReferenceSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Broken Aria Reference"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "input both valid aria labelledby and valid aria describedby", content: `<input aria-labelledby="label" aria-describedby="description" />
<div id="label">Some label</div>
<div id="description">Some label</div>` },
  { filename: "input with aria describedby and matching element", content: `<input aria-describedby="description" />
<div id="description">Some description</div>` },
  { filename: "input with aria labelledby and matching element", content: `<input aria-labelledby="label" />
<div id="label">Some label</div>` },
  { filename: "input without aria references", content: `<input aria-label="label" />` },
  { filename: "multiple inputs with labelledby and describedby with matching element", content: `<input id="describedby-by" aria-describedby="description" />
<div id="description">Some description</div>
<input id="labelled-by" aria-labelledby="label" />
<div id="label">Some label</div>` }
      ]}
    />
  );
};

export default BrokenAriaReferenceSuccess;
