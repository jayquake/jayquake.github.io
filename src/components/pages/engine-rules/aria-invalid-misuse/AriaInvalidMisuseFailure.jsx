import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const AriaInvalidMisuseFailure = () => {
  const ruleId = "aria-invalid-misuse";
  const title = `Only input fields with validation errors should be assigned aria-invalid="true"`;
  const description = `Using aria-invalid="true" on an input field that does not have errors may cause confusion for users who rely on assistive technology, who may try to correct their already valid response.`;
  const helpText = `To make sure that screen reader users can accurately identify form fields with invalid input, set aria-invalid="true" only on input fields that have errors. Remove the attribute once the value becomes valid.`;
  const fixSteps = [
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
  ];
  const htmlExamples = [
  { filename: "input with aria invalid grammar", content: `<input aria-invalid="grammar" aria-describedby="description" />
<div id="description">Some description</div>` },
  { filename: "input with aria invalid spelling", content: `<input aria-invalid="spelling" aria-describedby="description" />
<div id="description">Some description</div>` },
  { filename: "input with aria invalid true", content: `<input aria-invalid="true" aria-describedby="description" />
<div id="description">Some description</div>` },
  { filename: "input with empty aria invalid", content: `<input aria-invalid aria-describedby="description" />
<div id="description">Some description</div>` }
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

export default AriaInvalidMisuseFailure;
