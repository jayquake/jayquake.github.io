import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const FormMismatchFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Form Mismatch"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "non compliant form", content: `<div id="form1">
  <input type="text" />
  <input type="password" />
  <input type="submit" />
</div>
<div id="form2">
  <input type="text" />
  <input type="password" />
  <input type="submit" />
</div>` }
      ]}
    />
  );
};

export default FormMismatchFailure;
