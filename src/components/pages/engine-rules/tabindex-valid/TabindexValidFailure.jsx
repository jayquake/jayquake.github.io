import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const TabindexValidFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Tabindex Valid"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "div with tabindex  2", content: `<div tabindex="-2">Heading element</div>` },
  { filename: "div with tabindex 2", content: `<div tabindex="2">Heading element</div>` }
      ]}
    />
  );
};

export default TabindexValidFailure;
