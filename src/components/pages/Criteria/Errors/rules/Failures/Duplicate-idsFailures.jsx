/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): duplicate-id
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Errors: Duplicate IDs - Failure";

const DuplicateidsFailures = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="errors-duplicate-ids-failure-failure-1"
          data-atomic-source="duplicate-id/multuple-same-id"
          dangerouslySetInnerHTML={{
            __html: `<h1 id="some-id">Heading element</h1>
<div id="some-id">Heading element</div>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default DuplicateidsFailures;
