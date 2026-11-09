import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const AriaInvalidMismatchFailure = () => {
  const ruleId = "aria-invalid-mismatch";
  const title = `Form fields should indicate validation errors to assistive technology`;
  const description = `Validation errors in forms must be exposed in a way that assistive technologies can detect and announce them, ensuring users who rely on assistive technology can identify and correct mistakes.`;
  const helpText = `To make sure that screen reader users are aware of form fields with invalid input, set aria-invalid="true". Remove the attribute once the value becomes valid.`;
  const fixSteps = [
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
  ];
  const htmlExamples = [
  { filename: "input with aria invalid false", content: `<!-- Only interacted elements are audited, we can't test it using atomic tests currently. unit tests cover it -->
<input aria-invalid="false" />` },
  { filename: "select required no value", content: `<!-- Only interacted elements are audited, we can't test it using atomic tests currently. unit tests cover it -->
<select required>
    <option value="" disabled selected hidden>Select an option</option>
    <option>Option 1</option>
    <option>Option 2</option>
</select>` }
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

export default AriaInvalidMismatchFailure;
