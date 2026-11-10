/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): heading-lengthy
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Headings: Long Headings - Success";

const LongheadingsSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="headings-long-headings-success-success-1"
          data-atomic-source="heading-lengthy/h1-with-less-than-160-chars"
          dangerouslySetInnerHTML={{
            __html: `<h1>As twilight embraces the horizon, a lone figure stands atop a hill, gazing at the stars, contemplating the mysteries of the universe and our place in</h1>`,
          }}
        />
        <div
          className="list-item"
          id="headings-long-headings-success-success-2"
          data-atomic-source="heading-lengthy/h1-with-more-than-160-chars-due-to-double-spaces-and-trimmable-ends"
          dangerouslySetInnerHTML={{
            __html: `<h1>   As  twilight            embraces the horizon, a lone figure stands atop a hill, gazing at the stars, contemplating the mysteries of the universe and our place in</h1>`,
          }}
        />
        <div
          className="list-item"
          id="headings-long-headings-success-success-3"
          data-atomic-source="heading-lengthy/h4-with-less-than-160-chars"
          dangerouslySetInnerHTML={{
            __html: `<h4>As twilight embraces the horizon, a lone figure stands atop a hill, gazing at the stars, contemplating the mysteries of the universe and our place in</h4>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default LongheadingsSuccess;
