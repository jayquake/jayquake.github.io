/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): aria-invalid-mismatch, aria-invalid-misuse
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Forms: Field Validations - Success";

const FieldValidSucc = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="forms-field-validations-success-success-1"
          data-atomic-source="aria-invalid-mismatch/textarea-required-has-value"
          dangerouslySetInnerHTML={{
            __html: `<!-- Only interacted elements are audited, we can't test it using atomic tests currently. unit tests cover it -->
<textarea required>filled</textarea>`,
          }}
        />
        <div
          className="list-item"
          id="forms-field-validations-success-success-2"
          data-atomic-source="aria-invalid-misuse/input-aria-invalid-false"
          dangerouslySetInnerHTML={{
            __html: `<input aria-invalid="false" aria-describedby="description" />
<div id="description">Some description</div>`,
          }}
        />
        <div
          className="list-item"
          id="forms-field-validations-success-success-3"
          data-atomic-source="aria-invalid-misuse/input-no-aria-invalid-attribute"
          dangerouslySetInnerHTML={{
            __html: `<input aria-describedby="description" />
<div id="description">Some description</div>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default FieldValidSucc;
