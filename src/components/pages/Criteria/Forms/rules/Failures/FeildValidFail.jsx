/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): aria-invalid-mismatch, aria-invalid-misuse
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Forms: Field Validations - Failure";

const FeildValidFail = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="forms-field-validations-failure-failure-1"
          data-atomic-source="aria-invalid-mismatch/input-with-aria-invalid-false"
          dangerouslySetInnerHTML={{
            __html: `<!-- Only interacted elements are audited, we can't test it using atomic tests currently. unit tests cover it -->
<input aria-invalid="false" />`,
          }}
        />
        <div
          className="list-item"
          id="forms-field-validations-failure-failure-2"
          data-atomic-source="aria-invalid-mismatch/select-required-no-value"
          dangerouslySetInnerHTML={{
            __html: `<!-- Only interacted elements are audited, we can't test it using atomic tests currently. unit tests cover it -->
<select required>
    <option value="" disabled selected hidden>Select an option</option>
    <option>Option 1</option>
    <option>Option 2</option>
</select>`,
          }}
        />
        <div
          className="list-item"
          id="forms-field-validations-failure-failure-3"
          data-atomic-source="aria-invalid-misuse/input-with-aria-invalid-grammar"
          dangerouslySetInnerHTML={{
            __html: `<input aria-invalid="grammar" aria-describedby="description" />
<div id="description">Some description</div>`,
          }}
        />
        <div
          className="list-item"
          id="forms-field-validations-failure-failure-4"
          data-atomic-source="aria-invalid-misuse/input-with-aria-invalid-spelling"
          dangerouslySetInnerHTML={{
            __html: `<input aria-invalid="spelling" aria-describedby="description" />
<div id="description">Some description</div>`,
          }}
        />
        <div
          className="list-item"
          id="forms-field-validations-failure-failure-5"
          data-atomic-source="aria-invalid-misuse/input-with-aria-invalid-true"
          dangerouslySetInnerHTML={{
            __html: `<input aria-invalid="true" aria-describedby="description" />
<div id="description">Some description</div>`,
          }}
        />
        <div
          className="list-item"
          id="forms-field-validations-failure-failure-6"
          data-atomic-source="aria-invalid-misuse/input-with-empty-aria-invalid"
          dangerouslySetInnerHTML={{
            __html: `<input aria-invalid aria-describedby="description" />
<div id="description">Some description</div>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default FeildValidFail;
