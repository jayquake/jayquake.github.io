import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const ImageMismatchFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Image Mismatch"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "div with background image", content: `<div style="background: url('https://www.example.com/image.jpg'); width: 100px; height: 100px;"></div>` },
  { filename: "img role other", content: `<img role="table" src="https://www.example.com/image.jpg" alt="Example Image" />` },
  { filename: "picture role other with nested img", content: `<picture>
    <source srcset="https://www.example.com/image.webp" type="image/webp">
    <img role="table" src="https://www.example.com/image.jpg" alt="Example Image">
</picture>` }
      ]}
    />
  );
};

export default ImageMismatchFailure;
