/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): duplicate-id
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Errors: Duplicate IDs - Success";

const DuplicateidsSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="errors-duplicate-ids-success-success-1"
          data-atomic-source="duplicate-id/distinct-id"
          dangerouslySetInnerHTML={{
            __html: `<h1 id="some-id">Heading element</h1>
<div id="some-id2">Heading element</div>`,
          }}
        />
        <div
          className="list-item"
          id="errors-duplicate-ids-success-success-2"
          data-atomic-source="duplicate-id/multiple-elements-no-id"
          dangerouslySetInnerHTML={{
            __html: `<h1>Heading element</h1>
<div>Heading element</div>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default DuplicateidsSuccess;
