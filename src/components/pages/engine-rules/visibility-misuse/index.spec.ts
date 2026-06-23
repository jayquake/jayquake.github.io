import { VisibilityMisuse } from ".";
import type { ValidationMethodArguments } from "../../../test/unit/helpers/validation-method-arguments";
import validationMethodArguments from "../../../test/unit/helpers/validation-method-arguments";

describe("VisibilityMisuse Rule Validation", () => {
  let validateMethodArguments: ValidationMethodArguments;
  let classifier: ValidationMethodArguments["classifier"];
  let response: ValidationMethodArguments["response"];

  beforeEach(() => {
    validateMethodArguments = validationMethodArguments();
    classifier = validateMethodArguments.classifier;
    response = validateMethodArguments.response;
    jest.spyOn(classifier, "getMatchedInclusive").mockReturnValue([]);
    jest.spyOn(classifier, "getMatched").mockReturnValue([]);
  });

  it("should add srOnlyElement to inapplicableNodes", async () => {
    const element = document.createElement("div");
    jest.spyOn(classifier, "assert").mockReturnValueOnce(true);
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([element]);
    jest.spyOn(classifier, "getMatchedInclusive").mockReturnValueOnce([element]);
    await VisibilityMisuse.validate(validateMethodArguments);
    expect(response.inapplicableNodes).toEqual([element]);
  });

  it("should add element with srOnly parent to inapplicableNodes", async () => {
    const element = document.createElement("div");
    const parent = document.createElement("div");

    jest.spyOn(classifier, "assert").mockReturnValueOnce(true);
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([element]);
    jest.spyOn(classifier, "getParent").mockReturnValue(parent);

    await VisibilityMisuse.validate(validateMethodArguments);
    expect(response.inapplicableNodes).toEqual([element]);
  });

  it("should add element with srOnly descendant to inapplicableNodes", async () => {
    const element = document.createElement("div");
    const descendant = document.createElement("div");
    element.appendChild(descendant);

    jest.spyOn(classifier, "assert").mockReturnValueOnce(true);
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([element]);
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]);
    jest.spyOn(classifier, "getMatchedInclusive").mockReturnValueOnce([descendant]);

    await VisibilityMisuse.validate(validateMethodArguments);
    expect(response.inapplicableNodes).toEqual([element]);
  });

  it("should add element with interactable parent and is all the srVisibile text of the parent to inapplicableNodes", async () => {
    const element = document.createElement("div");
    const parent = document.createElement("div");

    jest.spyOn(classifier, "assert").mockReturnValueOnce(true);
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([element]);
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]);
    jest.spyOn(classifier, "getParent").mockReturnValueOnce(null);
    jest.spyOn(classifier, "getParent").mockReturnValueOnce(parent);

    jest.spyOn(classifier, "getOperations").mockReturnValue({
      contentInfo: {
        srVisibleText: "text",
      },
    });

    await VisibilityMisuse.validate(validateMethodArguments);
    expect(response.inapplicableNodes).toEqual([element]);
  });

  it("should add compliant visible element to failedNodes", async () => {
    const element = document.createElement("div");

    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([element]);
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]);
    jest.spyOn(classifier, "assert").mockReturnValueOnce(true);
    await VisibilityMisuse.validate(validateMethodArguments);
    expect(response.failedNodes).toEqual([element]);
  });

  it("should add not compliant visible element to passedNodes", async () => {
    const element = document.createElement("div");

    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([element]);
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]);
    await VisibilityMisuse.validate(validateMethodArguments);
    expect(response.passedNodes).toEqual([element]);
  });

  it("should add nested non-compliant visible element to passedNodes", async () => {
    const element = document.createElement("div");
    const parent = document.createElement("div");
    parent.appendChild(element);

    jest.spyOn(classifier, "assert").mockReturnValueOnce(true);
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([parent]);
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([element]);

    await VisibilityMisuse.validate(validateMethodArguments);
    expect(response.inapplicableNodes).toEqual([parent]);
  });

  it("should add to inapplicableNodes a 'failed' element that has an explicitly-hidden ancestor", async () => {
    const parent = document.createElement("div");
    const element = document.createElement("div");
    parent.appendChild(element);

    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([parent, element]); // Get hidden elements
    jest.spyOn(classifier, "assert").mockReturnValueOnce(true); // parent is CompliantTraitVisible
    jest.spyOn(classifier, "getMatchedInclusive").mockReturnValueOnce([]); // parent: no PerceivableTraitScreenReaderOnly
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // parent: no visible descendants
    jest.spyOn(classifier, "getParent").mockReturnValueOnce(undefined); // parent has no PerceivableTraitScreenReaderOnly parent
    jest.spyOn(classifier, "getParent").mockReturnValueOnce(undefined); // parent has no CompliantTraitInteractable parent
    jest.spyOn(classifier, "getParent").mockReturnValueOnce(undefined); // parent has no CompliantTraitExplicitlyHidden parent
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // parent is NOT CompliantComponentInputCheckbox
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // parent is NOT CompliantComponentInputRadio
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // parent is NOT CompliantComponentInputFile
    jest.spyOn(classifier, "assert").mockReturnValueOnce(true); // element is CompliantTraitVisible
    jest.spyOn(classifier, "getMatchedInclusive").mockReturnValueOnce([]); // element: no PerceivableTraitScreenReaderOnly
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // element: no visible descendants
    jest.spyOn(classifier, "getParent").mockReturnValueOnce(undefined); // element has no PerceivableTraitScreenReaderOnly parent
    jest.spyOn(classifier, "getParent").mockReturnValueOnce(undefined); // element has no CompliantTraitInteractable parent
    jest.spyOn(classifier, "getParent").mockReturnValueOnce(parent); // element has CompliantTraitExplicitlyHidden parent

    await VisibilityMisuse.validate(validateMethodArguments);
    expect(response.inapplicableNodes).toEqual([element]);
    expect(response.failedNodes).toEqual([parent]);
  });

  it("should not add nested compliant visible element to failedNodes", async () => {
    const element = document.createElement("div");
    const parent = document.createElement("div");
    response.failedNodes = [parent];
    parent.appendChild(element);

    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([parent, element]); // Get hidden elements
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // parent is NOT CompliantTraitVisible -> goes to passedNodes
    jest.spyOn(classifier, "assert").mockReturnValueOnce(true); // element is CompliantTraitVisible
    jest.spyOn(classifier, "getMatchedInclusive").mockReturnValueOnce([]); // element: no PerceivableTraitScreenReaderOnly
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // element: no visible descendants
    jest.spyOn(classifier, "getParent").mockReturnValueOnce(undefined); // element has no PerceivableTraitScreenReaderOnly parent
    jest.spyOn(classifier, "getParent").mockReturnValueOnce(undefined); // element has no CompliantTraitInteractable parent
    jest.spyOn(classifier, "getParent").mockReturnValueOnce(undefined); // element has no CompliantTraitExplicitlyHidden parent
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // element is NOT CompliantComponentInputCheckbox
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // element is NOT CompliantComponentInputRadio
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // element is NOT CompliantComponentInputFile

    await VisibilityMisuse.validate(validateMethodArguments);
    expect(response.failedNodes).toEqual([parent]);
  });

  it("should add compliant input field (checkbox) to inapplicableNodes", async () => {
    const element = document.createElement("input");
    element.type = "checkbox";

    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([element]); // Get hidden elements
    jest.spyOn(classifier, "assert").mockReturnValueOnce(true); // is CompliantTraitVisible
    jest.spyOn(classifier, "getMatchedInclusive").mockReturnValueOnce([]); // No PerceivableTraitScreenReaderOnly
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // No visible descendants
    jest.spyOn(classifier, "getParent").mockReturnValueOnce(undefined); // No PerceivableTraitScreenReaderOnly parent
    jest.spyOn(classifier, "getParent").mockReturnValueOnce(undefined); // No CompliantTraitInteractable parent
    jest.spyOn(classifier, "getParent").mockReturnValueOnce(undefined); // No CompliantTraitExplicitlyHidden parent
    jest.spyOn(classifier, "assert").mockReturnValueOnce(true); // is CompliantComponentInputCheckbox

    await VisibilityMisuse.validate(validateMethodArguments);
    expect(response.inapplicableNodes).toEqual([element]);
  });

  it("should add compliant input field (radio) to inapplicableNodes", async () => {
    const element = document.createElement("input");
    element.type = "radio";

    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([element]); // Get hidden elements
    jest.spyOn(classifier, "assert").mockReturnValueOnce(true); // is CompliantTraitVisible
    jest.spyOn(classifier, "getMatchedInclusive").mockReturnValueOnce([]); // No PerceivableTraitScreenReaderOnly
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // No visible descendants
    jest.spyOn(classifier, "getParent").mockReturnValueOnce(undefined); // No PerceivableTraitScreenReaderOnly parent
    jest.spyOn(classifier, "getParent").mockReturnValueOnce(undefined); // No CompliantTraitInteractable parent
    jest.spyOn(classifier, "getParent").mockReturnValueOnce(undefined); // No CompliantTraitExplicitlyHidden parent
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // is NOT CompliantComponentInputCheckbox
    jest.spyOn(classifier, "assert").mockReturnValueOnce(true); // is CompliantComponentInputRadio

    await VisibilityMisuse.validate(validateMethodArguments);
    expect(response.inapplicableNodes).toEqual([element]);
  });

  it("should add compliant input field (file) to inapplicableNodes", async () => {
    const element = document.createElement("input");
    element.type = "file";

    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([element]); // Get hidden elements
    jest.spyOn(classifier, "assert").mockReturnValueOnce(true); // is CompliantTraitVisible
    jest.spyOn(classifier, "getMatchedInclusive").mockReturnValueOnce([]); // No PerceivableTraitScreenReaderOnly
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]); // No visible descendants
    jest.spyOn(classifier, "getParent").mockReturnValueOnce(undefined); // No PerceivableTraitScreenReaderOnly parent
    jest.spyOn(classifier, "getParent").mockReturnValueOnce(undefined); // No CompliantTraitInteractable parent
    jest.spyOn(classifier, "getParent").mockReturnValueOnce(undefined); // No CompliantTraitExplicitlyHidden parent
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // is NOT CompliantComponentInputCheckbox
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false); // is NOT CompliantComponentInputRadio
    jest.spyOn(classifier, "assert").mockReturnValueOnce(true); // is CompliantComponentInputFile

    await VisibilityMisuse.validate(validateMethodArguments);
    expect(response.inapplicableNodes).toEqual([element]);
  });
});
