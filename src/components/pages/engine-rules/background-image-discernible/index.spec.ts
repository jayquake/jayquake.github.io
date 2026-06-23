import { BackgroundImageDiscernible } from "./index";
import type { ValidationMethodArguments } from "../../../test/unit/helpers/validation-method-arguments";
import validationMethodArguments from "../../../test/unit/helpers/validation-method-arguments";

describe("BackgroundImageDiscernible Rule Validation", () => {
  let validateMethodArguments: ValidationMethodArguments;

  beforeEach(() => {
    validateMethodArguments = validationMethodArguments();
    const { classifier } = validateMethodArguments;
    jest.spyOn(classifier, "getOperations").mockReturnValue({
      visibilityInfo: {
        isExplicitlyHiddenFromScreenReader: false,
      },
      colorInfo: {
        backgroundImage: "url('image.png')",
      },
    });
  });

  it("should skip elements that are explicitly hidden from the screen reader", async () => {
    const { response, classifier } = validateMethodArguments;
    const mockImage = document.createElement("div");
    jest.spyOn(classifier, "getOperations").mockReturnValue({
      visibilityInfo: {
        isExplicitlyHiddenFromScreenReader: true,
      },
      colorInfo: {
        backgroundImage: "url('image.png')",
      },
    });
    (classifier.getMatched as jest.Mock).mockReturnValueOnce([mockImage]);

    await BackgroundImageDiscernible.validate(validateMethodArguments);
    expect(response.failedNodes).toEqual([]);
    expect(response.passedNodes).toEqual([]);
  });

  it("should fail background images with no discernible elements", async () => {
    const { response, classifier } = validateMethodArguments;
    const mockImage = document.createElement("div");
    (classifier.getMatched as jest.Mock).mockReturnValueOnce([mockImage]);
    (classifier.getMatchedDirect as jest.Mock).mockReturnValueOnce([]);

    await BackgroundImageDiscernible.validate(validateMethodArguments);

    expect(response.failedNodes).toContain(mockImage);
  });

  it("should fail background images with first discernible element that is not screen-reader-only", async () => {
    const { response, classifier } = validateMethodArguments;
    const mockImage = document.createElement("div");
    const mockDiscernibleElement = document.createElement("span");
    (classifier.getMatched as jest.Mock).mockReturnValueOnce([mockImage]).mockReturnValueOnce([mockDiscernibleElement]);
    (classifier.getMatchedDirect as jest.Mock).mockReturnValueOnce([mockImage]).mockReturnValueOnce([mockDiscernibleElement]);
    (classifier.assert as jest.Mock).mockReturnValue(false);

    await BackgroundImageDiscernible.validate(validateMethodArguments);

    expect(response.failedNodes).toContain(mockImage);
  });

  it("should pass background images with first discernible element that is screen-reader-only", async () => {
    const { response, classifier } = validateMethodArguments;
    const mockImage = document.createElement("div");
    const mockDiscernibleElement = document.createElement("span");
    (classifier.getMatched as jest.Mock).mockReturnValueOnce([mockImage]).mockReturnValueOnce([mockDiscernibleElement]);
    (classifier.getMatchedDirect as jest.Mock).mockReturnValueOnce([mockImage]).mockReturnValueOnce([mockDiscernibleElement]);
    (classifier.assert as jest.Mock).mockReturnValue(true);

    await BackgroundImageDiscernible.validate(validateMethodArguments);

    expect(response.failedNodes).not.toContain(mockImage);
    expect(response.passedNodes).toContain(mockImage);
  });

  it("should mark background image as inapplicable when backgroundImage is base64", async () => {
    const { response, classifier } = validateMethodArguments;
    const mockImage = document.createElement("div");
    jest.spyOn(classifier, "getOperations").mockReturnValue({
      visibilityInfo: {
        isExplicitlyHiddenFromScreenReader: false,
      },
      colorInfo: {
        backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==")',
      },
    });
    (classifier.getMatched as jest.Mock).mockReturnValueOnce([mockImage]);

    await BackgroundImageDiscernible.validate(validateMethodArguments);

    expect(response.inapplicableNodes).toContain(mockImage);
    expect(response.failedNodes).not.toContain(mockImage);
    expect(response.passedNodes).not.toContain(mockImage);
  });

  it("should mark background image as inapplicable when backgroundImage is svg data uri", async () => {
    const { response, classifier } = validateMethodArguments;
    const mockImage = document.createElement("div");
    jest.spyOn(classifier, "getOperations").mockReturnValue({
      visibilityInfo: {
        isExplicitlyHiddenFromScreenReader: false,
      },
      colorInfo: {
        backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E')",
      },
    });
    (classifier.getMatched as jest.Mock).mockReturnValueOnce([mockImage]);

    await BackgroundImageDiscernible.validate(validateMethodArguments);

    expect(response.inapplicableNodes).toContain(mockImage);
    expect(response.failedNodes).not.toContain(mockImage);
    expect(response.passedNodes).not.toContain(mockImage);
  });

  it("should mark background image as inapplicable when backgroundImage is svg file", async () => {
    const { response, classifier } = validateMethodArguments;
    const mockImage = document.createElement("div");
    jest.spyOn(classifier, "getOperations").mockReturnValue({
      visibilityInfo: {
        isExplicitlyHiddenFromScreenReader: false,
      },
      colorInfo: {
        backgroundImage: "url('image.svg')",
      },
    });
    (classifier.getMatched as jest.Mock).mockReturnValueOnce([mockImage]);

    await BackgroundImageDiscernible.validate(validateMethodArguments);

    expect(response.inapplicableNodes).toContain(mockImage);
    expect(response.failedNodes).not.toContain(mockImage);
    expect(response.passedNodes).not.toContain(mockImage);
  });

  it("should fail background images when backgroundImage is null or undefined", async () => {
    const { response, classifier } = validateMethodArguments;
    const mockImage = document.createElement("div");
    jest.spyOn(classifier, "getOperations").mockReturnValue({
      visibilityInfo: {
        isExplicitlyHiddenFromScreenReader: false,
      },
      colorInfo: {
        backgroundImage: null,
      },
    });
    (classifier.getMatched as jest.Mock).mockReturnValueOnce([mockImage]);
    (classifier.getMatchedDirect as jest.Mock).mockReturnValueOnce([]);

    await BackgroundImageDiscernible.validate(validateMethodArguments);

    expect(response.failedNodes).toContain(mockImage);
    expect(response.inapplicableNodes).not.toContain(mockImage);
  });
});
