/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): marquee-deprecated
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Errors: Marquee - Failure";

const MarqueeFailure = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="errors-marquee-failure-failure-1"
          data-atomic-source="marquee-deprecated/page-with-marquee"
          dangerouslySetInnerHTML={{
            __html: `<h1>Heading</h1>
<input type="text">
<marquee>Some moving content</marquee>
<button></button>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default MarqueeFailure;
