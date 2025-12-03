import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const ImageDiscernibleFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Image Discernible"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "img", content: `<img style="width:100px;height:100px;" />` },
  { filename: "picture", content: `<picture>
    <source srcset="path-to-image-png">
    <img src="path-to-image-png">
</picture>` },
  { filename: "role img", content: `<div role="img" style="width:100px;height:100px;background-image: url(path-to-image.png);" />` }
      ]}
    />
  );
};

export default ImageDiscernibleFailure;
