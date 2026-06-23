import { SearchInputAnnouncement } from ".";
import type { ValidationMethodArguments } from "../../../test/unit/helpers/validation-method-arguments";
import validationMethodArguments from "../../../test/unit/helpers/validation-method-arguments";

describe("SelectOptionAnnouncement Rule Validation", () => {
  let validateMethodArguments: ValidationMethodArguments;

  beforeEach(() => {
    validateMethodArguments = validationMethodArguments();
    const { document } = validateMethodArguments;
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  it("should pass if shopify search input has sr-only element with 'results are ready' announcement", async () => {
    const { classifier, response, document } = validateMethodArguments;
    document.body.innerHTML = `
      <div class="search-container">
        <input type="search" id="shopify-search" />
        <div class="sr-only">Results are ready</div>
      </div>
    `;

    const searchInput = document.getElementById("shopify-search");
    const srOnlyElement = document.querySelector(".sr-only");

    jest
      .spyOn(classifier, "getMatched")
      .mockReturnValueOnce([searchInput]) // First call: get shopify search inputs
      .mockReturnValueOnce([srOnlyElement]); // Second call: get sr-only elements in parent

    jest.spyOn(classifier, "getOperations").mockReturnValue({
      contentInfo: {
        srVisibleText: "Results are available",
      },
    } as any);

    await SearchInputAnnouncement.validate(validateMethodArguments);

    expect(response.passedNodes).toContain(searchInput);
    expect(response.failedNodes).not.toContain(searchInput);
  });

  it("should pass if shopify search input has sr-only element with 'ready' text", async () => {
    const { classifier, response, document } = validateMethodArguments;
    document.body.innerHTML = `
      <div class="search-container">
        <input type="search" id="shopify-search" />
        <span class="sr-only">Results ready</span>
      </div>
    `;

    const searchInput = document.getElementById("shopify-search");
    const srOnlyElement = document.querySelector(".sr-only");

    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([searchInput]).mockReturnValueOnce([srOnlyElement]);

    jest.spyOn(classifier, "getOperations").mockReturnValue({
      contentInfo: {
        srVisibleText: "Results available",
      },
    } as any);

    await SearchInputAnnouncement.validate(validateMethodArguments);

    expect(response.passedNodes).toContain(searchInput);
    expect(response.failedNodes).not.toContain(searchInput);
  });

  it("should pass if shopify search input has sr-only element with 'result' text", async () => {
    const { classifier, response, document } = validateMethodArguments;
    document.body.innerHTML = `
      <div class="search-container">
        <input type="search" id="shopify-search" />
        <div class="sr-only">Search results available</div>
      </div>
    `;

    const searchInput = document.getElementById("shopify-search");
    const srOnlyElement = document.querySelector(".sr-only");

    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([searchInput]).mockReturnValueOnce([srOnlyElement]);

    jest.spyOn(classifier, "getOperations").mockReturnValue({
      contentInfo: {
        srVisibleText: "Search results available",
      },
    } as any);

    await SearchInputAnnouncement.validate(validateMethodArguments);

    expect(response.passedNodes).toContain(searchInput);
    expect(response.failedNodes).not.toContain(searchInput);
  });

  it("should fail if shopify search input has no sr-only announcement", async () => {
    const { classifier, response, document } = validateMethodArguments;
    document.body.innerHTML = `
      <div class="search-container">
        <input type="search" id="shopify-search" />
      </div>
    `;

    const searchInput = document.getElementById("shopify-search");
    jest.spyOn(classifier, "getMatched").mockReturnValue([searchInput]);

    jest.spyOn(classifier, "getOperations").mockReturnValue({
      contentInfo: {
        srVisibleText: "",
      },
    } as any);

    await SearchInputAnnouncement.validate(validateMethodArguments);

    expect(response.failedNodes).toContain(searchInput);
    expect(response.passedNodes).not.toContain(searchInput);
  });

  it("should fail if shopify search input has sr-only element but text doesn't contain result or ready", async () => {
    const { classifier, response, document } = validateMethodArguments;
    document.body.innerHTML = `
      <div class="search-container">
        <input type="search" id="shopify-search" />
        <div class="sr-only">Loading...</div>
      </div>
    `;

    const searchInput = document.getElementById("shopify-search");
    const srOnlyElement = document.querySelector(".sr-only");
    jest.spyOn(classifier, "getMatched").mockReturnValueOnce([searchInput]).mockReturnValueOnce([srOnlyElement]);

    jest.spyOn(classifier, "getOperations").mockReturnValue({
      contentInfo: {
        srVisibleText: "Loading...",
      },
    } as any);

    await SearchInputAnnouncement.validate(validateMethodArguments);

    expect(response.failedNodes).toContain(searchInput);
    expect(response.passedNodes).not.toContain(searchInput);
  });

  it("should fail if shopify search input has no srVisibleText", async () => {
    const { classifier, response, document } = validateMethodArguments;
    document.body.innerHTML = `
      <input type="search" id="shopify-search" />
    `;

    const searchInput = document.getElementById("shopify-search");

    jest.spyOn(classifier, "getMatched").mockReturnValue([searchInput]);

    jest.spyOn(classifier, "getOperations").mockReturnValue({
      contentInfo: {
        srVisibleText: null,
      },
    } as any);

    await SearchInputAnnouncement.validate(validateMethodArguments);

    expect(response.failedNodes).toContain(searchInput);
    expect(response.passedNodes).not.toContain(searchInput);
  });

  it("should handle multiple shopify search inputs", async () => {
    const { classifier, response, document } = validateMethodArguments;
    document.body.innerHTML = `
      <div class="search-container-1">
        <input type="search" id="shopify-search-1" />
        <div class="sr-only">Results ready</div>
      </div>
      <div class="search-container-2">
        <input type="search" id="shopify-search-2" />
      </div>
    `;

    const searchInput1 = document.getElementById("shopify-search-1");
    const searchInput2 = document.getElementById("shopify-search-2");

    jest.spyOn(classifier, "getMatched").mockReturnValue([searchInput1, searchInput2]);

    jest.spyOn(classifier, "getOperations").mockImplementation((element) => {
      if (element === searchInput1) {
        return {
          contentInfo: {
            srVisibleText: "Results available",
          },
        } as any;
      }
      // searchInput2 has no announcement
      return {
        contentInfo: {
          srVisibleText: "",
        },
      } as any;
    });

    await SearchInputAnnouncement.validate(validateMethodArguments);

    expect(response.passedNodes).toContain(searchInput1);
    expect(response.failedNodes).toContain(searchInput2);
  });
});
