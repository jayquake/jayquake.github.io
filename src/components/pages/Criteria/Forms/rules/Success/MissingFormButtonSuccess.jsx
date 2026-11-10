/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): form-submit-button-mismatch
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Forms: Missing Form Button - Success";

const MissingFormButtonSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="forms-missing-form-button-success-success-1"
          data-atomic-source="form-submit-button-mismatch/form-with-hidden-submit-button"
          dangerouslySetInnerHTML={{
            __html: `<form>
  <input type="text" required />
  <span style="cursor: pointer; display: none">go</span>
</form>`,
          }}
        />
        <div
          className="list-item"
          id="forms-missing-form-button-success-success-2"
          data-atomic-source="form-submit-button-mismatch/form-with-submit-button"
          dangerouslySetInnerHTML={{
            __html: `<form>
  <input type="text" />
  <input type="password" />
  <button type="submit">Confirm</button>
</form>`,
          }}
        />
        <div
          className="list-item"
          id="forms-missing-form-button-success-success-3"
          data-atomic-source="form-submit-button-mismatch/form-with-submit-input"
          dangerouslySetInnerHTML={{
            __html: `<form>
  <input type="text" />
  <input type="password" />
  <input type="submit" />
</form>`,
          }}
        />
        <div
          className="list-item"
          id="forms-missing-form-button-success-success-4"
          data-atomic-source="form-submit-button-mismatch/form-without-submit-button"
          dangerouslySetInnerHTML={{
            __html: `<form>
  <input type="text" />
  <input type="password" />
</form>`,
          }}
        />
        <div
          className="list-item"
          id="forms-missing-form-button-success-success-5"
          data-atomic-source="form-submit-button-mismatch/multiple-forms-one-without-submit-button"
          dangerouslySetInnerHTML={{
            __html: `<form id="submit-1">
  <input type="text" />
  <input type="password" />
  <input type="submit">
</form>
<form id="missing-submit-2">
  <input type="text" />
  <input type="password" />
</form>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default MissingFormButtonSuccess;
