/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): form-context-change-warning
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Forms: Form Submissions Status - Failure";

const SubmissionStatusFail = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="forms-form-submissions-status-failure-failure-1"
          data-atomic-source="form-context-change-warning/button-outside-div-role-form--associated-to-it-but-its-not-native-form"
          dangerouslySetInnerHTML={{
            __html: `<div role="form" id="test"></div>

<button type="submit" form="test">hi</button>`,
          }}
        />
        <div
          className="list-item"
          id="forms-form-submissions-status-failure-failure-2"
          data-atomic-source="form-context-change-warning/form-with-button-not-calssified-as-submit"
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
          id="forms-form-submissions-status-failure-failure-3"
          data-atomic-source="form-context-change-warning/form-without-submit-button"
          dangerouslySetInnerHTML={{
            __html: `<form>
  <input type="text" />
  <input type="password" />
</form>`,
          }}
        />
        <div
          className="list-item"
          id="forms-form-submissions-status-failure-failure-4"
          data-atomic-source="form-context-change-warning/multiple-forms--associated-button-inside-another-div-role-form"
          dangerouslySetInnerHTML={{
            __html: `<!-- test is skipped due to classifier wrongfully detecting this submit button -->
<div id="submit-1" role="form">
  <input type="text" />
  <input type="password" />
</div>

<form id="missing-submit-2">
  <input type="submit" form="submit-1" />
  <input type="text" />
  <input type="password" />
</form>`,
          }}
        />
        <div
          className="list-item"
          id="forms-form-submissions-status-failure-failure-5"
          data-atomic-source="form-context-change-warning/multiple-forms--associated-button-inside-another-form"
          dangerouslySetInnerHTML={{
            __html: `<!-- test is skipped due to classifier wrongfully detecting this submit button -->
<form id="submit-1" role="form">
  <input type="text" />
  <input type="password" />
</form>

<form id="missing-submit-2">
  <input type="submit" form="submit-1" />
  <input type="text" />
  <input type="password" />
</form>`,
          }}
        />
        <div
          className="list-item"
          id="forms-form-submissions-status-failure-failure-6"
          data-atomic-source="form-context-change-warning/multiple-forms-one-without-submit-button"
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
        <div
          className="list-item"
          id="forms-form-submissions-status-failure-failure-7"
          data-atomic-source="form-context-change-warning/multiple-forms-only-one-with-associated-submit-button"
          dangerouslySetInnerHTML={{
            __html: `<form id="submit-1">
  <input type="text" />
  <input type="password" />
</form>
<input type="submit" form="submit-1" />
<form id="missing-submit-2">
  <input type="text" />
  <input type="password" />
</form>`,
          }}
        />
        <div
          className="list-item"
          id="forms-form-submissions-status-failure-failure-8"
          data-atomic-source="form-context-change-warning/multiple-forms-without-submit-button"
          dangerouslySetInnerHTML={{
            __html: `<form id="missing-submit-1">
  <input type="text" />
  <input type="password" />
</form>
<form id="missing-submit-2">
  <input type="text" />
  <input type="password" />
</form>`,
          }}
        />
        <div
          className="list-item"
          id="forms-form-submissions-status-failure-failure-9"
          data-atomic-source="form-context-change-warning/sr-only-warning-hidden-from-screen-reader"
          dangerouslySetInnerHTML={{
            __html: `<!-- The warning text sits inside an sr-only element but under aria-hidden, so a screen reader never announces it. -->
<form><input type="text"><span data-acsb-sr-only="true" style="position: absolute !important; width: 1px !important; height: 1px !important; padding: 0px !important; overflow: hidden !important; clip: rect(0px, 0px, 0px, 0px) !important; border: 0px !important;">Note: <span aria-hidden="true">filling out the following fields will automatically submit the form</span></span></form>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default SubmissionStatusFail;
