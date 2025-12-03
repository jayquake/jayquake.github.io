import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const FocusNoticeableFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Focus Noticeable"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "anchor with overridden outline", content: `<style>
  #test-subject:focus {
    outline: none;
  }
</style>
<a id="test-subject" href="#info">info</a>
<div id="info">Some Info</div>` },
  { filename: "button with overridden outline", content: `<style>
  #test-subject:focus {
    outline: none;
  }
</style>
<button id="test-subject">Click this</button>` },
  { filename: "div with tabindex with overridden outline", content: `<style>
  #test-subject:focus {
    outline: none;
  }
</style>
<div id="test-subject" tabindex="0">Content</div>` },
  { filename: "input with overridden outline", content: `<style>
  #test-subject:focus {
    outline: none;
  }
</style>
<input id="test-subject" placeholder="test input" />
<label for="test-subject">test label</label>` }
      ]}
    />
  );
};

export default FocusNoticeableFailure;
