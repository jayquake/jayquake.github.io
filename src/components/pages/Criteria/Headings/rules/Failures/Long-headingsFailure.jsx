/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): heading-lengthy
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Headings: Long Headings - Failure";

const LongheadingsFailure = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="headings-long-headings-failure-failure-1"
          data-atomic-source="heading-lengthy/h1-with-more-than-160-chars"
          dangerouslySetInnerHTML={{
            __html: `<h1>As twilight embraces the horizon, a lone figure stands atop a hill, gazing at the stars, contemplating the mysteries of the universe and our place in it. further away he goes.</h1>`,
          }}
        />
        <div
          className="list-item"
          id="headings-long-headings-failure-failure-2"
          data-atomic-source="heading-lengthy/h4-with-more-than-160-chars"
          dangerouslySetInnerHTML={{
            __html: `<h4>As twilight embraces the horizon, a lone figure stands atop a hill, gazing at the stars, contemplating the mysteries of the universe and our place in it. further away he goes.</h4>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default LongheadingsFailure;
