/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): form-duplicate-id
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Forms: Form Duplicate IDs - Success";

const FormDuplicateIdSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="forms-form-duplicate-ids-success-success-1"
          data-atomic-source="form-duplicate-id/form-with-unique-ids"
          dangerouslySetInnerHTML={{
            __html: `<form id="form">
  <input id="name-field" type="text" />
  <input id="password-field" type="password" />
  <button type="submit">Confirm</button>
</form>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default FormDuplicateIdSuccess;
