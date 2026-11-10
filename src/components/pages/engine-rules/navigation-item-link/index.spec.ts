import { CompliantComponentListItem, CompliantComponentNavigation, CompliantComponentLink, CompliantComponentButton, PerceivableTraitClickable } from "@acsbe/core-engine-classifier";
import { NavigationItemLink } from ".";
import type { ValidationMethodArguments } from "../../../test/unit/helpers/validation-method-arguments";
import validationMethodArguments from "../../../test/unit/helpers/validation-method-arguments";

// The shared classifier mock doesn't export detectors, give each one a distinct stub
jest.mock("@acsbe/core-engine-classifier", () => ({
  CompliantComponentNavigation: class CompliantComponentNavigation {},
  CompliantComponentListItem: class CompliantComponentListItem {},
  CompliantComponentLink: class CompliantComponentLink {},
  CompliantComponentButton: class CompliantComponentButton {},
  PerceivableTraitClickable: class PerceivableTraitClickable {},
}));

/**
 * Simplified selector-based stand-ins for the classifier detectors used by the rule.
 */
const detectorSelectors = new Map<unknown, string>([
  [CompliantComponentNavigation, "nav, [role=navigation]"],
  [CompliantComponentListItem, "li, [role=listitem]"],
  [PerceivableTraitClickable, "a, button, [onclick]"],
  [CompliantComponentLink, "a[href]:not([role]), [role=link]"],
  [CompliantComponentButton, "button:not([role]), [role=button], input[type=button], input[type=submit]"],
]);

const selectorOf = (detector: unknown) => detectorSelectors.get(detector) ?? "";

describe("NavigationItemLink Rule Validation", () => {
  let validateMethodArguments: ValidationMethodArguments;

  beforeEach(() => {
    validateMethodArguments = validationMethodArguments();
    const { classifier } = validateMethodArguments;

    (classifier.assert as jest.Mock).mockImplementation((node: HTMLElement, detector: unknown) => node.matches(selectorOf(detector)));
    (classifier.getMatched as jest.Mock).mockImplementation(([detector]: unknown[], root: HTMLElement = document.body) => Array.from(root.querySelectorAll(selectorOf(detector))));
    (classifier.getMatchedInclusive as jest.Mock).mockImplementation(([detector]: unknown[], root: HTMLElement) => {
      const selector = selectorOf(detector);
      return [...(root.matches(selector) ? [root] : []), ...Array.from(root.querySelectorAll(selector))];
    });
    (classifier.getParent as jest.Mock).mockImplementation((node: HTMLElement, detector: unknown) => node.parentElement?.closest(selectorOf(detector)) ?? null);
    (classifier.getOperations as jest.Mock).mockImplementation((node: HTMLElement) => ({ contentInfo: { visibleText: node.textContent?.trim() ?? "" } }));
  });

  it("should pass list items that contain links", async () => {
    const { response } = validateMethodArguments;
    document.body.innerHTML = `
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
        </ul>
      </nav>
    `;
    const listItems = Array.from(document.querySelectorAll("li"));

    await NavigationItemLink.validate(validateMethodArguments);

    expect(response.failedNodes).toEqual([]);
    expect(response.passedNodes).toEqual(listItems);
    expect(response.inapplicableNodes).toEqual([]);
  });

  it("should fail clickable list items without interactive semantics", async () => {
    const { response } = validateMethodArguments;
    document.body.innerHTML = `
      <nav>
        <ul>
          <li onclick="go('home')">Home</li>
          <li><div onclick="go('about')">About</div></li>
        </ul>
      </nav>
    `;
    const listItems = Array.from(document.querySelectorAll("li"));

    await NavigationItemLink.validate(validateMethodArguments);

    expect(response.failedNodes).toEqual(listItems);
    expect(response.passedNodes).toEqual([]);
  });

  it("should treat static text list items as inapplicable (e.g. breadcrumb current page)", async () => {
    const { response } = validateMethodArguments;
    document.body.innerHTML = `
      <nav aria-label="Breadcrumb">
        <ol>
          <li><a href="/">Home</a></li>
          <li aria-current="page">Shoes</li>
        </ol>
      </nav>
    `;
    const [home, current] = Array.from(document.querySelectorAll("li"));

    await NavigationItemLink.validate(validateMethodArguments);

    expect(response.failedNodes).toEqual([]);
    expect(response.passedNodes).toEqual([home]);
    expect(response.inapplicableNodes).toEqual([current]);
  });

  it("should pass clickable list items that wrap a link", async () => {
    const { response } = validateMethodArguments;
    document.body.innerHTML = `
      <nav>
        <ul>
          <li onclick="go('home')"><a href="/home">Home</a></li>
        </ul>
      </nav>
    `;

    await NavigationItemLink.validate(validateMethodArguments);

    expect(response.failedNodes).toEqual([]);
    expect(response.passedNodes).toEqual([document.querySelector("li")]);
  });

  it("should pass mixed links and buttons, including a clickable list item with a child menu button", async () => {
    const { response } = validateMethodArguments;
    document.body.innerHTML = `
      <nav><ul>
        <li><a href="/home">Home</a></li>
        <li><button type="button">Products</button></li>
        <li onclick="toggle()"><button type="button">Services</button></li>
        <li><span role="button" onclick="toggle()">More</span></li>
        <li><span role="link" onclick="navigate()">Contact</span></li>
      </ul></nav>
    `;
    const listItems = Array.from(document.querySelectorAll("li"));

    await NavigationItemLink.validate(validateMethodArguments);

    expect(response.failedNodes).toEqual([]);
    expect(response.passedNodes).toEqual(listItems);
  });

  it("should reject broad interactables that are neither links nor buttons", async () => {
    const { response } = validateMethodArguments;
    document.body.innerHTML = `
      <nav><ul>
        <li onclick="go()">Search <input type="text" aria-label="Search"></li>
        <li><span contenteditable="true" onclick="go()">Edit</span></li>
        <li onclick="go()">Options <select aria-label="Options"><option>One</option></select></li>
      </ul></nav>
    `;
    const listItems = Array.from(document.querySelectorAll("li"));

    await NavigationItemLink.validate(validateMethodArguments);

    expect(response.failedNodes).toEqual(listItems);
    expect(response.passedNodes).toEqual([]);
  });

  it("should pass clickables nested inside a link within the list item", async () => {
    const { response } = validateMethodArguments;
    document.body.innerHTML = `
      <nav>
        <ul>
          <li><a href="/home"><span onclick="track('home')">Home</span></a></li>
        </ul>
      </nav>
    `;

    await NavigationItemLink.validate(validateMethodArguments);

    expect(response.failedNodes).toEqual([]);
    expect(response.passedNodes).toEqual([document.querySelector("li")]);
  });

  it("should pass a clickable nested inside a button within the list item", async () => {
    const { response } = validateMethodArguments;
    document.body.innerHTML = `
      <nav><ul><li><button type="button"><span onclick="track()">Menu</span></button></li></ul></nav>
    `;

    await NavigationItemLink.validate(validateMethodArguments);

    expect(response.failedNodes).toEqual([]);
    expect(response.passedNodes).toEqual([document.querySelector("li")]);
  });

  it("should fail clickables whose only interactive ancestor is outside the list item", async () => {
    const { response } = validateMethodArguments;
    document.body.innerHTML = `
      <div role="button">
        <nav>
          <ul>
            <li><span onclick="go('home')">Home</span></li>
          </ul>
        </nav>
      </div>
    `;

    await NavigationItemLink.validate(validateMethodArguments);

    expect(response.failedNodes).toEqual([document.querySelector("li")]);
    expect(response.passedNodes).toEqual([]);
  });

  it("should not charge a nested sub-list item's clickable to its parent list item", async () => {
    const { response } = validateMethodArguments;
    document.body.innerHTML = `
      <div role="navigation">
        <ul>
          <li id="services">Services
            <ul>
              <li><a href="/web-design">Web Design</a></li>
              <li id="seo" onclick="go('seo')">SEO</li>
            </ul>
          </li>
        </ul>
      </div>
    `;

    await NavigationItemLink.validate(validateMethodArguments);

    expect(response.failedNodes).toEqual([document.getElementById("seo")]);
    expect(response.inapplicableNodes).toEqual([document.getElementById("services")]);
  });

  it("should not use a nested list item's link or button to justify a clickable parent", async () => {
    const { response } = validateMethodArguments;
    document.body.innerHTML = `
      <nav><ul>
        <li id="parent" onclick="toggle()">Services
          <ul><li id="child"><button type="button">Web design</button></li></ul>
        </li>
      </ul></nav>
    `;

    await NavigationItemLink.validate(validateMethodArguments);

    expect(response.failedNodes).toEqual([document.getElementById("parent")]);
    expect(response.passedNodes).toEqual([document.getElementById("child")]);
  });

  it("should treat icon-only controls as inapplicable", async () => {
    const { response } = validateMethodArguments;
    document.body.innerHTML = `
      <nav>
        <ul>
          <li><a href="/home">Home</a></li>
          <li id="language"><div tabindex="0" onclick="toggle()"><span class="icon-globe"></span></div></li>
        </ul>
      </nav>
    `;

    await NavigationItemLink.validate(validateMethodArguments);

    expect(response.failedNodes).toEqual([]);
    expect(response.passedNodes).toEqual([document.querySelector("li")]);
    expect(response.inapplicableNodes).toEqual([document.getElementById("language")]);
  });
});
