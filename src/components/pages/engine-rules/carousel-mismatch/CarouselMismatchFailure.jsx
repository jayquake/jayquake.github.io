import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const CarouselMismatchFailure = () => {
  const ruleId = "carousel-mismatch";
  const title = `Carousels should be tagged for assistive technology`;
  const description = `The carousel container should have a role so assistive technology treats it as a distinct section. Using role="region" with a label exposes the carousel as a named region, allowing screen reader users to recognize the purpose of the component and navigate to it efficiently.`;
  const helpText = `Assign role="region" to the carousel container. Make sure to provide a descriptive label using aria-label or aria-labelledby.`;
  const fixSteps = [
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
  ];
  const htmlExamples = [
  { filename: "972creative carousels", fixture: "carousel-mismatch/0-972creative-carousels.html" },
  { filename: "amazon carousel no role", fixture: "carousel-mismatch/1-amazon-carousel-no-role.html" },
  { filename: "amazon carousel no roledescription", fixture: "carousel-mismatch/2-amazon-carousel-no-roledescription.html" },
  { filename: "amazon carousel wrong role", fixture: "carousel-mismatch/3-amazon-carousel-wrong-role.html" }
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

export default CarouselMismatchFailure;
