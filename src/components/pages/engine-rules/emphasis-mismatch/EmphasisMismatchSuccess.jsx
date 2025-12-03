import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const EmphasisMismatchSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Emphasis Mismatch"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "button has direct text no element children font style italic", content: `<p style="margin-left: 20px">His favorite book is <button style="font-style: italic">The Grapes of Wrath</button>.</p>` },
  { filename: "em has direct text no element children font style italic", content: `<p style="margin-left: 20px">His favorite book is <em style="font-style: italic">The Grapes of Wrath</em>.</p>` },
  { filename: "not perceivable emphasis", content: `<p style="margin-left: 20px">His favorite book is <span style="font-style: normal">The Grapes of Wrath</span>.</p>` },
  { filename: "role emphasis has direct text no element children font style italic", content: `<p style="margin-left: 20px">His favorite book is <span role="emphasis" style="font-style: italic">The Grapes of Wrath</span>.</p>` }
      ]}
    />
  );
};

export default EmphasisMismatchSuccess;
