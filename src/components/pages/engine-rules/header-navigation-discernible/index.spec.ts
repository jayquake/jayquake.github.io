import { HeaderNavigationDiscernible } from "./index";
import type { ValidationMethodArguments } from "~test-unit/helpers/validation-method-arguments";
import validationMethodArguments from "../../../test/unit/helpers/validation-method-arguments";
import { CompliantComponentHeader, CompliantComponentNavigation } from "@acsbe/core-engine-classifier";

describe("HeaderNavigationDiscernible Rule Validation", () => {
  let validateMethodArguments: ValidationMethodArguments;

  beforeEach(() => {
    validateMethodArguments = validationMethodArguments();
  });

  it("should pass when all header navigation elements have accessible names", async () => {
    const { classifier } = validateMethodArguments;
    const headerNav = document.createElement("nav");
    (classifier.getMatched as jest.Mock).mockReturnValue([headerNav]);
    (classifier.getOperations as jest.Mock).mockReturnValue({
      contentInfo: { accessibleName: "Header Menu" },
    });

    await HeaderNavigationDiscernible.validate(validateMethodArguments);

    const { response } = validateMethodArguments;
    expect(response.failedNodes.length).toBe(0);
    expect(response.passedNodes.length).toBe(1);
    expect(response.passedNodes).toContain(headerNav);
  });

  it("should fail when a header navigation element does not have an accessible name", async () => {
    const { response, classifier } = validateMethodArguments;
    const headerNav = document.createElement("nav");
    (classifier.getMatched as jest.Mock).mockReturnValue([headerNav]);
    (classifier.getOperations as jest.Mock).mockReturnValue({
      contentInfo: { accessibleName: "" },
    });

    await HeaderNavigationDiscernible.validate(validateMethodArguments);

    expect(response.failedNodes.length).toBe(1);
    expect(response.passedNodes.length).toBe(0);
    expect(response.failedNodes).toContain(headerNav);
  });

  it("should handle multiple header navigation elements correctly", async () => {
    const { response, classifier } = validateMethodArguments;

    const headerElement1 = document.createElement("header");
    const headerElement2 = document.createElement("header");

    const navElement1 = document.createElement("nav");
    const navElement2 = document.createElement("nav");

    // Mocking getMatched for footerElements (top-level call)
    (classifier.getMatched as jest.Mock).mockImplementation((components, parentElement) => {
      if (components[0] === CompliantComponentHeader) {
        if (!parentElement) {
          // Top-level call to get footers
          return [headerElement1, headerElement2];
        }
      }
      if (components[0] === CompliantComponentNavigation) {
        if (parentElement === headerElement1) {
          return [navElement1]; // navElement1 is inside footerElement1
        }
        if (parentElement === headerElement2) {
          return [navElement2]; // navElement2 is inside footerElement2
        }
      }
      return [];
    });

    // Mocking getOperations for accessible names of nav elements
    (classifier.getOperations as jest.Mock).mockImplementation((element) => {
      if (element === navElement1) {
        return { contentInfo: { accessibleName: "Header Navigation 1" } }; // Should pass
      }
      if (element === navElement2) {
        return { contentInfo: { accessibleName: "" } }; // Should fail
      }
      return { contentInfo: { accessibleName: "" } };
    });

    await HeaderNavigationDiscernible.validate(validateMethodArguments);

    expect(response.failedNodes.length).toBe(1);
    expect(response.passedNodes.length).toBe(1);
    expect(response.failedNodes).toContain(navElement2);
    expect(response.passedNodes).toContain(navElement1);
  });

  it("should pass when there are no header navigation elements", async () => {
    const { response, classifier } = validateMethodArguments;
    (classifier.getMatched as jest.Mock).mockReturnValue([]);

    await HeaderNavigationDiscernible.validate(validateMethodArguments);

    expect(response.failedNodes.length).toBe(0);
    expect(response.passedNodes.length).toBe(0);
  });

  it("should mark a main navigation as inapplicable", async () => {
    const { response, classifier } = validateMethodArguments;

    const headerElement = document.createElement("header");
    const headerNav = document.createElement("nav");

    (classifier.getMatched as jest.Mock).mockImplementation((components, parentElement) => {
      if (components[0] === CompliantComponentHeader && !parentElement) {
        return [headerElement];
      }
      if (components[0] === CompliantComponentNavigation && parentElement === headerElement) {
        return [headerNav];
      }
      return [];
    });

    (classifier.assert as jest.Mock).mockResolvedValue(true);

    (classifier.getOperations as jest.Mock).mockReturnValue({
      contentInfo: { accessibleName: "" },
    });

    await HeaderNavigationDiscernible.validate(validateMethodArguments);

    expect(response.inapplicableNodes).toContain(headerNav);
    expect(response.inapplicableNodes.length).toBe(1);
  });

  it("should mark a breadcrumb navigation as inapplicable", async () => {
    const { response, classifier } = validateMethodArguments;

    const headerElement = document.createElement("header");
    const headerNav = document.createElement("nav");

    (classifier.getMatched as jest.Mock).mockImplementation((components, parentElement) => {
      if (components[0] === CompliantComponentHeader && !parentElement) return [headerElement];
      if (components[0] === CompliantComponentNavigation && parentElement === headerElement) return [headerNav];
      return [];
    });

    // 1st call (main nav): false (awaited)
    // 2nd call (breadcrumb): true (NOT awaited)
    (classifier.assert as jest.Mock).mockResolvedValueOnce(false).mockReturnValueOnce(true);

    (classifier.getOperations as jest.Mock).mockReturnValue({
      contentInfo: { accessibleName: "" },
    });

    await HeaderNavigationDiscernible.validate(validateMethodArguments);

    expect(response.inapplicableNodes).toContain(headerNav);
    expect(response.inapplicableNodes).toHaveLength(1);
  });
});
