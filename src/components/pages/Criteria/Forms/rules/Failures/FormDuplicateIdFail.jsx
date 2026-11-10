/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): form-duplicate-id
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Forms: Form Duplicate IDs - Failure";

const FormDuplicateIdFail = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="forms-form-duplicate-ids-failure-failure-1"
          data-atomic-source="form-duplicate-id/duplicate-ids-form-and-fields"
          dangerouslySetInnerHTML={{
            __html: `<form id="form">
  <input id="form" type="text" />
  <input type="password" />
  <button>submit</button>
</form>`,
          }}
        />
        <div
          className="list-item"
          id="forms-form-duplicate-ids-failure-failure-2"
          data-atomic-source="form-duplicate-id/duplicate-ids-in-form-fields"
          dangerouslySetInnerHTML={{
            __html: `<form>
  <input id="name" type="text" />
  <input id="name" type="password" />
  <button>Not a submit button</button>
</form>`,
          }}
        />
        <div
          className="list-item"
          id="forms-form-duplicate-ids-failure-failure-3"
          data-atomic-source="form-duplicate-id/duplicate-ids-in-forms"
          dangerouslySetInnerHTML={{
            __html: `<form id="form">
  <input type="text" />
  <input type="password" />
  <button>submit</button>
</form>

<form id="form">
  <input type="text" />
  <input type="number" />
  <button>clear</button>
</form>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default FormDuplicateIdFail;
