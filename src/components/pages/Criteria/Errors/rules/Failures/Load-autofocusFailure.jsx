/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): no-autofocus
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Errors: Load Autofocus - Failure";

const LoadautofocusFailure = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="errors-load-autofocus-failure-failure-1"
          data-atomic-source="no-autofocus/button-with-auto-focus"
          dangerouslySetInnerHTML={{
            __html: `<button autofocus></button>`,
          }}
        />
        <div
          className="list-item"
          id="errors-load-autofocus-failure-failure-2"
          data-atomic-source="no-autofocus/div-with-auto-focus"
          dangerouslySetInnerHTML={{
            __html: `<div autofocus></div>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default LoadautofocusFailure;
