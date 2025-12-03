import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const AriaDescribedbyHasReferenceSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Aria Describedby Has Reference"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "input with aria describedby and matching element", content: `<input aria-describedby="description" />
<div id="description">Some description</div>` },
  { filename: "input without aria references", content: `<input aria-label="label" />` },
  { filename: "multiple inputs with labelledby and describedby with matching element", content: `<input id="describedby-by" aria-describedby="description" />
<div id="description">Some description</div>
<input id="describedby-by-2" aria-describedby="description-2" />
<div id="description-2">Some description</div>` }
      ]}
    />
  );
};

export default AriaDescribedbyHasReferenceSuccess;
