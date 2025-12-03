import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const AriaInvalidMisuseFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Aria Invalid Misuse"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "input with aria invalid grammar", content: `<input aria-invalid="grammar" aria-describedby="description" />
<div id="description">Some description</div>` },
  { filename: "input with aria invalid spelling", content: `<input aria-invalid="spelling" aria-describedby="description" />
<div id="description">Some description</div>` },
  { filename: "input with aria invalid true", content: `<input aria-invalid="true" aria-describedby="description" />
<div id="description">Some description</div>` },
  { filename: "input with empty aria invalid", content: `<input aria-invalid aria-describedby="description" />
<div id="description">Some description</div>` }
      ]}
    />
  );
};

export default AriaInvalidMisuseFailure;
