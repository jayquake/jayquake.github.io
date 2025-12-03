import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const IframeDiscernibleSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Iframe Discernible"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "iframe labled by other element", content: `<label id="my-label">Iframe label here</label>
<iframe aria-labelledby="my-label" src="path/to/somewhere"></iframe>` },
  { filename: "iframe no text with aria label", content: `<iframe aria-label="Clickable Download Link" src="path/to/somewhere"></iframe>` },
  { filename: "iframe src example wih title", content: `<iframe src="https://example.com" width="600" height="400" title="Example Domain"></iframe>` },
  { filename: "iframe srcdoc", content: `<iframe
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
</iframe>` },
  { filename: "iframe with title", content: `<iframe id="iframe1" src="../support/frame_test1.html" style="width: 350px; height: 100px" scrolling="yes" frameborder="1" title="real good" name="first"> </iframe>` }
      ]}
    />
  );
};

export default IframeDiscernibleSuccess;
