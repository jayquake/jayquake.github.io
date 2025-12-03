import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const LinkHomepageWarningFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Link Homepage Warning"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "link homepage without warning", content: `<p>
  <a href="/" id="homepage-link">link to page...</a>
</p>` }
      ]}
    />
  );
};

export default LinkHomepageWarningFailure;
