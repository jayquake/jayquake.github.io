/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): heading-h1
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Headings: Main Heading - Failure";

const MainheadingFailure = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="headings-main-heading-failure-failure-1"
          data-atomic-source="heading-h1/no-h1-no-aria-level-1"
          dangerouslySetInnerHTML={{
            __html: `<span>Not header</span>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default MainheadingFailure;
