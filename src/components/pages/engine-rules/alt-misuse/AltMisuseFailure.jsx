import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const AltMisuseFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Alt Misuse"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "div with alt", content: `<div alt="this div is remarkable, you should know this"></div>` },
  { filename: "div with role img and alt", content: `<div role-="image" alt="this div is remarkable, you should know this"></div>` }
      ]}
    />
  );
};

export default AltMisuseFailure;
