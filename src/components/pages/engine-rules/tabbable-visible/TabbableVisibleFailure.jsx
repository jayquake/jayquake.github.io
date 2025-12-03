import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const TabbableVisibleFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Tabbable Visible"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "hidden dimensions tabbable element", content: `<div style="height: 1px; width: 1px; overflow: hidden;">
  <input type="text" />
  <button>Click</button>
</div>` },
  { filename: "no content tabbable", content: `<div tabindex="0">
  <span></span>
</div>` },
  { filename: "opacity zero tabbable element", content: `<div style="opacity: 0">
  <input type="text" />
  <button>Click</button>
</div>` },
  { filename: "out of viewport tabbable element", content: `<div style="position: absolute; left: -500px;">
  <input type="text" />
</div>` }
      ]}
    />
  );
};

export default TabbableVisibleFailure;
