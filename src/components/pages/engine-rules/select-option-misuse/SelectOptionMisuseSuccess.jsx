import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const SelectOptionMisuseSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Select Option Misuse"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "accordion", content: `<div class="custom-select">
  <button class="select-box">Select an option</button>
  <div class="accordion">
    <div class="accordion-item">
      <div class="accordion-header">Header 1</div>
      <div class="accordion-content">
        <div class="content">Content 1</div>
      </div>
    </div>
    <div id="test-subject" class="accordion-item" role="option">
      <div class="accordion-header">Header 2</div>
      <div class="accordion-content">
        <div class="content">Content 2</div>
      </div>
    </div>
  </div>
</div>` },
  { filename: "no compliant select option", content: `<div class="custom-select">
  <button class="select-box">Select an option</button>
  <div class="accordion">
    <div class="accordion-item">
      <div class="accordion-header">Header 1</div>
      <div class="accordion-content">
        <div class="content">Content 1</div>
      </div>
    </div>
    <div id="test-subject" class="accordion-item">
      <div class="accordion-header">Header 2</div>
      <div class="accordion-content">
        <div class="content">Content 2</div>
      </div>
    </div>
  </div>
</div>` },
  { filename: "select native", content: `<form>
  <select>
    <option id="test-subject1" value="option1">Option 1</option>
    <option id="test-subject2" value="option2">Option 2</option>
    <option id="test-subject3" value="option3">Option 3</option>
  </select>
</form>` }
      ]}
    />
  );
};

export default SelectOptionMisuseSuccess;
