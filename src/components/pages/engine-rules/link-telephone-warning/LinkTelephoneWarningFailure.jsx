import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const LinkTelephoneWarningFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Link Telephone Warning"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "link tel without warning", content: `<p>
  <a href="tel:0000000001">Call</a>
</p>` }
      ]}
    />
  );
};

export default LinkTelephoneWarningFailure;
