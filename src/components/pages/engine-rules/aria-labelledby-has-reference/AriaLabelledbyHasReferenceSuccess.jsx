import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const AriaLabelledbyHasReferenceSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Aria Labelledby Has Reference"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "input with aria labelledby and matching element", content: `<input aria-labelledby="label" />
<div id="label">Some label</div>` },
  { filename: "input without aria references", content: `<input aria-label="label" />` },
  { filename: "multiple inputs with labelledby and with matching element", content: `<input id="labelled-by" aria-labelledby="description" />
<div id="description">Some label</div>
<input id="labelled-by-1" aria-labelledby="label" />
<div id="label">Some label</div>` }
      ]}
    />
  );
};

export default AriaLabelledbyHasReferenceSuccess;
