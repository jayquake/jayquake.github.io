import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const RegionMainContentSingleFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Region Main Content Single"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "multiple visible elements with role main", content: `<div role="main">Some main content</div>
<div role="main" id="redundant-1">Some main content</div>
<div role="main" id="redundant-2">Some main content</div>` },
  { filename: "multiple visible main elements and role main", content: `<main>Main content</main>
<div role="main" id="redundant-1">Some main content</div>
<main id="redundant-2">Some main content</main>` },
  { filename: "multiple visible main elements", content: `<main>Main content</main>
<main id="redundant-1">Main content</main>
<main id="redundant-2">Main content</main>` }
      ]}
    />
  );
};

export default RegionMainContentSingleFailure;
