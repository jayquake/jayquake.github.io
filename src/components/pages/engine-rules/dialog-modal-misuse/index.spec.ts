import { DialogModalMisuse } from ".";
import type { ValidationMethodArguments } from "../../../test/unit/helpers/validation-method-arguments";
import validationMethodArguments from "../../../test/unit/helpers/validation-method-arguments";
import { CompliantComponentDialogModal, PerceivableComponentDialogModal } from "@acsbe/core-engine-classifier";

jest.mock("@acsbe/core-engine-classifier", () => ({
  ...jest.requireActual("../../../test/unit/__mocks__/core-engine-classifier"),
  CompliantComponentDialogModal: class CompliantComponentDialogModal {},
  PerceivableComponentBackdrop: class PerceivableComponentBackdrop {},
  PerceivableComponentDialogModal: class PerceivableComponentDialogModal {},
  getAncestors: function* (element: HTMLElement, root: HTMLElement) {
    for (let parent = element.parentElement; parent && parent !== root.parentElement; parent = parent.parentElement) {
      yield parent;
    }
  },
}));

describe("DialogModalMisuse Rule Validation", () => {
  let args: ValidationMethodArguments;

  beforeEach(() => {
    args = validationMethodArguments();
  });

  const setMatches = (compliant: HTMLElement[], perceived: HTMLElement[]) => {
    jest.spyOn(args.classifier, "getMatched").mockImplementation((detectors: unknown[]) => {
      if (detectors[0] === CompliantComponentDialogModal) return compliant;
      if (detectors[0] === PerceivableComponentDialogModal) return perceived;
      return [];
    });
  };

  const createModal = (document: Document) => {
    const wrapper = document.createElement("div");
    const intermediate = document.createElement("div");
    const panel = document.createElement("div");
    wrapper.appendChild(intermediate);
    intermediate.appendChild(panel);
    return { wrapper, intermediate, panel };
  };

  it("passes a compliant element that is itself a perceived dialog", async () => {
    const { classifier, document, response } = args;
    const panel = document.createElement("dialog");
    setMatches([panel], [panel]);
    jest.spyOn(classifier, "assert").mockImplementation((node: HTMLElement, detector: unknown) => node === panel && detector === PerceivableComponentDialogModal);

    await DialogModalMisuse.validate(args);

    expect(classifier.getMatched).not.toHaveBeenCalledWith([PerceivableComponentDialogModal]);
    expect(classifier.getParent).not.toHaveBeenCalled();
    expect(response.passedNodes).toEqual([panel]);
    expect(response.failedNodes).toEqual([]);
  });

  it("skips resolving the dialog scopes when there are no compliant elements", async () => {
    const { classifier, document, response } = args;
    setMatches([], [document.createElement("dialog")]);

    await DialogModalMisuse.validate(args);

    expect(classifier.getMatched).not.toHaveBeenCalledWith([PerceivableComponentDialogModal]);
    expect(classifier.getParent).not.toHaveBeenCalled();
    expect(response.passedNodes).toEqual([]);
    expect(response.failedNodes).toEqual([]);
  });

  it("fails a compliant element when there is no perceived dialog", async () => {
    const { document, response } = args;
    const unrelated = document.createElement("div");
    setMatches([unrelated], []);

    await DialogModalMisuse.validate(args);

    expect(response.failedNodes).toEqual([unrelated]);
    expect(response.passedNodes).toEqual([]);
  });

  it("does not allow dialog semantics when a perceived dialog has no backdrop", async () => {
    const { classifier, document, response } = args;
    const perceivedDialog = document.createElement("dialog");
    const unrelated = document.createElement("div");
    setMatches([unrelated], [perceivedDialog]);
    jest.spyOn(classifier, "getParent").mockReturnValue(undefined);

    await DialogModalMisuse.validate(args);

    expect(classifier.getParent).toHaveBeenCalledWith(perceivedDialog, expect.anything());
    expect(response.failedNodes).toEqual([unrelated]);
    expect(response.passedNodes).toEqual([]);
  });

  it.each(["intermediate", "wrapper"] as const)("passes dialog semantics on the %s of a perceived panel", async (compliantNode) => {
    const { classifier, document, response } = args;
    const modal = createModal(document);
    setMatches([modal[compliantNode]], [modal.panel]);
    jest.spyOn(classifier, "getParent").mockReturnValue(modal.wrapper);

    await DialogModalMisuse.validate(args);

    expect(response.passedNodes).toEqual([modal[compliantNode]]);
    expect(response.failedNodes).toEqual([]);
  });

  it("does not accept semantics beyond the nearest backdrop or on an unrelated node", async () => {
    const { classifier, document, response } = args;
    const outer = document.createElement("div");
    const modal = createModal(document);
    const unrelated = document.createElement("div");
    outer.appendChild(modal.wrapper);
    setMatches([outer, unrelated, modal.intermediate], [modal.panel]);
    jest.spyOn(classifier, "getParent").mockReturnValue(modal.wrapper);

    await DialogModalMisuse.validate(args);

    expect(response.passedNodes).toEqual([modal.intermediate]);
    expect(response.failedNodes).toEqual([outer, unrelated]);
  });

  it("keeps the scopes of separate perceived dialogs independent", async () => {
    const { classifier, document, response } = args;
    const first = createModal(document);
    const second = createModal(document);
    setMatches([first.wrapper, second.intermediate], [first.panel, second.panel]);
    jest.spyOn(classifier, "getParent").mockImplementation((node: HTMLElement) => (node === first.panel ? first.wrapper : second.wrapper));

    await DialogModalMisuse.validate(args);

    expect(response.passedNodes).toEqual([first.wrapper, second.intermediate]);
    expect(response.failedNodes).toEqual([]);
  });
});
