import { VisibilityMisuse } from ".";
import type { ValidationMethodArguments } from "../../../test/unit/helpers/validation-method-arguments";
import validationMethodArguments from "../../../test/unit/helpers/validation-method-arguments";
import { expect } from "playwright/test";

describe("VisibilityMisuse Rule Validation", () => {
  let validateMethodArguments: ValidationMethodArguments;

  beforeEach(() => {
    validateMethodArguments = validationMethodArguments();
  });

  it("should add srOnlyElement to inapplicableNodes", async () => {
    const { classifier, response } = validateMethodArguments;
    const element = document.createElement("div");

    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([element]);
    jest.spyOn(classifier, "assert").mockReturnValueOnce(true);
    await VisibilityMisuse.validate(validateMethodArguments);
    expect(response.inapplicableNodes).toEqual([element]);
  });

  it("should add element with srOnly parent to inapplicableNodes", async () => {
    const { classifier, response } = validateMethodArguments;
    const element = document.createElement("div");
    const parent = document.createElement("div");

    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([element]);
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false);
    jest.spyOn(classifier, "getParent").mockReturnValue(parent);

    await VisibilityMisuse.validate(validateMethodArguments);
    expect(response.inapplicableNodes).toEqual([element]);
  });

  it("should add element with interactable parent and is all the srVisibile text of the parent to inapplicableNodes", async () => {
    const { classifier, response } = validateMethodArguments;
    const element = document.createElement("div");
    const parent = document.createElement("div");

    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([element]);
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]);
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false);
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
    const { classifier, response } = validateMethodArguments;
    const element = document.createElement("div");

    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([element]);
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]);
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false);
    jest.spyOn(classifier, "assert").mockReturnValueOnce(true);
    await VisibilityMisuse.validate(validateMethodArguments);
    expect(response.failedNodes).toEqual([element]);
  });

  it("should add not compliant visible element to passedNodes", async () => {
    const { classifier, response } = validateMethodArguments;
    const element = document.createElement("div");

    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([element]);
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]);
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false);
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false);
    await VisibilityMisuse.validate(validateMethodArguments);
    expect(response.passedNodes).toEqual([element]);
  });

  it("should add nested non-compliant visible element to passedNodes", async () => {
    const { classifier, response } = validateMethodArguments;
    const element = document.createElement("div");
    const parent = document.createElement("div");
    parent.appendChild(element);

    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([parent]);
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([element]);
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false);

    await VisibilityMisuse.validate(validateMethodArguments);
    expect(response.inapplicableNodes).toEqual([parent]);
  });

  it("should add to inapplicableNodes a 'failed' element that has an explicitly-hidden ancestor", async () => {
    const { classifier, response } = validateMethodArguments;
    const parent = document.createElement("div");
    const element = document.createElement("div");
    parent.appendChild(element);

    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([parent, element]);
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]);
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]);
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false);
    jest.spyOn(classifier, "assert").mockReturnValueOnce(true);
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false);
    jest.spyOn(classifier, "assert").mockReturnValueOnce(true);
    jest.spyOn(classifier, "getParent").mockReturnValueOnce(undefined);
    jest.spyOn(classifier, "getParent").mockReturnValueOnce(undefined);
    jest.spyOn(classifier, "getParent").mockReturnValueOnce(undefined);
    jest.spyOn(classifier, "getParent").mockReturnValueOnce(undefined);
    jest.spyOn(classifier, "getParent").mockReturnValueOnce(undefined);
    jest.spyOn(classifier, "getParent").mockReturnValueOnce(parent);

    await VisibilityMisuse.validate(validateMethodArguments);
    expect(response.inapplicableNodes).toEqual([element]);
  });

  it("should not add nested compliant visible element to failedNodes", async () => {
    const { classifier, response } = validateMethodArguments;
    const element = document.createElement("div");
    const parent = document.createElement("div");
    parent.appendChild(element);

    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([parent, element]);
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]);
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]);
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false);
    jest.spyOn(classifier, "assert").mockReturnValueOnce(true);
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false);
    jest.spyOn(classifier, "assert").mockReturnValueOnce(true);

    await VisibilityMisuse.validate(validateMethodArguments);
    expect(response.failedNodes).toEqual([parent]);
  });
});
