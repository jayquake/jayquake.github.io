import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const ImageDiscernibleSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Image Discernible"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "img with aria label", content: `<img aria-label="Image description" style="width:100px;height:100px;" />` },
  { filename: "picture with alt on child img", content: `<!-- issue with @acsbe/classifier -->
<picture >
    <img src="cat.jpg" alt="A picture of a cat" />
</picture>` },
  { filename: "picture with aria label", content: `<!-- issue with @acsbe/classifier -->
<picture aria-label="A picture of a cat">
    <img src="cat.jpg" />
</picture>` },
  { filename: "role img with aria label", content: `<div role="img" aria-label="Image description" style="width:100px;height:100px;background-image: url(path-to-image.png);" />` }
      ]}
    />
  );
};

export default ImageDiscernibleSuccess;
