import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const DuplicateIdFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Duplicate Id"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "multuple same id", content: `<h1 id="some-id">Heading element</h1>
<div id="some-id">Heading element</div>` }
      ]}
    />
  );
};

export default DuplicateIdFailure;
