import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const RequiredFormFieldAriaRequiredSuccess = () => {
  const ruleId = "required-form-field-aria-required";
  const title = `Mandatory form fields should indicate that they are required`;
  const description = `If a field is marked as required only through visual cues, but lacks the required attribute or aria-required="true", screen readers will not announce it as mandatory. As a result, users may experience unnecessary delays or confusion when trying to submit the form.`;
  const helpText = `Add required or aria-required="true" to required input fields.`;
  const bestPractices = [
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
  ];
  const htmlExamples = [
  { filename: "amaxinsurance select placeholder asterisk disabled", content: `<!--Should ignore the select dropdown element since it does not have a visible asterisk-->
<meta charset="utf-8">
<div class="cmp-cpdashboard__account-data">
<label for="driver-driverstate" class="cmp-quoteform__driverformfieldslabels">
<select id="driver-driverstate" class="cmp-quoteform__input cmp-quoteform__select cmp-form-text__text" data-cmp-hook-roadsideassistance="state" name="driverstate" placeholder="State *" disabled="">
<option value="AL" title="Alabama">AL</option>
<option value="AK" title="Alaska">AK</option>
<option value="AZ" title="Arizona">AZ</option>
<option value="CA" title="California">CA</option>
<option value="IL" title="Illinois">IL</option>
<option value="IN" title="Indiana">IN</option>
<option value="TX" title="Texas">TX</option>
</select>
<span class="cmp-quoteform__driverformfieldsspan">State</span>
</label>
</div>

<style>
* { box-sizing: border-box; }
body { font-family: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; font-size: 1pc; line-height: 1.5; margin: 0px; }
select { font-family: inherit; font-size: 100%; line-height: inherit; margin: 0px; padding: 0px; text-transform: none; color: inherit; }
.cmp-cpdashboard__account-data { display: flex; width: 100%; }
.cmp-quoteform__driverformfieldslabels { position: relative; width: 100%; }
.cmp-form-text__text { background-color: rgb(255, 255, 255); border: 1px solid rgb(230, 230, 230); box-shadow: rgba(0, 0, 0, 0.1) 0px 0.0625rem 0.1875rem 0px, rgba(0, 0, 0, 0.06) 0px 0.0625rem 0.125rem 0px; padding: 0.9375rem 1.25rem; width: 100%; }
.cmp-form-text__text:disabled { background-color: rgb(230, 230, 230); color: rgb(109, 109, 109); opacity: 1; }
.cmp-quoteform__input { color: rgb(40, 37, 37); font-size: 0.875rem; font-weight: 600; line-height: 1rem; padding: 1.4375rem 0.9375rem 0.75rem; transition: 0.3s; }
.cmp-quoteform__select { appearance: none; background-image: none; border: 0.0625rem solid rgb(223, 223, 223); border-radius: 0.125rem; }
.cmp-quoteform__select:disabled { opacity: 1; }
.cmp-quoteform__driverformfieldslabels:focus-within > span { font-size: 0.625rem; transform: translateY(1.25rem); }
.cmp-quoteform__driverformfieldsspan { color: rgb(174, 169, 169); cursor: text; font-size: 0.875rem; font-weight: 400; left: 1rem; line-height: 1.0625rem; position: absolute; top: -0.6875rem; transform: translateY(1.875rem); transition-duration: 0.3s; }
</style>` },
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
  ];

  return (
    <EngineIssueSuccess
      ruleId={ruleId}
      title={title}
      description={description}
      helpText={helpText}
      bestPractices={bestPractices}
      htmlExamples={htmlExamples}
    />
  );
};

export default RequiredFormFieldAriaRequiredSuccess;
