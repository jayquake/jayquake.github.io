import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const BrokenAriaReferenceFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Broken Aria Reference"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "input with aria describedby but no matching element id", content: `<input aria-describedby="description" />
<div id="description-bad-id">Some description</div>` },
  { filename: "input with aria describedby but no matching element", content: `<input aria-describedby="description" />` },
  { filename: "input with aria labelledby but no matching element id", content: `<input aria-labelledby="label" />
<div id="label-bad-id">Some label</div>` },
  { filename: "input with aria labelledby but no matching element", content: `<input aria-labelledby="label" />` },
  { filename: "input with valid aria describedby and invalid aria labelledby", content: `<input aria-labelledby="label" aria-describedby="description" />
<div id="label-bad">Some label</div>
<div id="description">Some label</div>` },
  { filename: "input with valid aria labelledby and invalid aria describedby", content: `<input aria-labelledby="label" aria-describedby="description" />
<div id="label">Some label</div>
<div id="description-bad">Some label</div>` },
  { filename: "multiple inputs with labelledby and describedby but no fitting element", content: `<input id="describedby-by" aria-describedby="description" />
<div id="description-bad-id">Some description</div>
<input id="labelled-by" aria-labelledby="label" />
<div id="label-bad-id">Some label</div>` }
      ]}
    />
  );
};

export default BrokenAriaReferenceFailure;
