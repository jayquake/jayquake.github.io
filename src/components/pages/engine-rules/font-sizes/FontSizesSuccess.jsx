import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const FontSizesSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Font Sizes"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "div with good font size in style attribute", content: `<div style="font-size: 12px">Some text content</div>` },
  { filename: "nested with good font size in css class", content: `<style>
  .good-font-size {
    font-size: 12px;
  }
</style>
<div>
  <div id="div1" style="font-size: 12px">
    This is a div with font-size 12px.
    <p id="p1">
      This is a paragraph with class good-font-size.
      <span id="span1" class="good-font-size"> This is a span with no style or class. </span>
    </p>
  </div>
  <div id="div2" style="font-size: 10px">
    <p id="p2" style="font-size: 14px">
      This is a paragraph with font-size 14px.
      <span id="span2" class="good-font-size">
        <!-- This is a span with no text -->
      </span>
    </p>
  </div>
</div>` },
  { filename: "paragraph with good font size in css class", content: `<style>
.good-font-size {
    font-size: 12px;
}
</style>
<p class="good-font-size">Some text content</p>` },
  { filename: "paragraph with good font size in css selector", content: `<style>
p {
    font-size: 12px;
}
</style>
<p style="font-size: 12px;">Some text content</p>` },
  { filename: "paragraph with good font size in style attribute", content: `<p style="font-size: 12px;">Some text content</p>` },
  { filename: "paragraph with no content", content: `<p style="font-size: 10px;"></p>` }
      ]}
    />
  );
};

export default FontSizesSuccess;
