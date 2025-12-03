import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const HeadingSingleH1Success = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Heading Single H1"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "no h1", content: `<div></div>` },
  { filename: "single aria level 1", content: `<div role="heading" aria-level="1">Heading element</div>` },
  { filename: "single h1", content: `<h1>Heading element</h1>` },
  { filename: "two h1 one with aria level 2", content: `<h1>Heading element</h1>
<h1 aria-level="2">Heading element</h1>` }
      ]}
    />
  );
};

export default HeadingSingleH1Success;
