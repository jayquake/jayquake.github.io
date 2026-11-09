import { InputDiscernible } from ".";
import type { ValidationMethodArguments } from "../../../test/unit/helpers/validation-method-arguments";
import validationMethodArguments from "../../../test/unit/helpers/validation-method-arguments";

describe("InputDiscernible Rule Validation", () => {
  let validateMethodArguments: ValidationMethodArguments;

  beforeEach(() => {
    validateMethodArguments = validationMethodArguments();
    (validateMethodArguments.classifier.assert as jest.Mock).mockReturnValue(false);
  });

  it("should add input-like elements to passed nodes if they have aria-label", async () => {
    const { response, classifier } = validateMethodArguments;
    (classifier.getMatched as jest.Mock).mockReturnValue([{}, {}, {}]);
    (classifier.getOperations as jest.Mock).mockImplementation(() => ({
      contentInfo: { accessibleName: "1" },
    }));

    await InputDiscernible.validate(validateMethodArguments);

    expect(response.failedNodes.length).toBe(0);
    expect(response.passedNodes.length).toBe(3);
  });

  it("should ignore elements that are not input-like", async () => {
    const { response, classifier } = validateMethodArguments;
    (classifier.getMatched as jest.Mock).mockReturnValue([]);

    await InputDiscernible.validate(validateMethodArguments);

    expect(response.failedNodes.length).toBe(0);
    expect(response.passedNodes.length).toBe(0);
  });

  it("should add input-like elements to failed nodes if they have no label associated with them", async () => {
    const { response, classifier } = validateMethodArguments;
    (classifier.getOperations as jest.Mock).mockImplementation(() => ({
      contentInfo: { accessibleName: "" },
    }));
    const elements = [{ id: 1 }, { id: 1 }, { id: 1 }];
    (classifier.getMatched as jest.Mock).mockReturnValue(elements);

    await InputDiscernible.validate(validateMethodArguments);

    expect(response.failedNodes).toEqual(elements);
    expect(response.passedNodes.length).toBe(0);
  });

  it("should add name prohibited elements to inapplicable nodes", async () => {
    const { response, classifier } = validateMethodArguments;
    const element = { id: 1 };
    (classifier.getMatched as jest.Mock).mockReturnValue([element]);
    (classifier.assert as jest.Mock).mockReturnValue(true); // element is CompliantTraitNameProhibited
    (classifier.getOperations as jest.Mock).mockImplementation(() => ({
      contentInfo: { accessibleName: "" },
    }));

    await InputDiscernible.validate(validateMethodArguments);

    expect(response.failedNodes.length).toBe(0);
    expect(response.passedNodes.length).toBe(0);
    expect(response.inapplicableNodes).toEqual([element]);
  });
});
