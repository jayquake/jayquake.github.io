import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const TabindexValidSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Tabindex Valid"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "div with tabindex  1", content: `<div tabindex="-1">Heading element</div>` },
  { filename: "div with tabindex 0", content: `<div tabindex="0">Heading element</div>` },
  { filename: "svg with tabindex 6", content: `<svg xmlns="http://www.w3.org/2000/svg" tabindex="6">
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>` }
      ]}
    />
  );
};

export default TabindexValidSuccess;
