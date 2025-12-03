import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const RegionMainContentFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Region Main Content"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "aria hidden single main element", content: `<main aria-hidden="true">Main content</main>` },
  { filename: "display none single main element", content: `<main style="display: none">Main content</main>` },
  { filename: "non visible multiple main elements", content: `<div role="main" style="display: none">Some main content</div>
<div role="main" id="redundant-1" aria-hidden="true">Some main content</div>
<div role="main" id="redundant-2" style="visibility: hidden">Some main content</div>` },
  { filename: "single element without indication of being main", content: `<div>Main content</div>` },
  { filename: "visibility hidden single main element", content: `<main style="visibility: hidden">Main content</main>` }
      ]}
    />
  );
};

export default RegionMainContentFailure;
