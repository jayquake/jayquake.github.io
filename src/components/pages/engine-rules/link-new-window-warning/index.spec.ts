import { LinkNewWindowWarning } from ".";
import type { ValidationMethodArguments } from "../../../test/unit/helpers/validation-method-arguments";
import validationMethodArguments from "../../../test/unit/helpers/validation-method-arguments";

describe("LinkNewWindowWarning Rule Validation", () => {
  let validateMethodArguments: ValidationMethodArguments;

  beforeEach(() => {
    validateMethodArguments = validationMethodArguments();
  });

  it("should pass when links do not open in a new window", async () => {
    const { classifier, document, response } = validateMethodArguments;

    const link = document.createElement("a");
    link.href = "http://example.com";
    link.target = "_self";
    document.body.appendChild(link);

    jest.spyOn(classifier, "getMatched").mockReturnValue([link]);
    jest.spyOn(classifier, "getOperations").mockReturnValue({
      contentInfo: { accessibleName: "Example Link", accessibleDescription: "" },
    });

    await LinkNewWindowWarning.validate(validateMethodArguments);

    expect(response.failedNodes.length).toBe(0);
  });

  it("should pass when links open in a new window and have new window in their content", async () => {
    const { classifier, document, response } = validateMethodArguments;

    const link = document.createElement("a");
    link.href = "http://example.com";
    link.target = "_blank";
    document.body.appendChild(link);

    jest.spyOn(classifier, "getMatched").mockReturnValue([link]);
    jest.spyOn(classifier, "getOperations").mockReturnValue({
      contentInfo: { accessibleName: "Example Link to new window", accessibleDescription: "" },
    });

    await LinkNewWindowWarning.validate(validateMethodArguments);

    expect(response.failedNodes.length).toBe(0);
  });

  it("should pass when warning is only present in the accessible description", async () => {
    const { classifier, document, response } = validateMethodArguments;

    const link = document.createElement("a");
    link.href = "http://example.com";
    link.target = "_blank";
    document.body.appendChild(link);

    jest.spyOn(classifier, "getMatched").mockReturnValue([link]);
    jest.spyOn(classifier, "getOperations").mockReturnValue({
      contentInfo: { accessibleName: "Example Link", accessibleDescription: "Opens in a new window" },
    });

    await LinkNewWindowWarning.validate(validateMethodArguments);

    expect(response.passedNodes).toContain(link);
    expect(response.failedNodes).toHaveLength(0);
  });

  it("should fail when links open in a new window and don't have new window in their content", async () => {
    const { classifier, document, response } = validateMethodArguments;

    const link = document.createElement("a");
    link.href = "http://example.com";
    link.target = "_blank";
    document.body.appendChild(link);

    jest.spyOn(classifier, "getMatched").mockReturnValue([link]);
    jest.spyOn(classifier, "getOperations").mockReturnValue({
      contentInfo: { accessibleName: "Example Link to somewhere else", accessibleDescription: "" },
    });

    await LinkNewWindowWarning.validate(validateMethodArguments);

    expect(response.failedNodes.length).toBe(1);
    expect(response.failedNodes[0]).toBe(link);
  });
});
