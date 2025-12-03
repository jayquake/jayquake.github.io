import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const FormSubmitButtonMismatchSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Form Submit Button Mismatch"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "form with hidden submit button", content: `<form>
  <input type="text" required />
  <span style="cursor: pointer; display: none">go</span>
</form>` },
  { filename: "form with submit button", content: `<form>
  <input type="text" />
  <input type="password" />
  <button type="submit">Confirm</button>
</form>` },
  { filename: "form with submit input", content: `<form>
  <input type="text" />
  <input type="password" />
  <input type="submit" />
</form>` },
  { filename: "form without submit button", content: `<form>
  <input type="text" />
  <input type="password" />
</form>` },
  { filename: "multiple forms one without submit button", content: `<form id="submit-1">
  <input type="text" />
  <input type="password" />
  <input type="submit">
</form>
<form id="missing-submit-2">
  <input type="text" />
  <input type="password" />
</form>` }
      ]}
    />
  );
};

export default FormSubmitButtonMismatchSuccess;
