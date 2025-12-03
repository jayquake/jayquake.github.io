import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const CustomSelectTriggerComboboxFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Custom Select Trigger Combobox"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "no role", content: `<form>
    <div class="custom-select">
        <div class="select-selected" onclick="showMenu()">Select an option</div>
        <div class="select-items" style="display: none;">
            <div class="select-item" onclick="selectOption('Option 1')">Option 1</div>
            <div class="select-item" onclick="selectOption('Option 2')">Option 2</div>
            <div class="select-item" onclick="selectOption('Option 3')">Option 3</div>
        </div>
    </div>
</form>` }
      ]}
    />
  );
};

export default CustomSelectTriggerComboboxFailure;
