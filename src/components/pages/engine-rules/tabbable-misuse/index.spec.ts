import { TabbableMisuse } from ".";
import type { ValidationMethodArguments } from "../../../test/unit/helpers/validation-method-arguments";
import validationMethodArguments from "../../../test/unit/helpers/validation-method-arguments";

describe("TabbableMisuse rule validation", () => {
  let validateMethodArguments: ValidationMethodArguments;

  beforeEach(() => (validateMethodArguments = validationMethodArguments()));

  it("should fail when non-interactive element has tabindex greater than -1", async () => {
    const { response, document, classifier } = validateMethodArguments;

    const div = document.createElement("div");
    div.setAttribute("tabindex", "0");
    div.textContent = "Not Interactive";
    document.body.appendChild(div);

    jest.spyOn(classifier, "getMatched").mockReturnValue([div]);
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false);

    await TabbableMisuse.validate(validateMethodArguments);

    expect(response.failedNodes).toContain(div);
  });

  it("should pass when a non-interactive element is clickable and has tabindex greater than -1", async () => {
    const { response, document, classifier } = validateMethodArguments;

    const div = document.createElement("div");
    div.setAttribute("tabindex", "0");
    div.textContent = "Interactive";
    div.onclick = () => alert("click!");
    document.body.appendChild(div);

    jest.spyOn(classifier, "getMatched").mockReturnValue([div]);
    jest.spyOn(classifier, "assert").mockReturnValueOnce(true);

    await TabbableMisuse.validate(validateMethodArguments);

    expect(response.passedNodes).toContain(div);
  });

  it("should pass when an interactive element has no tabindex", async () => {
    const { response, document, classifier } = validateMethodArguments;

    const button = document.createElement("button");
    button.textContent = "Click here";
    document.body.appendChild(button);

    jest.spyOn(classifier, "getMatched").mockReturnValue([button]);
    jest.spyOn(classifier, "assert").mockResolvedValueOnce(true);

    await TabbableMisuse.validate(validateMethodArguments);

    expect(response.passedNodes).toContain(button);
  });

  it("should mark a tabbable non-interactive implicitly interactive element as inapplicable", async () => {
    const { response, document, classifier } = validateMethodArguments;

    const anchor = document.createElement("a");
    anchor.textContent = "Click here";
    anchor.setAttribute("href", "/some/link");
    anchor.setAttribute("aria-disabled", "true");
    document.body.appendChild(anchor);

    jest.spyOn(classifier, "getMatched").mockReturnValue([anchor]);
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false);
    jest.spyOn(classifier, "assert").mockReturnValueOnce(true);

    await TabbableMisuse.validate(validateMethodArguments);

    expect(response.inapplicableNodes).toContain(anchor);
  });

  it("should pass when an interactive element has tabindex of -1", async () => {
    const { response, document, classifier } = validateMethodArguments;

    const button = document.createElement("button");
    button.textContent = "Click here";
    button.setAttribute("tabindex", "-1");
    document.body.appendChild(button);

    jest.spyOn(classifier, "getMatched").mockReturnValue([button]);
    jest.spyOn(classifier, "assert").mockResolvedValueOnce(true);

    await TabbableMisuse.validate(validateMethodArguments);

    expect(response.passedNodes).toContain(button);
  });
});
