import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const RegionMainContentSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Region Main Content"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "multiple elements with role main", content: `<div role="main" id="first">Some main content</div>
<div role="main" id="second">Some main content</div>
<div role="main" id="third">Some main content</div>` },
  { filename: "multiple main elements and role main", content: `<main id="first">Main content</main>
<div role="main" id="second">Some main content</div>
<div role="main" id="third">Some main content</div>` },
  { filename: "multiple main elements", content: `<main id="first">Some main content</main>
<main id="second">Some main content</main>
<main id="third">Some main content</main>` },
  { filename: "single element with role main", content: `<div role="main">Some main content</div>` },
  { filename: "single main element", content: `<main>Some main content</main>` }
      ]}
    />
  );
};

export default RegionMainContentSuccess;
