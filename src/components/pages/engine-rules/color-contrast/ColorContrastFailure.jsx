import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const ColorContrastFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Color Contrast"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "div with background black and color black", content: `<div style="background-color: black; color: black">Content</div>` },
  { filename: "div with background transparent and color white and parent transparent", content: `<div style="background-color: transparent">
  <div id="test-subject" style="background-color: transparent; color: white">Content</div>
</div>` },
  { filename: "div with background transparent and color white", content: `<div style="background-color: transparent; color: white">Content</div>` },
  { filename: "div with background white and color white", content: `<div style="background-color: white; color: white">Content</div>` },
  { filename: "div with font size 16px with ratio 3.5", content: `<div style="font-size: 16px; color: #000000; background-color: #C80909;">Text Contrast Ratio 3.49:1</div>` }
      ]}
    />
  );
};

export default ColorContrastFailure;
