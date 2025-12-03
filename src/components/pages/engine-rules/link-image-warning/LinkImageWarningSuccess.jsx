import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const LinkImageWarningSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Link Image Warning"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "link image acsb sr element", content: `<a href="https://example.com/image.png" id="image-link">
  Source Image
  <span data-acsb-sr-only="true" class="acsb-sr-only" style="position: absolute !important; width: 1px !important; height: 1px !important; padding: 0px !important; overflow: hidden !important; clip: rect(0px, 0px, 0px, 0px) !important; border: 0px !important"> | Opens an image</span>
</a>` },
  { filename: "link image sr element", content: `<style>
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
<p>
  <a href="https://example.com/image.png" id="image-link"
    >View Image
    <span id="image-desc" class="sr-only">Opens an image</span>
  </a>
</p>` },
  { filename: "link image with aria describedby", content: `<p>
  <a href="https://example.com/image.png" id="image-link" aria-describedby="image-desc">View Image</a>
</p>
<p id="image-desc">Opens an image</p>` },
  { filename: "link image with aria label", content: `<p>
  <a href="https://example.com/image.png" aria-label="View Image, opens an image">View Image</a>
</p>` },
  { filename: "link image with aria labelledby", content: `<style>
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
<p>
  <a href="https://example.com/image.png" id="image-link" aria-labelledby="image-desc">View Image</a>
  <span id="image-desc" class="sr-only">This link opens an image in a new page</span>
</p>` }
      ]}
    />
  );
};

export default LinkImageWarningSuccess;
