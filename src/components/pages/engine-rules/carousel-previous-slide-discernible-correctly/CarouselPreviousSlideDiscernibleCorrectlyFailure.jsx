import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const CarouselPreviousSlideDiscernibleCorrectlyFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Carousel Previous Slide Discernible Correctly"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "carousel controls labelled wrongly", content: `<div id="test-subject" class="carousel" role="region" aria-roledescription="carousel" aria-label="News feed">
  <button class="control prev" aria-label="some button">&lt;</button>
  <ul class="carousel__slides-container">
    <li class="slide">slide 1</li>
    <li class="slide">slide 2</li>
    <li class="slide">slide 3</li>
  </ul>
  <button class="control next" aria-label="some other button">&gt;</button>
</div>` }
      ]}
    />
  );
};

export default CarouselPreviousSlideDiscernibleCorrectlyFailure;
