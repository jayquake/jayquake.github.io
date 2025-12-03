import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const CarouselRedundantDiscernibleTextFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Carousel Redundant Discernible Text"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "carousel element aria label with carousel", content: `<div id="test-subject" class="carousel" role="region" aria-roledescription="carousel" aria-label="Awesome carousel">
    <ul class="carousel__slides-container">
        <li class="slide">slide 1</li>
        <li class="slide">slide 2</li>
        <li class="slide">slide 3</li>
    </ul>
</div>` }
      ]}
    />
  );
};

export default CarouselRedundantDiscernibleTextFailure;
