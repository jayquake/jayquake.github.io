/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): custom-select-trigger-combobox, custom-select-options-list-listbox, select-option-mismatch
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Forms: Custom Select Field - Success";

const CustomSelectFieldSucc = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="forms-custom-select-field-success-success-1"
          data-atomic-source="custom-select-trigger-combobox/role-combobox"
          dangerouslySetInnerHTML={{
            __html: `<form>
    <div class="custom-select">
        <div role="combobox" class="select-selected" onclick="showMenu()">Select an option</div>
        <div role="listbox" class="select-items" style="display: none;">
            <div role="option" class="select-item" onclick="selectOption('Option 1')">Option 1</div>
            <div role="option" class="select-item" onclick="selectOption('Option 2')">Option 2</div>
            <div role="option" class="select-item" onclick="selectOption('Option 3')">Option 3</div>
        </div>
    </div>
</form>`,
          }}
        />
        <div
          className="list-item"
          id="forms-custom-select-field-success-success-2"
          data-atomic-source="custom-select-trigger-combobox/select-native"
          dangerouslySetInnerHTML={{
            __html: `<form>
    <select>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
    </select>
</form>`,
          }}
        />
        <div
          className="list-item"
          id="forms-custom-select-field-success-success-3"
          data-atomic-source="custom-select-trigger-combobox/style-element-under-select"
          dangerouslySetInnerHTML={{
            __html: `<form>
    <div class="custom-select">
        <div role="combobox" class="select-selected" onclick="showMenu()">Select an option</div>
        <style></style>
        <div role="listbox" class="select-items" style="display: none;">
            <div role="option" class="select-item" onclick="selectOption('Option 1')">Option 1</div>
            <div role="option" class="select-item" onclick="selectOption('Option 2')">Option 2</div>
            <div role="option" class="select-item" onclick="selectOption('Option 3')">Option 3</div>
        </div>
    </div>
</form>`,
          }}
        />
        <div
          className="list-item"
          id="forms-custom-select-field-success-success-4"
          data-atomic-source="custom-select-options-list-listbox/role-listbox"
          dangerouslySetInnerHTML={{
            __html: `<form>
    <div class="custom-select">
        <div role="combobox" class="select-selected" onclick="showMenu()">Select an option</div>
        <div role="listbox" class="select-items" style="display: none;">
            <div role="option" class="select-item" onclick="selectOption('Option 1')">Option 1</div>
            <div role="option" class="select-item" onclick="selectOption('Option 2')">Option 2</div>
            <div role="option" class="select-item" onclick="selectOption('Option 3')">Option 3</div>
        </div>
    </div>
</form>`,
          }}
        />
        <div
          className="list-item"
          id="forms-custom-select-field-success-success-5"
          data-atomic-source="custom-select-options-list-listbox/select-native"
          dangerouslySetInnerHTML={{
            __html: `<form>
    <select>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
    </select>
</form>`,
          }}
        />
        <div
          className="list-item"
          id="forms-custom-select-field-success-success-6"
          data-atomic-source="select-option-mismatch/options-list-under-div-for-styling-role-options"
          dangerouslySetInnerHTML={{
            __html: `<form>
    <div class="custom-select">
        <button role="combobox">Select an option...</button>
        <div role="listbox">
            <div class="option" role="option" onclick="">Option 1</div>
            <div class="option" role="option" onclick="">Option 2</div>
            <div class="option" role="option" onclick="">Option 3</div>
            <div class="option">
                Sub-options
                    <div class="nested-option" role="option" onclick="">Sub-option 1</div>
                    <div class="nested-option" role="option" onclick="">Sub-option 2</div>
                    <div class="nested-option" role="option" onclick="">Sub-option 3</div>
            </div>
        </div>
    </div>
</form>`,
          }}
        />
        <div
          className="list-item"
          id="forms-custom-select-field-success-success-7"
          data-atomic-source="select-option-mismatch/options-role-option"
          dangerouslySetInnerHTML={{
            __html: `<form>
  <div class="custom-select">
    <div role="combobox" class="select-selected" onclick="showMenu()">Select an option</div>
    <div role="listbox" class="select-items">
      <div role="option" class="select-item" onclick="selectOption('Option 1')">Option 1</div>
      <div role="option" class="select-item" onclick="selectOption('Option 2')">Option 2</div>
      <div role="option" class="select-item" onclick="selectOption('Option 3')">Option 3</div>
    </div>
  </div>
</form>`,
          }}
        />
        <div
          className="list-item"
          id="forms-custom-select-field-success-success-8"
          data-atomic-source="select-option-mismatch/select-native"
          dangerouslySetInnerHTML={{
            __html: `<form>
  <select>
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
    <option value="option3">Option 3</option>
  </select>
</form>`,
          }}
        />
        <div
          className="list-item"
          id="forms-custom-select-field-success-success-9"
          data-atomic-source="select-option-mismatch/sub-options-role-option"
          dangerouslySetInnerHTML={{
            __html: `<form>
  <div class="custom-select">
    <button role="combobox">Select an option...</button>
    <div role="listbox" style="opacity: 0">
      <div role="option" onclick="">Option 3</div>
      <div role="option" onclick="">Option 1</div>
      <div role="option" onclick="">Option 2</div>
      <div>
        Sub-options
        <div role="option" onclick="">Sub-option 1</div>
        <div role="option" onclick="">Sub-option 2</div>
        <div role="option" onclick="">Sub-option 3</div>
      </div>
    </div>
  </div>
</form>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default CustomSelectFieldSucc;
