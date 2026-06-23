import { FocusNotObscuredHeader } from "./index";
import type { ValidationMethodArguments } from "../../../test/unit/helpers/validation-method-arguments";
import validationMethodArguments from "../../../test/unit/helpers/validation-method-arguments";

describe("FocusNotObscuredHeader Rule Validation", () => {
  let validateMethodArguments: ValidationMethodArguments;

  beforeEach(() => {
    validateMethodArguments = validationMethodArguments();
    (validateMethodArguments.classifier.getMatched as jest.Mock).mockReturnValue([{}]);
    // Clear any existing style elements from previous tests
    document.head.querySelectorAll("style").forEach((el) => el.remove());
  });

  afterEach(() => {
    // Clean up style elements after each test
    document.head.querySelectorAll("style").forEach((el) => el.remove());
  });

  it("should pass when there are no sticky headers", async () => {
    const { response, classifier } = validateMethodArguments;
    (classifier.getMatched as jest.Mock).mockReturnValue([]);

    await FocusNotObscuredHeader.validate(validateMethodArguments);

    expect(response.failedNodes.length).toBe(0);
  });

  it("should fail when there are sticky headers without valid scroll-padding-top", async () => {
    const { response, classifier } = validateMethodArguments;
    const header = document.createElement("div");
    (classifier.getMatched as jest.Mock).mockReturnValue([header]);
    (classifier.getOperations as jest.Mock).mockReturnValue({
      layoutInfo: {
        height: 50,
        scrollPaddingTop: 0,
      },
    });

    await FocusNotObscuredHeader.validate(validateMethodArguments);

    expect(response.failedNodes.length).toBe(1);
    expect(response.failedNodes).toContain(header);
  });

  it("should pass when there are sticky headers with valid scroll-padding-top", async () => {
    const { response, classifier } = validateMethodArguments;
    const parent = document.createElement("div");
    const header = document.createElement("div");
    parent.appendChild(header);
    Object.defineProperty(parent, "scrollHeight", { value: 200, writable: true });
    Object.defineProperty(parent, "clientHeight", { value: 100, writable: true });
    (classifier.getMatched as jest.Mock).mockReturnValue([header]);
    (classifier.getOperations as jest.Mock).mockReturnValue({
      layoutInfo: {
        scrollPaddingTop: 60,
        height: 50,
      },
    });

    await FocusNotObscuredHeader.validate(validateMethodArguments);

    expect(response.failedNodes.length).toBe(0);
  });

  it("should pass when computed scroll-padding-top is insufficient but style fallback is sufficient", async () => {
    const { response, classifier } = validateMethodArguments;

    // Create style element with sufficient padding
    const style = document.createElement("style");
    style.id = "acsb-focus-not-obscured-header-global";
    style.textContent = `
      [data-acsb-header-first-scrollable-parent="true"] {
        scroll-padding-top: 214px;
      }
    `;
    document.head.appendChild(style);

    const header = document.createElement("div");
    const parent = document.createElement("div");

    (classifier.getMatched as jest.Mock).mockReturnValue([header]);
    (classifier.getOperations as jest.Mock).mockImplementation((el) => {
      if (el === header) {
        return {
          layoutInfo: {
            firstScrollableParent: parent,
            height: 214,
          },
        };
      }
      if (el === parent) {
        return {
          layoutInfo: {
            scrollPaddingTop: 0, // Insufficient computed padding
          },
        };
      }
    });

    await FocusNotObscuredHeader.validate(validateMethodArguments);

    expect(response.failedNodes.length).toBe(0);
  });

  it("should fail when both computed scroll-padding-top and style fallback are insufficient", async () => {
    const { response, classifier } = validateMethodArguments;

    // Create style element with insufficient padding
    const style = document.createElement("style");
    style.id = "acsb-focus-not-obscured-header-global";
    style.textContent = `
      [data-acsb-header-first-scrollable-parent="true"] {
        scroll-padding-top: 50px;
      }
    `;
    document.head.appendChild(style);

    const header = document.createElement("div");
    const parent = document.createElement("div");

    (classifier.getMatched as jest.Mock).mockReturnValue([header]);
    (classifier.getOperations as jest.Mock).mockImplementation((el) => {
      if (el === header) {
        return {
          layoutInfo: {
            firstScrollableParent: parent,
            height: 214,
          },
        };
      }
      if (el === parent) {
        return {
          layoutInfo: {
            scrollPaddingTop: 30, // Insufficient computed padding
          },
        };
      }
    });

    await FocusNotObscuredHeader.validate(validateMethodArguments);

    expect(response.failedNodes.length).toBe(1);
    expect(response.failedNodes).toContain(header);
  });

  it("should ignore style rules with :has selector", async () => {
    const { response, classifier } = validateMethodArguments;

    // Create style element with :has selector (should be ignored)
    const style = document.createElement("style");
    style.id = "acsb-focus-not-obscured-header-global";
    style.textContent = `
      [data-acsb-header-first-scrollable-parent="true"]:has(header:focus-within) {
        scroll-padding-top: 214px;
      }
    `;
    document.head.appendChild(style);

    const header = document.createElement("div");
    const parent = document.createElement("div");

    (classifier.getMatched as jest.Mock).mockReturnValue([header]);
    (classifier.getOperations as jest.Mock).mockImplementation((el) => {
      if (el === header) {
        return {
          layoutInfo: {
            firstScrollableParent: parent,
            height: 214,
          },
        };
      }
      if (el === parent) {
        return {
          layoutInfo: {
            scrollPaddingTop: 0,
          },
        };
      }
    });

    await FocusNotObscuredHeader.validate(validateMethodArguments);

    // Should fail because the :has rule is ignored
    expect(response.failedNodes.length).toBe(1);
    expect(response.failedNodes).toContain(header);
  });

  it("should handle style element with non-CSSStyleRule rules", async () => {
    const { response, classifier } = validateMethodArguments;

    // Create style element with @media query (not a CSSStyleRule at top level)
    const style = document.createElement("style");
    style.id = "acsb-focus-not-obscured-header-global";
    style.textContent = `
      @media screen and (min-width: 768px) {
        [data-acsb-header-first-scrollable-parent="true"] {
          scroll-padding-top: 214px;
        }
      }
    `;
    document.head.appendChild(style);

    const header = document.createElement("div");
    const parent = document.createElement("div");

    (classifier.getMatched as jest.Mock).mockReturnValue([header]);
    (classifier.getOperations as jest.Mock).mockImplementation((el) => {
      if (el === header) {
        return {
          layoutInfo: {
            firstScrollableParent: parent,
            height: 214,
          },
        };
      }
      if (el === parent) {
        return {
          layoutInfo: {
            scrollPaddingTop: 0,
          },
        };
      }
    });

    await FocusNotObscuredHeader.validate(validateMethodArguments);

    // Should fail because the rule is inside @media, not a direct CSSStyleRule
    expect(response.failedNodes.length).toBe(1);
    expect(response.failedNodes).toContain(header);
  });

  it("should handle style with 0px scroll-padding-top value", async () => {
    const { response, classifier } = validateMethodArguments;

    // Create style element with 0px padding (parseFloat returns 0)
    const style = document.createElement("style");
    style.id = "acsb-focus-not-obscured-header-global";
    style.textContent = `
      [data-acsb-header-first-scrollable-parent="true"] {
        scroll-padding-top: 0px;
      }
    `;
    document.head.appendChild(style);

    const header = document.createElement("div");
    const parent = document.createElement("div");

    (classifier.getMatched as jest.Mock).mockReturnValue([header]);
    (classifier.getOperations as jest.Mock).mockImplementation((el) => {
      if (el === header) {
        return {
          layoutInfo: {
            firstScrollableParent: parent,
            height: 214,
          },
        };
      }
      if (el === parent) {
        return {
          layoutInfo: {
            scrollPaddingTop: 0,
          },
        };
      }
    });

    await FocusNotObscuredHeader.validate(validateMethodArguments);

    // Should fail because padding is 0
    expect(response.failedNodes.length).toBe(1);
    expect(response.failedNodes).toContain(header);
  });
});
