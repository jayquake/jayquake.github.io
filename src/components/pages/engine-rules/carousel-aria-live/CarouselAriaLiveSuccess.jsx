import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const CarouselAriaLiveSuccess = () => {
  const ruleId = "carousel-aria-live";
  const title = `Carousels should not be tagged as live regions`;
  const description = `When carousels are tagged as live regions, screen readers will interrupt reading and announce every slide change, even when the user isn't interacting with the carousel or is in another section entirely.`;
  const helpText = `Remove the aria-live attribute and any live region roles, such as role="alert", from the carousel and its content.`;
  const bestPractices = [
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
  ];
  const htmlExamples = [
  { filename: "amazon carousel with aria live off", fixture: "carousel-aria-live/0-amazon-carousel-with-aria-live-off.html" },
  { filename: "amazon carousel with empty aria live", fixture: "carousel-aria-live/1-amazon-carousel-with-empty-aria-live.html" },
  { filename: "amazon carousel without aria live", fixture: "carousel-aria-live/2-amazon-carousel-without-aria-live.html" }
  ];

  return (
    <EngineIssueSuccess
      ruleId={ruleId}
      title={title}
      description={description}
      helpText={helpText}
      bestPractices={bestPractices}
      htmlExamples={htmlExamples}
    />
  );
};

export default CarouselAriaLiveSuccess;
