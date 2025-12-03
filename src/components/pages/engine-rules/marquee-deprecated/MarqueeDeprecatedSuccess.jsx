import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const MarqueeDeprecatedSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Marquee Deprecated"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "page no marquee", content: `<h1>Heading</h1>
<input type="text">
<button></button>` }
      ]}
    />
  );
};

export default MarqueeDeprecatedSuccess;
