import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";
import type EngineClassifier from "@acsbe/core-engine-classifier";
import { type SvgOrHtmlElement } from "@acsbe/core-engine-classifier";
import { PerceivableComponentDialogModal, CompliantComponentDialogModal, PerceivableComponentBackdrop, getAncestors } from "@acsbe/core-engine-classifier";

/**
 * Checks if the given element has a compliant dialog modal ancestor within the backdrop
 */
const hasCompliantAncestor = (element: SvgOrHtmlElement, backdrop: HTMLElement, classifier: EngineClassifier) => {
  for (const ancestor of getAncestors(element, backdrop)) {
    if (classifier.assert(ancestor, CompliantComponentDialogModal)) {
      return true;
    }
  }
  return false;
};

export const DialogModalMismatch: Rule = {
  id: "dialog-modal-mismatch",
  metadata: {
    category: "Dialogs",
    profile: ["Blind"],
    wcagVersion: "2.0",
    wcagLevel: "A",
  },
  impact: "critical",
  title: "Modal dialogs should be tagged for assistive technology",
  description: "Content behind active modal dialogs should not be navigable, otherwise screen reader users may still encounter hidden or unrelated content, disrupting the intended workflow and making it harder to focus on the dialog’s purpose.",
  advice: 'Add aria-modal="true" alongside role="dialog" to indicate to screen readers that the dialog is modal and that content outside of it should be treated as inactive. Screen readers will recognize this and adjust their behavior to keep the user’s focus inside the dialog.',
  refs: [
    {
      type: "WCAG",
      id: "4.1.2",
      level: "A",
      link: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
    },
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
    const elements = classifier.getMatched([PerceivableComponentDialogModal]);

    for (const element of elements) {
      if (classifier.assert(element, CompliantComponentDialogModal)) {
        response.passedNodes.push(element);
        continue;
      }

      // The dialog semantics may live on the backdrop wrapping the perceived dialog, or anywhere in between (e.g. Bootstrap's `.modal` / `.modal-dialog`)
      const backdrop = classifier.getParent(element, PerceivableComponentBackdrop);

      // if there's no backdrop, the perceived dialog cannot be compliant (and we dont want to pass it to getAncestor to waste resources)
      if (!backdrop) {
        response.failedNodes.push(element);
        continue;
      }

      if (hasCompliantAncestor(element, backdrop, classifier)) {
        response.passedNodes.push(element);
      } else {
        response.failedNodes.push(element);
      }
    }
  },
};
