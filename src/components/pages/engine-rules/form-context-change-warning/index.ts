import { CompliantComponentForm, CompliantComponentFormSubmitButton, PerceivableTraitScreenReaderOnly, PerceivableComponentSearchForm, PerceivableComponentNewsletterForm } from "@acsbe/core-engine-classifier";
import { textContainsString, textContainsWord } from "@acsbe/core-engine-dictionary";
import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";

/**
 * given a text and a dictionary key, this function checks if the text contains the word via `textContainsWord` and falls back to `textContainsString`
 */
export const textContainsWordOrString = (text: string, key: Parameters<typeof textContainsWord>[1]) => {
  return textContainsWord(text, key) || textContainsString(text, key);
};

/**
 * contains either `form` and variations of `submit` or `form_submission` sentence
 */
const containsContextChangeWarning = (text: string) => {
  return textContainsWordOrString(text, "form") && (textContainsWordOrString(text, "submit") || textContainsWordOrString(text, "submission"));
};

export const FormContextChangeWarning: Rule = {
  id: "form-context-change-warning",
  metadata: {
    category: "Forms",
    profile: ["Blind"],
    wcagVersion: "2.0",
    wcagLevel: "A",
  },
  impact: "critical",
  title: "Interacting with form controls should not cause a change in context unless a user is notified beforehand",
  description: "Interacting with form controls shouldn't automatically submit a form or cause any other change in context without notifying the user in advance. Form controls that cause a context change on input can disorient a user, since the behavior is not expected.",
  advice: "Make sure that forms can be manually submitted via a submit button, or provide instructions that notify users of the expected behavior before they interact with the control.",
  associatedDetectors: [CompliantComponentForm, CompliantComponentFormSubmitButton, PerceivableTraitScreenReaderOnly, PerceivableComponentSearchForm, PerceivableComponentNewsletterForm],
  refs: [
    {
      type: "WCAG",
      id: "3.2.2",
      level: "A",
      link: "https://www.w3.org/WAI/WCAG22/Understanding/on-input.html",
    },
    {
      type: "WCAG Technique",
      link: "https://www.w3.org/TR/2008/WD-WCAG20-TECHS-20080430/H32.html",
    },
    {
      type: "WCAG Technique",
      link: "https://www.w3.org/TR/2008/WD-WCAG20-TECHS-20080430/G80.html",
    },
    {
      type: "WCAG Technique",
      link: "https://www.w3.org/WAI/WCAG21/Techniques/general/G13",
    },
    {
      type: "WAI",
      link: "https://www.w3.org/WAI/WCAG20/quickref/20080430/#consistent-behavior-unpredictable-change",
    },
  ],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ response, classifier }) {
    /**
     * Search and newsletter forms are common false positives for this heuristic.
     * We exclude them from this rule rather than marking them as passed, because the rule does not actually evaluate whether they cause a context change.
     */
    const forms = classifier.getMatched([CompliantComponentForm]).filter((form) => !classifier.assert(form, PerceivableComponentSearchForm) && !classifier.assert(form, PerceivableComponentNewsletterForm));
    for (const form of forms) {
      const submitButtons = classifier.getMatched([CompliantComponentFormSubmitButton], form);

      if (submitButtons.length) {
        response.passedNodes.push(form);
        continue;
      }

      /**
       * submit buttons that are outside the form but are assigned to it
       */
      const associatedSubmitButtons = classifier.getContext(CompliantComponentFormSubmitButton).data.formInputs;

      if (associatedSubmitButtons.get(form)) {
        response.passedNodes.push(form);
        continue;
      }

      const {
        contentInfo: { accessibleName },
      } = classifier.getOperations(form);

      /**
       * The remediation appends the warning to the form's highest priority name attribute when it has one,
       * so a remediated form must not be failed again.
       *
       * @see src/rules/form-context-change-warning/atomic-tests/pass/remediated-form-with-aria-label.html
       * @see src/rules/form-context-change-warning/atomic-tests/pass/remediated-form-with-aria-labelledby.html
       */
      if (containsContextChangeWarning(accessibleName)) {
        response.passedNodes.push(form);
        continue;
      }

      /**
       * The form role only takes its accessible name from the author (aria-label, aria-labelledby, title), never from its contents,
       * so the nested warning is not reflected in the accessibleName check above and must be looked up separately.
       *
       * When the form has no existing accessible name source, the remediation adds the warning in a nested sr-only element instead.
       *
       * @see https://www.w3.org/TR/wai-aria-1.2/#form
       * @see src/rules/form-context-change-warning/atomic-tests/pass/remediated-form-with-sr-only-warning.html
       * @see src/rules/form-context-change-warning/atomic-tests/fail/sr-only-warning-hidden-from-screen-reader.html
       */
      const srOnlyElements = classifier.getMatched([PerceivableTraitScreenReaderOnly], form);
      if (srOnlyElements.some((srOnlyElement) => containsContextChangeWarning(classifier.getOperations(srOnlyElement).contentInfo.srVisibleText))) {
        response.passedNodes.push(form);
        continue;
      }

      response.failedNodes.push(form);
    }
  },
};
