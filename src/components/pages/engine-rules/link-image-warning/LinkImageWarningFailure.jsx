import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const LinkImageWarningFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Link Image Warning"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "link image without warning", content: `<p>
  <a href="https://example.com/image.png" id="image-link">View Image</a>
</p>` }
      ]}
    />
  );
};

export default LinkImageWarningFailure;
