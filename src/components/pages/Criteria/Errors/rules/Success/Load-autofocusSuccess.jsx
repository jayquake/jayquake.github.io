/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): no-autofocus
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Errors: Load Autofocus - Success";

const LoadautofocusSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="errors-load-autofocus-success-success-1"
          data-atomic-source="no-autofocus/button-no-auto-focus"
          dangerouslySetInnerHTML={{
            __html: `<label for="my-button">Clickable Download Link</label>
<button id="my-button"></button>`,
          }}
        />
        <div
          className="list-item"
          id="errors-load-autofocus-success-success-2"
          data-atomic-source="no-autofocus/div-no-auto-focus"
          dangerouslySetInnerHTML={{
            __html: `<div id="my-div"></div>`,
          }}
        />
        <div
          className="list-item"
          id="errors-load-autofocus-success-success-3"
          data-atomic-source="no-autofocus/svg-with-auto-focus"
          dangerouslySetInnerHTML={{
            __html: `<svg autofocus></svg>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default LoadautofocusSuccess;
