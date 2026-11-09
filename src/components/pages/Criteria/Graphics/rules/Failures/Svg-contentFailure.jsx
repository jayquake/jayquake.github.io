/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): svg-discernible
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Graphics: SVG Content - Failure";

const SvgcontentFailure = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="graphics-svg-content-failure-failure-1"
          data-atomic-source="svg-discernible/svg"
          dangerouslySetInnerHTML={{
            __html: `<svg style="width:100px;height:100px;" >
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default SvgcontentFailure;
