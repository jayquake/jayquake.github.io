import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const LinkPdfWarningFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Link Pdf Warning"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "link pdf without warning", content: `<p>
  <a href="some-file.pdf" id="email-link">Open</a>
</p>` }
      ]}
    />
  );
};

export default LinkPdfWarningFailure;
