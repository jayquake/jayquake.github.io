import { LinkTelephoneWarning } from ".";
import type { ValidationMethodArguments } from "../../../test/unit/helpers/validation-method-arguments";
import validationMethodArguments from "../../../test/unit/helpers/validation-method-arguments";

describe("LinkTelephoneWarning Rule Validation", () => {
  let validateMethodArguments: ValidationMethodArguments;

  beforeEach(() => {
    validateMethodArguments = validationMethodArguments();
  });

  it("should pass when there is a warning that the link opens a phone app", async () => {
    const { classifier, document, response } = validateMethodArguments;

    const link = document.createElement("a");
    link.href = "tel:000000001";
    document.body.appendChild(link);

    jest.spyOn(classifier, "getMatched").mockReturnValue([link]);
    jest.spyOn(classifier, "getOperations").mockReturnValue({
      contentInfo: { accessibleName: "Opens phone app", accessibleDescription: "" },
    });

    await LinkTelephoneWarning.validate(validateMethodArguments);

    expect(response.passedNodes).toContain(link);
    expect(response.failedNodes).toHaveLength(0);
  });

  it("should pass when the warning is only present in the accessible description", async () => {
    const { classifier, document, response } = validateMethodArguments;

    const link = document.createElement("a");
    link.href = "tel:000000001";
    document.body.appendChild(link);

    jest.spyOn(classifier, "getMatched").mockReturnValue([link]);
    jest.spyOn(classifier, "getOperations").mockReturnValue({
      contentInfo: { accessibleName: "call us 000000001", accessibleDescription: "Opens phone app" },
    });

    await LinkTelephoneWarning.validate(validateMethodArguments);

    expect(response.passedNodes).toContain(link);
    expect(response.failedNodes).toHaveLength(0);
  });

  it("should fail when there isn't a warning that the link opens phone app", async () => {
    const { classifier, document, response } = validateMethodArguments;

    const link = document.createElement("a");
    link.href = "tel:000000001";
    document.body.appendChild(link);

    jest.spyOn(classifier, "getMatched").mockReturnValue([link]);
    jest.spyOn(classifier, "getOperations").mockReturnValue({
      contentInfo: { accessibleName: "call us 000000001", accessibleDescription: "" },
    });

    await LinkTelephoneWarning.validate(validateMethodArguments);

    expect(response.failedNodes).toContain(link);
    expect(response.passedNodes).toHaveLength(0);
  });

  it("should skip when a link is not a native anchor element", async () => {
    const { classifier, document, response } = validateMethodArguments;

    const link = document.createElement("button");
    link.setAttribute("role", "link");
    document.body.appendChild(link);

    jest.spyOn(classifier, "getMatched").mockReturnValue([link]);
    jest.spyOn(classifier, "getOperations").mockReturnValue({
      contentInfo: { accessibleName: "call us 000000001", accessibleDescription: "" },
    });

    await LinkTelephoneWarning.validate(validateMethodArguments);

    expect(response.passedNodes).toHaveLength(0);
    expect(response.failedNodes).toHaveLength(0);
  });

  it("should skip when a link is not a mailto", async () => {
    const { classifier, document, response } = validateMethodArguments;

    const link = document.createElement("a");
    link.href = "http://example.com";
    document.body.appendChild(link);

    jest.spyOn(classifier, "getOperations").mockReturnValue({
      contentInfo: { accessibleName: "call us 000000001", accessibleDescription: "" },
    });
    jest.spyOn(classifier, "getMatched").mockReturnValue([link]);

    await LinkTelephoneWarning.validate(validateMethodArguments);

    expect(response.passedNodes).toHaveLength(0);
    expect(response.failedNodes).toHaveLength(0);
  });
});
