import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const PixelImageNotDiscernibleFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Pixel Image Not Discernible"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "pixel image 1x1", content: `<img src="https://example.com/tracker.png" width="1" height="1" alt="in case there is an alt, empty alt will make it pass" />` }
      ]}
    />
  );
};

export default PixelImageNotDiscernibleFailure;
