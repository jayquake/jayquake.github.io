import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const LinkNewWindowWarningFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Link New Window Warning"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "link blank no new window in content", content: `<a href="path/to/page" target="_blank">Link to somewhere</a>` },
  { filename: "link with no content", content: `<a href="path/to/page" target="_blank"></a>` }
      ]}
    />
  );
};

export default LinkNewWindowWarningFailure;
