import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const LinkNavigationAmbiguousFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Link Navigation Ambiguous"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "link short content", content: `<a href="http://localhost/">Go</a>` },
  { filename: "link with ambiguous content and ambiguous aria label", content: `<a href="/homepage" aria-label="show more">click here</a>` },
  { filename: "link with ambiguous content", content: `<a href="/homepage">click here</a>` },
  { filename: "link with image content with ambiguous alt", content: `<a href="/homepage"><img alt="click here" /></a>` },
  { filename: "link with numeric characters only", content: `<a href="http://localhost/" aria-label="123 12">1234 5</a>` },
  { filename: "link with special characters only", content: `<a href="http://localhost/" aria-label="---">?!?!?!</a>` }
      ]}
    />
  );
};

export default LinkNavigationAmbiguousFailure;
