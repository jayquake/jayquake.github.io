import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const FormContextChangeWarningSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Form Context Change Warning"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "button not inside form but associated to it", content: `<form id="test"></form>

<button type="submit" form="test">hi</button>` },
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
  { filename: "hidden form without submit button", content: `<form style="display: none">
  <input type="text" />
  <input type="password" />
</form>` },
  { filename: "input type image", content: `<form>
  <input type="image" />
</form>` }
      ]}
    />
  );
};

export default FormContextChangeWarningSuccess;
