import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const FocusNoticeableSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Focus Noticeable"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "simple anchor", content: `<a id="test-subject" href="#info">info</a>
<div id="info">Some Info</div>` },
  { filename: "simple button", content: `<button id="test-subject">Test Button</button>` },
  { filename: "simple div", content: `<div id="test-subject"><span>some text</span></div>` },
  { filename: "simple input", content: `<input id="test-subject" placeholder="test input" />
<label for="test-subject">test label</label>` }
      ]}
    />
  );
};

export default FocusNoticeableSuccess;
