import { CompliantTraitVisible, PerceivableTraitHidden, PerceivableTraitRenderable, PerceivableTraitScreenReaderOnly, PerceivableTraitVisible, CompliantTraitInteractable, CompliantTraitExplicitlyHidden, CompliantComponentInputCheckbox, CompliantComponentInputRadio, CompliantComponentInputFile } from "@acsbe/core-engine-classifier";
import type EngineClassifier from "@acsbe/core-engine-classifier";
import type { SvgOrHtmlElement } from "@acsbe/core-engine-classifier";
import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";

export const VisibilityMisuse: Rule = {
  id: "visibility-misuse",
  metadata: {
    category: "General",
    profile: ["Blind"],
    wcagVersion: "2.0",
    wcagLevel: "A",
  },
  impact: "critical",
  title: "Visibly hidden content should not be exposed to assistive technology",
  description: "When elements are visually hidden but still exposed to assistive technology, screen reader users may encounter content that should not be available in the current interface. This can obscure the current state of the page and lead to confusion about what information or controls are available.",
  advice: 'Use aria-hidden="true" to remove elements from the accessibility tree when they should not be exposed to assistive technology. Consider using CSS techniques, such as display:none or visibility:hidden when the content should be hidden from all users.',
  associatedDetectors: [PerceivableTraitHidden, PerceivableTraitVisible, PerceivableTraitRenderable, CompliantTraitVisible, PerceivableTraitScreenReaderOnly, CompliantTraitInteractable, CompliantTraitExplicitlyHidden, CompliantComponentInputCheckbox, CompliantComponentInputRadio, CompliantComponentInputFile],
  refs: [
    {
      type: "WCAG",
      id: "1.3.2",
      level: "A",
      link: "https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html",
    },
    {
      type: "Non-Standard",
      link: "https://guides.18f.gov/accessibility/hidden-content/#:~:text=Hiding%20content%20is%20very%20useful,can%20hide%20content%20from%20both.",
    },
    {
      type: "Non-Standard",
      link: "https://a11y-guidelines.orange.com/en/articles/accessible-hiding/",
    },
    {
      type: "Non-Standard",
      link: "https://www.tpgi.com/html5-accessibility-chops-hidden-and-aria-hidden/",
    },
    {
      type: "ACT",
      ruleId: "6cfa84",
      link: "https://act-rules.github.io/rules/6cfa84",
    },
  ],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ response, classifier }) {
    const hiddenElements = classifier.getMatched([PerceivableTraitRenderable, PerceivableTraitHidden]);

    for (const hiddenElement of hiddenElements) {
      if (!classifier.assert(hiddenElement, CompliantTraitVisible)) {
        response.passedNodes.push(hiddenElement);
        continue;
      }

      if (shouldMarkAsInapplicable(hiddenElement, classifier)) {
        response.inapplicableNodes.push(hiddenElement);
        continue;
      }

      const isNestedFailNode = response.failedNodes.some((node) => node.contains(hiddenElement));
      if (!isNestedFailNode) {
        response.failedNodes.push(hiddenElement);
      }
    }
  },
};

/**
 * Determines if an element should be marked as inapplicable for visibility misuse rule
 */
function shouldMarkAsInapplicable(element: SvgOrHtmlElement, classifier: EngineClassifier): boolean {
  // if the element or any of its ancestors or descendants are screen reader only, then it is inapplicable for this rule because it's purposfully hidden from sighted users but available to screen reader users
  if (classifier.getMatchedInclusive([PerceivableTraitScreenReaderOnly], element).length > 0 || classifier.getParent(element, PerceivableTraitScreenReaderOnly)) {
    return true;
  }

  // If the element has perceivable visible descendants, then we want to prevent it from being marked as failed because the remediation will hide visible descendants from screen readers
  if (classifier.getMatched([PerceivableTraitVisible], element).length > 0) {
    return true;
  }

  if (isPartOfSrVisibleText(element, classifier)) {
    return true;
  }

  if (classifier.getParent(element, CompliantTraitExplicitlyHidden)) {
    return true;
  }

  // If the element is a compliant input field, it is likely that it is hidden for visual purposes but still needs to be accessible for screen reader users to interact with, such as an input field that is visually hidden but still accessible for screen readers inside a custom control that is visible to sighted users.
  if (classifier.assert(element, CompliantComponentInputCheckbox) || classifier.assert(element, CompliantComponentInputRadio) || classifier.assert(element, CompliantComponentInputFile)) {
    return true;
  }

  return false;
}

/**
 * checks if the element is part of the accessible name of its interactable parent
 * e.g. alt attribute of an image inside a button
 */
function isPartOfSrVisibleText(element: SvgOrHtmlElement, classifier: EngineClassifier) {
  const interactableParent = classifier.getParent(element, CompliantTraitInteractable);

  if (!interactableParent) {
    return false;
  }

  const hiddenElementSrVisibleText = classifier.getOperations(element).contentInfo.srVisibleText;
  const interactableParentSrVisibleText = classifier.getOperations(interactableParent).contentInfo.srVisibleText;

  return interactableParentSrVisibleText === hiddenElementSrVisibleText;
}
