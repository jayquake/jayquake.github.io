import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const BackgroundImageDiscernibleImageFailure = () => {
  const ruleId = "background-image-discernible-image";
  const title = `Functional image displayed using CSS background properties should be tagged for assistive technology`;
  const description = `Functional images presented using CSS background or background-image properties should be marked up using role="img" so that they can be identified as images by screen reader users.`;
  const helpText = `Add role="img" to elements that present functional images using CSS.`;
  const fixSteps = [
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
  ];
  const htmlExamples = [
  { filename: "background image with first child discernible sr only that doesnt have role img", content: `<style>
  .background-image-element {
    background-image: url("path/to/your/image.jpg");
    background-size: cover;
    background-position: center;
    position: relative;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
</style>

<div class="background-image-element">
  <span class="sr-only" aria-label="Background image of diverse professionals collaborating in a modern office"></span>
  <h1>Welcome to Our Website</h1>
  <p>Discover our range of services and products tailored for you.</p>
</div>` }
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

export default BackgroundImageDiscernibleImageFailure;
