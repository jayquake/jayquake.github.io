import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const MarqueeDeprecatedFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Marquee Deprecated"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "page with marquee", content: `<h1>Heading</h1>
<input type="text">
<marquee>Some moving content</marquee>
<button></button>` }
      ]}
    />
  );
};

export default MarqueeDeprecatedFailure;
