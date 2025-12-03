import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const InputDiscernibleFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Input Discernible"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "input with described by element", content: `<input type="text" aria-describedby="username" />
<label id="username">Username</label>` },
  { filename: "input without label", content: `<input type="text" id="username" />` },
  { filename: "select without label", content: `<select id="username"></select>` },
  { filename: "textarea without label", content: `<textarea id="username"></textarea>` }
      ]}
    />
  );
};

export default InputDiscernibleFailure;
