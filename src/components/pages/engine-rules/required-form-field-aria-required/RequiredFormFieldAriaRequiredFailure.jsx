import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const RequiredFormFieldAriaRequiredFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Required Form Field Aria Required"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "native required form field no required", content: `<form>
  <label for="email">Email *</label>
  <input id="email" type="email" style="border: red 1px solid">
  <button type="submit">Submit</button>
</form>` },
  { filename: "non native required form field aria required false", content: `<form>
  <div id="tbLabel">Email Address *</div>
  <div
    role="textbox"
    contenteditable
    aria-labelledby="tblabel"
    id="email1"
    aria-required="false"
    style="border: red 1px solid"></div>
    <button type="submit">Submit</button>
</form>` },
  { filename: "non native required form field aria required no value", content: `<form>
  <div id="tbLabel">Email Address *</div>
  <div
    role="textbox"
    contenteditable
    aria-labelledby="tblabel"
    id="email1"
    aria-required
    style="border: red 1px solid"></div>
    <button type="submit">Submit</button>
</form>` },
  { filename: "non native required form field no aria required", content: `<form>
  <div id="tbLabel">Email Address *</div>
  <div
    role="textbox"
    contenteditable
    aria-labelledby="tblabel"
    id="email1"
    style="border: red 1px solid"></div>
    <button type="submit">Submit</button>
</form>` }
      ]}
    />
  );
};

export default RequiredFormFieldAriaRequiredFailure;
