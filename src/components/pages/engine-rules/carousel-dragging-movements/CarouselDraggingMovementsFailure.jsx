import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const CarouselDraggingMovementsFailure = () => {
  const ruleId = "carousel-dragging-movements";
  const title = `Carousels that require dragging movements should provide alternative methods of operation with a single pointer`;
  const description = `Carousels that require dragging movements should provide alternative methods of operation with a single pointer for example prev and next buttons or pagination.`;
  const helpText = `The nodes in the failed nodes indicate that this carousel may not be operable with a single pointer. If this is the case, ensure that the carousel can be operated using a single pointer. For example, provide “Previous” and “Next” buttons to navigate between slides, or pagination controls that allow direct access to specific slides.`;
  const fixSteps = [
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
  ];
  const htmlExamples = [
  { filename: "slick slider without prev and next buttons", fixture: "carousel-dragging-movements/0-slick-slider-without-prev-and-next-buttons.html" },
  { filename: "swiper slider with pagination not working", fixture: "carousel-dragging-movements/1-swiper-slider-with-pagination-not-working.html" },
  { filename: "swiper slider without pagination prev and next buttons", fixture: "carousel-dragging-movements/2-swiper-slider-without-pagination-prev-and-next-buttons.html" },
  { filename: "vertical carousel", fixture: "carousel-dragging-movements/3-vertical-carousel.html" }
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

export default CarouselDraggingMovementsFailure;
