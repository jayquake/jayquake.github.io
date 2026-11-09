import { CompliantTraitVisible } from "@acsbe/core-engine-classifier";
import { NameProhibitedNoAriaLabel } from ".";
import type { ValidationMethodArguments } from "../../../test/unit/helpers/validation-method-arguments";
import validationMethodArguments from "../../../test/unit/helpers/validation-method-arguments";

describe("NameProhibitedNoAriaLabel Rule Validation", () => {
  let validateMethodArguments: ValidationMethodArguments;

  beforeEach(() => {
    validateMethodArguments = validationMethodArguments();
    validateMethodArguments.classifier.assert = jest.fn().mockReturnValue(true);
    document.body.innerHTML = "";
  });

  it("should pass with inapplicable nodes when the element is not visible", async () => {
    const element = document.createElement("div");
    document.body.appendChild(element);

    validateMethodArguments.classifier.getMatched = jest.fn().mockReturnValue([element]);
    validateMethodArguments.classifier.getOperations = jest.fn().mockReturnValue({ contentInfo: { ariaLabelText: "label" } });
    validateMethodArguments.classifier.assert = jest.fn().mockImplementation((_el, trait) => {
      if (trait === CompliantTraitVisible) {
        return false;
      }
      return true;
    });

    await NameProhibitedNoAriaLabel.validate(validateMethodArguments);

    expect(validateMethodArguments.response.failedNodes).toHaveLength(0);
    expect(validateMethodArguments.response.inapplicableNodes).toHaveLength(1);
  });

  it("should fail divs with name-prohibited roles with label", async () => {
    const element = document.createElement("div");
    document.body.appendChild(element);

    validateMethodArguments.classifier.getMatched = jest.fn().mockReturnValue([element]);
    validateMethodArguments.classifier.getOperations = jest.fn().mockReturnValue({ contentInfo: { ariaLabelText: "label" } });

    await NameProhibitedNoAriaLabel.validate(validateMethodArguments);

    expect(validateMethodArguments.response.failedNodes).toHaveLength(1);
    expect(validateMethodArguments.response.passedNodes).toHaveLength(0);
  });

  it("should pass divs with name-prohibited roles without label", async () => {
    const element = document.createElement("div");
    document.body.appendChild(element);

    validateMethodArguments.classifier.getMatched = jest.fn().mockReturnValue([element]);
    validateMethodArguments.classifier.getOperations = jest.fn().mockReturnValue({ contentInfo: { ariaLabelText: "" } });

    await NameProhibitedNoAriaLabel.validate(validateMethodArguments);

    expect(validateMethodArguments.response.failedNodes).toHaveLength(0);
    expect(validateMethodArguments.response.passedNodes).toHaveLength(1);
  });

  it("should pass node with roles that are not name-prohibited and has label", async () => {
    document.body.innerHTML = "";
    const element = document.createElement("div");
    document.body.appendChild(element);

    validateMethodArguments.classifier.getMatched = jest.fn().mockReturnValue([]);
    validateMethodArguments.classifier.getOperations = jest.fn().mockReturnValue({ contentInfo: { ariaLabelText: "label" } });

    await NameProhibitedNoAriaLabel.validate(validateMethodArguments);

    expect(validateMethodArguments.response.failedNodes).toHaveLength(0);
    expect(validateMethodArguments.response.passedNodes).toHaveLength(0);
  });
});
