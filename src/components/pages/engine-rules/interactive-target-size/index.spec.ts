import { InteractiveTargetSize, isElementInSentence } from "./index";
import type { ValidationMethodArguments } from "../../../test/unit/helpers/validation-method-arguments";
import validationMethodArguments from "../../../test/unit/helpers/validation-method-arguments";

describe("InteractiveTargetSize Rule", () => {
  let validateMethodArguments: ValidationMethodArguments;

  beforeEach(() => {
    validateMethodArguments = validationMethodArguments();
    const { classifier } = validateMethodArguments;
    jest.spyOn(classifier, "getOperations").mockImplementation((element: HTMLElement) => ({
      layoutInfo: {
        absoluteRect: element.getBoundingClientRect(),
      },
    }));
  });

  it("should pass elements that meet the minimum size requirement", async () => {
    const { response, classifier } = validateMethodArguments;

    const elements = [createElement(24, 24), createElement(30, 30)];
    jest.spyOn(classifier, "getMatched").mockReturnValue(elements);

    await InteractiveTargetSize.validate(validateMethodArguments);

    expect(response.failedNodes.length).toBe(0);
    expect(response.passedNodes.length).toBe(2);
    expect(response.passedNodes).toContain(elements[0]);
    expect(response.passedNodes).toContain(elements[1]);
  });

  it("should fail elements that do not meet the minimum size requirement and have insufficient spacing", async () => {
    const { response, classifier } = validateMethodArguments;

    const elements = [createElement(18, 18, 0, 0), createElement(24, 24, 18, 0)];
    jest.spyOn(classifier, "getMatched").mockReturnValue(elements);

    await InteractiveTargetSize.validate(validateMethodArguments);

    expect(response.failedNodes.length).toBe(1);
    expect(response.failedNodes).toContain(elements[0]);
    expect(response.passedNodes.length).toBe(1);
    expect(response.passedNodes).toContain(elements[1]);
  });

  it("should pass elements that are undersized and have sufficient spacing", async () => {
    const { response, classifier } = validateMethodArguments;

    const elements = [createElement(18, 18, 0, 0), createElement(18, 18, 20, 20)];
    jest.spyOn(classifier, "getMatched").mockReturnValue(elements);

    await InteractiveTargetSize.validate(validateMethodArguments);

    expect(response.failedNodes.length).toBe(0);
    expect(response.passedNodes.length).toBe(2);
    expect(response.passedNodes).toContain(elements[0]);
    expect(response.passedNodes).toContain(elements[1]);
  });

  it("should fail when an undersized interactable intersects the cicle of another undersized target", async () => {
    const { response, classifier } = validateMethodArguments;

    const elements = [createElement(4, 10, 0, 0), createElement(34, 10, 0, 10)];
    jest.spyOn(classifier, "getMatched").mockReturnValue(elements);

    await InteractiveTargetSize.validate(validateMethodArguments);

    expect(response.failedNodes.length).toBe(2);
    expect(response.failedNodes).toContain(elements[0]);
    expect(response.failedNodes).toContain(elements[1]);
    expect(response.passedNodes.length).toBe(0);
  });

  it("should pass when a non-sticky undersized interactable intersects with a sticky interactable", async () => {
    const { response, classifier } = validateMethodArguments;

    const elements = [createElement(18, 18, 0, 0), createElement(30, 30, 0, 0)];
    jest.spyOn(classifier, "getMatched").mockReturnValue(elements);
    jest.spyOn(classifier, "assert").mockReturnValueOnce(false).mockReturnValue(true);

    await InteractiveTargetSize.validate(validateMethodArguments);

    expect(response.failedNodes.length).toBe(0);
    expect(response.passedNodes.length).toBe(2);
  });

  it("should pass when two sticky interactables from different sticky contexts intersect", async () => {
    const { response, classifier } = validateMethodArguments;

    const rootParent = createElement();
    const stickyContext1 = createElement(100, 100, 0, 0);
    const stickyContext2 = createElement(100, 100, 0, 0);
    const undersizedInteractable = createElement(18, 18, 0, 0);
    const otherInteractable = createElement(30, 30, 0, 0);

    Object.defineProperty(undersizedInteractable, "parentElement", { value: stickyContext1 });
    Object.defineProperty(otherInteractable, "parentElement", { value: stickyContext2 });
    Object.defineProperty(stickyContext1, "parentElement", { value: rootParent });
    Object.defineProperty(stickyContext2, "parentElement", { value: rootParent });

    const elements = [undersizedInteractable, otherInteractable];
    jest.spyOn(classifier, "getMatched").mockReturnValue(elements);
    jest.spyOn(classifier, "assert").mockImplementation((element) => {
      return element !== rootParent;
    });

    await InteractiveTargetSize.validate(validateMethodArguments);

    expect(response.failedNodes.length).toBe(0);
    expect(response.passedNodes.length).toBe(2);
  });

  it("should fail when two sticky interactables from the same sticky context intersect", async () => {
    const { response, classifier } = validateMethodArguments;

    const rootParent = createElement();
    const stickyContext = createElement(100, 100, 0, 0);
    const undersizedInteractable = createElement(18, 18, 0, 0);
    const otherInteractable = createElement(30, 30, 0, 0);

    Object.defineProperty(undersizedInteractable, "parentElement", { value: stickyContext });
    Object.defineProperty(otherInteractable, "parentElement", { value: stickyContext });
    Object.defineProperty(stickyContext, "parentElement", { value: rootParent });

    const elements = [undersizedInteractable, otherInteractable];
    jest.spyOn(classifier, "getMatched").mockReturnValue(elements);
    jest.spyOn(classifier, "assert").mockReturnValue(true);

    await InteractiveTargetSize.validate(validateMethodArguments);

    expect(response.failedNodes.length).toBe(1);
    expect(response.failedNodes).toContain(undersizedInteractable);
    expect(response.passedNodes.length).toBe(1);
  });

  it("should pass when a sticky undersized interactable intersects with a non-sticky interactable", async () => {
    const { response, classifier } = validateMethodArguments;

    const rootParent = createElement();
    const stickyContext = createElement(100, 100, 0, 0);
    const undersizedInteractable = createElement(18, 18, 0, 0); // sticky undersized
    const otherInteractable = createElement(30, 30, 0, 0); // non-sticky normal sized

    Object.defineProperty(undersizedInteractable, "parentElement", { value: stickyContext });
    Object.defineProperty(otherInteractable, "parentElement", { value: rootParent });
    Object.defineProperty(stickyContext, "parentElement", { value: rootParent });

    const elements = [undersizedInteractable, otherInteractable];
    jest.spyOn(classifier, "getMatched").mockReturnValue(elements);
    jest.spyOn(classifier, "assert").mockReturnValueOnce(true).mockReturnValue(false);

    await InteractiveTargetSize.validate(validateMethodArguments);

    expect(response.failedNodes.length).toBe(0);
    expect(response.passedNodes.length).toBe(2);
  });

  function createElement(width = 0, height = 0, left = 0, top = 0): HTMLElement {
    const element = document.createElement("div");
    Object.defineProperty(element, "getBoundingClientRect", {
      value: () => ({
        width,
        height,
        left,
        top,
        right: left + width,
        bottom: top + height,
      }),
    });
    return element;
  }
});

describe("isElementInSentence", () => {
  it("should return true for an element in a sentence, element.previousSibling is not Node.TEXT_NODE", () => {
    document.body.innerHTML = `<p>This <b>is a</b> <a href="https://example.com">link</a> in a sentence.</p>`;
    const link = document.querySelector("a") as HTMLElement;
    expect(isElementInSentence(link)).toBe(true);
  });

  it("should return true for an element in a sentence, element.nextSibling is not Node.TEXT_NODE", () => {
    document.body.innerHTML = `<div><a href="https://example.com">link</a> <b>This</b> is a link in a div.</div>`;
    const link = document.querySelector("a") as HTMLElement;
    expect(isElementInSentence(link)).toBe(true);
  });

  it("should return true for an element in a sentence", () => {
    document.body.innerHTML = `<span>This is a <a href="https://example.com">link</a> in a span.</span>`;
    const link = document.querySelector("a") as HTMLElement;
    expect(isElementInSentence(link)).toBe(true);
  });

  it("should return false for an element not surrounded by text nodes", () => {
    document.body.innerHTML = `<p><a href="https://example.com">link</a></p>`;
    const link = document.querySelector("a") as HTMLElement;
    expect(isElementInSentence(link)).toBe(false);
  });
});
