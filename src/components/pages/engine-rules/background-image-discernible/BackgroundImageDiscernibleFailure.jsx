import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const BackgroundImageDiscernibleFailure = () => {
  const ruleId = "N/A";
  const title = `N/A`;
  const description = `N/A`;
  const helpText = `N/A`;
  const fixSteps = [
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
  ];
  const htmlExamples = [
  { filename: "background image without discernible elements", content: `<style>
  .background-image-element {
    background-image: url("path/to/your/image.jpg");
    background-size: cover;
    background-position: center;
    position: relative;
  }
</style>

<div class="background-image-element">Hello</div>` },
  { filename: "backgroung image with empty sr only first child", content: `<style>
  .background-image {
    background-image: url("path/to/your/image.jpg");
    background-size: cover;
    background-position: center;
    position: relative;
    height: 250px;
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

<div id="test-case-1" class="test-case background-image pass">
  <span class="sr-only" role="img"></span>
  <p>Test Case 1: Pass</p>
</div>` },
  { filename: "backgroung image with first child discernible that is not sr only", content: `<style>
  .background-image-element {
    background-image: url("path/to/your/image.jpg");
    background-size: cover;
    background-position: center;
    position: relative;
  }
</style>

<div class="background-image-element">
  <span role="img" aria-label="Background image of diverse professionals collaborating in a modern office"></span>
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

export default BackgroundImageDiscernibleFailure;
