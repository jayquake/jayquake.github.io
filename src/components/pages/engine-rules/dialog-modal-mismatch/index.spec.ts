import { DialogModalMismatch } from ".";
import type { ValidationMethodArguments } from "../../../test/unit/helpers/validation-method-arguments";
import validationMethodArguments from "../../../test/unit/helpers/validation-method-arguments";
import { CompliantComponentDialogModal, PerceivableComponentBackdrop, PerceivableComponentDialogModal } from "@acsbe/core-engine-classifier";

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

describe("DialogModalMismatch Rule Validation", () => {
  let args: ValidationMethodArguments;

  beforeEach(() => {
    args = validationMethodArguments();
  });

  const createModal = (document: Document) => {
    const wrapper = document.createElement("div");
    const intermediate = document.createElement("div");
    const panel = document.createElement("div");
    wrapper.appendChild(intermediate);
    intermediate.appendChild(panel);
    return { wrapper, intermediate, panel };
  };

  it("passes a perceived dialog whose own semantics are compliant without a backdrop", async () => {
    const { classifier, document, response } = args;
    const panel = document.createElement("dialog");
    document.body.appendChild(panel);
    jest.spyOn(classifier, "getMatched").mockReturnValue([panel]);
    const assert = jest.spyOn(classifier, "assert").mockReturnValue(true);

    await DialogModalMismatch.validate(args);

    expect(classifier.getMatched).toHaveBeenCalledWith([PerceivableComponentDialogModal]);
    expect(classifier.getParent).not.toHaveBeenCalled();
    expect(assert).toHaveBeenCalledWith(panel, CompliantComponentDialogModal);
    expect(response.passedNodes).toEqual([panel]);
    expect(response.failedNodes).toEqual([]);
  });

  it("does not use an ancestor's semantics when the perceived dialog has no backdrop", async () => {
    const { classifier, document, response } = args;
    const panel = document.createElement("div");
    const container = document.createElement("div");
    container.appendChild(panel);
    document.body.appendChild(container);
    jest.spyOn(classifier, "getMatched").mockReturnValue([panel]);
    const assert = jest.spyOn(classifier, "assert").mockImplementation((node: HTMLElement) => node === container);

    await DialogModalMismatch.validate(args);

    expect(assert).toHaveBeenCalledTimes(1);
    expect(classifier.getParent).toHaveBeenCalledWith(panel, PerceivableComponentBackdrop);
    expect(response.failedNodes).toEqual([panel]);
    expect(response.passedNodes).toEqual([]);
  });

  it.each(["intermediate", "wrapper"] as const)("passes when the %s carries dialog semantics", async (compliantNode) => {
    const { classifier, document, response } = args;
    const modal = createModal(document);
    jest.spyOn(classifier, "getMatched").mockReturnValue([modal.panel]);
    jest.spyOn(classifier, "getParent").mockReturnValue(modal.wrapper);
    const assert = jest.spyOn(classifier, "assert").mockImplementation((node: HTMLElement) => node === modal[compliantNode]);

    await DialogModalMismatch.validate(args);

    expect(assert).toHaveBeenCalledWith(modal[compliantNode], CompliantComponentDialogModal);
    expect(response.passedNodes).toEqual([modal.panel]);
    expect(response.failedNodes).toEqual([]);
  });

  it("stops at the nearest backdrop, excluding compliant ancestors beyond it", async () => {
    const { classifier, document, response } = args;
    const outer = document.createElement("div");
    const modal = createModal(document);
    outer.appendChild(modal.wrapper);
    jest.spyOn(classifier, "getMatched").mockReturnValue([modal.panel]);
    jest.spyOn(classifier, "getParent").mockReturnValue(modal.wrapper);
    const assert = jest.spyOn(classifier, "assert").mockImplementation((node: HTMLElement) => node === outer);

    await DialogModalMismatch.validate(args);

    expect(assert).not.toHaveBeenCalledWith(outer, CompliantComponentDialogModal);
    expect(response.failedNodes).toEqual([modal.panel]);
  });

  it("checks every node in the scope when none is compliant", async () => {
    const { classifier, document, response } = args;
    const { wrapper, intermediate, panel } = createModal(document);
    jest.spyOn(classifier, "getMatched").mockReturnValue([panel]);
    jest.spyOn(classifier, "getParent").mockReturnValue(wrapper);
    const assert = jest.spyOn(classifier, "assert").mockReturnValue(false);

    await DialogModalMismatch.validate(args);

    expect(assert.mock.calls.map(([node]) => node)).toEqual([panel, intermediate, wrapper]);
    expect(response.failedNodes).toEqual([panel]);
  });
});
