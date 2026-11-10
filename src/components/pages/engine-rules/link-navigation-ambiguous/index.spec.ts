import type { ValidationMethodArguments } from "../../../test/unit/helpers/validation-method-arguments";
import validationMethodArguments from "../../../test/unit/helpers/validation-method-arguments";
import { LinkNavigationAmbiguous } from ".";

interface LinkContent {
  srVisibleText: string;
  isAmbiguous: boolean;
  accessibleName?: string;
  visibleText?: string;
}

describe("LinkNavigationAmbiguous Rule Validation", () => {
  let validateMethodArguments: ValidationMethodArguments;
  let mockedDocument: Document;
  let matchedLinks: Element[];
  let operationsByLink: Map<Element, unknown>;

  beforeEach(() => {
    validateMethodArguments = validationMethodArguments();
    mockedDocument = validateMethodArguments.document;
    matchedLinks = [];
    operationsByLink = new Map();

    const { classifier } = validateMethodArguments;
    (classifier.getMatched as jest.Mock).mockReturnValue(matchedLinks);
    (classifier.getOperations as jest.Mock).mockImplementation((link: Element) => operationsByLink.get(link));
  });

  function givenLink({ srVisibleText, isAmbiguous, accessibleName = "", visibleText = "" }: LinkContent): HTMLAnchorElement {
    const link = mockedDocument.createElement("a");
    link.href = "https://example.com";
    matchedLinks.push(link);
    operationsByLink.set(link, {
      contentInfo: { srVisibleText, accessibleName, visibleText },
      contextInfo: { isAmbiguous },
    });

    return link;
  }

  it("should have no nodes in any collection if there are no links in the page", async () => {
    const { response } = validateMethodArguments;

    await LinkNavigationAmbiguous.validate(validateMethodArguments);

    expect(response.failedNodes).toHaveLength(0);
    expect(response.passedNodes).toHaveLength(0);
    expect(response.inapplicableNodes).toHaveLength(0);
  });

  it("should have an inapplicable node if the link has NO sr-visible text", async () => {
    const { response } = validateMethodArguments;
    const link = givenLink({ srVisibleText: "", isAmbiguous: true });

    await LinkNavigationAmbiguous.validate(validateMethodArguments);

    expect(response.failedNodes).toHaveLength(0);
    expect(response.passedNodes).toHaveLength(0);
    expect(response.inapplicableNodes).toEqual([link]);
  });

  it("should have a passed node if the link is not ambiguous", async () => {
    const { response } = validateMethodArguments;
    const link = givenLink({ srVisibleText: "go to cart", isAmbiguous: false, accessibleName: "go to cart", visibleText: "go to cart" });

    await LinkNavigationAmbiguous.validate(validateMethodArguments);

    expect(response.failedNodes).toHaveLength(0);
    expect(response.inapplicableNodes).toHaveLength(0);
    expect(response.passedNodes).toEqual([link]);
  });

  it("should have a failed node if the link is ambiguous and its accessible name is only the visible text", async () => {
    const { response } = validateMethodArguments;
    const link = givenLink({ srVisibleText: "Click here", isAmbiguous: true, accessibleName: "Click here", visibleText: "Click here" });

    await LinkNavigationAmbiguous.validate(validateMethodArguments);

    expect(response.passedNodes).toHaveLength(0);
    expect(response.inapplicableNodes).toHaveLength(0);
    expect(response.failedNodes).toEqual([link]);
  });

  it("should have a failed node if the link is ambiguous and has NO visible text to measure the accessible name against", async () => {
    const { response } = validateMethodArguments;
    const link = givenLink({ srVisibleText: "Click here", isAmbiguous: true, accessibleName: "Click here about pricing", visibleText: "" });

    await LinkNavigationAmbiguous.validate(validateMethodArguments);

    expect(response.passedNodes).toHaveLength(0);
    expect(response.failedNodes).toEqual([link]);
  });

  it("should have a failed node if the accessible name replaces the visible text instead of extending it", async () => {
    const { response } = validateMethodArguments;
    const link = givenLink({ srVisibleText: "Read more", isAmbiguous: true, accessibleName: "Our accessibility statement", visibleText: "Read more" });

    await LinkNavigationAmbiguous.validate(validateMethodArguments);

    expect(response.passedNodes).toHaveLength(0);
    expect(response.failedNodes).toEqual([link]);
  });

  it("should have a passed node if the accessible name extends the visible text with context", async () => {
    const { response } = validateMethodArguments;
    const link = givenLink({ srVisibleText: "Read more", isAmbiguous: true, accessibleName: "Read more about pricing", visibleText: "Read more" });

    await LinkNavigationAmbiguous.validate(validateMethodArguments);

    expect(response.failedNodes).toHaveLength(0);
    expect(response.passedNodes).toEqual([link]);
  });

  it("should have a passed node if the accessible name extends the visible text ignoring case", async () => {
    const { response } = validateMethodArguments;
    const link = givenLink({ srVisibleText: "Read more", isAmbiguous: true, accessibleName: "READ MORE about pricing", visibleText: "Read more" });

    await LinkNavigationAmbiguous.validate(validateMethodArguments);

    expect(response.failedNodes).toHaveLength(0);
    expect(response.passedNodes).toEqual([link]);
  });

  it("should classify every link independently when the page mixes passing, failing, remediated and inapplicable links", async () => {
    const { response } = validateMethodArguments;
    const unambiguousLink = givenLink({ srVisibleText: "Go to cart", isAmbiguous: false, accessibleName: "Go to cart", visibleText: "Go to cart" });
    const ambiguousLink = givenLink({ srVisibleText: "Click here", isAmbiguous: true, accessibleName: "Click here", visibleText: "Click here" });
    const remediatedLink = givenLink({ srVisibleText: "Read more", isAmbiguous: true, accessibleName: "Read more about pricing", visibleText: "Read more" });
    const namelessLink = givenLink({ srVisibleText: "", isAmbiguous: true });

    await LinkNavigationAmbiguous.validate(validateMethodArguments);

    expect(response.passedNodes).toEqual([unambiguousLink, remediatedLink]);
    expect(response.failedNodes).toEqual([ambiguousLink]);
    expect(response.inapplicableNodes).toEqual([namelessLink]);
  });
});
