import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const DialogModalMisuseFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Dialog Modal Misuse"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "simple div role dialog modal", content: `<div role="dialog" aria-modal="true">Dialog</div>` }
      ]}
    />
  );
};

export default DialogModalMisuseFailure;
