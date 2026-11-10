import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";
import { PerceivableComponentDialogModal, CompliantComponentDialogModal, PerceivableComponentBackdrop, getAncestors } from "@acsbe/core-engine-classifier";

export const DialogModalMisuse: Rule = {
  id: "dialog-modal-misuse",
  metadata: {
    category: "Dialogs",
    profile: ["Blind"],
    wcagVersion: "2.0",
    wcagLevel: "A",
  },
  impact: "critical",
  title: "Only elements that function as dialogs should be tagged as dialog",
  description: "Marking up elements as dialogs without actual dialog behavior causes screen readers to announce a dialog, misleading users into expecting modal interaction and restricted reading order that do not occur.",
  advice: 'Remove role="dialog" from the non-dialog element or add role="presentation" if the HTML <dialog> element is used.',
  refs: [
    {
      type: "Non-Standard",
      link: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog",
    },
    {
      type: "Non-Standard",
      link: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-modal",
    },
    {
      type: "WAI",
      link: "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog/",
    },
  ],
  associatedDetectors: [PerceivableComponentDialogModal, CompliantComponentDialogModal, PerceivableComponentBackdrop],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ response, classifier }) {
    const elements = classifier.getMatched([CompliantComponentDialogModal]);

    // save elements that are not yet resolved as part of a perceivable dialog modal, this saves unnecessary getMatched/getParent/getAncestors calls later
    const elementsNotPerceivedAsDialogModals: typeof elements = [];
    for (const element of elements) {
      if (classifier.assert(element, PerceivableComponentDialogModal)) {
        response.passedNodes.push(element);
      } else {
        elementsNotPerceivedAsDialogModals.push(element);
      }
    }

    if (elementsNotPerceivedAsDialogModals.length === 0) return;

    // The dialog semantics may live on the backdrop wrapping a perceived dialog, or anywhere in between (e.g. Bootstrap's `.modal` / `.modal-dialog`)
    const allowedDialogSemanticElements = new Set<(typeof elements)[number]>();
    for (const dialog of classifier.getMatched([PerceivableComponentDialogModal])) {
      allowedDialogSemanticElements.add(dialog);
      const backdrop = classifier.getParent(dialog, PerceivableComponentBackdrop);

      if (!backdrop) {
        continue;
      }

      for (const ancestor of getAncestors(dialog, backdrop)) {
        allowedDialogSemanticElements.add(ancestor);
      }
    }

    for (const element of elementsNotPerceivedAsDialogModals) {
      if (allowedDialogSemanticElements.has(element)) {
        response.passedNodes.push(element);
      } else {
        response.failedNodes.push(element);
      }
    }
  },
};
