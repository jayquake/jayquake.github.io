import { HeadingSingleH1 } from ".";
import { CompliantTraitExposed } from "@acsbe/core-engine-classifier";
import type { ValidationMethodArguments } from "../../../test/unit/helpers/validation-method-arguments";
import validationMethodArguments from "../../../test/unit/helpers/validation-method-arguments";

describe("HeadingSingleH1 Rule Validation", () => {
  let validateMethodArguments: ValidationMethodArguments;

  beforeEach(() => {
    validateMethodArguments = validationMethodArguments();
    validateMethodArguments.document.body.innerHTML = "";
  });

  it("should pass when there is exactly one H1 element", async () => {
    const { response, document, classifier } = validateMethodArguments;

    document.body.innerHTML = "<h1>Page Title</h1>";
    jest.spyOn(classifier, "assert").mockReturnValue(true);

    await HeadingSingleH1.validate(validateMethodArguments);

    expect(response.passedNodes.length).toBe(1);
    expect(response.failedNodes.length).toBe(0);
    expect(response.passedNodes[0]).toBe(document.querySelector("h1"));
    expect(classifier.assert).toHaveBeenCalledWith(document.querySelector("h1"), CompliantTraitExposed);
  });

  it("should pass when there are no H1 elements", async () => {
    const { response } = validateMethodArguments;

    await HeadingSingleH1.validate(validateMethodArguments);

    expect(response.passedNodes.length).toBe(0);
    expect(response.failedNodes.length).toBe(0);
  });

  it("should fail when there are multiple H1 elements", async () => {
    const { response, document, classifier } = validateMethodArguments;

    document.body.innerHTML = "<h1>Page Title</h1><h1>Another Title</h1>";
    jest.spyOn(classifier, "assert").mockReturnValue(true);

    await HeadingSingleH1.validate(validateMethodArguments);

    expect(response.passedNodes.length).toBe(1);
    expect(response.failedNodes.length).toBe(1);
    expect(response.passedNodes[0]).toBe(document.querySelectorAll("h1")[0]);
    expect(response.failedNodes[0]).toBe(document.querySelectorAll("h1")[1]);
  });

  it("should correctly handle H1 with aria-level attributes", async () => {
    const { response, document, classifier } = validateMethodArguments;

    document.body.innerHTML = `
            <h1>Main Title</h1>
            <h2 aria-level="1">Not an H1 due to semantic mismatch</h2>
            <div role="heading" aria-level="1">Semantic H1</div>`;
    jest.spyOn(classifier, "assert").mockReturnValue(true);

    await HeadingSingleH1.validate(validateMethodArguments);

    expect(response.passedNodes.length).toBe(1);
    expect(response.failedNodes.length).toBe(1);
    expect(response.passedNodes[0]).toBe(document.querySelector("h1"));
    expect(response.failedNodes[0]).toBe(document.querySelector("[role='heading'][aria-level='1']"));
  });

  it("should ignore H1 elements that are not exposed", async () => {
    const { response, document, classifier } = validateMethodArguments;

    document.body.innerHTML = "<h1 id='hiddenHeading'>Hidden Title</h1><h1 id='visibleHeading'>Visible Title</h1>";
    const [hiddenHeading, visibleHeading] = Array.from(document.querySelectorAll("h1"));

    jest.spyOn(classifier, "assert").mockImplementation((element) => element === visibleHeading);

    await HeadingSingleH1.validate(validateMethodArguments);

    expect(response.passedNodes).toEqual([visibleHeading]);
    expect(response.failedNodes).toEqual([]);
    expect(classifier.assert).toHaveBeenCalledWith(hiddenHeading, CompliantTraitExposed);
    expect(classifier.assert).toHaveBeenCalledWith(visibleHeading, CompliantTraitExposed);
  });

  it("should not report when all H1 elements are not exposed", async () => {
    const { response, document, classifier } = validateMethodArguments;

    document.body.innerHTML = "<h1>Hidden Title</h1><h1>Another Hidden Title</h1>";
    jest.spyOn(classifier, "assert").mockReturnValue(false);

    await HeadingSingleH1.validate(validateMethodArguments);

    expect(response.passedNodes).toEqual([]);
    expect(response.failedNodes).toEqual([]);
  });
});
