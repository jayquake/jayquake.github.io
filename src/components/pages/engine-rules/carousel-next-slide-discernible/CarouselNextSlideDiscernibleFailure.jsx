import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const CarouselNextSlideDiscernibleFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Carousel Next Slide Discernible"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "carousel controls not labelled", content: `<div id="test-subject" class="carousel" role="region" aria-roledescription="carousel" aria-label="News feed">
  <button class="control prev">&lt;</button>
  <ul class="carousel__slides-container">
    <li class="slide">slide 1</li>
    <li class="slide">slide 2</li>
    <li class="slide">slide 3</li>
  </ul>
  <button class="control next"></button>
</div>` }
      ]}
    />
  );
};

export default CarouselNextSlideDiscernibleFailure;
