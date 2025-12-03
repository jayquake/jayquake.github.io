import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const SelectOptionMismatchFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Select Option Mismatch"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "accordion", content: `<div class="custom-select">
  <button class="select-box">Select an option</button>
  <div class="accordion">
    <div role="option" class="accordion-item">
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
  { filename: "custom select with nested options", content: `<div class="custom-select">
  <button class="select-box">Select an option</button>
  <div class="options">
    <div class="option">Option 1
      <div class="nested-option" role="option" class="nested-option">Suboption 1</div>
      <div class="nested-option" id="test-subject" class="nested-option">Suboption 2</div>
      <div class="nested-option" role="option" class="nested-option">Suboption 3</div>
    </div>
    <div class="option" role="option" class="option">Option 2</div>
    <div class="option" role="option" class="option">Option 3</div>
  </div>
</div>` },
  { filename: "option no role", content: `<form>
    <div class="custom-select">
        <div class="select-selected" onclick="showMenu()">Select an option</div>
        <div class="select-items" style="display: none">
            <div role="option" class="select-item" onclick="selectOption('Option 1')">Option 1</div>
            <div role="option" class="select-item" onclick="selectOption('Option 2')">Option 2</div>
            <div id="test-subject" class="select-item" onclick="selectOption('Option 3')">Option 3</div>
        </div>
    </div>
</form>` },
  { filename: "options list under div for styling missing role option", content: `<form>
    <div class="custom-select">
        <button role="combobox">Select an option...</button>
        <div role="listbox">
            <div class="option" role="option" onclick="">Option 1</div>
            <div class="option" role="option" onclick="">Option 2</div>
            <div class="option" role="option" onclick="">Option 3</div>
            <div class="option">
                Sub-options
                    <div class="nested-option" role="option" onclick="">Sub-option 1</div>
                    <div class="nested-option" id="test-subject" onclick="">Sub-option 2</div>
                    <div class="nested-option" role="option" onclick="">Sub-option 3</div>
            </div>
        </div>
    </div>
</form>` },
  { filename: "sub option no role", content: `<form>
    <div class="custom-select">
        <button role="combobox">Select an option...</button>
        <div role="listbox" style="opacity: 0">
            <div role="option" onclick="">Option 1</div>
            <div role="option" onclick="">Option 2</div>
            <div role="option" onclick="">Option 3</div>
            <div>
                Sub-options
                <div role="option" onclick="">Sub-option 1</div>
                <div id="test-subject" onclick="">Sub-option 2</div>
                <div role="option" onclick="">Sub-option 3</div>
            </div>
        </div>
    </div>
</form>` }
      ]}
    />
  );
};

export default SelectOptionMismatchFailure;
