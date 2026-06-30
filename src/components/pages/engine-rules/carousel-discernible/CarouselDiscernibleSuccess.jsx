import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const CarouselDiscernibleSuccess = () => {
  const ruleId = "carousel-discernible";
  const title = `Carousels should have a descriptive label`;
  const description = `Carousels need a label so assistive technology announces them with a clear name, such as “Featured products carousel”. This ensures screen reader users know the widget’s purpose and can differentiate it from other carousels on the page.`;
  const helpText = `Provide a clear label for the carousel using aria-labelledby to reference a visible heading or assign aria-label to the carousel container.`;
  const bestPractices = [
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
  ];
  const htmlExamples = [
  { filename: "972creative carousels with discernible text", fixture: "carousel-discernible/0-972creative-carousels-with-discernible-text.html" },
  { filename: "amazon carousel", fixture: "carousel-discernible/1-amazon-carousel.html" },
  { filename: "carousel correctly tagged", fixture: "carousel-discernible/2-carousel-correctly-tagged.html" },
  { filename: "carousel element aria label with carousel", fixture: "carousel-discernible/3-carousel-element-aria-label-with-carousel.html" },
  { filename: "vuetifyjs carousel", fixture: "carousel-discernible/4-vuetifyjs-carousel.html" }
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

export default CarouselDiscernibleSuccess;
