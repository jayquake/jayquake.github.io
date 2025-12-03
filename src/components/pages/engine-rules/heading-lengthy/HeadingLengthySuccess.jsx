import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const HeadingLengthySuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Heading Lengthy"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "h1 with less than 160 chars", content: `<h1>As twilight embraces the horizon, a lone figure stands atop a hill, gazing at the stars, contemplating the mysteries of the universe and our place in</h1>` },
  { filename: "h1 with more than 160 chars due to double spaces and trimmable ends", content: `<h1>   As  twilight            embraces the horizon, a lone figure stands atop a hill, gazing at the stars, contemplating the mysteries of the universe and our place in</h1>` },
  { filename: "h4 with less than 160 chars", content: `<h4>As twilight embraces the horizon, a lone figure stands atop a hill, gazing at the stars, contemplating the mysteries of the universe and our place in</h4>` }
      ]}
    />
  );
};

export default HeadingLengthySuccess;
