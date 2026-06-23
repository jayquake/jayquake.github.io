import { ControlFieldVisibleAndTabbable } from ".";
import type { ValidationMethodArguments } from "../../../test/unit/helpers/validation-method-arguments";
import validationMethodArguments from "../../../test/unit/helpers/validation-method-arguments";

describe("ControlFieldVisibleAndTabbable Rule Validation", () => {
  let validateMethodArguments: ValidationMethodArguments;
  let classifier: ValidationMethodArguments["classifier"];
  let response: ValidationMethodArguments["response"];

  beforeEach(() => {
    validateMethodArguments = validationMethodArguments();
    classifier = validateMethodArguments.classifier;
    response = validateMethodArguments.response;
    jest.spyOn(classifier, "getMatched").mockReturnValue([]);
  });

  it("should pass when custom checkbox is itself a compliant input field", async () => {
    const customCheckbox = document.createElement("input");
    customCheckbox.type = "checkbox";

    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([customCheckbox]); // Get custom checkboxes
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get custom radios
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get custom files
    jest.spyOn(classifier, "assert").mockReturnValueOnce(true); // checkbox is CompliantComponentInputField

    await ControlFieldVisibleAndTabbable.validate(validateMethodArguments);
    expect(response.passedNodes).toContain(customCheckbox);
    expect(response.failedNodes).toHaveLength(0);
  });

  it("should pass when custom radio is itself a compliant input field", async () => {
    const customRadio = document.createElement("input");
    customRadio.type = "radio";

    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get custom checkboxes
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([customRadio]); // Get custom radios
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get custom files
    jest.spyOn(classifier, "assert").mockReturnValueOnce(true); // radio is CompliantComponentInputField

    await ControlFieldVisibleAndTabbable.validate(validateMethodArguments);
    expect(response.passedNodes).toContain(customRadio);
    expect(response.failedNodes).toHaveLength(0);
  });

  it("should pass when custom file input is itself a compliant input field", async () => {
    const customFile = document.createElement("input");
    customFile.type = "file";

    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get custom checkboxes
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get custom radios
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([customFile]); // Get custom files
    jest.spyOn(classifier, "assert").mockReturnValueOnce(true); // file is CompliantComponentInputField

    await ControlFieldVisibleAndTabbable.validate(validateMethodArguments);
    expect(response.passedNodes).toContain(customFile);
    expect(response.failedNodes).toHaveLength(0);
  });

  it("should pass when custom checkbox has a child input that is visible and tabbable", async () => {
    const customCheckbox = document.createElement("div");
    const inputField = document.createElement("input");
    inputField.type = "checkbox";
    customCheckbox.appendChild(inputField);

    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([customCheckbox]); // Get custom checkboxes
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get custom radios
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get custom files
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customCheckbox is NOT CompliantComponentInputField
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([inputField]); // Get child input field
    jest.spyOn(classifier, "assert").mockReturnValueOnce(true); // inputField is CompliantTraitVisible
    jest.spyOn(classifier, "assert").mockReturnValueOnce(true); // inputField is PerceivableTraitTabbable

    await ControlFieldVisibleAndTabbable.validate(validateMethodArguments);
    expect(response.passedNodes).toContain(customCheckbox);
    expect(response.failedNodes).toHaveLength(0);
  });

  it("should pass when custom radio has a child input that is visible and tabbable", async () => {
    const customRadio = document.createElement("div");
    const inputField = document.createElement("input");
    inputField.type = "radio";
    customRadio.appendChild(inputField);

    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get custom checkboxes
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([customRadio]); // Get custom radios
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get custom files
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customRadio is NOT CompliantComponentInputField
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([inputField]); // Get child input field
    jest.spyOn(classifier, "assert").mockReturnValueOnce(true); // inputField is CompliantTraitVisible
    jest.spyOn(classifier, "assert").mockReturnValueOnce(true); // inputField is PerceivableTraitTabbable

    await ControlFieldVisibleAndTabbable.validate(validateMethodArguments);
    expect(response.passedNodes).toContain(customRadio);
    expect(response.failedNodes).toHaveLength(0);
  });

  it("should pass when custom file has a child input that is visible and tabbable", async () => {
    const customFile = document.createElement("div");
    const inputField = document.createElement("input");
    inputField.type = "file";
    customFile.appendChild(inputField);

    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get custom checkboxes
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get custom radios
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([customFile]); // Get custom files
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customFile is NOT CompliantComponentInputField
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([inputField]); // Get child input field
    jest.spyOn(classifier, "assert").mockReturnValueOnce(true); // inputField is CompliantTraitVisible
    jest.spyOn(classifier, "assert").mockReturnValueOnce(true); // inputField is PerceivableTraitTabbable

    await ControlFieldVisibleAndTabbable.validate(validateMethodArguments);
    expect(response.passedNodes).toContain(customFile);
    expect(response.failedNodes).toHaveLength(0);
  });

  it("should fail when custom checkbox has a child input that is not compliantvisible", async () => {
    const customCheckbox = document.createElement("div");
    const inputField = document.createElement("input");
    inputField.type = "checkbox";
    customCheckbox.appendChild(inputField);

    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([customCheckbox]); // Get custom checkboxes
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get custom radios
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get custom files
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customCheckbox is NOT CompliantComponentInputCheckbox
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customCheckbox is NOT CompliantComponentInputRadio
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customCheckbox is NOT CompliantComponentInputFile
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([inputField]); // Get child input field
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // inputField is NOT CompliantTraitVisible

    await ControlFieldVisibleAndTabbable.validate(validateMethodArguments);
    expect(response.failedNodes).toContain(customCheckbox);
    expect(response.passedNodes).toHaveLength(0);
  });

  it("should fail when custom checkbox has a child input that is not tabbable", async () => {
    const customCheckbox = document.createElement("div");
    const inputField = document.createElement("input");
    inputField.type = "checkbox";
    customCheckbox.appendChild(inputField);

    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([customCheckbox]); // Get custom checkboxes
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get custom radios
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get custom files
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customCheckbox is NOT CompliantComponentInputCheckbox
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customCheckbox is NOT CompliantComponentInputRadio
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customCheckbox is NOT CompliantComponentInputFile
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([inputField]); // Get child input field (checkbox)
    jest.spyOn(classifier, "assert").mockReturnValueOnce(true); // inputField is CompliantTraitVisible
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // inputField is NOT PerceivableTraitTabbable

    await ControlFieldVisibleAndTabbable.validate(validateMethodArguments);
    expect(response.failedNodes).toContain(customCheckbox);
    expect(response.passedNodes).toHaveLength(0);
  });

  it("should fail when custom radio has a child input that is not compliant visible", async () => {
    const customRadio = document.createElement("div");
    const inputField = document.createElement("input");
    inputField.type = "radio";
    customRadio.appendChild(inputField);

    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get custom checkboxes
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([customRadio]); // Get custom radios
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get custom files
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customRadio is NOT CompliantComponentInputCheckbox
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customRadio is NOT CompliantComponentInputRadio
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customRadio is NOT CompliantComponentInputFile
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get child input field (checkbox)
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([inputField]); // Get child input field (radio)
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // inputField is NOT CompliantTraitVisible

    await ControlFieldVisibleAndTabbable.validate(validateMethodArguments);
    expect(response.failedNodes).toContain(customRadio);
    expect(response.passedNodes).toHaveLength(0);
  });

  it("should fail when custom radio has a child input that is not tabbable", async () => {
    const customRadio = document.createElement("div");
    const inputField = document.createElement("input");
    inputField.type = "radio";
    customRadio.appendChild(inputField);

    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get custom checkboxes
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([customRadio]); // Get custom radios
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get custom files
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customRadio is NOT CompliantComponentInputCheckbox
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customRadio is NOT CompliantComponentInputRadio
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customRadio is NOT CompliantComponentInputFile
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get child input field (checkbox)
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([inputField]); // Get child input field (radio)
    jest.spyOn(classifier, "assert").mockReturnValueOnce(true); // inputField is CompliantTraitVisible
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // inputField is NOT PerceivableTraitTabbable

    await ControlFieldVisibleAndTabbable.validate(validateMethodArguments);
    expect(response.failedNodes).toContain(customRadio);
    expect(response.passedNodes).toHaveLength(0);
  });

  it("should fail when custom file has a child input that is not compliant visible", async () => {
    const customFile = document.createElement("div");
    const inputField = document.createElement("input");
    inputField.type = "file";
    customFile.appendChild(inputField);

    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get custom checkboxes
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get custom radios
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([customFile]); // Get custom files
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customFile is NOT CompliantComponentInputCheckbox
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customFile is NOT CompliantComponentInputRadio
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customFile is NOT CompliantComponentInputFile
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get child input field (checkbox)
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get child input field (radio)
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([inputField]); // Get child input field (file)
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // inputField is NOT CompliantTraitVisible

    await ControlFieldVisibleAndTabbable.validate(validateMethodArguments);
    expect(response.failedNodes).toContain(customFile);
    expect(response.passedNodes).toHaveLength(0);
  });

  it("should fail when custom file has a child input that is not tabbable", async () => {
    const customFile = document.createElement("div");
    const inputField = document.createElement("input");
    inputField.type = "file";
    customFile.appendChild(inputField);

    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get custom checkboxes
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get custom radios
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([customFile]); // Get custom files
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customFile is NOT CompliantComponentInputCheckbox
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customFile is NOT CompliantComponentInputRadio
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customFile is NOT CompliantComponentInputFile
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get child input field (checkbox)
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get child input field (radio)
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([inputField]); // Get child input field (file)
    jest.spyOn(classifier, "assert").mockReturnValueOnce(true); // inputField is CompliantTraitVisible
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // inputField is NOT PerceivableTraitTabbable

    await ControlFieldVisibleAndTabbable.validate(validateMethodArguments);
    expect(response.failedNodes).toContain(customFile);
    expect(response.passedNodes).toHaveLength(0);
  });

  it("should not add to any nodes when custom checkbox has no child input field", async () => {
    const customCheckbox = document.createElement("div");

    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([customCheckbox]); // Get custom checkboxes
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get custom radios
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get custom files
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customCheckbox is NOT CompliantComponentInputField
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // No child input field

    await ControlFieldVisibleAndTabbable.validate(validateMethodArguments);
    expect(response.passedNodes).toHaveLength(0);
    expect(response.failedNodes).toHaveLength(0);
  });

  it("should not add to any nodes when custom radio has no child input field", async () => {
    const customRadio = document.createElement("div");

    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get custom checkboxes
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([customRadio]); // Get custom radios
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get custom files
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customRadio is NOT CompliantComponentInputField
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // No child input field

    await ControlFieldVisibleAndTabbable.validate(validateMethodArguments);
    expect(response.passedNodes).toHaveLength(0);
    expect(response.failedNodes).toHaveLength(0);
  });

  it("should not add to any nodes when custom file has no child input field", async () => {
    const customFile = document.createElement("div");

    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get custom checkboxes
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get custom radios
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([customFile]); // Get custom files
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customFile is NOT CompliantComponentInputField
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // No child input field

    await ControlFieldVisibleAndTabbable.validate(validateMethodArguments);
    expect(response.passedNodes).toHaveLength(0);
    expect(response.failedNodes).toHaveLength(0);
  });

  it("should handle multiple custom controls (checkboxes, radios and files)", async () => {
    const customCheckbox1 = document.createElement("div");
    const customCheckbox2 = document.createElement("div");
    const customRadio1 = document.createElement("div");
    const customRadio2 = document.createElement("div");
    const customFile1 = document.createElement("div");
    const customFile2 = document.createElement("div");
    const inputField1 = document.createElement("input");
    const inputField2 = document.createElement("input");
    const inputField3 = document.createElement("input");
    const inputField4 = document.createElement("input");
    const inputField5 = document.createElement("input");
    const inputField6 = document.createElement("input");

    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([customCheckbox1, customCheckbox2]); // Get custom checkboxes
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([customRadio1, customRadio2]); // Get custom radios
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([customFile1, customFile2]); // Get custom files

    // customCheckbox1 - passes
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customCheckbox1 is NOT CompliantComponentInputCheckbox
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customCheckbox1 is NOT CompliantComponentInputRadio
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customCheckbox1 is NOT CompliantComponentInputFile
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([inputField1]); // Get child input field (checkbox)
    jest.spyOn(classifier, "assert").mockReturnValueOnce(true); // inputField1 is CompliantTraitVisible
    jest.spyOn(classifier, "assert").mockReturnValueOnce(true); // inputField1 is PerceivableTraitTabbable

    // customCheckbox2 - fails (not visible)
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customCheckbox2 is NOT CompliantComponentInputCheckbox
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customCheckbox2 is NOT CompliantComponentInputRadio
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customCheckbox2 is NOT CompliantComponentInputFile
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([inputField2]); // Get child input field (checkbox)
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // inputField2 is NOT CompliantTraitVisible

    // customRadio1 - passes
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customRadio1 is NOT CompliantComponentInputCheckbox
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customRadio1 is NOT CompliantComponentInputRadio
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customRadio1 is NOT CompliantComponentInputFile
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get child input field (checkbox)
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([inputField3]); // Get child input field (radio)
    jest.spyOn(classifier, "assert").mockReturnValueOnce(true); // inputField3 is CompliantTraitVisible
    jest.spyOn(classifier, "assert").mockReturnValueOnce(true); // inputField3 is PerceivableTraitTabbable

    // customRadio2 - fails (not tabbable)
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customRadio2 is NOT CompliantComponentInputCheckbox
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customRadio2 is NOT CompliantComponentInputRadio
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customRadio2 is NOT CompliantComponentInputFile
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get child input field (checkbox)
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([inputField4]); // Get child input field (radio)
    jest.spyOn(classifier, "assert").mockReturnValueOnce(true); // inputField4 is CompliantTraitVisible
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // inputField4 is NOT PerceivableTraitTabbable

    // customFile1 - passes
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customFile1 is NOT CompliantComponentInputCheckbox
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customFile1 is NOT CompliantComponentInputRadio
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customFile1 is NOT CompliantComponentInputFile
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get child input field (checkbox)
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get child input field (radio)
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([inputField5]); // Get child input field (file)
    jest.spyOn(classifier, "assert").mockReturnValueOnce(true); // inputField5 is CompliantTraitVisible
    jest.spyOn(classifier, "assert").mockReturnValueOnce(true); // inputField5 is PerceivableTraitTabbable

    // customFile2 - fails (not visible)
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customFile2 is NOT CompliantComponentInputCheckbox
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customFile2 is NOT CompliantComponentInputRadio
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // customFile2 is NOT CompliantComponentInputFile
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get child input field (checkbox)
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // Get child input field (radio)
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([inputField6]); // Get child input field (file)
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // inputField6 is NOT CompliantTraitVisible

    await ControlFieldVisibleAndTabbable.validate(validateMethodArguments);
    expect(response.passedNodes).toEqual([customCheckbox1, customRadio1, customFile1]);
    expect(response.failedNodes).toEqual([customCheckbox2, customRadio2, customFile2]);
  });
});
