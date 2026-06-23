import { FooterNavigationDiscernible } from "./index";
import type { ValidationMethodArguments } from "~test-unit/helpers/validation-method-arguments";
import validationMethodArguments from "../../../test/unit/helpers/validation-method-arguments";
import { CompliantComponentFooter, CompliantComponentNavigation } from "@acsbe/core-engine-classifier";

describe("FooterNavigationDiscernible Rule Validation", () => {
  let validateMethodArguments: ValidationMethodArguments;

  beforeEach(() => {
    validateMethodArguments = validationMethodArguments();
  });

  it("should pass when all footer navigation elements have accessible names", async () => {
    const { response, classifier } = validateMethodArguments;
    const footerNav = document.createElement("nav");
    (classifier.getMatched as jest.Mock).mockReturnValue([footerNav]);
    (classifier.getOperations as jest.Mock).mockReturnValue({
      contentInfo: { accessibleName: "Footer Menu" },
    });

    await FooterNavigationDiscernible.validate(validateMethodArguments);

    expect(response.failedNodes.length).toBe(0);
    expect(response.passedNodes.length).toBe(1);
    expect(response.passedNodes).toContain(footerNav);
  });

  it("should fail when a footer navigation element does not have an accessible name", async () => {
    const { response, classifier } = validateMethodArguments;
    const footerNav = document.createElement("nav");
    (classifier.getMatched as jest.Mock).mockReturnValue([footerNav]);
    (classifier.getOperations as jest.Mock).mockReturnValue({
      contentInfo: { accessibleName: "" },
    });

    await FooterNavigationDiscernible.validate(validateMethodArguments);

    expect(response.failedNodes.length).toBe(1);
    expect(response.passedNodes.length).toBe(0);
    expect(response.failedNodes).toContain(footerNav);
  });

  it("should handle multiple footer navigation elements correctly", async () => {
    const { response, classifier } = validateMethodArguments;

    const footerElement1 = document.createElement("footer");
    const footerElement2 = document.createElement("footer");

    const navElement1 = document.createElement("nav");
    const navElement2 = document.createElement("nav");

    // Mocking getMatched for footerElements (top-level call)
    (classifier.getMatched as jest.Mock).mockImplementation((components, parentElement) => {
      if (components[0] === CompliantComponentFooter) {
        if (!parentElement) {
          // Top-level call to get footers
          return [footerElement1, footerElement2];
        }
      }
      if (components[0] === CompliantComponentNavigation) {
        if (parentElement === footerElement1) {
          return [navElement1]; // navElement1 is inside footerElement1
        }
        if (parentElement === footerElement2) {
          return [navElement2]; // navElement2 is inside footerElement2
        }
      }
      return [];
    });

    // Mocking getOperations for accessible names of nav elements
    (classifier.getOperations as jest.Mock).mockImplementation((element) => {
      if (element === navElement1) {
        return { contentInfo: { accessibleName: "Footer Navigation 1" } }; // Should pass
      }
      if (element === navElement2) {
        return { contentInfo: { accessibleName: "" } }; // Should fail
      }
      return { contentInfo: { accessibleName: "" } };
    });

    await FooterNavigationDiscernible.validate(validateMethodArguments);

    expect(response.failedNodes.length).toBe(1);
    expect(response.passedNodes.length).toBe(1);
    expect(response.failedNodes).toContain(navElement2);
    expect(response.passedNodes).toContain(navElement1);
  });

  it("should pass when there are no footer navigation elements", async () => {
    const { response, classifier } = validateMethodArguments;
    (classifier.getMatched as jest.Mock).mockReturnValue([]);

    await FooterNavigationDiscernible.validate(validateMethodArguments);

    expect(response.failedNodes.length).toBe(0);
    expect(response.passedNodes.length).toBe(0);
  });

  it("should mark a main navigation as inapplicable", async () => {
    const { response, classifier } = validateMethodArguments;

    const footerElement = document.createElement("footer");
    const footerNav = document.createElement("nav");

    (classifier.getMatched as jest.Mock).mockImplementation((components, parentElement) => {
      if (components[0] === CompliantComponentFooter && !parentElement) {
        return [footerElement];
      }
      if (components[0] === CompliantComponentNavigation && parentElement === footerElement) {
        return [footerNav];
      }
      return [];
    });

    (classifier.assert as jest.Mock).mockResolvedValue(true);

    (classifier.getOperations as jest.Mock).mockReturnValue({
      contentInfo: { accessibleName: "" },
    });

    await FooterNavigationDiscernible.validate(validateMethodArguments);

    expect(response.inapplicableNodes).toContain(footerNav);
    expect(response.inapplicableNodes.length).toBe(1);
  });

  it("should mark a breadcrumb navigation as inapplicable", async () => {
    const { response, classifier } = validateMethodArguments;

    const footerElement = document.createElement("header");
    const footerNav = document.createElement("nav");

    (classifier.getMatched as jest.Mock).mockImplementation((components, parentElement) => {
      if (components[0] === CompliantComponentFooter && !parentElement) return [footerElement];
      if (components[0] === CompliantComponentNavigation && parentElement === footerElement) return [footerNav];
      return [];
    });

    // 1st call (main nav): false (awaited)
    // 2nd call (breadcrumb): true (NOT awaited)
    (classifier.assert as jest.Mock).mockResolvedValueOnce(false).mockReturnValueOnce(true);

    (classifier.getOperations as jest.Mock).mockReturnValue({
      contentInfo: { accessibleName: "" },
    });

    await FooterNavigationDiscernible.validate(validateMethodArguments);

    expect(response.inapplicableNodes).toContain(footerNav);
    expect(response.inapplicableNodes).toHaveLength(1);
  });
});
