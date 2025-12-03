import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const AriaInvalidMismatchFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Aria Invalid Mismatch"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "input with aria invalid false", content: `<!-- Only interacted elements are audited, we can't test it using atomic tests currently. unit tests cover it -->
<input aria-invalid="false" />` },
  { filename: "select required no value", content: `<!-- Only interacted elements are audited, we can't test it using atomic tests currently. unit tests cover it -->
<select required>
    <option value="" disabled selected hidden>Select an option</option>
    <option>Option 1</option>
    <option>Option 2</option>
</select>` }
      ]}
    />
  );
};

export default AriaInvalidMismatchFailure;
