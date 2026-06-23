import type { ValidationMethodArguments } from "../../../test/unit/helpers/validation-method-arguments";
import validationMethodArguments from "../../../test/unit/helpers/validation-method-arguments";
import { LinkMismatch } from ".";

describe("LinkMismatch Rule Validation", () => {
  let validateMethodArguments: ValidationMethodArguments;
  let getMatchedSpy: jest.SpyInstance;
  let assertSpy: jest.SpyInstance;

  beforeEach(() => {
    validateMethodArguments = validationMethodArguments();
    getMatchedSpy = jest.spyOn(validateMethodArguments.classifier, "getMatched");
    assertSpy = jest.spyOn(validateMethodArguments.classifier, "assert");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should not add nodes to failed if there are no perceivable links elements", async () => {
    const { response } = validateMethodArguments;
    getMatchedSpy.mockReturnValueOnce([]);

    await LinkMismatch.validate(validateMethodArguments);

    expect(response.passedNodes.length).toBe(0);
    expect(response.failedNodes.length).toBe(0);
  });

  it("should not add nodes to failed if the element is a compliant link", async () => {
    const { response, document } = validateMethodArguments;
    const link = document.createElement("a");
    getMatchedSpy.mockReturnValueOnce([link]);
    assertSpy.mockReturnValueOnce(true);

    await LinkMismatch.validate(validateMethodArguments);

    expect(response.passedNodes.length).toBe(1);
    expect(response.passedNodes).toEqual([link]);
    expect(response.failedNodes.length).toBe(0);
  });

  it("should add nodes to failed if the element is not a compliant link", async () => {
    const { response, document } = validateMethodArguments;
    const link = document.createElement("a");
    getMatchedSpy.mockReturnValueOnce([link]);
    assertSpy.mockReturnValueOnce(false);

    await LinkMismatch.validate(validateMethodArguments);

    expect(response.passedNodes.length).toBe(0);
    expect(response.failedNodes.length).toBe(1);
    expect(response.failedNodes).toEqual([link]);
  });
});
