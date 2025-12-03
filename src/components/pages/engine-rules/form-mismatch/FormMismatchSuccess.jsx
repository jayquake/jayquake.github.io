import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const FormMismatchSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Form Mismatch"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "compliant form", content: `<form>
  <input type="text" />
  <input type="password" />
  <input type="submit" />
</form>
<div role="form">
  <input type="text" />
  <input type="password" />
  <input type="submit" />
</div>` }
      ]}
    />
  );
};

export default FormMismatchSuccess;
