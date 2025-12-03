import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const LinkContextFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Link Context"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "a with icon but no text", content: `<a href="/home"><img src="/icon-home.png" /></a>` },
  { filename: "a with only numeric content", content: `<a href="/home" aria-label="123 12">1234 5</a>` },
  { filename: "a with only symbols content", content: `<a href="/home" aria-label="---">?!?!?!</a>` },
  { filename: "a with too short text", content: `<a href="/home">Go</a>` },
  { filename: "a without any text", content: `<a href="/home"></a>` }
      ]}
    />
  );
};

export default LinkContextFailure;
