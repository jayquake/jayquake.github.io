import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";
import { PerceivableTraitFormFieldInteracted } from "@acsbe/core-engine-classifier";

export const AriaInvalidMisuse: Rule = {
  id: "aria-invalid-misuse",
  metadata: {
    category: "Forms",
    profile: ["Blind"],
    wcagVersion: "2.0",
    wcagLevel: "A",
  },
  impact: "serious",
  title: 'Only input fields with validation errors should be assigned aria-invalid="true"',
  description: 'Using aria-invalid="true" on an input field that does not have errors may cause confusion for users who rely on assistive technology, who may try to correct their already valid response.',
  advice: 'To make sure that screen reader users can accurately identify form fields with invalid input, set aria-invalid="true" only on input fields that have errors. Remove the attribute once the value becomes valid.',
  associatedDetectors: [PerceivableTraitFormFieldInteracted],
  refs: [
    {
      type: "WAI",
      link: "https://www.w3.org/TR/wai-aria/#aria-invalid",
    },
    {
      type: "WCAG",
      id: "3.3.1",
      level: "A",
      link: "https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#error-identification",
    },
    {
      type: "WCAG",
      id: "3.3.3",
      level: "A",
      link: "https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#error-suggestion",
    },
    {
      type: "Non-Standard",
      link: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-invalid",
    },
  ],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ response, document, classifier }) {
    const elements = document.querySelectorAll<HTMLElement>("[aria-invalid]:not([aria-invalid='false'])");

    for (const element of elements) {
      const interacted = classifier.assert(element, PerceivableTraitFormFieldInteracted);

      if (interacted) {
        response.passedNodes.push(element);
      } else {
        response.failedNodes.push(element);
      }
    }
  },
};
