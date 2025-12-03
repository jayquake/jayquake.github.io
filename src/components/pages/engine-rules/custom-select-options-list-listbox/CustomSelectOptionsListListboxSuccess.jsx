import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const CustomSelectOptionsListListboxSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Custom Select Options List Listbox"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "role listbox", content: `<form>
    <div class="custom-select">
        <div role="combobox" class="select-selected" onclick="showMenu()">Select an option</div>
        <div role="listbox" class="select-items" style="display: none;">
            <div role="option" class="select-item" onclick="selectOption('Option 1')">Option 1</div>
            <div role="option" class="select-item" onclick="selectOption('Option 2')">Option 2</div>
            <div role="option" class="select-item" onclick="selectOption('Option 3')">Option 3</div>
        </div>
    </div>
</form>` },
  { filename: "select native", content: `<form>
    <select>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
    </select>
</form>` }
      ]}
    />
  );
};

export default CustomSelectOptionsListListboxSuccess;
