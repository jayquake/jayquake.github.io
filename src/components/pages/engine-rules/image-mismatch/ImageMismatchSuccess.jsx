import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const ImageMismatchSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Image Mismatch"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "div with background image", content: `<div role="img" style="background: url('https://www.example.com/image.jpg'); width: 100px; height: 100px;"></div>` },
  { filename: "img", content: `<img src="https://www.example.com/image.jpg" alt="Example Image" />` },
  { filename: "picture with nested img", content: `<picture>
    <source srcset="https://www.example.com/image.webp" type="image/webp">
    <img src="https://www.example.com/image.jpg" alt="Example Image">
</picture>` },
  { filename: "svg", content: `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>` }
      ]}
    />
  );
};

export default ImageMismatchSuccess;
