/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): iframe-discernible
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Context: Iframe Labeling - Success";

const IframelabelingSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="context-iframe-labeling-success-success-1"
          data-atomic-source="iframe-discernible/iframe-labled-by-other-element"
          dangerouslySetInnerHTML={{
            __html: `<label id="my-label">Iframe label here</label>
<iframe aria-labelledby="my-label" src="path/to/somewhere"></iframe>`,
          }}
        />
        <div
          className="list-item"
          id="context-iframe-labeling-success-success-2"
          data-atomic-source="iframe-discernible/iframe-no-text-with-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<iframe aria-label="Clickable Download Link" src="path/to/somewhere"></iframe>`,
          }}
        />
        <div
          className="list-item"
          id="context-iframe-labeling-success-success-3"
          data-atomic-source="iframe-discernible/iframe-src-example-wih-title"
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://example.com" width="600" height="400" title="Example Domain"></iframe>`,
          }}
        />
        <div
          className="list-item"
          id="context-iframe-labeling-success-success-4"
          data-atomic-source="iframe-discernible/iframe-srcdoc"
          dangerouslySetInnerHTML={{
            __html: `<iframe
title="hi"
  srcdoc="
<!DOCTYPE html>
<html>
    <head>
        <title>Home</title>
    </head>
    <body>
        <h1>x</h1>
    </body>
</html>
"
>
</iframe>`,
          }}
        />
        <div
          className="list-item"
          id="context-iframe-labeling-success-success-5"
          data-atomic-source="iframe-discernible/iframe-with-title"
          dangerouslySetInnerHTML={{
            __html: `<iframe id="iframe1" src="../support/frame_test1.html" style="width: 350px; height: 100px" scrolling="yes" frameborder="1" title="real good" name="first"> </iframe>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default IframelabelingSuccess;
