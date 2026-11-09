import { DialogModalDiscernible } from ".";
import type { ValidationMethodArguments } from "~test-unit/helpers/validation-method-arguments";
import validationMethodArguments from "../../../test/unit/helpers/validation-method-arguments";

describe("DialogModalDiscernible Rule Validation", () => {
  let validateMethodArguments: ValidationMethodArguments;

  beforeEach(() => {
    validateMethodArguments = validationMethodArguments();
  });

  it("should not add any nodes when no modals are detected", async () => {
    const { response, classifier } = validateMethodArguments;

    (classifier.getMatched as jest.Mock).mockReturnValue([]);

    await DialogModalDiscernible.validate(validateMethodArguments);

    expect(response.passedNodes).toHaveLength(0);
    expect(response.failedNodes).toHaveLength(0);
    expect(response.inapplicableNodes).toHaveLength(0);
  });

  it("should fail a modal that has no accessible name", async () => {
    const { response, classifier } = validateMethodArguments;

    const modal = document.createElement("div");

    (classifier.getMatched as jest.Mock).mockReturnValue([modal]);
    (classifier.getOperations as jest.Mock).mockReturnValue({ contentInfo: { accessibleName: "" } });

    await DialogModalDiscernible.validate(validateMethodArguments);

    expect(response.failedNodes).toContain(modal);
    expect(response.passedNodes).toHaveLength(0);
  });

  it("should pass a modal that has an accessible name", async () => {
    const { response, classifier } = validateMethodArguments;

    const modal = document.createElement("dialog");

    (classifier.getMatched as jest.Mock).mockReturnValue([modal]);
    (classifier.getOperations as jest.Mock).mockReturnValue({ contentInfo: { accessibleName: "Subscribe to Newsletter" } });

    await DialogModalDiscernible.validate(validateMethodArguments);

    expect(response.passedNodes).toContain(modal);
    expect(response.failedNodes).toHaveLength(0);
  });

  it("should handle multiple modals with mixed accessible names", async () => {
    const { response, classifier } = validateMethodArguments;

    const labelledModal = document.createElement("dialog");
    const unlabelledModal = document.createElement("div");

    (classifier.getMatched as jest.Mock).mockReturnValue([labelledModal, unlabelledModal]);
    (classifier.getOperations as jest.Mock).mockImplementation((element) => {
      if (element === labelledModal) {
        return { contentInfo: { accessibleName: "Confirm Order" } };
      }
      return { contentInfo: { accessibleName: "" } };
    });

    await DialogModalDiscernible.validate(validateMethodArguments);

    expect(response.passedNodes).toContain(labelledModal);
    expect(response.failedNodes).toContain(unlabelledModal);
    expect(response.passedNodes).toHaveLength(1);
    expect(response.failedNodes).toHaveLength(1);
    expect(response.inapplicableNodes).toHaveLength(0);
  });
});
