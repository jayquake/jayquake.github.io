import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const ImageDiscernibleCorrectlySuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Image Discernible Correctly"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "image with meaningful alt text hebrew", content: `<img alt="זריחה יפה מעל ההרים" style="width: 100px; height: 100px" />` },
  { filename: "image with meaningful alt text", content: `<img alt="A beautiful sunrise over the mountains" style="width: 100px; height: 100px" />` },
  { filename: "image with meaningful aria label hebrew", content: `<img aria-label="זריחה יפה מעל ההרים" style="width: 100px; height: 100px" />` },
  { filename: "image with meaningful aria label", content: `<img aria-label="A beautiful sunrise over the mountains" style="width:100px;height:100px;"/>` },
  { filename: "image with not meaningful alt text and meaningful aria label", content: `<img alt="abcdefghijklmnopqrstuvwxyz" aria-label="A beautiful sunrise over the mountains" style="width: 100px; height: 100px" />` }
      ]}
    />
  );
};

export default ImageDiscernibleCorrectlySuccess;
