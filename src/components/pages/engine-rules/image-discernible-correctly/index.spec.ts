import { ImageDiscernibleCorrectly } from ".";
import type { ValidationMethodArguments } from "../../../test/unit/helpers/validation-method-arguments";
import validationMethodArguments from "../../../test/unit/helpers/validation-method-arguments";

describe("ImageDiscernibleCorrectly Rule Validation", () => {
  let validateMethodArguments: ValidationMethodArguments;

  beforeEach(() => {
    validateMethodArguments = validationMethodArguments();
    const { document, classifier } = validateMethodArguments;
    document.body.innerHTML = "";
    (classifier.getOperations as jest.Mock).mockImplementation((element) => {
      const ariaLabel = element.getAttribute("aria-label");
      const alt = element.getAttribute("alt");
      return {
        contentInfo: { srVisibleText: (ariaLabel ? ariaLabel : "") + (alt ? alt : "") },
      };
    });
  });

  it("should pass when images have meaningful alt text", async () => {
    const { document, classifier, response } = validateMethodArguments;

    document.body.innerHTML = `<img alt="A beautiful sunrise over the mountains" style="width:100px;height:100px;"/>`;

    const images = document.querySelectorAll("img");
    jest.spyOn(classifier, "getMatched").mockReturnValue(images);
    jest.spyOn(classifier, "assert").mockReturnValue(true);

    await ImageDiscernibleCorrectly.validate(validateMethodArguments);
    expect(response.passedNodes).toEqual(Array.from(images));
    expect(response.failedNodes.length).toBe(0);
  });

  it("should pass when images have meaningful aria-label", async () => {
    const { document, classifier, response } = validateMethodArguments;

    document.body.innerHTML = `<img aria-label="A beautiful sunrise over the mountains" style="width:100px;height:100px;"/>`;

    const images = document.querySelectorAll("img");
    jest.spyOn(classifier, "getMatched").mockReturnValue(images);
    jest.spyOn(classifier, "assert").mockReturnValue(true);

    await ImageDiscernibleCorrectly.validate(validateMethodArguments);
    expect(response.passedNodes).toEqual(Array.from(images));
    expect(response.failedNodes.length).toBe(0);
  });

  it("should pass when images have meaningful alt text in hebrew", async () => {
    const { document, classifier, response } = validateMethodArguments;

    document.body.innerHTML = `<img alt="זריחה יפה מעל ההרים" style="width:100px;height:100px;"/>`;

    const images = document.querySelectorAll("img");
    jest.spyOn(classifier, "getMatched").mockReturnValue(images);
    jest.spyOn(classifier, "assert").mockReturnValue(true);

    await ImageDiscernibleCorrectly.validate(validateMethodArguments);
    expect(response.passedNodes).toEqual(Array.from(images));
    expect(response.failedNodes.length).toBe(0);
  });

  it("should pass when images have meaningful aria-label in hebrew", async () => {
    const { document, classifier, response } = validateMethodArguments;

    document.body.innerHTML = `<img aria-label="זריחה יפה מעל ההרים" style="width:100px;height:100px;"/>`;

    const images = document.querySelectorAll("img");
    jest.spyOn(classifier, "getMatched").mockReturnValue(images);
    jest.spyOn(classifier, "assert").mockReturnValue(true);

    await ImageDiscernibleCorrectly.validate(validateMethodArguments);
    expect(response.passedNodes).toEqual(Array.from(images));
    expect(response.failedNodes.length).toBe(0);
  });

  it("should fail when alt text contains a single non-descriptive word", async () => {
    const { document, classifier, response } = validateMethodArguments;

    document.body.innerHTML = `<img alt="image" style="width:100px;height:100px;"/>`;

    const images = document.querySelectorAll("img");
    jest.spyOn(classifier, "getMatched").mockReturnValue(images);
    jest.spyOn(classifier, "assert").mockReturnValue(true);

    await ImageDiscernibleCorrectly.validate(validateMethodArguments);

    expect(response.failedNodes).toEqual(Array.from(images));
    expect(response.passedNodes.length).toBe(0);
  });

  it("should fail when aria-label contains a single non-descriptive word", async () => {
    const { document, classifier, response } = validateMethodArguments;

    document.body.innerHTML = `<img aria-label="image" style="width:100px;height:100px;"/>`;

    const images = document.querySelectorAll("img");
    jest.spyOn(classifier, "getMatched").mockReturnValue(images);
    jest.spyOn(classifier, "assert").mockReturnValue(true);

    await ImageDiscernibleCorrectly.validate(validateMethodArguments);

    expect(response.failedNodes).toEqual(Array.from(images));
    expect(response.passedNodes.length).toBe(0);
  });

  it("should fail when alt text contains only non-alphabetic characters", async () => {
    const { document, classifier, response } = validateMethodArguments;

    document.body.innerHTML = `<img alt="!!!" style="width:100px;height:100px;"/>`;

    const images = document.querySelectorAll("img");
    jest.spyOn(classifier, "getMatched").mockReturnValue(images);
    jest.spyOn(classifier, "assert").mockReturnValue(true);

    await ImageDiscernibleCorrectly.validate(validateMethodArguments);

    expect(response.failedNodes).toEqual(Array.from(images));
    expect(response.passedNodes.length).toBe(0);
  });

  it("should fail when aria-label contains only non-alphabetic characters", async () => {
    const { document, classifier, response } = validateMethodArguments;

    document.body.innerHTML = `<img aria-label="!!!" style="width:100px;height:100px;"/>`;

    const images = document.querySelectorAll("img");
    jest.spyOn(classifier, "getMatched").mockReturnValue(images);
    jest.spyOn(classifier, "assert").mockReturnValue(true);

    await ImageDiscernibleCorrectly.validate(validateMethodArguments);

    expect(response.failedNodes).toEqual(Array.from(images));
    expect(response.passedNodes.length).toBe(0);
  });

  it("should fail when alt text contains a single word with more than 20 characters", async () => {
    const { document, classifier, response } = validateMethodArguments;

    document.body.innerHTML = `<img alt="abcdefghijklmnopqrstuvwxyz" style="width:100px;height:100px;"/>`;

    const images = document.querySelectorAll("img");
    jest.spyOn(classifier, "getMatched").mockReturnValue(images);
    jest.spyOn(classifier, "assert").mockReturnValue(true);

    await ImageDiscernibleCorrectly.validate(validateMethodArguments);

    expect(response.failedNodes).toEqual(Array.from(images));
    expect(response.passedNodes.length).toBe(0);
  });

  it("should fail when aria-label contains a single word with more than 20 characters", async () => {
    const { document, classifier, response } = validateMethodArguments;

    document.body.innerHTML = `<img aria-label="abcdefghijklmnopqrstuvwxyz" style="width:100px;height:100px;"/>`;

    const images = document.querySelectorAll("img");
    jest.spyOn(classifier, "getMatched").mockReturnValue(images);
    jest.spyOn(classifier, "assert").mockReturnValue(true);

    await ImageDiscernibleCorrectly.validate(validateMethodArguments);

    expect(response.failedNodes).toEqual(Array.from(images));
    expect(response.passedNodes.length).toBe(0);
  });

  it("should fail when alt text contains more numbers than non-numbers", async () => {
    const { document, classifier, response } = validateMethodArguments;

    document.body.innerHTML = `<img alt="1234abc" style="width:100px;height:100px;"/>`;

    const images = document.querySelectorAll("img");
    jest.spyOn(classifier, "getMatched").mockReturnValue(images);
    jest.spyOn(classifier, "assert").mockReturnValue(true);

    await ImageDiscernibleCorrectly.validate(validateMethodArguments);

    expect(response.failedNodes).toEqual(Array.from(images));
    expect(response.passedNodes.length).toBe(0);
  });

  it("should fail when aria-label contains more numbers than non-numbers", async () => {
    const { document, classifier, response } = validateMethodArguments;

    document.body.innerHTML = `<img aria-label="1234abc" style="width:100px;height:100px;"/>`;

    const images = document.querySelectorAll("img");
    jest.spyOn(classifier, "getMatched").mockReturnValue(images);
    jest.spyOn(classifier, "assert").mockReturnValue(true);

    await ImageDiscernibleCorrectly.validate(validateMethodArguments);

    expect(response.failedNodes).toEqual(Array.from(images));
    expect(response.passedNodes.length).toBe(0);
  });

  it("should fail when alt text contains only dimensions", async () => {
    const { document, classifier, response } = validateMethodArguments;

    document.body.innerHTML = `<img alt="800x600" style="width:100px;height:100px;"/>`;

    const images = document.querySelectorAll("img");
    jest.spyOn(classifier, "getMatched").mockReturnValue(images);
    jest.spyOn(classifier, "assert").mockReturnValue(true);

    await ImageDiscernibleCorrectly.validate(validateMethodArguments);

    expect(response.failedNodes).toEqual(Array.from(images));
    expect(response.passedNodes.length).toBe(0);
  });

  it("should fail when aria-label contains only dimensions", async () => {
    const { document, classifier, response } = validateMethodArguments;

    document.body.innerHTML = `<img aria-label="800x600" style="width:100px;height:100px;"/>`;

    const images = document.querySelectorAll("img");
    jest.spyOn(classifier, "getMatched").mockReturnValue(images);
    jest.spyOn(classifier, "assert").mockReturnValue(true);

    await ImageDiscernibleCorrectly.validate(validateMethodArguments);

    expect(response.failedNodes).toEqual(Array.from(images));
    expect(response.passedNodes.length).toBe(0);
  });

  it("should skip image when assertDetector returns false", async () => {
    const { document, classifier, response } = validateMethodArguments;

    document.body.innerHTML = `<img/>`;

    const images = document.querySelectorAll("img");
    jest.spyOn(classifier, "getMatched").mockReturnValue(images);
    jest.spyOn(classifier, "assert").mockReturnValue(false);

    await ImageDiscernibleCorrectly.validate(validateMethodArguments);

    expect(response.passedNodes.length).toBe(0);
    expect(response.failedNodes.length).toBe(0);
  });

  it("should mark image as inapplicable when src is base64", async () => {
    const { document, classifier, response } = validateMethodArguments;

    document.body.innerHTML = `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" alt="Test image"/>`;

    const images = document.querySelectorAll("img");
    jest.spyOn(classifier, "getMatched").mockReturnValue(images);
    jest.spyOn(classifier, "assert").mockReturnValue(true);

    await ImageDiscernibleCorrectly.validate(validateMethodArguments);

    expect(response.inapplicableNodes).toEqual(Array.from(images));
    expect(response.passedNodes.length).toBe(0);
    expect(response.failedNodes.length).toBe(0);
  });

  it("should mark image as inapplicable when src is svg data uri", async () => {
    const { document, classifier, response } = validateMethodArguments;

    document.body.innerHTML = `<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E" alt="SVG image"/>`;

    const images = document.querySelectorAll("img");
    jest.spyOn(classifier, "getMatched").mockReturnValue(images);
    jest.spyOn(classifier, "assert").mockReturnValue(true);

    await ImageDiscernibleCorrectly.validate(validateMethodArguments);

    expect(response.inapplicableNodes).toEqual(Array.from(images));
    expect(response.passedNodes.length).toBe(0);
    expect(response.failedNodes.length).toBe(0);
  });

  it("should mark image as inapplicable when src is svg file", async () => {
    const { document, classifier, response } = validateMethodArguments;

    document.body.innerHTML = `<img src="image.svg" alt="SVG file"/>`;

    const images = document.querySelectorAll("img");
    jest.spyOn(classifier, "getMatched").mockReturnValue(images);
    jest.spyOn(classifier, "assert").mockReturnValue(true);

    await ImageDiscernibleCorrectly.validate(validateMethodArguments);

    expect(response.inapplicableNodes).toEqual(Array.from(images));
    expect(response.passedNodes.length).toBe(0);
    expect(response.failedNodes.length).toBe(0);
  });

  it("should mark image as inapplicable when src contains linear-gradient", async () => {
    const { document, classifier, response } = validateMethodArguments;

    document.body.innerHTML = `<img src="linear-gradient(to right, red, blue)" alt="Gradient"/>`;

    const images = document.querySelectorAll("img");
    jest.spyOn(classifier, "getMatched").mockReturnValue(images);
    jest.spyOn(classifier, "assert").mockReturnValue(true);

    await ImageDiscernibleCorrectly.validate(validateMethodArguments);

    expect(response.inapplicableNodes).toEqual(Array.from(images));
    expect(response.passedNodes.length).toBe(0);
    expect(response.failedNodes.length).toBe(0);
  });
});
