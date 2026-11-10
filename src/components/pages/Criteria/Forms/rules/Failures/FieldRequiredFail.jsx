/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): required-form-field-aria-required
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Forms: Field Required - Failure";

const FieldRequiredFail = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="forms-field-required-failure-failure-1"
          data-atomic-source="required-form-field-aria-required/native-required-form-field-no-required"
          dangerouslySetInnerHTML={{
            __html: `<form>
  <label for="email">Email *</label>
  <input id="email" type="email" style="border: red 1px solid">
  <button type="submit">Submit</button>
</form>`,
          }}
        />
        <div
          className="list-item"
          id="forms-field-required-failure-failure-2"
          data-atomic-source="required-form-field-aria-required/non-native-required-form-field-aria-required-false"
          dangerouslySetInnerHTML={{
            __html: `<form>
  <div id="tbLabel">Email Address *</div>
  <div
    role="textbox"
    contenteditable
    aria-labelledby="tblabel"
    id="email1"
    aria-required="false"
    style="border: red 1px solid"></div>
    <button type="submit">Submit</button>
</form>`,
          }}
        />
        <div
          className="list-item"
          id="forms-field-required-failure-failure-3"
          data-atomic-source="required-form-field-aria-required/non-native-required-form-field-aria-required-no-value"
          dangerouslySetInnerHTML={{
            __html: `<form>
  <div id="tbLabel">Email Address *</div>
  <div
    role="textbox"
    contenteditable
    aria-labelledby="tblabel"
    id="email1"
    aria-required
    style="border: red 1px solid"></div>
    <button type="submit">Submit</button>
</form>`,
          }}
        />
        <div
          className="list-item"
          id="forms-field-required-failure-failure-4"
          data-atomic-source="required-form-field-aria-required/non-native-required-form-field-no-aria-required"
          dangerouslySetInnerHTML={{
            __html: `<form>
  <div id="tbLabel">Email Address *</div>
  <div
    role="textbox"
    contenteditable
    aria-labelledby="tblabel"
    id="email1"
    style="border: red 1px solid"></div>
    <button type="submit">Submit</button>
</form>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default FieldRequiredFail;
