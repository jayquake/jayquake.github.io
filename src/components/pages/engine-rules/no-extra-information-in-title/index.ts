import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";
import { CompliantTraitNameProhibited, CompliantTraitVisible } from "@acsbe/core-engine-classifier";

export const NoExtraInformationInTitle: Rule = {
  id: "no-extra-information-in-title",
  metadata: {
    category: "Interactive Content",
    profile: ["Blind"],
    wcagVersion: "General Guidelines",
    wcagLevel: "N/A",
  },
  impact: "minor",
  title: "Information in the title attribute should be included in the accessible name",
  description:
    "When the title attribute supplies an element's accessible name, its information is exposed through that name. When another source supplies the accessible name, it should include the title text so that information is not omitted. Elements without an accessible name are outside this rule's scope and should be evaluated by discernibility rules.",
  advice: "Make sure that the title attribute is not the only means of providing a label by assigning an aria-label or aria-labelledby attribute to the interactive control.",
  associatedDetectors: [CompliantTraitVisible, CompliantTraitNameProhibited],
  refs: [
    {
      type: "Non-Standard",
      link: "https://www.a11yproject.com/posts/title-attributes/",
    },
    {
      type: "Non-Standard",
      link: "https://www.tpgi.com/html5-accessibility-chops-title-attribute-use-and-abuse/",
    },
  ],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ response, document, classifier }) {
    const elements = document.querySelectorAll<HTMLElement>("[title]");

    for (const element of elements) {
      if (!classifier.assert(element, CompliantTraitVisible)) {
        response.inapplicableNodes.push(element);
        continue;
      }

      /** Naming a name-prohibited element is not allowed, so context added by a remediation could never be exposed as its name. */
      if (classifier.assert(element, CompliantTraitNameProhibited)) {
        response.inapplicableNodes.push(element);
        continue;
      }

      const {
        contentInfo: { accessibleName, title },
      } = classifier.getOperations(element);

      /**
       * Empty title attributes contain no information to evaluate.
       *
       * Some elements, such as generic elements, cannot derive an accessible
       * name from their title attribute. When no other source gives such an
       * element an accessible name, there is no name for this rule to compare
       * with the title. Those nodes are outside this rule's scope and are
       * therefore inapplicable.
       *
       * related e2e tests:
       * - @see file://./atomic-tests/pass/i-srVisibleText-contains-the-title.html
       * - @see file://./atomic-tests/pass/title-content-is-empty.html
       */
      if (!accessibleName || !title) {
        response.inapplicableNodes.push(element);
        continue;
      }

      const titleInAccessibleName = accessibleName.includes(title);

      if (titleInAccessibleName) {
        response.passedNodes.push(element);
      } else {
        response.failedNodes.push(element);
      }
    }
  },
};
