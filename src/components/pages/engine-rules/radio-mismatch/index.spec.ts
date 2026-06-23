import { RadioMismatch } from ".";
import type { ValidationMethodArguments } from "../../../test/unit/helpers/validation-method-arguments";
import validationMethodArguments from "../../../test/unit/helpers/validation-method-arguments";

describe("RadioMismatch Rule Validation", () => {
  let validateMethodArguments: ValidationMethodArguments;

  beforeEach(() => {
    validateMethodArguments = validationMethodArguments();
  });

  it("should pass when a custom radio button has role=radio", async () => {
    const { document, response, classifier } = validateMethodArguments;
    document.body.innerHTML = `
          <div role="radio">
              <input id="example-1" class="substituted" type="radio" aria-hidden="true" />
              <label class="pointer" for="example-1">radui</label>
          </div>
    `;
    const radio = document.querySelector("div");

    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([radio]);
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]);
    jest.spyOn(classifier, "assert").mockReturnValue(true);

    await RadioMismatch.validate(validateMethodArguments);
    expect(response.failedNodes).toHaveLength(0);
    expect(response.passedNodes).toContain(radio);
  });

  it("should fail when a custom radio has no role=radio", async () => {
    const { document, response, classifier } = validateMethodArguments;
    document.body.innerHTML = `
          <div>
              <input id="example-1" class="substituted" type="radio" aria-hidden="true" />
              <label class="pointer" for="example-1">option 1</label>
          </div>
    `;
    const radio = document.querySelector("div");

    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([radio]);
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([]);
    jest.spyOn(classifier, "assert").mockReturnValue(false);

    await RadioMismatch.validate(validateMethodArguments);
    expect(response.failedNodes).toContain(radio);
    expect(response.passedNodes).toHaveLength(0);
  });

  it("should mark as inapplicable when a perceivable radio has a compliant radio child", async () => {
    const { document, response, classifier } = validateMethodArguments;
    document.body.innerHTML = `
          <div id="parent-radio" class="radio-wrapper">
              <input id="child-radio" type="radio" name="option" />
              <label for="child-radio">Option 1</label>
          </div>
    `;
    const parentRadio = document.getElementById("parent-radio");
    const childRadio = document.getElementById("child-radio");

    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([parentRadio]);
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([childRadio]);

    await RadioMismatch.validate(validateMethodArguments);
    expect(response.inapplicableNodes).toContain(parentRadio);
    expect(response.failedNodes).toHaveLength(0);
    expect(response.passedNodes).toHaveLength(0);
  });
});
