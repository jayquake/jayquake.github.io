/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): form-submit-button-mismatch
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Forms: Missing Form Button - Failure";

const MissingFormButtonFail = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="forms-missing-form-button-failure-failure-1"
          data-atomic-source="form-submit-button-mismatch/form-with-button-not-calssified-as-submit"
          dangerouslySetInnerHTML={{
            __html: `<form>
  <input type="text" />
  <input type="password" />
  <button>Other button</button>
</form>`,
          }}
        />
        <div
          className="list-item"
          id="forms-missing-form-button-failure-failure-2"
          data-atomic-source="form-submit-button-mismatch/form-with-perceivable-submit-button"
          dangerouslySetInnerHTML={{
            __html: `<form>
  <input type="text" required />
  <span style="cursor: pointer">go</span>
</form>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default MissingFormButtonFail;
