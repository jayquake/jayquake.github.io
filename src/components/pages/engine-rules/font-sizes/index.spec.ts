import { FontSizes } from ".";
import type { ValidationMethodArguments } from "../../../test/unit/helpers/validation-method-arguments";
import validationMethodArguments from "../../../test/unit/helpers/validation-method-arguments";

/**
 * Sets up classifier.getMatched() to return:
 * 1st call: the main matched elements list
 * next 4 calls: superscript/subscript matches (default empty unless overridden)
 */
const mockGetMatchedSequence = (getMatchedMock: jest.Mock, element: unknown, overrides: Partial<Record<"sup1" | "sup2" | "sub1" | "sub2", unknown[]>> = {}): void => {
  const defaults: Record<"sup1" | "sup2" | "sub1" | "sub2", unknown[]> = {
    sup1: [],
    sup2: [],
    sub1: [],
    sub2: [],
    ...overrides,
  };

  getMatchedMock.mockImplementationOnce(() => [element]); // elements
  getMatchedMock.mockImplementationOnce(() => defaults.sup1); // CompliantComponentSuperscript
  getMatchedMock.mockImplementationOnce(() => defaults.sup2); // PerceivableComponentSuperscript
  getMatchedMock.mockImplementationOnce(() => defaults.sub1); // CompliantComponentSubscript
  getMatchedMock.mockImplementationOnce(() => defaults.sub2); // PerceivableComponentSubscript
};

describe("FontSizes Rule Validation", () => {
  let validateMethodArguments: ValidationMethodArguments;
  let matchedElement: Element;

  beforeEach(() => {
    validateMethodArguments = validationMethodArguments();
    mockGetMatchedSequence(validateMethodArguments.classifier.getMatched as jest.Mock, {} as unknown as Element);
  });

  it("should pass when an element has a readable font-size", async () => {
    const { response } = validateMethodArguments;

    jest.spyOn(validateMethodArguments.classifier, "getOperations").mockReturnValue({
      typographyInfo: { fontSize: 12 },
    });

    await FontSizes.validate(validateMethodArguments);

    expect(response.passedNodes.length).toBe(1);
    expect(response.failedNodes.length).toBe(0);
  });

  it("should fail when an element doesn't have a readable font-size", async () => {
    const { response } = validateMethodArguments;

    jest.spyOn(validateMethodArguments.classifier, "getOperations").mockReturnValue({
      typographyInfo: { fontSize: 10 },
    });

    await FontSizes.validate(validateMethodArguments);

    expect(response.passedNodes.length).toBe(0);
    expect(response.failedNodes.length).toBe(1);
  });

  it("should pass when superscript element has small font-size", async () => {
    const { response } = validateMethodArguments;

    (validateMethodArguments.classifier.getMatched as jest.Mock).mockReset();
    mockGetMatchedSequence(validateMethodArguments.classifier.getMatched as jest.Mock, matchedElement, { sup1: [matchedElement] });

    jest.spyOn(validateMethodArguments.classifier, "getOperations").mockReturnValue({
      typographyInfo: { fontSize: 8 },
      detectedComponents: ["compliant-component-superscript"],
    });

    await FontSizes.validate(validateMethodArguments);

    expect(response.passedNodes.length).toBe(1);
    expect(response.failedNodes.length).toBe(0);
  });
});
