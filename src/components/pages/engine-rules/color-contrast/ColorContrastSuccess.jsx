import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const ColorContrastSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Color Contrast"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "div with background black and color white", content: `<div style="background-color: black; color: white">Content</div>` },
  { filename: "div with background transparent and color black and parent non transparent", content: `<div style="background-color: white">
  <div style="background-color: transparent; color: black">Content</div>
</div>` },
  { filename: "div with background transparent and color black", content: `<div style="background-color: transparent; color: black">Content</div>` },
  { filename: "div with background white and color black", content: `<div style="background-color: white; color: black">Content</div>` },
  { filename: "div with font size 16px with ratio bigger than 4.5", content: `<div style="font-size: 16px; color: #824040; background-color: #CCCCCC;">Text Contrast Ratio 4.74:1</div>` },
  { filename: "div with font size 26px with ratio smaller than 4.5", content: `<div style="font-size: 26px; color:  #000000; background-color: #C80909;">Text Contrast Ratio 3.49:1</div>` },
  { filename: "muliple div with font size 16px with ratio bigger than 4.5", content: `<div style="font-size: 16px; color: #824040; background-color: #CCCCCC;"></div>
<div style="font-size: 16px; color: #824040; background-color: #CCCCCC;">Text Contrast Ratio 4.74:1</div>
<div style="font-size: 16px; color: #824040; background-color: #CCCCCC;">Text Contrast Ratio 4.74:1</div>
<div style="font-size: 16px; color: #824040; background-color: #CCCCCC;">Text Contrast Ratio 4.74:1</div>` }
      ]}
    />
  );
};

export default ColorContrastSuccess;
