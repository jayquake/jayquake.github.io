/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): redundant-discernible-content
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Errors: Redundant Aria Labels - Success";

const RedundantarialabelsSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="errors-redundant-aria-labels-success-success-1"
          data-atomic-source="redundant-discernible-content/anchor-without-content-and-with-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<a aria-label="SoMe CoNtEnT"><i class="icon"></i></a>`,
          }}
        />
        <div
          className="list-item"
          id="errors-redundant-aria-labels-success-success-2"
          data-atomic-source="redundant-discernible-content/button-with-content-and-without-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<button>SoMe CoNtEnT</button>`,
          }}
        />
        <div
          className="list-item"
          id="errors-redundant-aria-labels-success-success-3"
          data-atomic-source="redundant-discernible-content/button-with-different-content-and-aria-label-arabic"
          dangerouslySetInnerHTML={{
            __html: `<button aria-label="شكرًا لك">وداعًا</button>`,
          }}
        />
        <div
          className="list-item"
          id="errors-redundant-aria-labels-success-success-4"
          data-atomic-source="redundant-discernible-content/button-with-different-content-and-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<button aria-label="some content">some other content<i class="icon"></i></button>`,
          }}
        />
        <div
          className="list-item"
          id="errors-redundant-aria-labels-success-success-5"
          data-atomic-source="redundant-discernible-content/button-with-different-content-and-aria-labelledby-element"
          dangerouslySetInnerHTML={{
            __html: `<button aria-labelledby="btn-label">some other content<i class="icon"></i></button>
<label id="btn-label">some content</label>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default RedundantarialabelsSuccess;
