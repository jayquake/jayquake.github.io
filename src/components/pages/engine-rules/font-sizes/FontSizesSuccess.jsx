import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const FontSizesSuccess = () => {
  const ruleId = "N/A";
  const title = `N/A`;
  const description = `N/A`;
  const helpText = `N/A`;
  const bestPractices = [
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
  ];
  const htmlExamples = [
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
  { filename: "paragraph with no content", content: `<p style="font-size: 10px;"></p>` },
  { filename: "subscript element is exempt", content: `<div style="font-size: 12px">Do it <sub style="font-size: 7px">don't do it?</sub></div>` },
  { filename: "superscript element is exempt", content: `<div style="font-size: 12px">Corporation<sup style="font-size: 7px">TM</sup></div>` }
  ];

  return (
    <EngineIssueSuccess
      ruleId={ruleId}
      title={title}
      description={description}
      helpText={helpText}
      bestPractices={bestPractices}
      htmlExamples={htmlExamples}
    />
  );
};

export default FontSizesSuccess;
