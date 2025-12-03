import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const StrongMismatchFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Strong Mismatch"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "b has direct text no element children", content: `<p style="margin-left: 20px">I would like to be notified by <b>email</b>, not other forms of communication.</p>` },
  { filename: "has direct text no element children font weight equal to 700", content: `<p style="margin-left: 20px">I would like to be notified by <span style="font-weight: 700">email</span>, not other forms of communication.</p>` },
  { filename: "has direct text no element children font weight greater than 700", content: `<p style="margin-left: 20px">I would like to be notified by <span style="font-weight: 900">email</span>, not other forms of communication.</p>` }
      ]}
    />
  );
};

export default StrongMismatchFailure;
