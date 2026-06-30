import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const CarouselRedundantDiscernibleTextSuccess = () => {
  const ruleId = "carousel-redundant-discernible-text";
  const title = `Carousels should be labelled properly without redundancy`;
  const description = `Unlabeled carousel areas are difficult for screen reader users because content gets hidden and shown unexpectedly. However, when labelled, the label should not be redundant.`;
  const helpText = `When using the "aria-label" or "aria-labelledby" element to describe the contents of the carouse, do not use the word "carousel" in it, as it is redundant when used with the "role" and "aria-roledescription" attributes. Using all three of these attributes, assistive technology users will understand that this is a carousel region and what it contains.`;
  const bestPractices = [
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
  ];
  const htmlExamples = [
  { filename: "972creative carousels with discernible text", fixture: "carousel-redundant-discernible-text/0-972creative-carousels-with-discernible-text.html" },
  { filename: "972creative carousels with no discernible text", fixture: "carousel-redundant-discernible-text/1-972creative-carousels-with-no-discernible-text.html" },
  { filename: "amazon carousel", fixture: "carousel-redundant-discernible-text/2-amazon-carousel.html" },
  { filename: "carousel correctly tagged", fixture: "carousel-redundant-discernible-text/3-carousel-correctly-tagged.html" },
  { filename: "carousel element no aria label", fixture: "carousel-redundant-discernible-text/4-carousel-element-no-aria-label.html" },
  { filename: "vuetifyjs carousel", fixture: "carousel-redundant-discernible-text/5-vuetifyjs-carousel.html" }
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

export default CarouselRedundantDiscernibleTextSuccess;
