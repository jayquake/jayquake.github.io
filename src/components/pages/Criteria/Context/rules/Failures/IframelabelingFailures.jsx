/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): iframe-discernible
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Context: Iframe Labeling - Failure";

const IframelabelingFailures = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="context-iframe-labeling-failure-failure-1"
          data-atomic-source="iframe-discernible/iframe-empty-title-svg"
          dangerouslySetInnerHTML={{
            __html: `<!-- skipped till https://github.com/acsbe/core-engine-classifier/pull/245 is merged and released -->
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
</svg>`,
          }}
        />
        <div
          className="list-item"
          id="context-iframe-labeling-failure-failure-2"
          data-atomic-source="iframe-discernible/iframe-empty-title"
          dangerouslySetInnerHTML={{
            __html: `<iframe id="iframe1" src="../support/frame_test1.html" style="width:350px; height:100px;" scrolling="yes" frameborder="1" title="" name="first">
</iframe>`,
          }}
        />
        <div
          className="list-item"
          id="context-iframe-labeling-failure-failure-3"
          data-atomic-source="iframe-discernible/iframe-no-title"
          dangerouslySetInnerHTML={{
            __html: `<iframe src="path/to/somewhere">

</iframe>`,
          }}
        />
        <div
          className="list-item"
          id="context-iframe-labeling-failure-failure-4"
          data-atomic-source="iframe-discernible/iframe-src-example"
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://example.com" width="600" height="400"></iframe>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default IframelabelingFailures;
