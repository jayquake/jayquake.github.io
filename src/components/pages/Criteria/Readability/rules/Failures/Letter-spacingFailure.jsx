/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): letter-spacing-positive
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Readability: Letter Spacing - Failure";

const LetterspacingFailure = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="readability-letter-spacing-failure-failure-1"
          data-atomic-source="letter-spacing-positive/lower-than-minus-one"
          dangerouslySetInnerHTML={{
            __html: `<div style="font-size:13px;letter-spacing: -1.5px;" > Some content</div>`,
          }}
        />
        <div
          className="list-item"
          id="readability-letter-spacing-failure-failure-2"
          data-atomic-source="letter-spacing-positive/nested-lower-than-minus-one"
          dangerouslySetInnerHTML={{
            __html: `<div style="font-size:13px;" ><span style="letter-spacing: -1.1px;">Some content</span></div>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default LetterspacingFailure;
