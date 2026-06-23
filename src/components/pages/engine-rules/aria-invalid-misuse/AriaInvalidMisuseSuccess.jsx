import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const AriaInvalidMisuseSuccess = () => {
  const ruleId = "aria-invalid-misuse";
  const title = `Only input fields with validation errors should be assigned aria-invalid="true"`;
  const description = `Using aria-invalid="true" on an input field that does not have errors may cause confusion for users who rely on assistive technology, who may try to correct their already valid response.`;
  const helpText = `To make sure that screen reader users can accurately identify form fields with invalid input, set aria-invalid="true" only on input fields that have errors. Remove the attribute once the value becomes valid.`;
  const bestPractices = [
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
  ];
  const htmlExamples = [
  { filename: "input aria invalid false", content: `<input aria-invalid="false" aria-describedby="description" />
<div id="description">Some description</div>` },
  { filename: "input no aria invalid attribute", content: `<input aria-describedby="description" />
<div id="description">Some description</div>` }
  ];

  return (
    <EngineIssueSuccess
      ruleId={ruleId}
      title={title}
      description={description}
      helpText={helpText}
      bestPractices={bestPractices}
      htmlExamples={htmlExamples}
    />
  );
};

export default AriaInvalidMisuseSuccess;
