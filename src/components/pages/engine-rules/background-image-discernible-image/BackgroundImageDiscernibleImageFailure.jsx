import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const BackgroundImageDiscernibleImageFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Background Image Discernible Image"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
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
      ]}
    />
  );
};

export default BackgroundImageDiscernibleImageFailure;
