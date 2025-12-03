import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const NoAutofocusFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="No Autofocus"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "button with auto focus", content: `<button autofocus></button>` },
  { filename: "div with auto focus", content: `<div autofocus></div>` }
      ]}
    />
  );
};

export default NoAutofocusFailure;
