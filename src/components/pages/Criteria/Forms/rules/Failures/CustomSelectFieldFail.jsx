/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): custom-select-trigger-combobox, custom-select-options-list-listbox, select-option-mismatch
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Forms: Custom Select Field - Failure";

const CustomSelectFieldFail = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="forms-custom-select-field-failure-failure-1"
          data-atomic-source="custom-select-trigger-combobox/no-role"
          dangerouslySetInnerHTML={{
            __html: `<form>
    <div class="custom-select">
        <div class="select-selected" onclick="showMenu()">Select an option</div>
        <div class="select-items" style="display: none;">
            <div class="select-item" onclick="selectOption('Option 1')">Option 1</div>
            <div class="select-item" onclick="selectOption('Option 2')">Option 2</div>
            <div class="select-item" onclick="selectOption('Option 3')">Option 3</div>
        </div>
    </div>
</form>`,
          }}
        />
        <div
          className="list-item"
          id="forms-custom-select-field-failure-failure-2"
          data-atomic-source="custom-select-options-list-listbox/no-role"
          dangerouslySetInnerHTML={{
            __html: `<form>
    <div class="custom-select">
        <div class="select-selected" onclick="showMenu()">Select an option</div>
        <div class="select-items" style="display: none;">
            <div class="select-item" onclick="selectOption('Option 1')">Option 1</div>
            <div class="select-item" onclick="selectOption('Option 2')">Option 2</div>
            <div class="select-item" onclick="selectOption('Option 3')">Option 3</div>
        </div>
    </div>
</form>`,
          }}
        />
        <div
          className="list-item"
          id="forms-custom-select-field-failure-failure-3"
          data-atomic-source="select-option-mismatch/accordion"
          dangerouslySetInnerHTML={{
            __html: `<div class="custom-select">
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
</div>`,
          }}
        />
        <div
          className="list-item"
          id="forms-custom-select-field-failure-failure-4"
          data-atomic-source="select-option-mismatch/custom-select-with-nested-options"
          dangerouslySetInnerHTML={{
            __html: `<div class="custom-select">
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
</div>`,
          }}
        />
        <div
          className="list-item"
          id="forms-custom-select-field-failure-failure-5"
          data-atomic-source="select-option-mismatch/option-no-role"
          dangerouslySetInnerHTML={{
            __html: `<form>
    <div class="custom-select">
        <div class="select-selected" onclick="showMenu()">Select an option</div>
        <div class="select-items" style="display: none">
            <div role="option" class="select-item" onclick="selectOption('Option 1')">Option 1</div>
            <div role="option" class="select-item" onclick="selectOption('Option 2')">Option 2</div>
            <div id="test-subject" class="select-item" onclick="selectOption('Option 3')">Option 3</div>
        </div>
    </div>
</form>`,
          }}
        />
        <div
          className="list-item"
          id="forms-custom-select-field-failure-failure-6"
          data-atomic-source="select-option-mismatch/options-list-under-div-for-styling-missing-role-option"
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
                    <div class="nested-option" id="test-subject" onclick="">Sub-option 2</div>
                    <div class="nested-option" role="option" onclick="">Sub-option 3</div>
            </div>
        </div>
    </div>
</form>`,
          }}
        />
        <div
          className="list-item"
          id="forms-custom-select-field-failure-failure-7"
          data-atomic-source="select-option-mismatch/sub-option-no-role"
          dangerouslySetInnerHTML={{
            __html: `<form>
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
</form>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default CustomSelectFieldFail;
