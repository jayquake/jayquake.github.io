import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const HeadingH1Failure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Heading H1"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "no h1 no aria level 1", content: `<span>Not header</span>` }
      ]}
    />
  );
};

export default HeadingH1Failure;
