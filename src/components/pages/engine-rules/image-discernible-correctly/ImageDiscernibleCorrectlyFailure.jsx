import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const ImageDiscernibleCorrectlyFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Image Discernible Correctly"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "image with alt text containing a long single word", content: `<img alt="abcdefghijklmnopqrstuvwxyz" style="width: 100px; height: 100px" />` },
  { filename: "image with alt text containing a single word", content: `<img alt="image" style="width: 100px; height: 100px" />` },
  { filename: "image with alt text containing more numbers than non numbers", content: `<img alt="1234abc" style="width: 100px; height: 100px" />` },
  { filename: "image with alt text containing only dimensions", content: `<img alt="800x600" style="width: 100px; height: 100px" />` },
  { filename: "image with alt text containing only non alphabetic characters", content: `<img alt="!!!" style="width: 100px; height: 100px" />` },
  { filename: "image with aria label containing a long single word", content: `<img aria-label="abcdefghijklmnopqrstuvwxyz" style="width: 100px; height: 100px" />` },
  { filename: "image with aria label containing a single word", content: `<img aria-label="image" style="width:100px;height:100px;"/>` },
  { filename: "image with aria label containing more numbers than non numbers", content: `<img aria-label="1234abc" style="width: 100px; height: 100px" />` },
  { filename: "image with aria label containing only dimensions", content: `<img aria-label="800x600" style="width: 100px; height: 100px" />` },
  { filename: "image with aria label containing only non alphabetic characters", content: `<img aria-label="!!!" style="width:100px;height:100px;"/>` },
  { filename: "image with not meaningful alt text and not meaningful aria label", content: `<img alt="abcdefghijklmnopqrstuvwxyz" aria-label="1234abc" style="width: 100px; height: 100px" />` }
      ]}
    />
  );
};

export default ImageDiscernibleCorrectlyFailure;
