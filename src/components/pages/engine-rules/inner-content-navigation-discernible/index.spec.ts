jest.mock("@acsbe/core-engine-classifier", () => {
  class CompliantComponentNavigation {}
  class CompliantComponentFooter {}
  class CompliantComponentHeader {}
  class PerceivableComponentMainNavigation {}
  class PerceivableComponentBreadcrumb {}

  return {
    CompliantComponentNavigation,
    CompliantComponentFooter,
    CompliantComponentHeader,
    PerceivableComponentMainNavigation,
    PerceivableComponentBreadcrumb,
  };
});

import { InnerContentNavigationDiscernible } from "./index";
import type { ValidationMethodArguments } from "~test-unit/helpers/validation-method-arguments";
import validationMethodArguments from "../../../test/unit/helpers/validation-method-arguments";
import { CompliantComponentFooter, CompliantComponentHeader, CompliantComponentNavigation, PerceivableComponentMainNavigation, PerceivableComponentBreadcrumb } from "@acsbe/core-engine-classifier";

describe("InnerContentNavigationDiscernible Rule Validation", () => {
  let validateMethodArguments: ValidationMethodArguments;

  beforeEach(() => {
    validateMethodArguments = validationMethodArguments();

    const { classifier, response } = validateMethodArguments;

    response.failedNodes = [];
    response.passedNodes = [];
    response.inapplicableNodes = [];

    // IMPORTANT: must be sync now because rule calls assert without await for breadcrumb
    (classifier.assert as jest.Mock).mockReturnValue(false);

    (classifier.getMatched as jest.Mock).mockImplementation((components: unknown[], parent?: unknown) => {
      const first = components?.[0];

      if (first === CompliantComponentFooter) return [];
      if (first === CompliantComponentHeader) return [];
      if (first === CompliantComponentNavigation && parent) return [];
      if (first === CompliantComponentNavigation && !parent) return [];

      return [];
    });

    (classifier.getOperations as jest.Mock).mockReturnValue({
      contentInfo: { accessibleName: "" },
    });
  });

  it("should pass when a non-header/footer, non-main nav has an accessible name", async () => {
    const { classifier, response } = validateMethodArguments;
    const nav = document.createElement("nav");

    (classifier.getMatched as jest.Mock).mockImplementation((components: unknown[], parent?: unknown) => {
      const first = components?.[0];

      if (first === CompliantComponentFooter) return [];
      if (first === CompliantComponentHeader) return [];
      if (first === CompliantComponentNavigation && parent) return [];
      if (first === CompliantComponentNavigation && !parent) return [nav];

      return [];
    });

    (classifier.getOperations as jest.Mock).mockReturnValue({
      contentInfo: { accessibleName: "InnerContent Menu" },
    });

    await InnerContentNavigationDiscernible.validate(validateMethodArguments);

    expect(response.failedNodes).toHaveLength(0);
    expect(response.passedNodes).toHaveLength(1);
    expect(response.passedNodes).toContain(nav);
  });

  it("should fail when a non-header/footer, non-main nav does not have an accessible name", async () => {
    const { classifier, response } = validateMethodArguments;
    const nav = document.createElement("nav");

    (classifier.getMatched as jest.Mock).mockImplementation((components: unknown[], parent?: unknown) => {
      const first = components?.[0];

      if (first === CompliantComponentFooter) return [];
      if (first === CompliantComponentHeader) return [];
      if (first === CompliantComponentNavigation && parent) return [];
      if (first === CompliantComponentNavigation && !parent) return [nav];

      return [];
    });

    (classifier.getOperations as jest.Mock).mockReturnValue({
      contentInfo: { accessibleName: "" },
    });

    await InnerContentNavigationDiscernible.validate(validateMethodArguments);

    expect(response.failedNodes).toHaveLength(1);
    expect(response.passedNodes).toHaveLength(0);
    expect(response.failedNodes).toContain(nav);
  });

  it("should handle multiple nav elements correctly (excluding header/footer navs)", async () => {
    const { classifier, response } = validateMethodArguments;

    const header = document.createElement("header");
    const footer = document.createElement("footer");

    const headerNav = document.createElement("nav");
    const footerNav = document.createElement("nav");

    const innerNav1 = document.createElement("nav");
    const innerNav2 = document.createElement("nav");

    (classifier.getMatched as jest.Mock).mockImplementation((components: unknown[], parent?: unknown) => {
      const first = components?.[0];

      if (first === CompliantComponentHeader) return [header];
      if (first === CompliantComponentFooter) return [footer];

      if (first === CompliantComponentNavigation && parent === header) return [headerNav];
      if (first === CompliantComponentNavigation && parent === footer) return [footerNav];

      if (first === CompliantComponentNavigation && !parent) return [headerNav, footerNav, innerNav1, innerNav2];

      return [];
    });

    (classifier.getOperations as jest.Mock).mockImplementation((element: unknown) => {
      if (element === innerNav1) return { contentInfo: { accessibleName: "Inner Navigation 1" } };
      if (element === innerNav2) return { contentInfo: { accessibleName: "" } };
      return { contentInfo: { accessibleName: "Ignored" } };
    });

    await InnerContentNavigationDiscernible.validate(validateMethodArguments);

    expect(response.failedNodes).toHaveLength(1);
    expect(response.failedNodes).toContain(innerNav2);

    expect(response.passedNodes).toEqual(expect.arrayContaining([headerNav, footerNav, innerNav1]));
    expect(response.inapplicableNodes).toEqual(expect.arrayContaining([headerNav, footerNav]));
  });

  it("should mark main navigation menus as inapplicable", async () => {
    const { classifier, response } = validateMethodArguments;
    const nav = document.createElement("nav");

    (classifier.getMatched as jest.Mock).mockImplementation((components: unknown[], parent?: unknown) => {
      const first = components?.[0];

      if (first === CompliantComponentFooter) return [];
      if (first === CompliantComponentHeader) return [];
      if (first === CompliantComponentNavigation && parent) return [];
      if (first === CompliantComponentNavigation && !parent) return [nav];

      return [];
    });

    (classifier.assert as jest.Mock).mockImplementation((element: unknown, detector: unknown) => {
      if (element === nav && detector === PerceivableComponentMainNavigation) return true;
      return false;
    });

    (classifier.getOperations as jest.Mock).mockReturnValue({
      contentInfo: { accessibleName: "Main Nav" },
    });

    await InnerContentNavigationDiscernible.validate(validateMethodArguments);

    expect(response.inapplicableNodes).toHaveLength(1);
    expect(response.inapplicableNodes).toContain(nav);
    expect(response.failedNodes).toHaveLength(0);
    expect(response.passedNodes).toHaveLength(0);
  });

  it("should mark breadcrumb navigation as inapplicable", async () => {
    const { classifier, response } = validateMethodArguments;
    const nav = document.createElement("nav");

    (classifier.getMatched as jest.Mock).mockImplementation((components: unknown[], parent?: unknown) => {
      const first = components?.[0];

      if (first === CompliantComponentFooter) return [];
      if (first === CompliantComponentHeader) return [];
      if (first === CompliantComponentNavigation && parent) return [];
      if (first === CompliantComponentNavigation && !parent) return [nav];

      return [];
    });

    (classifier.assert as jest.Mock).mockImplementation((element: unknown, detector: unknown) => {
      if (element === nav && detector === PerceivableComponentBreadcrumb) return true;
      return false;
    });

    (classifier.getOperations as jest.Mock).mockReturnValue({
      contentInfo: { accessibleName: "Breadcrumbs" },
    });

    await InnerContentNavigationDiscernible.validate(validateMethodArguments);

    expect(response.inapplicableNodes).toHaveLength(1);
    expect(response.inapplicableNodes).toContain(nav);
    expect(response.failedNodes).toHaveLength(0);
    expect(response.passedNodes).toHaveLength(0);
  });

  it("should pass when there are no nav elements", async () => {
    const { classifier, response } = validateMethodArguments;

    (classifier.getMatched as jest.Mock).mockImplementation((components: unknown[]) => {
      const first = components?.[0];
      if (first === CompliantComponentFooter) return [];
      if (first === CompliantComponentHeader) return [];
      if (first === CompliantComponentNavigation) return [];
      return [];
    });

    await InnerContentNavigationDiscernible.validate(validateMethodArguments);

    expect(response.failedNodes).toHaveLength(0);
    expect(response.passedNodes).toHaveLength(0);
    expect(response.inapplicableNodes).toHaveLength(0);
  });
});
