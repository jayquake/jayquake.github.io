import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const RegionMainContentSingleSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Region Main Content Single"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "single element with role main", content: `<div role="main">Some main content</div>` },
  { filename: "single main element", content: `<main>Some main content</main>` },
  { filename: "two elements with role main one is display none", content: `<div role="main">Some main content</div>
<div role="main" style="display: none">Some main content</div>` },
  { filename: "two elements with role main one is visibility hidden", content: `<div role="main">Some main content</div>
<div role="main" style="visibility: hidden">Some main content</div>` },
  { filename: "two main elements one is display none", content: `<main>Some main content</main>
<main style="display: none">Some main content</main>` },
  { filename: "two main elements one is visibility hidden", content: `<main>Some main content</main>
<main style="visibility: hidden">Some main content</main>` }
      ]}
    />
  );
};

export default RegionMainContentSingleSuccess;
