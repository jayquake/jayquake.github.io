import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const HeadingH1Success = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Heading H1"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "single aria level 1", content: `<div role="heading" aria-level="1">Heading element</div>` },
  { filename: "single h1 single aria level 1", content: `<h1>Test</h1>
<div role="heading" aria-level="1">Heading element</div>` },
  { filename: "single h1 sr only", content: `<style>
    body {
        font-size: 16px;
        font-weight: 400;
    }
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
    }
</style>

<h1 class="sr-only">Heading element</h1>` },
  { filename: "single h1", content: `<h1>Heading element</h1>` },
  { filename: "single h2 aria level 1", content: `<h2 aria-level="1">Heading element</h2>` }
      ]}
    />
  );
};

export default HeadingH1Success;
