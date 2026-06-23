import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";
import { CompliantComponentHeader, PerceivableTraitSticky } from "@acsbe/core-engine-classifier";

interface ScrollPaddingConfig {
  styleId: string;
  dataAttribute: string;
  cssProperty: string;
}

/**
 * Retrieves the scroll padding value from a specific style element in the document head.
 *
 * @param {ScrollPaddingConfig} config - Configuration object containing style ID, data attribute, and CSS property.
 * @returns {number} - The parsed numeric value of the CSS property, or 0 if not found.
 */
function getScrollPaddingFromHeadStyle(config: ScrollPaddingConfig): number {
  const { styleId, dataAttribute, cssProperty } = config;
  const el = document.head.querySelector(`style#${styleId}`);

  if (!(el instanceof HTMLStyleElement) || !el.sheet) {
    return 0;
  }

  for (const rule of el.sheet.cssRules) {
    if (rule instanceof CSSStyleRule && rule.selectorText?.includes(`[${dataAttribute}="true"]`) && !rule.selectorText.includes(":has")) {
      const value = rule.style.getPropertyValue(cssProperty);
      return parseFloat(value) || 0;
    }
  }

  return 0;
}

/**
 * Checks if the scroll padding value is valid relative to a fixed element (header or footer).
 *
 * This function compares the computed scroll padding to the height of the fixed element.
 * If the computed scroll padding is insufficient, it falls back to checking
 * the scroll padding defined in a specific style element.
 *
 * @param {number} computedScrollPadding - The computed scroll padding value from the element's layout.
 * @param {number} fixedElementHeight - The height of the fixed element (header or footer).
 * @param {ScrollPaddingConfig} config - Configuration object for style element lookup.
 * @returns {boolean} - True if the scroll padding is valid, false otherwise.
 */
export function hasValidScrollPadding(computedScrollPadding: number, fixedElementHeight: number, config: ScrollPaddingConfig): boolean {
  if (computedScrollPadding >= fixedElementHeight) {
    return true;
  }

  const scrollPaddingFromStyle = getScrollPaddingFromHeadStyle(config);
  return scrollPaddingFromStyle >= fixedElementHeight;
}

export const FocusNotObscuredHeader: Rule = {
  id: "focus-not-obscured-header",
  metadata: {
    category: "Interactive Content",
    profile: ["Motor Impaired"],
    wcagVersion: "2.2",
    wcagLevel: "AA",
  },
  impact: "serious",
  title: "Focused elements should not be obscured by a sticky header",
  description: "A sticky header remains anchored to the top of the screen while the rest of the page content can be scrolled. If it is not offset from interactive elements, it can overlap and obscure the item in focus.",
  advice: "When a page has a sticky header, make sure that any element receiving focus is not fully covered by the header. One way to achieve this is by using the CSS property scroll-padding-top.",
  associatedDetectors: [CompliantComponentHeader, PerceivableTraitSticky],
  refs: [
    {
      type: "WCAG",
      id: "2.4.11",
      level: "AA",
      link: "https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html",
    },
    {
      type: "WCAG",
      id: "2.4.12",
      level: "AAA",
      link: "https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-enhanced.html",
    },
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
      type: "ACT",
      ruleId: "0ssw9k",
      link: "https://act-rules.github.io/rules/0ssw9k",
    },
  ],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ classifier, response }) {
    const stickyHeader = classifier.getMatched([CompliantComponentHeader, PerceivableTraitSticky])[0];
    if (stickyHeader) {
      const { firstScrollableParent } = classifier.getOperations(stickyHeader).layoutInfo;
      const computedScrollPadding = classifier.getOperations(firstScrollableParent).layoutInfo.scrollPaddingTop;
      const headerHeight = classifier.getOperations(stickyHeader).layoutInfo.height;

      if (
        !hasValidScrollPadding(computedScrollPadding, headerHeight, {
          styleId: "acsb-focus-not-obscured-header-global",
          dataAttribute: "data-acsb-header-first-scrollable-parent",
          cssProperty: "scroll-padding-top",
        })
      ) {
        response.failedNodes.push(stickyHeader);
      }
    }
  },
};
