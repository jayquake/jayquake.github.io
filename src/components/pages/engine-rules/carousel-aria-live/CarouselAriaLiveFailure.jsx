import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const CarouselAriaLiveFailure = () => {
  const ruleId = "carousel-aria-live";
  const title = `Carousels should not be tagged as live regions`;
  const description = `When carousels are tagged as live regions, screen readers will interrupt reading and announce every slide change, even when the user isn't interacting with the carousel or is in another section entirely.`;
  const helpText = `Remove the aria-live attribute and any live region roles, such as role="alert", from the carousel and its content.`;
  const fixSteps = [
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
  ];
  const htmlExamples = [
  { filename: "amazon carousel children with aria live polite", fixture: "carousel-aria-live/0-amazon-carousel-children-with-aria-live-polite.html" },
  { filename: "amazon carousel with aria live assertive", fixture: "carousel-aria-live/1-amazon-carousel-with-aria-live-assertive.html" },
  { filename: "amazon carousel with aria live polite", fixture: "carousel-aria-live/2-amazon-carousel-with-aria-live-polite.html" }
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

export default CarouselAriaLiveFailure;
