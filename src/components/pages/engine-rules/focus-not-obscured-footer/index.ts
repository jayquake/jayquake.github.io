import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";
import { CompliantComponentFooter, PerceivableTraitSticky } from "@acsbe/core-engine-classifier";
import { hasValidScrollPadding } from "~/rules/focus-not-obscured-header";

export const FocusNotObscuredFooter: Rule = {
  id: "focus-not-obscured-footer",
  metadata: {
    category: "Interactive Content",
    profile: ["Motor Impaired"],
    wcagVersion: "2.2",
    wcagLevel: "AA",
  },
  impact: "serious",
  title: "Focused elements should not be obscured by a sticky footer",
  description: "A sticky footer remains anchored to the bottom of the screen while the rest of the page content can be scrolled. If it is not offset from interactive elements, it can overlap and obscure the item in focus.",
  advice: "When a page has a sticky footer, make sure that any element receiving focus is not fully covered by the footer. One way to achieve this is by using the CSS property scroll-padding-bottom.",
  associatedDetectors: [CompliantComponentFooter, PerceivableTraitSticky],
  refs: [
    { type: "WCAG", level: "AA", id: "2.4.11", link: "https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html" },
    {
      type: "WAI",
      link: "https://www.w3.org/TR/WCAG22/#focus-not-obscured-minimum",
    },
    {
      type: "WAI",
      link: "https://www.w3.org/WAI/WCAG22/Techniques/css/C43",
    },
    {
      type: "Non-Standard",
      link: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F110",
    },
    {
      type: "Non-Standard",
      link: "https://www.tpgi.com/how-to-test-2-4-11-focus-not-obscured-minimum/",
    },
    {
      type: "Non-Standard",
      link: "https://www.tpgi.com/prevent-focused-elements-from-being-obscured-by-sticky-headers/",
    },
    {
      type: "Non-Standard",
      link: "https://tetralogical.com/blog/2023/06/08/focus-in-view/",
    },
    {
      type: "ACT",
      ruleId: "0ssw9k",
      link: "https://act-rules.github.io/rules/0ssw9k",
    },
  ],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ classifier, response }) {
    const stickyFooter = classifier.getMatched([CompliantComponentFooter, PerceivableTraitSticky])[0];
    if (stickyFooter) {
      const { firstScrollableParent } = classifier.getOperations(stickyFooter).layoutInfo;
      const computedScrollPadding = classifier.getOperations(firstScrollableParent).layoutInfo.scrollPaddingBottom;
      const footerHeight = classifier.getOperations(stickyFooter).layoutInfo.height;

      if (
        !hasValidScrollPadding(computedScrollPadding, footerHeight, {
          styleId: "acsb-focus-not-obscured-footer-global",
          dataAttribute: "data-acsb-footer-first-scrollable-parent",
          cssProperty: "scroll-padding-bottom",
        })
      ) {
        response.failedNodes.push(stickyFooter);
      }
    }
  },
};
