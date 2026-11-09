import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";
import { CompliantComponentDialogModal, PerceivableTraitVisible } from "@acsbe/core-engine-classifier";

export const DialogModalDiscernible: Rule = {
  id: "dialog-modal-discernible",
  metadata: {
    category: "Dialogs",
    profile: ["Blind"],
    wcagVersion: "2.0",
    wcagLevel: "A",
  },
  impact: "serious",
  title: "Modals should have a label",
  description: "Modals should be assigned labels that inform screen reader users of their purpose.",
  advice: "Add an aria-label or aria-labelledby attribute to the modal.",
  associatedDetectors: [CompliantComponentDialogModal, PerceivableTraitVisible],
  refs: [
    {
      type: "WCAG",
      id: "1.3.1",
      level: "A",
      link: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html",
    },
    {
      type: "WCAG",
      id: "4.1.2",
      level: "A",
      link: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
    },
    {
      type: "ACT",
      ruleId: "2ee8b8",
      link: "https://act-rules.github.io/rules/2ee8b8",
    },
  ],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ classifier, response }) {
    const modals = classifier.getMatched([CompliantComponentDialogModal, PerceivableTraitVisible]);

    for (const modal of modals) {
      const { accessibleName } = classifier.getOperations(modal).contentInfo;
      if (!accessibleName) {
        response.failedNodes.push(modal);
        continue;
      }

      response.passedNodes.push(modal);
    }
  },
};
