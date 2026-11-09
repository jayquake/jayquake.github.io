import { NavigationMismatch } from ".";
import type { ValidationMethodArguments } from "../../../test/unit/helpers/validation-method-arguments";
import validationMethodArguments from "../../../test/unit/helpers/validation-method-arguments";

describe("NavigationMismatch Rule Validation", () => {
  let validateMethodArguments: ValidationMethodArguments;

  beforeEach(() => {
    validateMethodArguments = validationMethodArguments();
  });

  it("should pass when no navigation element is found in the page", async () => {
    const { classifier, response } = validateMethodArguments;

    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]).mockReturnValueOnce([]);

    await NavigationMismatch.validate(validateMethodArguments);

    expect(response.passedNodes).toHaveLength(0);
    expect(response.failedNodes).toHaveLength(0);
  });

  it("should pass when navigation element is marked correctly", async () => {
    const { classifier, response } = validateMethodArguments;

    const nav = document.createElement("div");
    nav.setAttribute("role", "navigation");
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([nav]).mockReturnValueOnce([]);
    jest.spyOn(classifier, "assert").mockReturnValueOnce(true);

    await NavigationMismatch.validate(validateMethodArguments);

    expect(response.passedNodes).toContain(nav);
    expect(response.failedNodes).toHaveLength(0);
  });

  it("should fail when navigation element is not marked correctly", async () => {
    const { classifier, response } = validateMethodArguments;

    const nav = document.createElement("div");
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([nav]).mockReturnValueOnce([]);
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false);

    await NavigationMismatch.validate(validateMethodArguments);

    expect(response.failedNodes).toContain(nav);
    expect(response.passedNodes).toHaveLength(0);
  });

  it("leaves the resolved main navigation to MainNavigationMismatch", async () => {
    const { classifier, response } = validateMethodArguments;
    const nav = document.createElement("div");
    jest
      .spyOn(classifier, "getMatched")
      .mockReturnValueOnce([nav])
      .mockReturnValueOnce(Promise.resolve([nav]));

    await NavigationMismatch.validate(validateMethodArguments);

    expect(response.inapplicableNodes).toEqual([nav]);
    expect(response.failedNodes).toEqual([]);
    expect(classifier.assert).not.toHaveBeenCalled();
  });
});
