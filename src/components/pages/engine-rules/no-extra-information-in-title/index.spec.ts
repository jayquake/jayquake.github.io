import { NoExtraInformationInTitle } from "./index";
import type { ValidationMethodArguments } from "../../../test/unit/helpers/validation-method-arguments";
import validationMethodArguments from "../../../test/unit/helpers/validation-method-arguments";

describe("NoExtraInformationInTitle Rule Validation", () => {
  let validateMethodArguments: ValidationMethodArguments;

  beforeEach(() => {
    validateMethodArguments = validationMethodArguments();
    (validateMethodArguments.classifier.getOperations as jest.Mock).mockReturnValue({
      contentInfo: { accessibleName: "", title: "" },
    });
  });

  it("should pass when there are no elements with title attributes", async () => {
    const { response, document } = validateMethodArguments;
    document.querySelectorAll = jest.fn().mockReturnValue([]);

    await NoExtraInformationInTitle.validate(validateMethodArguments);

    expect(response.failedNodes.length).toBe(0);
    expect(response.passedNodes.length).toBe(0);
  });

  it("should be inapplicable when title attribute is empty", async () => {
    const { response, document, classifier } = validateMethodArguments;
    const element = document.createElement("div");
    element.setAttribute("title", " ");
    document.querySelectorAll = jest.fn().mockReturnValue([element]);
    (classifier.assert as jest.Mock)
      .mockReturnValueOnce(true) // element is CompliantTraitVisible
      .mockReturnValueOnce(false); // element is NOT CompliantTraitNameProhibited

    await NoExtraInformationInTitle.validate(validateMethodArguments);

    expect(response.failedNodes.length).toBe(0);
    expect(response.passedNodes.length).toBe(0);
    expect(response.inapplicableNodes.length).toBe(1);
    expect(response.inapplicableNodes).toContain(element);
  });

  it("should be inapplicable when the element has no accessible name", async () => {
    const { response, document, classifier } = validateMethodArguments;
    const element = document.createElement("div");
    element.setAttribute("title", "Example Title");
    document.querySelectorAll = jest.fn().mockReturnValue([element]);
    (classifier.assert as jest.Mock)
      .mockReturnValueOnce(true) // element is CompliantTraitVisible
      .mockReturnValueOnce(false); // element is NOT CompliantTraitNameProhibited
    (classifier.getOperations as jest.Mock).mockReturnValue({
      contentInfo: { accessibleName: "", title: "Example Title" },
    });

    await NoExtraInformationInTitle.validate(validateMethodArguments);

    expect(response.failedNodes.length).toBe(0);
    expect(response.passedNodes.length).toBe(0);
    expect(response.inapplicableNodes.length).toBe(1);
    expect(response.inapplicableNodes).toContain(element);
  });

  it("should be inapplicable when the element is name prohibited", async () => {
    const { response, document, classifier } = validateMethodArguments;
    const element = document.createElement("div");
    element.setAttribute("title", "Example Title");
    document.querySelectorAll = jest.fn().mockReturnValue([element]);
    (classifier.assert as jest.Mock)
      .mockReturnValueOnce(true) // element is CompliantTraitVisible
      .mockReturnValueOnce(true); // element is CompliantTraitNameProhibited
    (classifier.getOperations as jest.Mock).mockReturnValue({
      contentInfo: { accessibleName: "Different Text", title: "Example Title" },
    });

    await NoExtraInformationInTitle.validate(validateMethodArguments);

    expect(response.failedNodes.length).toBe(0);
    expect(response.passedNodes.length).toBe(0);
    expect(response.inapplicableNodes.length).toBe(1);
    expect(response.inapplicableNodes).toContain(element);
  });

  it("should pass when title attribute is in accessibleName", async () => {
    const { response, document, classifier } = validateMethodArguments;
    const element = document.createElement("div");
    element.setAttribute("title", "Example Title");
    document.querySelectorAll = jest.fn().mockReturnValue([element]);
    (classifier.assert as jest.Mock)
      .mockReturnValueOnce(true) // element is CompliantTraitVisible
      .mockReturnValueOnce(false); // element is NOT CompliantTraitNameProhibited
    (classifier.getOperations as jest.Mock).mockReturnValue({
      contentInfo: { accessibleName: "Example Title", title: "Example Title" },
    });

    await NoExtraInformationInTitle.validate(validateMethodArguments);

    expect(response.failedNodes.length).toBe(0);
    expect(response.passedNodes.length).toBe(1);
    expect(response.passedNodes).toContain(element);
  });

  it("should fail when title attribute is not in accessibleName", async () => {
    const { response, document, classifier } = validateMethodArguments;
    const element = document.createElement("div");
    element.setAttribute("title", "Example Title");
    document.querySelectorAll = jest.fn().mockReturnValue([element]);
    (classifier.assert as jest.Mock)
      .mockReturnValueOnce(true) // element is CompliantTraitVisible
      .mockReturnValueOnce(false); // element is NOT CompliantTraitNameProhibited
    (classifier.getOperations as jest.Mock).mockReturnValue({
      contentInfo: { accessibleName: "Different Text", title: "Example Title" },
    });

    await NoExtraInformationInTitle.validate(validateMethodArguments);

    expect(response.failedNodes.length).toBe(1);
    expect(response.passedNodes.length).toBe(0);
    expect(response.failedNodes).toContain(element);
  });

  it("should be inapplicable when element is not visible according to CompliantTraitVisible", async () => {
    const { response, document, classifier } = validateMethodArguments;
    const element = document.createElement("div");
    element.setAttribute("title", "Example Title");
    document.querySelectorAll = jest.fn().mockReturnValue([element]);
    (classifier.assert as jest.Mock).mockReturnValue(false);
    (classifier.getOperations as jest.Mock).mockReturnValue({
      contentInfo: { accessibleName: "Different Text", title: "Example Title" },
    });

    await NoExtraInformationInTitle.validate(validateMethodArguments);

    expect(response.failedNodes.length).toBe(0);
    expect(response.passedNodes.length).toBe(0);
    expect(response.inapplicableNodes.length).toBe(1);
    expect(response.inapplicableNodes).toContain(element);
  });

  it("should fail when element is visible according to CompliantTraitVisible and title is not in accessibleName", async () => {
    const { response, document, classifier } = validateMethodArguments;
    const element = document.createElement("div");
    element.setAttribute("title", "Example Title");
    document.querySelectorAll = jest.fn().mockReturnValue([element]);
    (classifier.assert as jest.Mock)
      .mockReturnValueOnce(true) // element is CompliantTraitVisible
      .mockReturnValueOnce(false); // element is NOT CompliantTraitNameProhibited
    (classifier.getOperations as jest.Mock).mockReturnValue({
      contentInfo: { accessibleName: "Different Text", title: "Example Title" },
    });

    await NoExtraInformationInTitle.validate(validateMethodArguments);

    expect(response.failedNodes.length).toBe(1);
    expect(response.passedNodes.length).toBe(0);
    expect(response.failedNodes).toContain(element);
  });
});
