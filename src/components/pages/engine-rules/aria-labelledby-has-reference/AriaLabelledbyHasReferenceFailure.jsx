import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const AriaLabelledbyHasReferenceFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Aria Labelledby Has Reference"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "input with aria labelledby but no matching element id", content: `<input aria-labelledby="label" />
<div id="label-bad-id">Some label</div>` },
  { filename: "input with aria labelledby but no matching element", content: `<input aria-labelledby="label" />` },
  { filename: "multiple inputs with labelledby but no fitting element", content: `<input id="labelled-by" aria-labelledby="labelled-2" />
<div id="label-bad-id-1">Some label</div>
<input id="labelled-by-2" aria-labelledby="label" />
<div id="label-bad-id">Some label</div>` }
      ]}
    />
  );
};

export default AriaLabelledbyHasReferenceFailure;
