import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const ButtonMismatchFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Button Mismatch"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "button like link href javascript", content: `<a href="javascript: console.log()"></a>` },
  { filename: "link with role button", content: `<a href="#anchor" role="button"></a>` }
      ]}
    />
  );
};

export default ButtonMismatchFailure;
