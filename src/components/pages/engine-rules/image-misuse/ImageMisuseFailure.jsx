import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const ImageMisuseFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Image Misuse"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "canvas", content: `<canvas role="img" width="100" height="100"></canvas>` },
  { filename: "div with role image", content: `<div role="img" style="width: 100px; height: 100px;"></div>` },
  { filename: "div_with_background_image_with_visibile_content", content: `<div role="img" style="background-image: url('https://www.example.com/image.jpg'); width: 100px; height: 100px;">
    Some content here
</div>` },
  { filename: "svg", content: `<svg role="img" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>` }
      ]}
    />
  );
};

export default ImageMisuseFailure;
