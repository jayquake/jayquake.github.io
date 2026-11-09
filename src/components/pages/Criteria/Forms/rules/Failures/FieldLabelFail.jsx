/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): input-discernible
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Forms: Field Label - Failure";

const FieldLabelFail = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="forms-field-label-failure-failure-1"
          data-atomic-source="input-discernible/input-with-described-by-element"
          dangerouslySetInnerHTML={{
            __html: `<input type="text" aria-describedby="username" />
<label id="username">Username</label>`,
          }}
        />
        <div
          className="list-item"
          id="forms-field-label-failure-failure-2"
          data-atomic-source="input-discernible/input-without-label"
          dangerouslySetInnerHTML={{
            __html: `<input type="text" id="username" />`,
          }}
        />
        <div
          className="list-item"
          id="forms-field-label-failure-failure-3"
          data-atomic-source="input-discernible/select-without-label"
          dangerouslySetInnerHTML={{
            __html: `<select id="username"></select>`,
          }}
        />
        <div
          className="list-item"
          id="forms-field-label-failure-failure-4"
          data-atomic-source="input-discernible/textarea-without-label"
          dangerouslySetInnerHTML={{
            __html: `<textarea id="username"></textarea>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default FieldLabelFail;
