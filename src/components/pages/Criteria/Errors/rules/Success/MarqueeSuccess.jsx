/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): marquee-deprecated
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Errors: Marquee - Success";

const MarqueeSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="errors-marquee-success-success-1"
          data-atomic-source="marquee-deprecated/page-no-marquee"
          dangerouslySetInnerHTML={{
            __html: `<h1>Heading</h1>
<input type="text">
<button></button>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default MarqueeSuccess;
