import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const RequiredFormFieldAriaRequiredSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Required Form Field Aria Required"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "native required form field aria required true", content: `<form>
  <label for="email">Email *</label>
  <input id="email" type="email" style="border: red 1px solid" aria-required="true">
  <button type="submit">Submit</button>
</form>` },
  { filename: "native required form field required false", content: `<form>
  <label for="email">Email *</label>
  <input id="email" type="email" style="border: red 1px solid" required="false">
  <button type="submit">Submit</button>
</form>` },
  { filename: "native required form field required no value", content: `<form>
  <label for="email">Email *</label>
  <input id="email" type="email" style="border: red 1px solid" required>
  <button type="submit">Submit</button>
</form>` },
  { filename: "native required form field required true", content: `<form>
  <label for="email">Email *</label>
  <input id="email" type="email" style="border: red 1px solid" required="true">
  <button type="submit">Submit</button>
</form>` },
  { filename: "non native required form field aria required true", content: `<form>
  <div id="tbLabel">Email Address *</div>
  <div
    role="textbox"
    contenteditable
    aria-labelledby="tblabel"
    id="email1"
    aria-required="true"
    style="border: red 1px solid"></div>
    <button type="submit">Submit</button>
</form>` }
      ]}
    />
  );
};

export default RequiredFormFieldAriaRequiredSuccess;
