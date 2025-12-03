import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const DuplicateIdSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Duplicate Id"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "distinct id", content: `<h1 id="some-id">Heading element</h1>
<div id="some-id2">Heading element</div>` },
  { filename: "multiple elements no id", content: `<h1>Heading element</h1>
<div>Heading element</div>` }
      ]}
    />
  );
};

export default DuplicateIdSuccess;
