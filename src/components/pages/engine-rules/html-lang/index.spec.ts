import { HtmlLang } from ".";
import type { ValidationMethodArguments } from "../../../test/unit/helpers/validation-method-arguments";
import validationMethodArguments from "../../../test/unit/helpers/validation-method-arguments";

describe("HtmlLang Rule Validation", () => {
  let validateMethodArguments: ValidationMethodArguments;

  beforeEach(() => {
    validateMethodArguments = validationMethodArguments();
    // Reset the documentElement lang attribute before each test
    validateMethodArguments.document.documentElement.removeAttribute("lang");
  });

  it.each(["en", " fr "])("should pass when the HTML element has a non-empty lang attribute: %s", async (lang) => {
    const { response, document } = validateMethodArguments;

    // Simulate a document with a lang attribute
    document.documentElement.setAttribute("lang", lang);

    await HtmlLang.validate(validateMethodArguments);

    // Expect the HTML element to be identified as a passed node
    expect(response.passedNodes).toContain(document.documentElement);
    expect(response.failedNodes).toHaveLength(0);
  });

  it("should fail when the HTML element does not have a lang attribute", async () => {
    const { response, document } = validateMethodArguments;

    // Ensure the HTML element does not have a lang attribute
    document.documentElement.removeAttribute("lang");

    await HtmlLang.validate(validateMethodArguments);

    // Expect the HTML element to be identified as a failed node
    expect(response.failedNodes).toContain(document.documentElement);
    expect(response.passedNodes).toHaveLength(0);
  });

  it.each(["", "   ", "\n\t "])("should fail when the lang attribute is empty or whitespace-only: %j", async (lang) => {
    const { response, document } = validateMethodArguments;
    document.documentElement.setAttribute("lang", lang);

    await HtmlLang.validate(validateMethodArguments);

    expect(response.failedNodes).toContain(document.documentElement);
    expect(response.passedNodes).toHaveLength(0);
  });
});
