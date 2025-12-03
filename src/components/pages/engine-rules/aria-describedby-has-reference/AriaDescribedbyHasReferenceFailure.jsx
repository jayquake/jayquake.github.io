import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const AriaDescribedbyHasReferenceFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Aria Describedby Has Reference"
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
  { filename: "input with valid aria describedby and invalid aria labelledby", content: `<input aria-labelledby="label" aria-describedby="description" />
<div id="description-bad">Some description</div>` }
      ]}
    />
  );
};

export default AriaDescribedbyHasReferenceFailure;
