import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const LinkMailtoWarningFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Link Mailto Warning"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "link mailto without warning", content: `<p>
  <a href="mailto:someone@example.com" id="email-link">Send email</a>
</p>` }
      ]}
    />
  );
};

export default LinkMailtoWarningFailure;
