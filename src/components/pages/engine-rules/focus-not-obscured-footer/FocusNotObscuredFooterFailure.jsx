import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const FocusNotObscuredFooterFailure = () => {
  const ruleId = "focus-not-obscured-footer";
  const title = `Focused elements should not be obscured by a sticky footer`;
  const description = `A sticky footer remains anchored to the bottom of the screen while the rest of the page content can be scrolled. If it is not offset from interactive elements, it can overlap and obscure the item in focus.`;
  const helpText = `When a page has a sticky footer, make sure that any element receiving focus is not fully covered by the footer. One way to achieve this is by using the CSS property scroll-padding-bottom.`;
  const fixSteps = [
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
  ];
  const htmlExamples = [
  { filename: "footer ancestor position fixed with padding", fixture: "focus-not-obscured-footer/0-footer-ancestor-position-fixed-with-padding.html" },
  { filename: "footer ancestor position fixed", fixture: "focus-not-obscured-footer/1-footer-ancestor-position-fixed.html" },
  { filename: "footer ancestor position sticky with padding inside static div", fixture: "focus-not-obscured-footer/2-footer-ancestor-position-sticky-with-padding-inside-static-div.html" },
  { filename: "footer ancestor position sticky with padding", fixture: "focus-not-obscured-footer/3-footer-ancestor-position-sticky-with-padding.html" },
  { filename: "footer ancestor position sticky", fixture: "focus-not-obscured-footer/4-footer-ancestor-position-sticky.html" },
  { filename: "sticky footer position fixed html with scroll padding bottom less than footer height", fixture: "focus-not-obscured-footer/5-sticky-footer-position-fixed-html-with-scroll-padding-bottom-less-than-footer-he.html" },
  { filename: "sticky footer position fixed is hiding focused elements", fixture: "focus-not-obscured-footer/6-sticky-footer-position-fixed-is-hiding-focused-elements.html" },
  { filename: "sticky footer position sticky is hiding focused elements", fixture: "focus-not-obscured-footer/7-sticky-footer-position-sticky-is-hiding-focused-elements.html" },
  { filename: "sticky footer with scrollable parent with scroll padding bottom less than footer height", fixture: "focus-not-obscured-footer/8-sticky-footer-with-scrollable-parent-with-scroll-padding-bottom-less-than-footer.html" },
  { filename: "sticky footer with scrollable parent without scroll padding bottom", fixture: "focus-not-obscured-footer/9-sticky-footer-with-scrollable-parent-without-scroll-padding-bottom.html" }
  ];

  return (
    <EngineIssueFailure
      ruleId={ruleId}
      title={title}
      description={description}
      helpText={helpText}
      fixSteps={fixSteps}
      htmlExamples={htmlExamples}
    />
  );
};

export default FocusNotObscuredFooterFailure;
