import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const CarouselDraggingMovementsSuccess = () => {
  const ruleId = "carousel-dragging-movements";
  const title = `Carousels that require dragging movements should provide alternative methods of operation with a single pointer`;
  const description = `Carousels that require dragging movements should provide alternative methods of operation with a single pointer for example prev and next buttons or pagination.`;
  const helpText = `The nodes in the failed nodes indicate that this carousel may not be operable with a single pointer. If this is the case, ensure that the carousel can be operated using a single pointer. For example, provide “Previous” and “Next” buttons to navigate between slides, or pagination controls that allow direct access to specific slides.`;
  const bestPractices = [
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
  ];
  const htmlExamples = [
  { filename: "slick slider big screen", fixture: "carousel-dragging-movements/0-slick-slider-big-screen.html" },
  { filename: "slick slider small screen", fixture: "carousel-dragging-movements/1-slick-slider-small-screen.html" },
  { filename: "slick slider with prev and next buttons", fixture: "carousel-dragging-movements/2-slick-slider-with-prev-and-next-buttons.html" },
  { filename: "swiper slider with custom button", fixture: "carousel-dragging-movements/3-swiper-slider-with-custom-button.html" },
  { filename: "swiper slider with pagination prev and next buttons", fixture: "carousel-dragging-movements/4-swiper-slider-with-pagination-prev-and-next-buttons.html" },
  { filename: "victrola com carousel", fixture: "carousel-dragging-movements/5-victrola-com-carousel.html" }
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

export default CarouselDraggingMovementsSuccess;
