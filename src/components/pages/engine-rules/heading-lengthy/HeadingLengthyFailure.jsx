import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const HeadingLengthyFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Heading Lengthy"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "h1 with more than 160 chars", content: `<h1>As twilight embraces the horizon, a lone figure stands atop a hill, gazing at the stars, contemplating the mysteries of the universe and our place in it. further away he goes.</h1>` },
  { filename: "h4 with more than 160 chars", content: `<h4>As twilight embraces the horizon, a lone figure stands atop a hill, gazing at the stars, contemplating the mysteries of the universe and our place in it. further away he goes.</h4>` }
      ]}
    />
  );
};

export default HeadingLengthyFailure;
