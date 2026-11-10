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
    matchedElement = {} as unknown as Element;
    mockGetMatchedSequence(validateMethodArguments.classifier.getMatched as jest.Mock, matchedElement);
  });

  const mockOperations = (overrides: any = {}) => ({
    contentInfo: { visibleText: "test" },
    typographyInfo: { fontSize: 12 },
    pseudoBeforeInfo: { visibleText: "", fontSize: 12 },
    pseudoAfterInfo: { visibleText: "", fontSize: 12 },
    ...overrides,
  });

  it("should pass when an element has a readable font-size", async () => {
    const { response } = validateMethodArguments;

    jest.spyOn(validateMethodArguments.classifier, "getOperations").mockReturnValue(mockOperations({ typographyInfo: { fontSize: 12 } }));

    await FontSizes.validate(validateMethodArguments);

    expect(response.passedNodes.length).toBe(1);
    expect(response.failedNodes.length).toBe(0);
  });

  it("should fail when an element doesn't have a readable font-size", async () => {
    const { response } = validateMethodArguments;

    jest.spyOn(validateMethodArguments.classifier, "getOperations").mockReturnValue(mockOperations({ typographyInfo: { fontSize: 10 } }));

    await FontSizes.validate(validateMethodArguments);

    expect(response.passedNodes.length).toBe(0);
    expect(response.failedNodes.length).toBe(1);
  });

  it("should pass when font-size is exactly 12px (boundary condition)", async () => {
    const { response } = validateMethodArguments;

    jest.spyOn(validateMethodArguments.classifier, "getOperations").mockReturnValue(mockOperations({ typographyInfo: { fontSize: 12 } }));

    await FontSizes.validate(validateMethodArguments);

    expect(response.passedNodes.length).toBe(1);
    expect(response.failedNodes.length).toBe(0);
  });

  it("should fail when font-size is 11px (just below threshold)", async () => {
    const { response } = validateMethodArguments;

    jest.spyOn(validateMethodArguments.classifier, "getOperations").mockReturnValue(mockOperations({ typographyInfo: { fontSize: 11 } }));

    await FontSizes.validate(validateMethodArguments);

    expect(response.passedNodes.length).toBe(0);
    expect(response.failedNodes.length).toBe(1);
  });

  it("should pass when superscript element (CompliantComponentSuperscript) has small font-size", async () => {
    const { response } = validateMethodArguments;

    (validateMethodArguments.classifier.getMatched as jest.Mock).mockReset();
    mockGetMatchedSequence(validateMethodArguments.classifier.getMatched as jest.Mock, matchedElement, { sup1: [matchedElement] });

    jest.spyOn(validateMethodArguments.classifier, "getOperations").mockReturnValue(mockOperations({ typographyInfo: { fontSize: 8 } }));

    await FontSizes.validate(validateMethodArguments);

    expect(response.passedNodes.length).toBe(1);
    expect(response.failedNodes.length).toBe(0);
  });

  it("should pass when superscript element (PerceivableComponentSuperscript) has small font-size", async () => {
    const { response } = validateMethodArguments;

    (validateMethodArguments.classifier.getMatched as jest.Mock).mockReset();
    mockGetMatchedSequence(validateMethodArguments.classifier.getMatched as jest.Mock, matchedElement, { sup2: [matchedElement] });

    jest.spyOn(validateMethodArguments.classifier, "getOperations").mockReturnValue(mockOperations({ typographyInfo: { fontSize: 8 } }));

    await FontSizes.validate(validateMethodArguments);

    expect(response.passedNodes.length).toBe(1);
    expect(response.failedNodes.length).toBe(0);
  });

  it("should pass when subscript element (CompliantComponentSubscript) has small font-size", async () => {
    const { response } = validateMethodArguments;

    (validateMethodArguments.classifier.getMatched as jest.Mock).mockReset();
    mockGetMatchedSequence(validateMethodArguments.classifier.getMatched as jest.Mock, matchedElement, { sub1: [matchedElement] });

    jest.spyOn(validateMethodArguments.classifier, "getOperations").mockReturnValue(mockOperations({ typographyInfo: { fontSize: 8 } }));

    await FontSizes.validate(validateMethodArguments);

    expect(response.passedNodes.length).toBe(1);
    expect(response.failedNodes.length).toBe(0);
  });

  it("should pass when subscript element (PerceivableComponentSubscript) has small font-size", async () => {
    const { response } = validateMethodArguments;

    (validateMethodArguments.classifier.getMatched as jest.Mock).mockReset();
    mockGetMatchedSequence(validateMethodArguments.classifier.getMatched as jest.Mock, matchedElement, { sub2: [matchedElement] });

    jest.spyOn(validateMethodArguments.classifier, "getOperations").mockReturnValue(mockOperations({ typographyInfo: { fontSize: 8 } }));

    await FontSizes.validate(validateMethodArguments);

    expect(response.passedNodes.length).toBe(1);
    expect(response.failedNodes.length).toBe(0);
  });

  it("should use pseudo-before font-size when element has no visible text", async () => {
    const { response } = validateMethodArguments;

    jest.spyOn(validateMethodArguments.classifier, "getOperations").mockReturnValue(
      mockOperations({
        contentInfo: { visibleText: "" },
        pseudoBeforeInfo: { visibleText: "before text", fontSize: 14 },
        typographyInfo: { fontSize: 10 },
      })
    );

    await FontSizes.validate(validateMethodArguments);

    expect(response.passedNodes.length).toBe(1);
    expect(response.failedNodes.length).toBe(0);
  });

  it("should use pseudo-after font-size when element has no visible text and no pseudo-before", async () => {
    const { response } = validateMethodArguments;

    jest.spyOn(validateMethodArguments.classifier, "getOperations").mockReturnValue(
      mockOperations({
        contentInfo: { visibleText: "" },
        pseudoBeforeInfo: { visibleText: "", fontSize: 10 },
        pseudoAfterInfo: { visibleText: "after text", fontSize: 13 },
        typographyInfo: { fontSize: 10 },
      })
    );

    await FontSizes.validate(validateMethodArguments);

    expect(response.passedNodes.length).toBe(1);
    expect(response.failedNodes.length).toBe(0);
  });

  it("should fail when pseudo-element font-size is too small", async () => {
    const { response } = validateMethodArguments;

    jest.spyOn(validateMethodArguments.classifier, "getOperations").mockReturnValue(
      mockOperations({
        contentInfo: { visibleText: "" },
        pseudoAfterInfo: { visibleText: "after text", fontSize: 10 },
        typographyInfo: { fontSize: 10 },
      })
    );

    await FontSizes.validate(validateMethodArguments);

    expect(response.passedNodes.length).toBe(0);
    expect(response.failedNodes.length).toBe(1);
  });
});
