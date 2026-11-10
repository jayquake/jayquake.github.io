import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const AriaDescribedbyHasReferenceFailure = () => {
  const ruleId = "aria-describedby-has-reference";
  const title = `aria-describedby should reference a valid element id`;
  const description = `If an element’s aria-describedby attribute points to an id that does not exist or is not valid, assistive technologies will not convey the intended description, causing users to miss important context.`;
  const helpText = `Ensure aria-describedby references an existing, unique id on the page. Remove or update the attribute if the target element is missing or no longer relevant.`;
  const fixSteps = [
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
  ];
  const htmlExamples = [
  { filename: "input with aria describedby but no matching element id", content: `<input aria-describedby="description" />
<div id="description-bad-id">Some description</div>` },
  { filename: "input with aria describedby but no matching element", content: `<input aria-describedby="description" />` },
  { filename: "input with valid aria describedby and invalid aria labelledby", content: `<input aria-labelledby="label" aria-describedby="description" />
<div id="description-bad">Some description</div>` }
  ];

  return (
    <EngineIssueFailure
      ruleId={ruleId}
      title={title}
      description={description}
      helpText={helpText}
      fixSteps={fixSteps}
      htmlExamples={htmlExamples}
    />
  );
};

export default AriaDescribedbyHasReferenceFailure;
