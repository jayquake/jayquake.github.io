import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const SkipLinkExistsFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Skip Link Exists"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "page without skip link", content: `<main id="main"></main>` }
      ]}
    />
  );
};

export default SkipLinkExistsFailure;
