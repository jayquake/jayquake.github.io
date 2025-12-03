import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const FormSubmitButtonMismatchFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Form Submit Button Mismatch"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "form with button not calssified as submit", content: `<form>
  <input type="text" />
  <input type="password" />
  <button>Other button</button>
</form>` },
  { filename: "form with perceivable submit button", content: `<form>
  <input type="text" required />
  <span style="cursor: pointer">go</span>
</form>` }
      ]}
    />
  );
};

export default FormSubmitButtonMismatchFailure;
