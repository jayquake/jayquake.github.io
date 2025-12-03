import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const FormDuplicateIdSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Form Duplicate Id"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "form with unique ids", content: `<form id="form">
  <input id="name-field" type="text" />
  <input id="password-field" type="password" />
  <button type="submit">Confirm</button>
</form>` }
      ]}
    />
  );
};

export default FormDuplicateIdSuccess;
