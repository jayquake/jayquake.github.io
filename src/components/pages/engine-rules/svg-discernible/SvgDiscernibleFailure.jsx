import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const SvgDiscernibleFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Svg Discernible"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "svg", content: `<svg style="width:100px;height:100px;" >
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>` }
      ]}
    />
  );
};

export default SvgDiscernibleFailure;
