/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): form-context-change-warning
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Forms: Form Submissions Status - Success";

const SubmissionStatusSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="forms-form-submissions-status-success-success-1"
          data-atomic-source="form-context-change-warning/button-not-inside-form-but-associated-to-it"
          dangerouslySetInnerHTML={{
            __html: `<form id="test"></form>

<button type="submit" form="test">hi</button>`,
          }}
        />
        <div
          className="list-item"
          id="forms-form-submissions-status-success-success-2"
          data-atomic-source="form-context-change-warning/form-with-submit-button"
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
          id="forms-form-submissions-status-success-success-3"
          data-atomic-source="form-context-change-warning/form-with-submit-input"
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
          id="forms-form-submissions-status-success-success-4"
          data-atomic-source="form-context-change-warning/hidden-form-without-submit-button"
          dangerouslySetInnerHTML={{
            __html: `<form style="display: none">
  <input type="text" />
  <input type="password" />
</form>`,
          }}
        />
        <div
          className="list-item"
          id="forms-form-submissions-status-success-success-5"
          data-atomic-source="form-context-change-warning/input-type-image"
          dangerouslySetInnerHTML={{
            __html: `<form>
  <input type="image" />
</form>`,
          }}
        />
        <div
          className="list-item"
          id="forms-form-submissions-status-success-success-6"
          data-atomic-source="form-context-change-warning/remediated-form-with-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<form aria-label="Contact Please note, filling out the following fields will automatically submit the form"><input type="text"></form>`,
          }}
        />
        <div
          className="list-item"
          id="forms-form-submissions-status-success-success-7"
          data-atomic-source="form-context-change-warning/remediated-form-with-aria-labelledby"
          dangerouslySetInnerHTML={{
            __html: `<form aria-labelledby="t sro-1"><h2 id="t">Contact</h2><input type="text"><span data-acsb-sr-only="true" style="position: absolute !important; width: 1px !important; height: 1px !important; padding: 0px !important; overflow: hidden !important; clip: rect(0px, 0px, 0px, 0px) !important; border: 0px !important;" id="sro-1">Please note, filling out the following fields will automatically submit the form</span></form>`,
          }}
        />
        <div
          className="list-item"
          id="forms-form-submissions-status-success-success-8"
          data-atomic-source="form-context-change-warning/remediated-form-with-sr-only-warning"
          dangerouslySetInnerHTML={{
            __html: `<form><input type="text"><span data-acsb-sr-only="true" style="position: absolute !important; width: 1px !important; height: 1px !important; padding: 0px !important; overflow: hidden !important; clip: rect(0px, 0px, 0px, 0px) !important; border: 0px !important;">Please note, filling out the following fields will automatically submit the form</span></form>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default SubmissionStatusSuccess;
