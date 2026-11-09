/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): letter-spacing-positive
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Readability: Letter Spacing - Success";

const LetterspacingSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="readability-letter-spacing-success-success-1"
          data-atomic-source="letter-spacing-positive/negative-letter-spacing"
          dangerouslySetInnerHTML={{
            __html: `<div style="font-size:12px;letter-spacing: -1px;" > Some content</div>`,
          }}
        />
        <div
          className="list-item"
          id="readability-letter-spacing-success-success-2"
          data-atomic-source="letter-spacing-positive/normal-letter-spacing"
          dangerouslySetInnerHTML={{
            __html: `<div style="font-size:12px;" ><span style="letter-spacing: normal;">Some content</span></div>`,
          }}
        />
        <div
          className="list-item"
          id="readability-letter-spacing-success-success-3"
          data-atomic-source="letter-spacing-positive/positive-letter-spacing"
          dangerouslySetInnerHTML={{
            __html: `<div style="font-size:12px;" ><span style="letter-spacing: 2px;">Some content</span></div>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default LetterspacingSuccess;
