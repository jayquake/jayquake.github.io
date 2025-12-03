import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const IframeDiscernibleFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Iframe Discernible"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "iframe empty title svg", content: `<!-- skipped till https://github.com/acsbe/core-engine-classifier/pull/245 is merged and released -->
<svg width="100%" height="500" xmlns="http://www.w3.org/2000/svg">
  <foreignObject x="10" y="10" width="500" height="450">
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>RPT Test Suite</title>
      </head>

      <body>
        <a href="#navskip">skip to main content</a>

        <h2>Test case: IFrame-hasEmptyTitle.svg</h2>

        <h3>IFrame Element Tests</h3>

        <ul>
          <li>Test - Valid iframe with empty Title atribute</li>
        </ul>

        <iframe id="iframe1" src="../support/frame_test1.html" style="width: 350px; height: 100px" scrolling="yes" frameborder="1" title="" name="first"> </iframe>

        <iframe id="iframe2" src="../g1/CSS-hasStyleAttr.svg" style="width: 350px; height: 200px" scrolling="yes" frameborder="1" title="" name="second"> </iframe>

        <a name="navskip"></a>
      </body>
    </html>
  </foreignObject>
</svg>` },
  { filename: "iframe empty title", content: `<iframe id="iframe1" src="../support/frame_test1.html" style="width:350px; height:100px;" scrolling="yes" frameborder="1" title="" name="first">
</iframe>` },
  { filename: "iframe no title", content: `<iframe src="path/to/somewhere">

</iframe>` },
  { filename: "iframe src example", content: `<iframe src="https://example.com" width="600" height="400"></iframe>` }
      ]}
    />
  );
};

export default IframeDiscernibleFailure;
